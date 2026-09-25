// ============================================
// SCREEN 3: ENTREPRENEUR DASHBOARD
// ============================================

import { userData, dashboardData, transactions, aiInsight } from '../js/data.js';
import { kpiCard, bottomNav, transactionItem, circularProgress } from '../js/components.js';
import { showTransactionModal } from '../js/ui.js';

export function renderEntrepreneurDashboard() {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return `
    <div class="screen screen-scroll">
      <!-- Header -->
      <div class="dash-header">
        <div class="flex items-center gap-3">
          <div class="dash-avatar">${userData.avatar}</div>
          <div class="dash-greeting" style="padding:0">
            <h2 style="font-size:var(--text-lg)">${greeting}, ${userData.name} 👋</h2>
            <p style="font-size:var(--text-xs);color:var(--text-muted)">${userData.business} • <span id="live-clock" style="color:var(--primary);font-weight:600"></span></p>
          </div>
        </div>
        <div class="dash-notif" onclick="window.__navigate('notifications')">
          <span class="material-symbols-rounded">notifications</span>
          <div class="notif-dot"></div>
        </div>
      </div>

      <div class="page-content stagger">
        <!-- Health Score -->
        <div class="gradient-glass anim-slide-up" style="text-align:center;margin-bottom:var(--space-4);cursor:pointer" onclick="window.__navigate('financial-twin')">
          <div class="flex items-center justify-center gap-4">
            ${circularProgress(100, 8, userData.healthScore, '#2E7D32', userData.healthScore, 'Health')}
            <div style="text-align:left">
              <div style="font-size:var(--text-xs);color:var(--text-muted);font-weight:500">BUSINESS HEALTH SCORE</div>
              <div style="font-size:var(--text-xl);font-weight:700;font-family:var(--font-display);color:var(--primary)">${userData.healthScore}/100</div>
              <div style="font-size:var(--text-xs);color:var(--success);font-weight:500">↑ 4.2% from last month</div>
            </div>
          </div>
          <div style="margin-top:var(--space-3);font-size:var(--text-xs);color:var(--primary);font-weight:600;display:flex;align-items:center;justify-content:center;gap:4px">
            View Digital Twin <span class="material-symbols-rounded" style="font-size:16px">arrow_forward</span>
          </div>
        </div>

        <!-- KPI Row -->
        <div class="kpi-row anim-slide-up">
          ${kpiCard("Today's Revenue", dashboardData.revenue, dashboardData.revenueChange, 'up', 'payments', 'green')}
          ${kpiCard('Cash Flow', dashboardData.cashflow, dashboardData.cashflowChange, 'up', 'account_balance_wallet', 'blue')}
        </div>

        <div class="kpi-row anim-slide-up" style="margin-top:var(--space-3)">
          ${kpiCard('Risk Level', dashboardData.riskLevel, 'Score: ' + dashboardData.riskScore, dashboardData.riskLevel === 'Low' ? 'down' : 'up', 'shield', dashboardData.riskLevel === 'Low' ? 'green' : 'gold')}
          ${kpiCard('Expenses', dashboardData.expenses, '+2.1%', 'up', 'receipt_long', 'red')}
        </div>

        <!-- Quick Actions -->
        <div class="section-title anim-slide-up">Quick Actions</div>
        <div class="quick-actions anim-slide-up">
          <div class="quick-action-btn" onclick="window.__openTransactionModal('income')">
            <span class="material-symbols-rounded" style="color:var(--success)">add_circle</span>
            <span>Income</span>
          </div>
          <div class="quick-action-btn" onclick="window.__openTransactionModal('expense')">
            <span class="material-symbols-rounded" style="color:var(--danger)">remove_circle</span>
            <span>Expense</span>
          </div>
          <div class="quick-action-btn" onclick="window.__navigate('cashflow-forecast')">
            <span class="material-symbols-rounded" style="color:var(--secondary)">query_stats</span>
            <span>Forecast</span>
          </div>
          <div class="quick-action-btn" onclick="window.__navigate('ai-mentor')">
            <span class="material-symbols-rounded" style="color:var(--accent-dark)">psychology</span>
            <span>AI Mentor</span>
          </div>
        </div>

        <!-- Mini Revenue Chart -->
        <div class="section-title anim-slide-up">Revenue Trend</div>
        <div class="chart-container anim-slide-up">
          <canvas id="dash-revenue-chart" height="120"></canvas>
        </div>

        <!-- AI Insight -->
        <div class="section-title anim-slide-up">Latest AI Insight</div>
        <div class="ai-insight-card anim-slide-up" onclick="window.__navigate('explainable-ai')">
          <div class="ai-badge"><span class="material-symbols-rounded" style="font-size:16px">auto_awesome</span> AI Insight</div>
          <div class="insight-text">${aiInsight.substring(0, 140)}...</div>
          <div style="margin-top:var(--space-3);font-size:var(--text-xs);color:var(--primary);font-weight:600;display:flex;align-items:center;gap:4px;cursor:pointer">
            View Details <span class="material-symbols-rounded" style="font-size:16px">arrow_forward</span>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div class="section-title anim-slide-up">Recent Transactions</div>
        <div class="transaction-list stagger">
          ${transactions.length > 0 
            ? transactions.map(tx => transactionItem(tx)).join('') 
            : `<div style="text-align:center;padding:var(--space-6);color:var(--text-muted);background:rgba(0,0,0,0.01);border-radius:12px;border:1px dashed var(--border-light)">
                 <span class="material-symbols-rounded" style="font-size:32px;color:var(--text-muted);margin-bottom:var(--space-2)">receipt_long</span>
                 <p style="font-size:var(--text-sm);font-weight:500">No transactions recorded yet</p>
                 <p style="font-size:var(--text-xs);margin-top:4px">Tap Income or Expense above to add your first entry.</p>
               </div>`
          }
        </div>
      </div>

      ${bottomNav('entrepreneur-dashboard')}
    </div>`;
}

// Open transaction modal instead of prompt()
window.__openTransactionModal = function(type) {
  showTransactionModal(type);
};

// Keep old promptTransaction for backwards compatibility but redirect to modal
window.promptTransaction = function(type) {
  showTransactionModal(type);
};
