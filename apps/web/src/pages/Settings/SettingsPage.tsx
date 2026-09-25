import React from 'react'

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">System & Engine Settings</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Configure climate engine parameters, model versions, API integrations, and RBAC policies
        </p>
      </div>

      <div className="space-y-4">
        {/* Engine Versions */}
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-4">
          <h2 className="text-base font-semibold text-white">Active Scoring Engines & Weights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-lg">
              <span className="text-slate-400 font-mono">CVI Engine (Physical Hazard)</span>
              <div className="text-sm font-bold text-white mt-1">v1.2.1 (ERA5 + IMD Ensemble)</div>
              <p className="text-[11px] text-slate-500 mt-1">Hazard: 35%, Exposure: 30%, Sensitivity: 20%, Capacity: 15%</p>
            </div>
            <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-lg">
              <span className="text-slate-400 font-mono">GVS Engine (Green Viability)</span>
              <div className="text-sm font-bold text-white mt-1">v1.4.0 (GHG Protocol + CEA Grid)</div>
              <p className="text-[11px] text-slate-500 mt-1">IRR: 40%, CO2e: 30%, Resilience: 20%, Policy: 10%</p>
            </div>
          </div>
        </div>

        {/* Security & Server-side AI */}
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-4">
          <h2 className="text-base font-semibold text-white">Security & Regulatory Compliance</h2>
          <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg text-xs text-emerald-400">
            ✓ Zero-Knowledge Client: AI Copilot and Climate API keys are strictly retained on private backend instances.
          </div>
          <p className="text-xs text-slate-400">
            Role-Based Access Control is enforced with JWT tokens signed with RS256 algorithms. Audit trail captures all credit memo modifications.
          </p>
        </div>
      </div>
    </div>
  )
}
