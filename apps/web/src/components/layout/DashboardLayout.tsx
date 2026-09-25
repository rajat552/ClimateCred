import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import clsx from 'clsx'
import { useAuthStore, UserRole, PRESET_USERS } from '@/stores/authStore'

const NAV_ITEMS = [
  {
    group: 'Overview',
    items: [
      { to: '/dashboard', icon: 'dashboard', label: 'Command Center' },
      { to: '/portfolio', icon: 'account_tree', label: 'Portfolio Analytics' },
    ],
  },
  {
    group: 'Loan Underwriting',
    items: [
      { to: '/msmes', icon: 'storefront', label: 'MSME Directory' },
      { to: '/cases', icon: 'folder_open', label: 'Loan Cases' },
    ],
  },
  {
    group: 'Climate Intelligence',
    items: [
      { to: '/climate-map', icon: 'public', label: 'Climate Hazard Map' },
      { to: '/models', icon: 'psychology', label: 'Model Registry' },
    ],
  },
  {
    group: 'Governance & Admin',
    items: [
      { to: '/audit', icon: 'history', label: 'Audit Trail' },
      { to: '/settings', icon: 'settings', label: 'Impact Settings' },
    ],
  },
]

export function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
  const navigate = useNavigate()
  const { currentUser, loginAsRole, logout } = useAuthStore()

  const handleSwitchRole = (newRole: UserRole) => {
    loginAsRole(newRole)
    setIsRoleModalOpen(false)
  }

  const handleLogout = () => {
    logout()
    setIsRoleModalOpen(false)
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Sidebar */}
      <aside
        className={clsx(
          'flex flex-col border-r border-slate-800 bg-slate-900/80 backdrop-blur-xl transition-all duration-300 ease-in-out z-30',
          sidebarCollapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between gap-3 px-4 py-5 border-b border-slate-800">
          <NavLink to="/dashboard" className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
              <span className="text-white text-xl">🌍</span>
            </div>
            {!sidebarCollapsed && (
              <div className="min-w-0">
                <div className="font-bold text-sm text-white tracking-tight flex items-center gap-1">
                  Climate<span className="text-brand-400">Twin</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">MSME Climate Intelligence</div>
              </div>
            )}
          </NavLink>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <span className="material-symbols-rounded text-lg">
              {sidebarCollapsed ? 'menu_open' : 'menu'}
            </span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
          {NAV_ITEMS.map((group) => (
            <div key={group.group}>
              {!sidebarCollapsed && (
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">
                  {group.group}
                </div>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        clsx(
                          'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150',
                          isActive
                            ? 'bg-brand-500/15 text-brand-400 border border-brand-500/30 shadow-sm shadow-brand-500/10'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60',
                          sidebarCollapsed && 'justify-center px-0'
                        )
                      }
                      title={sidebarCollapsed ? item.label : undefined}
                    >
                      <span className="material-symbols-rounded text-xl flex-shrink-0">{item.icon}</span>
                      {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* User profile & Role Switcher in Sidebar */}
        <div className="p-3 border-t border-slate-800">
          <button
            onClick={() => setIsRoleModalOpen(true)}
            className={clsx(
              'w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/80 cursor-pointer transition-all border border-transparent hover:border-slate-700 text-left',
              sidebarCollapsed && 'justify-center'
            )}
            title="Switch User Role / Sign In"
          >
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${currentUser.avatarGradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md`}>
              {currentUser.avatarInitial}
            </div>
            {!sidebarCollapsed && (
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-white truncate flex items-center justify-between">
                  <span>{currentUser.name}</span>
                  <span className="material-symbols-rounded text-xs text-slate-500">expand_more</span>
                </div>
                <div className="text-[10px] text-brand-400 truncate font-medium">{currentUser.badge}</div>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header className="flex items-center justify-between px-6 py-3.5 border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden md:inline">Current Active Workspace:</span>
            <button
              onClick={() => setIsRoleModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-all cursor-pointer"
            >
              <span className={`w-2 h-2 rounded-full bg-emerald-400 animate-pulse`}></span>
              <span>{currentUser.roleTitle}</span>
              <span className="material-symbols-rounded text-sm text-slate-400">swap_horiz</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Role Switcher Button in Header */}
            <button
              onClick={() => setIsRoleModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span className="material-symbols-rounded text-sm">switch_account</span>
              <span>Switch Role</span>
            </button>

            {/* User Avatar */}
            <div
              onClick={() => setIsRoleModalOpen(true)}
              className={`w-8 h-8 rounded-lg bg-gradient-to-br ${currentUser.avatarGradient} flex items-center justify-center text-white text-xs font-bold cursor-pointer shadow-sm`}
              title={`${currentUser.name} (${currentUser.roleTitle})`}
            >
              {currentUser.avatarInitial}
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </main>

      {/* Role Switcher & Login Selection Modal */}
      {isRoleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-5 text-slate-300">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-rounded text-brand-400">switch_account</span>
                  Institutional Role & Persona Switcher
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select a user persona to experience role-specific underwriting, risk, and audit workflows.
                </p>
              </div>
              <button
                onClick={() => setIsRoleModalOpen(false)}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
              >
                <span className="material-symbols-rounded text-sm">close</span>
              </button>
            </div>

            {/* Role Options */}
            <div className="space-y-2.5">
              {(Object.keys(PRESET_USERS) as UserRole[]).map((roleKey) => {
                const u = PRESET_USERS[roleKey]
                const isActive = currentUser.role === roleKey

                return (
                  <div
                    key={roleKey}
                    onClick={() => handleSwitchRole(roleKey)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isActive
                        ? 'bg-brand-500/15 border-brand-500/80 shadow-md shadow-brand-500/10'
                        : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${u.avatarGradient} flex items-center justify-center text-white text-sm font-bold shadow-md`}>
                        {u.avatarInitial}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>{u.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono font-medium">
                            {u.badge}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400">{u.roleTitle} • {u.email}</div>
                        <div className="text-[10px] text-brand-400/90 mt-1">
                          Key Permissions: {u.permissions.slice(0, 2).join(' • ')}
                        </div>
                      </div>
                    </div>

                    <div>
                      {isActive ? (
                        <span className="px-2.5 py-1 rounded bg-brand-500 text-slate-950 text-xs font-bold">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 hover:text-white font-semibold">
                          Switch &rarr;
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Logout / Switch Account footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500">Session: NBFC-Tier1 Institutional Portal</span>
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <span className="material-symbols-rounded text-sm">logout</span>
                Sign Out to Login Screen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
