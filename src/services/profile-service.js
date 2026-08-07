import { supabase } from '../lib/supabase'

function isRlsBlocked(error) {
  if (!error) return false
  const message = `${error.message} ${error.details ?? ''} ${error.hint ?? ''}`.toLowerCase()

  return (
    error.code === '42501' ||
    message.includes('permission denied') ||
    message.includes('not allowed') ||
    message.includes('row-level security') ||
    message.includes('rls')
  )
}

const SELECT_FIELDS =
  'id, role, full_name, avatar_url, headline, bio, github_url, skills, experience_years, completion_score, wallet_balance, created_at, updated_at'

export const profileService = {
  async getOwnProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select(SELECT_FIELDS)
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
      profile: data ?? null,
    }
  },

  async getPublicProfile(profileId) {
    const { data, error } = await supabase
      .from('profiles')
      .select(SELECT_FIELDS)
      .eq('id', profileId)
      .maybeSingle()

    if (error) {
      if (isRlsBlocked(error)) {
        return { kind: 'rls_blocked', error }
      }

      return { kind: 'error', error }
    }

    return {
      kind: 'success',
      profile: data ?? null,
    }
  },

  async updateOwnProfile(userId, input) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        full_name: input.full_name || null,
        avatar_url: input.avatar_url || null,
        headline: input.headline || null,
        bio: input.bio || null,
        github_url: input.github_url || null,
        skills: input.skills && input.skills.length > 0 ? input.skills : null,
        experience_years: input.experience_years ?? 0,
      })
      .eq('id', userId)
      .select(SELECT_FIELDS)
      .maybeSingle()

    if (error) {
      if (isRlsBlocked(error)) {
        return { kind: 'rls_blocked', error }
      }

      return { kind: 'error', error }
    }

    return {
      kind: 'success',
      profile: data ?? null,
    }
  },

  async updateOwnRole(userId, role) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        role,
      })
      .eq('id', userId)
      .select(SELECT_FIELDS)
      .maybeSingle()

    if (error) {
      if (isRlsBlocked(error)) {
        return { kind: 'rls_blocked', error }
      }

      return { kind: 'error', error }
    }

    return {
      kind: 'success',
      profile: data ?? null,
    }
  },
}
