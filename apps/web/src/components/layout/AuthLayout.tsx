import { Navigate, Outlet } from 'react-router-dom'

export function AuthLayout() {
  // Auth check will be added in Step 12
  // For now, renders login page
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Outlet />
    </div>
  )
}
