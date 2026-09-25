import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore, UserRole, PRESET_USERS } from '@/stores/authStore'

export default function LoginPage() {
  const navigate = useNavigate()
  const { loginAsRole } = useAuthStore()
  const [role, setRole] = useState<UserRole>('credit_officer')
  const [email, setEmail] = useState(PRESET_USERS.credit_officer.email)
  const [password, setPassword] = useState('demo1234')
  const [isLoading, setIsLoading] = useState(false)

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole)
    setEmail(PRESET_USERS[newRole].email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      loginAsRole(role)
      setIsLoading(false)
      navigate('/dashboard')
    }, 400)
  }

  const handleQuickLogin = (targetRole: UserRole) => {
    loginAsRole(targetRole)
    navigate('/dashboard')
  }

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-2xl backdrop-blur-2xl animate-fade-in text-slate-200">
      {/* Header & Logo */}
      <div className="text-center mb-7">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 via-emerald-500 to-teal-400 shadow-xl shadow-brand-500/20 mb-3.5">
          <span className="text-2xl">🌱</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Climate<span className="text-brand-400">Twin</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">
          Institutional Climate-Risk & Green Underwriting Engine
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Role Selection Grid */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-300">
              Select Institutional Role & Persona
            </label>
            <span className="text-[11px] font-mono text-brand-400">
              {PRESET_USERS[role].badge}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {[
              {
                id: 'credit_officer' as UserRole,
                label: 'Credit Officer',
                sub: 'Appraisal & Sanctions',
                icon: 'badge',
                color: 'emerald',
              },
              {
                id: 'risk_manager' as UserRole,
                label: 'Chief Risk Officer',
                sub: 'Portfolio Stress & LGD',
                icon: 'security',
                color: 'blue',
              },
              {
                id: 'auditor' as UserRole,
                label: 'ESG Auditor',
                sub: 'ISO 14091 & BRSR',
                icon: 'fact_check',
                color: 'purple',
              },
              {
                id: 'admin' as UserRole,
                label: 'Executive Admin',
                sub: 'System Governance',
                icon: 'admin_panel_settings',
                color: 'amber',
              },
            ].map((r) => {
              const isSelected = role === r.id
              return (
                <button
                  type="button"
                  key={r.id}
                  onClick={() => handleRoleChange(r.id)}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-brand-500/15 border-brand-500 text-white shadow-md shadow-brand-500/15 ring-1 ring-brand-500/50'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`material-symbols-rounded text-base ${isSelected ? 'text-brand-400' : 'text-slate-500'}`}>
                      {r.icon}
                    </span>
                    <span className="text-xs font-bold truncate text-white">{r.label}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 truncate">{r.sub}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Institutional Email Address
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-rounded absolute left-3.5 text-slate-500 text-base pointer-events-none">
              mail
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-mono"
              placeholder="officer@nbfc-bank.com"
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-slate-300">Password</label>
            <span className="text-[10px] text-slate-500 font-mono">Demo: demo1234</span>
          </div>
          <div className="relative flex items-center">
            <span className="material-symbols-rounded absolute left-3.5 text-slate-500 text-base pointer-events-none">
              lock
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-brand-600 via-brand-500 to-emerald-600 hover:from-brand-500 hover:to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer text-xs"
        >
          {isLoading ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <>
              <span>Sign In as {PRESET_USERS[role].name}</span>
              <span className="material-symbols-rounded text-sm">arrow_forward</span>
            </>
          )}
        </button>

        {/* 1-Click Fast Switch Buttons */}
        <div className="pt-3 border-t border-slate-800/80 space-y-2">
          <span className="text-[11px] text-slate-500 block text-center font-medium">
            1-Click Direct Demo Personas:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('risk_manager')}
              className="px-3 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold cursor-pointer text-center transition-all"
            >
              Sign In as Risk Manager
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('auditor')}
              className="px-3 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs font-semibold cursor-pointer text-center transition-all"
            >
              Sign In as Auditor
            </button>
          </div>
        </div>
      </form>

      {/* Trust & Compliance Badge */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
        <span className="material-symbols-rounded text-emerald-400 text-sm">verified_user</span>
        <span>RBI Green Lending Framework & ISO 14091 Validated</span>
      </div>
    </div>
  )
}
