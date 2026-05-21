// ─── SPA ROUTER ───────────────────────────────────────────────────────────────
const views = document.querySelectorAll('.dash-view');
const navItems = document.querySelectorAll('.snav-item[data-view]');

function switchView(viewId, scrollTargetId) {
  views.forEach(v => v.classList.remove('active'));
  const target = document.getElementById(viewId);
  if (target) target.classList.add('active');

  navItems.forEach(n => n.classList.remove('active'));

  if (scrollTargetId) {
    requestAnimationFrame(() => {
      const el = document.getElementById(scrollTargetId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

navItems.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    navItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    switchView(item.dataset.view, item.dataset.scroll || null);
  });
});

// ─── MOBILE SIDEBAR TOGGLE ────────────────────────────────────────────────────
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-hidden');
  });
}

// ─── MARK DONE (callbacks & requests) ─────────────────────────────────────────
function markDone(btn, itemClass) {
  const item = btn.closest('.' + itemClass);
  if (!item) return;

  // Log callback if it's a task item (has a name)
  const nameEl = item.querySelector('strong');
  const isCallback = itemClass === 'task-item' && nameEl;
  if (isCallback) logCallback(nameEl.textContent);

  item.style.transition = 'opacity 0.3s, transform 0.3s, max-height 0.3s';
  item.style.opacity = '0';
  item.style.transform = 'translateX(16px)';
  item.style.maxHeight = item.offsetHeight + 'px';
  item.style.overflow = 'hidden';
  setTimeout(() => {
    item.style.maxHeight = '0';
    item.style.padding = '0';
    item.style.marginBottom = '0';
  }, 280);
  setTimeout(() => {
    item.remove();
    updateBadgeCounts();
  }, 520);

  showToast(isCallback ? `✓ Rückruf bei ${nameEl.textContent} erledigt` : '✓ Erledigt');
}

function logCallback(name) {
  const log = document.getElementById('callbackLog');
  if (!log) return;
  const now = new Date();
  const time = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  const entry = document.createElement('div');
  entry.className = 'cb-log-entry';
  entry.innerHTML = `<span class="cb-log-icon">✅</span><span>${name} · Rückruf erledigt um ${time}</span>`;
  log.insertBefore(entry, log.firstChild);
  if (log.children.length > 3) log.lastChild.remove();
}

function updateBadgeCounts() {
  const cbCount = document.querySelectorAll('#taskList .task-item').length;
  const cbBadge = document.getElementById('cb-badge');
  const rBadge = document.getElementById('badge-rueckrufe');
  const kpiRueckrufe = document.getElementById('kpi-rueckrufe');
  if (cbBadge) cbBadge.textContent = cbCount;
  if (rBadge) rBadge.textContent = cbCount;
  if (kpiRueckrufe) kpiRueckrufe.textContent = cbCount;

  const reqCount = document.querySelectorAll('#reqList .req-item').length;
  const reqBadge = document.getElementById('req-badge');
  const aBadge = document.getElementById('badge-anfragen');
  const kpiAnfragen = document.getElementById('kpi-anfragen');
  if (reqBadge) reqBadge.textContent = reqCount;
  if (aBadge) aBadge.textContent = reqCount;
  if (kpiAnfragen) kpiAnfragen.textContent = reqCount;
}

// ─── RECALL ───────────────────────────────────────────────────────────────────
function sendRecall(btn) {
  const row = btn.closest('tr');
  const name = row?.querySelector('td strong')?.textContent || 'Patient';
  btn.textContent = '✓ Eingeladen';
  btn.disabled = true;
  btn.className = 'btn btn-xs btn-outline';
  const status = row?.querySelector('.recall-badge');
  if (status) {
    status.textContent = 'Einladung gesendet';
    status.className = 'recall-badge rb-ok';
  }
  row?.classList.remove('overdue', 'due');
  showToast(`✉️ Recall-Einladung an ${name} gesendet`);
}

// ─── MISSING DOCUMENTS ────────────────────────────────────────────────────────
function requestDoc(btn) {
  const item = btn.closest('.missing-item');
  const name = item?.querySelector('strong')?.textContent || 'Patient';
  btn.textContent = '✓ Angefordert';
  btn.disabled = true;
  item?.querySelector('.mi-warn')?.remove();
  showToast(`📧 Unterlagen-Anfrage an ${name} gesendet`);

  const badge = document.getElementById('badge-unterlagen');
  if (badge) {
    const n = parseInt(badge.textContent) - 1;
    badge.textContent = Math.max(0, n);
  }
}

// ─── ANIMATE CAPACITY BARS ────────────────────────────────────────────────────
function animateBars() {
  document.querySelectorAll('.cap-fill').forEach(bar => {
    const target = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => { bar.style.transition = 'width 1s ease'; bar.style.width = target; }, 200);
  });
}

// ─── ANIMATE KPI NUMBERS ──────────────────────────────────────────────────────
function animateKPIs() {
  document.querySelectorAll('.kpi-pill-num').forEach(el => {
    const target = parseInt(el.textContent);
    if (isNaN(target)) return;
    let current = 0;
    const step = Math.ceil(target / 15);
    el.textContent = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 50);
  });
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function showToast(msg) {
  let toast = document.getElementById('dash-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'dash-toast';
    Object.assign(toast.style, {
      position: 'fixed', bottom: '24px', right: '24px',
      background: '#0F172A', color: '#fff',
      padding: '10px 16px', borderRadius: '6px',
      fontSize: '0.82rem', fontFamily: 'Inter, sans-serif',
      zIndex: '99999', boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
      maxWidth: '320px', transition: 'opacity 0.25s', opacity: '0',
      border: '1px solid #1E293B',
    });
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.style.opacity = '0'; }, 3200);
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
animateKPIs();
animateBars();
