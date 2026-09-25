import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const AUDIT_EVENTS = [
    {
        id: 'aud-001',
        timestamp: '2026-09-25 18:30:12 UTC',
        actor: 'Rohan Sharma',
        role: 'Lead Credit Officer',
        action: 'Approved green loan facility (₹35 Lakhs) with 35 bps subvention discount',
        entityType: 'LOAN_CASE',
        entityId: 'case-001 (Annapurna Agro)',
        hash: 'a3f89e21...8bc9',
        status: 'VERIFIED',
    },
    {
        id: 'aud-002',
        timestamp: '2026-09-25 18:25:40 UTC',
        actor: 'ClimateTwin Copilot (Gemini 2.5)',
        role: 'AI Engine',
        action: 'Synthesized Credit Appraisal Memo (CAM) & validated DSCR stress buffer (1.56x)',
        entityType: 'COPILOT_SYNTHESIS',
        entityId: 'cam-2026-0891',
        hash: 'c74b12aa...90f1',
        status: 'VERIFIED',
    },
    {
        id: 'aud-003',
        timestamp: '2026-09-25 17:15:00 UTC',
        actor: 'GVS Engine v1.4.0',
        role: 'System',
        action: 'Computed Green Viability Score: 82/100 (92% Taxonomy alignment, 74.2 tCO2e/yr)',
        entityType: 'GVS_SNAPSHOT',
        entityId: 'gvs-001',
        hash: '8f4a1c9e...99e2',
        status: 'VERIFIED',
    },
    {
        id: 'aud-004',
        timestamp: '2026-09-25 17:14:45 UTC',
        actor: 'CVI Hazard Engine v1.2.1',
        role: 'System',
        action: 'Computed Physical Climate Vulnerability: 34/100 (ISO 14091 calibrated)',
        entityType: 'CVI_SNAPSHOT',
        entityId: 'cvi-001',
        hash: 'e3b0c442...82b4',
        status: 'VERIFIED',
    },
    {
        id: 'aud-005',
        timestamp: '2026-09-24 14:10:00 UTC',
        actor: 'Priya Patel',
        role: 'Risk Manager',
        action: 'Verified Sentinel-2 rooftop solar footprint & MSEDCL historical utility bills',
        entityType: 'EVIDENCE_RECORD',
        entityId: 'evi-solar-001',
        hash: '5d41402a...67c2',
        status: 'VERIFIED',
    },
    {
        id: 'aud-006',
        timestamp: '2026-09-24 11:20:10 UTC',
        actor: 'Rohan Sharma',
        role: 'Lead Credit Officer',
        action: 'Ingested MSME onboarding application & Udyam certificate UDYAM-MH-12-0049281',
        entityType: 'MSME_ONBOARDING',
        entityId: 'msme-001',
        hash: '9b71d224...00a1',
        status: 'VERIFIED',
    },
];
export default function AuditPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('ALL');
    const filtered = AUDIT_EVENTS.filter((e) => {
        const matchesSearch = e.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.entityId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'ALL' || e.role.includes(filterRole);
        return matchesSearch && matchesRole;
    });
    return (_jsxs("div", { className: "space-y-6 animate-fade-in pb-12", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 text-xs text-slate-400 mb-1", children: [_jsx("span", { children: "Governance & Compliance" }), _jsx("span", { children: "/" }), _jsx("span", { className: "text-brand-400 font-semibold", children: "Immutable Audit Trail" })] }), _jsx("h1", { className: "text-2xl font-bold text-white tracking-tight", children: "Institutional Underwriting Audit Ledger" }), _jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "Cryptographically sealed timeline of all underwriting actions, model runs, and credit decisions." })] }), _jsx("div", { className: "flex items-center gap-2", children: _jsxs("button", { onClick: () => window.print(), className: "px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer", children: [_jsx("span", { className: "material-symbols-outlined text-sm", children: "print" }), "Export Compliance Audit Log"] }) })] }), _jsxs("div", { className: "p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between text-xs", children: [_jsx("div", { className: "w-full sm:w-80", children: _jsx("input", { type: "text", placeholder: "Search by actor, case ID, or action...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-brand-500" }) }), _jsx("div", { className: "flex items-center gap-2 w-full sm:w-auto overflow-x-auto", children: ['ALL', 'Credit Officer', 'Risk Manager', 'System', 'AI Engine'].map((role) => (_jsx("button", { onClick: () => setFilterRole(role), className: `px-3 py-1.5 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-all ${filterRole === role
                                ? 'bg-brand-600/15 text-brand-400 border border-brand-500/30'
                                : 'text-slate-400 hover:text-white bg-slate-800/40'}`, children: role }, role))) })] }), _jsx("div", { className: "rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left text-xs text-slate-300", children: [_jsx("thead", { className: "bg-slate-950/80 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider font-semibold", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3.5", children: "Timestamp (UTC)" }), _jsx("th", { className: "px-4 py-3.5", children: "Actor & Role" }), _jsx("th", { className: "px-4 py-3.5", children: "Action Executed" }), _jsx("th", { className: "px-4 py-3.5", children: "Entity Reference" }), _jsx("th", { className: "px-4 py-3.5", children: "Cryptographic SHA-256" }), _jsx("th", { className: "px-4 py-3.5 text-right", children: "Integrity" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-800/80", children: filtered.map((item) => (_jsxs("tr", { className: "hover:bg-slate-800/30 transition-colors", children: [_jsx("td", { className: "px-4 py-3 font-mono text-[11px] text-slate-400 whitespace-nowrap", children: item.timestamp }), _jsxs("td", { className: "px-4 py-3 whitespace-nowrap", children: [_jsx("div", { className: "font-semibold text-white", children: item.actor }), _jsx("div", { className: "text-[10px] text-slate-500", children: item.role })] }), _jsx("td", { className: "px-4 py-3 text-slate-200", children: item.action }), _jsx("td", { className: "px-4 py-3 font-mono text-[11px] text-brand-400 whitespace-nowrap", children: item.entityId }), _jsx("td", { className: "px-4 py-3 font-mono text-[11px] text-slate-500 whitespace-nowrap", children: item.hash }), _jsx("td", { className: "px-4 py-3 text-right whitespace-nowrap", children: _jsx("span", { className: "px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold", children: item.status }) })] }, item.id))) })] }) }) })] }));
}
//# sourceMappingURL=AuditPage.js.map