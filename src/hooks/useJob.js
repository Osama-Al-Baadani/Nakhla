import { useEffect, useState } from 'react'
import { getUserFacingErrorMessage } from '../lib/error-messages'
import { jobsService } from '../services/jobs-service'

const initialState = {
  isLoading: true,
  job: null,
  error: null,
}

export function useJob(jobId) {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    let isMounted = true

    async function loadJob() {
      if (!jobId) {
        setState({
          isLoading: false,
          job: null,
          error: null,
        })
        return
      }

      setState(initialState)

      const result = await jobsService.getJob(jobId)

      if (!isMounted) {
        return
      }

      if (result.kind === 'error') {
        setState({
          isLoading: false,
          job: null,
          error: getUserFacingErrorMessage(result.error, {
            fallback: 'تعذر تحميل تفاصيل الوظيفة.',
          }),
        })
        return
      }

      setState({
        isLoading: false,
        job: result.job,
        error: null,
      })
    }

    void loadJob()

    return () => {
      isMounted = false
    }
  }, [jobId])

  return state
}
