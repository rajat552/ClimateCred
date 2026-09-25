import React from 'react'
import { useParams, Link } from 'react-router-dom'

export default function MsmeDetailPage() {
  const { msmeId } = useParams()

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top breadcrumb & header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Link to="/msmes" className="hover:text-slate-200">MSMEs</Link>
            <span>/</span>
            <span className="text-brand-400 font-mono">{msmeId || 'msme-001'}</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Annapurna Agro-Cold Storage</h1>
          <p className="text-xs text-slate-400 mt-0.5">Udyam: UDYAM-MH-12-0049281 • Nagpur Rural, Maharashtra (Lat: 21.1458, Lon: 79.0882)</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={`/cases/case-001`}
            className="px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-sm shadow-brand-600/20"
          >
            <span className="material-symbols-outlined text-sm">assignment</span>
            Active Loan Case
          </Link>
        </div>
      </div>

      {/* Grid: Financial & Physical Twin */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Physical & Climate Twin */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-brand-400">landscape</span>
                Physical Asset & Geolocation Profile
              </h2>
              <span className="text-xs px-2 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20 font-medium">
                Asset Verified (Sentinel-2 + Bhuvan)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                <span className="text-slate-400 block text-[11px]">Facility Size</span>
                <span className="text-slate-200 font-bold text-sm">24,000 sq.ft</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                <span className="text-slate-400 block text-[11px]">Grid Dependence</span>
                <span className="text-slate-200 font-bold text-sm">78% Grid / 22% DG</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                <span className="text-slate-400 block text-[11px]">Refrigerant Tech</span>
                <span className="text-slate-200 font-bold text-sm">R-404A (High GWP)</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                <span className="text-slate-400 block text-[11px]">Elevation & Terrain</span>
                <span className="text-slate-200 font-bold text-sm">310m MSL (Flat Plain)</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-200">Proposed Green Upgrade Project</div>
                <div className="text-[11px] text-slate-400 mt-0.5">80 kW Rooftop Solar PV + Phase-Change Material (PCM) Thermal Storage</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-emerald-400">₹35,00,000</div>
                <div className="text-[10px] text-slate-400">Est. 38% Energy Cost Reduction</div>
              </div>
            </div>
          </div>

          {/* Financial Twin Profile */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <span className="material-symbols-outlined text-blue-400">account_balance</span>
              Financial Baseline & Debt Profile
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Annual Revenue</span>
                <span className="text-slate-100 font-bold text-sm">₹4,20,00,000</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Operating EBITDA</span>
                <span className="text-slate-100 font-bold text-sm">₹64,00,000 (15.2%)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Existing Debt</span>
                <span className="text-slate-100 font-bold text-sm">₹1,10,00,000</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Baseline DSCR</span>
                <span className="text-emerald-400 font-bold text-sm">1.84x</span>
              </div>
            </div>
          </div>
        </div>

        {/* Climate & Risk Scores Sidebar */}
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h2 className="text-base font-semibold text-white">Twin Risk Engine Scores</h2>

            {/* CVI Gauge */}
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Climate Vulnerability (CVI)</span>
                <span className="font-bold text-amber-400">34 / 100</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-amber-400 h-2 rounded-full" style={{ width: '34%' }}></div>
              </div>
              <p className="text-[11px] text-slate-400">
                Primary hazard: Extreme Heatwaves (&gt;43°C days causing DG diesel spikes).
              </p>
            </div>

            {/* GVS Gauge */}
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Green Viability (GVS)</span>
                <span className="font-bold text-brand-400">82 / 100</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-brand-500 h-2 rounded-full" style={{ width: '82%' }}></div>
              </div>
              <p className="text-[11px] text-slate-400">
                High commercial viability. Project IRR 23.4% with 3.2 year payback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
