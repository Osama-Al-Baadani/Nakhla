import { useEffect, useState } from 'react'
import { getUserFacingErrorMessage } from '../lib/error-messages'
import { profileService } from '../services/profile-service'

const initialState = {
  isLoading: false,
  profile: null,
  error: null,
  isRlsBlocked: false,
}

export function usePublicProfile(profileId) {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    let isMounted = true

    async function loadProfile() {
      if (!profileId) {
        setState(initialState)
        return
      }

      setState({
        isLoading: true,
        profile: null,
        error: null,
        isRlsBlocked: false,
      })

      const result = await profileService.getPublicProfile(profileId)

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
          error: 'هذا الملف الشخصي غير متاح حاليًا بسبب صلاحيات الوصول الحالية.',
          isRlsBlocked: true,
        })
        return
      }

      setState({
        isLoading: false,
        profile: null,
        error: getUserFacingErrorMessage(result.error, {
          fallback: 'تعذر تحميل الملف الشخصي.',
        }),
        isRlsBlocked: false,
      })
    }

    void loadProfile()

    return () => {
      isMounted = false
    }
  }, [profileId])

  return state
}
