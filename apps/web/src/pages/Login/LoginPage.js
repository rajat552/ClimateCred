import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, PRESET_USERS } from '@/stores/authStore';
export default function LoginPage() {
    const navigate = useNavigate();
    const { loginAsRole } = useAuthStore();
    const [role, setRole] = useState('credit_officer');
    const [email, setEmail] = useState(PRESET_USERS.credit_officer.email);
    const [password, setPassword] = useState('demo1234');
    const [isLoading, setIsLoading] = useState(false);
    const handleRoleChange = (newRole) => {
        setRole(newRole);
        setEmail(PRESET_USERS[newRole].email);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            loginAsRole(role);
            setIsLoading(false);
            navigate('/dashboard');
        }, 400);
    };
    const handleQuickLogin = (targetRole) => {
        loginAsRole(targetRole);
        navigate('/dashboard');
    };
    return (_jsxs("div", { className: "w-full max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-2xl backdrop-blur-2xl animate-fade-in text-slate-200", children: [_jsxs("div", { className: "text-center mb-7", children: [_jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 via-emerald-500 to-teal-400 shadow-xl shadow-brand-500/20 mb-3.5", children: _jsx("span", { className: "text-2xl", children: "\uD83C\uDF31" }) }), _jsxs("h1", { className: "text-2xl sm:text-3xl font-bold tracking-tight text-white", children: ["Climate", _jsx("span", { className: "text-brand-400", children: "Twin" })] }), _jsx("p", { className: "text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold", children: "Institutional Climate-Risk & Green Underwriting Engine" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("label", { className: "text-xs font-semibold text-slate-300", children: "Select Institutional Role & Persona" }), _jsx("span", { className: "text-[11px] font-mono text-brand-400", children: PRESET_USERS[role].badge })] }), _jsx("div", { className: "grid grid-cols-2 gap-2.5", children: [
                                    {
                                        id: 'credit_officer',
                                        label: 'Credit Officer',
                                        sub: 'Appraisal & Sanctions',
                                        icon: 'badge',
                                        color: 'emerald',
                                    },
                                    {
                                        id: 'risk_manager',
                                        label: 'Chief Risk Officer',
                                        sub: 'Portfolio Stress & LGD',
                                        icon: 'security',
                                        color: 'blue',
                                    },
                                    {
                                        id: 'auditor',
                                        label: 'ESG Auditor',
                                        sub: 'ISO 14091 & BRSR',
                                        icon: 'fact_check',
                                        color: 'purple',
                                    },
                                    {
                                        id: 'admin',
                                        label: 'Executive Admin',
                                        sub: 'System Governance',
                                        icon: 'admin_panel_settings',
                                        color: 'amber',
                                    },
                                ].map((r) => {
                                    const isSelected = role === r.id;
                                    return (_jsxs("button", { type: "button", onClick: () => handleRoleChange(r.id), className: `p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${isSelected
                                            ? 'bg-brand-500/15 border-brand-500 text-white shadow-md shadow-brand-500/15 ring-1 ring-brand-500/50'
                                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`, children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: `material-symbols-rounded text-base ${isSelected ? 'text-brand-400' : 'text-slate-500'}`, children: r.icon }), _jsx("span", { className: "text-xs font-bold truncate text-white", children: r.label })] }), _jsx("span", { className: "text-[10px] text-slate-400 truncate", children: r.sub })] }, r.id));
                                }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-300 mb-1.5", children: "Institutional Email Address" }), _jsxs("div", { className: "relative flex items-center", children: [_jsx("span", { className: "material-symbols-rounded absolute left-3.5 text-slate-500 text-base pointer-events-none", children: "mail" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all font-mono", placeholder: "officer@nbfc-bank.com" })] })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [_jsx("label", { className: "text-xs font-medium text-slate-300", children: "Password" }), _jsx("span", { className: "text-[10px] text-slate-500 font-mono", children: "Demo: demo1234" })] }), _jsxs("div", { className: "relative flex items-center", children: [_jsx("span", { className: "material-symbols-rounded absolute left-3.5 text-slate-500 text-base pointer-events-none", children: "lock" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all" })] })] }), _jsx("button", { type: "submit", disabled: isLoading, className: "w-full py-3 px-4 bg-gradient-to-r from-brand-600 via-brand-500 to-emerald-600 hover:from-brand-500 hover:to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer text-xs", children: isLoading ? (_jsx("span", { className: "inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" })) : (_jsxs(_Fragment, { children: [_jsxs("span", { children: ["Sign In as ", PRESET_USERS[role].name] }), _jsx("span", { className: "material-symbols-rounded text-sm", children: "arrow_forward" })] })) }), _jsxs("div", { className: "pt-3 border-t border-slate-800/80 space-y-2", children: [_jsx("span", { className: "text-[11px] text-slate-500 block text-center font-medium", children: "1-Click Direct Demo Personas:" }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx("button", { type: "button", onClick: () => handleQuickLogin('risk_manager'), className: "px-3 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold cursor-pointer text-center transition-all", children: "Sign In as Risk Manager" }), _jsx("button", { type: "button", onClick: () => handleQuickLogin('auditor'), className: "px-3 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs font-semibold cursor-pointer text-center transition-all", children: "Sign In as Auditor" })] })] })] }), _jsxs("div", { className: "mt-6 pt-4 border-t border-slate-800/80 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5", children: [_jsx("span", { className: "material-symbols-rounded text-emerald-400 text-sm", children: "verified_user" }), _jsx("span", { children: "RBI Green Lending Framework & ISO 14091 Validated" })] })] }));
}
//# sourceMappingURL=LoginPage.js.map