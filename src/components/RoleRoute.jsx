'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../hooks/useAuth'
import { setDevAuthPreviewRole } from '../lib/dev-auth'
import { ErrorState } from './ErrorState'

export function RoleRoute({ allowedRole, children }) {
  const router = useRouter()
  const { isAuthenticated, isLoading, isProfileLoading, role, profileError, isDevAuthBypassEnabled } = useAuth()

  useEffect(() => {
    if (!isLoading && !isProfileLoading) {
      if (!isAuthenticated && !isDevAuthBypassEnabled) {
        router.replace('/login')
      } else if (role === 'unknown' && !isDevAuthBypassEnabled) {
        router.replace('/complete-role')
      }
    }
  }, [isAuthenticated, isLoading, isProfileLoading, isDevAuthBypassEnabled, role, router])

  if (isLoading || isProfileLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-semibold text-slate-600 shadow-sm animate-pulse">
          جارٍ التحقق من صلاحيات الحساب...
        </div>
      </div>
    )
  }

  // If in dev preview bypass mode and the role doesn't match the route requirement, auto update preview role
  if (isDevAuthBypassEnabled && allowedRole && role !== allowedRole) {
    setDevAuthPreviewRole(allowedRole)
  }

  if (!isAuthenticated && !isDevAuthBypassEnabled) {
    return null
  }

  if (allowedRole && role !== allowedRole && !isDevAuthBypassEnabled) {
    return (
      <div className="mx-auto max-w-3xl py-12 px-4">
        <ErrorState
          title="غير مصرح بالوصول لهذا الحساب"
          description="هذه الصفحة مخصصة لدور مختلف. يمكنك التبديل بين وضع الباحث والشركة عبر الشريط العلوي."
        />
      </div>
    )
  }

  if (profileError && !isDevAuthBypassEnabled) {
    return (
      <div className="mx-auto max-w-3xl py-12 px-4">
        <ErrorState title="تعذر تحميل بيانات الدور" description={profileError} />
      </div>
    )
  }

  return children
}

export function SeekerRoute({ children }) {
  return <RoleRoute allowedRole="seeker">{children}</RoleRoute>
}

export function CompanyRoute({ children }) {
  return <RoleRoute allowedRole="company">{children}</RoleRoute>
}
