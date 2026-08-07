import { useEffect, useState } from 'react'
import { getUserFacingErrorMessage } from '../lib/error-messages'
import { profileService } from '../services/profile-service'

const initialState = {
  isLoading: false,
  profile: null,
  error: null,
  isRlsBlocked: false,
}

export function useProfile(userId) {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    let isMounted = true

    async function loadProfile() {
      if (!userId) {
        setState(initialState)
        return
      }

      setState({
        isLoading: true,
        profile: null,
        error: null,
        isRlsBlocked: false,
      })

      const result = await profileService.getOwnProfile(userId)

      if (!isMounted) {
        return
      }

      if (result.kind === 'success') {
        setState({
          isLoading: false,
          profile: result.profile,
          error: null,
          isRlsBlocked: false,
        })
        return
      }

      if (result.kind === 'rls_blocked') {
        setState({
          isLoading: false,
          profile: null,
          error: 'تم حظر الوصول إلى بيانات الملف الشخصي بواسطة سياسات الأمان الحالية في Supabase.',
          isRlsBlocked: true,
        })
        return
      }

      setState({
        isLoading: false,
        profile: null,
        error: getUserFacingErrorMessage(result.error, {
          fallback: 'تعذر تحميل بيانات الملف الشخصي في الوقت الحالي.',
        }),
        isRlsBlocked: false,
      })
    }

    void loadProfile()

    return () => {
      isMounted = false
    }
  }, [userId])

  return state
}
