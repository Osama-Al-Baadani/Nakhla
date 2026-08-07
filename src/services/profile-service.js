import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

export const profileService = {
  async getOwnProfile(userId) {
    try {
      if (!userId) {
        return { kind: 'success', profile: null }
      }

      const profileRef = doc(db, 'profiles', userId)
      const profileSnap = await getDoc(profileRef)

      if (!profileSnap.exists()) {
        return {
          kind: 'success',
          profile: null,
        }
      }

      return {
        kind: 'success',
        profile: {
          id: profileSnap.id,
          ...profileSnap.data(),
        },
      }
    } catch (error) {
      return { kind: 'error', error }
    }
  },

  async getPublicProfile(profileId) {
    try {
      if (!profileId) {
        return { kind: 'success', profile: null }
      }

      const profileRef = doc(db, 'profiles', profileId)
      const profileSnap = await getDoc(profileRef)

      if (!profileSnap.exists()) {
        return {
          kind: 'success',
          profile: null,
        }
      }

      return {
        kind: 'success',
        profile: {
          id: profileSnap.id,
          ...profileSnap.data(),
        },
      }
    } catch (error) {
      return { kind: 'error', error }
    }
  },

  async updateOwnProfile(userId, input) {
    try {
      if (!userId) {
        return { kind: 'error', error: new Error('Missing userId') }
      }

      const profileRef = doc(db, 'profiles', userId)
      const payload = {
        full_name: input.full_name || null,
        avatar_url: input.avatar_url || null,
        headline: input.headline || null,
        bio: input.bio || null,
        github_url: input.github_url || null,
        skills: input.skills && input.skills.length > 0 ? input.skills : null,
        experience_years: input.experience_years ?? 0,
        updated_at: new Date().toISOString(),
      }

      await setDoc(profileRef, payload, { merge: true })

      const updatedSnap = await getDoc(profileRef)
      return {
        kind: 'success',
        profile: {
          id: updatedSnap.id,
          ...updatedSnap.data(),
        },
      }
    } catch (error) {
      return { kind: 'error', error }
    }
  },

  async updateOwnRole(userId, role) {
    try {
      if (!userId) {
        return { kind: 'error', error: new Error('Missing userId') }
      }

      const profileRef = doc(db, 'profiles', userId)
      const payload = {
        role,
        updated_at: new Date().toISOString(),
      }

      await setDoc(profileRef, payload, { merge: true })

      const updatedSnap = await getDoc(profileRef)
      return {
        kind: 'success',
        profile: {
          id: updatedSnap.id,
          ...updatedSnap.data(),
        },
      }
    } catch (error) {
      return { kind: 'error', error }
    }
  },
}
