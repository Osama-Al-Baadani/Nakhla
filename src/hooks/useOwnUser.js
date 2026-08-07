import { useEffect, useState } from 'react'
import { getUserFacingErrorMessage } from '../lib/error-messages'
import { userService } from '../services/user-service'

const initialState = {
  isLoading: false,
  userRecord: null,
  error: null,
  isRlsBlocked: false,
}

export function useOwnUser(userId) {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    let isMounted = true

    async function loadUser() {
      if (!userId) {
        setState(initialState)
        return
      }

      setState({
        isLoading: true,
        userRecord: null,
        error: null,
        isRlsBlocked: false,
      })

      const result = await userService.getOwnUser(userId)

      if (!isMounted) {
        return
      }

      if (result.kind === 'success') {
        setState({
          isLoading: false,
          userRecord: result.user,
          error: null,
          isRlsBlocked: false,
        })
        return
      }

      if (result.kind === 'rls_blocked') {
        setState({
          isLoading: false,
          userRecord: null,
          error: 'لا تملك صلاحية الوصول إلى بيانات الحساب التفصيلية في الوقت الحالي.',
          isRlsBlocked: true,
        })
        return
      }

      setState({
        isLoading: false,
        userRecord: null,
        error: getUserFacingErrorMessage(result.error, {
          fallback: 'تعذر تحميل بيانات الحساب.',
        }),
        isRlsBlocked: false,
      })
    }

    void loadUser()

    return () => {
      isMounted = false
    }
  }, [userId])

  return state
}
