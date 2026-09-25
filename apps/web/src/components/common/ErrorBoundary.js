import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
export function ErrorBoundary() {
    const error = useRouteError();
    let message = 'An unexpected error occurred.';
    let status = '';
    if (isRouteErrorResponse(error)) {
        status = String(error.status);
        message = error.statusText || message;
    }
    else if (error instanceof Error) {
        message = error.message;
    }
    return (_jsx("div", { className: "min-h-screen bg-slate-950 flex items-center justify-center p-8", children: _jsxs("div", { className: "max-w-md w-full text-center space-y-6", children: [_jsx("div", { className: "w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto", children: _jsx("span", { className: "material-symbols-rounded text-4xl text-red-400", children: "error" }) }), status && (_jsx("div", { className: "text-6xl font-bold text-slate-700", children: status })), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-bold text-white mb-2", children: "Something went wrong" }), _jsx("p", { className: "text-slate-400 text-sm", children: message })] }), _jsxs(Link, { to: "/dashboard", className: "btn-primary inline-flex items-center gap-2", children: [_jsx("span", { className: "material-symbols-rounded text-sm", children: "home" }), "Return to Dashboard"] })] }) }));
}
//# sourceMappingURL=ErrorBoundary.js.map