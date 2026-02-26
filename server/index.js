/**
 * Akram Coaching — Express API Server
 * Run with: node server/index.js
 */
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import { coachEmail, clientConfirmationEmail, paymentNotificationEmail } from './emails.js';

const app = express();
const PORT = process.env.PORT || 3001;
const COACH_EMAIL = process.env.COACH_EMAIL || 'fitresults.pro@gmail.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

import { ChargilyClient } from '@chargily/chargily-pay';

let chargilyClient = null;
if (process.env.CHARGILY_SECRET_KEY) {
    const isLive = process.env.CHARGILY_SECRET_KEY.startsWith('live_');
    console.log(`[chargily] Initializing in ${isLive ? 'LIVE' : 'TEST'} mode (Key prefix: ${process.env.CHARGILY_SECRET_KEY.slice(0, 8)}...)`);
    chargilyClient = new ChargilyClient({
        api_key: process.env.CHARGILY_SECRET_KEY,
        mode: isLive ? 'live' : 'test',
    });
}

// ─── Security Hardening ──────────────────────────────────────────────────────

// 1. Helmet: Secure HTTP headers
app.use(helmet());

// 2. CORS: Restrict access (Update this with your real domain once live!)
const ALLOWED_ORIGINS = [
    'https://akramcoach.com',
    'https://www.akramcoach.com',
    'http://localhost:3000',
    'http://localhost:5173'
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow programmatic requests with no origin, or allowed domains
        if (!origin || ALLOWED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    }
}));

// 3. Rate Limiting: Prevent API abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

app.use(express.json({ limit: '50mb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true, email_ready: !!RESEND_API_KEY }));

app.post('/api/send-email', async (req, res) => {
    const data = {
        ...req.body,
        submittedAt: new Date().toLocaleString('en-GB', {
            timeZone: 'Africa/Algiers',
            dateStyle: 'full',
            timeStyle: 'short',
        }),
    };

    if (!RESEND_API_KEY) {
        console.warn('[server] RESEND_API_KEY not set — skipping email send.');
        return res.json({ ok: false, warn: 'RESEND_API_KEY not configured' });
    }

    try {
        const resend = new Resend(RESEND_API_KEY);
        const coachTpl = coachEmail(data);

        // Prepare attachments if present
        const attachments = [];
        const processPic = (pic, name) => {
            if (!pic) return;
            const parts = pic.split(',');
            const content = parts.length > 1 ? parts[1] : pic;
            attachments.push({ content, filename: name });
        };
        processPic(data.frontPic, 'front_progress.jpg');
        processPic(data.sidePic, 'side_progress.jpg');
        processPic(data.backPic, 'back_progress.jpg');

        console.log(`[server] Sending email for ${data.type} with ${attachments.length} attachments`);

        console.log(`[server] Sending email for ${data.type} with ${attachments.length} attachments`);

        // Always send notification to the Coach
        const emailOptions = {
            from: 'Akram Coaching <onboarding@akramcoach.com>',
            to: COACH_EMAIL,
            reply_to: data.email || undefined,
            subject: coachTpl.subject,
            html: coachTpl.html,
        };

        if (attachments.length > 0) {
            emailOptions.attachments = attachments;
        }

        const coachResult = await resend.emails.send(emailOptions);
        console.log('[server] Coach email success:', !!coachResult.data, coachResult.error || '');

        // Try to send confirmation to client using the verified domain
        if (data.email && data.email.includes('@')) {
            const clientTpl = clientConfirmationEmail(data);
            try {
                const clientResult = await resend.emails.send({
                    from: 'Coach Akram <onboarding@akramcoach.com>',
                    to: data.email,
                    subject: clientTpl.subject,
                    html: clientTpl.html,
                });
                console.log('[server] Client confirmation success:', !!clientResult.data);
            } catch (clientErr) {
                console.warn('[server] Could not send to client email:', clientErr.message);
            }
        }

        console.log(`[server] Automation completed for ${data.type}`);
        return res.json({ ok: true });
    } catch (err) {
        console.error('[server] Email error:', JSON.stringify(err));
        return res.status(500).json({ ok: false, error: 'Internal Server Error' });
    }
});

// Secure Verification Endpoint: Checks with Chargily if a payment was REALLY made
app.post('/api/chargily/verify-payment', async (req, res) => {
    try {
        const { checkoutId } = req.body;
        if (!checkoutId) return res.status(400).json({ error: 'Missing checkoutId' });
        if (!chargilyClient) return res.status(500).json({ error: 'Chargily not initialized' });

        console.log(`[chargily] Verifying checkout: ${checkoutId}`);

        // Fetch the checkout status directly from Chargily API
        const checkout = await chargilyClient.getCheckout(checkoutId);

        if (checkout.status !== 'paid') {
            console.warn(`[chargily] Verification failed: Checkout ${checkoutId} is ${checkout.status}`);
            return res.status(400).json({ error: 'Payment not completed', status: checkout.status });
        }

        // Extract metadata we saved during creation
        const { clientName, clientEmail, planName } = checkout.metadata;
        const amount = checkout.amount;
        const currency = checkout.currency;

        console.log(`[chargily] ✅ Verified PAID status for ${clientName} (${planName})`);

        // Send Notification Email
        const resend = new Resend(RESEND_API_KEY);
        const tpl = paymentNotificationEmail({
            name: clientName,
            email: clientEmail,
            plan: planName,
            amount: amount,
            currency: currency.toUpperCase(),
            method: 'Chargily (Verified)',
            date: new Date().toLocaleString()
        });

        await resend.emails.send({
            from: 'Akram Coaching Payments <onboarding@akramcoach.com>',
            to: COACH_EMAIL,
            subject: tpl.subject,
            html: tpl.html,
        });

        return res.json({
            ok: true,
            name: clientName,
            email: clientEmail,
            plan: planName,
            amount,
            currency
        });
    } catch (err) {
        console.error('[chargily] Verification error:', JSON.stringify(err));
        return res.status(500).json({ error: 'Verification failed - Please try again later.' });
    }
});

// Legacy Notification (Internal or PayPal only)
app.post('/api/notify-payment', async (req, res) => {
    // For now, allow PayPal to use this, but eventually, we should verify PayPal too.
    try {
        const { name, email, plan, amount, currency, method } = req.body;

        // Basic hardening: If it's Chargily but not coming through the verify endpoint, reject it.
        if (method?.toLowerCase().includes('chargily')) {
            return res.status(403).json({ error: 'Chargily payments must use /verify-payment' });
        }

        console.log(`[server] Manual/PayPal notification received: ${amount} ${currency} from ${name}`);

        const resend = new Resend(RESEND_API_KEY);
        const tpl = paymentNotificationEmail({
            name, email, plan, amount, currency, method,
            date: new Date().toLocaleString()
        });

        await resend.emails.send({
            from: 'Akram Coaching Payments <onboarding@akramcoach.com>',
            to: COACH_EMAIL,
            subject: tpl.subject,
            html: tpl.html,
        });

        return res.json({ ok: true });
    } catch (err) {
        console.error('[server] Payment notification error:', JSON.stringify(err));
        return res.status(500).json({ ok: false, error: 'Internal Server Error' });
    }
});

app.post('/api/chargily/create-checkout', async (req, res) => {
    try {
        console.log(`[chargily] Received checkout request`);
        if (!chargilyClient) {
            throw new Error('Chargily Client is not initialized. Missing CHARGILY_SECRET_KEY in .env.');
        }

        const { amount, currency, successUrl, failureUrl, clientName, clientEmail, planName } = req.body;

        // Security: Validate Redirect URLs
        const isValidRedirect = (url) => {
            try {
                const parsed = new URL(url);
                return ALLOWED_ORIGINS.includes(parsed.origin);
            } catch (e) {
                return false;
            }
        };

        if (!isValidRedirect(successUrl) || !isValidRedirect(failureUrl)) {
            console.warn(`[chargily] Blocked invalid redirect URLs: ${successUrl}, ${failureUrl}`);
            return res.status(400).json({ error: 'Invalid redirect URL provided.' });
        }

        console.log(`[chargily] Creating checkout: ${amount} ${currency} for ${planName} (${clientEmail})`);

        const checkout = await chargilyClient.createCheckout({
            amount: parseInt(amount, 10),
            currency: currency.toLowerCase(),
            success_url: successUrl,
            failure_url: failureUrl,
            metadata: {
                clientName: clientName || 'Unknown',
                clientEmail: clientEmail || 'unknown@example.com',
                planName: planName || 'Unknown Plan'
            }
        });

        console.log(`[chargily] Checkout created successfully: ${checkout.checkout_url}`);
        return res.json({ checkoutUrl: checkout.checkout_url });
    } catch (error) {
        console.error('[chargily] Error creating checkout:', error?.message || JSON.stringify(error));
        return res.status(500).json({ error: 'Failed to create payment checkout. Please try again.' });
    }
});

app.listen(PORT, () => {
    console.log(`\n🚀 Akram Coaching Email API server running at http://localhost:${PORT}\n`);
});
