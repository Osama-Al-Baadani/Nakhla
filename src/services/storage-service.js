import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../lib/firebase'

export const storageService = {
  async getAvatarBucketAvailability() {
    return {
      kind: 'available',
      bucketName: 'avatars',
    }
  },

  async uploadAvatar(bucketName, userId, file) {
    try {
      const extension = file.name ? file.name.split('.').pop()?.toLowerCase() : 'png'
      const filePath = `avatars/${userId}/avatar-${Date.now()}.${extension}`
      const storageRef = ref(storage, filePath)

      await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(storageRef)

      return { error: null, publicUrl: downloadURL }
    } catch (error) {
      return { error, publicUrl: null }
    }
  },
}
