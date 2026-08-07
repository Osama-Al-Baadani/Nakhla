'use client'

import { useMemo, useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { AuthShell } from '../../components/AuthShell'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { ErrorState } from '../../components/ErrorState'
import { Input } from '../../components/Input'
import { Select } from '../../components/Select'
import { useAuth } from '../../hooks/useAuth'
import { getUserFacingErrorMessage } from '../../lib/error-messages'
import { storePendingRole, getDefaultDashboardPath } from '../../lib/roles'
import { authService } from '../../services/auth-service'

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated, isLoading, role: userRole } = useAuth()
  
  const queryRole = searchParams.get('role')
  const initialRole = queryRole === 'company' || queryRole === 'seeker' ? queryRole : ''

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState(initialRole)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(getDefaultDashboardPath(userRole))
    }
  }, [isAuthenticated, isLoading, userRole, router])

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
    } else if (password.length < 8) {
      nextErrors.password = 'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل.'
    }

    if (!role) {
      nextErrors.role = 'اختر نوع الحساب.'
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

    const { error } = await authService.signUp(email.trim(), password)

    setIsSubmitting(false)

    if (error) {
      console.error('Registration failed', error)
      setSubmitError(
        getUserFacingErrorMessage(error, {
          fallback: 'تعذر إنشاء الحساب في الوقت الحالي. حاول مرة أخرى.',
        }),
      )
      return
    }

    if (role) {
      storePendingRole(role)
    }

    setSuccessMessage('تم إنشاء الحساب بنجاح. أكمل التحقق من البريد الإلكتروني إذا كان مفعلًا، ثم سجّل الدخول للمتابعة.')
  }

  return (
    <AuthShell
      eyebrow="إنشاء حساب"
      title="ابدأ رحلتك مع نخلة"
      description="أنشئ حسابًا جديدًا عبر Supabase للوصول إلى الوظائف أو إدارة حساب الشركة ضمن تجربة عربية واضحة."
      footer={
        <div className="flex items-center justify-between gap-3 text-sm">
          <Link className="text-[var(--brand)] font-medium hover:text-[var(--brand-strong)]" href="/login">
            لديك حساب بالفعل؟
          </Link>
          <Badge tone="neutral">Supabase Auth</Badge>
        </div>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <Input
          label="البريد الإلكتروني"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
          placeholder="name@example.com"
        />
        <Input
          label="كلمة المرور"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
          hint="استخدم كلمة مرور قوية من 8 أحرف أو أكثر."
          placeholder="********"
        />
        <Select
          label="نوع الحساب"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          error={errors.role}
          hint="سيتم استخدام هذا الاختيار لاحقًا لتحديد مسار الباحث أو الشركة."
          options={[
            { label: 'اختر نوع الحساب', value: '' },
            { label: 'باحث عن عمل', value: 'seeker' },
            { label: 'شركة', value: 'company' },
          ]}
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

        {submitError ? <ErrorState title="تعذر إنشاء الحساب" description={submitError} /> : null}

        {successMessage ? (
          <div className="rounded-[20px] border border-[var(--line)] bg-[var(--brand-soft)] p-4 text-sm leading-7 text-[var(--brand-strong)]">
            {successMessage}
          </div>
        ) : null}

        <Button className="w-full" type="submit" isLoading={isSubmitting}>
          إنشاء الحساب
        </Button>
      </form>
    </AuthShell>
  )
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f8f4ec_0%,_#f4f7f3_32%,_#ffffff_100%)] p-4 sm:p-8 flex items-center justify-center">
      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  )
}
