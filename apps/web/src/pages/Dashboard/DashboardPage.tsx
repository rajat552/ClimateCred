import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function DashboardPage() {
  const [sectorFilter, setSectorFilter] = useState('ALL')

  const kpis = [
    { label: 'Active Loan Cases', value: '42', change: '+8% vs last month', positive: true, icon: 'folder_open', color: 'brand' },
    { label: 'Avg Portfolio CVI', value: '38.4', change: 'Moderate Climate Hazard', status: 'Moderate', icon: 'thermostat', color: 'amber' },
    { label: 'Avg Green Viability (GVS)', value: '74.2', change: '+3.1 pts YoY', positive: true, icon: 'eco', color: 'emerald' },
    { label: 'Green Loans Underwritten', value: '₹18.4 Cr', change: '14 Active Subsidies', positive: true, icon: 'account_balance', color: 'blue' },
  ]

  const trendData = {
    labels: ['Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026', 'Aug 2026', 'Sep 2026'],
    datasets: [
      {
        label: 'Green Loan Volume (₹ Cr)',
        data: [8.2, 10.5, 12.8, 14.2, 16.5, 18.4],
        borderColor: '#0F9D72',
        backgroundColor: 'rgba(15, 157, 114, 0.12)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#0F9D72',
      },
      {
        label: 'Portfolio Avg CVI (Hazard Index)',
        data: [44.0, 42.5, 41.0, 39.8, 39.0, 38.4],
        borderColor: '#F59E0B',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: '#F59E0B',
      },
    ],
  }

  const doughnutData = {
    labels: ['Solar & Bioenergy', 'Agri-Cold Storage', 'Precision Water Tech', 'Textiles', 'Aquaculture'],
    datasets: [
      {
        data: [42, 28, 15, 10, 5],
        backgroundColor: ['#0F9D72', '#3B82F6', '#10B981', '#F59E0B', '#6366F1'],
        borderWidth: 0,
      },
    ],
  }

  const recentCases = [
    {
      id: 'case-001',
      msme: 'Annapurna Solar Cold Storage',
      sector: 'Agri-Logistics / Warehousing',
      amount: '₹35,00,000',
      cvi: 34,
      cviBand: 'MODERATE',
      gvs: 82,
      gvsBand: 'HIGH',
      status: 'APPROVED',
      updated: '10 mins ago',
    },
    {
      id: 'case-002',
      msme: 'Deccan Biomass Pellets Ltd',
      sector: 'Renewable Fuel / Clean Energy',
      amount: '₹75,00,000',
      cvi: 28,
      cviBand: 'LOW',
      gvs: 88,
      gvsBand: 'EXEMPLARY',
      status: 'UNDER_REVIEW',
      updated: '42 mins ago',
    },
    {
      id: 'case-003',
      msme: 'Krishna Valley Coastal Aqua',
      sector: 'Aquaculture / Marine',
      amount: '₹22,00,000',
      cvi: 71,
      cviBand: 'HIGH',
      gvs: 49,
      gvsBand: 'MODERATE',
      status: 'STRESS_TEST_REQUIRED',
      updated: '2 hours ago',
    },
    {
      id: 'case-004',
      msme: 'Godavari Precision Drip Farm',
      sector: 'Horticulture & Water Tech',
      amount: '₹18,50,000',
      cvi: 41,
      cviBand: 'MODERATE',
      gvs: 79,
      gvsBand: 'HIGH',
      status: 'APPROVED',
      updated: '4 hours ago',
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
              Live Underwriting Command Center
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              MSME Climate Portfolio & Risk Intelligence
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Real-time physical hazard scoring (ISO 14091) paired with green transition viability (GVS) for high-confidence MSME underwriting.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/cases"
              className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-brand-600/20 flex items-center gap-1.5 transition-all"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              New Underwriting Case
            </Link>
            <Link
              to="/portfolio"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all"
            >
              <span className="material-symbols-outlined text-sm">insights</span>
              Portfolio Heatmap
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 transition-all shadow-sm backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-400">{kpi.label}</span>
              <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
                <span className="material-symbols-outlined text-lg">{kpi.icon}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">{kpi.value}</div>
            <div className="mt-2 text-xs flex items-center gap-1.5 font-medium text-emerald-400">
              <span className="material-symbols-outlined text-xs">trending_up</span>
              <span>{kpi.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Analytical Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">Green Underwriting Volume & CVI De-Risking Trend</h2>
              <p className="text-[11px] text-slate-400">Monthly sanctioned green capex vs aggregate physical risk trajectory</p>
            </div>
            <span className="text-xs text-brand-400 font-mono bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
              Live Feed
            </span>
          </div>
          <div className="h-64 w-full">
            <Line
              data={trendData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: { color: '#94A3B8', font: { size: 11 } },
                  },
                },
                scales: {
                  x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#94A3B8', font: { size: 10 } } },
                  y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#94A3B8', font: { size: 10 } } },
                },
              }}
            />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-white">Green Project Sector Allocation</h2>
            <p className="text-[11px] text-slate-400">Distribution across climate transition categories</p>
          </div>
          <div className="h-52 flex items-center justify-center">
            <Doughnut
              data={doughnutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { color: '#94A3B8', font: { size: 10 }, boxWidth: 10 },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Grid: Underwriting Table & Hazard Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Underwriting Cases */}
        <div className="lg:col-span-2 rounded-xl bg-slate-900/60 border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">Active Loan Underwriting Queue</h2>
              <p className="text-xs text-slate-400">Dual-engine scoring status across recent applications</p>
            </div>
            <Link to="/cases" className="text-xs text-brand-400 hover:text-brand-300 font-medium">
              View All 42 Cases →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                  <th className="py-2.5 px-3 font-semibold">MSME / Enterprise</th>
                  <th className="py-2.5 px-3 font-semibold">Capex Amount</th>
                  <th className="py-2.5 px-3 font-semibold text-center">CVI Score</th>
                  <th className="py-2.5 px-3 font-semibold text-center">GVS Score</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentCases.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-100">{c.msme}</div>
                      <div className="text-[11px] text-slate-400">{c.sector}</div>
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-200">{c.amount}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                        c.cvi <= 30 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        c.cvi <= 60 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {c.cvi}/100
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                        {c.gvs}/100
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        c.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        c.status === 'UNDER_REVIEW' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {c.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        to={`/cases/${c.id}`}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                      >
                        Appraise
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Climate Hazard Live Radar */}
        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Hazard Watchdog</h2>
            <span className="material-symbols-outlined text-brand-400 text-lg">radar</span>
          </div>

          <div className="p-3.5 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">warning</span>
              Heatwave Vulnerability Alert: Maharashtra / AP
            </div>
            <p className="text-slate-300 text-[11px]">
              +3.2°C above seasonal baseline projected across 18 borrower clusters. Recommended adaptation: cold-chain thermal insulation & solar rooftop hedging.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-blue-500/5 border border-blue-500/20 text-xs text-blue-300 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">water_drop</span>
              Monsoon Flash Flood Warning: Coastal AP
            </div>
            <p className="text-slate-300 text-[11px]">
              Machilipatnam aquaculture zone flagged for elevated storm surge risk. Micro-insurance rider covenant triggered.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
