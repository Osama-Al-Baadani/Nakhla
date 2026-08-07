'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthShell } from '../../components/AuthShell'
import { Button } from '../../components/Button'
import { ErrorState } from '../../components/ErrorState'
import { Input } from '../../components/Input'
import { useAuth } from '../../hooks/useAuth'
import { getUserFacingErrorMessage } from '../../lib/error-messages'
import { getDefaultDashboardPath } from '../../lib/roles'
import { authService } from '../../services/auth-service'

export default function ResetPasswordPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading, authEvent, role } = useAuth()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canReset = useMemo(() => {
    if (authEvent === 'PASSWORD_RECOVERY') {
      return true
    }

    return isAuthenticated
  }, [authEvent, isAuthenticated])

  if (!isLoading && isAuthenticated && successMessage) {
    router.replace(getDefaultDashboardPath(role))
    return null
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = {}

    if (!password) {
      nextErrors.password = 'كلمة المرور الجديدة مطلوبة.'
    } else if (password.length < 8) {
      nextErrors.password = 'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل.'
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب.'
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = 'كلمتا المرور غير متطابقتين.'
    }

    setErrors(nextErrors)
    setSubmitError(null)
    setSuccessMessage(null)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    const { error } = await authService.updatePassword(password)

    setIsSubmitting(false)

    if (error) {
      console.error('Password update failed', error)
      setSubmitError(
        getUserFacingErrorMessage(error, {
          fallback: 'تعذر تحديث كلمة المرور في الوقت الحالي. حاول مرة أخرى.',
        }),
      )
      return
    }

    setSuccessMessage('تم تحديث كلمة المرور بنجاح. يمكنك الآن متابعة استخدام الحساب.')
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f8f4ec_0%,_#f4f7f3_32%,_#ffffff_100%)] p-4 sm:p-8 flex items-center justify-center">
      <AuthShell
        eyebrow="تعيين كلمة مرور جديدة"
        title="تحديث الوصول إلى الحساب"
        description="افتح هذه الصفحة من رابط الاستعادة المرسل إلى بريدك الإلكتروني أو أثناء جلسة موثقة صالحة."
        footer={
          <div className="text-sm">
            <Link className="text-[var(--brand)] font-medium hover:text-[var(--brand-strong)]" href="/login">
              العودة إلى تسجيل الدخول
            </Link>
          </div>
        }
      >
        {canReset ? (
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <Input
              label="كلمة المرور الجديدة"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={errors.password}
              placeholder="********"
            />
            <Input
              label="تأكيد كلمة المرور"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              error={errors.confirmPassword}
              placeholder="********"
            />

            {submitError ? <ErrorState title="تعذر تحديث كلمة المرور" description={submitError} /> : null}

            {successMessage ? (
              <div className="rounded-[20px] border border-[var(--line)] bg-[var(--brand-soft)] p-4 text-sm leading-7 text-[var(--brand-strong)]">
                {successMessage}
              </div>
            ) : null}

            <Button className="w-full" type="submit" isLoading={isSubmitting}>
              حفظ كلمة المرور الجديدة
            </Button>
          </form>
        ) : (
          <ErrorState
            title="جلسة إعادة التعيين غير متاحة"
            description="افتح هذه الصفحة من الرابط الذي أرسله Supabase إلى بريدك الإلكتروني أو اطلب رابطًا جديدًا."
          />
        )}
      </AuthShell>
    </div>
  )
}
