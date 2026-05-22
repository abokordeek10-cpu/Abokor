'use strict';
// ═══════════════════════════════════════════════════════════════════════════
//  DEMO AUTH CLIENT — GitHub Pages / Statische Demo
//  Kein Server nötig. Alle Seiten sind direkt zugänglich.
//  In Produktion: durch echte auth-client.js ersetzen (mit API-Aufrufen)
// ═══════════════════════════════════════════════════════════════════════════
const Auth = (function () {

  const DEMO_PATIENT = {
    id: 'demo-patient-001',
    name: 'Anna Mustermann',
    email: 'anna@demo.de',
    role: 'patient',
    type: 'patient',
  };

  const DEMO_STAFF = {
    id: 'demo-staff-001',
    name: 'Marcus Berger',
    email: 'marcus@praxis.de',
    role: 'admin',
    type: 'staff',
  };

  // Seite erkennen und passenden Demo-User setzen
  const path = window.location.pathname;
  let _demoUser = DEMO_PATIENT;
  if (path.includes('dashboard') || path.includes('staff')) {
    _demoUser = DEMO_STAFF;
  }

  // ── Immer eingeloggt (Demo) ───────────────────────────────────────────
  function isLoggedIn()   { return true; }
  function getToken()     { return 'demo-token-github-pages'; }
  function getUser()      { return _demoUser; }
  function saveSession()  {}
  function clearSession() {}

  // ── Auth-Aktionen (No-Op in Demo) ─────────────────────────────────────
  async function register()    { return { success: true, userId: 'demo', message: 'Demo-Modus aktiv.' }; }
  async function login()       { return { success: true, token: getToken(), user: _demoUser }; }
  async function logout()      { window.location.href = 'index.html'; }
  async function verifyEmail() { return { success: true, devSmsCode: '123456' }; }
  async function verifySms()   { return { success: true, token: getToken(), user: _demoUser }; }
  async function resendEmail() { return { success: true }; }
  async function me()          { return { user: _demoUser }; }

  // ── Route Guards (kein Redirect im Demo) ─────────────────────────────
  function requirePatient()             { return true; }
  function requireStaff()               { return true; }
  function redirectIfLoggedIn()         {}
  function updateNavForSession() {
    document.querySelectorAll('a[href="dashboard.html"]').forEach(el => {
      if (!document.body.classList.contains('page-dashboard')) el.closest('li')?.remove();
    });
    const u = getUser();
    document.querySelectorAll('a[href="portal.html"]').forEach(el => {
      el.textContent = '👤 ' + u.name.split(' ')[0];
    });
  }

  return {
    register, login, logout, verifyEmail, verifySms, resendEmail, me,
    getToken, getUser, isLoggedIn,
    requirePatient, requireStaff, redirectIfLoggedIn,
    saveSession, clearSession, updateNavForSession,
    DEMO_PATIENT, DEMO_STAFF,
  };
})();

window.Auth = Auth;
