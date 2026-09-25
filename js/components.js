// ============================================
// REUSABLE COMPONENTS
// ============================================

import { navigateTo, goBack } from './router.js';

export function pageHeader(title, actions = '') {
  return `
    <div class="page-header">
      <button class="back-btn" onclick="window.__goBack()">
        <span class="material-symbols-rounded">arrow_back</span>
      </button>
      <h1 class="page-title">${title}</h1>
      <div class="header-actions">${actions}</div>
    </div>`;
}

export function kpiCard(label, value, change, direction, iconName, colorClass) {
  return `
    <div class="kpi-card ${colorClass} anim-slide-up hover-lift">
      <div class="kpi-icon ${colorClass}">
        <span class="material-symbols-rounded">${iconName}</span>
      </div>
      <div class="kpi-label">${label}</div>
      <div class="kpi-value">${value}</div>
      ${change ? `<div class="kpi-change ${direction}">${direction === 'up' ? '↑' : '↓'} ${change}</div>` : ''}
    </div>`;
}

export function circularProgress(size, strokeWidth, percentage, color, label, sublabel) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  return `
    <div class="circular-progress" style="width:${size}px;height:${size}px;">
      <svg width="${size}" height="${size}">
        <circle class="progress-bg" cx="${size/2}" cy="${size/2}" r="${radius}" stroke-width="${strokeWidth}"/>
        <circle class="progress-bar" cx="${size/2}" cy="${size/2}" r="${radius}" stroke-width="${strokeWidth}"
          stroke="${color}" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
          style="animation: none;"/>
      </svg>
      <div class="progress-value">
        <span class="progress-number" style="font-size:${size > 120 ? '2rem' : '1.25rem'}">${label}</span>
        ${sublabel ? `<span class="progress-label">${sublabel}</span>` : ''}
      </div>
    </div>`;
}

export function riskBadge(level) {
  return `<span class="risk-badge ${level}"><span class="dot"></span>${level.charAt(0).toUpperCase() + level.slice(1)} Risk</span>`;
}

export function glassCard(content, extraClass = '') {
  return `<div class="glass-card ${extraClass}">${content}</div>`;
}

export function bottomNav(activeItem, role = 'entrepreneur') {
  const entrepreneurItems = [
    { id: 'entrepreneur-dashboard', icon: 'home', label: 'Home' },
    { id: 'financial-twin', icon: 'monitoring', label: 'Twin' },
    { id: 'financial-analytics', icon: 'bar_chart', label: 'Analytics' },
    { id: 'ai-mentor', icon: 'psychology', label: 'AI Mentor' },
    { id: 'settings', icon: 'settings', label: 'Settings' },
  ];
  const nabardItems = [
    { id: 'nabard-dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'village-risk-map', icon: 'map', label: 'Risk Map' },
    { id: 'impact-dashboard', icon: 'rocket_launch', label: 'Impact' },
    { id: 'ai-analytics', icon: 'psychology', label: 'AI' },
    { id: 'settings', icon: 'settings', label: 'Settings' },
  ];
  const items = role === 'nabard' ? nabardItems : entrepreneurItems;
  return `
    <nav class="bottom-nav">
      ${items.map(item => `
        <div class="nav-item ${activeItem === item.id ? 'active' : ''}" onclick="window.__navigate('${item.id}')">
          <span class="material-symbols-rounded ${activeItem === item.id ? 'icon-filled' : ''}">${item.icon}</span>
          <span>${item.label}</span>
        </div>`).join('')}
    </nav>`;
}

export function transactionItem(tx) {
  return `
    <div class="transaction-item anim-slide-up">
      <div class="transaction-icon" style="background:${tx.type === 'income' ? 'var(--success-bg)' : 'var(--danger-bg)'}; color:${tx.type === 'income' ? 'var(--success)' : 'var(--danger)'}">
        <span class="material-symbols-rounded">${tx.icon}</span>
      </div>
      <div class="transaction-info">
        <div class="transaction-name">${tx.name}</div>
        <div class="transaction-date">${tx.date}</div>
      </div>
      <div class="transaction-amount ${tx.type}">${tx.amount}</div>
    </div>`;
}

export function alertCard(alert) {
  return `
    <div class="alert-card ${alert.severity} anim-slide-up">
      <div class="alert-header">
        <div class="alert-title">${alert.title}</div>
        ${riskBadge(alert.severity)}
      </div>
      <div class="alert-time">${alert.time}</div>
      <div class="alert-desc">${alert.desc}</div>
      <div class="alert-action">${alert.action} <span class="material-symbols-rounded" style="font-size:16px">arrow_forward</span></div>
    </div>`;
}

export function notifItem(notif) {
  return `
    <div class="notif-item ${notif.unread ? 'unread' : ''} anim-slide-up">
      <div class="notif-icon-wrap" style="background:${notif.color}15; color:${notif.color}">
        <span class="material-symbols-rounded">${notif.icon}</span>
      </div>
      <div class="notif-content">
        <div class="notif-title">${notif.title}</div>
        <div class="notif-desc">${notif.desc}</div>
        <div class="notif-time">${notif.time}</div>
      </div>
    </div>`;
}

export function docCard(doc) {
  return `
    <div class="doc-card anim-slide-up">
      <div class="doc-icon"><span class="material-symbols-rounded">${doc.icon}</span></div>
      <div class="doc-info">
        <div class="doc-name">${doc.name}</div>
        <div class="doc-meta">${doc.type} • ${doc.date}</div>
      </div>
      <span class="doc-status ${doc.status}">${doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}</span>
    </div>`;
}

export function sliderInput(id, label, min, max, value, unit = '') {
  return `
    <div class="slider-group">
      <div class="slider-header">
        <span class="slider-label">${label}</span>
        <span class="slider-value" id="${id}-val">${unit}${value}</span>
      </div>
      <input type="range" class="premium-slider" id="${id}" min="${min}" max="${max}" value="${value}"
        oninput="document.getElementById('${id}-val').textContent='${unit}'+this.value">
    </div>`;
}

// Expose navigation to onclick handlers
window.__navigate = navigateTo;
window.__goBack = goBack;
