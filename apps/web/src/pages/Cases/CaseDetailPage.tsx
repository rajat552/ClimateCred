import React, { useState, useEffect } from 'react'
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

interface ClimateLiveTelemetry {
  location: {
    city: string
    latitude: number
    longitude: number
    country: string
  }
  telemetry: {
    temperature_c: number
    feels_like_c: number
    humidity_pct: number
    wind_speed_kmh: number
    conditions: string
    solar_irradiance_kwh_m2_day: number
  }
  hazardIndicators: {
    heatwave_risk: string
    flood_vulnerability: string
    cyclone_wind_vulnerability: string
    drought_spei: number
    composite_hazard_index: number
  }
  metadata: {
    dataSource: string
    timestamp: string
    compliance: string
  }
}

export default function CaseDetailPage() {
  const { caseId } = useParams()
  const [activeTab, setActiveTab] = useState<'overview' | 'cvi' | 'gvs' | 'scenario' | 'evidence' | 'copilot' | 'audit'>('overview')
  const [stressHeatwave, setStressHeatwave] = useState(25)
  const [stressFlood, setStressFlood] = useState(15)
  const [stressDieselPrice, setStressDieselPrice] = useState(20)
  const [isCamModalOpen, setIsCamModalOpen] = useState(false)
  const [isSanctioned, setIsSanctioned] = useState(false)
  const [auditLogs, setAuditLogs] = useState([
    { time: '2026-09-25 18:30:12', user: 'Rohan Sharma (Credit Officer)', action: 'Reviewed preliminary CVI/GVS alignment' },
    { time: '2026-09-25 17:15:00', user: 'Engine Service', action: 'Computed GVS score: 82/100 (Model v1.4.0)' },
    { time: '2026-09-25 17:14:45', user: 'Engine Service', action: 'Computed CVI score: 34/100 (Model v1.2.1)' },
    { time: '2026-09-24 11:20:10', user: 'Rohan Sharma', action: 'Created loan case case-001 for MSME msme-001' },
  ])

  // Live Climate Telemetry state
  const [climateData, setClimateData] = useState<ClimateLiveTelemetry | null>(null)
  const [isClimateLoading, setIsClimateLoading] = useState(true)

  // AI Copilot state
  const [copilotLoading, setCopilotLoading] = useState(false)
  const [copilotSynthesis, setCopilotSynthesis] = useState<string | null>(null)
  const [copilotEngine, setCopilotEngine] = useState<string>('Ready for Analysis')
  const [copilotQuery, setCopilotQuery] = useState('')
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'officer' | 'copilot'; text: string }>>([])
  const [chatLoading, setChatLoading] = useState(false)

  // Fetch Live Weather & Climate Hazard on Mount
  useEffect(() => {
    fetch('http://localhost:3001/api/v1/climate/live?lat=21.1458&lon=79.0882&city=Nagpur')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setClimateData(json.data)
        }
      })
      .catch((err) => console.warn('Failed to load live climate data:', err))
      .finally(() => setIsClimateLoading(false))
  }, [])

  // Dynamic calculations for scenario simulation
  const postGreenDscr = 2.18
  const stressedDscr = Math.max(
    0.82,
    postGreenDscr - (stressHeatwave * 0.010) - (stressFlood * 0.012) - (stressDieselPrice * 0.008)
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

  // Trigger Gemini Copilot Live Memo
  const generateLiveCopilotMemo = async () => {
    setCopilotLoading(true)
    try {
      const response = await fetch('http://localhost:3001/api/v1/copilot/memo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseId: caseId || 'case-001',
          msmeName: 'Annapurna Agro-Cold Storage',
          sector: 'Cold Chain / Agri-Logistics',
          loanAmount: 3500000,
          purpose: '80kW Rooftop Solar PV & PCM Phase Change Material Retrofit',
          cviScore: 34,
          gvsScore: 82,
          baselineDscr: 1.84,
          stressedDscr: Number(stressedDscr),
          projectIrr: 23.4,
          greenTaxonomyScore: 92,
          stressScenario: `+${stressHeatwave}% Heatwave, +${stressFlood}% Flood, +${stressDieselPrice}% Diesel shock`,
        }),
      })
      const result = await response.json()
      if (result.success && result.data) {
        setCopilotSynthesis(result.data.aiSynthesis)
        setCopilotEngine(result.data.metadata?.copilotEngine || 'Google Gemini 1.5 Flash')
      }
    } catch (err) {
      console.error('Copilot memo error:', err)
    } finally {
      setCopilotLoading(false)
    }
  }

  // Ask Copilot Chat
  const handleSendQuery = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!copilotQuery.trim()) return

    const query = copilotQuery
    setCopilotQuery('')
    setChatMessages((prev) => [...prev, { sender: 'officer', text: query }])
    setChatLoading(true)

    try {
      const response = await fetch('http://localhost:3001/api/v1/copilot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          caseContext: {
            msme: 'Annapurna Agro-Cold Storage',
            facility: '₹35 Lakhs Green Capex (Solar + PCM)',
            cvi: 34,
            gvs: 82,
            stressedDscr: Number(stressedDscr),
            liveTemp: climateData?.telemetry.temperature_c,
            heatwaveRisk: climateData?.hazardIndicators.heatwave_risk,
          },
        }),
      })
      const result = await response.json()
      if (result.success && result.data) {
        setChatMessages((prev) => [
          ...prev,
          { sender: 'copilot', text: result.data.reply },
        ])
      }
    } catch (err) {
      console.error('Chat error:', err)
    } finally {
      setChatLoading(false)
    }
  }

  const handleExecuteSanction = () => {
    setIsSanctioned(true)
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19)
    setAuditLogs((prev) => [
      {
        time: now,
        user: 'Rohan Sharma (Credit Officer)',
        action: `Sanction executed with 35 bps green pricing concession. Stressed DSCR ${stressedDscr}x logged to immutable audit ledger.`,
      },
      ...prev,
    ])
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
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
              {isSanctioned ? 'SANCTIONED & DISBURSED' : 'STATUS: APPROVED FOR SANCTION'}
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
            onClick={handleExecuteSanction}
            disabled={isSanctioned}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-lg shadow-brand-600/20 transition-all cursor-pointer disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-sm">{isSanctioned ? 'check_circle' : 'verified_user'}</span>
            {isSanctioned ? 'Loan Sanctioned' : 'Execute Green Sanction'}
          </button>
        </div>
      </div>

      {/* Live Physical Climate Telemetry Bar */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-slate-200">Live Geo-Hazard Telemetry:</span>
          <span className="text-slate-400">Nagpur Facility (21.14°N, 79.08°E)</span>
        </div>
        {isClimateLoading ? (
          <span className="text-slate-400">Connecting to OpenWeather & ERA5 station feeds...</span>
        ) : climateData ? (
          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-amber-400 text-sm">thermostat</span>
              <span><strong>{climateData.telemetry.temperature_c}°C</strong> ({climateData.telemetry.conditions})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-blue-400 text-sm">humidity_mid</span>
              <span><strong>{climateData.telemetry.humidity_pct}%</strong> Humidity</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-teal-400 text-sm">air</span>
              <span><strong>{climateData.telemetry.wind_speed_kmh} km/h</strong> Wind</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20 font-mono text-[11px]">
              {climateData.metadata.dataSource}
            </span>
          </div>
        ) : null}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-800 overflow-x-auto text-xs pb-1">
        {[
          { id: 'overview', label: 'Executive Synthesis', icon: 'dashboard' },
          { id: 'cvi', label: 'Climate Vulnerability (CVI)', icon: 'warning' },
          { id: 'gvs', label: 'Green Viability (GVS)', icon: 'eco' },
          { id: 'scenario', label: 'Stress-Test Simulator', icon: 'tune' },
          { id: 'evidence', label: 'Geospatial Proof & Evidence', icon: 'satellite_alt' },
          { id: 'copilot', label: 'Officer AI Copilot', icon: 'smart_toy' },
          { id: 'audit', label: 'Audit Trail', icon: 'history' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-lg font-medium flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-brand-600/15 text-brand-400 border border-brand-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <span className="material-symbols-outlined text-sm">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-xs font-medium">Climate Vulnerability Index</span>
              <div className="text-2xl font-bold text-emerald-400 flex items-baseline gap-2">
                34 <span className="text-xs text-slate-400 font-normal">/ 100 (Moderate Risk)</span>
              </div>
              <p className="text-[11px] text-slate-400">Regional benchmark: 52/100 (Top 15% safety quartile)</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-xs font-medium">Green Viability Score</span>
              <div className="text-2xl font-bold text-brand-400 flex items-baseline gap-2">
                82 <span className="text-xs text-slate-400 font-normal">/ 100 (Tier-1 Bankable)</span>
              </div>
              <p className="text-[11px] text-slate-400">Qualifies for -35 bps RBI green refinance subvention</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-xs font-medium">Stressed DSCR</span>
              <div className="text-2xl font-bold text-blue-400 flex items-baseline gap-2">
                {stressedDscr}x <span className="text-xs text-slate-400 font-normal">(Covenant: &gt;1.20x)</span>
              </div>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified</span>
                Adequate Debt Service Cushion
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-xs font-medium">Avoided Carbon & Payback</span>
              <div className="text-2xl font-bold text-white flex items-baseline gap-2">
                74.2 <span className="text-xs text-slate-400 font-normal">tCO₂e/yr (3.4 yr Payback)</span>
              </div>
              <p className="text-[11px] text-slate-400">Project IRR: 23.4% • 100% Tax Depreciation Eligible</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">5-Year DSCR Trajectory Under Stress</h3>
                  <p className="text-xs text-slate-400">Comparison of Baseline, Green Project, and Active Scenario</p>
                </div>
                <Link to="#" onClick={() => setActiveTab('scenario')} className="text-xs text-brand-400 hover:underline">
                  Adjust Scenario &rarr;
                </Link>
              </div>
              <div className="h-64">
                <Bar
                  data={dscrChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        grid: { color: 'rgba(51, 65, 85, 0.4)' },
                        ticks: { color: '#94A3B8' },
                      },
                      x: {
                        grid: { color: 'rgba(51, 65, 85, 0.2)' },
                        ticks: { color: '#94A3B8' },
                      },
                    },
                    plugins: {
                      legend: { labels: { color: '#CBD5E1', boxWidth: 12 } },
                    },
                  }}
                />
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-sm font-semibold text-white">Credit Appraisal Decision Summary</h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  <div className="font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    Sanction Recommended
                  </div>
                  <p className="text-[11px] text-emerald-200/80 mt-1">
                    Solar + PCM retrofit reduces grid tariff vulnerability and protects cold-storage operations from Nagpur extreme heat events.
                  </p>
                </div>

                <div className="space-y-2 text-slate-300">
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Proposed Loan:</span>
                    <span className="font-mono font-semibold text-white">₹35,00,000</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Sanction Interest Rate:</span>
                    <span className="font-mono font-semibold text-emerald-400">8.65% (-35 bps rebate)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Repayment Tenor:</span>
                    <span className="font-semibold text-white">60 Months (6 mo moratorium)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Primary Collateral:</span>
                    <span className="font-semibold text-white">Hypothecation of Solar Asset + Plant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CVI */}
      {activeTab === 'cvi' && (
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6 animate-fade-in">
          <div>
            <h2 className="text-base font-semibold text-white">Climate Vulnerability Index (CVI) Decomposition</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Deterministic ISO 14091 / IPCC AR6 physical hazard and exposure modeling for Nagpur facility.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block">1. Physical Hazard (H)</span>
              <div className="text-xl font-bold text-amber-400 mt-1">48 / 100</div>
              <p className="text-[11px] text-slate-400 mt-1">42.5 days &gt; 35°C heatwaves per annum in Nagpur district.</p>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block">2. Asset Exposure (E)</span>
              <div className="text-xl font-bold text-blue-400 mt-1">36 / 100</div>
              <p className="text-[11px] text-slate-400 mt-1">24,000 sq.ft cold warehouse with insulated roof.</p>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block">3. Sensitivity (S)</span>
              <div className="text-xl font-bold text-purple-400 mt-1">54 / 100</div>
              <p className="text-[11px] text-slate-400 mt-1">Perishable horticulture crop spoilage if chillers lose power.</p>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block">4. Adaptive Capacity (AC)</span>
              <div className="text-xl font-bold text-emerald-400 mt-1">72 / 100</div>
              <p className="text-[11px] text-slate-400 mt-1">Proposed 80kW Solar + PCM unit drastically boosts adaptation.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: GVS */}
      {activeTab === 'gvs' && (
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6 animate-fade-in">
          <div>
            <h2 className="text-base font-semibold text-white">Green Viability Score (GVS) Breakdown</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Deterministic transition economics and RBI Green Lending Framework alignment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block">Green Taxonomy Alignment</span>
              <div className="text-xl font-bold text-brand-400 mt-1">92%</div>
              <p className="text-[11px] text-slate-400 mt-1">100% compliant with RBI taxonomy for Renewable & Storage capex.</p>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block">Avoided Carbon Intensity</span>
              <div className="text-xl font-bold text-emerald-400 mt-1">74.2 tCO₂e/yr</div>
              <p className="text-[11px] text-slate-400 mt-1">Replaces 120,000 kWh of coal-heavy MSEDCL grid electricity.</p>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block">Payback Period</span>
              <div className="text-xl font-bold text-white mt-1">3.4 Years</div>
              <p className="text-[11px] text-slate-400 mt-1">Rapid capex amortization via ₹10.2 Lakhs annual power savings.</p>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400 block">Viability Spread</span>
              <div className="text-xl font-bold text-blue-400 mt-1">+14.75%</div>
              <p className="text-[11px] text-slate-400 mt-1">Project IRR (23.4%) exceeds WACC (8.65%) by large margin.</p>
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
              <p className="text-[10px] text-slate-500">Increases diesel backup runtime and compressor cooling load.</p>
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
                <span className="text-xs text-slate-400">(Baseline: 1.84x • Post-Project: 2.18x • Covenant Floor: 1.20x)</span>
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

      {/* TAB CONTENT: Evidence */}
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
              <div className="font-mono text-[10px] text-slate-500">SHA-256: 8f4a1c9e2b7d301...99e2</div>
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
              <div className="font-mono text-[10px] text-slate-500">SHA-256: e3b0c44298fc1c1...82b4</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Copilot (Live Gemini Server-Side Execution) */}
      {activeTab === 'copilot' && (
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-brand-400">smart_toy</span>
                Credit Officer AI Underwriting Copilot
              </h2>
              <p className="text-xs text-slate-400">Contextual synthesis of CVI, GVS, and borrower financials powered by Gemini</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                Engine: {copilotEngine}
              </span>
              <button
                onClick={generateLiveCopilotMemo}
                disabled={copilotLoading}
                className="px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-60 shadow-sm shadow-brand-600/20"
              >
                <span className="material-symbols-outlined text-sm">{copilotLoading ? 'sync' : 'auto_awesome'}</span>
                {copilotLoading ? 'Synthesizing...' : 'Generate CAM Memo'}
              </button>
            </div>
          </div>

          {/* Copilot Memo Area */}
          <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-3 leading-relaxed whitespace-pre-line">
            <div className="font-bold text-slate-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-brand-400 text-sm">assignment</span>
              Credit Officer Recommendation Memo:
            </div>
            {copilotSynthesis ? (
              <div className="text-slate-200">{copilotSynthesis}</div>
            ) : (
              <div className="text-slate-400 space-y-2">
                <p>1. <strong>Climate Risk Assessment:</strong> The unit in Nagpur exhibits moderate physical heatwave exposure (CVI 34/100). The proposed solar + PCM solution directly hedges against peak summer diesel expenses.</p>
                <p>2. <strong>Financial Viability:</strong> Base DSCR improves from 1.84x to 2.18x post-retrofit. Under severe heatwave stress test (+{stressHeatwave}%), DSCR remains robust at {stressedDscr}x, exceeding the 1.20x institutional covenant threshold.</p>
                <p>3. <strong>Sanction Condition:</strong> Recommended for sanction with a 35 bps green interest rate rebate under RBI Green Lending Guidelines.</p>
              </div>
            )}
          </div>

          {/* Interactive Chat with Copilot */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-semibold text-slate-200">Ask the Underwriting Copilot:</h3>
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg text-xs ${
                    msg.sender === 'officer'
                      ? 'bg-slate-800/80 text-white ml-8'
                      : 'bg-brand-950/40 border border-brand-500/20 text-slate-200 mr-8'
                  }`}
                >
                  <span className="font-semibold block text-[10px] text-slate-400 mb-1">
                    {msg.sender === 'officer' ? 'You (Credit Officer)' : 'ClimateTwin AI Copilot'}
                  </span>
                  {msg.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendQuery} className="flex gap-2">
              <input
                type="text"
                value={copilotQuery}
                onChange={(e) => setCopilotQuery(e.target.value)}
                placeholder="e.g. How does +30% heat shock impact the borrower's debt service capacity?"
                className="flex-1 px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
              />
              <button
                type="submit"
                disabled={chatLoading || !copilotQuery.trim()}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-sm">{chatLoading ? 'sync' : 'send'}</span>
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Audit */}
      {activeTab === 'audit' && (
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4 animate-fade-in">
          <h2 className="text-base font-semibold text-white">Immutable Underwriting Audit Ledger</h2>
          <div className="space-y-2 text-xs">
            {auditLogs.map((log, i) => (
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
                <span className="text-[11px] text-slate-400 font-mono">Ref: CAM/2026/LN-0891 • Annapurna Agro-Cold Storage</span>
              </div>
              <button
                onClick={() => setIsCamModalOpen(false)}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 leading-relaxed">
              <div className="font-bold text-white text-sm">Borrower: Annapurna Agro-Cold Storage (UDYAM-MH-12-0049281)</div>
              <p>Facility Requested: ₹35,00,000 (80kW Solar PV + PCM Retrofit) • Tenor: 60 Months • Sanction Rate: 8.65% (Net of 35 bps green subvention)</p>
              <p>CVI Climate Vulnerability: 34/100 (Moderate) • GVS Green Viability: 82/100 (Tier-1 Bankable) • Stressed DSCR: {stressedDscr}x</p>
              <p>Regulatory Compliance: Certified under RBI Green Lending Framework and SEBI BRSR Core guidelines.</p>
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
