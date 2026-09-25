import React from 'react'

export default function ModelsPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Model Intelligence</span>
            <span>/</span>
            <span className="text-brand-400 font-semibold">Model Governance & Registry</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            ClimateTwin Deterministic Scoring Engine Registry
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Transparent, auditable, and non-black-box algorithms for institutional credit risk & green taxonomies.
          </p>
        </div>
        <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold self-start sm:self-auto">
          RBI & ISO 14091 Validated
        </span>
      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CVI Engine */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="text-xs text-brand-400 font-mono">Engine ID: CVI-CORE-v1.2.1</div>
              <h2 className="text-lg font-bold text-white mt-0.5">Climate Vulnerability Index (CVI)</h2>
            </div>
            <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700">
              Deterministic
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Quantifies the physical climate risk of an MSME enterprise by synthesizing hazard exposure, asset sensitivity, and adaptive capex mitigation.
          </p>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-[11px] text-slate-400 font-mono block">Mathematical Specification:</span>
            <code className="text-xs text-emerald-400 font-mono block bg-slate-900 p-2.5 rounded border border-slate-800">
              CVI = (Hazard × Exposure × Sensitivity) / max(AdaptiveCapacity × 100, 1.0)
            </code>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">Data Sources:</span>
              <span className="font-semibold text-slate-200">ECMWF ERA5, IMD High-Res Gridded, ISRO Bhuvan</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">Calibration Standard:</span>
              <span className="font-semibold text-slate-200">ISO 14091:2021 Climate Hazard Adaptation</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-slate-400">Score Range & Risk Appetite:</span>
              <span className="font-bold text-emerald-400">0 - 100 (CVI &lt; 45 Approved for Standard Facility)</span>
            </div>
          </div>
        </div>

        {/* GVS Engine */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="text-xs text-brand-400 font-mono">Engine ID: GVS-FIN-v1.4.0</div>
              <h2 className="text-lg font-bold text-white mt-0.5">Green Viability Score (GVS)</h2>
            </div>
            <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700">
              Deterministic
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Evaluates the financial and environmental bankability of green transition capex projects (solar PV, heat pumps, biomass boilers, cold storage retrofits).
          </p>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-[11px] text-slate-400 font-mono block">Multi-Factor Weighting Formula:</span>
            <code className="text-xs text-brand-400 font-mono block bg-slate-900 p-2.5 rounded border border-slate-800">
              GVS = 0.35·Taxonomy + 0.25·CarbonAvoidance + 0.20·Payback + 0.20·ViabilitySpread
            </code>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">Taxonomy Framework:</span>
              <span className="font-semibold text-slate-200">RBI Green Lending Framework & SEBI BRSR Core</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">Pricing Concession Subvention:</span>
              <span className="font-semibold text-emerald-400">GVS &ge; 75 qualifies for -35 to -50 bps rebate</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-slate-400">Financial Twin Validation:</span>
              <span className="font-bold text-white">Project IRR vs WACC Hurdle Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Officer AI Copilot Specs */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <div className="text-xs text-brand-400 font-mono">Engine ID: COPILOT-LLM-v2.5</div>
            <h2 className="text-lg font-bold text-white mt-0.5">Credit Officer AI Copilot Architecture</h2>
          </div>
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
            Google Gemini 2.5 Flash
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span className="material-symbols-outlined text-brand-400 text-sm">security</span>
              Server-Side Isolation
            </span>
            <p className="text-slate-400 text-[11px]">
              No API keys or sensitive borrower personally identifiable information (PII) are ever exposed to the client browser.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span className="material-symbols-outlined text-blue-400 text-sm">fact_check</span>
              Deterministic Guardrails
            </span>
            <p className="text-slate-400 text-[11px]">
              The LLM does NOT compute CVI or GVS scores; it strictly synthesizes rationale memos based on deterministic engine outputs.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span className="material-symbols-outlined text-purple-400 text-sm">history_edu</span>
              Audit Trail Integration
            </span>
            <p className="text-slate-400 text-[11px]">
              Every generated synthesis and officer approval is committed to the SHA-256 cryptographic audit ledger.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
