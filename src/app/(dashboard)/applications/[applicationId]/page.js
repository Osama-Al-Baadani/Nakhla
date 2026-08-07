'use client'

import { use } from 'react'
import { CalendarClock, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { ApplicationStatusBadge } from '../../../../components/ApplicationStatusBadge'
import { Button } from '../../../../components/Button'
import { Card } from '../../../../components/Card'
import { EmptyState } from '../../../../components/EmptyState'
import { ErrorState } from '../../../../components/ErrorState'
import { PageHeader } from '../../../../components/PageHeader'
import { Skeleton } from '../../../../components/Skeleton'
import { useApplicationDetails } from '../../../../hooks/useApplicationDetails'

export default function ApplicationDetailsPage({ params }) {
  const resolvedParams = use(params)
  const applicationId = resolvedParams?.applicationId
  const { isLoading, application, error, isRlsBlocked } =
    useApplicationDetails(applicationId)

  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.96),_rgba(243,248,252,0.92))]">
        <PageHeader
          eyebrow="تفاصيل الطلب"
          title={application?.job?.title ?? 'تفاصيل طلب التقديم'}
          description="يعرض هذا القسم بيانات الطلب الحالية والوظيفة المرتبطة به بناءً على البيانات المتاحة فقط."
          actions={
            <Link href="/applications">
              <Button variant="secondary">العودة إلى طلباتي</Button>
            </Link>
          }
        />
      </Card>

      <Card title="معلومات الطلب" description="بيانات فعلية من جدول applications والوظيفة المرتبطة به.">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/5" />
            <Skeleton className="h-20 w-full rounded-[22px]" />
            <Skeleton className="h-24 w-full rounded-[22px]" />
          </div>
        ) : error ? (
          <ErrorState
            title={isRlsBlocked ? 'الوصول إلى تفاصيل الطلب محجوب' : 'تعذر تحميل تفاصيل الطلب'}
            description={error}
          />
        ) : !application ? (
          <EmptyState
            title="لم يتم العثور على الطلب"
            description="قد يكون الطلب غير متاح لك أو لم يعد موجودًا ضمن البيانات المقروءة."
          />
        ) : (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <ApplicationStatusBadge status={application.status} />
              {application.job?.type ? (
                <ApplicationStatusBadge status={application.job.type} />
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[20px] bg-[var(--surface-muted)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-faint)]">
                  الوظيفة
                </p>
                <p className="mt-3 text-sm font-medium text-[var(--text)]">
                  {application.job?.title ?? 'غير متوفر'}
                </p>
              </div>
              <div className="rounded-[20px] bg-[var(--surface-muted)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-faint)]">
                  الشركة
                </p>
                <p className="mt-3 text-sm font-medium text-[var(--text)]">
                  {application.job?.company_name ?? 'غير متوفر'}
                </p>
              </div>
              <div className="rounded-[20px] bg-[var(--surface-muted)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-faint)]">
                  تاريخ التقديم
                </p>
                <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[var(--text)]">
                  <CalendarClock size={15} aria-hidden="true" />
                  {application.applied_at
                    ? new Date(application.applied_at).toLocaleString('ar-EG')
                    : 'غير متوفر'}
                </p>
              </div>
              <div className="rounded-[20px] bg-[var(--surface-muted)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-faint)]">
                  درجة المطابقة
                </p>
                <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[var(--text)]">
                  <Sparkles size={15} aria-hidden="true" />
                  {application.match_score ?? 'غير متوفرة'}
                </p>
              </div>
            </div>

            <div className="rounded-[22px] bg-[var(--surface-muted)] p-5">
              <p className="text-sm font-medium text-[var(--text)]">التغذية الراجعة</p>
              <p className="mt-3 text-sm leading-8 text-[var(--text-soft)]">
                {application.ai_feedback ?? 'لا توجد تغذية راجعة متاحة لهذا الطلب حاليًا.'}
              </p>
            </div>

            {application.job ? (
              <Link href={`/jobs/${application.job.id}`}>
                <Button>العودة إلى الوظيفة</Button>
              </Link>
            ) : null}
          </div>
        )}
      </Card>
    </section>
  )
}
