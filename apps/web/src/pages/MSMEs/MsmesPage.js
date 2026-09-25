import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function MsmesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sectorFilter, setSectorFilter] = useState('ALL');
    const msmeList = [
        {
            id: 'msme-001',
            name: 'Annapurna Agro-Cold Storage',
            regNumber: 'UDYAM-MH-12-0049281',
            sector: 'Agri-Processing & Cold Storage',
            location: 'Nagpur, Maharashtra',
            turnover: '₹4.2 Cr',
            employees: 28,
            climateRiskBand: 'MODERATE',
            greenViabilityBand: 'HIGH',
        },
        {
            id: 'msme-002',
            name: 'Deccan Biomass Pellets Ltd',
            regNumber: 'UDYAM-TS-04-0019284',
            sector: 'Renewable Bioenergy',
            location: 'Warangal, Telangana',
            turnover: '₹8.6 Cr',
            employees: 45,
            climateRiskBand: 'LOW',
            greenViabilityBand: 'EXEMPLARY',
        },
        {
            id: 'msme-003',
            name: 'Krishna Valley Coastal Aqua',
            regNumber: 'UDYAM-AP-08-0091823',
            sector: 'Aquaculture & Fisheries',
            location: 'Machilipatnam, Andhra Pradesh',
            turnover: '₹3.1 Cr',
            employees: 22,
            climateRiskBand: 'HIGH',
            greenViabilityBand: 'MODERATE',
        },
        {
            id: 'msme-004',
            name: 'Godavari Precision Drip Farm',
            regNumber: 'UDYAM-AP-03-0056129',
            sector: 'Horticulture & Water Tech',
            location: 'Rajahmundry, Andhra Pradesh',
            turnover: '₹2.8 Cr',
            employees: 18,
            climateRiskBand: 'MODERATE',
            greenViabilityBand: 'HIGH',
        },
        {
            id: 'msme-005',
            name: 'Kaveri Silk Weaving Clusters',
            regNumber: 'UDYAM-TN-11-0032918',
            sector: 'Textiles & Dyeing',
            location: 'Kanchipuram, Tamil Nadu',
            turnover: '₹5.5 Cr',
            employees: 62,
            climateRiskBand: 'HIGH',
            greenViabilityBand: 'HIGH',
        },
    ];
    const filtered = msmeList.filter((m) => {
        const matchSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchSector = sectorFilter === 'ALL' || m.sector.includes(sectorFilter);
        return matchSearch && matchSector;
    });
    return (_jsxs("div", { className: "space-y-6 animate-fade-in", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-white tracking-tight", children: "MSME Borrower Directory" }), _jsx("p", { className: "text-sm text-slate-400 mt-0.5", children: "Registered micro, small, and medium enterprises with climate twin profiles" })] }), _jsxs("button", { className: "px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-brand-600/20 flex items-center gap-2 transition-all self-start sm:self-auto cursor-pointer", children: [_jsx("span", { className: "material-symbols-outlined text-sm", children: "domain_add" }), "Register New MSME"] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-3 p-3 bg-slate-900/60 border border-slate-800 rounded-xl", children: [_jsxs("div", { className: "relative flex-1 w-full", children: [_jsx("span", { className: "material-symbols-outlined absolute left-3 top-2.5 text-slate-500 text-sm", children: "search" }), _jsx("input", { type: "text", placeholder: "Search by enterprise name, Udyam number, or district...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full pl-9 pr-4 py-1.5 bg-slate-950/60 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500" })] }), _jsxs("select", { value: sectorFilter, onChange: (e) => setSectorFilter(e.target.value), className: "w-full sm:w-auto px-3 py-1.5 bg-slate-950/60 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-brand-500", children: [_jsx("option", { value: "ALL", children: "All Sectors" }), _jsx("option", { value: "Agri", children: "Agriculture & Cold Storage" }), _jsx("option", { value: "Renewable", children: "Renewable Energy" }), _jsx("option", { value: "Aqua", children: "Aquaculture" }), _jsx("option", { value: "Textiles", children: "Textiles & Manufacturing" })] })] }), _jsx("div", { className: "rounded-xl bg-slate-900/60 border border-slate-800 overflow-hidden", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left text-xs", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-800 text-slate-400 bg-slate-950/40", children: [_jsx("th", { className: "py-3 px-4 font-semibold", children: "Enterprise" }), _jsx("th", { className: "py-3 px-4 font-semibold", children: "Udyam Registration" }), _jsx("th", { className: "py-3 px-4 font-semibold", children: "Location" }), _jsx("th", { className: "py-3 px-4 font-semibold", children: "Turnover" }), _jsx("th", { className: "py-3 px-4 font-semibold text-center", children: "Climate Risk" }), _jsx("th", { className: "py-3 px-4 font-semibold text-center", children: "Green Viability" }), _jsx("th", { className: "py-3 px-4 font-semibold text-right", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-800/60", children: filtered.map((m) => (_jsxs("tr", { className: "hover:bg-slate-800/30 transition-colors", children: [_jsxs("td", { className: "py-3.5 px-4", children: [_jsx("div", { className: "font-semibold text-slate-100", children: m.name }), _jsx("div", { className: "text-[11px] text-slate-400", children: m.sector })] }), _jsx("td", { className: "py-3.5 px-4 font-mono text-slate-300 text-[11px]", children: m.regNumber }), _jsx("td", { className: "py-3.5 px-4 text-slate-300", children: m.location }), _jsx("td", { className: "py-3.5 px-4 text-slate-200 font-medium", children: m.turnover }), _jsx("td", { className: "py-3.5 px-4 text-center", children: _jsx("span", { className: `inline-block px-2 py-0.5 rounded text-[10px] font-bold ${m.climateRiskBand === 'LOW' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                    m.climateRiskBand === 'MODERATE' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                        'bg-red-500/10 text-red-400 border border-red-500/20'}`, children: m.climateRiskBand }) }), _jsx("td", { className: "py-3.5 px-4 text-center", children: _jsx("span", { className: "inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20", children: m.greenViabilityBand }) }), _jsx("td", { className: "py-3.5 px-4 text-right", children: _jsx(Link, { to: `/msmes/${m.id}`, className: "px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded border border-slate-700 transition-colors text-xs", children: "View Twin" }) })] }, m.id))) })] }) }) })] }));
}
//# sourceMappingURL=MsmesPage.js.map