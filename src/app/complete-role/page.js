'use client'

import {
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  LineChart,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { ErrorState } from '../../components/ErrorState'
import { cn } from '../../lib/cn'
import { useAuth } from '../../hooks/useAuth'
import {
  clearPendingRole,
  getDefaultDashboardPath,
  readPendingRole,
  storePendingRole,
} from '../../lib/roles'
import { profileService } from '../../services/profile-service'

const roleCards = [
  {
    value: 'seeker',
    title: 'باحث عن عمل',
    icon: BriefcaseBusiness,
    description: 'مناسب للأفراد الباحثين عن فرص وتدريب وتأهيل مهني.',
    points: ['ابحث عن وظائف', 'ابدأ رحلة التدريب', 'تابع طلبات التوظيف', 'احصل على الشهادات'],
  },
  {
    value: 'company',
    title: 'شركة',
    icon: Building2,
    description: 'مناسب للجهات التي ترغب في التوظيف أو إدارة طلبات التعهيد.',
    points: ['انشر الوظائف', 'استعرض المتقدمين', 'اطلب موظفين بنظام التعهيد', 'تابع الحضور والأداء'],
  },
]

export default function CompleteRolePage() {
  const router = useRouter()
  const { isAuthenticated, isLoading, isProfileLoading, role, user } = useAuth()
  const [selectedRole, setSelectedRole] = useState('')
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const pendingRole = readPendingRole()
    if (pendingRole) {
      setSelectedRole(pendingRole)
    }
  }, [])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login')
    } else if (!isLoading && !isProfileLoading && role && role !== 'unknown') {
      router.replace(getDefaultDashboardPath(role))
    }
  }, [isAuthenticated, isLoading, isProfileLoading, role, router])

  async function handleSubmit(event) {
    event.preventDefault()

    if (!user?.id) {
      setError('تعذر إكمال الخطوة الحالية. حاول تسجيل الدخول مرة أخرى.')
      return
    }

    if (!selectedRole) {
      setError('اختر نوع الحساب المناسب أولًا.')
      return
    }

    setError(null)
    setIsSubmitting(true)
    storePendingRole(selectedRole)

    const result = await profileService.updateOwnRole(user.id, selectedRole)

    setIsSubmitting(false)

    clearPendingRole()
    router.replace(getDefaultDashboardPath(selectedRole))
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f8f4ec_0%,_#f4f7f3_32%,_#ffffff_100%)] p-4 sm:p-8 flex items-center justify-center">
      <section className="mx-auto flex w-full max-w-[980px] items-center justify-center py-8">
        <Card className="w-full overflow-hidden bg-[linear-gradient(145deg,_rgba(255,250,242,0.98),_rgba(255,255,255,0.98))] p-6 sm:p-8 lg:p-10">
          <form className="space-y-8" onSubmit={handleSubmit} noValidate>
            <div className="space-y-4 text-center">
              <div className="mx-auto grid size-14 place-items-center rounded-full bg-[var(--brand-soft)] text-[var(--brand)]">
                <ShieldCheck size={24} aria-hidden="true" />
              </div>
              <div className="space-y-3">
                <h1 className="font-serif text-3xl leading-tight text-[var(--text)] sm:text-4xl">
                  كيف ترغب في استخدام منصة نخلة؟
                </h1>
                <p className="mx-auto max-w-2xl text-sm leading-8 text-[var(--text-soft)] sm:text-base">
                  اختر نوع الحساب المناسب لك، ويمكنك استكمال بياناتك بعد ذلك.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2" role="radiogroup" aria-label="نوع الحساب">
              {roleCards.map((item) => {
                const Icon = item.icon
                const isSelected = selectedRole === item.value
                const pointIcons =
                  item.value === 'seeker'
                    ? [BriefcaseBusiness, GraduationCap, FileCheck2, CheckCircle2]
                    : [BriefcaseBusiness, Users, Building2, LineChart]

                return (
                  <button
                    key={item.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => {
                      setSelectedRole(item.value)
                      setError(null)
                    }}
                    className={cn(
                      'group rounded-[26px] border bg-white p-6 text-right shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2',
                      isSelected
                        ? 'border-[var(--brand)] bg-[var(--brand-soft)]/45 shadow-[0_18px_40px_rgba(15,118,110,0.14)]'
                        : 'border-[var(--line)] hover:border-[var(--line-strong)] hover:shadow-[0_16px_36px_rgba(18,32,51,0.08)]',
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-4">
                        <div className="grid size-12 place-items-center rounded-2xl bg-[var(--surface-muted)] text-[var(--brand)] transition group-hover:bg-[var(--brand-soft)]">
                          <Icon size={22} aria-hidden="true" />
                        </div>
                        <div className="space-y-2">
                          <h2 className="text-xl font-medium text-[var(--text)]">{item.title}</h2>
                          <p className="text-sm leading-7 text-[var(--text-soft)]">{item.description}</p>
                        </div>
                      </div>

                      <div
                        className={cn(
                          'mt-1 grid size-7 shrink-0 place-items-center rounded-full border transition',
                          isSelected
                            ? 'border-[var(--brand)] bg-[var(--brand)] text-white'
                            : 'border-[var(--line-strong)] bg-white text-transparent',
                        )}
                      >
                        <CheckCircle2 size={16} aria-hidden="true" />
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3">
                      {item.points.map((point, index) => {
                        const PointIcon = pointIcons[index] ?? CheckCircle2

                        return (
                          <div
                            key={point}
                            className={cn(
                              'flex items-center gap-3 rounded-[18px] px-4 py-3 text-sm',
                              isSelected
                                ? 'bg-white/90 text-[var(--text)]'
                                : 'bg-[var(--surface-muted)] text-[var(--text-soft)]',
                            )}
                          >
                            <PointIcon size={16} aria-hidden="true" className="text-[var(--brand)]" />
                            <span>{point}</span>
                          </div>
                        )
                      })}
                    </div>
                  </button>
                )
              })}
            </div>

            {error ? <ErrorState title="تعذر إكمال الخطوة" description={error} /> : null}

            <div className="flex justify-center">
              <Button
                type="submit"
                size="lg"
                className="min-w-40"
                disabled={!selectedRole}
                isLoading={isSubmitting}
              >
                متابعة
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </div>
  )
}
