'use strict';
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const STATIC_DIR = path.join(__dirname, '..'); // serve Abokor/ as static root

// ── Middleware ────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:3001',
    'http://127.0.0.1:3001',
    'http://localhost:8773',
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ── API Routes ────────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));

// ── Health check ──────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ ok: true, ts: new Date().toISOString() }));

// ── Static files (frontend) ───────────────────────────────────────────────
app.use(express.static(STATIC_DIR));

// ── Fallback ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'API-Endpunkt nicht gefunden.' });
  res.sendFile(path.join(STATIC_DIR, 'index.html'));
});

// ── Start ─────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🦷 Praxis-OS Backend läuft: http://localhost:${PORT}`);
  console.log(`   API: http://localhost:${PORT}/api/health`);
  console.log(`   Praxis-Zugangscode (Staff): ${process.env.STAFF_CODE || 'PRAXIS-2026'}\n`);
});
