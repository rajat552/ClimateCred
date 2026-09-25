// ============================================
// SCREEN 4: DIGITAL FINANCIAL TWIN (HERO)
// ============================================

import { userData, twinMetrics } from '../js/data.js';
import { circularProgress, bottomNav } from '../js/components.js';

export function renderFinancialTwin() {
  // Particles for hero
  let particles = '';
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = 2 + Math.random() * 3;
    const delay = Math.random() * 5;
    particles += `<div class="splash-particle" style="left:${x}%;top:${y}%;width:${size}px;height:${size}px;animation-delay:${delay}s;animation-duration:${4+Math.random()*3}s"></div>`;
  }

  return `
    <div class="screen screen-scroll">
      <!-- Hero Section -->
      <div class="twin-hero">
        <div class="twin-particles">${particles}</div>
        
        <div style="position:absolute;top:var(--space-4);left:var(--space-4);z-index:3">
          <button class="back-btn" onclick="window.__goBack()" style="background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.2)">
            <span class="material-symbols-rounded" style="color:white">arrow_back</span>
          </button>
        </div>
        <div style="position:absolute;top:var(--space-4);right:var(--space-4);z-index:3;color:rgba(255,255,255,0.7);font-size:var(--text-xs);font-weight:500">
          Digital Financial Twin
        </div>

        <div class="twin-gauge-wrap anim-scale">
          ${circularProgress(180, 12, userData.healthScore, '#4CAF50', userData.healthScore, 'Health Score')}
        </div>
        
        <div class="twin-status anim-slide-up" style="animation-delay:0.3s;animation-fill-mode:both">
          <span class="pulse-dot"></span>
          Twin Status: ${userData.healthScore >= 70 ? 'Healthy' : userData.healthScore >= 40 ? 'Moderate' : 'Needs Attention'}
        </div>
      </div>

      <!-- Metrics Grid -->
      <div class="twin-metrics stagger">
        ${twinMetrics.map(m => `
          <div class="twin-metric-card anim-slide-up hover-lift">
            <span class="material-symbols-rounded metric-icon" style="color:${m.color}">${m.icon}</span>
            <div class="metric-label">${m.label}</div>
            <div class="metric-value" style="color:${m.color}">${m.value}</div>
          </div>`).join('')}
      </div>

      <!-- Live Indicators -->
      <div class="page-content">
        <div class="section-title">Live Performance</div>
        <div class="gradient-glass anim-slide-up">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-3)">
            <span style="font-size:var(--text-sm);font-weight:600">Real-time Sync</span>
            <span style="font-size:var(--text-xs);color:var(--success);font-weight:500;display:flex;align-items:center;gap:4px">
              <span class="pulse-dot" style="width:6px;height:6px;border-radius:50%;background:var(--success);display:inline-block;animation:pulse 2s infinite"></span>
              Active
            </span>
          </div>
          <div style="display:flex;gap:var(--space-3)">
            <div style="flex:1;text-align:center;padding:var(--space-3);background:var(--primary-50);border-radius:var(--radius-md)">
              <div style="font-size:var(--text-xs);color:var(--text-muted)">Last Updated</div>
              <div style="font-size:var(--text-sm);font-weight:600" data-reltime>Just now</div>
            </div>
            <div style="flex:1;text-align:center;padding:var(--space-3);background:var(--secondary-50);border-radius:var(--radius-md)">
              <div style="font-size:var(--text-xs);color:var(--text-muted)">Data Points</div>
              <div style="font-size:var(--text-sm);font-weight:600">1,247</div>
            </div>
            <div style="flex:1;text-align:center;padding:var(--space-3);background:var(--warning-light);border-radius:var(--radius-md)">
              <div style="font-size:var(--text-xs);color:var(--text-muted)">AI Confidence</div>
              <div style="font-size:var(--text-sm);font-weight:600">91.7%</div>
            </div>
          </div>
        </div>

        <div class="section-title">Health Trend</div>
        <div class="chart-container anim-slide-up">
          <canvas id="twin-trend-chart" height="140"></canvas>
        </div>
      </div>

      ${bottomNav('financial-twin')}
    </div>`;
}
