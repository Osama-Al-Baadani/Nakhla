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
  documentId,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

export const applicationsService = {
  async listMyApplications(applicantId) {
    try {
      const appsRef = collection(db, 'applications')
      const q = query(
        appsRef,
        where('applicant_id', '==', applicantId),
        orderBy('applied_at', 'desc'),
      )

      const querySnapshot = await getDocs(q)
      const apps = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }))

      return {
        kind: 'success',
        data: {
          applications: apps,
          count: apps.length,
        },
      }
    } catch (error) {
      return { kind: 'error', error }
    }
  },

  async getApplication(applicationId) {
    try {
      if (!applicationId) {
        return { kind: 'success', data: null }
      }

      const appRef = doc(db, 'applications', applicationId)
      const appSnap = await getDoc(appRef)

      if (!appSnap.exists()) {
        return { kind: 'success', data: null }
      }

      return {
        kind: 'success',
        data: {
          id: appSnap.id,
          ...appSnap.data(),
        },
      }
    } catch (error) {
      return { kind: 'error', error }
    }
  },

  async getApplicationByJobAndApplicant(jobId, applicantId) {
    try {
      const appsRef = collection(db, 'applications')
      const q = query(
        appsRef,
        where('job_id', '==', jobId),
        where('applicant_id', '==', applicantId),
      )

      const querySnapshot = await getDocs(q)
      if (querySnapshot.empty) {
        return { kind: 'success', data: null }
      }

      const firstDoc = querySnapshot.docs[0]
      return {
        kind: 'success',
        data: {
          id: firstDoc.id,
          ...firstDoc.data(),
        },
      }
    } catch (error) {
      return { kind: 'error', error }
    }
  },

  async createApplication(jobId, applicantId) {
    try {
      const payload = {
        job_id: jobId,
        applicant_id: applicantId,
        status: 'pending',
        applied_at: new Date().toISOString(),
      }

      const docRef = await addDoc(collection(db, 'applications'), payload)
      return {
        kind: 'success',
        data: {
          id: docRef.id,
          ...payload,
        },
      }
    } catch (error) {
      return { kind: 'error', error }
    }
  },

  async listCompanyJobApplications(jobId) {
    try {
      const appsRef = collection(db, 'applications')
      const q = query(
        appsRef,
        where('job_id', '==', jobId),
        orderBy('applied_at', 'desc'),
      )

      const querySnapshot = await getDocs(q)
      const apps = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }))

      return {
        kind: 'success',
        data: apps,
      }
    } catch (error) {
      return { kind: 'error', error }
    }
  },

  async updateApplicationStatus(applicationId, status) {
    try {
      const appRef = doc(db, 'applications', applicationId)
      await updateDoc(appRef, { status })

      const updatedSnap = await getDoc(appRef)
      return {
        kind: 'success',
        data: {
          id: updatedSnap.id,
          ...updatedSnap.data(),
        },
      }
    } catch (error) {
      return { kind: 'error', error }
    }
  },

  async getJobsByIds(jobIds) {
    if (!jobIds || jobIds.length === 0) {
      return { kind: 'success', data: [] }
    }

    try {
      const jobs = []
      // Fetch in chunks of 10 for Firestore field limit if necessary, or individual getDocs
      for (const jobId of jobIds) {
        const docRef = doc(db, 'jobs', jobId)
        const snap = await getDoc(docRef)
        if (snap.exists()) {
          jobs.push({ id: snap.id, ...snap.data() })
        }
      }
      return { kind: 'success', data: jobs }
    } catch (error) {
      return { kind: 'error', error }
    }
  },

  async getProfilesByIds(profileIds) {
    if (!profileIds || profileIds.length === 0) {
      return { kind: 'success', data: [] }
    }

    try {
      const profiles = []
      for (const profileId of profileIds) {
        const docRef = doc(db, 'profiles', profileId)
        const snap = await getDoc(docRef)
        if (snap.exists()) {
          profiles.push({ id: snap.id, ...snap.data() })
        }
      }
      return { kind: 'success', data: profiles }
    } catch (error) {
      return { kind: 'error', error }
    }
  },

  async getUsersByIds(userIds) {
    if (!userIds || userIds.length === 0) {
      return { kind: 'success', data: [] }
    }

    try {
      const users = []
      for (const userId of userIds) {
        const docRef = doc(db, 'users', userId)
        const snap = await getDoc(docRef)
        if (snap.exists()) {
          users.push({ id: snap.id, ...snap.data() })
        }
      }
      return { kind: 'success', data: users }
    } catch (error) {
      return { kind: 'error', error }
    }
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
