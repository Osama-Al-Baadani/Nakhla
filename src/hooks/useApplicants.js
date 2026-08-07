import { useEffect, useMemo, useState } from 'react'
import { getUserFacingErrorMessage } from '../lib/error-messages'
import {
  applicationsService,
  combineApplicants,
} from '../services/applications-service'

const initialState = {
  isLoading: false,
  applicants: [],
  error: null,
  isRlsBlocked: false,
}

export function useApplicants(jobId, search = '', status = '') {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    let isMounted = true

    async function load() {
      if (!jobId) {
        setState(initialState)
        return
      }

      setState({
        isLoading: true,
        applicants: [],
        error: null,
        isRlsBlocked: false,
      })

      const applicationsResult = await applicationsService.listCompanyJobApplications(jobId)

      if (!isMounted) {
        return
      }

      if (applicationsResult.kind !== 'success') {
        setState({
          isLoading: false,
          applicants: [],
          error: getUserFacingErrorMessage(applicationsResult.error, {
            fallback: 'تعذر تحميل المتقدمين لهذه الوظيفة.',
            isRlsBlocked: applicationsResult.kind === 'rls_blocked',
          }),
          isRlsBlocked: applicationsResult.kind === 'rls_blocked',
        })
        return
      }

      const applicantIds = Array.from(
        new Set(applicationsResult.data.map((item) => item.applicant_id)),
      )

      const [profilesResult, usersResult] = await Promise.all([
        applicationsService.getProfilesByIds(applicantIds),
        applicationsService.getUsersByIds(applicantIds),
      ])

      if (!isMounted) {
        return
      }

      if (profilesResult.kind !== 'success') {
        setState({
          isLoading: false,
          applicants: [],
          error: getUserFacingErrorMessage(profilesResult.error, {
            fallback: 'تعذر تحميل ملفات المتقدمين.',
            isRlsBlocked: profilesResult.kind === 'rls_blocked',
          }),
          isRlsBlocked: profilesResult.kind === 'rls_blocked',
        })
        return
      }

      if (usersResult.kind !== 'success') {
        setState({
          isLoading: false,
          applicants: [],
          error: getUserFacingErrorMessage(usersResult.error, {
            fallback: 'تعذر تحميل بيانات المستخدمين المرتبطة بالمتقدمين.',
            isRlsBlocked: usersResult.kind === 'rls_blocked',
          }),
          isRlsBlocked: usersResult.kind === 'rls_blocked',
        })
        return
      }

      setState({
        isLoading: false,
        applicants: combineApplicants(
          applicationsResult.data,
          profilesResult.data,
          usersResult.data,
        ),
        error: null,
        isRlsBlocked: false,
      })
    }

    void load()

    return () => {
      isMounted = false
    }
  }, [jobId])

  const filteredApplicants = useMemo(() => {
    const searchValue = search.trim().toLowerCase()
    return state.applicants.filter((item) => {
      const name = item.profile?.full_name?.toLowerCase() ?? ''
      const headline = item.profile?.headline?.toLowerCase() ?? ''
      const email = item.user?.email?.toLowerCase() ?? ''
      const currentStatus = item.application.status ?? ''

      const matchesSearch =
        searchValue.length === 0 ||
        name.includes(searchValue) ||
        headline.includes(searchValue) ||
        email.includes(searchValue)

      const matchesStatus = !status || currentStatus === status

      return matchesSearch && matchesStatus
    })
  }, [search, state.applicants, status])

  const statusOptions = useMemo(() => {
    return Array.from(
      new Set(
        state.applicants
          .map((item) => item.application.status)
          .filter(Boolean),
      ),
    )
  }, [state.applicants])

  return {
    ...state,
    applicants: filteredApplicants,
    statusOptions,
  }
}
