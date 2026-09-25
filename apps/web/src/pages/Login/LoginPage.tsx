import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('officer@climatetwin.io')
  const [password, setPassword] = useState('demo1234')
  const [role, setRole] = useState<'credit_officer' | 'risk_manager' | 'auditor' | 'admin'>('credit_officer')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/dashboard')
    }, 600)
  }

  return (
    <div className="w-full max-w-md p-8 glass-panel rounded-2xl shadow-2xl border border-slate-700/60 animate-fade-in backdrop-blur-xl bg-slate-900/80">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-emerald-400 p-0.5 shadow-lg shadow-brand-500/20 mb-4">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <span className="material-symbols-outlined text-brand-400 text-3xl animate-pulse">eco</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          Climate<span className="text-brand-400">Twin</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1.5 uppercase tracking-widest font-semibold">
          MSME Climate-Risk & Green Viability Engine
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Sign In As Role</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'credit_officer', label: 'Credit Officer', icon: 'badge' },
              { id: 'risk_manager', label: 'Risk Manager', icon: 'security' },
              { id: 'auditor', label: 'Compliance/Audit', icon: 'fact_check' },
              { id: 'admin', label: 'System Admin', icon: 'admin_panel_settings' },
            ].map((r) => (
              <button
                type="button"
                key={r.id}
                onClick={() => setRole(r.id as any)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  role === r.id
                    ? 'bg-brand-500/10 border-brand-500/60 text-brand-400 shadow-sm shadow-brand-500/10'
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{r.icon}</span>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Institutional Email</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-500 text-sm">mail</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-9 pr-4 py-2 bg-slate-950/60 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              placeholder="officer@bank.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-500 text-sm">lock</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-9 pr-4 py-2 bg-slate-950/60 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded border-slate-700 text-brand-500 focus:ring-brand-500 bg-slate-900" />
            Remember institution session
          </label>
          <a href="#forgot" className="text-brand-400 hover:text-brand-300 hover:underline">
            Forgot credentials?
          </a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 py-2.5 px-4 bg-gradient-to-r from-brand-600 to-emerald-600 hover:from-brand-500 hover:to-emerald-500 text-white font-medium rounded-lg shadow-lg shadow-brand-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
        >
          {isLoading ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <>
              <span>Access Intelligence Engine</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
        <p className="flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-emerald-400 text-xs">verified_user</span>
          RBI Green Lending Framework & TCFD Compliant
        </p>
      </div>
    </div>
  )
}
