'use client'

import { useEffect, useState } from 'react'
import { getDevAuthBypassSession, getDevAuthRole, isDevAuthBypassEnabled } from '../lib/dev-auth'
import { getRoleFromProfile, readPendingRole } from '../lib/roles'
import { authService } from '../services/auth-service'
import { useProfile } from './useProfile'

export function useAuth() {
  const [session, setSession] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [authEvent, setAuthEvent] = useState(null)
  const [devRoleState, setDevRoleState] = useState(() => (typeof window !== 'undefined' ? getDevAuthRole() : 'seeker'))
  const profileState = useProfile(isDevAuthBypassEnabled ? undefined : session?.user?.id)

  useEffect(() => {
    function handleDevRoleChange(event) {
      const nextRole = event?.detail?.role ?? getDevAuthRole()
      setDevRoleState(nextRole)
      if (isDevAuthBypassEnabled) {
        setSession(getDevAuthBypassSession())
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('nakhlah-dev-role-change', handleDevRoleChange)
      window.addEventListener('storage', handleDevRoleChange)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('nakhlah-dev-role-change', handleDevRoleChange)
        window.removeEventListener('storage', handleDevRoleChange)
      }
    }
  }, [])

  useEffect(() => {
    if (isDevAuthBypassEnabled) {
      setSession(getDevAuthBypassSession())
      setAuthEvent('SIGNED_IN')
      setIsLoading(false)
      return
    }

    let isMounted = true

    async function loadSession() {
      const nextSession = await authService.getSession()

      if (isMounted) {
        setSession(nextSession)
        setIsLoading(false)
      }
    }

    void loadSession()

    const { data } = authService.onAuthStateChange((nextSession, event) => {
      if (isMounted) {
        setSession(nextSession)
        setIsLoading(false)
        setAuthEvent(event)
      }
    })

    return () => {
      isMounted = false
      if (data?.subscription) {
        data.subscription.unsubscribe()
      }
    }
  }, [])

  const profileRole = getRoleFromProfile(profileState.profile)
  const pendingRole = session?.user?.id ? readPendingRole() : null
  const resolvedRole = isDevAuthBypassEnabled
    ? devRoleState
    : profileRole !== 'unknown'
      ? profileRole
      : pendingRole ?? 'unknown'

  return {
    session,
    user: session?.user ?? null,
    isLoading,
    isAuthenticated: Boolean(session),
    authEvent,
    isDevAuthBypassEnabled,
    profile: profileState.profile,
    role: resolvedRole,
    isProfileLoading: Boolean(session?.user?.id) && !isDevAuthBypassEnabled && profileState.isLoading,
    profileError: profileState.error,
    isProfileRlsBlocked: profileState.isRlsBlocked,
  }
}
