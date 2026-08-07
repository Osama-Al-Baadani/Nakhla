'use client'

import { useState, useEffect } from 'react'
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

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function LoginPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading, isProfileLoading, role } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  useEffect(() => {
    if (!isLoading && !isProfileLoading && isAuthenticated) {
      router.replace(getDefaultDashboardPath(role))
    }
  }, [isAuthenticated, isLoading, isProfileLoading, role, router])

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = {}

    if (!email.trim()) {
      nextErrors.email = 'البريد الإلكتروني مطلوب.'
    } else if (!isValidEmail(email)) {
      nextErrors.email = 'أدخل بريدًا إلكترونيًا صحيحًا.'
    }

    if (!password) {
      nextErrors.password = 'كلمة المرور مطلوبة.'
    } else if (password.length < 6) {
      nextErrors.password = 'كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل.'
    }

    setErrors(nextErrors)
    setSubmitError(null)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    const { error } = await authService.signIn(email.trim(), password)

    setIsSubmitting(false)

    if (error) {
      console.error('Login failed', error)
      setSubmitError(
        getUserFacingErrorMessage(error, {
          fallback: 'تعذر تسجيل الدخول في الوقت الحالي. حاول مرة أخرى.',
        }),
      )
      return
    }

    router.replace(getDefaultDashboardPath(role))
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f8f4ec_0%,_#f4f7f3_32%,_#ffffff_100%)] p-4 sm:p-8 flex items-center justify-center">
      <AuthShell
        eyebrow="تسجيل الدخول"
        title="الدخول إلى حسابك في نخلة"
        description="استخدم حسابك الحالي للوصول إلى لوحة التحكم والوظائف والملف الشخصي عبر مصادقة Supabase الحقيقية."
        footer={
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <Link className="text-[var(--brand)] font-medium hover:text-[var(--brand-strong)]" href="/register">
              إنشاء حساب جديد
            </Link>
            <Link className="text-[var(--text-soft)] hover:text-[var(--text)]" href="/forgot-password">
              نسيت كلمة المرور؟
            </Link>
          </div>
        }
      >
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <Input
            label="البريد الإلكتروني"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={errors.email}
            placeholder="name@example.com"
          />
          <Input
            label="كلمة المرور"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={errors.password}
            placeholder="********"
          />

          {submitError ? <ErrorState title="تعذر تسجيل الدخول" description={submitError} /> : null}

          <Button className="w-full" type="submit" isLoading={isSubmitting}>
            تسجيل الدخول
          </Button>
        </form>
      </AuthShell>
    </div>
  )
}
