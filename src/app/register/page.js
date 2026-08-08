'use client'

import { useState, useEffect, Suspense } from 'react'
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
import { storePendingRole, getDefaultDashboardPath, getRoleLabel } from '../../lib/roles'
import { authService } from '../../services/auth-service'
import { LogOut, UserCheck, Building2, ArrowLeft } from 'lucide-react'

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated, isLoading, role: userRole } = useAuth()
  
  const queryRole = searchParams.get('role')
  const validQueryRole = queryRole === 'company' || queryRole === 'seeker' ? queryRole : ''

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState(validQueryRole || 'seeker')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    if (validQueryRole) {
      setRole(validQueryRole)
    }
  }, [validQueryRole])

  // If user is already logged in with the SAME role as requested (or no specific role requested)
  const isAlreadyLoggedInWithSameRole = isAuthenticated && (!validQueryRole || userRole === validQueryRole)
  const isAlreadyLoggedInWithDifferentRole = isAuthenticated && validQueryRole && userRole !== validQueryRole

  useEffect(() => {
    if (!isLoading && isAlreadyLoggedInWithSameRole) {
      router.replace(getDefaultDashboardPath(userRole))
    }
  }, [isAuthenticated, isLoading, userRole, isAlreadyLoggedInWithSameRole, router])

  async function handleSignOutAndSwitch() {
    setIsSigningOut(true)
    await authService.signOut()
    setIsSigningOut(false)
    if (validQueryRole) {
      setRole(validQueryRole)
    }
  }

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

    const { error } = await authService.signUp(email.trim(), password, role || 'seeker')

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

  if (isAlreadyLoggedInWithDifferentRole) {
    return (
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl space-y-5 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
          {userRole === 'company' ? <Building2 size={24} /> : <UserCheck size={24} />}
        </div>

        <div className="space-y-1.5">
          <h2 className="text-xl font-black text-slate-900">أنت مسجل حالياً</h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            حسابك الحالي مسجل كـ <span className="font-bold text-emerald-800">({getRoleLabel(userRole)})</span>، بينما طلبت التسجيل كـ <span className="font-bold text-amber-700">({getRoleLabel(validQueryRole)})</span>.
          </p>
        </div>

        <div className="space-y-2.5 pt-2">
          <Button
            onClick={handleSignOutAndSwitch}
            isLoading={isSigningOut}
            className="w-full justify-center bg-emerald-800 text-white font-black rounded-xl"
            leadingIcon={<LogOut size={16} />}
          >
            تسجيل الخروج والبدء كـ ({getRoleLabel(validQueryRole)})
          </Button>

          <Link href={getDefaultDashboardPath(userRole)} className="w-full block">
            <Button variant="secondary" className="w-full justify-center font-bold rounded-xl text-xs">
              المتابعة إلى لوحة تحكمك الحالية
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const roleTitle = role === 'company' ? 'إنشاء حساب شركة / منشأة' : 'إنشاء حساب باحث عن عمل'

  return (
    <AuthShell
      eyebrow="إنشاء حساب جديد"
      title={roleTitle}
      description="أنشئ حسابك للوصول إلى كافة المزايا والوظائف المخصصة لمسارك في منصة نخلة."
      footer={
        <div className="flex items-center justify-between gap-3 text-sm">
          <Link className="text-[var(--brand)] font-medium hover:text-[var(--brand-strong)]" href="/login">
            لديك حساب بالفعل؟
          </Link>
          <Badge tone="neutral">Firebase Auth</Badge>
        </div>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {/* Role Toggle Selector */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => setRole('seeker')}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-black transition-all ${
              role === 'seeker'
                ? 'bg-white text-emerald-900 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck size={16} />
            <span>باحث عن عمل</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('company')}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-black transition-all ${
              role === 'company'
                ? 'bg-white text-amber-900 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 size={16} />
            <span>منشأة / شركة</span>
          </button>
        </div>

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

        <Button className="w-full font-black text-sm h-11 rounded-xl" type="submit" isLoading={isSubmitting}>
          إنشاء الحساب
        </Button>
      </form>
    </AuthShell>
  )
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f8f4ec_0%,_#f4f7f3_32%,_#ffffff_100%)] p-4 sm:p-8 flex items-center justify-center">
      <Suspense fallback={<div className="text-center p-8 text-sm text-slate-500 font-bold">جارٍ التحميل...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  )
}
