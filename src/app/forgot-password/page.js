'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AuthShell } from '../../components/AuthShell'
import { Button } from '../../components/Button'
import { ErrorState } from '../../components/ErrorState'
import { Input } from '../../components/Input'
import { getUserFacingErrorMessage } from '../../lib/error-messages'
import { authService } from '../../services/auth-service'

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [fieldError, setFieldError] = useState(undefined)
  const [successMessage, setSuccessMessage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    setError(null)
    setSuccessMessage(null)

    if (!email.trim()) {
      setFieldError('البريد الإلكتروني مطلوب.')
      return
    }

    if (!isValidEmail(email)) {
      setFieldError('أدخل بريدًا إلكترونيًا صحيحًا.')
      return
    }

    setFieldError(undefined)
    setIsSubmitting(true)

    const { error: resetError } = await authService.sendPasswordReset(email.trim())

    setIsSubmitting(false)

    if (resetError) {
      console.error('Password reset request failed', resetError)
      setError(
        getUserFacingErrorMessage(resetError, {
          fallback: 'تعذر إرسال رابط إعادة التعيين في الوقت الحالي. حاول مرة أخرى.',
        }),
      )
      return
    }

    setSuccessMessage('إذا كان البريد مسجلًا، فسيتم إرسال رابط إعادة تعيين كلمة المرور إليه.')
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f8f4ec_0%,_#f4f7f3_32%,_#ffffff_100%)] p-4 sm:p-8 flex items-center justify-center">
      <AuthShell
        eyebrow="استعادة الحساب"
        title="إعادة تعيين كلمة المرور"
        description="أدخل بريدك الإلكتروني الحالي وسنستخدم تدفق Supabase الرسمي لإرسال رابط إعادة التعيين."
        footer={
          <div className="text-sm">
            <Link className="text-[var(--brand)] font-medium hover:text-[var(--brand-strong)]" href="/login">
              العودة إلى تسجيل الدخول
            </Link>
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
            error={fieldError}
            placeholder="name@example.com"
          />

          {error ? <ErrorState title="تعذر إرسال الرابط" description={error} /> : null}

          {successMessage ? (
            <div className="rounded-[20px] border border-[var(--line)] bg-[var(--brand-soft)] p-4 text-sm leading-7 text-[var(--brand-strong)]">
              {successMessage}
            </div>
          ) : null}

          <Button className="w-full" type="submit" isLoading={isSubmitting}>
            إرسال رابط التعيين
          </Button>
        </form>
      </AuthShell>
    </div>
  )
}
