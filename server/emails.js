/**
 * Akram Coaching — Email Templates
 * Two templates: coachEmail (intake data) + clientConfirmationEmail
 */

const BRAND_RED = '#ec3642';
const DARK = '#0a0a0a';

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

/**
 * Email sent to Coach Akram with full intake data
 */
function coachEmail(data) {
  const {
    type, plan,
    name, email, whatsapp, age, gender, country,
    weight, height, injuries, targetDescription,
    goal, frontPic, sidePic, backPic,
    date, time, message,
    submittedAt,
  } = data;

  const isBooking = type === 'booking';
  const isContact = type === 'contact';
  const title = isBooking ? 'New Consultation Booking' : isContact ? 'New Message Received' : 'New Client Intake Received';
  const badge = isBooking ? 'Consultation' : isContact ? 'General Message' : `${plan} Plan`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#050505;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#0a0a0a,#1a0a0a);border:1px solid #2a1a1a;border-radius:16px 16px 0 0;padding:32px;text-align:center;">
          <div style="display:inline-block;background:${BRAND_RED};color:#fff;font-size:28px;font-weight:900;letter-spacing:-0.02em;padding:10px 20px;border-radius:12px;margin-bottom:16px;">🏋️ AKRAM COACHING</div>
          <h1 style="color:#fff;font-size:22px;font-weight:800;margin:0 0 8px;letter-spacing:-0.01em;">${title}</h1>
          <div style="background:${BRAND_RED};color:#fff;display:inline-block;padding:6px 18px;border-radius:999px;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">${badge}</div>
          <div style="color:#6b7280;font-size:12px;margin-top:12px;">${submittedAt}</div>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#0d0d0d;border:1px solid #1f1f1f;border-top:none;border-bottom:none;padding:32px;">

          ${section('👤 Personal Information', [
    row('Full Name', name),
    row('Email', email),
    row('WhatsApp', whatsapp),
    isBooking ? '' : row('Age', age ? `${age} years` : ''),
    isBooking ? '' : row('Gender', gender),
    isBooking ? '' : row('Country', country),
  ].join(''))}

          ${isBooking ? section('🗓️ Appointment Details', [
    row('Selected Date', date),
    row('Selected Time', time),
  ].join('')) : ''}

          ${!isBooking ? section('🏥 Body & Health', [
    row('Weight', weight ? `${weight} kg` : ''),
    row('Height', height ? `${height} cm` : ''),
    row('Injuries / Limitations', injuries || 'None'),
  ].join('')) : ''}

          ${!isBooking ? section('🎯 Goal & Message', [
    row('Training Goal', goal),
    row('Message', message),
  ].join('')) : section('🎯 Consultation Goal', [
    row('Goal', goal),
    row('Message', message),
  ].join(''))}

          ${!isBooking && (frontPic || sidePic || backPic) ? `
          <div style="margin-bottom:28px;">
            <div style="background:${BRAND_RED};color:#fff;font-size:11px;font-weight:800;letter-spacing:0.15em;text-transform:uppercase;padding:8px 16px;border-radius:8px 8px 0 0;">📸 Progress Photos</div>
            <div style="background:#111;padding:16px;border-radius:0 0 8px 8px;text-align:center;">
              <p style="color:#9ca3af;font-size:12px;margin:0 0 16px;">Photos are also attached to this email as files.</p>
              <div style="display:inline-block;width:100%;max-width:500px;">
                ${frontPic ? `<div style="margin-bottom:12px;"><div style="color:#6b7280;font-size:10px;text-transform:uppercase;margin-bottom:4px;">Front</div><img src="${frontPic}" style="width:100%;border-radius:8px;border:1px solid #333;" alt="Front"></div>` : ''}
                ${sidePic ? `<div style="margin-bottom:12px;"><div style="color:#6b7280;font-size:10px;text-transform:uppercase;margin-bottom:4px;">Side</div><img src="${sidePic}" style="width:100%;border-radius:8px;border:1px solid #333;" alt="Side"></div>` : ''}
                ${backPic ? `<div style="margin-bottom:12px;"><div style="color:#6b7280;font-size:10px;text-transform:uppercase;margin-bottom:4px;">Back</div><img src="${backPic}" style="width:100%;border-radius:8px;border:1px solid #333;" alt="Back"></div>` : ''}
              </div>
            </div>
          </div>` : !isBooking ? `
          <div style="margin-top:20px;padding:16px;background:#1a0a0a;border:1px solid #2a1a1a;border-radius:12px;">
            <p style="color:#d1d5db;font-size:14px;margin:0;">📸 <strong>Note:</strong> Photos were not provided or failed to load in this submission.</p>
          </div>` : ''}

        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#0a0a0a;border:1px solid #1f1f1f;border-top:none;border-radius:0 0 16px 16px;padding:24px;text-align:center;">
          <p style="color:#6b7280;font-size:13px;margin:0 0 12px;">Reply directly to this email or reach the client on WhatsApp: <a href="https://wa.me/${(whatsapp || '').replace(/\D/g, '')}" style="color:${BRAND_RED};">${whatsapp}</a></p>
          <p style="color:#374151;font-size:11px;margin:0;">Akram Coaching Automated Intake System</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return {
    subject: `🏋️ ${isBooking ? 'New Booking' : 'New Intake'} — ${name}${!isBooking ? ` — ${plan} Plan` : ''}`,
    html,
  };
}

/**
 * Confirmation email sent to the client
 */
function clientConfirmationEmail(data) {
  const { name, plan, goal } = data;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#050505;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Hero -->
        <tr><td style="background:linear-gradient(135deg,#0a0a0a 0%,#1a0505 100%);border:1px solid #2a1010;border-radius:16px 16px 0 0;padding:48px 32px;text-align:center;">
          <div style="font-size:48px;margin-bottom:16px;">🔥</div>
          <h1 style="color:#fff;font-size:28px;font-weight:900;letter-spacing:-0.02em;margin:0 0 8px;">Welcome to the Family, ${name}!</h1>
          <p style="color:#9ca3af;font-size:16px;margin:0;font-weight:400;">Your transformation journey starts now.</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#0d0d0d;border:1px solid #1f1f1f;border-top:none;border-bottom:none;padding:40px 32px;">

          <!-- Plan badge -->
          <div style="text-align:center;margin-bottom:32px;">
            <div style="display:inline-block;background:${BRAND_RED};color:#fff;font-size:13px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;padding:10px 24px;border-radius:999px;box-shadow:0 0 20px rgba(236,54,66,0.3);">
              ${plan} Plan — ${goal}
            </div>
          </div>

          <p style="color:#d1d5db;font-size:16px;line-height:1.7;margin:0 0 20px;">
            We've received your intake form and <strong style="color:#fff;">Coach Akram personally reviews every application</strong>. You will hear from him directly on WhatsApp within <strong style="color:${BRAND_RED};">24–48 hours</strong>.
          </p>

          <p style="color:#d1d5db;font-size:16px;line-height:1.7;margin:0 0 32px;">
            In the meantime, feel free to browse our transformation gallery or reach out directly on WhatsApp if you have any urgent questions.
          </p>

          <!-- CTA -->
          <div style="text-align:center;margin-bottom:32px;">
            <a href="https://wa.me/213783766209" style="display:inline-block;background:${BRAND_RED};color:#fff;font-size:14px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;padding:16px 40px;border-radius:999px;text-decoration:none;box-shadow:0 0 24px rgba(236,54,66,0.35);">
              💬 Message Coach Akram
            </a>
          </div>

          <!-- What to expect -->
          <div style="background:#111;border:1px solid #1f1f1f;border-radius:12px;padding:24px;margin-bottom:0;">
            <div style="color:${BRAND_RED};font-size:11px;font-weight:800;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:16px;">What Happens Next</div>
            <div style="color:#d1d5db;font-size:14px;line-height:1.8;">
              <div style="margin-bottom:8px;">✅ &nbsp;Coach Akram reviews your intake profile</div>
              <div style="margin-bottom:8px;">📋 &nbsp;A fully personalized plan is designed for you</div>
              <div style="margin-bottom:8px;">📱 &nbsp;He contacts you on WhatsApp to get started</div>
              <div>🏆 &nbsp;Your 90-day transformation begins</div>
            </div>
          </div>

        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#0a0a0a;border:1px solid #1f1f1f;border-top:none;border-radius:0 0 16px 16px;padding:24px 32px;text-align:center;">
          <div style="margin-bottom:16px;">
            <a href="https://www.instagram.com/dr_akramikni/" style="display:inline-block;margin:0 8px;color:#6b7280;font-size:12px;text-decoration:none;">Instagram</a>
            <a href="https://www.youtube.com/@Dr_Akramikni" style="display:inline-block;margin:0 8px;color:#6b7280;font-size:12px;text-decoration:none;">YouTube</a>
            <a href="https://www.tiktok.com/@coach_akram" style="display:inline-block;margin:0 8px;color:#6b7280;font-size:12px;text-decoration:none;">TikTok</a>
          </div>
          <p style="color:#374151;font-size:11px;margin:0;">Akram Coaching — Algeria & Qatar — Coaching Worldwide</p>
          <p style="color:#374151;font-size:11px;margin:4px 0 0;">© ${new Date().getFullYear()} Coach Akram. All rights reserved.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return {
    subject: `Welcome to Akram Coaching, ${name}! Your journey starts now 🔥`,
    html,
  };
}

export { coachEmail, clientConfirmationEmail };
