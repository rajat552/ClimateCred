import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import clsx from 'clsx'

const NAV_ITEMS = [
  {
    group: 'Overview',
    items: [
      { to: '/dashboard', icon: 'dashboard', label: 'Command Center' },
      { to: '/portfolio', icon: 'account_tree', label: 'Portfolio' },
    ],
  },
  {
    group: 'Loan Workflow',
    items: [
      { to: '/msmes', icon: 'storefront', label: 'MSMEs' },
      { to: '/cases', icon: 'folder_open', label: 'Loan Cases' },
    ],
  },
  {
    group: 'Intelligence',
    items: [
      { to: '/climate-map', icon: 'public', label: 'Climate Map' },
      { to: '/models', icon: 'psychology', label: 'Model Registry' },
    ],
  },
  {
    group: 'Admin',
    items: [
      { to: '/audit', icon: 'history', label: 'Audit Log' },
      { to: '/settings', icon: 'settings', label: 'Settings' },
    ],
  },
]

export function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Sidebar */}
      <aside
        className={clsx(
          'flex flex-col border-r border-slate-800 bg-slate-900/80 backdrop-blur-xl transition-all duration-300 ease-in-out',
          sidebarCollapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-800">
          <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow-green">
            <span className="text-white text-lg">🌍</span>
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <div className="font-bold text-sm text-white tracking-tight">ClimateTwin</div>
              <div className="text-[10px] text-slate-500 truncate">MSME Climate Intelligence</div>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="ml-auto text-slate-500 hover:text-white transition-colors"
          >
            <span className="material-symbols-rounded text-lg">
              {sidebarCollapsed ? 'menu_open' : 'menu'}
            </span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
          {NAV_ITEMS.map((group) => (
            <div key={group.group}>
              {!sidebarCollapsed && (
                <div className="section-title px-2 mb-2">{group.group}</div>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        clsx(
                          'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                          isActive
                            ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                            : 'text-slate-400 hover:text-white hover:bg-white/5',
                          sidebarCollapsed && 'justify-center px-2'
                        )
                      }
                      title={sidebarCollapsed ? item.label : undefined}
                    >
                      <span className="material-symbols-rounded text-xl flex-shrink-0">{item.icon}</span>
                      {!sidebarCollapsed && <span>{item.label}</span>}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* User section */}
        <div className="px-3 py-4 border-t border-slate-800">
          <div
            className={clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition-all',
              sidebarCollapsed && 'justify-center'
            )}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              O
            </div>
            {!sidebarCollapsed && (
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-white truncate">Credit Officer</div>
                <div className="text-xs text-slate-500 truncate">officer@nbfc.com</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            {/* Breadcrumb will be injected by child pages */}
            <div id="breadcrumb-portal" />
          </div>
          <div className="flex items-center gap-3">
            {/* Search */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-sm transition-all">
              <span className="material-symbols-rounded text-base">search</span>
              <span className="hidden sm:inline">Search cases...</span>
              <kbd className="hidden sm:inline text-xs bg-slate-700 px-1.5 py-0.5 rounded">⌘K</kbd>
            </button>
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
              <span className="material-symbols-rounded text-xl">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full" />
            </button>
            {/* Dark mode toggle */}
            <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
              <span className="material-symbols-rounded text-xl">light_mode</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
