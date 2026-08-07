'use client'

import { use, useMemo, useState } from 'react'
import { Building2, CalendarClock, MapPin, PauseCircle, Trash2, Wallet } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '../../../../../components/Badge'
import { Button } from '../../../../../components/Button'
import { Card } from '../../../../../components/Card'
import { EmptyState } from '../../../../../components/EmptyState'
import { ErrorState } from '../../../../../components/ErrorState'
import { Modal } from '../../../../../components/Modal'
import { PageHeader } from '../../../../../components/PageHeader'
import { Skeleton } from '../../../../../components/Skeleton'
import { useJob } from '../../../../../hooks/useJob'

export default function CompanyJobDetailsPage({ params }) {
  const resolvedParams = use(params)
  const jobId = resolvedParams?.jobId
  const { isLoading, job, error } = useJob(jobId)
  const [previewState, setPreviewState] = useState('default')
  const [pendingAction, setPendingAction] = useState(null)

  const effectiveStatus = useMemo(() => {
    if (previewState === 'paused') return 'موقوفة'
    if (previewState === 'deleted') return 'محذوفة في المعاينة'
    return job?.status ?? 'غير متوفر'
  }, [job?.status, previewState])

  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.96),_rgba(238,247,246,0.92))]">
        <PageHeader
          eyebrow="تفاصيل الوظيفة"
          title={job?.title ?? 'تفاصيل وظيفة الشركة'}
          description="عرض داخلي مخصص للشركة يركز على معلومات الوظيفة، وإجراءات الإدارة الواجهية مثل الإيقاف والحذف حتى قبل اكتمال الربط الخلفي."
          actions={
            <div className="flex flex-wrap gap-3">
              <Link href={jobId ? `/jobs/${jobId}/edit` : '/company/dashboard'}>
                <Button variant="secondary">تعديل الوظيفة</Button>
              </Link>
              <Link href={jobId ? `/jobs/${jobId}/applicants` : '/company/dashboard'}>
                <Button>عرض المتقدمين</Button>
              </Link>
            </div>
          }
        />
      </Card>

      <Card title="معلومات الوظيفة" description="بيانات الوظيفة وحالة التشغيل الحالية من جهة الواجهة.">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-24 w-full rounded-[20px]" />
            <Skeleton className="h-28 w-full rounded-[20px]" />
          </div>
        ) : error ? (
          <ErrorState title="تعذر تحميل الوظيفة" description={error} />
        ) : !job ? (
          <EmptyState
            title="الوظيفة غير متاحة"
            description="لم يتم العثور على هذه الوظيفة أو أن صلاحيات القراءة الحالية لا تسمح بعرضها."
          />
        ) : previewState === 'deleted' ? (
          <EmptyState
            title="تمت إزالة الوظيفة من المعاينة"
            description="تم تنفيذ حذف واجهي مؤقت لهذه الوظيفة داخل الواجهة فقط. سيبقى الحذف الفعلي معلقًا حتى يتم ربط العملية بالباك اند."
            action={
              <Button variant="secondary" onClick={() => setPreviewState('default')}>
                استعادة العرض
              </Button>
            }
          />
        ) : (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Badge tone={previewState === 'paused' ? 'warning' : 'neutral'}>{effectiveStatus}</Badge>
              {job.type ? <Badge tone="brand">{job.type}</Badge> : null}
              {previewState !== 'default' ? <Badge tone="warning">معاينة فقط</Badge> : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoTile label="الشركة" value={job.company_name ?? 'غير متوفر'} icon={<Building2 size={16} aria-hidden="true" />} />
              <InfoTile label="الموقع" value={job.location ?? 'غير متوفر'} icon={<MapPin size={16} aria-hidden="true" />} />
              <InfoTile label="الراتب" value={job.salary_range ?? 'غير متوفر'} icon={<Wallet size={16} aria-hidden="true" />} />
              <InfoTile
                label="تاريخ النشر"
                value={job.posted_at ? new Date(job.posted_at).toLocaleDateString('ar-SA') : 'غير متوفر'}
                icon={<CalendarClock size={16} aria-hidden="true" />}
              />
            </div>

            <section className="rounded-[22px] bg-[var(--surface-muted)] p-5">
              <p className="text-sm font-medium text-[var(--text)]">الوصف</p>
              <p className="mt-3 text-sm leading-8 text-[var(--text-soft)]">
                {job.description ?? 'لا يوجد وصف محفوظ لهذه الوظيفة.'}
              </p>
            </section>

            <section className="rounded-[22px] bg-[var(--surface-muted)] p-5">
              <p className="text-sm font-medium text-[var(--text)]">المهارات المطلوبة</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {job.skills_required && job.skills_required.length > 0 ? (
                  job.skills_required.map((skill) => (
                    <Badge key={skill} tone="neutral">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-[var(--text-soft)]">لا توجد مهارات مسجلة لهذه الوظيفة.</span>
                )}
              </div>
            </section>

            <section className="rounded-[22px] border border-dashed border-[var(--line-strong)] bg-[var(--surface-muted)] p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-medium text-[var(--text)]">إدارة الوظيفة</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
                    يمكنك من جهة الواجهة إيقاف الوظيفة أو حذفها في المعاينة الحالية. التنفيذ الفعلي يبقى بانتظار تأكيد صلاحيات الباك اند.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="secondary"
                    leadingIcon={<PauseCircle size={16} aria-hidden="true" />}
                    onClick={() => setPendingAction('pause')}
                  >
                    إيقاف الوظيفة
                  </Button>
                  <Button
                    variant="danger"
                    leadingIcon={<Trash2 size={16} aria-hidden="true" />}
                    onClick={() => setPendingAction('delete')}
                  >
                    حذف الوظيفة
                  </Button>
                </div>
              </div>
            </section>
          </div>
        )}
      </Card>

      <Modal
        open={Boolean(pendingAction)}
        title={pendingAction === 'delete' ? 'حذف الوظيفة' : 'إيقاف الوظيفة'}
        description="سيتم تطبيق هذا الإجراء داخل الواجهة الحالية فقط، إلى أن يتم ربطه فعليًا بقاعدة البيانات وصلاحيات الشركة."
        onClose={() => setPendingAction(null)}
      >
        <div className="space-y-5">
          <div className="rounded-[20px] bg-[var(--surface-muted)] p-4 text-sm leading-7 text-[var(--text-soft)]">
            {pendingAction === 'delete'
              ? 'سيتم حذف الوظيفة من المعاينة الحالية وإظهار حالة مناسبة للمستخدم.'
              : 'سيتم تحويل حالة الوظيفة إلى موقوفة داخل المعاينة الحالية.'}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => {
                setPreviewState(pendingAction === 'delete' ? 'deleted' : 'paused')
                setPendingAction(null)
              }}
            >
              {pendingAction === 'delete' ? 'تأكيد الحذف' : 'تأكيد الإيقاف'}
            </Button>
            <Button variant="secondary" onClick={() => setPendingAction(null)}>
              إلغاء
            </Button>
          </div>
        </div>
      </Modal>
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
