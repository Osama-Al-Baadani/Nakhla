import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword as firebaseUpdatePassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '../lib/firebase'
import { getDevAuthBypassSession, isDevAuthBypassEnabled } from '../lib/dev-auth'

export const authService = {
  async getSession() {
    if (isDevAuthBypassEnabled) {
      return getDevAuthBypassSession()
    }

    const user = auth.currentUser
    if (!user) return null

    return {
      user: {
        id: user.uid,
        email: user.email,
        user_metadata: {
          full_name: user.displayName,
        },
      },
    }
  },

  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      return {
        data: {
          user: {
            id: user.uid,
            email: user.email,
          },
          session: {
            user: {
              id: user.uid,
              email: user.email,
            },
          },
        },
        error: null,
      }
    } catch (error) {
      return { data: { user: null, session: null }, error }
    }
  },

  async signUp(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      return {
        data: {
          user: {
            id: user.uid,
            email: user.email,
          },
        },
        error: null,
      }
    } catch (error) {
      return { data: { user: null }, error }
    }
  },

  async sendPasswordReset(email) {
    try {
      await sendPasswordResetEmail(auth, email)
      return { data: {}, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  async updatePassword(password) {
    try {
      const user = auth.currentUser
      if (!user) throw new Error('No user currently signed in')
      await firebaseUpdatePassword(user, password)
      return { data: {}, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  async signOut() {
    if (isDevAuthBypassEnabled) {
      return { error: null }
    }

    try {
      await firebaseSignOut(auth)
      return { error: null }
    } catch (error) {
      return { error }
    }
  },

  onAuthStateChange(callback) {
    if (isDevAuthBypassEnabled) {
      callback(getDevAuthBypassSession(), 'SIGNED_IN')

      return {
        data: {
          subscription: {
            unsubscribe() {},
          },
        },
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const session = {
          user: {
            id: user.uid,
            email: user.email,
            user_metadata: {
              full_name: user.displayName,
            },
          },
        }
        callback(session, 'SIGNED_IN')
      } else {
        callback(null, 'SIGNED_OUT')
      }
    })

    return {
      data: {
        subscription: {
          unsubscribe,
        },
      },
    }
  },
}
