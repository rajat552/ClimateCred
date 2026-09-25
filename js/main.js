// ============================================
// RURALMIND AI — MAIN APP
// ============================================

import { registerScreen, navigateTo, initRouter } from './router.js';
import { createForecastChart, createAreaChart, createDonutChart, createBarChart, createMiniLineChart } from './charts.js';
import { forecastData, analyticsData, nabardData } from './data.js';
import { initDarkMode, startLiveClock, getRelativeTime } from './ui.js';

// Import all screens
import { renderSplash } from '../screens/splash.js';
import { renderLogin } from '../screens/login.js';
import { renderEntrepreneurDashboard } from '../screens/entrepreneur-dashboard.js';
import { renderFinancialTwin } from '../screens/financial-twin.js';
import { renderCashflowForecast } from '../screens/cashflow-forecast.js';
import { renderExplainableAI } from '../screens/explainable-ai.js';
import { renderWhatIfSimulator } from '../screens/what-if-simulator.js';
import { renderAIMentor } from '../screens/ai-mentor.js';
import { renderRiskAlerts } from '../screens/risk-alerts.js';
import { renderFinancialAnalytics } from '../screens/financial-analytics.js';
import { renderDocumentCenter, renderNotifications } from '../screens/document-notifications.js';
import { renderNabardDashboard } from '../screens/nabard-dashboard.js';
import { renderVillageRiskMap } from '../screens/village-risk-map.js';
import { renderEnterpriseProfile } from '../screens/enterprise-profile.js';
import { renderAIAnalytics } from '../screens/ai-analytics.js';
import { renderImpactDashboard, renderSettings } from '../screens/impact-settings.js';
import { renderOnboarding } from '../screens/onboarding.js';

// Register all screens
registerScreen('splash', renderSplash);
registerScreen('login', renderLogin);
registerScreen('onboarding', renderOnboarding);
registerScreen('entrepreneur-dashboard', renderEntrepreneurDashboard);
registerScreen('financial-twin', renderFinancialTwin);
registerScreen('cashflow-forecast', renderCashflowForecast);
registerScreen('explainable-ai', renderExplainableAI);
registerScreen('what-if-simulator', renderWhatIfSimulator);
registerScreen('ai-mentor', renderAIMentor);
registerScreen('risk-alerts', renderRiskAlerts);
registerScreen('financial-analytics', renderFinancialAnalytics);
registerScreen('document-center', renderDocumentCenter);
registerScreen('notifications', renderNotifications);
registerScreen('nabard-dashboard', renderNabardDashboard);
registerScreen('village-risk-map', renderVillageRiskMap);
registerScreen('enterprise-profile', renderEnterpriseProfile);
registerScreen('ai-analytics', renderAIAnalytics);
registerScreen('impact-dashboard', renderImpactDashboard);
registerScreen('settings', renderSettings);

// Init
document.addEventListener('DOMContentLoaded', () => {
  // Initialize dark mode from localStorage
  initDarkMode();

  initRouter();
  
  const hash = window.location.hash.slice(1);
  if (hash && hash !== 'splash') {
    navigateTo(hash);
  } else {
    navigateTo('splash');
  }
});

// Chart initialization on screen render
document.addEventListener('screen:rendered', (e) => {
  const screen = e.detail.screen;
  
  setTimeout(() => {
    // Animate factor bars on explainable-ai
    document.querySelectorAll('.factor-bar[data-width]').forEach(bar => {
      bar.style.width = bar.dataset.width;
    });

    // Count-up animation for impact cards
    document.querySelectorAll('.impact-value[data-count]').forEach(el => {
      const target = parseFloat(el.dataset.count);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const step = target / 60;
      const isFloat = target % 1 !== 0;
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;
      }, 20);
    });

    // Count-up animation for KPI values
    document.querySelectorAll('.kpi-value[data-countup]').forEach(el => {
      const targetText = el.dataset.countup;
      const match = targetText.match(/(.*?)([\d,]+\.?\d*)(.*)/);
      if (match) {
        const prefix = match[1];
        const target = parseFloat(match[2].replace(/,/g, ''));
        const suffix = match[3];
        let current = 0;
        const step = target / 40;
        const isFloat = target % 1 !== 0;
        const interval = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString('en-IN')) + suffix;
        }, 25);
      }
    });

    // Start live clock on dashboard
    if (screen === 'entrepreneur-dashboard' || screen === 'nabard-dashboard') {
      startLiveClock('live-clock');
    }

    // Update relative timestamps
    const relTimeEls = document.querySelectorAll('[data-reltime]');
    relTimeEls.forEach(el => {
      el.textContent = getRelativeTime();
    });

    // Charts
    if (screen === 'entrepreneur-dashboard') {
      createMiniLineChart('dash-revenue-chart', 
        [38000,41000,39500,42000,44000,42580], '#2E7D32');
    }
    
    if (screen === 'financial-twin') {
      createMiniLineChart('twin-trend-chart',
        [68,71,70,73,75,74,76,78], '#4CAF50');
    }

    if (screen === 'cashflow-forecast') {
      createForecastChart('forecast-chart', 
        forecastData.labels, forecastData.income, forecastData.expenses, forecastData.forecast);
    }

    if (screen === 'what-if-sim-results') {
      createAreaChart('sim-chart',
        ['Now','Month 1','Month 2','Month 3','Month 4','Month 5','Month 6'],
        [28350,29100,30200,31200,32400,33100,34000],
        [14230,14800,15100,14900,15200,14600,14300],
        'Profit','Expenses','#2E7D32','#EF4444');
    }

    if (screen === 'financial-analytics') {
      createDonutChart('analytics-donut',
        analyticsData.categories.map(c => c.name),
        analyticsData.categories.map(c => c.value),
        analyticsData.categories.map(c => c.color));
      createAreaChart('analytics-trend',
        ['Jan','Feb','Mar','Apr','May','Jun'],
        [38000,41000,39500,42000,44000,42580],
        [15000,14200,16000,14500,13800,14230],
        'Income','Expenses','#2E7D32','#EF4444');
    }

    if (screen === 'nabard-dashboard') {
      createBarChart('nabard-bar-chart',
        nabardData.states.map(s => s.name),
        nabardData.states.map(s => s.enterprises),
        nabardData.states.map(s => s.risk === 'low' ? '#10B981' : s.risk === 'medium' ? '#F59E0B' : '#EF4444'));
    }

    if (screen === 'ai-analytics') {
      createBarChart('shap-chart',
        ['UPI Frequency','Repayment History','Seasonal Revenue','Feed Cost','Weather','Loan Amount'],
        [23,19,16,14,12,8],
        ['#2E7D32','#1565C0','#8B5CF6','#EF4444','#F59E0B','#94A3B8']);
      createMiniLineChart('accuracy-trend',
        [85.2,87.1,88.4,89.0,90.2,90.8,91.2,91.7], '#2E7D32');
    }

    if (screen === 'impact-dashboard') {
      createAreaChart('impact-chart',
        ['Q1','Q2','Q3','Q4','Q1','Q2'],
        [2100,3400,5200,7800,10200,12847],
        [340,780,1400,2200,3200,3842],
        'Enterprises','Loans Protected','#2E7D32','#1565C0');
    }
  }, 200);
});
