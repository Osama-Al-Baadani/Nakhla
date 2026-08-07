'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../hooks/useAuth'

export function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated, isDevAuthBypassEnabled } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isDevAuthBypassEnabled) {
      router.replace('/login')
    }
  }, [isLoading, isAuthenticated, isDevAuthBypassEnabled, router])

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-semibold text-slate-600 shadow-sm animate-pulse">
          جارٍ تحميل الجلسة...
        </div>
      </div>
    )
  }

  if (!isAuthenticated && !isDevAuthBypassEnabled) {
    return null
  }

  return children
}
