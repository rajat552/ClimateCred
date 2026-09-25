// ============================================
// SCREEN: NEW USER ONBOARDING
// ============================================

import { trainedModel } from '../js/trained_model.js';
import { navigateTo } from '../js/router.js';

export function renderOnboarding() {
  return `
    <div class="screen screen-scroll" style="background:var(--bg-light)">
      <div class="page-content stagger" style="padding-top:var(--space-6)">
        <div style="text-align:center;margin-bottom:var(--space-6)" class="anim-slide-up">
          <span class="material-symbols-rounded" style="font-size:48px;color:var(--primary)">edit_document</span>
          <h2 style="font-family:var(--font-display);font-size:var(--text-xl);margin-top:var(--space-2)">Onboarding Survey</h2>
          <p style="font-size:var(--text-sm);color:var(--text-muted)">Calculate your Day 1 Business Health Score</p>
        </div>

        <div class="card anim-slide-up" style="animation-delay:0.1s;margin-bottom:var(--space-4)">
          <div class="input-group">
            <span class="material-symbols-rounded input-icon">person</span>
            <input type="text" id="onboard-name" class="input-field" placeholder="Your Name" value="Rajesh Kumar">
          </div>
          <div class="input-group" style="margin-top:var(--space-3)">
            <span class="material-symbols-rounded input-icon">storefront</span>
            <input type="text" id="onboard-business" class="input-field" placeholder="Farm/Business Name" value="Rajesh Dairy">
          </div>
        </div>

        <div class="card anim-slide-up" style="animation-delay:0.2s;margin-bottom:var(--space-4)">
          <h3 style="font-size:var(--text-sm);font-weight:600;margin-bottom:var(--space-2)">1. Financial Literacy</h3>
          <p style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:var(--space-3)">How confident are you managing ledgers and understanding cash statements?</p>
          <div class="slider-container" style="display:flex;align-items:center;gap:10px">
            <input type="range" id="q-fl" min="1" max="5" value="3" class="slider" style="flex:1;accent-color:var(--primary)">
            <span id="val-fl" style="font-weight:700;font-size:var(--text-sm);color:var(--primary);width:20px">3</span>
          </div>
        </div>

        <div class="card anim-slide-up" style="animation-delay:0.3s;margin-bottom:var(--space-4)">
          <h3 style="font-size:var(--text-sm);font-weight:600;margin-bottom:var(--space-2)">2. Repayment History</h3>
          <p style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:var(--space-3)">How consistent have you been paying back past loans or store credits?</p>
          <div class="slider-container" style="display:flex;align-items:center;gap:10px">
            <input type="range" id="q-rh" min="1" max="5" value="3" class="slider" style="flex:1;accent-color:var(--primary)">
            <span id="val-rh" style="font-weight:700;font-size:var(--text-sm);color:var(--primary);width:20px">3</span>
          </div>
        </div>

        <div class="card anim-slide-up" style="animation-delay:0.4s;margin-bottom:var(--space-6)">
          <h3 style="font-size:var(--text-sm);font-weight:600;margin-bottom:var(--space-2)">3. Risk Mitigation</h3>
          <p style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:var(--space-3)">Do you keep veterinary funds or insurance to handle livestock risks?</p>
          <div class="slider-container" style="display:flex;align-items:center;gap:10px">
            <input type="range" id="q-rm" min="1" max="5" value="3" class="slider" style="flex:1;accent-color:var(--primary)">
            <span id="val-rm" style="font-weight:700;font-size:var(--text-sm);color:var(--primary);width:20px">3</span>
          </div>
        </div>

        <button class="btn btn-primary btn-block btn-lg btn-rounded anim-slide-up" style="animation-delay:0.5s" onclick="submitOnboarding()">
          <span class="material-symbols-rounded">calculate</span>
          Calculate Health & Start
        </button>
      </div>
    </div>`;
}

// Add DOM dynamic slider value listener
document.addEventListener('screen:rendered', (e) => {
  if (e.detail.screen === 'onboarding') {
    ['fl', 'rh', 'rm'].forEach(id => {
      const slider = document.getElementById(`q-${id}`);
      const valEl = document.getElementById(`val-${id}`);
      if (slider && valEl) {
        slider.addEventListener('input', () => {
          valEl.textContent = slider.value;
        });
      }
    });
  }
});

window.submitOnboarding = function() {
  const name = document.getElementById('onboard-name').value || 'New User';
  const business = document.getElementById('onboard-business').value || 'My Farm';
  const fl = parseInt(document.getElementById('q-fl').value);
  const rh = parseInt(document.getElementById('q-rh').value);
  const rm = parseInt(document.getElementById('q-rm').value);

  // Compute using trained regression model
  const coefficients = trainedModel?.healthScoreModel?.coefficients || [];
  const intercept = trainedModel?.healthScoreModel?.intercept || 78;

  // We mapped survey FL (4 variables), FR (4 variables), RA (4 variables).
  // We expand our 3 inputs:
  // FL -> [fl, fl, fl, fl]
  // RH -> [rh, rh, rh, rh]
  // RM -> [rm, rm, rm, rm]
  const inputs = [fl, fl, fl, fl, rh, rh, rh, rh, rm, rm, rm, rm];
  let calculatedScore = 78;
  
  if (coefficients.length === inputs.length) {
    const rawPred = intercept + coefficients.reduce((acc, coef, i) => acc + coef * inputs[i], 0);
    calculatedScore = Math.max(0, Math.min(100, Math.round(rawPred)));
  }

  // Save to localStorage
  localStorage.setItem('onboardingComplete', 'true');
  localStorage.setItem('onboardingHealthScore', calculatedScore.toString());
  localStorage.setItem('newUserName', name);
  localStorage.setItem('newBusinessName', business);
  
  // Set starting values to 0
  localStorage.setItem('newRevenue', '₹0');
  localStorage.setItem('newExpenses', '₹0');
  localStorage.setItem('newCashflow', '₹0');
  localStorage.setItem('newTransactions', JSON.stringify([]));

  // Navigate to dashboard
  import('../js/ui.js').then(({ showToast }) => {
    showToast(`Health Score calculated: ${calculatedScore}/100`, 'success');
  });
  window.__navigate('entrepreneur-dashboard');
};
