import { Resend } from 'resend';

const COACH_EMAIL = process.env.COACH_EMAIL || 'fitresults.pro@gmail.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const data = {
        ...req.body,
        submittedAt: new Date().toLocaleString('en-GB', {
            timeZone: 'Africa/Algiers',
            dateStyle: 'full',
            timeStyle: 'short',
        }),
    };

    if (!RESEND_API_KEY) {
        console.warn('[api] RESEND_API_KEY not set — skipping email send.');
        return res.status(200).json({ ok: false, warn: 'RESEND_API_KEY not configured' });
    }

    try {
        const resend = new Resend(RESEND_API_KEY);

        // Basic templates based on server/emails.js logic
        const subject = data.type === 'booking'
            ? `🗓️ New Booking: ${data.name}`
            : `📩 New Contact: ${data.name}`;

        const html = `
            <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
                <h2>${subject}</h2>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
                <p><strong>Goal:</strong> ${data.goal}</p>
                <p><strong>Message:</strong> ${data.message}</p>
                ${data.date ? `<p><strong>Date:</strong> ${data.date}</p>` : ''}
                ${data.time ? `<p><strong>Time:</strong> ${data.time}</p>` : ''}
                <p style="font-size: 12px; color: #888;">Submitted at: ${data.submittedAt}</p>
            </div>
        `;

        const emailOptions = {
            from: 'Akram Coaching <onboarding@resend.dev>',
            to: COACH_EMAIL,
            reply_to: data.whatsapp ? `whatsapp@${data.whatsapp}.com` : undefined, // fallback
            subject: subject,
            html: html,
        };

        const result = await resend.emails.send(emailOptions);
        console.log('[api] Email result:', result);

        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error('[api] Email error:', err);
        return res.status(500).json({ ok: false, error: String(err) });
    }
}
