import React from 'react'

export default function PortfolioPage() {
  const sectors = [
    { name: 'Agri-Logistics & Cold Storage', count: 18, exposure: '₹7.2 Cr', avgCvi: 36, avgGvs: 78 },
    { name: 'Renewable Bioenergy & Solar', count: 12, exposure: '₹9.4 Cr', avgCvi: 24, avgGvs: 89 },
    { name: 'Coastal Aquaculture', count: 7, exposure: '₹2.8 Cr', avgCvi: 68, avgGvs: 56 },
    { name: 'Textiles & Dyeing', count: 5, exposure: '₹3.6 Cr', avgCvi: 52, avgGvs: 64 },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Portfolio Climate Risk & Stress Analytics</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Aggregated exposure, hazard concentration, and green asset transition metrics across all branches
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 flex items-center gap-1.5 cursor-pointer">
            <span className="material-symbols-outlined text-sm">download</span>
            Export BRSR / TCFD Report
          </button>
        </div>
      </div>

      {/* Sector breakdown */}
      <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5 space-y-4">
        <h2 className="text-base font-semibold text-white">Sectoral Climate Risk & Green Allocation</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                <th className="py-3 px-4 font-semibold">Sector</th>
                <th className="py-3 px-4 font-semibold">Active Loans</th>
                <th className="py-3 px-4 font-semibold">Total Exposure</th>
                <th className="py-3 px-4 font-semibold text-center">Avg CVI Score</th>
                <th className="py-3 px-4 font-semibold text-center">Avg GVS Score</th>
                <th className="py-3 px-4 font-semibold text-right">Risk Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {sectors.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-100">{s.name}</td>
                  <td className="py-3.5 px-4 text-slate-300">{s.count}</td>
                  <td className="py-3.5 px-4 text-slate-200 font-medium">{s.exposure}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      s.avgCvi <= 30 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      s.avgCvi <= 55 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {s.avgCvi}/100
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                      {s.avgGvs}/100
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {s.avgCvi > 55 ? 'Needs Climate Adaptation' : 'Transition Aligned'}
                    </span>
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
