import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function CasesPage() {
  const [filterStatus, setFilterStatus] = useState('ALL')

  const cases = [
    {
      id: 'case-001',
      msmeName: 'Annapurna Agro-Cold Storage',
      loanType: 'Green Equipment Capex',
      amount: '₹35,00,000',
      tenor: '60 Months',
      cvi: 34,
      cviBand: 'MODERATE',
      gvs: 82,
      gvsBand: 'HIGH',
      status: 'APPROVED',
      officer: 'Rohan Sharma',
      date: '2026-09-24',
    },
    {
      id: 'case-002',
      msmeName: 'Deccan Biomass Pellets Ltd',
      loanType: 'Bioenergy Expansion',
      amount: '₹75,00,000',
      tenor: '84 Months',
      cvi: 28,
      cviBand: 'LOW',
      gvs: 88,
      gvsBand: 'EXEMPLARY',
      status: 'UNDER_REVIEW',
      officer: 'Ananya Reddy',
      date: '2026-09-25',
    },
    {
      id: 'case-003',
      msmeName: 'Krishna Valley Coastal Aqua',
      loanType: 'Aerator & Solar Hybrid',
      amount: '₹22,00,000',
      tenor: '48 Months',
      cvi: 71,
      cviBand: 'HIGH',
      gvs: 49,
      gvsBand: 'MODERATE',
      status: 'STRESS_TEST_REQUIRED',
      officer: 'Rohan Sharma',
      date: '2026-09-23',
    },
    {
      id: 'case-004',
      msmeName: 'Godavari Precision Drip Farm',
      loanType: 'Micro-Irrigation Solar Pump',
      amount: '₹18,50,000',
      tenor: '36 Months',
      cvi: 41,
      cviBand: 'MODERATE',
      gvs: 79,
      gvsBand: 'HIGH',
      status: 'APPROVED',
      officer: 'Priya Nair',
      date: '2026-09-22',
    },
  ]

  const filtered = cases.filter((c) => filterStatus === 'ALL' || c.status === filterStatus)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Loan Underwriting Cases</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Credit and green viability underwriting workflow queue
          </p>
        </div>
        <button className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-brand-600/20 flex items-center gap-2 transition-all cursor-pointer">
          <span className="material-symbols-outlined text-sm">add_circle</span>
          Create New Loan Case
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto text-xs">
        {['ALL', 'UNDER_REVIEW', 'APPROVED', 'STRESS_TEST_REQUIRED', 'REJECTED'].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filterStatus === s
                ? 'bg-brand-500/10 border border-brand-500/40 text-brand-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {s.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Cases Table */}
      <div className="rounded-xl bg-slate-900/60 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                <th className="py-3 px-4 font-semibold">Case ID & MSME</th>
                <th className="py-3 px-4 font-semibold">Loan Facility</th>
                <th className="py-3 px-4 font-semibold">Amount & Tenor</th>
                <th className="py-3 px-4 font-semibold text-center">CVI Score</th>
                <th className="py-3 px-4 font-semibold text-center">GVS Score</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Credit Officer</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-[10px] text-slate-500 block">{c.id}</span>
                    <span className="font-semibold text-slate-100">{c.msmeName}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">{c.loanType}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-200">{c.amount}</div>
                    <div className="text-[10px] text-slate-400">{c.tenor}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.cvi <= 30 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      c.cvi <= 60 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {c.cvi}/100
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                      {c.gvs}/100
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      c.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      c.status === 'UNDER_REVIEW' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {c.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 text-[11px]">{c.officer}</td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to={`/cases/${c.id}`}
                      className="px-3 py-1 bg-brand-600/10 hover:bg-brand-600/20 text-brand-400 font-medium rounded border border-brand-500/30 transition-colors text-xs inline-flex items-center gap-1"
                    >
                      Underwrite
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
