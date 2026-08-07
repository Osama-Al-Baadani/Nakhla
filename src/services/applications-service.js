import { supabase } from '../lib/supabase'

const APPLICATION_SELECT =
  'id, job_id, applicant_id, status, match_score, ai_feedback, applied_at'
const JOB_SELECT =
  'id, company_id, company_name, title, location, salary_range, type, description, skills_required, status, posted_at'
const PROFILE_SELECT =
  'id, role, full_name, avatar_url, headline, bio, github_url, skills, experience_years, completion_score, wallet_balance, created_at, updated_at'
const USER_SELECT = 'id, email, display_name, proficiency_level, created_at'

function isRlsBlocked(error) {
  if (!error) return false
  const message = `${error.message} ${error.details ?? ''} ${error.hint ?? ''}`.toLowerCase()

  return (
    error.code === '42501' ||
    message.includes('permission denied') ||
    message.includes('not allowed') ||
    message.includes('row-level security') ||
    message.includes('rls')
  )
}

function mapError(error) {
  if (isRlsBlocked(error)) {
    return { kind: 'rls_blocked', error }
  }

  return { kind: 'error', error }
}

export const applicationsService = {
  async listMyApplications(applicantId) {
    const { data, error, count } = await supabase
      .from('applications')
      .select(APPLICATION_SELECT, { count: 'exact' })
      .eq('applicant_id', applicantId)
      .order('applied_at', { ascending: false, nullsFirst: false })

    if (error) {
      return mapError(error)
    }

    return {
      kind: 'success',
      data: {
        applications: data ?? [],
        count: count ?? 0,
      },
    }
  },

  async getApplication(applicationId) {
    const { data, error } = await supabase
      .from('applications')
      .select(APPLICATION_SELECT)
      .eq('id', applicationId)
      .maybeSingle()

    if (error) {
      return mapError(error)
    }

    return {
      kind: 'success',
      data: data ?? null,
    }
  },

  async getApplicationByJobAndApplicant(jobId, applicantId) {
    const { data, error } = await supabase
      .from('applications')
      .select(APPLICATION_SELECT)
      .eq('job_id', jobId)
      .eq('applicant_id', applicantId)
      .maybeSingle()

    if (error) {
      return mapError(error)
    }

    return {
      kind: 'success',
      data: data ?? null,
    }
  },

  async createApplication(jobId, applicantId) {
    const { data, error } = await supabase
      .from('applications')
      .insert({
        job_id: jobId,
        applicant_id: applicantId,
      })
      .select(APPLICATION_SELECT)
      .single()

    if (error) {
      return mapError(error)
    }

    return {
      kind: 'success',
      data: data,
    }
  },

  async listCompanyJobApplications(jobId) {
    const { data, error } = await supabase
      .from('applications')
      .select(APPLICATION_SELECT)
      .eq('job_id', jobId)
      .order('applied_at', { ascending: false, nullsFirst: false })

    if (error) {
      return mapError(error)
    }

    return {
      kind: 'success',
      data: data ?? [],
    }
  },

  async updateApplicationStatus(applicationId, status) {
    const { data, error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', applicationId)
      .select(APPLICATION_SELECT)
      .single()

    if (error) {
      return mapError(error)
    }

    return {
      kind: 'success',
      data: data,
    }
  },

  async getJobsByIds(jobIds) {
    if (!jobIds || jobIds.length === 0) {
      return { kind: 'success', data: [] }
    }

    const { data, error } = await supabase
      .from('jobs')
      .select(JOB_SELECT)
      .in('id', jobIds)

    if (error) {
      return mapError(error)
    }

    return { kind: 'success', data: data ?? [] }
  },

  async getProfilesByIds(profileIds) {
    if (!profileIds || profileIds.length === 0) {
      return { kind: 'success', data: [] }
    }

    const { data, error } = await supabase
      .from('profiles')
      .select(PROFILE_SELECT)
      .in('id', profileIds)

    if (error) {
      return mapError(error)
    }

    return { kind: 'success', data: data ?? [] }
  },

  async getUsersByIds(userIds) {
    if (!userIds || userIds.length === 0) {
      return { kind: 'success', data: [] }
    }

    const { data, error } = await supabase
      .from('users')
      .select(USER_SELECT)
      .in('id', userIds)

    if (error) {
      return mapError(error)
    }

    return { kind: 'success', data: data ?? [] }
  },
}

export function combineApplicationsWithJobs(applications, jobs) {
  const jobsMap = new Map(jobs.map((job) => [job.id, job]))

  return applications.map((application) => ({
    ...application,
    job: jobsMap.get(application.job_id) ?? null,
  }))
}

export function combineApplicants(applications, profiles, users) {
  const profilesMap = new Map(profiles.map((profile) => [profile.id, profile]))
  const usersMap = new Map(users.map((user) => [user.id, user]))

  return applications.map((application) => ({
    application,
    profile: profilesMap.get(application.applicant_id) ?? null,
    user: usersMap.get(application.applicant_id) ?? null,
  }))
}
