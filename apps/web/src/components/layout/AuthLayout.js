import { jsx as _jsx } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
export function AuthLayout() {
    // Auth check will be added in Step 12
    // For now, renders login page
    return (_jsx("div", { className: "min-h-screen bg-slate-950 flex items-center justify-center p-4", children: _jsx(Outlet, {}) }));
}
//# sourceMappingURL=AuthLayout.js.map