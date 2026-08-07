import { supabase } from './supabase'

export async function getDevelopmentSupabaseHealth() {
  if (process.env.NODE_ENV !== 'development') {
    return {
      status: 'configured',
      message: 'Supabase client configured',
    }
  }

  try {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      return {
        status: 'error',
        message: 'connection/configuration error',
      }
    }

    if (data.session) {
      return {
        status: 'session_available',
        message: 'authenticated session available',
      }
    }

    return {
      status: 'no_session',
      message: 'no authenticated session',
    }
  } catch {
    return {
      status: 'error',
      message: 'connection/configuration error',
    }
  }
}
