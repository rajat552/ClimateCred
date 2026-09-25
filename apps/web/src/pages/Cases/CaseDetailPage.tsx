import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function CaseDetailPage() {
  const { caseId } = useParams()
  const [activeTab, setActiveTab] = useState<'overview' | 'cvi' | 'gvs' | 'scenario' | 'evidence' | 'copilot' | 'audit'>('overview')
  const [stressHeatwave, setStressHeatwave] = useState(30)
  const [stressFlood, setStressFlood] = useState(15)

  // Dynamic calculations for scenario simulation
  const baseDscr = 1.84
  const stressedDscr = Math.max(0.85, (baseDscr - (stressHeatwave * 0.012) - (stressFlood * 0.015))).toFixed(2)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-md">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Link to="/cases" className="hover:text-slate-200">Loan Cases</Link>
            <span>/</span>
            <span className="font-mono text-brand-400">{caseId || 'case-001'}</span>
            <span>•</span>
            <span className="text-slate-300">Annapurna Agro-Cold Storage</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              ₹35,00,000 — 80kW Solar + PCM Cold-Chain Retrofit
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              STATUS: APPROVED
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Primary Borrower: Annapurna Agro (UDYAM-MH-12-0049281) • Branch: Nagpur Central • Lead Officer: Rohan Sharma
          </p>
        </div>

        <div className="flex items-center gap-2 self-start lg:self-auto">
          <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 flex items-center gap-1.5 cursor-pointer">
            <span className="material-symbols-outlined text-sm">print</span>
            Download CAM Memo
          </button>
          <button className="px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm shadow-brand-600/20 cursor-pointer">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            Sanction Loan
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-800 overflow-x-auto text-xs pb-1">
        {[
          { id: 'overview', label: 'Case Summary', icon: 'dashboard' },
          { id: 'cvi', label: 'CVI Climate Risk (34/100)', icon: 'thermostat' },
          { id: 'gvs', label: 'GVS Green Viability (82/100)', icon: 'eco' },
          { id: 'scenario', label: 'Scenario Simulator', icon: 'tune' },
          { id: 'evidence', label: 'Evidence & Geo-Proof', icon: 'verified' },
          { id: 'copilot', label: 'Officer AI Copilot', icon: 'smart_toy' },
          { id: 'audit', label: 'Audit Trail', icon: 'history' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-t-lg font-medium transition-all ${
              activeTab === t.id
                ? 'bg-slate-900 border-t-2 border-brand-500 text-brand-400 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <span className="material-symbols-outlined text-sm">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h2 className="text-base font-semibold text-white">Underwriting Executive Summary</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                The borrower operates a 24,000 sq.ft agri-cold storage unit in Nagpur rural. Currently subject to rising ambient summer temperatures (up to 45.8°C) causing grid peak tariff surges and diesel generator costs. The ₹35 Lakh capex introduces an 80kW rooftop solar installation paired with thermal phase-change materials, curtailing grid power drawdown by 48% and diesel consumption by 72%.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                  <span className="text-[11px] text-slate-400">Baseline DSCR</span>
                  <div className="text-lg font-bold text-slate-200">1.84x</div>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                  <span className="text-[11px] text-slate-400">Post-Green DSCR</span>
                  <div className="text-lg font-bold text-emerald-400">2.18x</div>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                  <span className="text-[11px] text-slate-400">Project IRR</span>
                  <div className="text-lg font-bold text-brand-400">23.4%</div>
                </div>
              </div>
            </div>

            {/* Financial Twin Matrix */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h3 className="text-sm font-semibold text-white">Cash Flow & Debt Service Matrix</h3>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2">Metric (₹ Lakhs)</th>
                    <th className="py-2">Current</th>
                    <th className="py-2">Year 1</th>
                    <th className="py-2">Year 3</th>
                    <th className="py-2">Year 5</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="py-2 font-medium">Operating Revenue</td>
                    <td className="py-2">420.0</td>
                    <td className="py-2">445.0</td>
                    <td className="py-2">510.0</td>
                    <td className="py-2">580.0</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Power & Fuel Costs</td>
                    <td className="py-2 text-red-400">48.2</td>
                    <td className="py-2 text-emerald-400">29.8 (-38%)</td>
                    <td className="py-2 text-emerald-400">31.2</td>
                    <td className="py-2 text-emerald-400">33.5</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Operating EBITDA</td>
                    <td className="py-2">64.0</td>
                    <td className="py-2">82.4</td>
                    <td className="py-2">101.5</td>
                    <td className="py-2">122.0</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Annual Debt Service</td>
                    <td className="py-2">34.8</td>
                    <td className="py-2">37.8</td>
                    <td className="py-2">37.8</td>
                    <td className="py-2">22.0</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-white">DSCR (Coverage Ratio)</td>
                    <td className="py-2 font-bold text-slate-200">1.84x</td>
                    <td className="py-2 font-bold text-emerald-400">2.18x</td>
                    <td className="py-2 font-bold text-emerald-400">2.68x</td>
                    <td className="py-2 font-bold text-emerald-400">5.54x</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right score panel */}
          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h2 className="text-base font-semibold text-white">Climate & Viability Snapshot</h2>
              
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-300 font-semibold">Climate Vulnerability (CVI)</span>
                  <span className="font-bold text-amber-400">34 / 100</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-amber-400 h-2 rounded-full" style={{ width: '34%' }}></div>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Band: MODERATE PHYSICAL RISK</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-300 font-semibold">Green Viability Score (GVS)</span>
                  <span className="font-bold text-brand-400">82 / 100</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-brand-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Band: HIGH GREEN VIABILITY</span>
              </div>

              <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg text-xs space-y-1">
                <div className="font-semibold text-emerald-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  Interest Concession Applicable
                </div>
                <p className="text-slate-300 text-[11px]">
                  Qualified for 35 bps green subsidy rebate under SIDBI Climate Refinance Window.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CVI Engine */}
      {activeTab === 'cvi' && (
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6 animate-fade-in">
          <div>
            <h2 className="text-base font-semibold text-white">Climate Vulnerability Index (CVI) Decomposition</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Formulated as: CVI = (Hazard × Exposure × Sensitivity) ÷ Adaptive Capacity [ISO 14091:2021]
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-xs">Hazard Score</span>
              <div className="text-xl font-bold text-amber-400 mt-1">42 / 100</div>
              <p className="text-[10px] text-slate-500 mt-1">Heatwaves (ERA5 baseline: 44.2°C summer peak)</p>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-xs">Exposure Score</span>
              <div className="text-xl font-bold text-slate-200 mt-1">38 / 100</div>
              <p className="text-[10px] text-slate-500 mt-1">Roof thermal load & cold room envelope</p>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-xs">Sensitivity Score</span>
              <div className="text-xl font-bold text-slate-200 mt-1">55 / 100</div>
              <p className="text-[10px] text-slate-500 mt-1">High perishable commodity spoil vulnerability</p>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-xs">Adaptive Capacity</span>
              <div className="text-xl font-bold text-brand-400 mt-1">68 / 100</div>
              <p className="text-[10px] text-slate-500 mt-1">Backup generator + planned solar + insurance</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: GVS Engine */}
      {activeTab === 'gvs' && (
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6 animate-fade-in">
          <div>
            <h2 className="text-base font-semibold text-white">Green Viability Score (GVS) Decomposition</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Weighted index of transition metrics: Financial Return (40%) + Carbon Avoidance (30%) + Resilience (20%) + Policy (10%)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-xs">Financial IRR Uplift</span>
              <div className="text-xl font-bold text-brand-400 mt-1">86 / 100</div>
              <p className="text-[10px] text-slate-500 mt-1">23.4% Project IRR vs 10.5% Cost of Capital</p>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-xs">CO2e Mitigation</span>
              <div className="text-xl font-bold text-emerald-400 mt-1">79 / 100</div>
              <p className="text-[10px] text-slate-500 mt-1">82.5 tCO2e avoided per annum</p>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-xs">Climate Resilience</span>
              <div className="text-xl font-bold text-slate-200 mt-1">80 / 100</div>
              <p className="text-[10px] text-slate-500 mt-1">PCM buffers 12 hours grid blackout risk</p>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-xs">Subsidy Alignment</span>
              <div className="text-xl font-bold text-slate-200 mt-1">85 / 100</div>
              <p className="text-[10px] text-slate-500 mt-1">Eligible for PM-KUSUM + State Solar Subsidy</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Scenario Simulator */}
      {activeTab === 'scenario' && (
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6 animate-fade-in">
          <div>
            <h2 className="text-base font-semibold text-white">Dynamic Climate Stress-Test Simulator</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate climate hazard shocks on borrower EBITDA, DSCR, and debt servicing probability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Heatwave Severity Shock</span>
                <span className="text-amber-400 font-bold">+{stressHeatwave}% Above Baseline</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={stressHeatwave}
                onChange={(e) => setStressHeatwave(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <p className="text-[10px] text-slate-500">Increases diesel backup runtime and compressor load.</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Monsoon Flood Shock</span>
                <span className="text-blue-400 font-bold">+{stressFlood}% Precipitation Anomaly</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={stressFlood}
                onChange={(e) => setStressFlood(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
              <p className="text-[10px] text-slate-500">Simulates transit disruption and agri supply spoilage.</p>
            </div>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Stressed DSCR under current shock settings:</span>
              <span className={`text-2xl font-bold ${Number(stressedDscr) >= 1.25 ? 'text-emerald-400' : 'text-red-400'}`}>
                {stressedDscr}x
              </span>
              <span className="text-xs text-slate-400 ml-2">(Baseline was 1.84x • Covenants require &gt;1.20x)</span>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded text-xs font-bold ${
                Number(stressedDscr) >= 1.25 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {Number(stressedDscr) >= 1.25 ? 'COVENANT PASS' : 'COVENANT BREACH'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Copilot */}
      {activeTab === 'copilot' && (
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-brand-400">smart_toy</span>
                Credit Officer AI Underwriting Copilot
              </h2>
              <p className="text-xs text-slate-400">Contextual synthesis of CVI, GVS, and borrower financials</p>
            </div>
            <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Model: Gemini 2.5 Pro (Server-Enforced)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-3 leading-relaxed">
            <p className="font-semibold text-slate-100">Credit Officer Recommendation Memo:</p>
            <p>
              1. <strong>Climate Risk Assessment:</strong> The unit in Nagpur exhibits moderate physical heatwave exposure. The proposed solar + PCM solution directly remedies the highest operational expenditure vulnerability by hedging against diesel power costs.
            </p>
            <p>
              2. <strong>Financial Viability:</strong> Base DSCR improves from 1.84x to 2.18x post-retrofit. Under severe heatwave stress test (+30%), DSCR remains robust at 1.48x, well above the 1.20x institutional covenant threshold.
            </p>
            <p>
              3. <strong>Sanction Condition:</strong> Require quarterly telemetry logs from the solar inverter and mandatory micro-insurance rider covering extreme heat events.
            </p>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Evidence */}
      {activeTab === 'evidence' && (
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4 animate-fade-in">
          <h2 className="text-base font-semibold text-white">Geospatial Evidence & Document Verification</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200">Satellite Rooftop Verification</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-bold">VERIFIED</span>
              </div>
              <p className="text-slate-400 text-[11px]">Sentinel-2 resolution confirmed 2,200 sq.m unshaded rooftop area available for PV arrays.</p>
            </div>
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200">Udyam Registration Certificate</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-bold">VERIFIED</span>
              </div>
              <p className="text-slate-400 text-[11px]">Validated against MSME portal API. Active status, classification: Small Enterprise.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Audit */}
      {activeTab === 'audit' && (
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4 animate-fade-in">
          <h2 className="text-base font-semibold text-white">Immutable Audit Log</h2>
          <div className="space-y-2 text-xs">
            {[
              { time: '2026-09-25 18:30:12', user: 'Rohan Sharma (Officer)', action: 'Approved loan case after CVI/GVS stress-test simulation' },
              { time: '2026-09-25 17:15:00', user: 'Engine Service', action: 'Computed GVS score: 82/100 (Model v1.4.0)' },
              { time: '2026-09-25 17:14:45', user: 'Engine Service', action: 'Computed CVI score: 34/100 (Model v1.2.1)' },
              { time: '2026-09-24 11:20:10', user: 'Rohan Sharma', action: 'Created loan case case-001 for MSME msme-001' },
            ].map((log, i) => (
              <div key={i} className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="font-mono text-slate-500 text-[11px] mr-3">{log.time}</span>
                  <span className="font-semibold text-slate-200 mr-2">{log.user}:</span>
                  <span className="text-slate-300">{log.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
