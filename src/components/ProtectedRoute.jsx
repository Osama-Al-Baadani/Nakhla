'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../hooks/useAuth'

export function ProtectedRoute({ children }) {
  const router = useRouter()
  const { isLoading, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/register')
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-semibold text-slate-600 shadow-sm animate-pulse">
          جارٍ التحقق من الجلسة والحساب...
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return children
}
