import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function CasesPage() {
    const [filterStatus, setFilterStatus] = useState('ALL');
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
    ];
    const filtered = cases.filter((c) => filterStatus === 'ALL' || c.status === filterStatus);
    return (_jsxs("div", { className: "space-y-6 animate-fade-in", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-white tracking-tight", children: "Loan Underwriting Cases" }), _jsx("p", { className: "text-sm text-slate-400 mt-0.5", children: "Credit and green viability underwriting workflow queue" })] }), _jsxs("button", { className: "px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-brand-600/20 flex items-center gap-2 transition-all cursor-pointer", children: [_jsx("span", { className: "material-symbols-outlined text-sm", children: "add_circle" }), "Create New Loan Case"] })] }), _jsx("div", { className: "flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto text-xs", children: ['ALL', 'UNDER_REVIEW', 'APPROVED', 'STRESS_TEST_REQUIRED', 'REJECTED'].map((s) => (_jsx("button", { onClick: () => setFilterStatus(s), className: `px-3 py-1.5 rounded-lg font-medium transition-all ${filterStatus === s
                        ? 'bg-brand-500/10 border border-brand-500/40 text-brand-400'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`, children: s.replace(/_/g, ' ') }, s))) }), _jsx("div", { className: "rounded-xl bg-slate-900/60 border border-slate-800 overflow-hidden", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left text-xs", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-800 text-slate-400 bg-slate-950/40", children: [_jsx("th", { className: "py-3 px-4 font-semibold", children: "Case ID & MSME" }), _jsx("th", { className: "py-3 px-4 font-semibold", children: "Loan Facility" }), _jsx("th", { className: "py-3 px-4 font-semibold", children: "Amount & Tenor" }), _jsx("th", { className: "py-3 px-4 font-semibold text-center", children: "CVI Score" }), _jsx("th", { className: "py-3 px-4 font-semibold text-center", children: "GVS Score" }), _jsx("th", { className: "py-3 px-4 font-semibold", children: "Status" }), _jsx("th", { className: "py-3 px-4 font-semibold", children: "Credit Officer" }), _jsx("th", { className: "py-3 px-4 font-semibold text-right", children: "Action" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-800/60", children: filtered.map((c) => (_jsxs("tr", { className: "hover:bg-slate-800/30 transition-colors", children: [_jsxs("td", { className: "py-3.5 px-4", children: [_jsx("span", { className: "font-mono text-[10px] text-slate-500 block", children: c.id }), _jsx("span", { className: "font-semibold text-slate-100", children: c.msmeName })] }), _jsx("td", { className: "py-3.5 px-4 text-slate-300", children: c.loanType }), _jsxs("td", { className: "py-3.5 px-4", children: [_jsx("div", { className: "font-medium text-slate-200", children: c.amount }), _jsx("div", { className: "text-[10px] text-slate-400", children: c.tenor })] }), _jsx("td", { className: "py-3.5 px-4 text-center", children: _jsxs("span", { className: `inline-block px-2 py-0.5 rounded text-[10px] font-bold ${c.cvi <= 30 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                    c.cvi <= 60 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                        'bg-red-500/10 text-red-400 border border-red-500/20'}`, children: [c.cvi, "/100"] }) }), _jsx("td", { className: "py-3.5 px-4 text-center", children: _jsxs("span", { className: "inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20", children: [c.gvs, "/100"] }) }), _jsx("td", { className: "py-3.5 px-4", children: _jsx("span", { className: `inline-block px-2 py-0.5 text-[10px] font-bold rounded-full ${c.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                    c.status === 'UNDER_REVIEW' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                        'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`, children: c.status.replace(/_/g, ' ') }) }), _jsx("td", { className: "py-3.5 px-4 text-slate-400 text-[11px]", children: c.officer }), _jsx("td", { className: "py-3.5 px-4 text-right", children: _jsxs(Link, { to: `/cases/${c.id}`, className: "px-3 py-1 bg-brand-600/10 hover:bg-brand-600/20 text-brand-400 font-medium rounded border border-brand-500/30 transition-colors text-xs inline-flex items-center gap-1", children: ["Underwrite", _jsx("span", { className: "material-symbols-outlined text-xs", children: "arrow_forward" })] }) })] }, c.id))) })] }) }) })] }));
}
//# sourceMappingURL=CasesPage.js.map