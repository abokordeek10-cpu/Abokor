'use strict';
// ═══════════════════════════════════════════════════════════════════════════
//  DASHBOARD v3 — Praxis-OS Controller
// ═══════════════════════════════════════════════════════════════════════════

// ── SPA Router ────────────────────────────────────────────────────────────
function switchView(viewId, scrollId) {
  document.querySelectorAll('.dash-view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(viewId);
  if (target) target.classList.add('active');
  document.querySelectorAll('.snav-item[data-view]').forEach(n => n.classList.remove('active'));

  if (scrollId) {
    requestAnimationFrame(() => {
      const el = document.getElementById(scrollId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

document.querySelectorAll('.snav-item[data-view]').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.snav-item').forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    switchView(item.dataset.view, item.dataset.scroll || null);
  });
});

// ── Role Switcher ─────────────────────────────────────────────────────────
function switchRole(role) {
  AppState.setRole(role);

  document.querySelectorAll('.role-view').forEach(v => { v.classList.add('hidden'); v.classList.remove('active'); });
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));

  const targetView = document.getElementById('role-' + role);
  if (targetView) { targetView.classList.remove('hidden'); targetView.classList.add('active'); }

  const targetBtn = document.querySelector(`.role-btn[data-role="${role}"]`);
  if (targetBtn) targetBtn.classList.add('active');

  document.getElementById('nav-admin').classList.add('hidden');
  document.getElementById('nav-doctor').classList.add('hidden');
  const activeNav = document.getElementById('nav-' + role);
  if (activeNav) activeNav.classList.remove('hidden');

  const title = document.getElementById('topbarTitle');
  if (role === 'doctor') {
    const doc = AppState.getPractitioner(AppState.getActiveDoctor());
    if (title && doc) title.textContent = `Arzt-Ansicht — ${doc.name}`;
    renderDoctorView();
  } else {
    if (title) title.textContent = 'Guten Morgen, Marcus 👋';
  }
}

function changeActiveDoctor(id) {
  AppState.setActiveDoctor(id);
  const doc = AppState.getPractitioner(id);
  const title = document.getElementById('topbarTitle');
  if (title && doc) title.textContent = `Arzt-Ansicht — ${doc.name}`;
  renderDoctorView();
}

// ── Mobile sidebar ────────────────────────────────────────────────────────
document.getElementById('sidebarToggle')?.addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('sidebar-hidden');
});

// ── Render Practitioner Grid ───────────────────────────────────────────────
function renderPracGrid() {
  const grid = document.getElementById('pracGrid');
  if (!grid) return;

  const cols = { schreiber: [], abokor: [], hoffmann: [] };
  AppState.appointments.forEach(a => {
    if (cols[a.doctor] !== undefined) cols[a.doctor].push(a);
  });

  grid.innerHTML = Object.entries(cols).map(([docId, appts]) => {
    const doc = AppState.getPractitioner(docId);
    const count = appts.length;
    const apptHTML = appts.map(a => renderPracAppt(a)).join('');
    return `
      <div class="prac-col">
        <div class="prac-col-header">
          <span class="prac-col-name" style="border-left:3px solid ${doc.color};padding-left:6px;">${doc.short}</span>
          <span class="prac-col-count">${count} Termine</span>
        </div>
        <div class="prac-timeline">${apptHTML}</div>
      </div>`;
  }).join('');
}

function renderPracAppt(a) {
  const patient = a.patientId ? AppState.getPatient(a.patientId) : null;
  const rel = patient ? AppState.getReliability(patient) : null;
  const reminder = patient ? AppState.getReminderHTML(patient.reminderStatus) : '';

  const statusClass = a.status === 'active' ? 'appt-active' : a.status === 'done' ? 'appt-done' : a.notfall ? 'appt-urgent' : '';
  const dotClass = a.status === 'done' ? 'dot-done' : a.status === 'active' ? 'dot-active' : a.notfall ? 'dot-urgent' : '';

  const alertIcons = patient && patient.alerts.length
    ? `<span class="prac-alert-icons" title="${patient.alerts.join(', ')}">⚠️</span>`
    : '';

  const reliabilityBadge = rel ? `<span class="rel-badge rel-${rel.level}" title="${rel.label}">${rel.badge}</span>` : '';

  const manualCallTag = rel && rel.manualCall
    ? `<div class="manual-call-tag">📞 Manuell anrufen — Wackelkandidat!</div>` : '';

  const progressBar = a.status === 'active'
    ? `<div class="prac-pulse-bar"><div class="prac-pulse-fill"></div></div>` : '';

  const statusBadge = a.status === 'active'
    ? `<span class="prac-status-badge sb-active">Läuft</span>`
    : a.status === 'done' ? `<span class="prac-status-badge sb-done">✓</span>`
    : a.notfall ? `<span class="prac-status-badge sb-notfall">Notfall</span>` : '';

  const patientName = patient ? patient.name : (a.notfall ? 'NOTFALL · Anonym' : 'Unbekannt');
  const profileBtn = patient
    ? `<button class="prac-profile-btn" onclick="showPatientProfile('${patient.id}')" title="5-Sekunden-Profil">👁</button>` : '';

  return `
    <div class="prac-appt ${statusClass}">
      <span class="prac-time">${a.time}</span>
      <div class="prac-dot ${dotClass}"></div>
      <div class="prac-body">
        <div class="prac-name-row">
          <span class="prac-patient">${patientName}</span>
          ${alertIcons}${profileBtn}
        </div>
        <div class="prac-badges-row">${reliabilityBadge}${reminder}</div>
        ${manualCallTag}
        <span class="prac-type">${a.type} · ${a.dur} Min.</span>
        ${progressBar}
      </div>
      ${statusBadge}
    </div>`;
}

// ── Render Callbacks ───────────────────────────────────────────────────────
function renderCallbacks() {
  const list = document.getElementById('taskList');
  if (!list) return;

  list.innerHTML = AppState.callbacks.map(cb => {
    const patient = cb.patientId ? AppState.getPatient(cb.patientId) : null;
    const rel = patient ? AppState.getReliability(patient) : null;
    const manualTag = rel && rel.manualCall
      ? `<div class="manual-call-tag">📞 Wackelkandidat — manuell priorisieren!</div>` : '';
    const relBadge = rel ? `<span class="rel-badge rel-${rel.level}">${rel.badge}</span>` : '';
    const ageClass = cb.urgent ? 'task-age warn' : 'task-age';
    const ageText = cb.ageMin >= 60
      ? `vor ${Math.floor(cb.ageMin/60)} Std. ${cb.ageMin%60} Min.`
      : `vor ${cb.ageMin} Min.`;
    const urgentClass = cb.urgent ? 'task-item task-urgent' : 'task-item';

    return `
      <div class="${urgentClass}" data-cb-id="${cb.id}">
        <div class="task-icon">📞</div>
        <div class="task-body">
          <strong>${cb.name} ${relBadge}</strong>
          <span>${cb.reason}</span>
          <span class="${ageClass}">${ageText}${cb.urgent ? ' — dringend' : ''}</span>
          ${manualTag}
        </div>
        <div class="task-actions">
          <a href="tel:${cb.phone.replace(/\s/g,'')}" class="btn-voip">📲 Anrufen</a>
          <button class="btn btn-xs btn-primary" onclick="markDone(this,'task-item')">✓</button>
        </div>
      </div>`;
  }).join('');
}

// ── Render Recall Table ────────────────────────────────────────────────────
function renderRecallTable() {
  const body = document.getElementById('recallBody');
  if (!body) return;

  const statusMap = {
    overdue: '<span class="recall-badge rb-overdue">Überfällig</span>',
    due:     '<span class="recall-badge rb-due">Fällig</span>',
    soon:    '<span class="recall-badge rb-soon">Bald fällig</span>',
    ok:      '<span class="recall-badge rb-ok">OK</span>',
  };

  body.innerHTML = AppState.recallList.map(r => {
    const urgent = r.status === 'overdue' || r.status === 'due';
    const btnClass = urgent ? 'btn btn-xs btn-primary' : 'btn btn-xs btn-outline';
    const disabled = r.status === 'ok' ? 'disabled' : '';
    return `
      <tr class="recall-row ${r.status === 'overdue' ? 'overdue' : r.status === 'due' ? 'due' : ''}">
        <td><strong>${r.name}</strong></td>
        <td>${r.lastPZR}</td>
        <td>${r.due}</td>
        <td>${r.interval}</td>
        <td>${statusMap[r.status] || ''}</td>
        <td><button class="${btnClass}" ${disabled} onclick="sendRecall(this)">${r.invited ? '✓ Eingeladen' : 'Einladen'}</button></td>
      </tr>`;
  }).join('');
}

// ── Doctor View ────────────────────────────────────────────────────────────
function renderDoctorView() {
  const docId = AppState.getActiveDoctor();
  const doc = AppState.getPractitioner(docId);
  const docAppts = AppState.appointments.filter(a => a.doctor === docId);
  const active = docAppts.find(a => a.status === 'active');
  const upcoming = docAppts.filter(a => a.status === 'upcoming');

  const nameEl = document.getElementById('dvDoctorName');
  if (nameEl && doc) nameEl.textContent = doc.name;

  updateDvTime();

  const currentCard = document.getElementById('dvCurrentCard');
  if (!currentCard) return;

  if (active) {
    const patient = active.patientId ? AppState.getPatient(active.patientId) : null;
    const rel = patient ? AppState.getReliability(patient) : null;
    const alerts = patient && patient.alerts.length
      ? patient.alerts.map(a => `<div class="dv-alert-tag">⚠️ ${a}</div>`).join('') : '';
    const note = patient && patient.lastNote
      ? `<div class="dv-note"><strong>Notiz:</strong> ${patient.lastNote}</div>` : '';
    const relBar = rel ? `<div class="dv-rel-bar rel-${rel.level}">${rel.emoji} ${rel.label}</div>` : '';
    const typeTag = patient
      ? `<span class="dv-type-badge">${patient.type === 'new' ? '🆕 Neupatient' : '⭐ Stammpatient'}</span>` : '';

    currentCard.innerHTML = `
      <div class="dvc-header">
        <div class="dvc-status-dot"></div>
        <div class="dvc-label">Aktuell im Behandlungszimmer</div>
        <div class="dvc-room">${active.room || 'Zimmer ?'}</div>
      </div>
      <div class="dvc-patient">
        <div class="dvc-name">${patient ? patient.fullName : 'Anonymer Notfall'} ${typeTag}</div>
        <div class="dvc-treatment">${active.type} · ${active.dur} Min. · seit ${active.time} Uhr</div>
      </div>
      ${alerts ? `<div class="dvc-alerts">${alerts}</div>` : ''}
      ${relBar}
      ${note}
      <div class="dvc-actions">
        <button class="btn btn-primary" onclick="showPatientProfile('${active.patientId}')">👁 5-Sek. Profil</button>
        <button class="btn btn-outline" onclick="markApptDone('${active.id}')">✓ Behandlung abgeschlossen</button>
      </div>
      <div class="prac-pulse-bar" style="margin-top:12px;height:3px;"><div class="prac-pulse-fill"></div></div>`;
  } else {
    currentCard.innerHTML = `<div class="dvc-empty">Kein aktiver Patient — Sie haben Zeit! ☕</div>`;
  }

  const queue = document.getElementById('dvQueue');
  if (!queue) return;
  if (!upcoming.length) {
    queue.innerHTML = `<div class="dv-queue-empty">Keine weiteren Termine heute.</div>`;
    return;
  }
  queue.innerHTML = upcoming.slice(0, 5).map(a => {
    const patient = a.patientId ? AppState.getPatient(a.patientId) : null;
    const rel = patient ? AppState.getReliability(patient) : null;
    const alertIcon = patient && patient.alerts.length ? ' ⚠️' : '';
    return `
      <div class="dv-queue-item" onclick="${patient ? `showPatientProfile('${patient.id}')` : ''}">
        <span class="dvq-time">${a.time}</span>
        <div class="dvq-body">
          <strong>${patient ? patient.fullName : 'Anonym'}${alertIcon}</strong>
          <span>${a.type} · ${a.dur} Min.</span>
        </div>
        ${rel ? `<span class="rel-badge rel-${rel.level}" style="flex-shrink:0;">${rel.emoji}</span>` : ''}
        ${patient ? `<span class="dvq-profile-hint">👁 Profil</span>` : ''}
      </div>`;
  }).join('');
}

function updateDvTime() {
  const el = document.getElementById('dvTime');
  if (el) el.textContent = new Date().toLocaleTimeString('de-DE', { hour:'2-digit', minute:'2-digit' });
}
setInterval(updateDvTime, 30000);

function markApptDone(apptId) {
  const a = AppState.appointments.find(x => x.id === apptId);
  if (a) { a.status = 'done'; a.room = null; }
  renderDoctorView();
  showToast('✓ Behandlung als abgeschlossen markiert');
}

// ── 5-Second Patient Profile Modal ────────────────────────────────────────
function showPatientProfile(patientId) {
  const patient = AppState.getPatient(patientId);
  if (!patient) return;
  const rel = AppState.getReliability(patient);

  document.getElementById('pmAvatar').textContent = patient.fullName.charAt(0);
  document.getElementById('pmName').textContent = patient.fullName;

  const badges = document.getElementById('pmBadges');
  const typeTag = patient.type === 'new'
    ? '<span class="pm-badge pm-new">🆕 Neupatient</span>'
    : '<span class="pm-badge pm-regular">⭐ Stammpatient</span>';
  const reminder = AppState.getReminderHTML(patient.reminderStatus);
  badges.innerHTML = typeTag + ' ' + reminder;

  const alertsEl = document.getElementById('pmAlerts');
  if (patient.alerts.length) {
    alertsEl.innerHTML = patient.alerts.map(a =>
      `<div class="pm-alert-row"><span class="pm-alert-icon">⚠️</span><strong>${a}</strong></div>`
    ).join('');
    alertsEl.classList.remove('hidden');
  } else {
    alertsEl.innerHTML = '';
    alertsEl.classList.add('hidden');
  }

  const relEl = document.getElementById('pmReliability');
  if (rel) {
    relEl.innerHTML = `<div class="pm-rel rel-${rel.level}">${rel.emoji} ${rel.label}${rel.rate ? ` — ${rel.rate}% Erscheinungsquote` : ''}</div>`;
    relEl.classList.remove('hidden');
  } else {
    relEl.classList.add('hidden');
  }

  const noteEl = document.getElementById('pmNote');
  if (patient.lastNote) {
    noteEl.innerHTML = `<div class="pm-note-label">Letzte Notiz</div><div class="pm-note-text">${patient.lastNote}</div>`;
    noteEl.classList.remove('hidden');
  } else {
    noteEl.classList.add('hidden');
  }

  document.getElementById('profileModal').classList.remove('hidden');
}

function closeProfileModal() {
  document.getElementById('profileModal').classList.add('hidden');
}
function closeProfile(e) {
  if (e.target.id === 'profileModal') closeProfileModal();
}
function callInPatient() {
  showToast('📢 Patient wird in den Behandlungsraum gerufen');
  closeProfileModal();
}

// ── AI Telephony Simulation ────────────────────────────────────────────────
const PHONE_SCRIPT = [
  { speaker: 'system', text: '📞 Eingehender Anruf — KI-Assistent übernimmt…', delay: 0 },
  { speaker: 'ki', text: '🤖 KI: „Zahnarztpraxis Dr. Abokor, guten Tag! Um Ihnen optimal zu helfen, wird dieses Gespräch von einer KI ausgewertet. Wenn Sie einverstanden sind, sagen Sie bitte Ja oder bleiben Sie in der Leitung."', delay: 1200 },
  { speaker: 'pause', text: '⏱ Pause…', delay: 4500 },
  { speaker: 'caller', text: '👤 Anrufer: „Ja, ich bin einverstanden."', delay: 6000 },
  { speaker: 'ki', text: '🤖 KI: „Vielen Dank. Wie kann ich Ihnen heute helfen?"', delay: 8000 },
  { speaker: 'caller', text: '👤 Anrufer: „Ich habe seit gestern Abend starke Zahnschmerzen und mein Kiefer schwillt stark an."', delay: 10500 },
  { speaker: 'ki', text: '🤖 KI: „Das tut mir leid. Haben Sie auch Fieber oder Schwierigkeiten beim Schlucken?"', delay: 15000 },
  { speaker: 'caller', text: '👤 Anrufer: „Ja, leichtes Fieber und das Schlucken tut etwas weh."', delay: 18000 },
  { speaker: 'ki', text: '🤖 KI: „Ich verstehe. Aufgrund Ihrer Symptome — Schwellung, Schmerzen und Fieber — stufe ich Ihren Fall als medizinischen Notfall ein. Ich leite Sie sofort an unser Team weiter."', delay: 21000 },
  { speaker: 'triage', text: '🚨 KI-TRIAGE: Schwellung + akute Schmerzen + Fieber → PRIORITÄT 1 — Notfall-Ticket automatisch erstellt', delay: 26000 },
];

let phoneSimRunning = false;

function startPhoneSim() {
  if (phoneSimRunning) return;
  phoneSimRunning = true;

  const transcript = document.getElementById('phoneTranscript');
  const statusDot = document.getElementById('phoneStatusDot');
  const statusLbl = document.getElementById('phoneStatusLbl');
  const triageResult = document.getElementById('phoneTriageResult');

  transcript.innerHTML = '';
  triageResult.classList.add('hidden');
  statusDot.className = 'phone-status-dot dot-active';
  statusLbl.textContent = 'Anruf aktiv';

  PHONE_SCRIPT.forEach(line => {
    setTimeout(() => {
      if (line.speaker === 'triage') {
        triageResult.innerHTML = `<div class="triage-result-inner"><span>🚨</span><div>${line.text}</div></div>`;
        triageResult.classList.remove('hidden');
        addAutoCallback();
        statusDot.className = 'phone-status-dot dot-idle';
        statusLbl.textContent = 'Anruf beendet';
        phoneSimRunning = false;
      } else {
        const el = document.createElement('div');
        el.className = `transcript-line tl-${line.speaker}`;
        el.textContent = line.text;
        transcript.appendChild(el);
        transcript.scrollTop = transcript.scrollHeight;
      }
    }, line.delay);
  });
}

function addAutoCallback() {
  const list = document.getElementById('taskList');
  if (!list) return;
  const el = document.createElement('div');
  el.className = 'task-item task-urgent';
  el.innerHTML = `
    <div class="task-icon">🚨</div>
    <div class="task-body">
      <strong>Anonym · Notfall (KI-Triage)</strong>
      <span class="ai-triage">🤖 Schwellung + Schmerzen + Fieber → Priorität 1</span>
      <span class="task-age warn">Gerade eingegangen</span>
    </div>
    <div class="task-actions">
      <button class="btn btn-xs btn-primary" onclick="markDone(this,'task-item')">✓</button>
    </div>`;
  list.insertBefore(el, list.firstChild);
  updateBadgeCounts();
  showToast('🚨 Notfall-Ticket automatisch erstellt');
}

// ── Mark Done ─────────────────────────────────────────────────────────────
function markDone(btn, itemClass) {
  const item = btn.closest('.' + itemClass);
  if (!item) return;
  const nameEl = item.querySelector('strong');
  const isCallback = itemClass === 'task-item' && nameEl;
  if (isCallback) logCallback(nameEl.textContent.trim());

  Object.assign(item.style, { transition:'opacity 0.3s,transform 0.3s,max-height 0.35s', opacity:'0', transform:'translateX(16px)', maxHeight: item.offsetHeight + 'px', overflow:'hidden' });
  setTimeout(() => { item.style.maxHeight = '0'; item.style.padding = '0'; item.style.marginBottom = '0'; }, 280);
  setTimeout(() => { item.remove(); updateBadgeCounts(); }, 520);
  showToast(isCallback ? `✓ Rückruf erledigt — ${nameEl.textContent.split('\n')[0]}` : '✓ Erledigt');
}

function updateBadgeCounts() {
  const cbCount = document.querySelectorAll('#taskList .task-item').length;
  ['cb-badge','badge-rueckrufe','kpi-rueckrufe'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = cbCount; });

  const reqCount = document.querySelectorAll('#reqList .req-item').length;
  ['req-badge','badge-anfragen','kpi-anfragen'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = reqCount; });
}

function logCallback(name) {
  const log = document.getElementById('callbackLog');
  if (!log) return;
  const time = new Date().toLocaleTimeString('de-DE', { hour:'2-digit', minute:'2-digit' });
  const entry = document.createElement('div');
  entry.className = 'cb-log-entry';
  entry.innerHTML = `<span class="cb-log-icon">✅</span><span>${name.split(/\s+/).slice(0,2).join(' ')} · erledigt ${time}</span>`;
  log.insertBefore(entry, log.firstChild);
  if (log.children.length > 3) log.lastChild.remove();
}

// ── Recall ────────────────────────────────────────────────────────────────
function sendRecall(btn) {
  const row = btn.closest('tr');
  const name = row?.querySelector('td strong')?.textContent || 'Patient';
  btn.textContent = '✓ Eingeladen'; btn.disabled = true; btn.className = 'btn btn-xs btn-outline';
  const status = row?.querySelector('.recall-badge');
  if (status) { status.textContent = 'Einladung gesendet'; status.className = 'recall-badge rb-ok'; }
  row?.classList.remove('overdue', 'due');
  showToast(`✉️ Recall-Einladung an ${name} gesendet`);
}

function inviteAll() {
  document.querySelectorAll('#recallBody .btn-primary:not(:disabled)').forEach(btn => sendRecall(btn));
}

// ── Missing docs ──────────────────────────────────────────────────────────
function requestDoc(btn) {
  const item = btn.closest('.missing-item');
  const name = item?.querySelector('strong')?.textContent || 'Patient';
  btn.textContent = '✓ Angefordert'; btn.disabled = true;
  item?.querySelector('.mi-warn')?.remove();
  showToast(`📧 Unterlagen-Anfrage an ${name} gesendet`);
  const badge = document.getElementById('badge-unterlagen');
  if (badge) badge.textContent = Math.max(0, parseInt(badge.textContent) - 1);
}

// ── Capacity bars ─────────────────────────────────────────────────────────
function animateBars() {
  document.querySelectorAll('.cap-fill').forEach(bar => {
    const target = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => { bar.style.transition = 'width 1.1s ease'; bar.style.width = target; }, 250);
  });
}

// ── KPI counter ───────────────────────────────────────────────────────────
function animateKPIs() {
  document.querySelectorAll('.kpi-pill-num').forEach(el => {
    const target = parseInt(el.textContent);
    if (isNaN(target)) return;
    let cur = 0; el.textContent = 0;
    const timer = setInterval(() => { cur = Math.min(cur + Math.ceil(target/15), target); el.textContent = cur; if (cur >= target) clearInterval(timer); }, 50);
  });
}

// ── Toast ─────────────────────────────────────────────────────────────────
function showToast(msg) {
  let t = document.getElementById('dash-toast');
  if (!t) {
    t = document.createElement('div'); t.id = 'dash-toast';
    Object.assign(t.style, { position:'fixed', bottom:'24px', right:'24px', background:'#0F172A', color:'#fff', padding:'10px 16px', borderRadius:'6px', fontSize:'0.82rem', zIndex:'99999', boxShadow:'0 4px 24px rgba(0,0,0,0.2)', maxWidth:'340px', transition:'opacity 0.25s', opacity:'0', border:'1px solid #1E293B' });
    document.body.appendChild(t);
  }
  t.textContent = msg; t.style.opacity = '1';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.opacity = '0'; }, 3500);
}

// ── Init ──────────────────────────────────────────────────────────────────
renderPracGrid();
renderCallbacks();
renderRecallTable();
animateKPIs();
animateBars();
