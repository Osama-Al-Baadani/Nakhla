const devAuthRoleStorageKey = 'nakhlah_dev_auth_role'

export const isDevAuthBypassEnabled =
  process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === 'true'

function readEnvDevAuthRole() {
  return process.env.NEXT_PUBLIC_DEV_AUTH_ROLE === 'company' ? 'company' : 'seeker'
}

export function getDevAuthRole() {
  if (typeof window === 'undefined') {
    return readEnvDevAuthRole()
  }

  const storedRole = window.sessionStorage.getItem(devAuthRoleStorageKey)

  if (storedRole === 'company' || storedRole === 'seeker') {
    return storedRole
  }

  return readEnvDevAuthRole()
}

export function setDevAuthPreviewRole(role) {
  if (typeof window === 'undefined') {
    return
  }

  window.sessionStorage.setItem(devAuthRoleStorageKey, role)
}

export function getDevAuthBypassSession() {
  const role = getDevAuthRole()

  return {
    access_token: 'dev-auth-bypass-token',
    refresh_token: 'dev-auth-bypass-refresh-token',
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    token_type: 'bearer',
    user: {
      id: '00000000-0000-4000-8000-000000000001',
      aud: 'authenticated',
      role: 'authenticated',
      email: 'dev-auth@nakhlah.local',
      email_confirmed_at: new Date().toISOString(),
      phone: '',
      confirmed_at: new Date().toISOString(),
      last_sign_in_at: new Date().toISOString(),
      app_metadata: {
        provider: 'email',
        providers: ['email'],
      },
      user_metadata: {
        full_name: 'مستخدم المعاينة التطويرية',
        dev_auth_bypass: true,
        preview_role: role,
      },
      identities: [],
      created_at: new Date(0).toISOString(),
      updated_at: new Date().toISOString(),
      is_anonymous: false,
    },
  }
}
