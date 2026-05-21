const state = {
  step: 1,
  selectedType: null,
  selectedDate: null,
  selectedTime: null,
  calDate: new Date(2026, 4, 1), // May 2026
};

const typeConfig = {
  prophylaxe:       { label: 'Prophylaxe',                    icon: '🦷', duration: '45–60 Min.' },
  notfall:          { label: 'Schmerzen / Notfall',            icon: '🚨', duration: '30 Min.' },
  implantologie:    { label: 'Implantologie-Beratung',         icon: '🔩', duration: '30 Min. · kostenlos' },
  zahnersatz:       { label: 'Zahnersatz',                     icon: '👑', duration: '45 Min.' },
  bleaching:        { label: 'Bleaching / Veneers',            icon: '✨', duration: '60–90 Min.' },
  checkup:          { label: 'Vorsorge / Check-up',            icon: '📋', duration: '30 Min.' },
  kfo:              { label: 'Kieferorthopädie (KFO)',          icon: '😁', duration: '30 Min. · kostenlos' },
  oralchirurgie:    { label: 'Oralchirurgie / OP',             icon: '🔬', duration: '30–60 Min.' },
  kinderzahn:       { label: 'Kinderzahnheilkunde',            icon: '🌈', duration: '30–45 Min.' },
  parodontologie:   { label: 'Parodontologie / Zahnfleisch',   icon: '🦠', duration: '45–60 Min.' },
};

const MONTH_NAMES = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
const DAY_NAMES   = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
const TODAY       = new Date(2026, 4, 21); // simulated today

// All possible time slots
const ALL_SLOTS = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30',
                   '13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00'];
const SAT_SLOTS = ALL_SLOTS.slice(0, 6); // shorter Saturday hours

function getBookedSlots(date) {
  const seed = date.getDate() * 3 + date.getMonth() * 7;
  return ALL_SLOTS.filter((_, i) => (seed * (i + 2)) % 5 === 0);
}

function isDayAvailable(date) {
  const dow = date.getDay();
  if (dow === 0) return state.selectedType === 'notfall'; // Sunday: emergency only
  const d = date.getDate();
  const blocked = [4, 18]; // maintenance days this month
  return !blocked.includes(d);
}

function hasFewSlots(date) {
  return getBookedSlots(date).length >= 10;
}

// --- Step navigation ---
function goTo(step) {
  document.getElementById('step' + state.step).classList.add('hidden');
  state.step = step;
  document.getElementById('step' + step).classList.remove('hidden');
  // Update progress
  document.querySelectorAll('.bp-step').forEach(el => {
    const n = parseInt(el.dataset.step);
    el.classList.toggle('active', n === step);
    el.classList.toggle('done', n < step);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Step 1: Treatment selection ---
document.querySelectorAll('.treatment-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.treatment-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    card.querySelector('.tc-check').textContent = '●';
    document.querySelectorAll('.treatment-card:not(.selected) .tc-check').forEach(c => c.textContent = '○');
    state.selectedType = card.dataset.type;
    document.getElementById('toStep2').disabled = false;
  });
});

document.getElementById('toStep2').addEventListener('click', () => {
  goTo(2);
  renderCalendar();
});

// --- Step 2: Calendar & Time slots ---
document.getElementById('calPrev').addEventListener('click', () => {
  state.calDate = new Date(state.calDate.getFullYear(), state.calDate.getMonth() - 1, 1);
  renderCalendar();
});
document.getElementById('calNext').addEventListener('click', () => {
  state.calDate = new Date(state.calDate.getFullYear(), state.calDate.getMonth() + 1, 1);
  renderCalendar();
});

function renderCalendar() {
  const grid = document.getElementById('calGrid');
  const title = document.getElementById('calMonthYear');
  const y = state.calDate.getFullYear();
  const m = state.calDate.getMonth();

  title.textContent = `${MONTH_NAMES[m]} ${y}`;

  const firstDay = new Date(y, m, 1);
  const lastDay  = new Date(y, m + 1, 0);

  // ISO weekday: Mon=0..Sun=6
  let startOffset = firstDay.getDay() - 1;
  if (startOffset < 0) startOffset = 6;

  grid.innerHTML = '';

  for (let i = 0; i < startOffset; i++) {
    grid.appendChild(makeEl('div', 'cal-day empty'));
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(y, m, d);
    const past = date < TODAY && date.toDateString() !== TODAY.toDateString();
    const avail = !past && isDayAvailable(date);
    const isToday = date.toDateString() === TODAY.toDateString();
    const isSel = state.selectedDate && state.selectedDate.toDateString() === date.toDateString();
    const few = avail && hasFewSlots(date);

    const cls = [
      'cal-day',
      past ? 'past' : avail ? (few ? 'busy' : 'available') : 'unavailable',
      isToday && !isSel ? 'today' : '',
      isSel ? 'selected' : '',
    ].filter(Boolean).join(' ');

    const btn = makeEl('button', cls);
    btn.textContent = d;
    btn.disabled = !avail;
    if (avail) btn.addEventListener('click', () => selectDate(date));
    grid.appendChild(btn);
  }
}

function selectDate(date) {
  state.selectedDate = date;
  state.selectedTime = null;
  document.getElementById('toStep3').disabled = true;
  renderCalendar();
  renderTimeSlots(date);
}

function renderTimeSlots(date) {
  const header = document.getElementById('timeslotHeader');
  const grid   = document.getElementById('timeslotGrid');
  const dow    = date.getDay();
  const slots  = dow === 6 ? SAT_SLOTS : ALL_SLOTS;
  const booked = getBookedSlots(date);

  header.innerHTML = `<h3>${DAY_NAMES[dow]}, ${date.getDate()}. ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}</h3><p>Wählen Sie eine Uhrzeit:</p>`;

  grid.innerHTML = '';
  slots.forEach(time => {
    const isBooked = booked.includes(time);
    const isSel    = state.selectedTime === time;
    const cls = ['timeslot', isBooked ? 'booked' : 'free', isSel ? 'selected' : ''].filter(Boolean).join(' ');
    const btn = makeEl('button', cls);
    btn.textContent = time;
    btn.disabled = isBooked;
    if (!isBooked) {
      btn.addEventListener('click', () => {
        state.selectedTime = time;
        document.getElementById('toStep3').disabled = false;
        renderTimeSlots(date);
      });
    }
    grid.appendChild(btn);
  });
}

document.getElementById('backToStep1').addEventListener('click', () => goTo(1));
document.getElementById('toStep3').addEventListener('click', () => goTo(3));

// --- Step 3: Patient data ---
document.querySelectorAll('.ptt-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ptt-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const uploadSection = document.getElementById('uploadSection');
    if (uploadSection) {
      uploadSection.style.display = btn.dataset.type === 'new' ? '' : 'none';
    }
  });
});

// File upload preview
const fileInput = document.getElementById('fileInput');
if (fileInput) {
  fileInput.addEventListener('change', () => {
    const list = document.getElementById('fileList');
    list.innerHTML = '';
    Array.from(fileInput.files).forEach(f => {
      const entry = makeEl('div', 'file-entry');
      entry.innerHTML = `<span>📎 ${f.name} (${(f.size / 1024).toFixed(0)} KB)</span><button type="button" onclick="this.parentElement.remove()">✕</button>`;
      list.appendChild(entry);
    });
  });
}

document.getElementById('backToStep2').addEventListener('click', () => goTo(2));

document.getElementById('toStep4').addEventListener('click', () => {
  const form = document.getElementById('bookingForm');
  const required = form.querySelectorAll('[required]');
  let valid = true;

  required.forEach(el => {
    el.style.borderColor = '';
    if (!el.value.trim()) {
      el.style.borderColor = 'var(--danger)';
      valid = false;
    }
  });

  const consent = document.getElementById('consentData');
  if (consent && !consent.checked) {
    consent.parentElement.style.outline = '2px solid var(--danger)';
    valid = false;
  }

  if (!valid) {
    const firstError = form.querySelector('[style*="danger"]');
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  goTo(4);
  renderSummary();
});

// --- Step 4: Summary & confirm ---
function renderSummary() {
  const tc = typeConfig[state.selectedType];
  const d  = state.selectedDate;
  const form = document.getElementById('bookingForm');
  const fd   = new FormData(form);

  const insuranceMap = { gkv: 'Gesetzlich (GKV)', pkv: 'Privat (PKV)', selbstzahler: 'Selbstzahler' };

  document.getElementById('bookingSummary').innerHTML = `
    <div class="summary-row">
      <div class="summary-icon">${tc.icon}</div>
      <div>
        <h3>${tc.label}</h3>
        <p>Dauer: ${tc.duration}</p>
      </div>
    </div>
    <div class="summary-details">
      <div class="sd-item"><span>Datum</span><strong>${DAY_NAMES[d.getDay()]}, ${d.getDate()}. ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}</strong></div>
      <div class="sd-item"><span>Uhrzeit</span><strong>${state.selectedTime} Uhr</strong></div>
      <div class="sd-item"><span>Patient</span><strong>${fd.get('vorname')} ${fd.get('nachname')}</strong></div>
      <div class="sd-item"><span>E-Mail</span><strong>${fd.get('email')}</strong></div>
      <div class="sd-item"><span>Telefon</span><strong>${fd.get('phone')}</strong></div>
      <div class="sd-item"><span>Versicherung</span><strong>${insuranceMap[fd.get('insurance')] || fd.get('insurance')}</strong></div>
    </div>
    <p class="summary-note">Nach der Buchung erhalten Sie eine Bestätigungs-E-Mail. Bei SMS-Einwilligung erhalten Sie eine Erinnerung 48 Stunden vorher.</p>
  `;
}

document.getElementById('backToStep3').addEventListener('click', () => goTo(3));

document.getElementById('confirmBooking').addEventListener('click', () => {
  const btn = document.getElementById('confirmBooking');
  btn.textContent = 'Wird gebucht...';
  btn.disabled = true;

  setTimeout(() => {
    const tc  = typeConfig[state.selectedType];
    const d   = state.selectedDate;
    const fd  = new FormData(document.getElementById('bookingForm'));
    const ref = 'ZA-' + (Math.floor(Math.random() * 90000) + 10000);
    const smsConsent = document.getElementById('consentReminder')?.checked;

    document.getElementById('confirmationCard').style.display = 'none';
    const success = document.getElementById('bookingSuccess');
    success.classList.remove('hidden');

    document.getElementById('successDetails').innerHTML = `
      <div class="success-info">
        <p><strong>Buchungsnummer:</strong> ${ref}</p>
        <p><strong>Leistung:</strong> ${tc.icon} ${tc.label}</p>
        <p><strong>Termin:</strong> ${DAY_NAMES[d.getDay()]}, ${d.getDate()}. ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()} · ${state.selectedTime} Uhr</p>
        <p><strong>Patient:</strong> ${fd.get('vorname')} ${fd.get('nachname')}</p>
      </div>
      <div class="success-notifications">
        <div class="sn-item">✉️ Bestätigung wurde an <strong>${fd.get('email')}</strong> gesendet</div>
        ${smsConsent ? '<div class="sn-item">📱 SMS-Erinnerung 48h vorher aktiviert</div>' : ''}
        <div class="sn-item">📅 <a href="#" onclick="return false" style="color:var(--primary)">In Kalender eintragen (ICS)</a></div>
      </div>
    `;
  }, 1400);
});

// Pre-select treatment from URL param
const urlParams = new URLSearchParams(window.location.search);
const preType = urlParams.get('type');
if (preType) {
  const card = document.querySelector(`.treatment-card[data-type="${preType}"]`);
  if (card) {
    card.click();
  }
}

// Helper
function makeEl(tag, className) {
  const el = document.createElement(tag);
  el.className = className;
  return el;
}
