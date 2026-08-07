export const USER_ROLES = ['seeker', 'company']

const protectedPrefixesByRole = {
  seeker: ['/seeker/dashboard', '/seeker', '/jobs', '/applications', '/profile', '/settings'],
  company: ['/company/dashboard', '/company', '/profile', '/settings'],
}

export function isUserRole(value) {
  return value === 'seeker' || value === 'company'
}

export function getRoleFromProfile(profile) {
  if (!profile?.role) {
    return 'unknown'
  }

  return isUserRole(profile.role) ? profile.role : 'unknown'
}

export function getDefaultDashboardPath(role) {
  if (role === 'seeker') {
    return '/seeker/dashboard'
  }

  if (role === 'company') {
    return '/company/dashboard'
  }

  return '/complete-role'
}

export function isRouteAllowedForRole(pathname, role) {
  if (role === 'unknown') {
    return pathname === '/complete-role' || pathname === '/settings' || pathname.startsWith('/profile')
  }

  const allowedPrefixes = protectedPrefixesByRole[role] || []
  return allowedPrefixes.some((prefix) =>
    pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

export function getRoleLabel(role) {
  if (role === 'seeker') {
    return 'باحث عن عمل'
  }

  if (role === 'company') {
    return 'شركة'
  }

  return 'غير محدد'
}

const pendingRoleStorageKey = 'nakhlah_pending_role'

export function storePendingRole(role) {
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(pendingRoleStorageKey, role)
  }
}

export function readPendingRole() {
  if (typeof window === 'undefined') return null
  const value = window.sessionStorage.getItem(pendingRoleStorageKey)
  return isUserRole(value) ? value : null
}

export function clearPendingRole() {
  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem(pendingRoleStorageKey)
  }
}
