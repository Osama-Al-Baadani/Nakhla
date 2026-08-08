'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../hooks/useAuth'

export function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated, isDevAuthBypassEnabled } = useAuth()
  const hasDevPreview = typeof window !== 'undefined' && Boolean(window.sessionStorage.getItem('nakhlah_dev_auth_role'))
  const canAccess = isAuthenticated || isDevAuthBypassEnabled || hasDevPreview

  useEffect(() => {
    if (!isLoading && !canAccess) {
      router.replace('/login')
    }
  }, [isLoading, canAccess, router])

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-semibold text-slate-600 shadow-sm animate-pulse">
          جارٍ تحميل الجلسة...
        </div>
      </div>
    )
  }

  if (!canAccess) {
    return null
  }

  return children
}
