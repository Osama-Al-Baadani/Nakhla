'use client'

import { use } from 'react'
import { Building2, CalendarClock, Files, MapPin, Wallet } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '../../../../components/Badge'
import { Button } from '../../../../components/Button'
import { Card } from '../../../../components/Card'
import { EmptyState } from '../../../../components/EmptyState'
import { ErrorState } from '../../../../components/ErrorState'
import { PageHeader } from '../../../../components/PageHeader'
import { Skeleton } from '../../../../components/Skeleton'
import { useApplicationStatus } from '../../../../hooks/useApplicationStatus'
import { useAuth } from '../../../../hooks/useAuth'
import { useJob } from '../../../../hooks/useJob'

export default function JobDetailsPage({ params }) {
  const resolvedParams = use(params)
  const jobId = resolvedParams?.jobId
  const { user, isAuthenticated } = useAuth()
  const { isLoading, job, error } = useJob(jobId)
  const applicationState = useApplicationStatus(jobId, user?.id)

  const skillsList = Array.isArray(job?.skills_required)
    ? job.skills_required
    : typeof job?.skills_required === 'string'
      ? job.skills_required.split(',').map((s) => s.trim()).filter(Boolean)
      : []

  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.96),_rgba(244,248,252,0.92))]">
        <PageHeader
          eyebrow="تفاصيل الوظيفة"
          title={job?.title ?? 'عرض تفاصيل الوظيفة'}
          description="يتم عرض التفاصيل المتوفرة فقط من الوظيفة الحالية مع إتاحة التقديم للحسابات الموثقة."
          actions={
            <div className="flex flex-wrap gap-3">
              <Link href="/jobs">
                <Button variant="secondary">العودة إلى الوظائف</Button>
              </Link>
              {jobId ? (
                isAuthenticated ? (
                  <Button
                    onClick={() => void applicationState.apply()}
                    isLoading={applicationState.isSubmitting}
                    disabled={applicationState.hasApplied}
                  >
                    {applicationState.hasApplied ? 'تم التقديم بالفعل' : 'التقديم على الوظيفة'}
                  </Button>
                ) : (
                  <Link href="/login">
                    <Button>سجّل الدخول للتقديم</Button>
                  </Link>
                )
              ) : null}
            </div>
          }
        />
      </Card>

      <Card title="بيانات الوظيفة" description="معلومات مباشرة من جدول الوظائف الحالي.">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/5" />
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-28 w-full rounded-[22px]" />
          </div>
        ) : error ? (
          <ErrorState title="تعذر تحميل تفاصيل الوظيفة" description={error} />
        ) : !job ? (
          <EmptyState
            title="لم يتم العثور على الوظيفة"
            description="لا يوجد صف متاح بهذا المعرف في البيانات الحالية."
          />
        ) : (
          <div className="space-y-5">
            {applicationState.successMessage ? (
              <div className="rounded-[20px] border border-[var(--line)] bg-[var(--brand-soft)] p-4 text-sm leading-7 text-[var(--brand-strong)]">
                {applicationState.successMessage}
              </div>
            ) : null}

            {applicationState.error ? (
              <ErrorState
                title={applicationState.isRlsBlocked ? 'تعذر تنفيذ التقديم بسبب سياسات الوصول' : 'تعذر تنفيذ التقديم'}
                description={applicationState.error}
              />
            ) : null}

            <div className="flex flex-wrap gap-2">
              {job.type ? <Badge tone="brand">{job.type}</Badge> : null}
              {job.status ? <Badge tone="neutral">{job.status}</Badge> : null}
              {job.salary_range ? <Badge tone="warning">{job.salary_range}</Badge> : null}
              {applicationState.hasApplied ? <Badge tone="brand">تم إرسال طلبك</Badge> : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoRow icon={<Building2 size={16} aria-hidden="true" />} label="الشركة" value={job.company_name ?? 'غير متوفر'} />
              <InfoRow icon={<MapPin size={16} aria-hidden="true" />} label="الموقع" value={job.location ?? 'غير متوفر'} />
              <InfoRow icon={<Wallet size={16} aria-hidden="true" />} label="الراتب" value={job.salary_range ?? 'غير متوفر'} />
              <InfoRow
                icon={<CalendarClock size={16} aria-hidden="true" />}
                label="تاريخ النشر"
                value={job.posted_at ? new Date(job.posted_at).toLocaleString('ar-EG') : 'غير متوفر'}
              />
            </div>

            <div className="rounded-[22px] bg-[var(--surface-muted)] p-5">
              <p className="text-sm font-medium text-[var(--text)]">الوصف</p>
              <p className="mt-3 text-sm leading-8 text-[var(--text-soft)]">
                {job.description ?? 'لا يوجد وصف متاح لهذه الوظيفة.'}
              </p>
            </div>

            {skillsList.length > 0 ? (
              <div className="rounded-[22px] bg-[var(--surface-muted)] p-5">
                <p className="text-sm font-medium text-[var(--text)]">المهارات المطلوبة</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {skillsList.map((skill) => (
                    <Badge key={skill} tone="brand">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              {job.company_id ? (
                <Link href={`/company/jobs`}>
                  <Button variant="secondary">وظائف الشركة</Button>
                </Link>
              ) : null}
              {job.id ? (
                <Link href={`/jobs/${job.id}/applicants`}>
                  <Button variant="ghost" leadingIcon={<Files size={16} aria-hidden="true" />}>
                    المتقدمون على الوظيفة
                  </Button>
                </Link>
              ) : null}
            </div>
          </div>
        )}
      </Card>
    </section>
  )
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="rounded-[20px] bg-[var(--surface-muted)] p-4">
      <div className="flex items-center gap-2 text-[var(--text-faint)]">
        {icon}
        <p className="text-xs font-semibold uppercase tracking-[0.12em]">{label}</p>
      </div>
      <p className="mt-3 text-sm font-medium text-[var(--text)]">{value}</p>
    </div>
  )
}
