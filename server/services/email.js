'use strict';
const nodemailer = require('nodemailer');

let transporter = null;
let previewUrl   = null;

async function getTransporter() {
  if (transporter) return transporter;

  if (process.env.SMTP_HOST) {
    // Production: use real SMTP (SendGrid, Postmark, etc.)
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  } else {
    // Development: try Ethereal, fall back to console-only if network unavailable
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
      console.log('📧 Ethereal-E-Mail-Konto erstellt:', testAccount.user);
    } catch {
      // No network access to Ethereal — use JSON transport (logs to console)
      transporter = { sendMail: async (opts) => { console.log(`\n📧 [DEV-EMAIL] An: ${opts.to} Betreff: ${opts.subject}`); return {}; } };
      console.log('📧 E-Mail-Vorschau nicht verfügbar — Code wird in der Konsole ausgegeben.');
    }
  }
  return transporter;
}

async function sendVerificationEmail(to, name, code) {
  const t = await getTransporter();
  const info = await t.sendMail({
    from: `"Zahnarztpraxis Dr. Abokor" <no-reply@praxis-abokor.de>`,
    to,
    subject: `Ihr Bestätigungscode: ${code}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;">
        <div style="background:#0061E0;padding:24px;border-radius:8px 8px 0 0;text-align:center;">
          <h2 style="color:#fff;margin:0;">🦷 Dr. Abokor Deek</h2>
          <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;">Zahnarztpraxis Berlin-Mitte</p>
        </div>
        <div style="background:#fff;padding:28px;border:1px solid #E2E8F0;border-top:none;border-radius:0 0 8px 8px;">
          <p style="margin:0 0 16px;">Hallo <strong>${name}</strong>,</p>
          <p>Ihr E-Mail-Bestätigungscode lautet:</p>
          <div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:8px;text-align:center;padding:20px;margin:20px 0;">
            <span style="font-size:2.2rem;font-weight:800;letter-spacing:10px;color:#0061E0;">${code}</span>
          </div>
          <p style="color:#64748B;font-size:0.85rem;">Dieser Code ist 15 Minuten gültig. Geben Sie ihn bitte auf der Bestätigungsseite ein.</p>
          <hr style="border:none;border-top:1px solid #E2E8F0;margin:20px 0;">
          <p style="color:#94A3B8;font-size:0.75rem;margin:0;">Wenn Sie diese Registrierung nicht angefordert haben, ignorieren Sie diese E-Mail.</p>
        </div>
      </div>`,
  });

  const url = nodemailer.getTestMessageUrl(info);
  if (url) {
    previewUrl = url;
    console.log(`\n📧 E-Mail-Vorschau (Ethereal): ${url}\n`);
  }
  return url;
}

async function sendPasswordResetEmail(to, name, code) {
  const t = await getTransporter();
  const info = await t.sendMail({
    from: `"Zahnarztpraxis Dr. Abokor" <no-reply@praxis-abokor.de>`,
    to,
    subject: `Passwort zurücksetzen — Code: ${code}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;">
        <h2 style="color:#0061E0;">🦷 Passwort zurücksetzen</h2>
        <p>Hallo <strong>${name}</strong>,</p>
        <p>Ihr Reset-Code:</p>
        <div style="background:#EFF6FF;border:2px solid #BFDBFE;border-radius:8px;text-align:center;padding:20px;margin:20px 0;">
          <span style="font-size:2.2rem;font-weight:800;letter-spacing:10px;color:#0061E0;">${code}</span>
        </div>
        <p style="color:#64748B;font-size:0.85rem;">15 Minuten gültig.</p>
      </div>`,
  });

  const url = nodemailer.getTestMessageUrl(info);
  if (url) console.log(`📧 Passwort-Reset-E-Mail Vorschau: ${url}`);
  return url;
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail };
