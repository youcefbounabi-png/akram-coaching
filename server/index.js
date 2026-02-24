/**
 * Akram Coaching — Express API Server
 * Run with: node server/index.js
 */
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import { coachEmail, clientConfirmationEmail } from './emails.js';

const app = express();
const PORT = process.env.PORT || 3001;
const COACH_EMAIL = process.env.COACH_EMAIL || 'fitresults.pro@gmail.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

app.use(cors());
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

        // Always send notification to the Coach
        const emailOptions = {
            from: 'Akram Coaching <onboarding@resend.dev>',
            to: COACH_EMAIL,
            reply_to: data.email || undefined,
            subject: coachTpl.subject,
            html: coachTpl.html,
        };

        if (attachments.length > 0) {
            emailOptions.attachments = attachments;
        }

        const coachResult = await resend.emails.send(emailOptions);
        console.log('[server] Coach email result:', coachResult);

        // Try to send confirmation to client using the verified domain / same onboarding trick
        // NOTE: On Resend Free Tier without a verified domain, sending to random client emails will throw an error. 
        // We catch it and ignore so it doesn't break the submission flow.
        if (data.email && data.email.includes('@')) {
            const clientTpl = clientConfirmationEmail(data);
            try {
                await resend.emails.send({
                    from: 'Coach Akram <onboarding@resend.dev>',
                    to: data.email,
                    subject: clientTpl.subject,
                    html: clientTpl.html,
                });
            } catch (clientErr) {
                console.warn('[server] Could not send to client email (Free Tier limitation):', clientErr.message);
            }
        }

        console.log(`[server] Automation completed for ${data.type}`);
        return res.json({ ok: true });
    } catch (err) {
        console.error('[server] Email error:', err);
        return res.status(500).json({ ok: false, error: String(err) });
    }
});

app.listen(PORT, () => {
    console.log(`\n🚀 Akram Coaching Email API server running at http://localhost:${PORT}\n`);
});
