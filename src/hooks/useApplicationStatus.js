import { useEffect, useState } from 'react'
import { getUserFacingErrorMessage } from '../lib/error-messages'
import { applicationsService } from '../services/applications-service'

const initialState = {
  isLoading: false,
  isSubmitting: false,
  application: null,
  error: null,
  isRlsBlocked: false,
  successMessage: null,
}

export function useApplicationStatus(jobId, applicantId) {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    let isMounted = true

    async function load() {
      if (!jobId || !applicantId) {
        setState(initialState)
        return
      }

      setState((current) => ({
        ...current,
        isLoading: true,
        error: null,
        isRlsBlocked: false,
      }))

      const result = await applicationsService.getApplicationByJobAndApplicant(jobId, applicantId)

      if (!isMounted) {
        return
      }

      if (result.kind === 'success') {
        setState((current) => ({
          ...current,
          isLoading: false,
          application: result.data,
          error: null,
          isRlsBlocked: false,
        }))
        return
      }

      setState((current) => ({
        ...current,
        isLoading: false,
        application: null,
        error: getUserFacingErrorMessage(result.error, {
          fallback: 'تعذر التحقق من حالة التقديم.',
          isRlsBlocked: result.kind === 'rls_blocked',
        }),
        isRlsBlocked: result.kind === 'rls_blocked',
      }))
    }

    void load()

    return () => {
      isMounted = false
    }
  }, [jobId, applicantId])

  async function apply() {
    if (!jobId || !applicantId || state.application || state.isSubmitting) {
      return
    }

    setState((current) => ({
      ...current,
      isSubmitting: true,
      error: null,
      successMessage: null,
    }))

    const result = await applicationsService.createApplication(jobId, applicantId)

    if (result.kind === 'success') {
      setState((current) => ({
        ...current,
        isSubmitting: false,
        application: result.data,
        successMessage: 'تم إرسال طلب التقديم بنجاح.',
        error: null,
        isRlsBlocked: false,
      }))
      return
    }

    setState((current) => ({
      ...current,
      isSubmitting: false,
      error: getUserFacingErrorMessage(result.error, {
        fallback: 'تعذر إرسال طلب التقديم.',
        isRlsBlocked: result.kind === 'rls_blocked',
      }),
      isRlsBlocked: result.kind === 'rls_blocked',
    }))
  }

  return {
    ...state,
    hasApplied: Boolean(state.application),
    apply,
  }
}
