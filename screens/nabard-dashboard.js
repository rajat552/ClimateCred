// SCREEN 13: NABARD OFFICER DASHBOARD
import { nabardData } from '../js/data.js';
import { bottomNav, circularProgress } from '../js/components.js';

export function renderNabardDashboard() {
  return `
    <div class="screen screen-scroll">
      <div class="dash-header">
        <div class="flex items-center gap-3">
          <div class="dash-avatar" style="background:var(--secondary-gradient)">R</div>
          <div>
            <h2 style="font-size:var(--text-lg);font-weight:700">Welcome, Rajesh 🏛️</h2>
            <p style="font-size:var(--text-xs);color:var(--text-muted)">NABARD District Officer — Anand</p>
          </div>
        </div>
        <div class="dash-notif" onclick="window.__navigate('notifications')">
          <span class="material-symbols-rounded">notifications</span>
          <div class="notif-dot"></div>
        </div>
      </div>

      <div class="page-content stagger">
        <div class="tabs anim-slide-up" style="margin-bottom:var(--space-4)">
          <div class="tab" onclick="selectTab(this)">National</div>
          <div class="tab" onclick="selectTab(this)">State</div>
          <div class="tab active" onclick="selectTab(this)">District</div>
          <div class="tab" onclick="selectTab(this)">Village</div>
        </div>

        <div class="nabard-summary stagger">
          <div class="nabard-kpi anim-slide-up" style="border-top:3px solid var(--success)">
            <div class="nk-value" style="color:var(--success)">${nabardData.healthy.toLocaleString()}</div>
            <div class="nk-label">Healthy</div>
          </div>
          <div class="nabard-kpi anim-slide-up" style="border-top:3px solid var(--warning)">
            <div class="nk-value" style="color:var(--warning)">${nabardData.mediumRisk.toLocaleString()}</div>
            <div class="nk-label">Medium Risk</div>
          </div>
          <div class="nabard-kpi anim-slide-up" style="border-top:3px solid var(--danger)">
            <div class="nk-value" style="color:var(--danger)">${nabardData.highRisk.toLocaleString()}</div>
            <div class="nk-label">High Risk</div>
          </div>
        </div>

        <div class="kpi-row anim-slide-up" style="margin-top:var(--space-4)">
          <div class="kpi-card blue">
            <div class="kpi-icon blue"><span class="material-symbols-rounded">groups</span></div>
            <div class="kpi-label">Total Enterprises</div>
            <div class="kpi-value">${nabardData.totalEnterprises.toLocaleString()}</div>
          </div>
          <div class="kpi-card green">
            <div class="kpi-icon green"><span class="material-symbols-rounded">currency_rupee</span></div>
            <div class="kpi-label">Loans Disbursed</div>
            <div class="kpi-value">${nabardData.loanDisbursed}</div>
          </div>
        </div>

        <div class="section-title anim-slide-up">Performance Gauges</div>
        <div style="display:flex;justify-content:space-around;margin-bottom:var(--space-4)" class="anim-slide-up">
          <div style="text-align:center">
            ${circularProgress(100, 8, nabardData.recoveryRate, '#10B981', nabardData.recoveryRate + '%', 'Recovery')}
          </div>
          <div style="text-align:center">
            ${circularProgress(100, 8, nabardData.predictionAccuracy, '#1565C0', nabardData.predictionAccuracy + '%', 'AI Accuracy')}
          </div>
        </div>

        <div class="section-title anim-slide-up">State-wise Overview</div>
        <div class="chart-container anim-slide-up">
          <canvas id="nabard-bar-chart" height="200"></canvas>
        </div>

        <div class="section-title anim-slide-up">Quick Actions</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)" class="stagger">
          <div class="quick-action-btn anim-slide-up" onclick="window.__navigate('village-risk-map')" style="padding:var(--space-4)">
            <span class="material-symbols-rounded" style="color:var(--primary);font-size:28px">map</span>
            <span>Risk Map</span>
          </div>
          <div class="quick-action-btn anim-slide-up" onclick="window.__navigate('impact-dashboard')" style="padding:var(--space-4)">
            <span class="material-symbols-rounded" style="color:var(--secondary);font-size:28px">rocket_launch</span>
            <span>Impact</span>
          </div>
          <div class="quick-action-btn anim-slide-up" onclick="window.__navigate('ai-analytics')" style="padding:var(--space-4)">
            <span class="material-symbols-rounded" style="color:var(--accent-dark);font-size:28px">psychology</span>
            <span>AI Analytics</span>
          </div>
          <div class="quick-action-btn anim-slide-up" onclick="window.__navigate('enterprise-profile')" style="padding:var(--space-4)">
            <span class="material-symbols-rounded" style="color:#8B5CF6;font-size:28px">person_search</span>
            <span>Profiles</span>
          </div>
        </div>
      </div>
      ${bottomNav('nabard-dashboard', 'nabard')}
    </div>`;
}
