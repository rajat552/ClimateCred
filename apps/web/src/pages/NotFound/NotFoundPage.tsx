import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6 text-center">
      <div className="max-w-md space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-brand-400">
          <span className="material-symbols-outlined text-3xl">error_outline</span>
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">404</h1>
        <p className="text-sm text-slate-400">
          The requested intelligence report or page could not be located in ClimateTwin.
        </p>
        <div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-brand-600/20 transition-all"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Return to Portfolio Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
