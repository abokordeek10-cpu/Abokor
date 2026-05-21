// Sidebar active nav
document.querySelectorAll('.snav-item[data-section]').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.snav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// Mobile sidebar toggle
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.style.display = sidebar.style.display === 'none' ? '' : 'none';
  });
}

// Mark task/request as done
function markDone(btn, itemClass) {
  const item = btn.closest('.' + itemClass);
  if (!item) return;
  item.style.transition = 'opacity 0.35s, transform 0.35s';
  item.style.opacity = '0';
  item.style.transform = 'translateX(20px)';
  setTimeout(() => {
    item.remove();
    updateBadgeCount(btn.closest('.dash-card'));
  }, 350);
  showToast('Erledigt ✓');
}

function updateBadgeCount(card) {
  if (!card) return;
  const badge = card.querySelector('.dash-badge');
  const items = card.querySelectorAll('.task-item, .req-item');
  if (badge && !isNaN(parseInt(badge.textContent))) {
    badge.textContent = items.length;
  }
}

// Recall invite
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

// Request missing documents
function requestDoc(btn) {
  const item = btn.closest('.missing-item');
  const name = item?.querySelector('strong')?.textContent || 'Patient';
  btn.textContent = '✓ Angefordert';
  btn.disabled = true;
  item?.querySelector('.mi-warn')?.remove();
  showToast(`📧 Anfrage für fehlende Unterlagen an ${name} gesendet`);
}

// Animate capacity bars on load
function animateBars() {
  document.querySelectorAll('.cap-fill').forEach(bar => {
    const target = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => { bar.style.width = target; }, 300);
  });
}

// Animate KPI numbers
function animateKPIs() {
  document.querySelectorAll('.kpi-num').forEach(el => {
    const target = parseInt(el.textContent);
    if (isNaN(target)) return;
    let current = 0;
    const step = Math.ceil(target / 20);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 40);
  });
}

// Toast
function showToast(msg) {
  let toast = document.getElementById('dash-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'dash-toast';
    Object.assign(toast.style, {
      position: 'fixed', bottom: '24px', right: '24px',
      background: 'var(--dark)', color: '#fff',
      padding: '12px 18px', borderRadius: '10px',
      fontSize: '0.85rem', zIndex: '99999',
      boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
      maxWidth: '320px', transition: 'opacity 0.3s',
    });
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.style.opacity = '0'; }, 3000);
}

// Init
animateKPIs();
animateBars();
