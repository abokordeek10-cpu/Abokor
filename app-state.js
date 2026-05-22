'use strict';
// ═══════════════════════════════════════════════════════════════════════════
//  CENTRAL APPLICATION STATE — Zahnarztpraxis Dr. Abokor Deek
//  Single source of truth for all views (Admin · Arzt · Patient)
// ═══════════════════════════════════════════════════════════════════════════
const AppState = (function () {

  // ── Practitioners ─────────────────────────────────────────────────────────
  const practitioners = [
    { id: 'abokor',    name: 'Dr. Abokor Deek',   short: 'Dr. Abokor',    role: 'Zahnarzt & Praxisinhaber',     color: '#0061E0', rooms: ['Zimmer 1','Zimmer 2'] },
    { id: 'hoffmann',  name: 'Dr. Jana Hoffmann',  short: 'Dr. Hoffmann',  role: 'Zahnärztin',                   color: '#8b5cf6', rooms: ['Zimmer 3'] },
    { id: 'schreiber', name: 'Dr. Tim Schreiber',  short: 'Dr. Schreiber', role: 'Zahnarzt',                     color: '#0ea5e9', rooms: ['Zimmer 4'] },
    { id: 'mueller',   name: 'Dr. Petra Müller',   short: 'Dr. Müller',    role: 'Kieferorthopädin (KFO)',        color: '#10b981', rooms: ['Zimmer 5'] },
    { id: 'weber',     name: 'Dr. Klaus Weber',    short: 'Dr. Weber',     role: 'Oralchirurg',                  color: '#f59e0b', rooms: ['Zimmer 6'] },
    { id: 'schmidt',   name: 'Dr. Lena Schmidt',   short: 'Dr. Schmidt',   role: 'Kinderzahnärztin',             color: '#ec4899', rooms: ['Zimmer 7'] },
    { id: 'braun',     name: 'Dr. Anna Braun',     short: 'Dr. Braun',     role: 'Parodontologie-Spezialistin',  color: '#6366f1', rooms: ['Zimmer 8'] },
  ];

  // ── Patients ──────────────────────────────────────────────────────────────
  const patients = [
    {
      id: 'p001', name: 'Maria S.', fullName: 'Maria Steinberg', dob: '1985-03-12', type: 'regular',
      appointmentStats: { attended: 14, cancelled: 2, noShow: 0 },
      alerts: [],
      lastNote: 'Sehr temperaturempfindlich am Unterkiefer links.',
      lastPZR: '2025-11-20', reminderStatus: 'confirmed',
    },
    {
      id: 'p002', name: 'Klaus W.', fullName: 'Klaus Wagner', dob: '1962-07-08', type: 'regular',
      appointmentStats: { attended: 8, cancelled: 1, noShow: 0 },
      alerts: ['Marcumar / Blutverdünner'],
      lastNote: 'Nimmt Marcumar — ärztliche Freigabe vor invasiven Eingriffen zwingend.',
      lastPZR: '2025-09-15', reminderStatus: 'sent',
    },
    {
      id: 'p003', name: 'Petra M.', fullName: 'Petra Maier', dob: '1990-11-25', type: 'regular',
      appointmentStats: { attended: 6, cancelled: 0, noShow: 0 },
      alerts: [], lastNote: '', lastPZR: '2025-11-15', reminderStatus: 'confirmed',
    },
    {
      id: 'p004', name: 'Thomas B.', fullName: 'Thomas Bauer', dob: '1978-04-30', type: 'regular',
      appointmentStats: { attended: 5, cancelled: 3, noShow: 2 },
      alerts: ['Angstpatient'],
      lastNote: 'Ausgeprägte Zahnarztangst — viel Zeit einplanen, ruhige Atmosphäre.',
      lastPZR: '2024-12-01', reminderStatus: null,
    },
    {
      id: 'p005', name: 'Anna K.', fullName: 'Anna Keller', dob: '1995-08-14', type: 'new',
      appointmentStats: { attended: 1, cancelled: 0, noShow: 0 },
      alerts: ['Latex-Allergie'],
      lastNote: 'Neupatient · Latex-Allergie dokumentiert, latexfreie Handschuhe Pflicht.',
      lastPZR: null, reminderStatus: 'confirmed',
    },
    {
      id: 'p006', name: 'Hans J.', fullName: 'Hans Jäger', dob: '1955-01-20', type: 'regular',
      appointmentStats: { attended: 20, cancelled: 1, noShow: 0 },
      alerts: [], lastNote: '', lastPZR: '2025-11-15', reminderStatus: 'confirmed',
    },
    {
      id: 'p007', name: 'Julia T.', fullName: 'Julia Teschner', dob: '1988-06-03', type: 'regular',
      appointmentStats: { attended: 3, cancelled: 4, noShow: 2 },
      alerts: [],
      lastNote: 'Häufige Kurzfrist-Absagen — manuelle Bestätigung empfohlen.',
      lastPZR: '2025-08-10', reminderStatus: null,
    },
    {
      id: 'p008', name: 'Eva N.', fullName: 'Eva Neumann', dob: '1972-09-17', type: 'regular',
      appointmentStats: { attended: 11, cancelled: 1, noShow: 0 },
      alerts: [], lastNote: '', lastPZR: '2025-10-05', reminderStatus: 'confirmed',
    },
    {
      id: 'p009', name: 'Max O.', fullName: 'Max Obermeier', dob: '1983-12-05', type: 'new',
      appointmentStats: { attended: 0, cancelled: 0, noShow: 0 },
      alerts: [], lastNote: 'Neupatient — Ersttermin.', lastPZR: null, reminderStatus: 'sent',
    },
    {
      id: 'p010', name: 'Brigitte K.', fullName: 'Brigitte Kranz', dob: '1950-02-14', type: 'regular',
      appointmentStats: { attended: 25, cancelled: 2, noShow: 0 },
      alerts: ['Herzschrittmacher'],
      lastNote: 'Herzschrittmacher — kein Ultraschall-Scaling, kein Elektrochirurgiegerät.',
      lastPZR: '2025-11-01', reminderStatus: 'confirmed',
    },
    {
      id: 'p011', name: 'Sabine P.', fullName: 'Sabine Preuss', dob: '1981-05-09', type: 'regular',
      appointmentStats: { attended: 9, cancelled: 0, noShow: 0 },
      alerts: [], lastNote: '', lastPZR: '2025-10-20', reminderStatus: 'confirmed',
    },
    {
      id: 'p012', name: 'Günter H.', fullName: 'Günter Hoffbauer', dob: '1948-11-03', type: 'regular',
      appointmentStats: { attended: 30, cancelled: 1, noShow: 0 },
      alerts: ['Penicillin-Allergie'],
      lastNote: 'Penicillin-Allergie — alternatives Antibiotikum verwenden.',
      lastPZR: '2025-12-01', reminderStatus: 'confirmed',
    },
    {
      id: 'p013', name: 'Frank B.', fullName: 'Frank Becker', dob: '1975-08-22', type: 'regular',
      appointmentStats: { attended: 7, cancelled: 1, noShow: 0 },
      alerts: [], lastNote: '', lastPZR: '2025-10-10', reminderStatus: 'sent',
    },
    {
      id: 'p014', name: 'Stephan R.', fullName: 'Stephan Roth', dob: '1969-03-15', type: 'regular',
      appointmentStats: { attended: 12, cancelled: 0, noShow: 0 },
      alerts: [], lastNote: '', lastPZR: '2025-09-05', reminderStatus: 'confirmed',
    },
  ];

  // ── Appointments (today) ──────────────────────────────────────────────────
  const appointments = [
    { id:'a001', time:'08:00', patientId:'p003', doctor:'schreiber', type:'Prophylaxe',           dur:45, status:'done',     room:null, notfall:false },
    { id:'a002', time:'08:30', patientId:'p010', doctor:'hoffmann',  type:'Vorsorge',              dur:30, status:'done',     room:null, notfall:false },
    { id:'a003', time:'09:00', patientId:'p002', doctor:'abokor',    type:'Zahnersatz-Beratung',   dur:60, status:'done',     room:null, notfall:false },
    { id:'a004', time:'09:30', patientId:'p012', doctor:'schreiber', type:'Check-up',              dur:30, status:'done',     room:null, notfall:false },
    { id:'a005', time:'10:00', patientId:'p013', doctor:'hoffmann',  type:'Implantologie',         dur:60, status:'done',     room:null, notfall:false },
    { id:'a006', time:'10:30', patientId:'p001', doctor:'abokor',    type:'Implantologie-Berat.',  dur:90, status:'active',   room:'Zimmer 2', notfall:false },
    { id:'a007', time:'11:00', patientId:'p011', doctor:'schreiber', type:'Bleaching',             dur:60, status:'upcoming', room:null, notfall:false },
    { id:'a008', time:'12:00', patientId:'p004', doctor:'hoffmann',  type:'Vorsorge / Check-up',   dur:30, status:'upcoming', room:null, notfall:false },
    { id:'a009', time:'13:00', patientId:null,   doctor:'abokor',    type:'NOTFALL',               dur:45, status:'upcoming', room:null, notfall:true  },
    { id:'a010', time:'13:30', patientId:'p008', doctor:'hoffmann',  type:'Prophylaxe',            dur:45, status:'upcoming', room:null, notfall:false },
    { id:'a011', time:'14:00', patientId:'p005', doctor:'abokor',    type:'Bleaching',             dur:60, status:'upcoming', room:null, notfall:false },
    { id:'a012', time:'15:00', patientId:'p014', doctor:'abokor',    type:'Zahnersatz',            dur:45, status:'upcoming', room:null, notfall:false },
    { id:'a013', time:'15:30', patientId:'p006', doctor:'schreiber', type:'Prophylaxe',            dur:45, status:'upcoming', room:null, notfall:false },
    { id:'a014', time:'16:00', patientId:'p009', doctor:'hoffmann',  type:'Zahnersatz-Berat.',     dur:45, status:'upcoming', room:null, notfall:false },
  ];

  // ── Callbacks ─────────────────────────────────────────────────────────────
  const callbacks = [
    { id:'cb001', name:'Julia T.',  phone:'+49 170 123 45 67', reason:'Zahnschmerzen seit gestern',           ageMin:140, urgent:true,  patientId:'p007' },
    { id:'cb002', name:'Robert F.', phone:'+49 152 654 32 10', reason:'Frage zu Kostenplan Implantologie',    ageMin:45,  urgent:false, patientId:null   },
    { id:'cb003', name:'Lisa M.',   phone:'+49 178 987 65 43', reason:'Rezept anfordern',                     ageMin:15,  urgent:false, patientId:null   },
  ];

  // ── Recall list ───────────────────────────────────────────────────────────
  const recallList = [
    { id:'r001', name:'H. Wagner',  lastPZR:'15.11.2025', due:'15.02.2026', interval:'3 Mon.',  status:'overdue', invited:false },
    { id:'r002', name:'S. Bauer',   lastPZR:'20.11.2025', due:'20.05.2026', interval:'6 Mon.',  status:'due',     invited:false },
    { id:'r003', name:'T. Klein',   lastPZR:'01.12.2025', due:'01.06.2026', interval:'6 Mon.',  status:'soon',    invited:false },
    { id:'r004', name:'A. Kohl',    lastPZR:'15.05.2025', due:'15.05.2026', interval:'12 Mon.', status:'due',     invited:false },
    { id:'r005', name:'M. Richter', lastPZR:'08.02.2026', due:'08.08.2026', interval:'6 Mon.',  status:'ok',      invited:false },
    { id:'r006', name:'P. Müller',  lastPZR:'14.03.2026', due:'14.09.2026', interval:'6 Mon.',  status:'ok',      invited:false },
  ];

  // ── Helpers ───────────────────────────────────────────────────────────────
  function getPractitioner(id) { return practitioners.find(p => p.id === id); }
  function getPatient(id)      { return patients.find(p => p.id === id); }

  function getReliability(patient) {
    if (!patient) return null;
    const { attended, cancelled, noShow } = patient.appointmentStats;
    const total = attended + cancelled + noShow;
    if (total === 0) return { level:'new', emoji:'🆕', badge:'Neu', label:'Neupatient', blockOnline:false, manualCall:false, rate:null };
    const rate = Math.round((attended / total) * 100);
    if (noShow > 1 || rate < 75) return {
      level:'red', emoji:'🔴', badge:`🔴 ${rate}%`, color:'#DC2626',
      label:`⚠️ Erhöhtes Ausfall-Risiko · ${noShow} unentschuldigt`,
      blockOnline:true, manualCall:true, rate,
    };
    if (rate < 90) return {
      level:'yellow', emoji:'🟡', badge:`🟡 ${rate}%`, color:'#D97706',
      label:'Kurzfrist-Absagen möglich', blockOnline:false, manualCall:false, rate,
    };
    return {
      level:'green', emoji:'🟢', badge:`🟢 ${rate}%`, color:'#16A34A',
      label:'Zuverlässiger Patient', blockOnline:false, manualCall:false, rate,
    };
  }

  function getReminderHTML(status) {
    if (!status) return '';
    const m = {
      sent:      '<span class="r-badge r-sent"      title="24h-Erinnerung gesendet · Antwort ausstehend">🟡 Ausstehend</span>',
      confirmed: '<span class="r-badge r-confirmed"  title="Termin bestätigt">🟢 Bestätigt</span>',
      cancelled: '<span class="r-badge r-cancelled"  title="Abgesagt — Slot freigegeben">🔴 Abgesagt</span>',
    };
    return m[status] || '';
  }

  // ── Role ──────────────────────────────────────────────────────────────────
  let _role = 'admin';
  let _activeDoctor = 'abokor';
  function setRole(role)         { _role = role;         document.dispatchEvent(new CustomEvent('role-change', { detail: { role } })); }
  function getRole()             { return _role; }
  function setActiveDoctor(id)   { _activeDoctor = id; }
  function getActiveDoctor()     { return _activeDoctor; }

  return {
    practitioners, patients, appointments, callbacks, recallList,
    getPractitioner, getPatient, getReliability, getReminderHTML,
    setRole, getRole, setActiveDoctor, getActiveDoctor,
    recallRevenue: 4750,
  };
})();

window.AppState = AppState;
