import { Resend } from 'resend';

const BRAND_RED = '#ec3642';

function row(label, value) {
    if (!value || value === 'N/A' || value === '') return '';
    return `
    <tr>
      <td style="padding:10px 16px;font-size:13px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;width:180px;vertical-align:top;border-bottom:1px solid #1f1f1f;">${label}</td>
      <td style="padding:10px 16px;font-size:14px;color:#f3f4f6;vertical-align:top;border-bottom:1px solid #1f1f1f;">${value}</td>
    </tr>`;
}

function section(title, rows) {
    return `
    <div style="margin-bottom:28px;">
      <div style="background:${BRAND_RED};color:#fff;font-size:11px;font-weight:800;letter-spacing:0.15em;text-transform:uppercase;padding:8px 16px;border-radius:8px 8px 0 0;">${title}</div>
      <table style="width:100%;border-collapse:collapse;background:#111;border-radius:0 0 8px 8px;overflow:hidden;">
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

const COACH_EMAIL = process.env.COACH_EMAIL || 'fitresults.pro@gmail.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

export default async function handler(req, res) {
    console.log('[API] Received request:', req.method, req.body?.type);

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!RESEND_API_KEY) {
        console.error('[API] RESEND_API_KEY is missing!');
        return res.status(500).json({ error: 'RESEND_API_KEY not configured in Vercel' });
    }

    const data = {
        ...req.body,
        submittedAt: new Date().toLocaleString('en-GB', {
            timeZone: 'Africa/Algiers',
            dateStyle: 'full',
            timeStyle: 'short',
        }),
    };

    try {
        const resend = new Resend(RESEND_API_KEY);
        const { type, plan, name, whatsapp, message, goal, date, time, submittedAt } = data;

        const isBooking = type === 'booking';
        const isContact = type === 'contact';
        const title = isBooking ? 'New Consultation Booking' : isContact ? 'New Message Received' : 'New Client Intake Received';
        const badge = isBooking ? 'Consultation' : isContact ? 'General Message' : `${plan || 'Standard'} Plan`;

        const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#050505;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:linear-gradient(135deg,#0a0a0a,#1a0a0a);border:1px solid #2a1a1a;border-radius:16px 16px 0 0;padding:32px;text-align:center;">
          <div style="display:inline-block;background:${BRAND_RED};color:#fff;font-size:28px;font-weight:900;letter-spacing:-0.02em;padding:10px 20px;border-radius:12px;margin-bottom:16px;">🏋️ AKRAM COACHING</div>
          <h1 style="color:#fff;font-size:22px;font-weight:800;margin:0 0 8px;letter-spacing:-0.01em;">${title}</h1>
          <div style="background:${BRAND_RED};color:#fff;display:inline-block;padding:6px 18px;border-radius:999px;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">${badge}</div>
          <div style="color:#6b7280;font-size:12px;margin-top:12px;">${submittedAt}</div>
        </td></tr>
        <tr><td style="background:#0d0d0d;border:1px solid #1f1f1f;border-top:none;border-bottom:none;padding:32px;">
          ${section('👤 Personal Information', [
            row('Full Name', name),
            row('WhatsApp', whatsapp),
        ].join(''))}
          ${isBooking ? section('🗓️ Appointment Details', [
            row('Selected Date', date),
            row('Selected Time', time),
        ].join('')) : ''}
          ${section('🎯 Goal & Message', [
            row('Goal', goal),
            row('Message', message),
        ].join(''))}
        </td></tr>
        <tr><td style="background:#0a0a0a;border:1px solid #1f1f1f;border-top:none;border-radius:0 0 16px 16px;padding:24px;text-align:center;">
          <p style="color:#6b7280;font-size:13px;margin:0 0 12px;">Reach the client on WhatsApp: <a href="https://wa.me/${(whatsapp || '').replace(/\D/g, '')}" style="color:${BRAND_RED};">${whatsapp}</a></p>
          <p style="color:#374151;font-size:11px;margin:0;">Akram Coaching Automated Intake System</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

        console.log('[API] Sending email to:', COACH_EMAIL);
        const result = await resend.emails.send({
            from: 'Akram Coaching <onboarding@resend.dev>',
            to: COACH_EMAIL,
            reply_to: whatsapp ? `whatsapp@${whatsapp.replace(/\D/g, '')}.com` : undefined,
            subject: `🏋️ ${isBooking ? 'Book' : 'Msg'} — ${name}`,
            html: html,
        });

        console.log('[API] Resend result:', result);
        return res.status(200).json({ ok: true, id: result.id });
    } catch (err) {
        console.error('[API] Send error:', err);
        return res.status(500).json({ ok: false, error: String(err) });
    }
}
