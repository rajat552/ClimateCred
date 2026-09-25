import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import clsx from 'clsx';
import { useAuthStore, PRESET_USERS } from '@/stores/authStore';
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
];
export function DashboardLayout() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const navigate = useNavigate();
    const { currentUser, loginAsRole, logout } = useAuthStore();
    const handleSwitchRole = (newRole) => {
        loginAsRole(newRole);
        setIsRoleModalOpen(false);
    };
    const handleLogout = () => {
        logout();
        setIsRoleModalOpen(false);
        navigate('/login');
    };
    return (_jsxs("div", { className: "min-h-screen flex bg-slate-950", children: [_jsxs("aside", { className: clsx('flex flex-col border-r border-slate-800 bg-slate-900/80 backdrop-blur-xl transition-all duration-300 ease-in-out z-30', sidebarCollapsed ? 'w-20' : 'w-64'), children: [_jsxs("div", { className: "flex items-center justify-between gap-3 px-4 py-5 border-b border-slate-800", children: [_jsxs(NavLink, { to: "/dashboard", className: "flex items-center gap-3 min-w-0", children: [_jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-brand-500/20", children: _jsx("span", { className: "text-white text-xl", children: "\uD83C\uDF0D" }) }), !sidebarCollapsed && (_jsxs("div", { className: "min-w-0", children: [_jsxs("div", { className: "font-bold text-sm text-white tracking-tight flex items-center gap-1", children: ["Climate", _jsx("span", { className: "text-brand-400", children: "Twin" })] }), _jsx("div", { className: "text-[10px] text-slate-400 truncate", children: "MSME Climate Intelligence" })] }))] }), _jsx("button", { onClick: () => setSidebarCollapsed(!sidebarCollapsed), className: "text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer", title: sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar', children: _jsx("span", { className: "material-symbols-rounded text-lg", children: sidebarCollapsed ? 'menu_open' : 'menu' }) })] }), _jsx("nav", { className: "flex-1 px-3 py-4 space-y-5 overflow-y-auto", children: NAV_ITEMS.map((group) => (_jsxs("div", { children: [!sidebarCollapsed && (_jsx("div", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 mb-2", children: group.group })), _jsx("ul", { className: "space-y-1", children: group.items.map((item) => (_jsx("li", { children: _jsxs(NavLink, { to: item.to, className: ({ isActive }) => clsx('flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150', isActive
                                                ? 'bg-brand-500/15 text-brand-400 border border-brand-500/30 shadow-sm shadow-brand-500/10'
                                                : 'text-slate-400 hover:text-white hover:bg-slate-800/60', sidebarCollapsed && 'justify-center px-0'), title: sidebarCollapsed ? item.label : undefined, children: [_jsx("span", { className: "material-symbols-rounded text-xl flex-shrink-0", children: item.icon }), !sidebarCollapsed && _jsx("span", { className: "truncate", children: item.label })] }) }, item.to))) })] }, group.group))) }), _jsx("div", { className: "p-3 border-t border-slate-800", children: _jsxs("button", { onClick: () => setIsRoleModalOpen(true), className: clsx('w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/80 cursor-pointer transition-all border border-transparent hover:border-slate-700 text-left', sidebarCollapsed && 'justify-center'), title: "Switch User Role / Sign In", children: [_jsx("div", { className: `w-9 h-9 rounded-xl bg-gradient-to-br ${currentUser.avatarGradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md`, children: currentUser.avatarInitial }), !sidebarCollapsed && (_jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "text-xs font-bold text-white truncate flex items-center justify-between", children: [_jsx("span", { children: currentUser.name }), _jsx("span", { className: "material-symbols-rounded text-xs text-slate-500", children: "expand_more" })] }), _jsx("div", { className: "text-[10px] text-brand-400 truncate font-medium", children: currentUser.badge })] }))] }) })] }), _jsxs("main", { className: "flex-1 flex flex-col min-w-0 overflow-hidden", children: [_jsxs("header", { className: "flex items-center justify-between px-6 py-3.5 border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-xs text-slate-400 hidden md:inline", children: "Current Active Workspace:" }), _jsxs("button", { onClick: () => setIsRoleModalOpen(true), className: "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-all cursor-pointer", children: [_jsx("span", { className: `w-2 h-2 rounded-full bg-emerald-400 animate-pulse` }), _jsx("span", { children: currentUser.roleTitle }), _jsx("span", { className: "material-symbols-rounded text-sm text-slate-400", children: "swap_horiz" })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("button", { onClick: () => setIsRoleModalOpen(true), className: "px-3 py-1.5 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer", children: [_jsx("span", { className: "material-symbols-rounded text-sm", children: "switch_account" }), _jsx("span", { children: "Switch Role" })] }), _jsx("div", { onClick: () => setIsRoleModalOpen(true), className: `w-8 h-8 rounded-lg bg-gradient-to-br ${currentUser.avatarGradient} flex items-center justify-center text-white text-xs font-bold cursor-pointer shadow-sm`, title: `${currentUser.name} (${currentUser.roleTitle})`, children: currentUser.avatarInitial })] })] }), _jsx("div", { className: "flex-1 overflow-y-auto p-6", children: _jsx(Outlet, {}) })] }), isRoleModalOpen && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in", children: _jsxs("div", { className: "w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-5 text-slate-300", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", children: [_jsxs("div", { children: [_jsxs("h3", { className: "text-base font-bold text-white flex items-center gap-2", children: [_jsx("span", { className: "material-symbols-rounded text-brand-400", children: "switch_account" }), "Institutional Role & Persona Switcher"] }), _jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "Select a user persona to experience role-specific underwriting, risk, and audit workflows." })] }), _jsx("button", { onClick: () => setIsRoleModalOpen(false), className: "p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer", children: _jsx("span", { className: "material-symbols-rounded text-sm", children: "close" }) })] }), _jsx("div", { className: "space-y-2.5", children: Object.keys(PRESET_USERS).map((roleKey) => {
                                const u = PRESET_USERS[roleKey];
                                const isActive = currentUser.role === roleKey;
                                return (_jsxs("div", { onClick: () => handleSwitchRole(roleKey), className: `p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${isActive
                                        ? 'bg-brand-500/15 border-brand-500/80 shadow-md shadow-brand-500/10'
                                        : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'}`, children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `w-10 h-10 rounded-xl bg-gradient-to-br ${u.avatarGradient} flex items-center justify-center text-white text-sm font-bold shadow-md`, children: u.avatarInitial }), _jsxs("div", { children: [_jsxs("div", { className: "text-xs font-bold text-white flex items-center gap-2", children: [_jsx("span", { children: u.name }), _jsx("span", { className: "text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono font-medium", children: u.badge })] }), _jsxs("div", { className: "text-[11px] text-slate-400", children: [u.roleTitle, " \u2022 ", u.email] }), _jsxs("div", { className: "text-[10px] text-brand-400/90 mt-1", children: ["Key Permissions: ", u.permissions.slice(0, 2).join(' • ')] })] })] }), _jsx("div", { children: isActive ? (_jsx("span", { className: "px-2.5 py-1 rounded bg-brand-500 text-slate-950 text-xs font-bold", children: "ACTIVE" })) : (_jsx("span", { className: "text-xs text-slate-400 hover:text-white font-semibold", children: "Switch \u2192" })) })] }, roleKey));
                            }) }), _jsxs("div", { className: "pt-3 border-t border-slate-800 flex items-center justify-between text-xs", children: [_jsx("span", { className: "text-slate-500", children: "Session: NBFC-Tier1 Institutional Portal" }), _jsxs("button", { onClick: handleLogout, className: "px-3.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-semibold flex items-center gap-1.5 cursor-pointer transition-all", children: [_jsx("span", { className: "material-symbols-rounded text-sm", children: "logout" }), "Sign Out to Login Screen"] })] })] }) }))] }));
}
//# sourceMappingURL=DashboardLayout.js.map