import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
export default function DashboardPage() {
    const kpis = [
        { label: 'Active Loan Cases', value: '42', change: '+8% vs last month', positive: true, icon: 'folder_open', color: 'brand' },
        { label: 'Avg Portfolio CVI', value: '38.4', change: 'Moderate Climate Risk', status: 'Moderate', icon: 'thermostat', color: 'amber' },
        { label: 'Avg Green Viability (GVS)', value: '74.2', change: '+3.1 pts YoY', positive: true, icon: 'eco', color: 'emerald' },
        { label: 'Green Loans Underwritten', value: '₹18.4 Cr', change: '14 Active Subsidies', positive: true, icon: 'account_balance', color: 'blue' },
    ];
    const recentCases = [
        {
            id: 'case-001',
            msme: 'Annapurna Solar Cold Storage',
            sector: 'Agri-Logistics / Warehousing',
            amount: '₹35,00,000',
            cvi: 34,
            cviBand: 'MODERATE',
            gvs: 82,
            gvsBand: 'HIGH',
            status: 'APPROVED',
            updated: '10 mins ago',
        },
        {
            id: 'case-002',
            msme: 'Deccan Biomass Pellets Ltd',
            sector: 'Renewable Fuel / Clean Energy',
            amount: '₹75,00,000',
            cvi: 28,
            cviBand: 'LOW',
            gvs: 88,
            gvsBand: 'EXEMPLARY',
            status: 'UNDER_REVIEW',
            updated: '42 mins ago',
        },
        {
            id: 'case-003',
            msme: 'Krishna Valley Coastal Aqua',
            sector: 'Aquaculture / Marine',
            amount: '₹22,00,000',
            cvi: 71,
            cviBand: 'HIGH',
            gvs: 49,
            gvsBand: 'MODERATE',
            status: 'STRESS_TEST_REQUIRED',
            updated: '2 hours ago',
        },
        {
            id: 'case-004',
            msme: 'Godavari Precision Drip Farm',
            sector: 'Horticulture & Water Tech',
            amount: '₹18,50,000',
            cvi: 41,
            cviBand: 'MODERATE',
            gvs: 79,
            gvsBand: 'HIGH',
            status: 'APPROVED',
            updated: '4 hours ago',
        },
    ];
    return (_jsxs("div", { className: "space-y-6 animate-fade-in", children: [_jsx("div", { className: "relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-6 shadow-xl", children: _jsxs("div", { className: "relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-2", children: [_jsx("span", { className: "w-2 h-2 rounded-full bg-brand-400 animate-pulse" }), "Live Climate-Financial Intelligence Hub"] }), _jsx("h1", { className: "text-2xl font-bold text-white tracking-tight", children: "MSME Climate Portfolio & Underwriting" }), _jsx("p", { className: "text-sm text-slate-400 mt-1 max-w-2xl", children: "Real-time physical climate hazard scoring (CVI) paired with green transition viability assessment (GVS) for bankable MSME underwriting." })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Link, { to: "/cases", className: "px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-brand-600/20 flex items-center gap-2 transition-all", children: [_jsx("span", { className: "material-symbols-outlined text-sm", children: "add" }), "New Underwriting Case"] }), _jsxs(Link, { to: "/portfolio", className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-medium rounded-lg flex items-center gap-2 transition-all", children: [_jsx("span", { className: "material-symbols-outlined text-sm", children: "analytics" }), "Stress Test Heatmap"] })] })] }) }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: kpis.map((kpi, idx) => (_jsxs("div", { className: "p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 transition-all shadow-sm", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("span", { className: "text-xs font-medium text-slate-400", children: kpi.label }), _jsx("div", { className: "w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300", children: _jsx("span", { className: "material-symbols-outlined text-lg", children: kpi.icon }) })] }), _jsx("div", { className: "text-2xl font-bold text-white tracking-tight", children: kpi.value }), _jsxs("div", { className: "mt-2 text-xs flex items-center gap-1.5 font-medium text-emerald-400", children: [_jsx("span", { className: "material-symbols-outlined text-xs", children: "trending_up" }), _jsx("span", { children: kpi.change })] })] }, idx))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 rounded-xl bg-slate-900/60 border border-slate-800 p-5", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-base font-semibold text-white", children: "Active Loan Underwriting Cases" }), _jsx("p", { className: "text-xs text-slate-400", children: "Dual-engine scoring status across recent applications" })] }), _jsx(Link, { to: "/cases", className: "text-xs text-brand-400 hover:text-brand-300 font-medium", children: "View All Cases \u2192" })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left text-xs", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-800 text-slate-400", children: [_jsx("th", { className: "pb-3 font-semibold", children: "MSME / Enterprise" }), _jsx("th", { className: "pb-3 font-semibold", children: "Amount" }), _jsx("th", { className: "pb-3 font-semibold text-center", children: "CVI Score" }), _jsx("th", { className: "pb-3 font-semibold text-center", children: "GVS Score" }), _jsx("th", { className: "pb-3 font-semibold", children: "Status" }), _jsx("th", { className: "pb-3 font-semibold text-right", children: "Action" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-800/60", children: recentCases.map((c) => (_jsxs("tr", { className: "hover:bg-slate-800/30 transition-colors", children: [_jsxs("td", { className: "py-3", children: [_jsx("div", { className: "font-semibold text-slate-100", children: c.msme }), _jsx("div", { className: "text-[11px] text-slate-400", children: c.sector })] }), _jsx("td", { className: "py-3 font-medium text-slate-200", children: c.amount }), _jsx("td", { className: "py-3 text-center", children: _jsxs("span", { className: `inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${c.cvi <= 30 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                                c.cvi <= 60 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                                    'bg-red-500/10 text-red-400 border border-red-500/20'}`, children: [c.cvi, "/100 (", c.cviBand, ")"] }) }), _jsx("td", { className: "py-3 text-center", children: _jsxs("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20", children: [c.gvs, "/100 (", c.gvsBand, ")"] }) }), _jsx("td", { className: "py-3", children: _jsx("span", { className: "inline-block px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700", children: c.status.replace(/_/g, ' ') }) }), _jsx("td", { className: "py-3 text-right", children: _jsx(Link, { to: `/cases/${c.id}`, className: "px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700", children: "Inspect" }) })] }, c.id))) })] }) })] }), _jsxs("div", { className: "rounded-xl bg-slate-900/60 border border-slate-800 p-5 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-base font-semibold text-white", children: "Hazard Intelligence" }), _jsx("span", { className: "material-symbols-outlined text-brand-400 text-lg", children: "radar" })] }), _jsxs("div", { className: "p-3.5 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300 space-y-1", children: [_jsxs("div", { className: "font-semibold flex items-center gap-1.5", children: [_jsx("span", { className: "material-symbols-outlined text-sm", children: "warning" }), "Heatwave Vulnerability Alert: Telangana / AP"] }), _jsx("p", { className: "text-slate-300 text-[11px]", children: "+3.2\u00B0C above seasonal baseline projected across 18 borrower clusters. Recommended adaptation: cold-chain thermal insulation & micro-insurance." })] }), _jsxs("div", { className: "space-y-3 pt-2", children: [_jsx("div", { className: "text-xs font-semibold text-slate-300 uppercase tracking-wider", children: "Methodology Highlights" }), _jsxs("div", { className: "space-y-2 text-xs", children: [_jsxs("div", { className: "p-3 rounded-lg bg-slate-950/60 border border-slate-800", children: [_jsx("div", { className: "font-medium text-slate-200", children: "CVI Engine (ISO 14091)" }), _jsx("div", { className: "text-slate-400 text-[11px] mt-0.5", children: "Physical hazard \u00D7 Exposure \u00D7 Vulnerability \u00F7 Adaptive Capacity" })] }), _jsxs("div", { className: "p-3 rounded-lg bg-slate-950/60 border border-slate-800", children: [_jsx("div", { className: "font-medium text-slate-200", children: "GVS Engine (Green Viability)" }), _jsx("div", { className: "text-slate-400 text-[11px] mt-0.5", children: "Carbon reduction + IRR uplift + Payback stability + Subsidy eligibility" })] })] })] })] })] })] }));
}
//# sourceMappingURL=DashboardPage.js.map