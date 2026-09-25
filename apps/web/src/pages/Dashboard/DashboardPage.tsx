import React from 'react'
import { Link } from 'react-router-dom'

export default function DashboardPage() {
  const kpis = [
    { label: 'Active Loan Cases', value: '42', change: '+8% vs last month', positive: true, icon: 'folder_open', color: 'brand' },
    { label: 'Avg Portfolio CVI', value: '38.4', change: 'Moderate Climate Risk', status: 'Moderate', icon: 'thermostat', color: 'amber' },
    { label: 'Avg Green Viability (GVS)', value: '74.2', change: '+3.1 pts YoY', positive: true, icon: 'eco', color: 'emerald' },
    { label: 'Green Loans Underwritten', value: '₹18.4 Cr', change: '14 Active Subsidies', positive: true, icon: 'account_balance', color: 'blue' },
  ]

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
      {/* Header banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
              Live Climate-Financial Intelligence Hub
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              MSME Climate Portfolio & Underwriting
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Real-time physical climate hazard scoring (CVI) paired with green transition viability assessment (GVS) for bankable MSME underwriting.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/cases"
              className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-brand-600/20 flex items-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              New Underwriting Case
            </Link>
            <Link
              to="/portfolio"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-medium rounded-lg flex items-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-sm">analytics</span>
              Stress Test Heatmap
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 transition-all shadow-sm"
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Cases */}
        <div className="lg:col-span-2 rounded-xl bg-slate-900/60 border border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-white">Active Loan Underwriting Cases</h2>
              <p className="text-xs text-slate-400">Dual-engine scoring status across recent applications</p>
            </div>
            <Link to="/cases" className="text-xs text-brand-400 hover:text-brand-300 font-medium">
              View All Cases →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-3 font-semibold">MSME / Enterprise</th>
                  <th className="pb-3 font-semibold">Amount</th>
                  <th className="pb-3 font-semibold text-center">CVI Score</th>
                  <th className="pb-3 font-semibold text-center">GVS Score</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentCases.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3">
                      <div className="font-semibold text-slate-100">{c.msme}</div>
                      <div className="text-[11px] text-slate-400">{c.sector}</div>
                    </td>
                    <td className="py-3 font-medium text-slate-200">{c.amount}</td>
                    <td className="py-3 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                        c.cvi <= 30 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        c.cvi <= 60 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {c.cvi}/100 ({c.cviBand})
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                        {c.gvs}/100 ({c.gvsBand})
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                        {c.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        to={`/cases/${c.id}`}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Climate Intelligence Quick Insights */}
        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Hazard Intelligence</h2>
            <span className="material-symbols-outlined text-brand-400 text-lg">radar</span>
          </div>

          <div className="p-3.5 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">warning</span>
              Heatwave Vulnerability Alert: Telangana / AP
            </div>
            <p className="text-slate-300 text-[11px]">
              +3.2°C above seasonal baseline projected across 18 borrower clusters. Recommended adaptation: cold-chain thermal insulation & micro-insurance.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Methodology Highlights
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="font-medium text-slate-200">CVI Engine (ISO 14091)</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Physical hazard × Exposure × Vulnerability ÷ Adaptive Capacity</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="font-medium text-slate-200">GVS Engine (Green Viability)</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Carbon reduction + IRR uplift + Payback stability + Subsidy eligibility</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
