import { supabase } from '../lib/supabase'

const JOB_SELECT =
  'id, company_id, company_name, title, location, salary_range, type, description, skills_required, status, posted_at'

export const jobsService = {
  async listJobs(filters = {}, page = 0, pageSize = 10) {
    const from = page * pageSize
    const to = from + pageSize - 1

    let query = supabase
      .from('jobs')
      .select(JOB_SELECT, { count: 'exact' })
      .order('posted_at', { ascending: false, nullsFirst: false })

    if (filters.companyId) {
      query = query.eq('company_id', filters.companyId)
    }

    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`)
    }

    if (filters.type) {
      query = query.eq('type', filters.type)
    }

    if (filters.status) {
      query = query.eq('status', filters.status)
    }

    if (filters.search && filters.search.trim()) {
      const term = filters.search.trim()
      query = query.or(
        `title.ilike.%${term}%,company_name.ilike.%${term}%,description.ilike.%${term}%`,
      )
    }

    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) {
      return { kind: 'error', error }
    }

    return {
      kind: 'success',
      data: {
        jobs: data ?? [],
        count: count ?? 0,
      },
    }
  },

  async getJob(jobId) {
    const { data, error } = await supabase
      .from('jobs')
      .select(JOB_SELECT)
      .eq('id', jobId)
      .maybeSingle()

    if (error) {
      return { kind: 'error', error }
    }

    return {
      kind: 'success',
      job: data ?? null,
    }
  },

  async createJob(companyId, companyName, payload) {
    const { data, error } = await supabase
      .from('jobs')
      .insert({
        company_id: companyId,
        company_name: companyName,
        title: payload.title,
        location: payload.location,
        salary_range: payload.salary_range,
        type: payload.type,
        description: payload.description,
        skills_required: payload.skills_required,
        status: payload.status || 'open',
        posted_at: new Date().toISOString(),
      })
      .select(JOB_SELECT)
      .single()

    if (error) {
      return { kind: 'error', error }
    }

    return { kind: 'success', job: data }
  },

  async updateJob(jobId, payload) {
    const { data, error } = await supabase
      .from('jobs')
      .update(payload)
      .eq('id', jobId)
      .select(JOB_SELECT)
      .single()

    if (error) {
      return { kind: 'error', error }
    }

    return { kind: 'success', job: data }
  },
}
