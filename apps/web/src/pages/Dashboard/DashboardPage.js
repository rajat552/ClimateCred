import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler, } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);
export default function DashboardPage() {
    const [sectorFilter, setSectorFilter] = useState('ALL');
    const kpis = [
        { label: 'Active Loan Cases', value: '42', change: '+8% vs last month', positive: true, icon: 'folder_open', color: 'brand' },
        { label: 'Avg Portfolio CVI', value: '38.4', change: 'Moderate Climate Hazard', status: 'Moderate', icon: 'thermostat', color: 'amber' },
        { label: 'Avg Green Viability (GVS)', value: '74.2', change: '+3.1 pts YoY', positive: true, icon: 'eco', color: 'emerald' },
        { label: 'Green Loans Underwritten', value: '₹18.4 Cr', change: '14 Active Subsidies', positive: true, icon: 'account_balance', color: 'blue' },
    ];
    const trendData = {
        labels: ['Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026', 'Aug 2026', 'Sep 2026'],
        datasets: [
            {
                label: 'Green Loan Volume (₹ Cr)',
                data: [8.2, 10.5, 12.8, 14.2, 16.5, 18.4],
                borderColor: '#0F9D72',
                backgroundColor: 'rgba(15, 157, 114, 0.12)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#0F9D72',
            },
            {
                label: 'Portfolio Avg CVI (Hazard Index)',
                data: [44.0, 42.5, 41.0, 39.8, 39.0, 38.4],
                borderColor: '#F59E0B',
                backgroundColor: 'transparent',
                borderDash: [5, 5],
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 3,
                pointBackgroundColor: '#F59E0B',
            },
        ],
    };
    const doughnutData = {
        labels: ['Solar & Bioenergy', 'Agri-Cold Storage', 'Precision Water Tech', 'Textiles', 'Aquaculture'],
        datasets: [
            {
                data: [42, 28, 15, 10, 5],
                backgroundColor: ['#0F9D72', '#3B82F6', '#10B981', '#F59E0B', '#6366F1'],
                borderWidth: 0,
            },
        ],
    };
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
    return (_jsxs("div", { className: "space-y-6 animate-fade-in", children: [_jsx("div", { className: "relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-6 shadow-xl", children: _jsxs("div", { className: "relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-2", children: [_jsx("span", { className: "w-2 h-2 rounded-full bg-brand-400 animate-pulse" }), "Live Underwriting Command Center"] }), _jsx("h1", { className: "text-2xl font-bold text-white tracking-tight", children: "MSME Climate Portfolio & Risk Intelligence" }), _jsx("p", { className: "text-sm text-slate-400 mt-1 max-w-2xl", children: "Real-time physical hazard scoring (ISO 14091) paired with green transition viability (GVS) for high-confidence MSME underwriting." })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Link, { to: "/cases", className: "px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-brand-600/20 flex items-center gap-1.5 transition-all", children: [_jsx("span", { className: "material-symbols-outlined text-sm", children: "add" }), "New Underwriting Case"] }), _jsxs(Link, { to: "/portfolio", className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all", children: [_jsx("span", { className: "material-symbols-outlined text-sm", children: "insights" }), "Portfolio Heatmap"] })] })] }) }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: kpis.map((kpi, idx) => (_jsxs("div", { className: "p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 transition-all shadow-sm backdrop-blur-sm", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("span", { className: "text-xs font-medium text-slate-400", children: kpi.label }), _jsx("div", { className: "w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300", children: _jsx("span", { className: "material-symbols-outlined text-lg", children: kpi.icon }) })] }), _jsx("div", { className: "text-2xl font-bold text-white tracking-tight", children: kpi.value }), _jsxs("div", { className: "mt-2 text-xs flex items-center gap-1.5 font-medium text-emerald-400", children: [_jsx("span", { className: "material-symbols-outlined text-xs", children: "trending_up" }), _jsx("span", { children: kpi.change })] })] }, idx))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-sm font-semibold text-white", children: "Green Underwriting Volume & CVI De-Risking Trend" }), _jsx("p", { className: "text-[11px] text-slate-400", children: "Monthly sanctioned green capex vs aggregate physical risk trajectory" })] }), _jsx("span", { className: "text-xs text-brand-400 font-mono bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20", children: "Live Feed" })] }), _jsx("div", { className: "h-64 w-full", children: _jsx(Line, { data: trendData, options: {
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'top',
                                                labels: { color: '#94A3B8', font: { size: 11 } },
                                            },
                                        },
                                        scales: {
                                            x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#94A3B8', font: { size: 10 } } },
                                            y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#94A3B8', font: { size: 10 } } },
                                        },
                                    } }) })] }), _jsxs("div", { className: "p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-sm font-semibold text-white", children: "Green Project Sector Allocation" }), _jsx("p", { className: "text-[11px] text-slate-400", children: "Distribution across climate transition categories" })] }), _jsx("div", { className: "h-52 flex items-center justify-center", children: _jsx(Doughnut, { data: doughnutData, options: {
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'bottom',
                                                labels: { color: '#94A3B8', font: { size: 10 }, boxWidth: 10 },
                                            },
                                        },
                                    } }) })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 rounded-xl bg-slate-900/60 border border-slate-800 p-5 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-base font-semibold text-white", children: "Active Loan Underwriting Queue" }), _jsx("p", { className: "text-xs text-slate-400", children: "Dual-engine scoring status across recent applications" })] }), _jsx(Link, { to: "/cases", className: "text-xs text-brand-400 hover:text-brand-300 font-medium", children: "View All 42 Cases \u2192" })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left text-xs", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-800 text-slate-400 bg-slate-950/40", children: [_jsx("th", { className: "py-2.5 px-3 font-semibold", children: "MSME / Enterprise" }), _jsx("th", { className: "py-2.5 px-3 font-semibold", children: "Capex Amount" }), _jsx("th", { className: "py-2.5 px-3 font-semibold text-center", children: "CVI Score" }), _jsx("th", { className: "py-2.5 px-3 font-semibold text-center", children: "GVS Score" }), _jsx("th", { className: "py-2.5 px-3 font-semibold", children: "Status" }), _jsx("th", { className: "py-2.5 px-3 font-semibold text-right", children: "Action" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-800/60", children: recentCases.map((c) => (_jsxs("tr", { className: "hover:bg-slate-800/30 transition-colors", children: [_jsxs("td", { className: "py-3 px-3", children: [_jsx("div", { className: "font-semibold text-slate-100", children: c.msme }), _jsx("div", { className: "text-[11px] text-slate-400", children: c.sector })] }), _jsx("td", { className: "py-3 px-3 font-medium text-slate-200", children: c.amount }), _jsx("td", { className: "py-3 px-3 text-center", children: _jsxs("span", { className: `inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${c.cvi <= 30 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                                c.cvi <= 60 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                                    'bg-red-500/10 text-red-400 border border-red-500/20'}`, children: [c.cvi, "/100"] }) }), _jsx("td", { className: "py-3 px-3 text-center", children: _jsxs("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20", children: [c.gvs, "/100"] }) }), _jsx("td", { className: "py-3 px-3", children: _jsx("span", { className: `inline-block px-2 py-0.5 text-[10px] font-bold rounded-full ${c.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                                c.status === 'UNDER_REVIEW' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`, children: c.status.replace(/_/g, ' ') }) }), _jsx("td", { className: "py-3 px-3 text-right", children: _jsx(Link, { to: `/cases/${c.id}`, className: "px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors", children: "Appraise" }) })] }, c.id))) })] }) })] }), _jsxs("div", { className: "rounded-xl bg-slate-900/60 border border-slate-800 p-5 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-base font-semibold text-white", children: "Hazard Watchdog" }), _jsx("span", { className: "material-symbols-outlined text-brand-400 text-lg", children: "radar" })] }), _jsxs("div", { className: "p-3.5 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300 space-y-1", children: [_jsxs("div", { className: "font-semibold flex items-center gap-1.5", children: [_jsx("span", { className: "material-symbols-outlined text-sm", children: "warning" }), "Heatwave Vulnerability Alert: Maharashtra / AP"] }), _jsx("p", { className: "text-slate-300 text-[11px]", children: "+3.2\u00B0C above seasonal baseline projected across 18 borrower clusters. Recommended adaptation: cold-chain thermal insulation & solar rooftop hedging." })] }), _jsxs("div", { className: "p-3.5 rounded-lg bg-blue-500/5 border border-blue-500/20 text-xs text-blue-300 space-y-1", children: [_jsxs("div", { className: "font-semibold flex items-center gap-1.5", children: [_jsx("span", { className: "material-symbols-outlined text-sm", children: "water_drop" }), "Monsoon Flash Flood Warning: Coastal AP"] }), _jsx("p", { className: "text-slate-300 text-[11px]", children: "Machilipatnam aquaculture zone flagged for elevated storm surge risk. Micro-insurance rider covenant triggered." })] })] })] })] }));
}
//# sourceMappingURL=DashboardPage.js.map