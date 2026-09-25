// ============================================
// RURALMIND AI — UI UTILITIES
// Toast Notifications, Modal System, Dark Mode
// ============================================

// ---- TOAST NOTIFICATION SYSTEM ----
let toastTimeout = null;

export function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const iconMap = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info',
  };

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-icon ${type}">
      <span class="material-symbols-rounded" style="font-size:18px">${iconMap[type] || 'info'}</span>
    </div>
    <div class="toast-text">${message}</div>
    <div class="toast-close" onclick="this.closest('.toast').remove()">
      <span class="material-symbols-rounded" style="font-size:16px">close</span>
    </div>
  `;

  container.appendChild(toast);

  // Auto-remove
  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ---- MODAL SYSTEM ----
let activeModal = null;

export function showModal({ title, content, onClose }) {
  // Remove existing modal
  closeModal();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-sheet">
      <div class="modal-handle"></div>
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="modal-close-btn" data-modal-close>
          <span class="material-symbols-rounded" style="font-size:20px">close</span>
        </button>
      </div>
      <div class="modal-body">
        ${content}
      </div>
    </div>
  `;

  // Close on overlay click (not sheet)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal(onClose);
    }
  });

  // Close button
  overlay.querySelector('[data-modal-close]').addEventListener('click', () => {
    closeModal(onClose);
  });

  document.body.appendChild(overlay);
  activeModal = overlay;

  return overlay;
}

export function closeModal(callback) {
  if (activeModal) {
    activeModal.classList.add('closing');
    setTimeout(() => {
      activeModal.remove();
      activeModal = null;
      if (callback) callback();
    }, 300);
  }
}

// ---- DARK MODE ----
export function initDarkMode() {
  const saved = localStorage.getItem('darkMode');
  if (saved === 'true') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

export function toggleDarkMode() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('darkMode', 'false');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('darkMode', 'true');
  }
  return !isDark;
}

export function isDarkMode() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

// ---- LIVE CLOCK ----
export function startLiveClock(elementId) {
  function update() {
    const el = document.getElementById(elementId);
    if (!el) return;
    const now = new Date();
    const hours = now.getHours();
    const mins = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const h = hours % 12 || 12;
    el.textContent = `${h}:${mins} ${ampm}`;
  }
  update();
  return setInterval(update, 30000);
}

// ---- RELATIVE TIME ----
const startTime = Date.now();
export function getRelativeTime() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  if (elapsed < 60) return 'Just now';
  if (elapsed < 120) return '1 min ago';
  if (elapsed < 3600) return `${Math.floor(elapsed / 60)} min ago`;
  return 'Today';
}

// ---- TRANSACTION MODAL ----
export function showTransactionModal(type, onSubmit) {
  const isIncome = type === 'income';
  const title = isIncome ? 'Add Income' : 'Add Expense';
  const accentColor = isIncome ? 'var(--success)' : 'var(--danger)';

  const incomeCategories = [
    { icon: 'payments', name: 'Milk Sale' },
    { icon: 'account_balance', name: 'Subsidy' },
    { icon: 'handshake', name: 'Trade' },
    { icon: 'currency_rupee', name: 'UPI' },
    { icon: 'agriculture', name: 'Crop Sale' },
    { icon: 'savings', name: 'Interest' },
    { icon: 'redeem', name: 'Gift' },
    { icon: 'more_horiz', name: 'Other' },
  ];

  const expenseCategories = [
    { icon: 'shopping_bag', name: 'Feed' },
    { icon: 'medical_services', name: 'Veterinary' },
    { icon: 'local_gas_station', name: 'Fuel' },
    { icon: 'electric_bolt', name: 'Electricity' },
    { icon: 'construction', name: 'Equipment' },
    { icon: 'local_shipping', name: 'Transport' },
    { icon: 'work', name: 'Labour' },
    { icon: 'more_horiz', name: 'Other' },
  ];

  const categories = isIncome ? incomeCategories : expenseCategories;

  const content = `
    <div style="margin-bottom:var(--space-4)">
      <div style="font-size:var(--text-xs);font-weight:600;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:var(--space-3)">Category</div>
      <div class="category-grid" id="tx-category-grid">
        ${categories.map((c, i) => `
          <div class="category-chip ${i === 0 ? 'selected' : ''}" data-name="${c.name}" onclick="window.__selectCategory(this)">
            <span class="material-symbols-rounded" style="color:${accentColor}">${c.icon}</span>
            <span>${c.name}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div style="margin-bottom:var(--space-4)">
      <div style="font-size:var(--text-xs);font-weight:600;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:var(--space-2)">Amount</div>
      <div style="position:relative">
        <span style="position:absolute;left:16px;top:50%;transform:translateY(-50%);font-size:var(--text-xl);font-weight:700;color:${accentColor}">₹</span>
        <input type="number" id="tx-amount" class="input-field" placeholder="0" 
          style="padding-left:40px;font-size:var(--text-xl);font-weight:700;font-family:var(--font-display);text-align:left;border-color:${accentColor};height:56px"
          min="1" autofocus>
      </div>
    </div>

    <div style="margin-bottom:var(--space-5)">
      <div style="font-size:var(--text-xs);font-weight:600;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:var(--space-2)">Description (optional)</div>
      <input type="text" id="tx-desc" class="input-field" placeholder="Add a note..." 
        style="padding-left:var(--space-4)">
    </div>

    <button class="btn ${isIncome ? 'btn-primary' : ''} btn-block btn-lg btn-rounded" 
      style="${!isIncome ? 'background:linear-gradient(135deg,#EF4444,#F87171);color:white;box-shadow:0 4px 15px rgba(239,68,68,0.3)' : ''}"
      onclick="window.__submitTransaction('${type}')">
      <span class="material-symbols-rounded">${isIncome ? 'add_circle' : 'remove_circle'}</span>
      ${isIncome ? 'Add Income' : 'Add Expense'}
    </button>
  `;

  showModal({ title, content });

  // Focus the amount field after modal animates in
  setTimeout(() => {
    const amtField = document.getElementById('tx-amount');
    if (amtField) amtField.focus();
  }, 400);
}

// Category selection handler
window.__selectCategory = function(el) {
  el.closest('.category-grid').querySelectorAll('.category-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
};

// Submit transaction handler
window.__submitTransaction = function(type) {
  const amount = document.getElementById('tx-amount')?.value;
  const desc = document.getElementById('tx-desc')?.value;
  const selectedCategory = document.querySelector('.category-chip.selected');
  const categoryName = selectedCategory?.dataset.name || (type === 'income' ? 'Income' : 'Expense');
  const name = desc || `${categoryName}`;

  if (!amount || parseFloat(amount) <= 0) {
    showToast('Please enter a valid amount', 'error');
    return;
  }

  closeModal();

  // Add transaction via existing system
  window.addTransactionItem(type, name, parseFloat(amount));
  showToast(`${type === 'income' ? 'Income' : 'Expense'} of ₹${parseFloat(amount).toLocaleString('en-IN')} added!`, 'success');
};

// Expose toast globally
window.__showToast = showToast;
window.__showTransactionModal = showTransactionModal;
window.__closeModal = closeModal;
