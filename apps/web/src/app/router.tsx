import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'

// Pages — lazily imported for code splitting
import { lazy, Suspense } from 'react'
import { PageLoader } from '@/components/common/PageLoader'

const LandingPage = lazy(() => import('@/pages/Landing/LandingPage'))
const LoginPage = lazy(() => import('@/pages/Login/LoginPage'))
const DashboardPage = lazy(() => import('@/pages/Dashboard/DashboardPage'))
const MsmesPage = lazy(() => import('@/pages/MSMEs/MsmesPage'))
const MsmeDetailPage = lazy(() => import('@/pages/MSMEs/MsmeDetailPage'))
const CasesPage = lazy(() => import('@/pages/Cases/CasesPage'))
const CaseDetailPage = lazy(() => import('@/pages/Cases/CaseDetailPage'))
const PortfolioPage = lazy(() => import('@/pages/Portfolio/PortfolioPage'))
const SettingsPage = lazy(() => import('@/pages/Settings/SettingsPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFoundPage'))

function S({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      // Landing Page
      {
        path: '/',
        element: <S><LandingPage /></S>,
      },
      {
        path: '/landing',
        element: <S><LandingPage /></S>,
      },
      // Auth routes
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/login',
            element: <S><LoginPage /></S>,
          },
        ],
      },
      // Dashboard routes (protected)
      {
        element: <DashboardLayout />,
        children: [
          {
            path: '/dashboard',
            element: <S><DashboardPage /></S>,
          },
          {
            path: '/msmes',
            element: <S><MsmesPage /></S>,
          },
          {
            path: '/msmes/:msmeId',
            element: <S><MsmeDetailPage /></S>,
          },
          {
            path: '/cases',
            element: <S><CasesPage /></S>,
          },
          {
            path: '/cases/:caseId',
            element: <S><CaseDetailPage /></S>,
          },
          {
            path: '/cases/:caseId/:tab',
            element: <S><CaseDetailPage /></S>,
          },
          {
            path: '/portfolio',
            element: <S><PortfolioPage /></S>,
          },
          {
            path: '/settings',
            element: <S><SettingsPage /></S>,
          },
        ],
      },
      {
        path: '*',
        element: <S><NotFoundPage /></S>,
      },
    ],
  },
])
