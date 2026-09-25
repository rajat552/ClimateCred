import { Outlet } from 'react-router-dom'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Outlet />
    </div>
  )
}
