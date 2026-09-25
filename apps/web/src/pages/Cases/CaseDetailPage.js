import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export default function CaseDetailPage() {
    const { caseId } = useParams();
    const [activeTab, setActiveTab] = useState('overview');
    const [stressHeatwave, setStressHeatwave] = useState(25);
    const [stressFlood, setStressFlood] = useState(15);
    const [stressDieselPrice, setStressDieselPrice] = useState(20);
    const [isCamModalOpen, setIsCamModalOpen] = useState(false);
    const [isSanctioned, setIsSanctioned] = useState(false);
    const [auditLogs, setAuditLogs] = useState([
        { time: '2026-09-25 18:30:12', user: 'Rohan Sharma (Credit Officer)', action: 'Reviewed preliminary CVI/GVS alignment' },
        { time: '2026-09-25 17:15:00', user: 'Engine Service', action: 'Computed GVS score: 82/100 (Model v1.4.0)' },
        { time: '2026-09-25 17:14:45', user: 'Engine Service', action: 'Computed CVI score: 34/100 (Model v1.2.1)' },
        { time: '2026-09-24 11:20:10', user: 'Rohan Sharma', action: 'Created loan case case-001 for MSME msme-001' },
    ]);
    // Live Climate Telemetry state
    const [climateData, setClimateData] = useState(null);
    const [isClimateLoading, setIsClimateLoading] = useState(true);
    // AI Copilot state
    const [copilotLoading, setCopilotLoading] = useState(false);
    const [copilotSynthesis, setCopilotSynthesis] = useState(null);
    const [copilotEngine, setCopilotEngine] = useState('Ready for Analysis');
    const [copilotQuery, setCopilotQuery] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [chatLoading, setChatLoading] = useState(false);
    // Fetch Live Weather & Climate Hazard on Mount
    useEffect(() => {
        fetch('http://localhost:3001/api/v1/climate/live?lat=21.1458&lon=79.0882&city=Nagpur')
            .then((res) => res.json())
            .then((json) => {
            if (json.success) {
                setClimateData(json.data);
            }
        })
            .catch((err) => console.warn('Failed to load live climate data:', err))
            .finally(() => setIsClimateLoading(false));
    }, []);
    // Dynamic calculations for scenario simulation
    const postGreenDscr = 2.18;
    const stressedDscr = Math.max(0.82, postGreenDscr - (stressHeatwave * 0.010) - (stressFlood * 0.012) - (stressDieselPrice * 0.008)).toFixed(2);
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
    };
    // Trigger Gemini Copilot Live Memo
    const generateLiveCopilotMemo = async () => {
        setCopilotLoading(true);
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
            });
            const result = await response.json();
            if (result.success && result.data) {
                setCopilotSynthesis(result.data.aiSynthesis);
                setCopilotEngine(result.data.metadata?.copilotEngine || 'Google Gemini 1.5 Flash');
            }
        }
        catch (err) {
            console.error('Copilot memo error:', err);
        }
        finally {
            setCopilotLoading(false);
        }
    };
    // Ask Copilot Chat
    const handleSendQuery = async (e) => {
        e.preventDefault();
        if (!copilotQuery.trim())
            return;
        const query = copilotQuery;
        setCopilotQuery('');
        setChatMessages((prev) => [...prev, { sender: 'officer', text: query }]);
        setChatLoading(true);
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
            });
            const result = await response.json();
            if (result.success && result.data) {
                setChatMessages((prev) => [
                    ...prev,
                    { sender: 'copilot', text: result.data.reply },
                ]);
            }
        }
        catch (err) {
            console.error('Chat error:', err);
        }
        finally {
            setChatLoading(false);
        }
    };
    const handleExecuteSanction = () => {
        setIsSanctioned(true);
        const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
        setAuditLogs((prev) => [
            {
                time: now,
                user: 'Rohan Sharma (Credit Officer)',
                action: `Sanction executed with 35 bps green pricing concession. Stressed DSCR ${stressedDscr}x logged to immutable audit ledger.`,
            },
            ...prev,
        ]);
    };
    return (_jsxs("div", { className: "space-y-6 animate-fade-in pb-12", children: [_jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 text-xs text-slate-400 mb-1", children: [_jsx(Link, { to: "/cases", className: "hover:text-slate-200", children: "Loan Cases" }), _jsx("span", { children: "/" }), _jsx("span", { className: "font-mono text-brand-400 font-semibold", children: caseId || 'case-001' }), _jsx("span", { children: "\u2022" }), _jsx("span", { className: "text-slate-300", children: "Annapurna Agro-Cold Storage" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("h1", { className: "text-2xl font-bold text-white tracking-tight", children: "\u20B935,00,000 \u2014 80kW Solar PV + PCM Cold-Chain Upgrade" }), _jsx("span", { className: `px-2.5 py-0.5 rounded-full text-xs font-bold border ${isSanctioned ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-brand-500/10 text-brand-400 border-brand-500/20'}`, children: isSanctioned ? 'SANCTIONED & DISBURSED' : 'STATUS: APPROVED FOR SANCTION' })] }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Primary Borrower: Annapurna Agro (UDYAM-MH-12-0049281) \u2022 Branch: Nagpur Central \u2022 Lead Officer: Rohan Sharma" })] }), _jsxs("div", { className: "flex items-center gap-2 self-start lg:self-auto", children: [_jsxs("button", { onClick: () => setIsCamModalOpen(true), className: "px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm", children: [_jsx("span", { className: "material-symbols-outlined text-sm", children: "description" }), "View Credit Appraisal Memo (CAM)"] }), _jsxs("button", { onClick: handleExecuteSanction, disabled: isSanctioned, className: "px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-lg shadow-brand-600/20 transition-all cursor-pointer disabled:opacity-60", children: [_jsx("span", { className: "material-symbols-outlined text-sm", children: isSanctioned ? 'check_circle' : 'verified_user' }), isSanctioned ? 'Loan Sanctioned' : 'Execute Green Sanction'] })] })] }), _jsxs("div", { className: "p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" }), _jsx("span", { className: "font-semibold text-slate-200", children: "Live Geo-Hazard Telemetry:" }), _jsx("span", { className: "text-slate-400", children: "Nagpur Facility (21.14\u00B0N, 79.08\u00B0E)" })] }), isClimateLoading ? (_jsx("span", { className: "text-slate-400", children: "Connecting to OpenWeather & ERA5 station feeds..." })) : climateData ? (_jsxs("div", { className: "flex items-center gap-4 text-slate-300", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "material-symbols-outlined text-amber-400 text-sm", children: "thermostat" }), _jsxs("span", { children: [_jsxs("strong", { children: [climateData.telemetry.temperature_c, "\u00B0C"] }), " (", climateData.telemetry.conditions, ")"] })] }), _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "material-symbols-outlined text-blue-400 text-sm", children: "humidity_mid" }), _jsxs("span", { children: [_jsxs("strong", { children: [climateData.telemetry.humidity_pct, "%"] }), " Humidity"] })] }), _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "material-symbols-outlined text-teal-400 text-sm", children: "air" }), _jsxs("span", { children: [_jsxs("strong", { children: [climateData.telemetry.wind_speed_kmh, " km/h"] }), " Wind"] })] }), _jsx("span", { className: "px-2 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20 font-mono text-[11px]", children: climateData.metadata.dataSource })] })) : null] }), _jsx("div", { className: "flex items-center gap-1 border-b border-slate-800 overflow-x-auto text-xs pb-1", children: [
                    { id: 'overview', label: 'Executive Synthesis', icon: 'dashboard' },
                    { id: 'cvi', label: 'Climate Vulnerability (CVI)', icon: 'warning' },
                    { id: 'gvs', label: 'Green Viability (GVS)', icon: 'eco' },
                    { id: 'scenario', label: 'Stress-Test Simulator', icon: 'tune' },
                    { id: 'evidence', label: 'Geospatial Proof & Evidence', icon: 'satellite_alt' },
                    { id: 'copilot', label: 'Officer AI Copilot', icon: 'smart_toy' },
                    { id: 'audit', label: 'Audit Trail', icon: 'history' },
                ].map((tab) => (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: `px-3.5 py-2 rounded-lg font-medium flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${activeTab === tab.id
                        ? 'bg-brand-600/15 text-brand-400 border border-brand-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'}`, children: [_jsx("span", { className: "material-symbols-outlined text-sm", children: tab.icon }), tab.label] }, tab.id))) }), activeTab === 'overview' && (_jsxs("div", { className: "space-y-6 animate-fade-in", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1", children: [_jsx("span", { className: "text-slate-400 text-xs font-medium", children: "Climate Vulnerability Index" }), _jsxs("div", { className: "text-2xl font-bold text-emerald-400 flex items-baseline gap-2", children: ["34 ", _jsx("span", { className: "text-xs text-slate-400 font-normal", children: "/ 100 (Moderate Risk)" })] }), _jsx("p", { className: "text-[11px] text-slate-400", children: "Regional benchmark: 52/100 (Top 15% safety quartile)" })] }), _jsxs("div", { className: "p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1", children: [_jsx("span", { className: "text-slate-400 text-xs font-medium", children: "Green Viability Score" }), _jsxs("div", { className: "text-2xl font-bold text-brand-400 flex items-baseline gap-2", children: ["82 ", _jsx("span", { className: "text-xs text-slate-400 font-normal", children: "/ 100 (Tier-1 Bankable)" })] }), _jsx("p", { className: "text-[11px] text-slate-400", children: "Qualifies for -35 bps RBI green refinance subvention" })] }), _jsxs("div", { className: "p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1", children: [_jsx("span", { className: "text-slate-400 text-xs font-medium", children: "Stressed DSCR" }), _jsxs("div", { className: "text-2xl font-bold text-blue-400 flex items-baseline gap-2", children: [stressedDscr, "x ", _jsx("span", { className: "text-xs text-slate-400 font-normal", children: "(Covenant: >1.20x)" })] }), _jsxs("p", { className: "text-[11px] text-emerald-400 flex items-center gap-1", children: [_jsx("span", { className: "material-symbols-outlined text-xs", children: "verified" }), "Adequate Debt Service Cushion"] })] }), _jsxs("div", { className: "p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1", children: [_jsx("span", { className: "text-slate-400 text-xs font-medium", children: "Avoided Carbon & Payback" }), _jsxs("div", { className: "text-2xl font-bold text-white flex items-baseline gap-2", children: ["74.2 ", _jsx("span", { className: "text-xs text-slate-400 font-normal", children: "tCO\u2082e/yr (3.4 yr Payback)" })] }), _jsx("p", { className: "text-[11px] text-slate-400", children: "Project IRR: 23.4% \u2022 100% Tax Depreciation Eligible" })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-white", children: "5-Year DSCR Trajectory Under Stress" }), _jsx("p", { className: "text-xs text-slate-400", children: "Comparison of Baseline, Green Project, and Active Scenario" })] }), _jsx(Link, { to: "#", onClick: () => setActiveTab('scenario'), className: "text-xs text-brand-400 hover:underline", children: "Adjust Scenario \u2192" })] }), _jsx("div", { className: "h-64", children: _jsx(Bar, { data: dscrChartData, options: {
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
                                            } }) })] }), _jsxs("div", { className: "p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4", children: [_jsx("h3", { className: "text-sm font-semibold text-white", children: "Credit Appraisal Decision Summary" }), _jsxs("div", { className: "space-y-3 text-xs", children: [_jsxs("div", { className: "p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300", children: [_jsxs("div", { className: "font-bold flex items-center gap-1.5", children: [_jsx("span", { className: "material-symbols-outlined text-sm", children: "check_circle" }), "Sanction Recommended"] }), _jsx("p", { className: "text-[11px] text-emerald-200/80 mt-1", children: "Solar + PCM retrofit reduces grid tariff vulnerability and protects cold-storage operations from Nagpur extreme heat events." })] }), _jsxs("div", { className: "space-y-2 text-slate-300", children: [_jsxs("div", { className: "flex justify-between border-b border-slate-800 pb-1.5", children: [_jsx("span", { className: "text-slate-400", children: "Proposed Loan:" }), _jsx("span", { className: "font-mono font-semibold text-white", children: "\u20B935,00,000" })] }), _jsxs("div", { className: "flex justify-between border-b border-slate-800 pb-1.5", children: [_jsx("span", { className: "text-slate-400", children: "Sanction Interest Rate:" }), _jsx("span", { className: "font-mono font-semibold text-emerald-400", children: "8.65% (-35 bps rebate)" })] }), _jsxs("div", { className: "flex justify-between border-b border-slate-800 pb-1.5", children: [_jsx("span", { className: "text-slate-400", children: "Repayment Tenor:" }), _jsx("span", { className: "font-semibold text-white", children: "60 Months (6 mo moratorium)" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-400", children: "Primary Collateral:" }), _jsx("span", { className: "font-semibold text-white", children: "Hypothecation of Solar Asset + Plant" })] })] })] })] })] })] })), activeTab === 'cvi' && (_jsxs("div", { className: "p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6 animate-fade-in", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-base font-semibold text-white", children: "Climate Vulnerability Index (CVI) Decomposition" }), _jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "Deterministic ISO 14091 / IPCC AR6 physical hazard and exposure modeling for Nagpur facility." })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 text-xs", children: [_jsxs("div", { className: "p-4 bg-slate-950/60 rounded-xl border border-slate-800", children: [_jsx("span", { className: "text-slate-400 block", children: "1. Physical Hazard (H)" }), _jsx("div", { className: "text-xl font-bold text-amber-400 mt-1", children: "48 / 100" }), _jsx("p", { className: "text-[11px] text-slate-400 mt-1", children: "42.5 days > 35\u00B0C heatwaves per annum in Nagpur district." })] }), _jsxs("div", { className: "p-4 bg-slate-950/60 rounded-xl border border-slate-800", children: [_jsx("span", { className: "text-slate-400 block", children: "2. Asset Exposure (E)" }), _jsx("div", { className: "text-xl font-bold text-blue-400 mt-1", children: "36 / 100" }), _jsx("p", { className: "text-[11px] text-slate-400 mt-1", children: "24,000 sq.ft cold warehouse with insulated roof." })] }), _jsxs("div", { className: "p-4 bg-slate-950/60 rounded-xl border border-slate-800", children: [_jsx("span", { className: "text-slate-400 block", children: "3. Sensitivity (S)" }), _jsx("div", { className: "text-xl font-bold text-purple-400 mt-1", children: "54 / 100" }), _jsx("p", { className: "text-[11px] text-slate-400 mt-1", children: "Perishable horticulture crop spoilage if chillers lose power." })] }), _jsxs("div", { className: "p-4 bg-slate-950/60 rounded-xl border border-slate-800", children: [_jsx("span", { className: "text-slate-400 block", children: "4. Adaptive Capacity (AC)" }), _jsx("div", { className: "text-xl font-bold text-emerald-400 mt-1", children: "72 / 100" }), _jsx("p", { className: "text-[11px] text-slate-400 mt-1", children: "Proposed 80kW Solar + PCM unit drastically boosts adaptation." })] })] })] })), activeTab === 'gvs' && (_jsxs("div", { className: "p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6 animate-fade-in", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-base font-semibold text-white", children: "Green Viability Score (GVS) Breakdown" }), _jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "Deterministic transition economics and RBI Green Lending Framework alignment." })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 text-xs", children: [_jsxs("div", { className: "p-4 bg-slate-950/60 rounded-xl border border-slate-800", children: [_jsx("span", { className: "text-slate-400 block", children: "Green Taxonomy Alignment" }), _jsx("div", { className: "text-xl font-bold text-brand-400 mt-1", children: "92%" }), _jsx("p", { className: "text-[11px] text-slate-400 mt-1", children: "100% compliant with RBI taxonomy for Renewable & Storage capex." })] }), _jsxs("div", { className: "p-4 bg-slate-950/60 rounded-xl border border-slate-800", children: [_jsx("span", { className: "text-slate-400 block", children: "Avoided Carbon Intensity" }), _jsx("div", { className: "text-xl font-bold text-emerald-400 mt-1", children: "74.2 tCO\u2082e/yr" }), _jsx("p", { className: "text-[11px] text-slate-400 mt-1", children: "Replaces 120,000 kWh of coal-heavy MSEDCL grid electricity." })] }), _jsxs("div", { className: "p-4 bg-slate-950/60 rounded-xl border border-slate-800", children: [_jsx("span", { className: "text-slate-400 block", children: "Payback Period" }), _jsx("div", { className: "text-xl font-bold text-white mt-1", children: "3.4 Years" }), _jsx("p", { className: "text-[11px] text-slate-400 mt-1", children: "Rapid capex amortization via \u20B910.2 Lakhs annual power savings." })] }), _jsxs("div", { className: "p-4 bg-slate-950/60 rounded-xl border border-slate-800", children: [_jsx("span", { className: "text-slate-400 block", children: "Viability Spread" }), _jsx("div", { className: "text-xl font-bold text-blue-400 mt-1", children: "+14.75%" }), _jsx("p", { className: "text-[11px] text-slate-400 mt-1", children: "Project IRR (23.4%) exceeds WACC (8.65%) by large margin." })] })] })] })), activeTab === 'scenario' && (_jsxs("div", { className: "p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6 animate-fade-in", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-base font-semibold text-white", children: "Dynamic Climate Stress-Test Simulator" }), _jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "Simulate climate hazard shocks on borrower EBITDA, DSCR, and debt servicing probability in real time." })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-slate-950/60 rounded-xl border border-slate-800", children: [_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { className: "text-slate-300 font-medium", children: "Heatwave Severity Shock" }), _jsxs("span", { className: "text-amber-400 font-bold", children: ["+", stressHeatwave, "% Above Baseline"] })] }), _jsx("input", { type: "range", min: "0", max: "60", value: stressHeatwave, onChange: (e) => setStressHeatwave(Number(e.target.value)), className: "w-full accent-amber-500 cursor-pointer" }), _jsx("p", { className: "text-[10px] text-slate-500", children: "Increases diesel backup runtime and compressor cooling load." })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { className: "text-slate-300 font-medium", children: "Monsoon Flood Shock" }), _jsxs("span", { className: "text-blue-400 font-bold", children: ["+", stressFlood, "% Precipitation Anomaly"] })] }), _jsx("input", { type: "range", min: "0", max: "50", value: stressFlood, onChange: (e) => setStressFlood(Number(e.target.value)), className: "w-full accent-blue-500 cursor-pointer" }), _jsx("p", { className: "text-[10px] text-slate-500", children: "Simulates transit disruption and agri supply spoilage." })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { className: "text-slate-300 font-medium", children: "Diesel / Grid Fuel Tariff Spike" }), _jsxs("span", { className: "text-purple-400 font-bold", children: ["+", stressDieselPrice, "% Tariff Hike"] })] }), _jsx("input", { type: "range", min: "0", max: "50", value: stressDieselPrice, onChange: (e) => setStressDieselPrice(Number(e.target.value)), className: "w-full accent-purple-500 cursor-pointer" }), _jsx("p", { className: "text-[10px] text-slate-500", children: "Tests power expenditure hedge effectiveness." })] })] }), _jsxs("div", { className: "p-5 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("span", { className: "text-xs text-slate-400 block", children: "Stressed DSCR under current active scenario:" }), _jsxs("div", { className: "flex items-baseline gap-2 mt-1", children: [_jsxs("span", { className: `text-3xl font-bold ${Number(stressedDscr) >= 1.25 ? 'text-emerald-400' : 'text-red-400'}`, children: [stressedDscr, "x"] }), _jsx("span", { className: "text-xs text-slate-400", children: "(Baseline: 1.84x \u2022 Post-Project: 2.18x \u2022 Covenant Floor: 1.20x)" })] })] }), _jsx("div", { children: _jsxs("span", { className: `px-4 py-2 rounded-lg text-xs font-bold border inline-flex items-center gap-1.5 ${Number(stressedDscr) >= 1.25 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'}`, children: [_jsx("span", { className: "material-symbols-outlined text-sm", children: Number(stressedDscr) >= 1.25 ? 'check_circle' : 'cancel' }), Number(stressedDscr) >= 1.25 ? 'COVENANT PASS (BUFFER ADEQUATE)' : 'COVENANT BREACH RISK'] }) })] })] })), activeTab === 'evidence' && (_jsxs("div", { className: "p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4 animate-fade-in", children: [_jsx("h2", { className: "text-base font-semibold text-white", children: "Geospatial Evidence & Document Proof" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs", children: [_jsxs("div", { className: "p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "font-semibold text-slate-200 flex items-center gap-1.5", children: [_jsx("span", { className: "material-symbols-outlined text-brand-400 text-sm", children: "satellite_alt" }), "Sentinel-2 Rooftop Solar Proof"] }), _jsx("span", { className: "text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-500/20", children: "VERIFIED" })] }), _jsx("p", { className: "text-slate-400 text-[11px]", children: "10m resolution spectral analysis confirmed 2,200 sq.m unobstructed roof surface facing south-southwest." }), _jsx("div", { className: "font-mono text-[10px] text-slate-500", children: "SHA-256: 8f4a1c9e2b7d301...99e2" })] }), _jsxs("div", { className: "p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "font-semibold text-slate-200 flex items-center gap-1.5", children: [_jsx("span", { className: "material-symbols-outlined text-brand-400 text-sm", children: "receipt_long" }), "Udyam & Power Bill Audit"] }), _jsx("span", { className: "text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-500/20", children: "VERIFIED" })] }), _jsx("p", { className: "text-slate-400 text-[11px]", children: "Past 12-month MSEDCL electricity bills verified. Peak connected load: 120 kVA at \u20B99.40/kWh tariff." }), _jsx("div", { className: "font-mono text-[10px] text-slate-500", children: "SHA-256: e3b0c44298fc1c1...82b4" })] })] })] })), activeTab === 'copilot' && (_jsxs("div", { className: "p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6 animate-fade-in", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-base font-semibold text-white flex items-center gap-2", children: [_jsx("span", { className: "material-symbols-outlined text-brand-400", children: "smart_toy" }), "Credit Officer AI Underwriting Copilot"] }), _jsx("p", { className: "text-xs text-slate-400", children: "Contextual synthesis of CVI, GVS, and borrower financials powered by Gemini" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20", children: ["Engine: ", copilotEngine] }), _jsxs("button", { onClick: generateLiveCopilotMemo, disabled: copilotLoading, className: "px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-60 shadow-sm shadow-brand-600/20", children: [_jsx("span", { className: "material-symbols-outlined text-sm", children: copilotLoading ? 'sync' : 'auto_awesome' }), copilotLoading ? 'Synthesizing...' : 'Generate CAM Memo'] })] })] }), _jsxs("div", { className: "p-5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-3 leading-relaxed whitespace-pre-line", children: [_jsxs("div", { className: "font-bold text-slate-100 flex items-center gap-2", children: [_jsx("span", { className: "material-symbols-outlined text-brand-400 text-sm", children: "assignment" }), "Credit Officer Recommendation Memo:"] }), copilotSynthesis ? (_jsx("div", { className: "text-slate-200", children: copilotSynthesis })) : (_jsxs("div", { className: "text-slate-400 space-y-2", children: [_jsxs("p", { children: ["1. ", _jsx("strong", { children: "Climate Risk Assessment:" }), " The unit in Nagpur exhibits moderate physical heatwave exposure (CVI 34/100). The proposed solar + PCM solution directly hedges against peak summer diesel expenses."] }), _jsxs("p", { children: ["2. ", _jsx("strong", { children: "Financial Viability:" }), " Base DSCR improves from 1.84x to 2.18x post-retrofit. Under severe heatwave stress test (+", stressHeatwave, "%), DSCR remains robust at ", stressedDscr, "x, exceeding the 1.20x institutional covenant threshold."] }), _jsxs("p", { children: ["3. ", _jsx("strong", { children: "Sanction Condition:" }), " Recommended for sanction with a 35 bps green interest rate rebate under RBI Green Lending Guidelines."] })] }))] }), _jsxs("div", { className: "space-y-3 pt-2", children: [_jsx("h3", { className: "text-xs font-semibold text-slate-200", children: "Ask the Underwriting Copilot:" }), _jsx("div", { className: "space-y-2 max-h-56 overflow-y-auto", children: chatMessages.map((msg, idx) => (_jsxs("div", { className: `p-3 rounded-lg text-xs ${msg.sender === 'officer'
                                        ? 'bg-slate-800/80 text-white ml-8'
                                        : 'bg-brand-950/40 border border-brand-500/20 text-slate-200 mr-8'}`, children: [_jsx("span", { className: "font-semibold block text-[10px] text-slate-400 mb-1", children: msg.sender === 'officer' ? 'You (Credit Officer)' : 'ClimateTwin AI Copilot' }), msg.text] }, idx))) }), _jsxs("form", { onSubmit: handleSendQuery, className: "flex gap-2", children: [_jsx("input", { type: "text", value: copilotQuery, onChange: (e) => setCopilotQuery(e.target.value), placeholder: "e.g. How does +30% heat shock impact the borrower's debt service capacity?", className: "flex-1 px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-brand-500" }), _jsxs("button", { type: "submit", disabled: chatLoading || !copilotQuery.trim(), className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50", children: [_jsx("span", { className: "material-symbols-outlined text-sm", children: chatLoading ? 'sync' : 'send' }), "Send"] })] })] })] })), activeTab === 'audit' && (_jsxs("div", { className: "p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4 animate-fade-in", children: [_jsx("h2", { className: "text-base font-semibold text-white", children: "Immutable Underwriting Audit Ledger" }), _jsx("div", { className: "space-y-2 text-xs", children: auditLogs.map((log, i) => (_jsx("div", { className: "p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 flex items-center justify-between", children: _jsxs("div", { children: [_jsx("span", { className: "font-mono text-slate-500 text-[11px] mr-3", children: log.time }), _jsxs("span", { className: "font-semibold text-slate-200 mr-2", children: [log.user, ":"] }), _jsx("span", { className: "text-slate-300", children: log.action })] }) }, i))) })] })), isCamModalOpen && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in", children: _jsxs("div", { className: "w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto text-xs text-slate-300", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-base font-bold text-white", children: "Credit Appraisal Memo (CAM) \u2014 Climate & Green Viability" }), _jsx("span", { className: "text-[11px] text-slate-400 font-mono", children: "Ref: CAM/2026/LN-0891 \u2022 Annapurna Agro-Cold Storage" })] }), _jsx("button", { onClick: () => setIsCamModalOpen(false), className: "p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white", children: _jsx("span", { className: "material-symbols-outlined text-sm", children: "close" }) })] }), _jsxs("div", { className: "p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 leading-relaxed", children: [_jsx("div", { className: "font-bold text-white text-sm", children: "Borrower: Annapurna Agro-Cold Storage (UDYAM-MH-12-0049281)" }), _jsx("p", { children: "Facility Requested: \u20B935,00,000 (80kW Solar PV + PCM Retrofit) \u2022 Tenor: 60 Months \u2022 Sanction Rate: 8.65% (Net of 35 bps green subvention)" }), _jsxs("p", { children: ["CVI Climate Vulnerability: 34/100 (Moderate) \u2022 GVS Green Viability: 82/100 (Tier-1 Bankable) \u2022 Stressed DSCR: ", stressedDscr, "x"] }), _jsx("p", { children: "Regulatory Compliance: Certified under RBI Green Lending Framework and SEBI BRSR Core guidelines." })] }), _jsxs("div", { className: "flex justify-end gap-3 pt-2", children: [_jsxs("button", { onClick: () => window.print(), className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 cursor-pointer font-medium", children: [_jsx("span", { className: "material-symbols-outlined text-sm", children: "print" }), "Print PDF"] }), _jsx("button", { onClick: () => setIsCamModalOpen(false), className: "px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg cursor-pointer font-semibold", children: "Done" })] })] }) }))] }));
}
//# sourceMappingURL=CaseDetailPage.js.map