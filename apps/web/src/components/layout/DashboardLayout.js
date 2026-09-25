import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import clsx from 'clsx';
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
];
export function DashboardLayout() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const navigate = useNavigate();
    return (_jsxs("div", { className: "min-h-screen flex bg-slate-950", children: [_jsxs("aside", { className: clsx('flex flex-col border-r border-slate-800 bg-slate-900/80 backdrop-blur-xl transition-all duration-300 ease-in-out', sidebarCollapsed ? 'w-16' : 'w-64'), children: [_jsxs("div", { className: "flex items-center gap-3 px-4 py-5 border-b border-slate-800", children: [_jsx("div", { className: "flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow-green", children: _jsx("span", { className: "text-white text-lg", children: "\uD83C\uDF0D" }) }), !sidebarCollapsed && (_jsxs("div", { className: "min-w-0", children: [_jsx("div", { className: "font-bold text-sm text-white tracking-tight", children: "ClimateTwin" }), _jsx("div", { className: "text-[10px] text-slate-500 truncate", children: "MSME Climate Intelligence" })] })), _jsx("button", { onClick: () => setSidebarCollapsed(!sidebarCollapsed), className: "ml-auto text-slate-500 hover:text-white transition-colors", children: _jsx("span", { className: "material-symbols-rounded text-lg", children: sidebarCollapsed ? 'menu_open' : 'menu' }) })] }), _jsx("nav", { className: "flex-1 px-3 py-4 space-y-6 overflow-y-auto", children: NAV_ITEMS.map((group) => (_jsxs("div", { children: [!sidebarCollapsed && (_jsx("div", { className: "section-title px-2 mb-2", children: group.group })), _jsx("ul", { className: "space-y-1", children: group.items.map((item) => (_jsx("li", { children: _jsxs(NavLink, { to: item.to, className: ({ isActive }) => clsx('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150', isActive
                                                ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                                                : 'text-slate-400 hover:text-white hover:bg-white/5', sidebarCollapsed && 'justify-center px-2'), title: sidebarCollapsed ? item.label : undefined, children: [_jsx("span", { className: "material-symbols-rounded text-xl flex-shrink-0", children: item.icon }), !sidebarCollapsed && _jsx("span", { children: item.label })] }) }, item.to))) })] }, group.group))) }), _jsx("div", { className: "px-3 py-4 border-t border-slate-800", children: _jsxs("div", { className: clsx('flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition-all', sidebarCollapsed && 'justify-center'), children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0", children: "O" }), !sidebarCollapsed && (_jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("div", { className: "text-sm font-medium text-white truncate", children: "Credit Officer" }), _jsx("div", { className: "text-xs text-slate-500 truncate", children: "officer@nbfc.com" })] }))] }) })] }), _jsxs("main", { className: "flex-1 flex flex-col min-w-0 overflow-hidden", children: [_jsxs("header", { className: "flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl", children: [_jsx("div", { className: "flex items-center gap-3", children: _jsx("div", { id: "breadcrumb-portal" }) }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("button", { className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-sm transition-all", children: [_jsx("span", { className: "material-symbols-rounded text-base", children: "search" }), _jsx("span", { className: "hidden sm:inline", children: "Search cases..." }), _jsx("kbd", { className: "hidden sm:inline text-xs bg-slate-700 px-1.5 py-0.5 rounded", children: "\u2318K" })] }), _jsxs("button", { className: "relative p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all", children: [_jsx("span", { className: "material-symbols-rounded text-xl", children: "notifications" }), _jsx("span", { className: "absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full" })] }), _jsx("button", { className: "p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all", children: _jsx("span", { className: "material-symbols-rounded text-xl", children: "light_mode" }) })] })] }), _jsx("div", { className: "flex-1 overflow-y-auto p-6", children: _jsx(Outlet, {}) })] })] }));
}
//# sourceMappingURL=DashboardLayout.js.map