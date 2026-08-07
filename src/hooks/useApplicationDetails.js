import { useEffect, useState } from 'react'
import { getUserFacingErrorMessage } from '../lib/error-messages'
import {
  applicationsService,
  combineApplicationsWithJobs,
} from '../services/applications-service'

const initialState = {
  isLoading: true,
  application: null,
  error: null,
  isRlsBlocked: false,
}

export function useApplicationDetails(applicationId) {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    let isMounted = true

    async function load() {
      if (!applicationId) {
        setState({ ...initialState, isLoading: false })
        return
      }

      setState(initialState)

      const applicationResult = await applicationsService.getApplication(applicationId)

      if (!isMounted) {
        return
      }

      if (applicationResult.kind !== 'success') {
        setState({
          isLoading: false,
          application: null,
          error: getUserFacingErrorMessage(applicationResult.error, {
            fallback: 'تعذر تحميل تفاصيل الطلب.',
            isRlsBlocked: applicationResult.kind === 'rls_blocked',
          }),
          isRlsBlocked: applicationResult.kind === 'rls_blocked',
        })
        return
      }

      if (!applicationResult.data) {
        setState({
          isLoading: false,
          application: null,
          error: null,
          isRlsBlocked: false,
        })
        return
      }

      const jobsResult = await applicationsService.getJobsByIds([applicationResult.data.job_id])

      if (!isMounted) {
        return
      }

      if (jobsResult.kind !== 'success') {
        setState({
          isLoading: false,
          application: null,
          error: getUserFacingErrorMessage(jobsResult.error, {
            fallback: 'تعذر تحميل بيانات الوظيفة المرتبطة بهذا الطلب.',
            isRlsBlocked: jobsResult.kind === 'rls_blocked',
          }),
          isRlsBlocked: jobsResult.kind === 'rls_blocked',
        })
        return
      }

      setState({
        isLoading: false,
        application: combineApplicationsWithJobs(
          [applicationResult.data],
          jobsResult.data,
        )[0] ?? null,
        error: null,
        isRlsBlocked: false,
      })
    }

    void load()

    return () => {
      isMounted = false
    }
  }, [applicationId])

  return state
}
