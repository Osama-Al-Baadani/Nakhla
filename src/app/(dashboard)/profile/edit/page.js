'use client'

import { useEffect, useMemo, useState } from 'react'
import { FileText, ImageUp, Save } from 'lucide-react'
import { Badge } from '../../../../components/Badge'
import { Button } from '../../../../components/Button'
import { Card } from '../../../../components/Card'
import { EmptyState } from '../../../../components/EmptyState'
import { ErrorState } from '../../../../components/ErrorState'
import { Input } from '../../../../components/Input'
import { PageHeader } from '../../../../components/PageHeader'
import { Select } from '../../../../components/Select'
import { Skeleton } from '../../../../components/Skeleton'
import { Textarea } from '../../../../components/Textarea'
import { useAuth } from '../../../../hooks/useAuth'
import { useProfile } from '../../../../hooks/useProfile'
import { getUserFacingErrorMessage } from '../../../../lib/error-messages'
import { profileService } from '../../../../services/profile-service'
import { storageService } from '../../../../services/storage-service'

const initialStorageState = {
  isLoading: true,
  mode: 'url',
  message: 'جارٍ التحقق من توفر حاوية مناسبة للصور...',
  bucketName: null,
}

export default function EditProfilePage() {
  const { user, role } = useAuth()
  const { isLoading, profile, error, isRlsBlocked } = useProfile(user?.id)
  const isCompany = role === 'company'
  const [form, setForm] = useState({
    full_name: '',
    avatar_url: '',
    headline: '',
    bio: '',
    github_url: '',
    skills: [],
    experience_years: null,
  })
  const [skillsInput, setSkillsInput] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitState, setSubmitState] = useState({
    isSubmitting: false,
    success: null,
    error: null,
  })
  const [storageState, setStorageState] = useState(initialStorageState)

  useEffect(() => {
    if (!profile) return

    const nextSkills = profile.skills ?? []
    setForm({
      full_name: profile.full_name ?? '',
      avatar_url: profile.avatar_url ?? '',
      headline: profile.headline ?? '',
      bio: profile.bio ?? '',
      github_url: profile.github_url ?? '',
      skills: nextSkills,
      experience_years: profile.experience_years,
    })
    setSkillsInput(nextSkills.join('، '))
  }, [profile])

  useEffect(() => {
    let isMounted = true

    async function checkStorage() {
      const result = await storageService.getAvatarBucketAvailability()
      if (!isMounted) return

      if (result.kind === 'available') {
        setStorageState({
          isLoading: false,
          mode: 'upload',
          message: `تم العثور على حاوية مناسبة للصور: ${result.bucketName}`,
          bucketName: result.bucketName,
        })
        return
      }

      setStorageState({
        isLoading: false,
        mode: 'url',
        message: result.reason,
        bucketName: null,
      })
    }

    void checkStorage()
    return () => {
      isMounted = false
    }
  }, [])

  const canEdit = useMemo(() => Boolean(profile) && !isRlsBlocked, [profile, isRlsBlocked])

  function setField(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function handleAvatarUpload(event) {
    const file = event.target.files?.[0]
    if (!file || !user?.id || storageState.mode !== 'upload' || !storageState.bucketName) return

    setSubmitState({ isSubmitting: true, success: null, error: null })
    const result = await storageService.uploadAvatar(storageState.bucketName, user.id, file)

    if (result.error || !result.publicUrl) {
      setSubmitState({
        isSubmitting: false,
        success: null,
        error: result.error?.message ?? 'تعذر رفع الصورة إلى الحاوية الحالية.',
      })
      return
    }

    setField('avatar_url', result.publicUrl)
    setSubmitState({
      isSubmitting: false,
      success: isCompany ? 'تم رفع صورة الشركة، ويمكنك الآن حفظ التغييرات.' : 'تم رفع الصورة، ويمكنك الآن حفظ الملف الشخصي.',
      error: null,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!user?.id) return

    const nextErrors = {}
    if (!form.full_name.trim()) {
      nextErrors.full_name = isCompany ? 'اسم الشركة مطلوب.' : 'الاسم الكامل مطلوب.'
    }
    if (form.github_url.trim() && !/^https?:\/\//i.test(form.github_url.trim())) {
      nextErrors.github_url = isCompany ? 'أدخل رابطًا صالحًا يبدأ بـ http أو https.' : 'أدخل رابط GitHub صالحًا يبدأ بـ http أو https.'
    }

    const parsedSkills = skillsInput
      .split(/[,\u060C]/)
      .map((skill) => skill.trim())
      .filter(Boolean)

    setFieldErrors(nextErrors)
    setSubmitState({ isSubmitting: false, success: null, error: null })
    if (Object.keys(nextErrors).length > 0) return

    setSubmitState({ isSubmitting: true, success: null, error: null })
    const result = await profileService.updateOwnProfile(user.id, {
      ...form,
      full_name: form.full_name.trim(),
      avatar_url: form.avatar_url.trim(),
      headline: form.headline.trim(),
      bio: form.bio.trim(),
      github_url: form.github_url.trim(),
      skills: parsedSkills,
    })

    if (result.kind === 'success') {
      setSubmitState({
        isSubmitting: false,
        success: isCompany ? 'تم حفظ بيانات الشركة بنجاح.' : 'تم حفظ التغييرات في الملف الشخصي بنجاح.',
        error: null,
      })
      return
    }

    if (result.kind === 'rls_blocked') {
      setSubmitState({
        isSubmitting: false,
        success: null,
        error: 'تم منع التحديث بواسطة سياسات الأمان الحالية في Firebase.',
      })
      return
    }

    setSubmitState({
      isSubmitting: false,
      success: null,
      error: getUserFacingErrorMessage(result.error, {
        fallback: 'تعذر حفظ التغييرات في الوقت الحالي.',
      }),
    })
  }

  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.95),_rgba(236,248,246,0.92))]">
        <PageHeader
          eyebrow={isCompany ? 'تعديل ملف الشركة' : 'تعديل الملف الشخصي'}
          title={isCompany ? 'تحديث صورة الشركة ونبذتها' : 'تحديث بيانات الملف الشخصي'}
          description={
            isCompany
              ? 'يمكنك تحديث اسم الشركة وصورتها ووصفها المختصر ونبذتها باستخدام الحقول الموجودة حاليًا في المخطط.'
              : 'يمكنك تحديث البيانات المدعومة حاليًا مثل الاسم والصورة والعنوان المهني والنبذة والمهارات والخبرة ورابط GitHub.'
          }
        />
      </Card>

      <Card title="نموذج التعديل" description="لن يتم تحديث أي أعمدة خارج المخطط الحالي.">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full rounded-[14px]" />
            <Skeleton className="h-12 w-full rounded-[14px]" />
            <Skeleton className="h-32 w-full rounded-[18px]" />
          </div>
        ) : isRlsBlocked ? (
          <ErrorState
            title={isCompany ? 'تعذر تعديل ملف الشركة' : 'تعذر تعديل الملف الشخصي'}
            description={error ?? 'سياسات RLS الحالية لا تسمح بالوصول إلى الملف.'}
          />
        ) : !profile ? (
          <EmptyState
            title={isCompany ? 'لا يوجد ملف شركة متاح للتعديل' : 'لا يوجد ملف متاح للتعديل'}
            description={isCompany ? 'لا يمكن تعديل ملف الشركة لأن صف profiles غير متاح حاليًا.' : 'لا يمكن تعديل الملف الشخصي لأن صف profiles غير متاح حاليًا.'}
          />
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label={isCompany ? 'اسم الشركة' : 'الاسم الكامل'}
                value={form.full_name}
                onChange={(event) => setField('full_name', event.target.value)}
                error={fieldErrors.full_name}
              />
              <Input
                label={isCompany ? 'وصف مختصر' : 'العنوان المهني'}
                value={form.headline}
                onChange={(event) => setField('headline', event.target.value)}
                placeholder={isCompany ? 'مثال: شركة حلول توظيف وتأهيل' : 'مثال: مطور واجهات أمامية'}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label={isCompany ? 'رابط الشركة' : 'رابط GitHub'}
                value={form.github_url}
                onChange={(event) => setField('github_url', event.target.value)}
                error={fieldErrors.github_url}
                placeholder="https://example.com"
              />
              <Input
                label={isCompany ? 'سنوات الخبرة أو عمر النشاط' : 'سنوات الخبرة'}
                type="number"
                min={0}
                value={form.experience_years ?? ''}
                onChange={(event) => setField('experience_years', event.target.value === '' ? null : Number(event.target.value))}
              />
            </div>

            <Textarea
              label={isCompany ? 'نبذة عن الشركة' : 'النبذة'}
              value={form.bio}
              onChange={(event) => setField('bio', event.target.value)}
              placeholder={isCompany ? 'اكتب نبذة مختصرة تعرف بالشركة وخدماتها.' : 'اكتب نبذة مختصرة عن خبرتك ومهاراتك.'}
            />

            <Input
              label={isCompany ? 'التخصصات أو المجالات' : 'المهارات'}
              value={skillsInput}
              onChange={(event) => setSkillsInput(event.target.value)}
              hint={isCompany ? 'افصل بين المجالات بفاصلة عربية أو إنجليزية.' : 'افصل بين المهارات بفاصلة عربية أو إنجليزية.'}
            />

            <Card
              className="border-dashed bg-[var(--surface-muted)]"
              title={isCompany ? 'صورة الشركة' : 'الصورة الشخصية'}
              description={storageState.message}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label={isCompany ? 'رابط صورة الشركة' : 'رابط الصورة'}
                  value={form.avatar_url}
                  onChange={(event) => setField('avatar_url', event.target.value)}
                  placeholder="https://example.com/avatar.png"
                />
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--text)]">
                    {isCompany ? 'رفع صورة الشركة' : 'رفع صورة'}
                  </label>
                  <input
                    className="block w-full rounded-[14px] border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--text)] file:ms-0 file:me-3 file:rounded-full file:border-0 file:bg-[var(--brand-soft)] file:px-3 file:py-2 file:text-sm file:font-medium file:text-[var(--brand-strong)]"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={storageState.mode !== 'upload' || submitState.isSubmitting}
                  />
                  <div className="flex items-center gap-2 text-sm text-[var(--text-soft)]">
                    <ImageUp size={16} aria-hidden="true" />
                    {storageState.mode === 'upload'
                      ? 'الرفع متاح لأن هناك حاوية مناسبة تم العثور عليها.'
                      : 'سيبقى هذا الحقل كرابط عادي لأن رفع الصور غير متاح حاليًا.'}
                  </div>
                </div>
              </div>
            </Card>

            {!isCompany ? (
              <Card
                id="resume"
                className="border-dashed bg-[var(--surface-muted)]"
                title="السيرة الذاتية"
                description="هذا هو المكان المخصص لإضافة السيرة الذاتية."
              >
                <div className="rounded-[24px] border-2 border-dashed border-[var(--line-strong)] bg-white px-5 py-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--warn-soft)] text-[var(--warn)]">
                        <FileText size={20} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-base font-semibold text-[var(--text)]">أضف سيرتك الذاتية هنا</p>
                        <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
                          قريبًا ستتمكن من رفع ملف السيرة الذاتية من هذا المكان ليظهر للشركات مع صورتك الشخصية وبياناتك المهنية.
                        </p>
                      </div>
                    </div>

                    <Button type="button" variant="secondary" disabled leadingIcon={<FileText size={16} aria-hidden="true" />}>
                      رفع السيرة الذاتية قريبًا
                    </Button>
                  </div>
                </div>
              </Card>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                label="الدور الحالي"
                value={profile.role ?? ''}
                options={[{ label: profile.role ?? 'غير متوفر', value: profile.role ?? '' }]}
                disabled
                hint="هذا الحقل للعرض فقط."
              />
              <Input
                label="نسبة الاكتمال"
                value={profile.completion_score !== null && profile.completion_score !== undefined ? `${profile.completion_score}%` : ''}
                disabled
                hint="هذه القيمة للعرض فقط من البيانات الحالية."
              />
            </div>

            {submitState.error ? <ErrorState title="تعذر حفظ التغييرات" description={submitState.error} /> : null}
            {submitState.success ? (
              <div className="rounded-[20px] border border-[var(--line)] bg-[var(--brand-soft)] p-4 text-sm leading-7 text-[var(--brand-strong)]">
                {submitState.success}
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <Button type="submit" isLoading={submitState.isSubmitting} leadingIcon={<Save size={16} aria-hidden="true" />}>
                حفظ التغييرات
              </Button>
              {canEdit ? <Badge tone="brand">يتم تحديث الحقول المدعومة فقط</Badge> : null}
            </div>
          </form>
        )}
      </Card>
    </section>
  )
}
