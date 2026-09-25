import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
const INITIAL_CASES = [
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
];
export default function CasesPage() {
    const navigate = useNavigate();
    const { currentUser } = useAuthStore();
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [cases, setCases] = useState(INITIAL_CASES);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [createdCaseId, setCreatedCaseId] = useState(null);
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
    });
    // Fetch live cases from API if available
    useEffect(() => {
        fetch('http://localhost:3001/api/v1/cases')
            .then((res) => res.json())
            .then((json) => {
            if (json.success && json.data && json.data.length > 0) {
                const mapped = json.data.map((c) => ({
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
                }));
                setCases(mapped);
            }
        })
            .catch(() => { });
    }, []);
    // Auto-calculated preliminary scores based on inputs
    const estimatedCvi = Math.min(85, Math.max(20, Math.round(38 - (Number(formData.baselineDscr) - 1.5) * 15)));
    const estimatedGvs = Math.min(95, Math.max(45, Math.round(78 + (Number(formData.loanAmount) > 3000000 ? 6 : 2))));
    const isEligibleForSubvention = estimatedGvs >= 75;
    const handleCreateCase = async (e) => {
        e.preventDefault();
        if (!formData.msmeName.trim())
            return;
        setIsSubmitting(true);
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
            };
            const response = await fetch('http://localhost:3001/api/v1/cases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const json = await response.json();
            const newId = json?.data?.id || `case-00${cases.length + 1}`;
            const createdItem = {
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
            };
            setCases([createdItem, ...cases]);
            setCreatedCaseId(newId);
        }
        catch (err) {
            console.error('Failed to create case:', err);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const handleResetModal = () => {
        setIsCreateModalOpen(false);
        setCreatedCaseId(null);
        setFormData({
            msmeName: '',
            sector: 'Agri-Processing & Cold Chain',
            loanAmount: '4500000',
            tenorMonths: '60',
            purpose: '100kW Rooftop Solar PV & Waste Heat Recovery',
            baselineDscr: '1.80',
            udyamNumber: 'UDYAM-MH-14-0089201',
            city: 'Nagpur',
        });
    };
    const filtered = cases.filter((c) => filterStatus === 'ALL' || c.status === filterStatus);
    return (_jsxs("div", { className: "space-y-6 animate-fade-in pb-12", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 text-xs text-slate-400 mb-1", children: [_jsx("span", { children: "Loan Underwriting" }), _jsx("span", { children: "/" }), _jsx("span", { className: "text-brand-400 font-semibold", children: "Active Pipeline" })] }), _jsx("h1", { className: "text-2xl font-bold text-white tracking-tight", children: "Loan Underwriting Queue" }), _jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "Credit and green viability underwriting workflow & appraisal engine" })] }), _jsxs("button", { onClick: () => setIsCreateModalOpen(true), className: "px-4 py-2.5 bg-gradient-to-r from-brand-600 via-brand-500 to-emerald-600 hover:from-brand-500 hover:to-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-brand-600/30 flex items-center gap-2 transition-all cursor-pointer self-start sm:self-auto", children: [_jsx("span", { className: "material-symbols-rounded text-base", children: "add_circle" }), "Create New Loan Case"] })] }), _jsx("div", { className: "flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto text-xs", children: ['ALL', 'UNDER_REVIEW', 'APPROVED', 'STRESS_TEST_REQUIRED', 'REJECTED'].map((s) => (_jsx("button", { onClick: () => setFilterStatus(s), className: `px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${filterStatus === s
                        ? 'bg-brand-500/15 border border-brand-500/40 text-brand-400 shadow-sm shadow-brand-500/10'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`, children: s.replace(/_/g, ' ') }, s))) }), _jsx("div", { className: "rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left text-xs text-slate-300", children: [_jsx("thead", { className: "bg-slate-950/80 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider font-semibold", children: _jsxs("tr", { children: [_jsx("th", { className: "py-3.5 px-4", children: "Case ID & MSME" }), _jsx("th", { className: "py-3.5 px-4", children: "Loan Facility & Purpose" }), _jsx("th", { className: "py-3.5 px-4", children: "Amount & Tenor" }), _jsx("th", { className: "py-3.5 px-4 text-center", children: "CVI Score" }), _jsx("th", { className: "py-3.5 px-4 text-center", children: "GVS Score" }), _jsx("th", { className: "py-3.5 px-4", children: "Status" }), _jsx("th", { className: "py-3.5 px-4", children: "Officer" }), _jsx("th", { className: "py-3.5 px-4 text-right", children: "Action" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-800/60", children: filtered.map((c) => (_jsxs("tr", { className: "hover:bg-slate-800/30 transition-colors", children: [_jsxs("td", { className: "py-3.5 px-4", children: [_jsx("span", { className: "font-mono text-[10px] text-brand-400 font-semibold block", children: c.id }), _jsx("span", { className: "font-bold text-white text-xs", children: c.msmeName })] }), _jsx("td", { className: "py-3.5 px-4 text-slate-200 max-w-xs truncate", children: c.loanType }), _jsxs("td", { className: "py-3.5 px-4", children: [_jsx("div", { className: "font-bold text-white", children: c.amount }), _jsx("div", { className: "text-[10px] text-slate-400", children: c.tenor })] }), _jsx("td", { className: "py-3.5 px-4 text-center", children: _jsxs("span", { className: `inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${c.cvi <= 30 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                    c.cvi <= 60 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                        'bg-red-500/10 text-red-400 border border-red-500/20'}`, children: [c.cvi, "/100"] }) }), _jsx("td", { className: "py-3.5 px-4 text-center", children: _jsxs("span", { className: "inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20", children: [c.gvs, "/100"] }) }), _jsx("td", { className: "py-3.5 px-4", children: _jsx("span", { className: `inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full ${c.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                    c.status === 'UNDER_REVIEW' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                        'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`, children: c.status.replace(/_/g, ' ') }) }), _jsx("td", { className: "py-3.5 px-4 text-slate-400 text-[11px]", children: c.officer }), _jsx("td", { className: "py-3.5 px-4 text-right", children: _jsxs(Link, { to: `/cases/${c.id}`, className: "px-3 py-1.5 bg-brand-600/15 hover:bg-brand-600/30 text-brand-400 font-semibold rounded-lg border border-brand-500/30 transition-all text-xs inline-flex items-center gap-1 shadow-sm", children: ["Underwrite", _jsx("span", { className: "material-symbols-rounded text-xs", children: "arrow_forward" })] }) })] }, c.id))) })] }) }) }), isCreateModalOpen && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in", children: _jsxs("div", { className: "w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5 max-h-[92vh] overflow-y-auto text-slate-200", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3.5", children: [_jsxs("div", { children: [_jsxs("h3", { className: "text-lg font-bold text-white flex items-center gap-2", children: [_jsx("span", { className: "material-symbols-rounded text-brand-400", children: "add_circle" }), "Create & Onboard New Green Loan Case"] }), _jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "Submit MSME borrower financial twin and green project parameters for deterministic underwriting." })] }), _jsx("button", { onClick: handleResetModal, className: "p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer", children: _jsx("span", { className: "material-symbols-rounded text-base", children: "close" }) })] }), createdCaseId ? (_jsxs("div", { className: "p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-fade-in", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl", children: "\u2713" }), _jsxs("div", { children: [_jsx("h4", { className: "text-base font-bold text-white", children: "Loan Case Successfully Created!" }), _jsxs("p", { className: "text-xs text-emerald-300/90 mt-1", children: ["Case ID ", _jsx("strong", { className: "font-mono text-white", children: createdCaseId }), " has been registered in the underwriting queue with preliminary CVI ", estimatedCvi, "/100 and GVS ", estimatedGvs, "/100."] })] }), _jsxs("div", { className: "flex justify-center gap-3 pt-2", children: [_jsx("button", { onClick: handleResetModal, className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold cursor-pointer", children: "Close & View Queue" }), _jsxs("button", { onClick: () => {
                                                handleResetModal();
                                                navigate(`/cases/${createdCaseId}`);
                                            }, className: "px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-600/30 flex items-center gap-1.5 cursor-pointer", children: ["Open Underwriting Workbench", _jsx("span", { className: "material-symbols-rounded text-sm", children: "arrow_forward" })] })] })] })) : (
                        /* Creation Form */
                        _jsxs("form", { onSubmit: handleCreateCase, className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("label", { className: "font-semibold text-slate-300", children: "Borrower / Enterprise Name *" }), _jsx("input", { type: "text", required: true, placeholder: "e.g. Sahyadri Bio-Fuels & Solar Park", value: formData.msmeName, onChange: (e) => setFormData({ ...formData, msmeName: e.target.value }), className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-xs" })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("label", { className: "font-semibold text-slate-300", children: "Industry Sector" }), _jsxs("select", { value: formData.sector, onChange: (e) => setFormData({ ...formData, sector: e.target.value }), className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-xs", children: [_jsx("option", { children: "Agri-Processing & Cold Chain" }), _jsx("option", { children: "Bioenergy & Pelleting" }), _jsx("option", { children: "Textile & Apparel Dyeing" }), _jsx("option", { children: "Solar Hybrid Aquaculture" }), _jsx("option", { children: "Precision Micro-Irrigation" }), _jsx("option", { children: "Auto-Component Engineering" })] })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("label", { className: "font-semibold text-slate-300", children: "Requested Loan Amount (\u20B9 INR) *" }), _jsx("input", { type: "number", required: true, step: "50000", value: formData.loanAmount, onChange: (e) => setFormData({ ...formData, loanAmount: e.target.value }), className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-xs font-mono" }), _jsxs("span", { className: "text-[10px] text-slate-400", children: ["Amount in Lakhs: \u20B9", (Number(formData.loanAmount) / 100000).toFixed(1), " Lakhs"] })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("label", { className: "font-semibold text-slate-300", children: "Repayment Tenor (Months)" }), _jsxs("select", { value: formData.tenorMonths, onChange: (e) => setFormData({ ...formData, tenorMonths: e.target.value }), className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-xs", children: [_jsx("option", { value: "36", children: "36 Months (3 Years)" }), _jsx("option", { value: "48", children: "48 Months (4 Years)" }), _jsx("option", { value: "60", children: "60 Months (5 Years)" }), _jsx("option", { value: "84", children: "84 Months (7 Years)" })] })] }), _jsxs("div", { className: "sm:col-span-2 space-y-1", children: [_jsx("label", { className: "font-semibold text-slate-300", children: "Green Project Capex Purpose *" }), _jsx("input", { type: "text", required: true, placeholder: "e.g. 100kW Rooftop Solar PV + Heat Recovery Boiler Upgrade", value: formData.purpose, onChange: (e) => setFormData({ ...formData, purpose: e.target.value }), className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-xs" })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("label", { className: "font-semibold text-slate-300", children: "Baseline Operating DSCR" }), _jsx("input", { type: "number", step: "0.05", value: formData.baselineDscr, onChange: (e) => setFormData({ ...formData, baselineDscr: e.target.value }), className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-xs font-mono" })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("label", { className: "font-semibold text-slate-300", children: "Udyam Registration" }), _jsx("input", { type: "text", value: formData.udyamNumber, onChange: (e) => setFormData({ ...formData, udyamNumber: e.target.value }), className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 text-xs font-mono" })] })] }), _jsxs("div", { className: "p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5 text-xs", children: [_jsxs("span", { className: "font-semibold text-slate-300 flex items-center justify-between", children: [_jsx("span", { children: "Deterministic Underwriting Preview (ISO 14091 + RBI Taxonomy):" }), _jsx("span", { className: "text-[10px] font-mono text-brand-400", children: "Pre-Calculation Engine" })] }), _jsxs("div", { className: "grid grid-cols-3 gap-3 text-center", children: [_jsxs("div", { className: "p-2.5 rounded-xl bg-slate-900 border border-slate-800", children: [_jsx("span", { className: "text-[10px] text-slate-500 block", children: "Estimated CVI" }), _jsxs("span", { className: "text-base font-bold text-emerald-400", children: [estimatedCvi, "/100"] }), _jsx("span", { className: "text-[9px] text-slate-400 block", children: "Moderate Physical Risk" })] }), _jsxs("div", { className: "p-2.5 rounded-xl bg-slate-900 border border-slate-800", children: [_jsx("span", { className: "text-[10px] text-slate-500 block", children: "Estimated GVS" }), _jsxs("span", { className: "text-base font-bold text-brand-400", children: [estimatedGvs, "/100"] }), _jsx("span", { className: "text-[9px] text-slate-400 block", children: "Tier-1 Bankable" })] }), _jsxs("div", { className: "p-2.5 rounded-xl bg-slate-900 border border-slate-800", children: [_jsx("span", { className: "text-[10px] text-slate-500 block", children: "Green Pricing Rebate" }), _jsx("span", { className: "text-base font-bold text-emerald-400", children: isEligibleForSubvention ? '-35 bps' : 'Standard' }), _jsx("span", { className: "text-[9px] text-slate-400 block", children: isEligibleForSubvention ? 'SIDBI Subvention' : 'Standard Rate' })] })] })] }), _jsxs("div", { className: "flex items-center justify-end gap-3 pt-2", children: [_jsx("button", { type: "button", onClick: handleResetModal, className: "px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer", children: "Cancel" }), _jsx("button", { type: "submit", disabled: isSubmitting || !formData.msmeName.trim(), className: "px-5 py-2.5 bg-gradient-to-r from-brand-600 via-brand-500 to-emerald-600 hover:from-brand-500 hover:to-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-600/30 flex items-center gap-1.5 cursor-pointer disabled:opacity-60", children: isSubmitting ? (_jsx("span", { className: "inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" })) : (_jsxs(_Fragment, { children: [_jsx("span", { className: "material-symbols-rounded text-sm", children: "check" }), _jsx("span", { children: "Submit Loan Case" })] })) })] })] }))] }) }))] }));
}
//# sourceMappingURL=CasesPage.js.map