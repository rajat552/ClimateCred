// ============================================
// SCREEN 6: EXPLAINABLE AI
// ============================================

import { riskFactors, dashboardData } from '../js/data.js';
import { pageHeader, bottomNav, riskBadge } from '../js/components.js';

export function renderExplainableAI() {
  const riskClass = dashboardData.riskLevel.toLowerCase();
  const riskColor = riskClass === 'high' ? 'var(--danger)' : riskClass === 'medium' ? 'var(--warning)' : 'var(--success)';

  return `
    <div class="screen screen-scroll">
      ${pageHeader('Explainable AI')}
      <div class="page-content stagger">
        <!-- Risk Level Header -->
        <div class="gradient-glass anim-slide-up" style="text-align:center">
          <div style="font-size:var(--text-xs);color:var(--text-muted);font-weight:500;margin-bottom:var(--space-2)">CURRENT RISK ASSESSMENT</div>
          <div style="font-size:var(--text-3xl);font-weight:800;font-family:var(--font-display);color:${riskColor};margin-bottom:var(--space-2)">${dashboardData.riskLevel}</div>
          ${riskBadge(riskClass)}
          <div style="font-size:var(--text-xs);color:var(--text-secondary);margin-top:var(--space-2)">Risk Score: ${dashboardData.riskScore}/100</div>
        </div>

        <!-- Why is Risk Low/Medium? -->
        <div class="section-title anim-slide-up">Why Is Your Risk ${dashboardData.riskLevel}?</div>
        <div class="glass-card anim-slide-up" style="padding:var(--space-4)">
          <div style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:var(--space-4);font-weight:500">
            Instead of just saying "Risk = ${dashboardData.riskLevel}", here's exactly why:
          </div>
          <div class="factor-bars" id="factor-bars">
            ${riskFactors.map(f => `
              <div class="factor-item">
                <div class="factor-header">
                  <span class="factor-name">${f.name}</span>
                  <span class="factor-value" style="color:${f.color}">${f.direction === 'up' ? '+' : '-'}${f.value}%</span>
                </div>
                <div class="factor-bar-bg">
                  <div class="factor-bar" style="background:${f.color}" data-width="${f.value}%"></div>
                </div>
              </div>`).join('')}
          </div>
        </div>

        <!-- AI Explanation -->
        <div class="section-title anim-slide-up">AI Explanation</div>
        <div class="ai-insight-card anim-slide-up">
          <div class="ai-badge"><span class="material-symbols-rounded" style="font-size:16px">psychology</span> AI Analysis</div>
          <div class="insight-text">
            Your risk is rated as <strong>${dashboardData.riskLevel} (${dashboardData.riskScore}%)</strong> based on the trained credit scoring model.
            The primary risk driver is the **Feed Cost Increase (32%)**, but your low default risk probability of **9.2%** is heavily supported by your excellent <strong>Credit Score (780)</strong> and robust monthly profit margins.
            Monsoon weather impacts remain a minor warning factor.
          </div>
        </div>

        <!-- Recommendation -->
        <div class="section-title anim-slide-up">AI Recommendation</div>
        <div class="glass-card anim-slide-up" style="border-left:4px solid var(--primary)">
          <div style="display:flex;align-items:center;gap:var(--space-2);margin-bottom:var(--space-3)">
            <span class="material-symbols-rounded" style="color:var(--primary);font-size:24px">lightbulb</span>
            <span style="font-weight:600;font-size:var(--text-sm)">Top Actions to Reduce Risk</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:var(--space-3)">
            <div style="display:flex;align-items:flex-start;gap:var(--space-2)">
              <span style="color:var(--success);font-size:var(--text-sm);font-weight:700;min-width:18px">1.</span>
              <span style="font-size:var(--text-sm);color:var(--text-secondary)">Switch to Napier grass supplementation — estimated savings: <strong>₹3,200/month</strong></span>
            </div>
            <div style="display:flex;align-items:flex-start;gap:var(--space-2)">
              <span style="color:var(--success);font-size:var(--text-sm);font-weight:700;min-width:18px">2.</span>
              <span style="font-size:var(--text-sm);color:var(--text-secondary)">Add evening milk collection route — potential revenue: <strong>+₹4,800/month</strong></span>
            </div>
            <div style="display:flex;align-items:flex-start;gap:var(--space-2)">
              <span style="color:var(--success);font-size:var(--text-sm);font-weight:700;min-width:18px">3.</span>
              <span style="font-size:var(--text-sm);color:var(--text-secondary)">Apply for Rashtriya Gokul Mission subsidy — up to <strong>₹50,000 one-time</strong></span>
            </div>
          </div>
          <button class="btn btn-primary btn-block btn-rounded" style="margin-top:var(--space-4)" onclick="window.__navigate('ai-mentor')">
            <span class="material-symbols-rounded">psychology</span> Ask AI Mentor
          </button>
        </div>
      </div>
      ${bottomNav('entrepreneur-dashboard')}
    </div>`;
}
