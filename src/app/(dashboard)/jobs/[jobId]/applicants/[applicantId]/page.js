'use client'

import { use } from 'react'
import {
  BriefcaseBusiness,
  CalendarClock,
  FileText,
  Mail,
  Sparkles,
  UserRound,
} from 'lucide-react'
import Link from 'next/link'
import { Avatar } from '../../../../../../components/Avatar'
import { Badge } from '../../../../../../components/Badge'
import { Button } from '../../../../../../components/Button'
import { Card } from '../../../../../../components/Card'
import { EmptyState } from '../../../../../../components/EmptyState'
import { ErrorState } from '../../../../../../components/ErrorState'
import { PageHeader } from '../../../../../../components/PageHeader'
import { Skeleton } from '../../../../../../components/Skeleton'
import { useApplicants } from '../../../../../../hooks/useApplicants'

export default function ApplicantDetailsPage({ params }) {
  const resolvedParams = use(params)
  const jobId = resolvedParams?.jobId
  const applicantId = resolvedParams?.applicantId

  const { isLoading, applicants, error, isRlsBlocked } = useApplicants(jobId)

  const applicant = applicants.find((item) => item.application.applicant_id === applicantId)

  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.96),_rgba(237,246,252,0.92))]">
        <PageHeader
          eyebrow="تفاصيل المتقدم"
          title={applicant?.profile?.full_name ?? applicant?.user?.display_name ?? 'مراجعة المتقدم'}
          description="يعرض هذا القسم بيانات المتقدم المدعومة حاليًا من الجداول المقروءة فقط."
          actions={
            <Link href={jobId ? `/jobs/${jobId}/applicants` : '/company/dashboard'}>
              <Button variant="secondary">العودة إلى المتقدمين</Button>
            </Link>
          }
        />
      </Card>

      <Card title="بيانات المتقدم" description="قراءة فقط حتى يتم تأكيد كامل الصلاحيات من الباكند.">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full rounded-[22px]" />
            <Skeleton className="h-56 w-full rounded-[22px]" />
          </div>
        ) : error ? (
          <ErrorState
            title={isRlsBlocked ? 'الوصول إلى بيانات المتقدم محجوب' : 'تعذر تحميل بيانات المتقدم'}
            description={error}
          />
        ) : !applicant ? (
          <EmptyState
            title="المتقدم غير متاح"
            description="قد تكون البيانات غير مقروءة حاليًا أو أن هذا المتقدم غير مرتبط بالوظيفة المطلوبة."
          />
        ) : (
          <div className="space-y-5">
            <div className="flex items-center gap-4 rounded-[22px] bg-[var(--surface-muted)] p-5">
              <Avatar
                size="lg"
                name={
                  applicant.profile?.full_name ??
                  applicant.user?.display_name ??
                  applicant.user?.email ??
                  'المتقدم'
                }
                src={applicant.profile?.avatar_url ?? undefined}
              />
              <div>
                <h2 className="text-xl font-medium text-[var(--text)]">
                  {applicant.profile?.full_name ?? applicant.user?.display_name ?? 'بدون اسم كامل'}
                </h2>
                <p className="mt-2 text-sm text-[var(--text-soft)]">
                  {applicant.profile?.headline ?? 'لا يوجد عنوان مهني متاح.'}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <InfoTile
                label="البريد الإلكتروني"
                value={applicant.user?.email ?? 'غير متوفر'}
                icon={<Mail size={16} aria-hidden="true" />}
              />
              <InfoTile
                label="الدور"
                value={applicant.profile?.role ?? 'غير متوفر'}
                icon={<UserRound size={16} aria-hidden="true" />}
              />
              <InfoTile
                label="سنوات الخبرة"
                value={
                  applicant.profile?.experience_years !== null &&
                  applicant.profile?.experience_years !== undefined
                    ? String(applicant.profile.experience_years)
                    : 'غير متوفرة'
                }
                icon={<BriefcaseBusiness size={16} aria-hidden="true" />}
              />
              <InfoTile
                label="درجة المطابقة"
                value={
                  applicant.application.match_score !== null &&
                  applicant.application.match_score !== undefined
                    ? String(applicant.application.match_score)
                    : 'غير متوفرة'
                }
                icon={<Sparkles size={16} aria-hidden="true" />}
              />
              <InfoTile
                label="تاريخ التقديم"
                value={
                  applicant.application.applied_at
                    ? new Date(applicant.application.applied_at).toLocaleString('ar-EG')
                    : 'غير متوفر'
                }
                icon={<CalendarClock size={16} aria-hidden="true" />}
              />
            </div>

            <section className="rounded-[22px] bg-[var(--surface-muted)] p-5">
              <p className="text-sm font-medium text-[var(--text)]">المهارات</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {applicant.profile?.skills && applicant.profile.skills.length > 0 ? (
                  applicant.profile.skills.map((skill) => (
                    <Badge key={skill} tone="neutral">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-[var(--text-soft)]">لا توجد مهارات معروضة لهذا المتقدم.</span>
                )}
              </div>
            </section>

            <section className="rounded-[22px] bg-[var(--surface-muted)] p-5">
              <p className="text-sm font-medium text-[var(--text)]">نبذة مختصرة</p>
              <p className="mt-3 text-sm leading-8 text-[var(--text-soft)]">
                {applicant.profile?.bio ?? applicant.application.ai_feedback ?? 'لا توجد تفاصيل إضافية متاحة حاليًا.'}
              </p>
            </section>

            <section className="rounded-[22px] bg-[var(--surface-muted)] p-5">
              <div className="flex items-center gap-2">
                <FileText size={16} aria-hidden="true" className="text-[var(--warn)]" />
                <p className="text-sm font-medium text-[var(--text)]">السيرة الذاتية</p>
              </div>
              <p className="mt-3 text-sm leading-8 text-[var(--text-soft)]">
                ستظهر السيرة الذاتية هنا للشركة فور توفر حقل أو تخزين مدعوم لها من الباكند.
              </p>
              <div className="mt-3">
                <Badge tone="warning">غير متاحة حاليًا</Badge>
              </div>
            </section>

            <div className="flex flex-wrap gap-3">
              <Link href={`/profiles/${applicant.application.applicant_id}`}>
                <Button variant="secondary">عرض الملف العام</Button>
              </Link>
              <Badge tone="warning">تحديث الحالة بانتظار تأكيد الصلاحيات من الباكند</Badge>
            </div>
          </div>
        )}
      </Card>
    </section>
  )
}

function InfoTile({ label, value, icon }) {
  return (
    <div className="rounded-[20px] bg-[var(--surface-muted)] p-4">
      <div className="flex items-center gap-2 text-[var(--text-faint)]">
        {icon}
        <p className="text-xs font-semibold text-[var(--text-faint)]">{label}</p>
      </div>
      <p className="mt-3 text-sm font-medium text-[var(--text)]">{value}</p>
    </div>
  )
}
