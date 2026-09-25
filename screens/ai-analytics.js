// SCREEN 16: AI ANALYTICS
import { pageHeader, bottomNav, circularProgress } from '../js/components.js';

export function renderAIAnalytics() {
  return `
    <div class="screen screen-scroll">
      ${pageHeader('AI Analytics')}
      <div class="page-content stagger">
        <div style="display:flex;justify-content:space-around;margin-bottom:var(--space-4)" class="anim-slide-up">
          <div style="text-align:center">
            ${circularProgress(90, 7, 91.7, '#2E7D32', '91.7%', 'Accuracy')}
          </div>
          <div style="text-align:center">
            ${circularProgress(90, 7, 87, '#1565C0', '87%', 'Confidence')}
          </div>
        </div>

        <div class="section-title anim-slide-up">Feature Importance (SHAP)</div>
        <div class="chart-container anim-slide-up">
          <canvas id="shap-chart" height="200"></canvas>
        </div>

        <div class="section-title anim-slide-up">Prediction Accuracy Over Time</div>
        <div class="chart-container anim-slide-up">
          <canvas id="accuracy-trend" height="160"></canvas>
        </div>

        <div class="section-title anim-slide-up">Model Performance</div>
        <div class="kpi-row anim-slide-up">
          <div class="kpi-card green"><div class="kpi-label">Precision</div><div class="kpi-value">93.4%</div></div>
          <div class="kpi-card blue"><div class="kpi-label">Recall</div><div class="kpi-value">89.2%</div></div>
        </div>
        <div class="kpi-row anim-slide-up" style="margin-top:var(--space-3)">
          <div class="kpi-card gold"><div class="kpi-label">F1 Score</div><div class="kpi-value">0.912</div></div>
          <div class="kpi-card purple" style="border-top:3px solid #8B5CF6"><div class="kpi-label">AUC-ROC</div><div class="kpi-value">0.948</div>
            <style>.kpi-card.purple::before{background:linear-gradient(135deg,#8B5CF6,#A78BFA)}</style>
          </div>
        </div>

        <div class="section-title anim-slide-up">AI Insights</div>
        <div class="ai-insight-card anim-slide-up">
          <div class="ai-badge"><span class="material-symbols-rounded" style="font-size:16px">auto_awesome</span> Model Report</div>
          <div class="insight-text">
            The model has been retrained on 14,247 data points from 12,847 enterprises. 
            Top predictive features: Digital payment frequency (23%), repayment history (19%), seasonal revenue patterns (16%). 
            Model drift detected in weather impact feature — scheduled recalibration for August.
          </div>
        </div>
      </div>
      ${bottomNav('ai-analytics', 'nabard')}
    </div>`;
}
