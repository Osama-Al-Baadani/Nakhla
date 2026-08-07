import { supabase } from '../lib/supabase'

const candidateNames = ['avatars', 'avatar', 'profile', 'profiles', 'profile-images']

export const storageService = {
  async getAvatarBucketAvailability() {
    const { data, error } = await supabase.storage.listBuckets()

    if (error || !data) {
      return {
        kind: 'unavailable',
        reason: 'تعذر التحقق من توفر حاوية مناسبة للصور في Supabase Storage.',
      }
    }

    const bucket = data.find((item) =>
      candidateNames.includes(item.name.toLowerCase()),
    )

    if (!bucket) {
      return {
        kind: 'unavailable',
        reason: 'لا توجد حاوية مناسبة معروفة لصور الملفات الشخصية.',
      }
    }

    return {
      kind: 'available',
      bucketName: bucket.name,
    }
  },

  async uploadAvatar(bucketName, userId, file) {
    const extension = file.name ? file.name.split('.').pop()?.toLowerCase() : 'png'
    const filePath = `${userId}/avatar-${Date.now()}.${extension}`

    const { error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, { upsert: true })

    if (error) {
      return { error, publicUrl: null }
    }

    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath)

    return { error: null, publicUrl: data.publicUrl }
  },
}
