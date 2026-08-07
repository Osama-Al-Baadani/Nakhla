import { supabase } from '../lib/supabase'

function isRlsBlocked(error) {
  if (!error) return false
  const message = `${error.message} ${error.details ?? ''} ${error.hint ?? ''}`.toLowerCase()

  return (
    error.code === '42501' ||
    message.includes('permission denied') ||
    message.includes('row-level security') ||
    message.includes('rls')
  )
}

export const userService = {
  async getOwnUser(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, display_name, proficiency_level, created_at')
      .eq('id', userId)
      .maybeSingle()

    if (error) {
      if (isRlsBlocked(error)) {
        return { kind: 'rls_blocked', error }
      }

      return { kind: 'error', error }
    }

    return {
      kind: 'success',
      user: data ?? null,
    }
  },
}
