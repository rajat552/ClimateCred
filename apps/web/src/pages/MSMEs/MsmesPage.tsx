import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function MsmesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sectorFilter, setSectorFilter] = useState('ALL')

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
  ]

  const filtered = msmeList.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchSector = sectorFilter === 'ALL' || m.sector.includes(sectorFilter)
    return matchSearch && matchSector
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">MSME Borrower Directory</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Registered micro, small, and medium enterprises with climate twin profiles
          </p>
        </div>
        <button className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-brand-600/20 flex items-center gap-2 transition-all self-start sm:self-auto cursor-pointer">
          <span className="material-symbols-outlined text-sm">domain_add</span>
          Register New MSME
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
        <div className="relative flex-1 w-full">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-500 text-sm">search</span>
          <input
            type="text"
            placeholder="Search by enterprise name, Udyam number, or district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-slate-950/60 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>
        <select
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
          className="w-full sm:w-auto px-3 py-1.5 bg-slate-950/60 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-brand-500"
        >
          <option value="ALL">All Sectors</option>
          <option value="Agri">Agriculture & Cold Storage</option>
          <option value="Renewable">Renewable Energy</option>
          <option value="Aqua">Aquaculture</option>
          <option value="Textiles">Textiles & Manufacturing</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-slate-900/60 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                <th className="py-3 px-4 font-semibold">Enterprise</th>
                <th className="py-3 px-4 font-semibold">Udyam Registration</th>
                <th className="py-3 px-4 font-semibold">Location</th>
                <th className="py-3 px-4 font-semibold">Turnover</th>
                <th className="py-3 px-4 font-semibold text-center">Climate Risk</th>
                <th className="py-3 px-4 font-semibold text-center">Green Viability</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-100">{m.name}</div>
                    <div className="text-[11px] text-slate-400">{m.sector}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300 text-[11px]">{m.regNumber}</td>
                  <td className="py-3.5 px-4 text-slate-300">{m.location}</td>
                  <td className="py-3.5 px-4 text-slate-200 font-medium">{m.turnover}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      m.climateRiskBand === 'LOW' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      m.climateRiskBand === 'MODERATE' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {m.climateRiskBand}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                      {m.greenViabilityBand}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to={`/msmes/${m.id}`}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded border border-slate-700 transition-colors text-xs"
                    >
                      View Twin
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
