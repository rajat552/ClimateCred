import { Outlet, Link } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Top Header */}
      <header className="px-6 py-4 flex items-center justify-between relative z-10">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <span className="text-white text-base">🌍</span>
          </div>
          <span className="text-base font-bold text-white tracking-tight">
            Climate<span className="text-brand-400">Twin</span>
          </span>
        </Link>
        <Link
          to="/"
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <span className="material-symbols-rounded text-sm">arrow_back</span>
          <span>Back to Landing Page</span>
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10 my-auto">
        <Outlet />
      </main>

      {/* Bottom Footer */}
      <footer className="px-6 py-4 border-t border-slate-900 text-center text-xs text-slate-600 relative z-10">
        <span>© 2026 ClimateTwin Technologies Inc. • Enterprise MSME Green Finance Intelligence</span>
      </footer>
    </div>
  )
}
