// SCREEN 15: ENTERPRISE PROFILE
import { pageHeader, bottomNav, circularProgress, riskBadge } from '../js/components.js';

export function renderEnterpriseProfile() {
  return `
    <div class="screen screen-scroll">
      ${pageHeader('Enterprise Profile')}
      <div class="page-content stagger">
        <div class="profile-header-card anim-slide-up">
          <div class="profile-avatar-lg">L</div>
          <h3 style="font-size:var(--text-lg);margin-bottom:2px">Lakshmi Dairy Farm</h3>
          <p style="font-size:var(--text-sm);opacity:0.8">Owner: Lakshmi Devi • Sundarpura, Anand</p>
          <div style="display:flex;gap:var(--space-3);margin-top:var(--space-3)">
            <span style="font-size:var(--text-xs);background:rgba(255,255,255,0.2);padding:4px 10px;border-radius:var(--radius-full)">Dairy</span>
            <span style="font-size:var(--text-xs);background:rgba(255,255,255,0.2);padding:4px 10px;border-radius:var(--radius-full)">Est. 2019</span>
          </div>
        </div>

        <div style="display:flex;justify-content:space-around;margin-bottom:var(--space-4)" class="anim-slide-up">
          <div style="text-align:center">
            ${circularProgress(80, 6, 78, '#2E7D32', '78', 'Health')}
          </div>
          <div style="text-align:center">
            ${circularProgress(80, 6, 42, '#F59E0B', '42', 'Risk')}
          </div>
          <div style="text-align:center">
            ${circularProgress(80, 6, 88, '#1565C0', '88', 'Repay')}
          </div>
        </div>

        <div class="kpi-row anim-slide-up">
          <div class="kpi-card green"><div class="kpi-label">Monthly Income</div><div class="kpi-value">₹42,580</div></div>
          <div class="kpi-card red"><div class="kpi-label">Monthly Expense</div><div class="kpi-value">₹14,230</div></div>
        </div>
        <div class="kpi-row anim-slide-up" style="margin-top:var(--space-3)">
          <div class="kpi-card blue"><div class="kpi-label">Active Loan</div><div class="kpi-value">₹2,50,000</div></div>
          <div class="kpi-card gold"><div class="kpi-label">Savings</div><div class="kpi-value">₹1,85,000</div></div>
        </div>

        <div class="section-title anim-slide-up">AI Predictions</div>
        <div class="gradient-glass anim-slide-up">
          <div style="display:flex;justify-content:space-between;margin-bottom:var(--space-3)">
            <span style="font-size:var(--text-sm);font-weight:600">Next Month Forecast</span>
            ${riskBadge('medium')}
          </div>
          <div style="font-size:var(--text-xs);color:var(--text-secondary);line-height:1.6">
            Projected income: ₹44,200 (+3.8%). Cash flow stable. Feed cost spike may increase expenses by 8%. Recommend subsidy application.
          </div>
        </div>

        <div class="section-title anim-slide-up">Recommendations</div>
        <div class="glass-card anim-slide-up" style="border-left:4px solid var(--primary)">
          <div style="font-size:var(--text-sm);font-weight:600;margin-bottom:var(--space-2)">Switch to Napier Grass Feed</div>
          <div style="font-size:var(--text-xs);color:var(--text-secondary)">Save ₹3,200/month • Reduce risk by 15%</div>
        </div>
        <div class="glass-card anim-slide-up" style="border-left:4px solid var(--secondary);margin-top:var(--space-3)">
          <div style="font-size:var(--text-sm);font-weight:600;margin-bottom:var(--space-2)">Apply for Gokul Mission Subsidy</div>
          <div style="font-size:var(--text-xs);color:var(--text-secondary)">Up to ₹50,000 one-time benefit</div>
        </div>
      </div>
      ${bottomNav('nabard-dashboard', 'nabard')}
    </div>`;
}
