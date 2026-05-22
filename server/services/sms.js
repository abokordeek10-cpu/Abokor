'use strict';

// Twilio-ready SMS service.
// In production: set TWILIO_SID, TWILIO_TOKEN, TWILIO_FROM env vars.
// In development: code is logged to console (no cost).

async function sendSmsCode(phone, name, code) {
  if (process.env.TWILIO_SID && process.env.TWILIO_TOKEN) {
    // ── Production path: real Twilio ──────────────────────────────────
    const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
    await twilio.messages.create({
      body: `Dr. Abokor Praxis: Ihr SMS-Code lautet ${code}. Gültig 10 Min.`,
      from: process.env.TWILIO_FROM,
      to: phone,
    });
    console.log(`📱 SMS an ${phone} gesendet.`);
  } else {
    // ── Development path: console only ────────────────────────────────
    console.log(`\n📱 [DEV-SMS] An: ${phone} · Name: ${name}`);
    console.log(`   SMS-Code: ${code}\n`);
  }
}

module.exports = { sendSmsCode };
