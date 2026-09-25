// SCREEN 17: IMPACT DASHBOARD
import { impactData, userData } from '../js/data.js';
import { pageHeader, bottomNav } from '../js/components.js';

export function renderImpactDashboard() {
  return `
    <div class="screen screen-scroll">
      ${pageHeader('Impact Dashboard')}
      <div class="page-content stagger">
        <div class="gradient-glass anim-slide-up" style="text-align:center;margin-bottom:var(--space-4)">
          <span class="material-symbols-rounded" style="font-size:36px;color:var(--primary);margin-bottom:var(--space-2)">emoji_events</span>
          <div style="font-size:var(--text-lg);font-weight:700;font-family:var(--font-display)">RuralMind AI Impact</div>
          <div style="font-size:var(--text-xs);color:var(--text-secondary)">Transforming rural finance across India</div>
        </div>
        <div class="impact-grid stagger">
          ${impactData.map(d => `
            <div class="impact-card ${d.color} anim-slide-up hover-lift">
              <span class="material-symbols-rounded impact-icon" style="color:${d.color==='green'?'var(--primary)':d.color==='blue'?'var(--secondary)':'var(--accent-dark)'}">${d.icon}</span>
              <div class="impact-value" data-count="${d.value}" data-prefix="${d.prefix}" data-suffix="${d.suffix}">
                ${d.prefix}0${d.suffix}
              </div>
              <div class="impact-label">${d.label}</div>
            </div>`).join('')}
        </div>

        <div class="section-title anim-slide-up">Growth Timeline</div>
        <div class="chart-container anim-slide-up">
          <canvas id="impact-chart" height="180"></canvas>
        </div>
      </div>
      ${bottomNav('impact-dashboard', 'nabard')}
    </div>`;
}

// SCREEN 18: SETTINGS — Fully Interactive
import { toggleDarkMode, isDarkMode, showToast, showModal, closeModal } from '../js/ui.js';

export function renderSettings() {
  const isNabard = userData.role === 'nabard';
  const name = isNabard ? 'Amit Verma' : userData.name;
  const subtext = isNabard ? 'Anand Regional Office • NABARD Officer' : `${userData.phone} • ${userData.business}`;
  const avatar = isNabard ? 'A' : userData.avatar;
  const darkActive = isDarkMode();

  const currentMode = localStorage.getItem('appMode') === 'new_user' ? 'New User (Day 1)' : 'Demo (Lakshmi)';

  return `
    <div class="screen screen-scroll">
      <div class="page-header">
        <button class="back-btn" onclick="window.__goBack()"><span class="material-symbols-rounded">arrow_back</span></button>
        <h1 class="page-title">Settings</h1>
      </div>
      <div class="page-content">
        <div style="text-align:center;padding:var(--space-4) 0" class="anim-slide-up">
          <div style="width:72px;height:72px;border-radius:50%;background:var(--primary-gradient);display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-3);font-size:var(--text-2xl);font-weight:700;color:white">${avatar}</div>
          <div style="font-size:var(--text-md);font-weight:600">${name}</div>
          <div style="font-size:var(--text-xs);color:var(--text-muted)">${subtext}</div>
        </div>
        <div class="settings-list stagger">
          <div class="settings-item anim-slide-up" onclick="window.__showProfileModal()">
            <div class="settings-icon" style="background:var(--primary-50);color:var(--primary)">
              <span class="material-symbols-rounded">person</span>
            </div>
            <div class="settings-item-info">
              <div class="settings-item-title">Profile</div>
              <div class="settings-item-desc">Manage your account</div>
            </div>
            <span class="material-symbols-rounded" style="color:var(--text-muted);font-size:18px">arrow_forward_ios</span>
          </div>

          <div class="settings-item anim-slide-up" onclick="window.__toggleAppMode()">
            <div class="settings-icon" style="background:var(--success-light);color:var(--success)">
              <span class="material-symbols-rounded">settings</span>
            </div>
            <div class="settings-item-info">
              <div class="settings-item-title">App Mode</div>
              <div class="settings-item-desc" id="settings-mode-desc">Currently: ${currentMode}</div>
            </div>
            <span class="material-symbols-rounded" style="color:var(--text-muted);font-size:18px">arrow_forward_ios</span>
          </div>

          <div class="settings-item anim-slide-up" onclick="window.__showLanguageModal()">
            <div class="settings-icon" style="background:var(--secondary-50);color:var(--secondary)">
              <span class="material-symbols-rounded">translate</span>
            </div>
            <div class="settings-item-info">
              <div class="settings-item-title">Language</div>
              <div class="settings-item-desc" id="settings-lang-desc">English</div>
            </div>
            <span class="material-symbols-rounded" style="color:var(--text-muted);font-size:18px">arrow_forward_ios</span>
          </div>

          <div class="settings-item anim-slide-up">
            <div class="settings-icon" style="background:rgba(139,92,246,0.1);color:#8B5CF6">
              <span class="material-symbols-rounded">notifications</span>
            </div>
            <div class="settings-item-info">
              <div class="settings-item-title">Notifications</div>
              <div class="settings-item-desc">Alert preferences</div>
            </div>
            <div class="toggle ${true ? 'active' : ''}" id="notif-toggle" onclick="event.stopPropagation();this.classList.toggle('active');window.__showToast(this.classList.contains('active')?'Notifications enabled':'Notifications disabled','info')"></div>
          </div>

          <div class="settings-item anim-slide-up">
            <div class="settings-icon" style="background:${darkActive ? 'rgba(139,92,246,0.15)' : 'var(--bg-secondary)'};color:${darkActive ? '#8B5CF6' : '#1E293B'}">
              <span class="material-symbols-rounded">${darkActive ? 'light_mode' : 'dark_mode'}</span>
            </div>
            <div class="settings-item-info">
              <div class="settings-item-title">Dark Mode</div>
              <div class="settings-item-desc">${darkActive ? 'On' : 'Off'}</div>
            </div>
            <div class="toggle ${darkActive ? 'active' : ''}" id="dark-toggle" onclick="event.stopPropagation();window.__handleDarkModeToggle()"></div>
          </div>

          <div class="settings-item anim-slide-up" onclick="window.__showToast('Help center coming soon!','info')">
            <div class="settings-icon" style="background:var(--warning-light);color:var(--accent-dark)">
              <span class="material-symbols-rounded">help</span>
            </div>
            <div class="settings-item-info">
              <div class="settings-item-title">Help & Support</div>
              <div class="settings-item-desc">FAQs, contact us</div>
            </div>
            <span class="material-symbols-rounded" style="color:var(--text-muted);font-size:18px">arrow_forward_ios</span>
          </div>

          <div class="settings-item anim-slide-up" onclick="window.__showToast('RuralMind AI v1.0.0 — Built with ❤️ for rural India','info')">
            <div class="settings-icon" style="background:var(--bg-secondary);color:var(--text-muted)">
              <span class="material-symbols-rounded">info</span>
            </div>
            <div class="settings-item-info">
              <div class="settings-item-title">About RuralMind AI</div>
              <div class="settings-item-desc">Version 1.0.0</div>
            </div>
            <span class="material-symbols-rounded" style="color:var(--text-muted);font-size:18px">arrow_forward_ios</span>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-top:var(--space-6)">
          <button class="btn btn-secondary btn-block" style="color:var(--primary);font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px" onclick="window.resetAppMode()">
            <span class="material-symbols-rounded">restart_alt</span> Reset to Demo Mode
          </button>
          <button class="btn btn-ghost btn-block" style="color:var(--danger);font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px" onclick="window.__handleSignOut()">
            <span class="material-symbols-rounded">logout</span> Sign Out
          </button>
        </div>
      </div>
      ${bottomNav('settings', userData.role)}
    </div>`;
}

// Dark mode handler
window.__handleDarkModeToggle = function() {
  const nowDark = toggleDarkMode();
  const toggle = document.getElementById('dark-toggle');
  if (toggle) toggle.classList.toggle('active', nowDark);
  showToast(nowDark ? '🌙 Dark mode enabled' : '☀️ Light mode enabled', 'info');
};

// App mode toggle inline
window.__toggleAppMode = function() {
  const current = localStorage.getItem('appMode');
  const newMode = current === 'new_user' ? 'demo' : 'new_user';
  localStorage.setItem('appMode', newMode);
  const desc = document.getElementById('settings-mode-desc');
  if (desc) {
    desc.textContent = `Currently: ${newMode === 'new_user' ? 'New User (Day 1)' : 'Demo (Lakshmi)'}`;
  }
  showToast(`Switched to ${newMode === 'new_user' ? 'New User' : 'Demo'} mode. Changes apply on next sign-in.`, 'info');
};

// Language modal
window.__showLanguageModal = function() {
  showModal({
    title: 'Select Language',
    content: `
      <div style="display:flex;flex-direction:column;gap:var(--space-2)">
        ${[
          { code: 'en', name: 'English', native: 'English', active: true },
          { code: 'hi', name: 'Hindi', native: 'हिन्दी', active: false },
          { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', active: false },
          { code: 'ta', name: 'Tamil', native: 'தமிழ்', active: false },
          { code: 'mr', name: 'Marathi', native: 'मराठी', active: false },
        ].map(l => `
          <div class="settings-item" style="border-radius:var(--radius-md);border:1.5px solid ${l.active ? 'var(--primary)' : 'var(--border)'};background:${l.active ? 'var(--primary-50)' : 'var(--surface)'}" onclick="window.__selectLanguage('${l.code}', '${l.name}')">
            <div class="settings-item-info">
              <div class="settings-item-title">${l.native}</div>
              <div class="settings-item-desc">${l.name}</div>
            </div>
            ${l.active ? '<span class="material-symbols-rounded" style="color:var(--primary);font-size:20px">check_circle</span>' : ''}
          </div>
        `).join('')}
      </div>
    `
  });
};

window.__selectLanguage = function(code, name) {
  closeModal();
  const desc = document.getElementById('settings-lang-desc');
  if (desc) desc.textContent = name;
  showToast(`Language set to ${name}`, 'success');
};

// Profile modal
window.__showProfileModal = function() {
  const isNabard = userData.role === 'nabard';
  showModal({
    title: 'Profile',
    content: `
      <div style="text-align:center;margin-bottom:var(--space-5)">
        <div style="width:64px;height:64px;border-radius:50%;background:var(--primary-gradient);display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-3);font-size:var(--text-2xl);font-weight:700;color:white">${isNabard ? 'A' : userData.avatar}</div>
      </div>
      <div class="input-group">
        <span class="material-symbols-rounded input-icon">person</span>
        <input type="text" class="input-field" value="${isNabard ? 'Amit Verma' : userData.name}" readonly>
      </div>
      <div class="input-group">
        <span class="material-symbols-rounded input-icon">phone_android</span>
        <input type="tel" class="input-field" value="${isNabard ? '+91 98765 12345' : userData.phone}" readonly>
      </div>
      <div class="input-group">
        <span class="material-symbols-rounded input-icon">storefront</span>
        <input type="text" class="input-field" value="${isNabard ? 'NABARD — Anand Regional Office' : userData.business}" readonly>
      </div>
      <div class="input-group">
        <span class="material-symbols-rounded input-icon">location_on</span>
        <input type="text" class="input-field" value="${userData.village}, ${userData.district}, ${userData.state}" readonly>
      </div>
      <p style="font-size:var(--text-xs);color:var(--text-muted);text-align:center;margin-top:var(--space-2)">Profile editing coming in next update</p>
    `
  });
};

// Sign out handler
window.__handleSignOut = function() {
  showToast('Signed out successfully', 'info');
  setTimeout(() => {
    window.__navigate('login');
  }, 500);
};

window.resetAppMode = function() {
  localStorage.setItem('appMode', 'demo');
  localStorage.removeItem('onboardingComplete');
  localStorage.removeItem('onboardingHealthScore');
  localStorage.removeItem('newUserName');
  localStorage.removeItem('newBusinessName');
  localStorage.removeItem('newRevenue');
  localStorage.removeItem('newExpenses');
  localStorage.removeItem('newCashflow');
  localStorage.removeItem('newTransactions');
  showToast('Reset to Demo mode. Reloading...', 'success');
  setTimeout(() => window.location.reload(), 1000);
};
