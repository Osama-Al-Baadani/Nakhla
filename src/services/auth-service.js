import { getDevAuthBypassSession, isDevAuthBypassEnabled } from '../lib/dev-auth'
import { supabase } from '../lib/supabase'

export const authService = {
  async getSession() {
    if (isDevAuthBypassEnabled) {
      return getDevAuthBypassSession()
    }

    const { data, error } = await supabase.auth.getSession()

    if (error) {
      return null
    }

    return data.session
  },

  async signIn(email, password) {
    return supabase.auth.signInWithPassword({
      email,
      password,
    })
  },

  async signUp(email, password) {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    return supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/reset-password`,
      },
    })
  },

  async sendPasswordReset(email) {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/reset-password`,
    })
  },

  async updatePassword(password) {
    return supabase.auth.updateUser({
      password,
    })
  },

  async signOut() {
    if (isDevAuthBypassEnabled) {
      return { error: null }
    }

    return supabase.auth.signOut()
  },

  onAuthStateChange(callback) {
    if (isDevAuthBypassEnabled) {
      callback(getDevAuthBypassSession(), 'SIGNED_IN')

      return {
        data: {
          subscription: {
            unsubscribe() {},
          },
        },
      }
    }

    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session, event)
    })
  },
}
