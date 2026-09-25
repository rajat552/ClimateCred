// SCREEN 10: FINANCIAL ANALYTICS
import { analyticsData } from '../js/data.js';
import { pageHeader, bottomNav, kpiCard } from '../js/components.js';

export function renderFinancialAnalytics() {
  return `
    <div class="screen screen-scroll">
      ${pageHeader('Financial Analytics')}
      <div class="page-content stagger">
        <div class="tabs anim-slide-up" style="margin-bottom:var(--space-4)">
          <div class="tab" onclick="selectTab(this)">Week</div>
          <div class="tab" onclick="selectTab(this)">Month</div>
          <div class="tab active" onclick="selectTab(this)">Quarter</div>
          <div class="tab" onclick="selectTab(this)">Year</div>
        </div>
        <div class="kpi-row anim-slide-up">
          ${kpiCard('Income', analyticsData.income.total, analyticsData.income.change, 'up', 'trending_up', 'green')}
          ${kpiCard('Expense', analyticsData.expense.total, analyticsData.expense.change, 'up', 'trending_down', 'red')}
        </div>
        <div class="kpi-row anim-slide-up" style="margin-top:var(--space-3)">
          ${kpiCard('Profit', analyticsData.profit.total, analyticsData.profit.change, 'up', 'savings', 'blue')}
          ${kpiCard('Savings', analyticsData.savings.total, analyticsData.savings.change, 'up', 'account_balance', 'gold')}
        </div>
        <div class="section-title anim-slide-up">Category Breakdown</div>
        <div class="chart-container anim-slide-up" style="display:flex;align-items:center;gap:var(--space-4)">
          <div style="width:140px;height:140px;flex-shrink:0"><canvas id="analytics-donut"></canvas></div>
          <div style="display:flex;flex-direction:column;gap:var(--space-2);flex:1">
            ${analyticsData.categories.map(c => `
              <div style="display:flex;align-items:center;gap:var(--space-2)">
                <span style="width:8px;height:8px;border-radius:50%;background:${c.color};flex-shrink:0"></span>
                <span style="font-size:var(--text-xs);flex:1">${c.name}</span>
                <span style="font-size:var(--text-xs);font-weight:600">${c.value}%</span>
              </div>`).join('')}
          </div>
        </div>
        <div class="section-title anim-slide-up">Monthly Trend</div>
        <div class="chart-container anim-slide-up">
          <canvas id="analytics-trend" height="180"></canvas>
        </div>
      </div>
      ${bottomNav('financial-analytics')}
    </div>`;
}
