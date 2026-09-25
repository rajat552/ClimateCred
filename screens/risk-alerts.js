// SCREEN 9: RISK ALERT CENTER
import { alerts } from '../js/data.js';
import { pageHeader, bottomNav, alertCard } from '../js/components.js';

export function renderRiskAlerts() {
  return `
    <div class="screen screen-scroll">
      ${pageHeader('Risk Alert Center')}
      <div class="page-content stagger">
        <div class="tabs anim-slide-up" style="margin-bottom:var(--space-4)">
          <div class="tab active" onclick="selectTab(this)">All</div>
          <div class="tab" onclick="selectTab(this)">High</div>
          <div class="tab" onclick="selectTab(this)">Medium</div>
          <div class="tab" onclick="selectTab(this)">Low</div>
        </div>
        ${alerts.map(a => alertCard(a)).join('')}
        <div class="section-title">Alert Timeline</div>
        <div class="timeline stagger">
          <div class="timeline-item danger anim-slide-up"><div style="font-size:var(--text-sm);font-weight:600">Feed cost spike detected</div><div style="font-size:var(--text-xs);color:var(--text-muted)">2 hours ago • Auto-detected by AI</div></div>
          <div class="timeline-item warning anim-slide-up"><div style="font-size:var(--text-sm);font-weight:600">Cash flow projection updated</div><div style="font-size:var(--text-xs);color:var(--text-muted)">5 hours ago • Model retrained</div></div>
          <div class="timeline-item anim-slide-up"><div style="font-size:var(--text-sm);font-weight:600">Risk level changed: Low → Medium</div><div style="font-size:var(--text-xs);color:var(--text-muted)">Yesterday • Triggered by feed cost</div></div>
          <div class="timeline-item anim-slide-up"><div style="font-size:var(--text-sm);font-weight:600">Digital payment milestone reached</div><div style="font-size:var(--text-xs);color:var(--text-muted)">2 days ago • 50+ UPI transactions</div></div>
        </div>
      </div>
      ${bottomNav('entrepreneur-dashboard')}
    </div>`;
}
