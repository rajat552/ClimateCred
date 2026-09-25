import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'

export function ErrorBoundary() {
  const error = useRouteError()
  
  let message = 'An unexpected error occurred.'
  let status = ''
  
  if (isRouteErrorResponse(error)) {
    status = String(error.status)
    message = error.statusText || message
  } else if (error instanceof Error) {
    message = error.message
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
          <span className="material-symbols-rounded text-4xl text-red-400">error</span>
        </div>
        {status && (
          <div className="text-6xl font-bold text-slate-700">{status}</div>
        )}
        <div>
          <h1 className="text-xl font-bold text-white mb-2">Something went wrong</h1>
          <p className="text-slate-400 text-sm">{message}</p>
        </div>
        <Link
          to="/dashboard"
          className="btn-primary inline-flex items-center gap-2"
        >
          <span className="material-symbols-rounded text-sm">home</span>
          Return to Dashboard
        </Link>
      </div>
    </div>
  )
}
