import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function CaseDetailPage() {
  const { caseId } = useParams()
  const [activeTab, setActiveTab] = useState<'overview' | 'cvi' | 'gvs' | 'scenario' | 'evidence' | 'copilot' | 'audit'>('overview')
  const [stressHeatwave, setStressHeatwave] = useState(25)
  const [stressFlood, setStressFlood] = useState(15)
  const [stressDieselPrice, setStressDieselPrice] = useState(20)
  const [isCamModalOpen, setIsCamModalOpen] = useState(false)
  const [isSanctioned, setIsSanctioned] = useState(false)

  // Dynamic calculations for scenario simulation
  const baseDscr = 1.84
  const postGreenDscr = 2.18
  const stressedDscr = Math.max(
    0.82,
    (postGreenDscr - (stressHeatwave * 0.010) - (stressFlood * 0.012) - (stressDieselPrice * 0.008))
  ).toFixed(2)

  const dscrChartData = {
    labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
    datasets: [
      {
        label: 'Baseline (No Project)',
        data: [1.84, 1.80, 1.78, 1.75, 1.72],
        backgroundColor: 'rgba(148, 163, 184, 0.4)',
        borderColor: '#94A3B8',
        borderWidth: 1,
      },
      {
        label: 'With Solar + PCM Retrofit',
        data: [2.18, 2.35, 2.68, 3.80, 5.54],
        backgroundColor: 'rgba(15, 157, 114, 0.7)',
        borderColor: '#0F9D72',
        borderWidth: 1,
      },
      {
        label: 'Under Active Climate Stress',
        data: [
          Number(stressedDscr),
          Math.max(1.0, Number(stressedDscr) + 0.15),
          Math.max(1.1, Number(stressedDscr) + 0.35),
          Math.max(1.2, Number(stressedDscr) + 0.8),
          Math.max(1.3, Number(stressedDscr) + 1.4),
        ],
        backgroundColor: Number(stressedDscr) >= 1.25 ? 'rgba(59, 130, 246, 0.6)' : 'rgba(239, 68, 68, 0.6)',
        borderColor: Number(stressedDscr) >= 1.25 ? '#3B82F6' : '#EF4444',
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Link to="/cases" className="hover:text-slate-200">Loan Cases</Link>
            <span>/</span>
            <span className="font-mono text-brand-400 font-semibold">{caseId || 'case-001'}</span>
            <span>•</span>
            <span className="text-slate-300">Annapurna Agro-Cold Storage</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              ₹35,00,000 — 80kW Solar PV + PCM Cold-Chain Upgrade
            </h1>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
              isSanctioned ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-brand-500/10 text-brand-400 border-brand-500/20'
            }`}>
              {isSanctioned ? 'SANCTIONED & DISBURSED' : 'STATUS: APPROVED'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Primary Borrower: Annapurna Agro (UDYAM-MH-12-0049281) • Branch: Nagpur Central • Lead Officer: Rohan Sharma
          </p>
        </div>

        <div className="flex items-center gap-2 self-start lg:self-auto">
          <button
            onClick={() => setIsCamModalOpen(true)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">description</span>
            View Credit Appraisal Memo (CAM)
          </button>
          <button
            onClick={() => setIsSanctioned(true)}
            disabled={isSanctioned}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-lg shadow-brand-600/20 transition-all cursor-pointer disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-sm">{isSanctioned ? 'check_circle' : 'verified_user'}</span>
            {isSanctioned ? 'Loan Sanctioned' : 'Execute Sanction'}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-800 overflow-x-auto text-xs pb-1">
        {[
          { id: 'overview', label: 'Executive Appraisal', icon: 'dashboard' },
          { id: 'cvi', label: 'CVI Climate Risk (34/100)', icon: 'thermostat' },
          { id: 'gvs', label: 'GVS Green Viability (82/100)', icon: 'eco' },
          { id: 'scenario', label: 'Dynamic Stress Simulator', icon: 'tune' },
          { id: 'evidence', label: 'Geospatial Proof & Docs', icon: 'verified' },
          { id: 'copilot', label: 'Credit Officer Copilot', icon: 'smart_toy' },
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
                The borrower operates a 24,000 sq.ft agri-cold storage unit in Nagpur rural. Currently subject to rising ambient summer temperatures (&gt;44°C) causing grid peak tariff surges and diesel generator costs. The ₹35 Lakh capex introduces an 80kW rooftop solar installation paired with thermal phase-change materials, curtailing grid power drawdown by 48% and diesel consumption by 72%.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
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
                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                  <span className="text-[11px] text-slate-400">CO2e Mitigation</span>
                  <div className="text-lg font-bold text-emerald-400">82.5 t/yr</div>
                </div>
              </div>
            </div>

            {/* DSCR Trajectory Chart */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">Debt Service Coverage Ratio (DSCR) 5-Year Trajectory</h3>
                  <p className="text-[11px] text-slate-400">Impact of solar capex energy cost savings vs baseline non-intervention</p>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  Covenant Minimum: 1.20x
                </span>
              </div>
              <div className="h-64 w-full">
                <Bar
                  data={dscrChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: 'top', labels: { color: '#94A3B8', font: { size: 10 } } },
                    },
                    scales: {
                      x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#94A3B8', font: { size: 10 } } },
                      y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#94A3B8', font: { size: 10 } }, min: 0, max: 6 },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Scores Panel */}
          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h2 className="text-base font-semibold text-white">Climate & Green Viability Snapshot</h2>
              
              {/* CVI Score Widget */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold">Climate Vulnerability (CVI)</span>
                  <span className="font-bold text-amber-400">34 / 100</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-amber-400 h-2 rounded-full" style={{ width: '34%' }}></div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Band: MODERATE RISK</span>
                  <span>ISO 14091:2021 Model</span>
                </div>
              </div>

              {/* GVS Score Widget */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold">Green Viability Score (GVS)</span>
                  <span className="font-bold text-brand-400">82 / 100</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-brand-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Band: HIGH GREEN VIABILITY</span>
                  <span>Payback: 3.2 Years</span>
                </div>
              </div>

              {/* Subvention Banner */}
              <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg text-xs space-y-1">
                <div className="font-semibold text-emerald-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  35 bps Interest Subvention Applicable
                </div>
                <p className="text-slate-300 text-[11px]">
                  Borrower qualifies for concessional interest rebate under SIDBI Climate Refinance Window (Effective Rate: 8.50%).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CVI Engine Decomposition */}
      {activeTab === 'cvi' && (
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6 animate-fade-in">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">Physical Climate Vulnerability Index (CVI) Decomposition</h2>
              <span className="text-xs px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                CVI: 34 / 100 (MODERATE)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Deterministic formulation: CVI = (Hazard × Exposure × Sensitivity) ÷ (Adaptive Capacity × 100) [ISO 14091:2021 Standard]
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Hazard Driver</span>
                <span className="material-symbols-outlined text-amber-400 text-sm">wb_sunny</span>
              </div>
              <div className="text-xl font-bold text-amber-400 mt-1">42 / 100</div>
              <p className="text-[11px] text-slate-400 mt-1.5">ERA5 summer baseline: 44.2°C peak with 38 days &gt;35°C annually.</p>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Exposure Driver</span>
                <span className="material-symbols-outlined text-blue-400 text-sm">roofing</span>
              </div>
              <div className="text-xl font-bold text-slate-200 mt-1">38 / 100</div>
              <p className="text-[11px] text-slate-400 mt-1.5">Sheet-metal roof envelope without active thermal reflective barrier.</p>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Sensitivity Driver</span>
                <span className="material-symbols-outlined text-purple-400 text-sm">inventory_2</span>
              </div>
              <div className="text-xl font-bold text-slate-200 mt-1">55 / 100</div>
              <p className="text-[11px] text-slate-400 mt-1.5">High perishability commodities (oranges & horticultural produce).</p>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Adaptive Capacity</span>
                <span className="material-symbols-outlined text-emerald-400 text-sm">shield</span>
              </div>
              <div className="text-xl font-bold text-emerald-400 mt-1">68 / 100</div>
              <p className="text-[11px] text-slate-400 mt-1.5">Existing backup DG + proposed 80kW Solar + Phase Change thermal buffer.</p>
            </div>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
            <h3 className="text-xs font-semibold text-slate-200 mb-2">Why This Score? (Explainability Synthesis)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              While the borrower operates in a high-heat zone (Nagpur rural), their planned adoption of thermal PCM storage raises their adaptive capacity from 38 to 68, successfully compressing the net physical vulnerability from High (58) down to Moderate (34).
            </p>
          </div>
        </div>
      )}

      {/* TAB CONTENT: GVS Engine Decomposition */}
      {activeTab === 'gvs' && (
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6 animate-fade-in">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">Green Viability Score (GVS) Decomposition</h2>
              <span className="text-xs px-2.5 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20 font-mono">
                GVS: 82 / 100 (HIGH VIABILITY)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Multi-criteria index: Financial IRR (40%) + Carbon Mitigation (30%) + Grid Resilience (20%) + Policy Subsidies (10%)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-xs">Financial IRR Uplift</span>
              <div className="text-xl font-bold text-brand-400 mt-1">86 / 100</div>
              <p className="text-[11px] text-slate-400 mt-1">23.4% Project IRR vs 10.5% Cost of Capital.</p>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-xs">CO2e Mitigation</span>
              <div className="text-xl font-bold text-emerald-400 mt-1">79 / 100</div>
              <p className="text-[11px] text-slate-400 mt-1">82.5 tCO2e avoided per year (CEA grid factor: 0.82).</p>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-xs">Blackout Resilience</span>
              <div className="text-xl font-bold text-slate-200 mt-1">80 / 100</div>
              <p className="text-[11px] text-slate-400 mt-1">PCM material maintains 4°C for 12 hours during grid cuts.</p>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-xs">Subsidy Alignment</span>
              <div className="text-xl font-bold text-slate-200 mt-1">85 / 100</div>
              <p className="text-[11px] text-slate-400 mt-1">Eligible for PM-KUSUM Component C and 35 bps SIDBI rebate.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Interactive Dynamic Stress Simulator */}
      {activeTab === 'scenario' && (
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6 animate-fade-in">
          <div>
            <h2 className="text-base font-semibold text-white">Dynamic Climate Stress-Test Simulator</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate climate hazard shocks on borrower EBITDA, DSCR, and debt servicing probability in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-slate-950/60 rounded-xl border border-slate-800">
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
                className="w-full accent-amber-500 cursor-pointer"
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
                className="w-full accent-blue-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-500">Simulates transit disruption and agri supply spoilage.</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Diesel / Grid Fuel Tariff Spike</span>
                <span className="text-purple-400 font-bold">+{stressDieselPrice}% Tariff Hike</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={stressDieselPrice}
                onChange={(e) => setStressDieselPrice(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-500">Tests power expenditure hedge effectiveness.</p>
            </div>
          </div>

          <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 block">Stressed DSCR under current active scenario:</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className={`text-3xl font-bold ${Number(stressedDscr) >= 1.25 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stressedDscr}x
                </span>
                <span className="text-xs text-slate-400">(Baseline: 1.84x • Post-Project: 2.18x • Covenant Minimum: 1.20x)</span>
              </div>
            </div>
            <div>
              <span className={`px-4 py-2 rounded-lg text-xs font-bold border inline-flex items-center gap-1.5 ${
                Number(stressedDscr) >= 1.25 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'
              }`}>
                <span className="material-symbols-outlined text-sm">{Number(stressedDscr) >= 1.25 ? 'check_circle' : 'cancel'}</span>
                {Number(stressedDscr) >= 1.25 ? 'COVENANT PASS (BUFFER ADEQUATE)' : 'COVENANT BREACH RISK'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Evidence & Proof */}
      {activeTab === 'evidence' && (
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4 animate-fade-in">
          <h2 className="text-base font-semibold text-white">Geospatial Evidence & Document Proof</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-brand-400 text-sm">satellite_alt</span>
                  Sentinel-2 Rooftop Solar Proof
                </span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-500/20">VERIFIED</span>
              </div>
              <p className="text-slate-400 text-[11px]">10m resolution spectral analysis confirmed 2,200 sq.m unobstructed roof surface facing south-southwest.</p>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-brand-400 text-sm">receipt_long</span>
                  Udyam & Power Bill Audit
                </span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-500/20">VERIFIED</span>
              </div>
              <p className="text-slate-400 text-[11px]">Past 12-month MSEDCL electricity bills verified. Peak connected load: 120 kVA at ₹9.40/kWh tariff.</p>
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
            <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
              Server Enforced • Zero Client Key Exposure
            </span>
          </div>

          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-3 leading-relaxed">
            <p className="font-semibold text-slate-100">Credit Officer Recommendation Memo:</p>
            <p>
              1. <strong>Climate Risk Assessment:</strong> The unit in Nagpur exhibits moderate physical heatwave exposure. The proposed solar + PCM solution directly remedies the highest operational expenditure vulnerability by hedging against diesel power costs.
            </p>
            <p>
              2. <strong>Financial Viability:</strong> Base DSCR improves from 1.84x to 2.18x post-retrofit. Under severe heatwave stress test (+25%), DSCR remains robust at {stressedDscr}x, well above the 1.20x institutional covenant threshold.
            </p>
            <p>
              3. <strong>Sanction Condition:</strong> Require quarterly telemetry logs from the solar inverter and mandatory micro-insurance rider covering extreme heat events.
            </p>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Audit */}
      {activeTab === 'audit' && (
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4 animate-fade-in">
          <h2 className="text-base font-semibold text-white">Immutable Audit Log</h2>
          <div className="space-y-2 text-xs">
            {[
              { time: '2026-09-25 18:30:12', user: 'Rohan Sharma (Credit Officer)', action: 'Approved loan case after CVI/GVS stress-test simulation' },
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

      {/* CAM Memo Modal */}
      {isCamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto text-xs text-slate-300">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Credit Appraisal Memo (CAM) — Climate & Green Viability</h3>
                <span className="text-[11px] text-slate-400 font-mono">Ref: CAM/2026/LN-0891</span>
              </div>
              <button
                onClick={() => setIsCamModalOpen(false)}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 leading-relaxed">
              <div className="font-bold text-white text-sm">Borrower: Annapurna Agro-Cold Storage</div>
              <p>Facility Requested: ₹35,00,000 (Green Capex Retrofit) • Tenor: 60 Months • Sanction Rate: 8.50% (Net of 35 bps subsidy)</p>
              <p>CVI Climate Vulnerability: 34/100 (Moderate) • GVS Green Viability: 82/100 (High) • Stressed DSCR: {stressedDscr}x</p>
              <p>Compliance: Certified under RBI Green Lending Framework and SEBI BRSR Core guidelines.</p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 cursor-pointer font-medium"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                Print PDF
              </button>
              <button
                onClick={() => setIsCamModalOpen(false)}
                className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg cursor-pointer font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
