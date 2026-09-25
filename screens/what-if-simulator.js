// ============================================
// SCREEN 7: WHAT-IF SIMULATOR — Live Computed
// ============================================

import { pageHeader, bottomNav, sliderInput } from '../js/components.js';
import { showToast } from '../js/ui.js';

export function renderWhatIfSimulator() {
  return `
    <div class="screen screen-scroll">
      ${pageHeader('What-If Simulator')}
      <div class="page-content stagger">
        <div class="ai-insight-card anim-slide-up" style="margin-bottom:var(--space-4)">
          <div class="ai-badge"><span class="material-symbols-rounded" style="font-size:16px">tune</span> Scenario Engine</div>
          <div class="insight-text">Adjust the parameters below and simulate how changes impact your business outcomes. Results update live as you move the sliders.</div>
        </div>

        <div class="glass-card anim-slide-up">
          ${sliderInput('milk-price', 'Milk Price (₹/litre)', 20, 60, 38, '₹')}
          ${sliderInput('rainfall', 'Rainfall (mm)', 0, 300, 150, '')}
          ${sliderInput('demand', 'Market Demand (%)', 50, 150, 100, '')}
          ${sliderInput('expenses', 'Monthly Expenses', 8000, 25000, 14230, '₹')}
          ${sliderInput('loan', 'Loan Amount', 0, 500000, 250000, '₹')}
        </div>

        <button class="btn btn-primary btn-block btn-lg btn-rounded anim-slide-up" style="margin-top:var(--space-4)" onclick="runSimulation()">
          <span class="material-symbols-rounded">play_arrow</span> Run Simulation
        </button>

        <!-- Results -->
        <div id="sim-results" style="display:none">
          <div class="section-title">Simulation Results</div>
          
          <div class="gradient-glass anim-slide-up" style="text-align:center;margin-bottom:var(--space-4)">
            <div style="font-size:var(--text-xs);color:var(--text-muted);font-weight:500;margin-bottom:var(--space-2)">PREDICTED OUTCOME</div>
            <div id="sim-verdict-icon" style="font-size:36px;margin-bottom:var(--space-2)">📈</div>
            <div id="sim-verdict-text" style="font-size:var(--text-sm);font-weight:600;color:var(--success)">Positive Growth</div>
          </div>
          
          <div class="sim-results stagger">
            <div class="sim-result-card anim-slide-up hover-lift">
              <span class="material-symbols-rounded" style="color:var(--success);font-size:28px">trending_up</span>
              <div class="sim-label">Predicted Profit</div>
              <div class="sim-value" style="color:var(--success)" id="sim-profit">₹31,200</div>
            </div>
            <div class="sim-result-card anim-slide-up hover-lift">
              <span class="material-symbols-rounded" style="color:var(--secondary);font-size:28px">account_balance_wallet</span>
              <div class="sim-label">Cash Flow</div>
              <div class="sim-value" style="color:var(--secondary)" id="sim-cashflow">₹28,900</div>
            </div>
            <div class="sim-result-card anim-slide-up hover-lift">
              <span class="material-symbols-rounded" style="color:var(--warning);font-size:28px">shield</span>
              <div class="sim-label">Risk Level</div>
              <div class="sim-value" id="sim-risk" style="color:var(--warning)">Medium</div>
            </div>
            <div class="sim-result-card anim-slide-up hover-lift">
              <span class="material-symbols-rounded" style="color:var(--primary);font-size:28px">favorite</span>
              <div class="sim-label">Business Health</div>
              <div class="sim-value" style="color:var(--primary)" id="sim-health">76/100</div>
            </div>
          </div>

          <div class="chart-container anim-slide-up" style="margin-top:var(--space-4)">
            <div class="chart-title">Scenario Impact Over Time</div>
            <canvas id="sim-chart" height="160"></canvas>
          </div>

          <div class="ai-insight-card anim-slide-up" style="margin-top:var(--space-4)" id="sim-ai-insight">
            <div class="ai-badge"><span class="material-symbols-rounded" style="font-size:16px">auto_awesome</span> AI Analysis</div>
            <div class="insight-text" id="sim-ai-text">Based on these parameters, your business shows moderate growth potential.</div>
          </div>

          <button class="btn btn-ghost btn-block anim-slide-up" style="margin-top:var(--space-3)" onclick="resetSim()">
            <span class="material-symbols-rounded">refresh</span> Reset Simulation
          </button>
        </div>
      </div>
      ${bottomNav('entrepreneur-dashboard')}
    </div>`;
}

// Live computation engine
function computeSimResults() {
  const milkPrice = parseFloat(document.getElementById('milk-price')?.value || 38);
  const rainfall = parseFloat(document.getElementById('rainfall')?.value || 150);
  const demand = parseFloat(document.getElementById('demand')?.value || 100);
  const expenses = parseFloat(document.getElementById('expenses')?.value || 14230);
  const loan = parseFloat(document.getElementById('loan')?.value || 250000);

  // Revenue calculation
  const baseLitresPerDay = 28;
  const demandMultiplier = demand / 100;
  const rainfallImpact = rainfall > 200 ? 0.85 : rainfall < 50 ? 0.9 : 1.0;
  const dailyRevenue = baseLitresPerDay * milkPrice * demandMultiplier * rainfallImpact;
  const monthlyRevenue = Math.round(dailyRevenue * 30);

  // Profit
  const profit = monthlyRevenue - expenses;
  
  // Cash flow (profit minus EMI)
  const monthlyEMI = loan > 0 ? Math.round(loan * 0.01) : 0; // 1% of loan as monthly EMI
  const cashflow = profit - monthlyEMI;

  // Risk calculation
  const debtToIncome = loan > 0 ? (monthlyEMI / monthlyRevenue) * 100 : 0;
  const profitMargin = (profit / monthlyRevenue) * 100;
  let riskScore = 50;
  if (profitMargin > 50) riskScore -= 20;
  else if (profitMargin > 30) riskScore -= 10;
  else if (profitMargin < 10) riskScore += 20;
  if (debtToIncome > 30) riskScore += 15;
  if (rainfall > 250) riskScore += 10;
  if (rainfall < 30) riskScore += 10;
  if (demand < 70) riskScore += 15;
  riskScore = Math.max(5, Math.min(95, riskScore));

  const riskLevel = riskScore < 30 ? 'Low' : riskScore < 60 ? 'Medium' : 'High';
  const riskColor = riskLevel === 'Low' ? 'var(--success)' : riskLevel === 'Medium' ? 'var(--warning)' : 'var(--danger)';

  // Health score
  const health = Math.max(10, Math.min(98, Math.round(100 - riskScore + (profitMargin * 0.3))));

  // Verdict
  const isPositive = profit > 0 && riskScore < 60;

  return {
    profit, cashflow, riskLevel, riskScore, riskColor, health,
    isPositive, monthlyRevenue, expenses, monthlyEMI,
    milkPrice, demand, rainfall
  };
}

window.runSimulation = function() {
  const results = document.getElementById('sim-results');
  if (!results) return;
  
  results.style.display = 'block';

  const sim = computeSimResults();

  // Update result cards with animation
  const profitEl = document.getElementById('sim-profit');
  const cashflowEl = document.getElementById('sim-cashflow');
  const riskEl = document.getElementById('sim-risk');
  const healthEl = document.getElementById('sim-health');

  if (profitEl) {
    profitEl.textContent = `₹${sim.profit.toLocaleString('en-IN')}`;
    profitEl.style.color = sim.profit > 0 ? 'var(--success)' : 'var(--danger)';
  }
  if (cashflowEl) {
    cashflowEl.textContent = `₹${sim.cashflow.toLocaleString('en-IN')}`;
    cashflowEl.style.color = sim.cashflow > 0 ? 'var(--secondary)' : 'var(--danger)';
  }
  if (riskEl) {
    riskEl.textContent = sim.riskLevel;
    riskEl.style.color = sim.riskColor;
  }
  if (healthEl) {
    healthEl.textContent = `${sim.health}/100`;
  }

  // Update verdict
  const verdictIcon = document.getElementById('sim-verdict-icon');
  const verdictText = document.getElementById('sim-verdict-text');
  if (verdictIcon && verdictText) {
    if (sim.isPositive) {
      verdictIcon.textContent = '📈';
      verdictText.textContent = 'Positive Growth Scenario';
      verdictText.style.color = 'var(--success)';
    } else {
      verdictIcon.textContent = '⚠️';
      verdictText.textContent = 'Caution — High Risk Scenario';
      verdictText.style.color = 'var(--danger)';
    }
  }

  // AI insight
  const aiText = document.getElementById('sim-ai-text');
  if (aiText) {
    if (sim.profit > 30000) {
      aiText.textContent = `Excellent scenario! At ₹${sim.milkPrice}/litre with ${sim.demand}% demand, your projected monthly profit of ₹${sim.profit.toLocaleString('en-IN')} is strong. Consider investing surplus in feed quality to maintain production consistency.`;
    } else if (sim.profit > 15000) {
      aiText.textContent = `Moderate scenario. Projected profit of ₹${sim.profit.toLocaleString('en-IN')}/month is healthy. Your risk level is ${sim.riskLevel} (score: ${sim.riskScore}). Focus on reducing expenses by exploring alternative feed sources.`;
    } else if (sim.profit > 0) {
      aiText.textContent = `Thin margins detected. At ₹${sim.profit.toLocaleString('en-IN')}/month profit with ${sim.riskLevel} risk, consider applying for NABARD dairy subsidy and optimizing feed costs to improve resilience.`;
    } else {
      aiText.textContent = `⚠️ Loss scenario detected! Monthly loss of ₹${Math.abs(sim.profit).toLocaleString('en-IN')}. Urgent action needed: reduce expenses, negotiate better milk prices, or diversify income sources. Consider NABARD emergency credit line.`;
    }
  }

  showToast('Simulation complete!', 'success');
  results.scrollIntoView({ behavior: 'smooth' });

  // Trigger chart render
  document.dispatchEvent(new CustomEvent('screen:rendered', { detail: { screen: 'what-if-sim-results' } }));
};

window.resetSim = function() {
  const results = document.getElementById('sim-results');
  if (results) results.style.display = 'none';
  
  // Reset sliders
  ['milk-price', 'rainfall', 'demand', 'expenses', 'loan'].forEach(id => {
    const slider = document.getElementById(id);
    if (slider) {
      const defaults = { 'milk-price': 38, 'rainfall': 150, 'demand': 100, 'expenses': 14230, 'loan': 250000 };
      slider.value = defaults[id];
      const valEl = document.getElementById(`${id}-val`);
      if (valEl) {
        const prefix = id === 'milk-price' || id === 'expenses' || id === 'loan' ? '₹' : '';
        valEl.textContent = prefix + defaults[id];
      }
    }
  });
  showToast('Simulation reset', 'info');
};
