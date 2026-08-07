import { useEffect, useState, useMemo } from 'react'
import { getUserFacingErrorMessage } from '../lib/error-messages'
import { jobsService } from '../services/jobs-service'

const PAGE_SIZE = 9

const initialState = {
  isLoading: true,
  isLoadingMore: false,
  jobs: [],
  totalCount: 0,
  error: null,
  hasMore: false,
}

export function useJobs(filters = {}) {
  const [state, setState] = useState(initialState)
  const [page, setPage] = useState(0)

  const filterKey = useMemo(() => JSON.stringify(filters), [filters])

  useEffect(() => {
    let isMounted = true

    async function loadFirstPage() {
      setState(initialState)
      setPage(0)

      const parsedFilters = JSON.parse(filterKey)
      const result = await jobsService.listJobs(parsedFilters, 0, PAGE_SIZE)

      if (!isMounted) {
        return
      }

      if (result.kind === 'error') {
        setState({
          isLoading: false,
          isLoadingMore: false,
          jobs: [],
          totalCount: 0,
          error: getUserFacingErrorMessage(result.error, {
            fallback: 'تعذر تحميل الوظائف في الوقت الحالي.',
          }),
          hasMore: false,
        })
        return
      }

      setState({
        isLoading: false,
        isLoadingMore: false,
        jobs: result.data.jobs,
        totalCount: result.data.count,
        error: null,
        hasMore: result.data.jobs.length < result.data.count,
      })
    }

    void loadFirstPage()

    return () => {
      isMounted = false
    }
  }, [filterKey])

  async function loadMore() {
    const nextPage = page + 1

    setState((current) => ({
      ...current,
      isLoadingMore: true,
    }))

    const parsedFilters = JSON.parse(filterKey)
    const result = await jobsService.listJobs(parsedFilters, nextPage, PAGE_SIZE)

    if (result.kind === 'error') {
      setState((current) => ({
        ...current,
        isLoadingMore: false,
        error: getUserFacingErrorMessage(result.error, {
          fallback: 'تعذر تحميل المزيد من الوظائف.',
        }),
      }))
      return
    }

    setPage(nextPage)
    setState((current) => {
      const mergedJobs = [...current.jobs, ...result.data.jobs]

      return {
        ...current,
        isLoadingMore: false,
        jobs: mergedJobs,
        totalCount: result.data.count,
        error: null,
        hasMore: mergedJobs.length < result.data.count,
      }
    })
  }

  return {
    ...state,
    loadMore,
  }
}
