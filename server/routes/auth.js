'use strict';
const express  = require('express');
const bcrypt   = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const db       = require('../db');
const { signToken, requireAuth } = require('../middleware/auth');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../services/email');
const { sendSmsCode } = require('../services/sms');

const router = express.Router();
const STAFF_CODE = process.env.STAFF_CODE || 'PRAXIS-2026';

// ── Helpers ───────────────────────────────────────────────────────────────
function randomCode() { return String(Math.floor(100000 + Math.random() * 900000)); }
function nowPlus(minutes) { return Math.floor(Date.now() / 1000) + minutes * 60; }
function now() { return Math.floor(Date.now() / 1000); }

// ── POST /api/auth/register ───────────────────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { type, name, email, phone, password, role, doctorId, staffCode } = req.body;

    if (!type || !name || !email || !phone || !password)
      return res.status(400).json({ error: 'Alle Felder sind Pflichtfelder.' });
    if (!['patient', 'staff'].includes(type))
      return res.status(400).json({ error: 'Ungültiger Benutzertyp.' });
    if (password.length < 8)
      return res.status(400).json({ error: 'Passwort muss mindestens 8 Zeichen haben.' });
    if (type === 'staff' && staffCode !== STAFF_CODE)
      return res.status(403).json({ error: 'Ungültiger Praxis-Zugangscode.' });

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) return res.status(409).json({ error: 'E-Mail-Adresse bereits registriert.' });

    const id = uuidv4();
    const hash = await bcrypt.hash(password, 12);
    const emailCode = randomCode();
    const userRole = type === 'patient' ? 'patient' : (role || 'admin');

    db.prepare(`
      INSERT INTO users (id, type, name, email, phone, password_hash, role, doctor_id,
                         email_code, email_code_exp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(id, type, name, email, phone, hash, userRole, doctorId || null,
          emailCode, nowPlus(15));

    const previewUrl = await sendVerificationEmail(email, name, emailCode);

    res.json({
      success: true,
      userId: id,
      message: `Bestätigungscode an ${email} gesendet.`,
      ...(previewUrl ? { emailPreview: previewUrl } : {}),
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Serverfehler bei der Registrierung.' });
  }
});

// ── POST /api/auth/verify-email ───────────────────────────────────────────
router.post('/verify-email', async (req, res) => {
  try {
    const { userId, code } = req.body;
    if (!userId || !code) return res.status(400).json({ error: 'Fehlende Daten.' });

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    if (!user) return res.status(404).json({ error: 'Benutzer nicht gefunden.' });
    if (user.email_verified) return res.status(400).json({ error: 'E-Mail bereits bestätigt.' });
    if (user.email_code !== code) return res.status(400).json({ error: 'Falscher Code.' });
    if (user.email_code_exp < now()) return res.status(400).json({ error: 'Code abgelaufen.' });

    const smsCode = randomCode();
    db.prepare(`UPDATE users SET email_verified=1, sms_code=?, sms_code_exp=?,
                email_code=NULL, email_code_exp=NULL WHERE id=?`
    ).run(smsCode, nowPlus(10), userId);

    await sendSmsCode(user.phone, user.name, smsCode);

    res.json({
      success: true,
      message: `SMS-Code an ${user.phone} gesendet.`,
      ...(process.env.NODE_ENV !== 'production' ? { devSmsCode: smsCode } : {}),
    });
  } catch (err) {
    console.error('Verify-email error:', err);
    res.status(500).json({ error: 'Serverfehler.' });
  }
});

// ── POST /api/auth/verify-sms ─────────────────────────────────────────────
router.post('/verify-sms', async (req, res) => {
  try {
    const { userId, code } = req.body;
    if (!userId || !code) return res.status(400).json({ error: 'Fehlende Daten.' });

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    if (!user) return res.status(404).json({ error: 'Benutzer nicht gefunden.' });
    if (!user.email_verified) return res.status(400).json({ error: 'E-Mail noch nicht bestätigt.' });
    if (user.phone_verified) return res.status(400).json({ error: 'Telefon bereits bestätigt.' });
    if (user.sms_code !== code) return res.status(400).json({ error: 'Falscher SMS-Code.' });
    if (user.sms_code_exp < now()) return res.status(400).json({ error: 'SMS-Code abgelaufen.' });

    db.prepare(`UPDATE users SET phone_verified=1, sms_code=NULL, sms_code_exp=NULL WHERE id=?`
    ).run(userId);

    const token = signToken({ id: user.id, role: user.role, type: user.type, name: user.name });

    res.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, type: user.type },
      message: 'Konto erfolgreich bestätigt!',
    });
  } catch (err) {
    console.error('Verify-sms error:', err);
    res.status(500).json({ error: 'Serverfehler.' });
  }
});

// ── POST /api/auth/login ──────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'E-Mail und Passwort erforderlich.' });

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) return res.status(401).json({ error: 'E-Mail oder Passwort falsch.' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'E-Mail oder Passwort falsch.' });

    if (!user.email_verified) {
      return res.status(403).json({
        error: 'E-Mail noch nicht bestätigt.',
        needsVerification: true,
        userId: user.id,
        step: 'email',
      });
    }
    if (!user.phone_verified) {
      return res.status(403).json({
        error: 'Telefonnummer noch nicht bestätigt.',
        needsVerification: true,
        userId: user.id,
        step: 'sms',
      });
    }

    const token = signToken({ id: user.id, role: user.role, type: user.type, name: user.name });
    res.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, type: user.type },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Serverfehler.' });
  }
});

// ── POST /api/auth/resend-email ───────────────────────────────────────────
router.post('/resend-email', async (req, res) => {
  try {
    const { userId } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    if (!user) return res.status(404).json({ error: 'Benutzer nicht gefunden.' });
    if (user.email_verified) return res.status(400).json({ error: 'E-Mail bereits bestätigt.' });

    const code = randomCode();
    db.prepare('UPDATE users SET email_code=?, email_code_exp=? WHERE id=?').run(code, nowPlus(15), userId);
    const previewUrl = await sendVerificationEmail(user.email, user.name, code);
    res.json({ success: true, ...(previewUrl ? { emailPreview: previewUrl } : {}) });
  } catch (err) { res.status(500).json({ error: 'Serverfehler.' }); }
});

// ── GET /api/auth/me ──────────────────────────────────────────────────────
router.get('/me', requireAuth, (req, res) => {
  const user = db.prepare('SELECT id,name,email,phone,role,type FROM users WHERE id=?').get(req.user.id);
  if (!user) return res.status(404).json({ error: 'Benutzer nicht gefunden.' });
  res.json({ user });
});

// ── POST /api/auth/logout ─────────────────────────────────────────────────
router.post('/logout', (req, res) => {
  // JWT is stateless — client deletes the token
  res.json({ success: true });
});

module.exports = router;
