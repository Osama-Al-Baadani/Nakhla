import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

export const jobsService = {
  async listJobs(filters = {}, page = 0, pageSize = 10) {
    try {
      const jobsRef = collection(db, 'jobs')
      let querySnapshot

      try {
        const constraints = []
        if (filters.companyId) constraints.push(where('company_id', '==', filters.companyId))
        if (filters.type) constraints.push(where('type', '==', filters.type))
        if (filters.status) constraints.push(where('status', '==', filters.status))
        constraints.push(orderBy('posted_at', 'desc'))

        const q = query(jobsRef, ...constraints)
        querySnapshot = await getDocs(q)
      } catch {
        const simpleQ = query(jobsRef)
        querySnapshot = await getDocs(simpleQ)
      }

      let jobs = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }))

      jobs.sort((a, b) => new Date(b.posted_at || 0) - new Date(a.posted_at || 0))

      if (filters.companyId) {
        jobs = jobs.filter((j) => j.company_id === filters.companyId)
      }
      if (filters.type) {
        jobs = jobs.filter((j) => j.type === filters.type)
      }
      if (filters.status) {
        jobs = jobs.filter((j) => j.status === filters.status)
      }

      if (filters.location) {
        const locTerm = filters.location.toLowerCase()
        jobs = jobs.filter(
          (j) => j.location && j.location.toLowerCase().includes(locTerm),
        )
      }

      if (filters.search && filters.search.trim()) {
        const term = filters.search.trim().toLowerCase()
        jobs = jobs.filter(
          (j) =>
            (j.title && j.title.toLowerCase().includes(term)) ||
            (j.company_name && j.company_name.toLowerCase().includes(term)) ||
            (j.description && j.description.toLowerCase().includes(term)),
        )
      }

      const totalCount = jobs.length
      const from = page * pageSize
      const paginatedJobs = jobs.slice(from, from + pageSize)

      return {
        kind: 'success',
        data: {
          jobs: paginatedJobs,
          count: totalCount,
        },
      }
    } catch (error) {
      return { kind: 'error', error }
    }
  },

  async getJob(jobId) {
    try {
      if (!jobId) {
        return { kind: 'success', job: null }
      }

      const jobRef = doc(db, 'jobs', jobId)
      const jobSnap = await getDoc(jobRef)

      if (!jobSnap.exists()) {
        return { kind: 'success', job: null }
      }

      return {
        kind: 'success',
        job: {
          id: jobSnap.id,
          ...jobSnap.data(),
        },
      }
    } catch (error) {
      return { kind: 'error', error }
    }
  },

  async createJob(companyId, companyName, payload) {
    try {
      const jobData = {
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
      }

      const docRef = await addDoc(collection(db, 'jobs'), jobData)
      return {
        kind: 'success',
        job: {
          id: docRef.id,
          ...jobData,
        },
      }
    } catch (error) {
      return { kind: 'error', error }
    }
  },

  async updateJob(jobId, payload) {
    try {
      const jobRef = doc(db, 'jobs', jobId)
      await updateDoc(jobRef, payload)

      const updatedSnap = await getDoc(jobRef)
      return {
        kind: 'success',
        job: {
          id: updatedSnap.id,
          ...updatedSnap.data(),
        },
      }
    } catch (error) {
      return { kind: 'error', error }
    }
  },
}
