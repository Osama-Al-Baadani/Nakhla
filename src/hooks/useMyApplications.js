import { useEffect, useState } from 'react'
import { getUserFacingErrorMessage } from '../lib/error-messages'
import {
  applicationsService,
  combineApplicationsWithJobs,
} from '../services/applications-service'

const initialState = {
  isLoading: false,
  applications: [],
  error: null,
  isRlsBlocked: false,
}

export function useMyApplications(applicantId) {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    let isMounted = true

    async function load() {
      if (!applicantId) {
        setState(initialState)
        return
      }

      setState({
        isLoading: true,
        applications: [],
        error: null,
        isRlsBlocked: false,
      })

      const listResult = await applicationsService.listMyApplications(applicantId)

      if (!isMounted) {
        return
      }

      if (listResult.kind !== 'success') {
        setState({
          isLoading: false,
          applications: [],
          error: getUserFacingErrorMessage(listResult.error, {
            fallback: 'تعذر تحميل طلبات التقديم.',
            isRlsBlocked: listResult.kind === 'rls_blocked',
          }),
          isRlsBlocked: listResult.kind === 'rls_blocked',
        })
        return
      }

      const jobIds = Array.from(new Set(listResult.data.applications.map((item) => item.job_id)))
      const jobsResult = await applicationsService.getJobsByIds(jobIds)

      if (!isMounted) {
        return
      }

      if (jobsResult.kind !== 'success') {
        setState({
          isLoading: false,
          applications: [],
          error: getUserFacingErrorMessage(jobsResult.error, {
            fallback: 'تعذر تحميل بيانات الوظائف المرتبطة بطلباتك.',
            isRlsBlocked: jobsResult.kind === 'rls_blocked',
          }),
          isRlsBlocked: jobsResult.kind === 'rls_blocked',
        })
        return
      }

      setState({
        isLoading: false,
        applications: combineApplicationsWithJobs(
          listResult.data.applications,
          jobsResult.data,
        ),
        error: null,
        isRlsBlocked: false,
      })
    }

    void load()

    return () => {
      isMounted = false
    }
  }, [applicantId])

  return state
}
