import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface ClimateMapCluster {
  id: string
  name: string
  state: string
  lat: number
  lon: number
  msmeCount: number
  totalExposure: string
  avgCvi: number
  primaryHazard: string
  hazardColor: string
  trend: string
}

const CLUSTERS: ClimateMapCluster[] = [
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
]

export default function ClimateMapPage() {
  const [selectedCluster, setSelectedCluster] = useState<ClimateMapCluster>(CLUSTERS[0] as ClimateMapCluster)
  const [activeHazardFilter, setActiveHazardFilter] = useState<'ALL' | 'HEAT' | 'FLOOD' | 'DROUGHT'>('ALL')
  const [liveWeather, setLiveWeather] = useState<{ temp: number; humidity: number; conditions: string } | null>(null)

  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/climate/live?lat=${selectedCluster.lat}&lon=${selectedCluster.lon}&city=${selectedCluster.name.split(' ')[0]}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.telemetry) {
          setLiveWeather({
            temp: data.data.telemetry.temperature_c,
            humidity: data.data.telemetry.humidity_pct,
            conditions: data.data.telemetry.conditions,
          })
        }
      })
      .catch(() => {})
  }, [selectedCluster])

  const filteredClusters = CLUSTERS.filter((c) => {
    if (activeHazardFilter === 'HEAT') return c.primaryHazard.includes('Heat')
    if (activeHazardFilter === 'FLOOD') return c.primaryHazard.includes('Precipitation') || c.primaryHazard.includes('Inundation')
    if (activeHazardFilter === 'DROUGHT') return c.primaryHazard.includes('Drought')
    return true
  })

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Climate Intelligence</span>
            <span>/</span>
            <span className="text-brand-400 font-semibold">Physical Geo-Hazard Map</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            MSME Geo-Spatial Climate Vulnerability Map
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            ERA5 Reanalysis & IMD High-Resolution Gridded Climate Hazard Overlay across Lending Clusters
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['ALL', 'HEAT', 'FLOOD', 'DROUGHT'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveHazardFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                activeHazardFilter === filter
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map & Cluster Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map Canvas Simulation */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between min-h-[480px] relative overflow-hidden shadow-2xl">
          {/* Subtle Grid / Topo Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none"></div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-200">Live Satellite Hazard Feed (ERA5 + Sentinel-2)</span>
            </div>
            <span className="text-[11px] font-mono text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded border border-brand-500/20">
              Coverage: Pan-India MSME Corridors
            </span>
          </div>

          {/* Interactive Cluster Nodes */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto">
            {filteredClusters.map((cluster) => {
              const isSelected = selectedCluster.id === cluster.id
              return (
                <div
                  key={cluster.id}
                  onClick={() => setSelectedCluster(cluster)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800/90 border-brand-500 shadow-lg shadow-brand-500/10'
                      : 'bg-slate-950/60 border-slate-800/90 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">{cluster.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      cluster.avgCvi < 40
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      CVI: {cluster.avgCvi}/100
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center justify-between mt-1">
                    <span>{cluster.msmeCount} Borrowers • {cluster.totalExposure}</span>
                    <span className="text-brand-400 font-medium">{cluster.trend}</span>
                  </div>

                  <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-amber-400">warning</span>
                    <span>{cluster.primaryHazard}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Map Layer Legend */}
          <div className="relative z-10 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Low Risk (CVI &lt; 35)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Moderate (CVI 35-50)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> High Risk (CVI &gt; 50)
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">Resolution: 0.1° Gridded NetCDF</span>
          </div>
        </div>

        {/* Selected Cluster Deep-Dive */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5 shadow-xl">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-xs text-brand-400 font-mono">Cluster Inspector</span>
            <h2 className="text-lg font-bold text-white mt-0.5">{selectedCluster.name}</h2>
            <p className="text-xs text-slate-400">Lat: {selectedCluster.lat}°N, Lon: {selectedCluster.lon}°E</p>
          </div>

          {/* Live Telemetry Box */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200">Live Weather Telemetry</span>
              <span className="text-[10px] text-emerald-400 font-mono">OpenWeather Live Feed</span>
            </div>
            {liveWeather ? (
              <div className="grid grid-cols-2 gap-3 text-slate-300">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 block">Ambient Temp</span>
                  <span className="text-base font-bold text-amber-400">{liveWeather.temp}°C</span>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 block">Relative Humidity</span>
                  <span className="text-base font-bold text-blue-400">{liveWeather.humidity}%</span>
                </div>
              </div>
            ) : (
              <div className="text-slate-500 text-center py-2">Loading live telemetry...</div>
            )}
            <div className="text-[11px] text-slate-400">
              Sky Condition: <span className="text-slate-200 font-medium capitalize">{liveWeather?.conditions || 'Clear sky'}</span>
            </div>
          </div>

          {/* Key Vulnerability Metrics */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">Average Physical CVI:</span>
              <span className="font-bold text-emerald-400">{selectedCluster.avgCvi}/100</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">Active MSME Portfolio:</span>
              <span className="font-bold text-white">{selectedCluster.msmeCount} Enterprises</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">Total Sanctioned Exposure:</span>
              <span className="font-bold text-white">{selectedCluster.totalExposure}</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-slate-400">Primary Stress Driver:</span>
              <span className="font-medium text-amber-300">{selectedCluster.primaryHazard}</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/cases"
              className="w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-brand-600/20"
            >
              <span className="material-symbols-outlined text-sm">folder_open</span>
              View Loan Cases in this Cluster
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
