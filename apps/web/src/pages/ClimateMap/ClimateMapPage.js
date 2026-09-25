import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const CLUSTERS = [
    {
        id: 'c-nagpur',
        name: 'Nagpur - Wardha Agri & Cold Chain Cluster',
        state: 'Maharashtra',
        lat: 21.1458,
        lon: 79.0882,
        msmeCount: 48,
        totalExposure: '₹42.5 Cr',
        avgCvi: 38,
        primaryHazard: 'Extreme Heatwaves & Thermal Stress',
        hazardColor: 'amber',
        trend: '+4.2% YoY Heat Index',
    },
    {
        id: 'c-nashik',
        name: 'Nashik - Niphad Agro-Processing & Grape Hub',
        state: 'Maharashtra',
        lat: 19.9975,
        lon: 73.7898,
        msmeCount: 62,
        totalExposure: '₹68.2 Cr',
        avgCvi: 45,
        primaryHazard: 'Unseasonal Hail & Precipitation Anomaly',
        hazardColor: 'blue',
        trend: '+12% Monsoon Volatility',
    },
    {
        id: 'c-surat',
        name: 'Surat - Hazira Industrial & Textile Belt',
        state: 'Gujarat',
        lat: 21.1702,
        lon: 72.8311,
        msmeCount: 84,
        totalExposure: '₹95.0 Cr',
        avgCvi: 52,
        primaryHazard: 'Coastal Inundation & High Humidity Index',
        hazardColor: 'cyan',
        trend: '+8.1% Sea Surge Vulnerability',
    },
    {
        id: 'c-indore',
        name: 'Indore - Pithampur Auto-Component & Soya Cluster',
        state: 'Madhya Pradesh',
        lat: 22.7196,
        lon: 75.8577,
        msmeCount: 54,
        totalExposure: '₹51.3 Cr',
        avgCvi: 41,
        primaryHazard: 'Groundwater Depletion & SPEI Drought Stress',
        hazardColor: 'purple',
        trend: '-1.45 SPEI Drought Score',
    },
];
export default function ClimateMapPage() {
    const [selectedCluster, setSelectedCluster] = useState(CLUSTERS[0]);
    const [activeHazardFilter, setActiveHazardFilter] = useState('ALL');
    const [liveWeather, setLiveWeather] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:3001/api/v1/climate/live?lat=${selectedCluster.lat}&lon=${selectedCluster.lon}&city=${selectedCluster.name.split(' ')[0]}`)
            .then((res) => res.json())
            .then((data) => {
            if (data.success && data.data?.telemetry) {
                setLiveWeather({
                    temp: data.data.telemetry.temperature_c,
                    humidity: data.data.telemetry.humidity_pct,
                    conditions: data.data.telemetry.conditions,
                });
            }
        })
            .catch(() => { });
    }, [selectedCluster]);
    const filteredClusters = CLUSTERS.filter((c) => {
        if (activeHazardFilter === 'HEAT')
            return c.primaryHazard.includes('Heat');
        if (activeHazardFilter === 'FLOOD')
            return c.primaryHazard.includes('Precipitation') || c.primaryHazard.includes('Inundation');
        if (activeHazardFilter === 'DROUGHT')
            return c.primaryHazard.includes('Drought');
        return true;
    });
    return (_jsxs("div", { className: "space-y-6 animate-fade-in pb-12", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 text-xs text-slate-400 mb-1", children: [_jsx("span", { children: "Climate Intelligence" }), _jsx("span", { children: "/" }), _jsx("span", { className: "text-brand-400 font-semibold", children: "Physical Geo-Hazard Map" })] }), _jsx("h1", { className: "text-2xl font-bold text-white tracking-tight", children: "MSME Geo-Spatial Climate Vulnerability Map" }), _jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "ERA5 Reanalysis & IMD High-Resolution Gridded Climate Hazard Overlay across Lending Clusters" })] }), _jsx("div", { className: "flex items-center gap-2", children: ['ALL', 'HEAT', 'FLOOD', 'DROUGHT'].map((filter) => (_jsx("button", { onClick: () => setActiveHazardFilter(filter), className: `px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${activeHazardFilter === filter
                                ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/30'
                                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`, children: filter }, filter))) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between min-h-[480px] relative overflow-hidden shadow-2xl", children: [_jsx("div", { className: "absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" }), _jsxs("div", { className: "relative z-10 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" }), _jsx("span", { className: "text-xs font-semibold text-slate-200", children: "Live Satellite Hazard Feed (ERA5 + Sentinel-2)" })] }), _jsx("span", { className: "text-[11px] font-mono text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded border border-brand-500/20", children: "Coverage: Pan-India MSME Corridors" })] }), _jsx("div", { className: "relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto", children: filteredClusters.map((cluster) => {
                                    const isSelected = selectedCluster.id === cluster.id;
                                    return (_jsxs("div", { onClick: () => setSelectedCluster(cluster), className: `p-4 rounded-xl border transition-all cursor-pointer ${isSelected
                                            ? 'bg-slate-800/90 border-brand-500 shadow-lg shadow-brand-500/10'
                                            : 'bg-slate-950/60 border-slate-800/90 hover:bg-slate-800/50 hover:border-slate-700'}`, children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-xs font-bold text-white", children: cluster.name }), _jsxs("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded ${cluster.avgCvi < 40
                                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`, children: ["CVI: ", cluster.avgCvi, "/100"] })] }), _jsxs("div", { className: "text-[11px] text-slate-400 flex items-center justify-between mt-1", children: [_jsxs("span", { children: [cluster.msmeCount, " Borrowers \u2022 ", cluster.totalExposure] }), _jsx("span", { className: "text-brand-400 font-medium", children: cluster.trend })] }), _jsxs("div", { className: "mt-2 text-[10px] text-slate-400 flex items-center gap-1", children: [_jsx("span", { className: "material-symbols-outlined text-xs text-amber-400", children: "warning" }), _jsx("span", { children: cluster.primaryHazard })] })] }, cluster.id));
                                }) }), _jsxs("div", { className: "relative z-10 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-500" }), " Low Risk (CVI < 35)"] }), _jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-amber-500" }), " Moderate (CVI 35-50)"] }), _jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-red-500" }), " High Risk (CVI > 50)"] })] }), _jsx("span", { className: "text-[11px] font-mono text-slate-500", children: "Resolution: 0.1\u00B0 Gridded NetCDF" })] })] }), _jsxs("div", { className: "p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5 shadow-xl", children: [_jsxs("div", { className: "border-b border-slate-800 pb-3", children: [_jsx("span", { className: "text-xs text-brand-400 font-mono", children: "Cluster Inspector" }), _jsx("h2", { className: "text-lg font-bold text-white mt-0.5", children: selectedCluster.name }), _jsxs("p", { className: "text-xs text-slate-400", children: ["Lat: ", selectedCluster.lat, "\u00B0N, Lon: ", selectedCluster.lon, "\u00B0E"] })] }), _jsxs("div", { className: "p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3 text-xs", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "font-semibold text-slate-200", children: "Live Weather Telemetry" }), _jsx("span", { className: "text-[10px] text-emerald-400 font-mono", children: "OpenWeather Live Feed" })] }), liveWeather ? (_jsxs("div", { className: "grid grid-cols-2 gap-3 text-slate-300", children: [_jsxs("div", { className: "p-2.5 rounded bg-slate-900 border border-slate-800/80", children: [_jsx("span", { className: "text-[10px] text-slate-500 block", children: "Ambient Temp" }), _jsxs("span", { className: "text-base font-bold text-amber-400", children: [liveWeather.temp, "\u00B0C"] })] }), _jsxs("div", { className: "p-2.5 rounded bg-slate-900 border border-slate-800/80", children: [_jsx("span", { className: "text-[10px] text-slate-500 block", children: "Relative Humidity" }), _jsxs("span", { className: "text-base font-bold text-blue-400", children: [liveWeather.humidity, "%"] })] })] })) : (_jsx("div", { className: "text-slate-500 text-center py-2", children: "Loading live telemetry..." })), _jsxs("div", { className: "text-[11px] text-slate-400", children: ["Sky Condition: ", _jsx("span", { className: "text-slate-200 font-medium capitalize", children: liveWeather?.conditions || 'Clear sky' })] })] }), _jsxs("div", { className: "space-y-2 text-xs", children: [_jsxs("div", { className: "flex justify-between border-b border-slate-800/80 pb-2", children: [_jsx("span", { className: "text-slate-400", children: "Average Physical CVI:" }), _jsxs("span", { className: "font-bold text-emerald-400", children: [selectedCluster.avgCvi, "/100"] })] }), _jsxs("div", { className: "flex justify-between border-b border-slate-800/80 pb-2", children: [_jsx("span", { className: "text-slate-400", children: "Active MSME Portfolio:" }), _jsxs("span", { className: "font-bold text-white", children: [selectedCluster.msmeCount, " Enterprises"] })] }), _jsxs("div", { className: "flex justify-between border-b border-slate-800/80 pb-2", children: [_jsx("span", { className: "text-slate-400", children: "Total Sanctioned Exposure:" }), _jsx("span", { className: "font-bold text-white", children: selectedCluster.totalExposure })] }), _jsxs("div", { className: "flex justify-between pb-1", children: [_jsx("span", { className: "text-slate-400", children: "Primary Stress Driver:" }), _jsx("span", { className: "font-medium text-amber-300", children: selectedCluster.primaryHazard })] })] }), _jsx("div", { className: "pt-2", children: _jsxs(Link, { to: "/cases", className: "w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-brand-600/20", children: [_jsx("span", { className: "material-symbols-outlined text-sm", children: "folder_open" }), "View Loan Cases in this Cluster"] }) })] })] })] }));
}
//# sourceMappingURL=ClimateMapPage.js.map