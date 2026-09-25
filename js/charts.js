// ============================================
// CHART.JS CONFIGURATIONS
// ============================================

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const gridColor = 'rgba(226,232,240,0.5)';
const fontFamily = "'Inter', sans-serif";

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1E293B',
      titleFont: { family: fontFamily, size: 12 },
      bodyFont: { family: fontFamily, size: 11 },
      padding: 10,
      cornerRadius: 8,
      displayColors: false,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { family: fontFamily, size: 10 }, color: '#94A3B8' },
    },
    y: {
      grid: { color: gridColor },
      ticks: { font: { family: fontFamily, size: 10 }, color: '#94A3B8' },
      border: { display: false },
    },
  },
  animation: { duration: 1200, easing: 'easeOutQuart' },
};

export function createForecastChart(canvasId, labels, income, expenses, forecast) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Income',
          data: income,
          borderColor: '#2E7D32',
          backgroundColor: 'rgba(46,125,50,0.08)',
          fill: true, tension: 0.4, pointRadius: 3,
          pointBackgroundColor: '#2E7D32', borderWidth: 2.5,
        },
        {
          label: 'Expenses',
          data: expenses,
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239,68,68,0.05)',
          fill: true, tension: 0.4, pointRadius: 3,
          pointBackgroundColor: '#EF4444', borderWidth: 2,
        },
        {
          label: 'AI Forecast',
          data: forecast,
          borderColor: '#1565C0',
          borderDash: [6, 4],
          tension: 0.4, pointRadius: 4,
          pointBackgroundColor: '#1565C0', borderWidth: 2.5,
          pointStyle: 'triangle',
        },
      ],
    },
    options: { ...baseOptions },
  });
}

export function createAreaChart(canvasId, labels, data1, data2, label1, label2, color1, color2) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: label1, data: data1,
          borderColor: color1, backgroundColor: color1 + '15',
          fill: true, tension: 0.4, borderWidth: 2, pointRadius: 2,
        },
        {
          label: label2, data: data2,
          borderColor: color2, backgroundColor: color2 + '10',
          fill: true, tension: 0.4, borderWidth: 2, pointRadius: 2,
        },
      ],
    },
    options: { ...baseOptions },
  });
}

export function createDonutChart(canvasId, labels, data, colors) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;
  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{ data, backgroundColor: colors, borderWidth: 0, hoverOffset: 6 }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: { display: false },
        tooltip: baseOptions.plugins.tooltip,
      },
      animation: { animateRotate: true, duration: 1200, easing: 'easeOutQuart' },
    },
  });
}

export function createBarChart(canvasId, labels, data, colors) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{ data, backgroundColor: colors, borderRadius: 6, barThickness: 20 }],
    },
    options: {
      ...baseOptions,
      indexAxis: 'y',
      scales: {
        x: { grid: { color: gridColor }, ticks: { font: { family: fontFamily, size: 10 }, color: '#94A3B8' }, border: { display: false } },
        y: { grid: { display: false }, ticks: { font: { family: fontFamily, size: 11, weight: '500' }, color: '#1E293B' } },
      },
    },
  });
}

export function createMiniLineChart(canvasId, data, color) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map((_, i) => i),
      datasets: [{
        data, borderColor: color, backgroundColor: color + '15',
        fill: true, tension: 0.4, borderWidth: 2, pointRadius: 0,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: { x: { display: false }, y: { display: false } },
      animation: { duration: 1000 },
    },
  });
}
