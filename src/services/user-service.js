import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'

export const userService = {
  async getOwnUser(userId) {
    try {
      if (!userId) {
        return { kind: 'success', user: null }
      }

      const userRef = doc(db, 'users', userId)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists()) {
        const initialUserData = {
          email: auth.currentUser?.email || '',
          role: 'seeker',
          created_at: new Date().toISOString(),
        }
        await setDoc(userRef, initialUserData, { merge: true })
        return {
          kind: 'success',
          user: {
            id: userId,
            ...initialUserData,
          },
        }
      }

      return {
        kind: 'success',
        user: {
          id: userSnap.id,
          ...userSnap.data(),
        },
      }
    } catch (error) {
      return { kind: 'error', error }
    }
  },
}
