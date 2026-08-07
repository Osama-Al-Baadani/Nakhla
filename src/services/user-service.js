import { doc, getDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

export const userService = {
  async getOwnUser(userId) {
    try {
      if (!userId) {
        return { kind: 'success', user: null }
      }

      const userRef = doc(db, 'users', userId)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists()) {
        return {
          kind: 'success',
          user: null,
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
