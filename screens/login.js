// ============================================
// SCREEN 2: LOGIN — Fully Interactive
// ============================================

import { userData } from '../js/data.js';
import { showToast } from '../js/ui.js';

let generatedOTP = '';
let otpSent = false;

export function renderLogin() {
  return `
    <div class="login-screen screen">
      <div class="login-header anim-slide-up">
        <div class="login-logo">
          <span class="material-symbols-rounded">psychiatry</span>
          <h2>RuralMind AI</h2>
        </div>
        <p class="login-subtitle">Sign in to your Digital Financial Twin</p>
      </div>

      <div class="anim-slide-up" style="animation-delay:0.1s;animation-fill-mode:both">
        <div class="input-group" style="margin-bottom:var(--space-2)">
          <span class="material-symbols-rounded input-icon">phone_android</span>
          <input type="tel" id="login-phone" class="input-field" placeholder="Enter phone (+91 XXXXX XXXXX)" value="+91 " maxlength="16">
        </div>
        <div style="display:flex;justify-content:flex-end;margin-bottom:var(--space-4)">
          <button class="send-otp-btn" id="send-otp-btn" onclick="window.__sendOTP()">
            <span class="material-symbols-rounded" style="font-size:14px">sms</span>
            Send OTP
          </button>
        </div>

        <div id="otp-section" style="opacity:0.4;pointer-events:none;transition:all 0.3s ease">
          <p style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:var(--space-4);text-align:center" id="otp-label">Enter OTP sent to your number</p>

          <div class="otp-group">
            <input type="text" class="otp-input" id="otp-1" maxlength="1" oninput="window.__otpInput(this, 1)" onkeydown="window.__otpKeyDown(event, 1)">
            <input type="text" class="otp-input" id="otp-2" maxlength="1" oninput="window.__otpInput(this, 2)" onkeydown="window.__otpKeyDown(event, 2)">
            <input type="text" class="otp-input" id="otp-3" maxlength="1" oninput="window.__otpInput(this, 3)" onkeydown="window.__otpKeyDown(event, 3)">
            <input type="text" class="otp-input" id="otp-4" maxlength="1" oninput="window.__otpInput(this, 4)" onkeydown="window.__otpKeyDown(event, 4)">
          </div>
        </div>
      </div>

      <div class="login-divider anim-slide-up" style="animation-delay:0.2s;animation-fill-mode:both">
        <span>or continue with</span>
      </div>

      <button class="google-btn anim-slide-up" style="animation-delay:0.25s;animation-fill-mode:both" onclick="window.__googleSignIn()">
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Sign in with Google
      </button>

      <div class="anim-slide-up" style="animation-delay:0.3s;animation-fill-mode:both">
        <p style="font-size:var(--text-sm);font-weight:600;color:var(--text);margin-top:var(--space-6);margin-bottom:var(--space-3);text-align:center">Select Mode</p>
        <div style="display:flex;gap:var(--space-3);margin-bottom:var(--space-4)">
          <div class="role-card ${localStorage.getItem('appMode') !== 'new_user' ? 'selected' : ''}" style="flex:1;padding:var(--space-3)" onclick="window.setAppMode('demo')">
            <span class="material-symbols-rounded" style="font-size:20px">star</span>
            <div style="font-size:var(--text-sm);font-weight:600">Demo (Lakshmi)</div>
          </div>
          <div class="role-card ${localStorage.getItem('appMode') === 'new_user' ? 'selected' : ''}" style="flex:1;padding:var(--space-3)" onclick="window.setAppMode('new_user')">
            <span class="material-symbols-rounded" style="font-size:20px">fiber_new</span>
            <div style="font-size:var(--text-sm);font-weight:600">New User (Day 1)</div>
          </div>
        </div>

        <p style="font-size:var(--text-sm);font-weight:600;color:var(--text);margin-top:var(--space-4);margin-bottom:var(--space-3);text-align:center">Select Your Role</p>
        <div class="role-cards">
          <div class="role-card selected" id="role-entrepreneur" onclick="window.__selectRole('entrepreneur')">
            <span class="material-symbols-rounded">storefront</span>
            <div class="role-name">Entrepreneur</div>
            <div class="role-desc">Business owner</div>
          </div>
          <div class="role-card" id="role-nabard" onclick="window.__selectRole('nabard')">
            <span class="material-symbols-rounded">account_balance</span>
            <div class="role-name">NABARD Officer</div>
            <div class="role-desc">Financial officer</div>
          </div>
        </div>
      </div>

      <button class="btn btn-primary btn-block btn-lg btn-rounded anim-slide-up" id="login-btn" style="margin-top:var(--space-6);animation-delay:0.4s;animation-fill-mode:both" onclick="handleLogin()">
        <span class="material-symbols-rounded">login</span>
        Sign In
      </button>
      <p style="font-size:11px;color:var(--text-muted);margin-top:var(--space-3);text-align:center;line-height:1.4">
        * Enter any phone number, click <strong>Send OTP</strong>, then type the OTP shown in the notification.
      </p>
    </div>`;
}

// Mode toggle (no longer reloads)
window.setAppMode = function(mode) {
  localStorage.setItem('appMode', mode);
  // Update UI immediately
  const demoCard = document.querySelector('[onclick="window.setAppMode(\'demo\')"]');
  const newCard = document.querySelector('[onclick="window.setAppMode(\'new_user\')"]');
  if (demoCard && newCard) {
    demoCard.classList.toggle('selected', mode !== 'new_user');
    newCard.classList.toggle('selected', mode === 'new_user');
  }
  showToast(`Switched to ${mode === 'new_user' ? 'New User' : 'Demo'} mode`, 'info');
};

// Role selection
window.__selectRole = function(role) {
  document.getElementById('role-entrepreneur')?.classList.toggle('selected', role === 'entrepreneur');
  document.getElementById('role-nabard')?.classList.toggle('selected', role === 'nabard');
};

// Send OTP
window.__sendOTP = function() {
  const phone = document.getElementById('login-phone')?.value?.replace(/\s/g, '') || '';
  const digits = phone.replace(/^\+91/, '').replace(/\D/g, '');
  
  if (digits.length < 10) {
    showToast('Please enter a valid 10-digit phone number', 'error');
    const phoneInput = document.getElementById('login-phone');
    if (phoneInput) {
      phoneInput.style.borderColor = 'var(--danger)';
      setTimeout(() => phoneInput.style.borderColor = '', 1500);
    }
    return;
  }

  // Generate random 4-digit OTP
  generatedOTP = String(Math.floor(1000 + Math.random() * 9000));
  otpSent = true;

  // Enable OTP section
  const otpSection = document.getElementById('otp-section');
  if (otpSection) {
    otpSection.style.opacity = '1';
    otpSection.style.pointerEvents = 'auto';
  }

  // Disable send button temporarily
  const btn = document.getElementById('send-otp-btn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span class="material-symbols-rounded" style="font-size:14px">check_circle</span> OTP Sent`;
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = `<span class="material-symbols-rounded" style="font-size:14px">refresh</span> Resend`;
    }, 30000);
  }

  // Show OTP in toast notification
  showToast(`Your OTP is: ${generatedOTP}`, 'success', 8000);

  // Focus first OTP input
  setTimeout(() => document.getElementById('otp-1')?.focus(), 300);
};

// OTP input auto-focus
window.__otpInput = function(el, index) {
  const val = el.value.replace(/\D/g, '');
  el.value = val;
  
  if (val) {
    el.classList.add('filled');
    // Auto-focus next
    if (index < 4) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) next.focus();
    }
  } else {
    el.classList.remove('filled');
  }
};

// OTP backspace handling
window.__otpKeyDown = function(event, index) {
  if (event.key === 'Backspace' && !event.target.value && index > 1) {
    const prev = document.getElementById(`otp-${index - 1}`);
    if (prev) {
      prev.focus();
      prev.value = '';
      prev.classList.remove('filled');
    }
  }
};

// Google sign-in simulation
window.__googleSignIn = function() {
  showToast('Google Sign-In coming soon!', 'info');
};

// Login handler
window.handleLogin = function() {
  const isEntrepreneur = document.getElementById('role-entrepreneur')?.classList.contains('selected');
  const isNew = localStorage.getItem('appMode') === 'new_user';
  const onboardingDone = localStorage.getItem('onboardingComplete') === 'true';

  // Verify OTP if sent
  if (otpSent) {
    const enteredOTP = [1,2,3,4].map(i => document.getElementById(`otp-${i}`)?.value || '').join('');
    
    if (enteredOTP.length < 4) {
      showToast('Please enter the 4-digit OTP', 'error');
      return;
    }
    
    if (enteredOTP !== generatedOTP) {
      showToast('Invalid OTP. Please try again.', 'error');
      [1,2,3,4].forEach(i => {
        const input = document.getElementById(`otp-${i}`);
        if (input) {
          input.classList.add('error');
          setTimeout(() => input.classList.remove('error'), 1500);
        }
      });
      return;
    }
  }

  // Show loading state
  const btn = document.getElementById('login-btn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<div class="spinner"></div> Signing in...`;
  }

  // Simulate auth delay
  setTimeout(() => {
    if (!isEntrepreneur) {
      userData.role = 'nabard';
      showToast('Welcome, NABARD Officer!', 'success');
      window.__navigate('nabard-dashboard');
    } else {
      userData.role = 'entrepreneur';
      if (isNew && !onboardingDone) {
        showToast('Let\'s set up your profile!', 'info');
        window.__navigate('onboarding');
      } else {
        showToast(`Welcome back, ${userData.name}!`, 'success');
        window.__navigate('entrepreneur-dashboard');
      }
    }
  }, 1200);
};
