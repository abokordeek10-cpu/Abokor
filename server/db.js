'use strict';
const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'praxis.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id           TEXT    PRIMARY KEY,
    type         TEXT    NOT NULL CHECK(type IN ('patient','staff')),
    name         TEXT    NOT NULL,
    email        TEXT    UNIQUE NOT NULL,
    phone        TEXT    NOT NULL,
    password_hash TEXT   NOT NULL,
    role         TEXT    NOT NULL DEFAULT 'patient',
    doctor_id    TEXT,
    email_verified  INTEGER NOT NULL DEFAULT 0,
    phone_verified  INTEGER NOT NULL DEFAULT 0,
    email_code      TEXT,
    sms_code        TEXT,
    email_code_exp  INTEGER,
    sms_code_exp    INTEGER,
    created_at   INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS messages (
    id         TEXT    PRIMARY KEY,
    from_id    TEXT    NOT NULL,
    to_type    TEXT    NOT NULL,
    subject    TEXT    NOT NULL,
    body       TEXT    NOT NULL,
    read       INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    FOREIGN KEY (from_id) REFERENCES users(id)
  );
`);

module.exports = db;
