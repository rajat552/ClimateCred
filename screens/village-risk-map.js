// SCREEN 14: VILLAGE RISK MAP
import { nabardData } from '../js/data.js';
import { pageHeader, bottomNav } from '../js/components.js';

export function renderVillageRiskMap() {
  return `
    <div class="screen screen-scroll">
      ${pageHeader('Village Risk Map')}
      <div class="page-content stagger">
        <div class="map-container anim-slide-up" style="margin:0;padding:var(--space-4)">
          <div class="chart-title">India — Enterprise Risk Heatmap</div>
          <svg viewBox="0 0 400 440" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
            <!-- Simplified India map regions -->
            <path d="M180,40 L220,35 L250,50 L260,80 L240,100 L220,95 L200,100 L180,85 Z" fill="#10B981" opacity="0.7" stroke="white" stroke-width="1"><title>Jammu & Kashmir</title></path>
            <path d="M200,100 L240,100 L260,120 L250,150 L220,140 L200,130 Z" fill="#10B981" opacity="0.6" stroke="white" stroke-width="1"><title>Punjab/Haryana</title></path>
            <path d="M250,150 L290,140 L310,170 L290,200 L260,190 L240,170 Z" fill="#F59E0B" opacity="0.6" stroke="white" stroke-width="1"><title>Uttar Pradesh</title></path>
            <path d="M140,130 L200,130 L220,160 L200,200 L160,190 L130,160 Z" fill="#F59E0B" opacity="0.7" stroke="white" stroke-width="1"><title>Rajasthan</title></path>
            <path d="M130,160 L160,190 L180,230 L150,260 L110,240 L100,200 Z" fill="#10B981" opacity="0.7" stroke="white" stroke-width="1"><title>Gujarat</title></path>
            <path d="M160,190 L200,200 L240,210 L230,250 L200,260 L170,250 L150,230 Z" fill="#EF4444" opacity="0.5" stroke="white" stroke-width="1"><title>Madhya Pradesh</title></path>
            <path d="M170,250 L200,260 L230,250 L260,280 L240,310 L200,300 L170,290 Z" fill="#F59E0B" opacity="0.6" stroke="white" stroke-width="1"><title>Maharashtra</title></path>
            <path d="M290,200 L320,190 L340,220 L330,260 L300,270 L280,240 Z" fill="#10B981" opacity="0.6" stroke="white" stroke-width="1"><title>Bihar/Jharkhand</title></path>
            <path d="M300,270 L340,260 L360,300 L340,330 L310,320 L290,300 Z" fill="#10B981" opacity="0.5" stroke="white" stroke-width="1"><title>West Bengal/Odisha</title></path>
            <path d="M200,300 L240,310 L260,340 L240,370 L210,380 L190,360 L180,330 Z" fill="#10B981" opacity="0.7" stroke="white" stroke-width="1"><title>Karnataka</title></path>
            <path d="M260,340 L290,330 L300,360 L280,390 L250,380 L240,370 Z" fill="#F59E0B" opacity="0.6" stroke="white" stroke-width="1"><title>Andhra Pradesh/Telangana</title></path>
            <path d="M190,360 L210,380 L220,410 L200,430 L180,420 L170,400 Z" fill="#10B981" opacity="0.8" stroke="white" stroke-width="1"><title>Tamil Nadu/Kerala</title></path>
          </svg>
          <div class="map-legend">
            <div class="legend-item"><div class="legend-dot" style="background:var(--success)"></div>Low Risk</div>
            <div class="legend-item"><div class="legend-dot" style="background:var(--warning)"></div>Medium Risk</div>
            <div class="legend-item"><div class="legend-dot" style="background:var(--danger)"></div>High Risk</div>
          </div>
        </div>

        <div class="section-title anim-slide-up">State Summary</div>
        ${nabardData.states.map(s => `
          <div class="notif-item anim-slide-up" style="cursor:pointer" onclick="window.__navigate('enterprise-profile')">
            <div class="notif-icon-wrap" style="background:${s.risk==='low'?'var(--success-bg)':s.risk==='medium'?'var(--warning-bg)':'var(--danger-bg)'}">
              <span class="material-symbols-rounded" style="color:${s.risk==='low'?'var(--success)':s.risk==='medium'?'var(--warning)':'var(--danger)'}">location_on</span>
            </div>
            <div class="notif-content">
              <div class="notif-title">${s.name}</div>
              <div class="notif-desc">${s.enterprises.toLocaleString()} enterprises • ${s.healthy}% healthy</div>
            </div>
            <span class="material-symbols-rounded" style="color:var(--text-muted);font-size:18px">arrow_forward_ios</span>
          </div>`).join('')}
      </div>
      ${bottomNav('village-risk-map', 'nabard')}
    </div>`;
}
