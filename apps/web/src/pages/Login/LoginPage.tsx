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
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Select Your Institutional Role</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'credit_officer', label: 'Credit Officer', icon: 'badge', desc: 'Appraisal & Sanction' },
              { id: 'risk_manager', label: 'Risk Manager', icon: 'security', desc: 'Portfolio Stress & LGD' },
              { id: 'auditor', label: 'Compliance/Auditor', icon: 'fact_check', desc: 'ISO 14091 & BRSR' },
              { id: 'admin', label: 'Executive Admin', icon: 'admin_panel_settings', desc: 'System & Governance' },
            ].map((r) => (
              <button
                type="button"
                key={r.id}
                onClick={() => handleRoleChange(r.id as UserRole)}
                className={`flex flex-col items-start p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  role === r.id
                    ? 'bg-brand-500/15 border-brand-500/80 text-white shadow-sm shadow-brand-500/20'
                    : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className={`material-symbols-outlined text-sm ${role === r.id ? 'text-brand-400' : 'text-slate-500'}`}>{r.icon}</span>
                  <span className="text-xs font-semibold">{r.label}</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5">{r.desc}</span>
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

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 py-2.5 px-4 bg-gradient-to-r from-brand-600 to-emerald-600 hover:from-brand-500 hover:to-emerald-500 text-white font-semibold rounded-lg shadow-lg shadow-brand-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
        >
          {isLoading ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <>
              <span>Sign In as {PRESET_USERS[role].name}</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </>
          )}
        </button>

        {/* Quick Demo 1-Click Buttons */}
        <div className="pt-3 border-t border-slate-800/80">
          <span className="text-[11px] text-slate-500 block text-center mb-2">1-Click Direct Demo Access:</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('risk_manager')}
              className="px-2.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[11px] font-medium cursor-pointer text-center"
            >
              Sign In as Risk Manager
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('auditor')}
              className="px-2.5 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 text-[11px] font-medium cursor-pointer text-center"
            >
              Sign In as Auditor
            </button>
          </div>
        </div>
      </form>

      <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
        <p className="flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-emerald-400 text-xs">verified_user</span>
          RBI Green Lending Framework & TCFD Compliant
        </p>
      </div>
    </div>
  )
}
