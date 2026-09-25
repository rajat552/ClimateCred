import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

interface LoanCaseItem {
  id: string
  msmeName: string
  loanType: string
  amount: string
  rawAmount: number
  tenor: string
  cvi: number
  cviBand: string
  gvs: number
  gvsBand: string
  status: string
  officer: string
  date: string
}

const INITIAL_CASES: LoanCaseItem[] = [
  {
    id: 'case-001',
    msmeName: 'Annapurna Agro-Cold Storage',
    loanType: '80kW Rooftop Solar + PCM Retrofit',
    amount: '₹35,00,000',
    rawAmount: 3500000,
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
    loanType: 'Briquetting & Pelleting Electrification',
    amount: '₹75,00,000',
    rawAmount: 7500000,
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
    loanType: 'Aerator & Solar Hybrid Transition',
    amount: '₹22,00,000',
    rawAmount: 2200000,
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
    loanType: 'Micro-Irrigation Solar Pump Grid',
    amount: '₹18,50,000',
    rawAmount: 1850000,
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

export default function CasesPage() {
  const navigate = useNavigate()
  const { currentUser } = useAuthStore()
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [cases, setCases] = useState<LoanCaseItem[]>(INITIAL_CASES)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdCaseId, setCreatedCaseId] = useState<string | null>(null)

  // Form State
  const [formData, setFormData] = useState({
    msmeName: '',
    sector: 'Agri-Processing & Cold Chain',
    loanAmount: '4500000',
    tenorMonths: '60',
    purpose: '100kW Rooftop Solar PV & Waste Heat Recovery',
    baselineDscr: '1.80',
    udyamNumber: 'UDYAM-MH-14-0089201',
    city: 'Nagpur',
  })

  // Fetch live cases from API if available
  useEffect(() => {
    fetch('http://localhost:3001/api/v1/cases')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data && json.data.length > 0) {
          const mapped = json.data.map((c: any) => ({
            id: c.id,
            msmeName: c.msmeName,
            loanType: c.purpose,
            amount: `₹${(c.loanAmount / 100000).toLocaleString('en-IN', { maximumFractionDigits: 1 })} Lakhs`,
            rawAmount: c.loanAmount,
            tenor: `${c.tenorMonths} Months`,
            cvi: c.cviScore,
            cviBand: c.cviBand,
            gvs: c.gvsScore,
            gvsBand: c.gvsBand,
            status: c.status,
            officer: c.officer || 'Rohan Sharma',
            date: c.date,
          }))
          setCases(mapped)
        }
      })
      .catch(() => {})
  }, [])

  // Auto-calculated preliminary scores based on inputs
  const estimatedCvi = Math.min(85, Math.max(20, Math.round(38 - (Number(formData.baselineDscr) - 1.5) * 15)))
  const estimatedGvs = Math.min(95, Math.max(45, Math.round(78 + (Number(formData.loanAmount) > 3000000 ? 6 : 2))))
  const isEligibleForSubvention = estimatedGvs >= 75

  const handleCreateCase = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.msmeName.trim()) return

    setIsSubmitting(true)
    try {
      const payload = {
        msmeName: formData.msmeName,
        loanAmount: Number(formData.loanAmount),
        tenorMonths: Number(formData.tenorMonths),
        purpose: formData.purpose,
        sector: formData.sector,
        cviScore: estimatedCvi,
        gvsScore: estimatedGvs,
        baselineDscr: Number(formData.baselineDscr),
        officer: currentUser.name,
      }

      const response = await fetch('http://localhost:3001/api/v1/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const json = await response.json()
      const newId = json?.data?.id || `case-00${cases.length + 1}`

      const createdItem: LoanCaseItem = {
        id: newId,
        msmeName: formData.msmeName,
        loanType: formData.purpose,
        amount: `₹${(Number(formData.loanAmount) / 100000).toFixed(1)} Lakhs`,
        rawAmount: Number(formData.loanAmount),
        tenor: `${formData.tenorMonths} Months`,
        cvi: estimatedCvi,
        cviBand: estimatedCvi <= 30 ? 'LOW' : estimatedCvi <= 60 ? 'MODERATE' : 'HIGH',
        gvs: estimatedGvs,
        gvsBand: estimatedGvs >= 85 ? 'EXEMPLARY' : 'HIGH',
        status: 'UNDER_REVIEW',
        officer: currentUser.name,
        date: new Date().toISOString().split('T')[0] || '2026-09-25',
      }

      setCases([createdItem, ...cases])
      setCreatedCaseId(newId)
    } catch (err) {
      console.error('Failed to create case:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetModal = () => {
    setIsCreateModalOpen(false)
    setCreatedCaseId(null)
    setFormData({
      msmeName: '',
      sector: 'Agri-Processing & Cold Chain',
      loanAmount: '4500000',
      tenorMonths: '60',
      purpose: '100kW Rooftop Solar PV & Waste Heat Recovery',
      baselineDscr: '1.80',
      udyamNumber: 'UDYAM-MH-14-0089201',
      city: 'Nagpur',
    })
  }

  const filtered = cases.filter((c) => filterStatus === 'ALL' || c.status === filterStatus)

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Loan Underwriting</span>
            <span>/</span>
            <span className="text-brand-400 font-semibold">Active Pipeline</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Loan Underwriting Queue
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Credit and green viability underwriting workflow & appraisal engine
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-brand-600 via-brand-500 to-emerald-600 hover:from-brand-500 hover:to-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-brand-600/30 flex items-center gap-2 transition-all cursor-pointer self-start sm:self-auto"
        >
          <span className="material-symbols-rounded text-base">add_circle</span>
          Create New Loan Case
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto text-xs">
        {['ALL', 'UNDER_REVIEW', 'APPROVED', 'STRESS_TEST_REQUIRED', 'REJECTED'].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              filterStatus === s
                ? 'bg-brand-500/15 border border-brand-500/40 text-brand-400 shadow-sm shadow-brand-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {s.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Cases Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Case ID & MSME</th>
                <th className="py-3.5 px-4">Loan Facility & Purpose</th>
                <th className="py-3.5 px-4">Amount & Tenor</th>
                <th className="py-3.5 px-4 text-center">CVI Score</th>
                <th className="py-3.5 px-4 text-center">GVS Score</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Officer</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-[10px] text-brand-400 font-semibold block">{c.id}</span>
                    <span className="font-bold text-white text-xs">{c.msmeName}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-200 max-w-xs truncate">{c.loanType}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{c.amount}</div>
                    <div className="text-[10px] text-slate-400">{c.tenor}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      c.cvi <= 30 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      c.cvi <= 60 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {c.cvi}/100
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                      {c.gvs}/100
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
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
                      className="px-3 py-1.5 bg-brand-600/15 hover:bg-brand-600/30 text-brand-400 font-semibold rounded-lg border border-brand-500/30 transition-all text-xs inline-flex items-center gap-1 shadow-sm"
                    >
                      Underwrite
                      <span className="material-symbols-rounded text-xs">arrow_forward</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE NEW LOAN CASE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5 max-h-[92vh] overflow-y-auto text-slate-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-rounded text-brand-400">add_circle</span>
                  Create & Onboard New Green Loan Case
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Submit MSME borrower financial twin and green project parameters for deterministic underwriting.
                </p>
              </div>
              <button
                onClick={handleResetModal}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
              >
                <span className="material-symbols-rounded text-base">close</span>
              </button>
            </div>

            {/* Success State Screen */}
            {createdCaseId ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Loan Case Successfully Created!</h4>
                  <p className="text-xs text-emerald-300/90 mt-1">
                    Case ID <strong className="font-mono text-white">{createdCaseId}</strong> has been registered in the underwriting queue with preliminary CVI {estimatedCvi}/100 and GVS {estimatedGvs}/100.
                  </p>
                </div>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={handleResetModal}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Close & View Queue
                  </button>
                  <button
                    onClick={() => {
                      handleResetModal()
                      navigate(`/cases/${createdCaseId}`)
                    }}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-600/30 flex items-center gap-1.5 cursor-pointer"
                  >
                    Open Underwriting Workbench
                    <span className="material-symbols-rounded text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Creation Form */
              <form onSubmit={handleCreateCase} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* MSME Name */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Borrower / Enterprise Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sahyadri Bio-Fuels & Solar Park"
                      value={formData.msmeName}
                      onChange={(e) => setFormData({ ...formData, msmeName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-xs"
                    />
                  </div>

                  {/* Industry Sector */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Industry Sector</label>
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-xs"
                    >
                      <option>Agri-Processing & Cold Chain</option>
                      <option>Bioenergy & Pelleting</option>
                      <option>Textile & Apparel Dyeing</option>
                      <option>Solar Hybrid Aquaculture</option>
                      <option>Precision Micro-Irrigation</option>
                      <option>Auto-Component Engineering</option>
                    </select>
                  </div>

                  {/* Loan Amount */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Requested Loan Amount (₹ INR) *</label>
                    <input
                      type="number"
                      required
                      step="50000"
                      value={formData.loanAmount}
                      onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-xs font-mono"
                    />
                    <span className="text-[10px] text-slate-400">
                      Amount in Lakhs: ₹{(Number(formData.loanAmount) / 100000).toFixed(1)} Lakhs
                    </span>
                  </div>

                  {/* Repayment Tenor */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Repayment Tenor (Months)</label>
                    <select
                      value={formData.tenorMonths}
                      onChange={(e) => setFormData({ ...formData, tenorMonths: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-xs"
                    >
                      <option value="36">36 Months (3 Years)</option>
                      <option value="48">48 Months (4 Years)</option>
                      <option value="60">60 Months (5 Years)</option>
                      <option value="84">84 Months (7 Years)</option>
                    </select>
                  </div>

                  {/* Facility Purpose */}
                  <div className="sm:col-span-2 space-y-1">
                    <label className="font-semibold text-slate-300">Green Project Capex Purpose *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 100kW Rooftop Solar PV + Heat Recovery Boiler Upgrade"
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-xs"
                    />
                  </div>

                  {/* Baseline DSCR */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Baseline Operating DSCR</label>
                    <input
                      type="number"
                      step="0.05"
                      value={formData.baselineDscr}
                      onChange={(e) => setFormData({ ...formData, baselineDscr: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-xs font-mono"
                    />
                  </div>

                  {/* Udyam Number */}
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Udyam Registration</label>
                    <input
                      type="text"
                      value={formData.udyamNumber}
                      onChange={(e) => setFormData({ ...formData, udyamNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Real-time Deterministic Auto-Score Preview */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5 text-xs">
                  <span className="font-semibold text-slate-300 flex items-center justify-between">
                    <span>Deterministic Underwriting Preview (ISO 14091 + RBI Taxonomy):</span>
                    <span className="text-[10px] font-mono text-brand-400">Pre-Calculation Engine</span>
                  </span>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Estimated CVI</span>
                      <span className="text-base font-bold text-emerald-400">{estimatedCvi}/100</span>
                      <span className="text-[9px] text-slate-400 block">Moderate Physical Risk</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Estimated GVS</span>
                      <span className="text-base font-bold text-brand-400">{estimatedGvs}/100</span>
                      <span className="text-[9px] text-slate-400 block">Tier-1 Bankable</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Green Pricing Rebate</span>
                      <span className="text-base font-bold text-emerald-400">{isEligibleForSubvention ? '-35 bps' : 'Standard'}</span>
                      <span className="text-[9px] text-slate-400 block">{isEligibleForSubvention ? 'SIDBI Subvention' : 'Standard Rate'}</span>
                    </div>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleResetModal}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.msmeName.trim()}
                    className="px-5 py-2.5 bg-gradient-to-r from-brand-600 via-brand-500 to-emerald-600 hover:from-brand-500 hover:to-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-600/30 flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <span className="material-symbols-rounded text-sm">check</span>
                        <span>Submit Loan Case</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
