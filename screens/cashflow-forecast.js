// ============================================
// SCREEN 5: CASH FLOW FORECAST
// ============================================

import { forecastData } from '../js/data.js';
import { pageHeader, bottomNav, circularProgress } from '../js/components.js';

export function renderCashflowForecast() {
  return `
    <div class="screen screen-scroll">
      ${pageHeader('Cash Flow Forecast')}
      <div class="page-content stagger">
        <!-- Period Tabs -->
        <div class="tabs anim-slide-up">
          <div class="tab" onclick="selectTab(this)">1 Month</div>
          <div class="tab active" onclick="selectTab(this)">3 Months</div>
          <div class="tab" onclick="selectTab(this)">6 Months</div>
        </div>

        <!-- Forecast Chart -->
        <div class="chart-container anim-slide-up" style="margin-top:var(--space-4)">
          <div class="chart-title">Income vs Expenses vs AI Forecast</div>
          <canvas id="forecast-chart" height="200"></canvas>
          <div style="display:flex;gap:var(--space-4);margin-top:var(--space-3);justify-content:center">
            <div style="display:flex;align-items:center;gap:4px;font-size:var(--text-xs);color:var(--text-secondary)">
              <span style="width:12px;height:3px;background:#2E7D32;border-radius:2px;display:block"></span>Income
            </div>
            <div style="display:flex;align-items:center;gap:4px;font-size:var(--text-xs);color:var(--text-secondary)">
              <span style="width:12px;height:3px;background:#EF4444;border-radius:2px;display:block"></span>Expenses
            </div>
            <div style="display:flex;align-items:center;gap:4px;font-size:var(--text-xs);color:var(--text-secondary)">
              <span style="width:12px;height:3px;background:#1565C0;border-radius:2px;display:block;border-style:dashed"></span>AI Forecast
            </div>
          </div>
        </div>

        <!-- Prediction Confidence -->
        <div class="section-title anim-slide-up">Prediction Confidence</div>
        <div class="glass-card anim-slide-up" style="display:flex;align-items:center;gap:var(--space-4)">
          ${circularProgress(80, 6, forecastData.confidence, '#1565C0', forecastData.confidence + '%', 'Confidence')}
          <div>
            <div style="font-size:var(--text-sm);font-weight:600">High Confidence</div>
            <div style="font-size:var(--text-xs);color:var(--text-secondary);line-height:1.6;margin-top:4px">
              Model trained on 14 months of your financial data with 91.7% accuracy on past predictions.
            </div>
          </div>
        </div>

        <!-- Trend Analysis -->
        <div class="section-title anim-slide-up">Trend Analysis</div>
        <div class="kpi-row anim-slide-up">
          <div class="kpi-card green">
            <div class="kpi-label">Avg. Monthly Income</div>
            <div class="kpi-value">₹42,840</div>
            <div class="kpi-change up">↑ 12.4% YoY</div>
          </div>
          <div class="kpi-card red">
            <div class="kpi-label">Avg. Monthly Expense</div>
            <div class="kpi-value">₹14,850</div>
            <div class="kpi-change up">↑ 3.1% YoY</div>
          </div>
        </div>

        <!-- AI Summary -->
        <div class="section-title anim-slide-up">AI Forecast Summary</div>
        <div class="ai-insight-card anim-slide-up">
          <div class="ai-badge"><span class="material-symbols-rounded" style="font-size:16px">auto_awesome</span> AI Analysis</div>
          <div class="insight-text">Your cash flow is projected to grow 8.2% over the next 3 months. Peak income expected in October due to festive season dairy demand. Recommend maintaining current expenses and building ₹15,000 emergency buffer for monsoon-related disruptions.</div>
        </div>
      </div>
      ${bottomNav('entrepreneur-dashboard')}
    </div>`;
}

window.selectTab = function(el) {
  el.parentElement.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
};
