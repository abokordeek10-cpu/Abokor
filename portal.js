// Tab navigation
document.querySelectorAll('.ptab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// Pre-select tab from URL
const urlTab = new URLSearchParams(window.location.search).get('tab');
if (urlTab) {
  const tab = document.querySelector(`.ptab[data-tab="${urlTab}"]`);
  if (tab) tab.click();
}

// Modal helpers
function showModal(id) {
  document.getElementById(id).classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
  document.body.style.overflow = '';
}

function confirmCancel() {
  closeModal('cancelModal');
  // Find the first upcoming appointment card and visually remove it
  const card = document.querySelector('#tab-termine .appointment-card.upcoming');
  if (card) {
    card.style.transition = 'opacity 0.4s, transform 0.4s';
    card.style.opacity = '0';
    card.style.transform = 'translateX(-20px)';
    setTimeout(() => card.remove(), 400);
  }
  showToast('Termin wurde abgesagt. Sie erhalten eine Bestätigung per E-Mail.');
}

// Form submissions
const newPatientForm = document.getElementById('newPatientForm');
if (newPatientForm) {
  newPatientForm.addEventListener('submit', e => {
    e.preventDefault();
    showToast('✓ Neupatientenformular erfolgreich übermittelt!');
  });
}

const anamneseForm = document.getElementById('anamneseForm');
if (anamneseForm) {
  anamneseForm.addEventListener('submit', e => {
    e.preventDefault();
    showToast('✓ Anamnese-Bogen gespeichert und an die Praxis übermittelt.');
  });
}

// Yes/No buttons
document.querySelectorAll('.yn-btns').forEach(group => {
  group.querySelectorAll('.yn-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      group.querySelectorAll('.yn-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });
});

// Consent handling
function updateConsent(num, checked) {
  const item   = document.getElementById('consent' + num);
  const status = document.getElementById('cstatus' + num);
  if (checked) {
    item.classList.add('signed');
    status.textContent = '✓ Erteilt';
    status.className = 'consent-status signed-status';
  } else {
    item.classList.remove('signed');
    status.textContent = 'Ausstehend';
    status.className = 'consent-status pending-status';
  }
}

function saveConsents() {
  const all = [1,2,3,4].every(n => document.getElementById('c' + n)?.checked);
  if (all) {
    showToast('✓ Alle Einwilligungen gespeichert. Vielen Dank!');
  } else {
    showToast('Bitte bestätigen Sie alle Einwilligungen.');
  }
}

// Document upload
const docFileInput = document.getElementById('docFileInput');
if (docFileInput) {
  docFileInput.addEventListener('change', () => {
    const list = document.getElementById('docList');
    Array.from(docFileInput.files).forEach(f => {
      const item = document.createElement('div');
      item.className = 'doc-item';
      item.innerHTML = `
        <span class="doc-type-icon">📄</span>
        <div class="doc-info">
          <strong>${f.name}</strong>
          <span>Gerade hochgeladen · ${(f.size / 1024).toFixed(0)} KB</span>
        </div>
        <span class="doc-status pending">⏳ Wird hochgeladen...</span>
      `;
      list.prepend(item);
      // Simulate upload
      setTimeout(() => {
        item.querySelector('.doc-status').textContent = '✓ Empfangen';
        item.querySelector('.doc-status').className = 'doc-status ok';
      }, 1800);
    });
  });
}

// Drag & drop for doc upload
const docUploadArea = document.getElementById('docUploadArea');
if (docUploadArea) {
  docUploadArea.addEventListener('dragover', e => {
    e.preventDefault();
    docUploadArea.style.borderColor = 'var(--primary)';
    docUploadArea.style.background = 'var(--primary-light)';
  });
  docUploadArea.addEventListener('dragleave', () => {
    docUploadArea.style.borderColor = '';
    docUploadArea.style.background = '';
  });
  docUploadArea.addEventListener('drop', e => {
    e.preventDefault();
    docUploadArea.style.borderColor = '';
    docUploadArea.style.background = '';
    if (e.dataTransfer.files.length) {
      docFileInput.files = e.dataTransfer.files;
      docFileInput.dispatchEvent(new Event('change'));
    }
  });
}

// Toast notification
function showToast(msg) {
  let toast = document.getElementById('portal-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'portal-toast';
    Object.assign(toast.style, {
      position: 'fixed', bottom: '24px', right: '24px',
      background: 'var(--dark)', color: '#fff',
      padding: '14px 20px', borderRadius: '10px',
      fontSize: '0.88rem', zIndex: '99999',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      maxWidth: '340px', lineHeight: '1.5',
      transition: 'opacity 0.3s',
    });
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.style.opacity = '0'; }, 3500);
}

// Sticky header color on portal page
const header = document.getElementById('header');
if (header) header.classList.add('header-solid');
