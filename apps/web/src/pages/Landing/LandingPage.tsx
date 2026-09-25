import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-brand-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-emerald-400 p-0.5 shadow-lg shadow-brand-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="material-symbols-outlined text-brand-400 text-xl">eco</span>
              </div>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white">Climate<span className="text-brand-400">Twin</span></span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 uppercase tracking-wider">
                MSME Underwriting Intelligence
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
              <a href="#how-it-works" className="hover:text-brand-400 transition-colors">How It Works</a>
              <a href="#cvi-engine" className="hover:text-brand-400 transition-colors">CVI Engine</a>
              <a href="#gvs-engine" className="hover:text-brand-400 transition-colors">GVS Viability</a>
              <a href="#compliance" className="hover:text-brand-400 transition-colors">Regulatory Framework</a>
            </nav>
            <Link
              to="/login"
              className="px-4 py-2 bg-gradient-to-r from-brand-600 to-emerald-600 hover:from-brand-500 hover:to-emerald-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-brand-600/20 flex items-center gap-1.5 transition-all"
            >
              <span>Launch Platform</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping"></span>
            <span>Next-Gen Climate Risk & Green Transition Underwriting</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Climate Intelligence for High-Confidence <span className="bg-gradient-to-r from-brand-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">MSME Green Lending</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 mt-6 max-w-2xl mx-auto leading-relaxed">
            Quantify physical climate risk (CVI), model green project economic viability (GVS), and empower NBFC credit officers with explainable, evidence-backed loan appraisals.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-xl shadow-xl shadow-brand-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">dashboard</span>
              <span>Open Underwriting Workbench</span>
            </Link>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-6 py-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-200 text-sm font-medium rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-lg">play_circle</span>
              <span>Explore Framework</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md text-left">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">CVI Engine</span>
              <div className="text-xl font-bold text-amber-400 mt-1">ISO 14091:2021</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Physical hazard × Exposure × Vulnerability</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md text-left">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">GVS Engine</span>
              <div className="text-xl font-bold text-brand-400 mt-1">GHG Protocol</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Financial IRR + CO2e + Resilience</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md text-left">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Geospatial Proof</span>
              <div className="text-xl font-bold text-blue-400 mt-1">Sentinel-2 + ERA5</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Automated rooftop & hazard verification</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md text-left">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Compliance</span>
              <div className="text-xl font-bold text-emerald-400 mt-1">RBI & BRSR Core</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Institutional climate governance audit</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">End-to-End Intelligence Flow</h2>
            <p className="text-3xl font-extrabold text-white tracking-tight">
              The 12-Step Golden Journey for Green Lending
            </p>
            <p className="text-sm text-slate-400 mt-3">
              From raw MSME borrower registration to final sanctioned credit appraisal memo with automated regulatory audit trail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 relative group hover:border-brand-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-lg mb-4 border border-blue-500/20">
                01
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1. Digital Twin & Baseline</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ingest Udyam details, latitude/longitude coordinates, baseline power/fuel expenses, and financial statement line items into an active financial twin.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 relative group hover:border-brand-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-lg mb-4 border border-amber-500/20">
                02
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2. Dual-Engine Scoring</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Deterministic calculations compute the CVI (Physical Climate Vulnerability Index) and GVS (Green Viability Score) without black-box LLM hallucinations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 relative group hover:border-brand-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-lg mb-4 border border-emerald-500/20">
                03
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3. Stress-Test & Sanction</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Simulate heatwave and flood shocks on debt service coverage (DSCR), review AI Copilot appraisal memos, verify geospatial proof, and execute human sign-off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-800 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-400 text-sm">shield</span>
            <span>ClimateTwin — Certified for RBI Green Lending & SEBI BRSR Core Frameworks</span>
          </div>
          <div>
            <Link to="/login" className="text-brand-400 hover:text-brand-300 font-semibold">
              Officer Portal Login →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
