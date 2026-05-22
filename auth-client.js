'use strict';
// ═══════════════════════════════════════════════════════════════════════════
//  FRONTEND AUTH CLIENT — Praxis-OS
//  Alle Seiten laden diese Datei für Session-Management
// ═══════════════════════════════════════════════════════════════════════════
const Auth = (function () {

  const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? `http://${window.location.hostname}:3001/api`
    : '/api';

  // ── Storage helpers ───────────────────────────────────────────────────
  function saveSession(token, user) {
    localStorage.setItem('paxToken', token);
    localStorage.setItem('paxUser', JSON.stringify(user));
  }
  function clearSession() {
    localStorage.removeItem('paxToken');
    localStorage.removeItem('paxUser');
  }
  function getToken()   { return localStorage.getItem('paxToken'); }
  function getUser()    { try { return JSON.parse(localStorage.getItem('paxUser')); } catch { return null; } }
  function isLoggedIn() { return !!getToken() && !!getUser(); }

  // ── API helper ────────────────────────────────────────────────────────
  async function api(method, endpoint, body) {
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    const token = getToken();
    if (token) opts.headers['Authorization'] = 'Bearer ' + token;
    if (body)  opts.body = JSON.stringify(body);
    const res = await fetch(API_BASE + endpoint, opts);
    const data = await res.json();
    if (!res.ok) throw Object.assign(new Error(data.error || 'Fehler'), data);
    return data;
  }

  // ── Auth methods ──────────────────────────────────────────────────────
  async function register(payload)    { return api('POST', '/auth/register', payload); }
  async function verifyEmail(payload) { return api('POST', '/auth/verify-email', payload); }
  async function verifySms(payload) {
    const data = await api('POST', '/auth/verify-sms', payload);
    if (data.token) saveSession(data.token, data.user);
    return data;
  }
  async function login(email, password) {
    const data = await api('POST', '/auth/login', { email, password });
    if (data.token) saveSession(data.token, data.user);
    return data;
  }
  async function logout() {
    try { await api('POST', '/auth/logout'); } catch {}
    clearSession();
  }
  async function me() { return api('GET', '/auth/me'); }
  async function resendEmail(userId) { return api('POST', '/auth/resend-email', { userId }); }

  // ── Route guards ──────────────────────────────────────────────────────
  function requirePatient() {
    if (!isLoggedIn()) { window.location.href = 'patient-login.html'; return false; }
    const u = getUser();
    if (u.type !== 'patient') { window.location.href = 'patient-login.html'; return false; }
    return true;
  }
  function requireStaff() {
    if (!isLoggedIn()) { window.location.href = 'staff-login.html'; return false; }
    const u = getUser();
    if (u.type !== 'staff') { window.location.href = 'staff-login.html'; return false; }
    return true;
  }
  function redirectIfLoggedIn(type, dest) {
    if (!isLoggedIn()) return;
    const u = getUser();
    if (!type || u.type === type) window.location.href = dest;
  }

  // ── Update nav based on session ───────────────────────────────────────
  function updateNavForSession() {
    const user = getUser();
    // Remove any Dashboard link from public nav (patients should not see it)
    document.querySelectorAll('a[href="dashboard.html"]').forEach(el => {
      if (!document.body.classList.contains('page-dashboard')) el.closest('li')?.remove();
    });
    if (!user) return;
    // Personalise portal link
    document.querySelectorAll('a[href="portal.html"]').forEach(el => {
      el.textContent = `👤 ${user.name.split(' ')[0]}`;
    });
  }

  return {
    register, verifyEmail, verifySms, login, logout, me, resendEmail,
    getToken, getUser, isLoggedIn,
    requirePatient, requireStaff, redirectIfLoggedIn,
    saveSession, clearSession, updateNavForSession,
  };
})();

window.Auth = Auth;
