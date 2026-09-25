import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
// Pages — lazily imported for code splitting
import { lazy, Suspense } from 'react';
import { PageLoader } from '@/components/common/PageLoader';
const LandingPage = lazy(() => import('@/pages/Landing/LandingPage'));
const LoginPage = lazy(() => import('@/pages/Login/LoginPage'));
const DashboardPage = lazy(() => import('@/pages/Dashboard/DashboardPage'));
const MsmesPage = lazy(() => import('@/pages/MSMEs/MsmesPage'));
const MsmeDetailPage = lazy(() => import('@/pages/MSMEs/MsmeDetailPage'));
const CasesPage = lazy(() => import('@/pages/Cases/CasesPage'));
const CaseDetailPage = lazy(() => import('@/pages/Cases/CaseDetailPage'));
const PortfolioPage = lazy(() => import('@/pages/Portfolio/PortfolioPage'));
const SettingsPage = lazy(() => import('@/pages/Settings/SettingsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFoundPage'));
function S({ children }) {
    return _jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: children });
}
export const router = createBrowserRouter([
    {
        element: _jsx(RootLayout, {}),
        errorElement: _jsx(ErrorBoundary, {}),
        children: [
            // Landing Page
            {
                path: '/',
                element: _jsx(S, { children: _jsx(LandingPage, {}) }),
            },
            {
                path: '/landing',
                element: _jsx(S, { children: _jsx(LandingPage, {}) }),
            },
            // Auth routes
            {
                element: _jsx(AuthLayout, {}),
                children: [
                    {
                        path: '/login',
                        element: _jsx(S, { children: _jsx(LoginPage, {}) }),
                    },
                ],
            },
            // Dashboard routes (protected)
            {
                element: _jsx(DashboardLayout, {}),
                children: [
                    {
                        path: '/dashboard',
                        element: _jsx(S, { children: _jsx(DashboardPage, {}) }),
                    },
                    {
                        path: '/msmes',
                        element: _jsx(S, { children: _jsx(MsmesPage, {}) }),
                    },
                    {
                        path: '/msmes/:msmeId',
                        element: _jsx(S, { children: _jsx(MsmeDetailPage, {}) }),
                    },
                    {
                        path: '/cases',
                        element: _jsx(S, { children: _jsx(CasesPage, {}) }),
                    },
                    {
                        path: '/cases/:caseId',
                        element: _jsx(S, { children: _jsx(CaseDetailPage, {}) }),
                    },
                    {
                        path: '/cases/:caseId/:tab',
                        element: _jsx(S, { children: _jsx(CaseDetailPage, {}) }),
                    },
                    {
                        path: '/portfolio',
                        element: _jsx(S, { children: _jsx(PortfolioPage, {}) }),
                    },
                    {
                        path: '/settings',
                        element: _jsx(S, { children: _jsx(SettingsPage, {}) }),
                    },
                ],
            },
            {
                path: '*',
                element: _jsx(S, { children: _jsx(NotFoundPage, {}) }),
            },
        ],
    },
]);
//# sourceMappingURL=router.js.map