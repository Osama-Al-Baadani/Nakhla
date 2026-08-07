'use client'

import { use, useEffect, useMemo, useState } from 'react'
import { Search, Sparkles } from 'lucide-react'
import { ApplicantCard } from '../../../../../components/ApplicantCard'
import { Badge } from '../../../../../components/Badge'
import { Button } from '../../../../../components/Button'
import { Card } from '../../../../../components/Card'
import { EmptyState } from '../../../../../components/EmptyState'
import { ErrorState } from '../../../../../components/ErrorState'
import { Input } from '../../../../../components/Input'
import { Modal } from '../../../../../components/Modal'
import { PageHeader } from '../../../../../components/PageHeader'
import { Select } from '../../../../../components/Select'
import { Skeleton } from '../../../../../components/Skeleton'
import { useApplicants } from '../../../../../hooks/useApplicants'
import { useJob } from '../../../../../hooks/useJob'

const smartPrompts = ['الأعلى مطابقة', 'الخبرة الأعلى', 'جاهز للمقابلة', 'أحدث المتقدمين']

export default function JobApplicantsPage({ params }) {
  const resolvedParams = use(params)
  const jobId = resolvedParams?.jobId
  const { job } = useJob(jobId)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [smartMode, setSmartMode] = useState('')
  const [previewStatuses, setPreviewStatuses] = useState({})
  const [pendingAction, setPendingAction] = useState(null)

  const { isLoading, applicants, error, isRlsBlocked, statusOptions } = useApplicants(jobId, search, status)

  useEffect(() => {
    setPreviewStatuses({})
  }, [jobId])

  const statusItems = useMemo(
    () => [{ label: 'كل الحالات', value: '' }].concat(statusOptions.map((item) => ({ label: item, value: item }))),
    [statusOptions],
  )

  const smartApplicants = useMemo(() => {
    const base = [...applicants]

    if (smartMode === 'الأعلى مطابقة') {
      return base.sort((a, b) => (b.application.match_score ?? -1) - (a.application.match_score ?? -1))
    }

    if (smartMode === 'الخبرة الأعلى') {
      return base.sort((a, b) => (b.profile?.experience_years ?? -1) - (a.profile?.experience_years ?? -1))
    }

    if (smartMode === 'أحدث المتقدمين') {
      return base.sort(
        (a, b) =>
          new Date(b.application.applied_at ?? 0).getTime() - new Date(a.application.applied_at ?? 0).getTime(),
      )
    }

    if (smartMode === 'جاهز للمقابلة') {
      return base.filter(
        (item) =>
          (item.application.match_score ?? 0) >= 70 ||
          (item.profile?.experience_years ?? 0) >= 2,
      )
    }

    return base
  }, [applicants, smartMode])

  const previewCount = Object.keys(previewStatuses).length

  function openStatusAction(applicantId, applicantName, nextStatus) {
    setPendingAction({ applicantId, applicantName, nextStatus })
  }

  function confirmStatusAction() {
    if (!pendingAction) return
    setPreviewStatuses((current) => ({
      ...current,
      [pendingAction.applicantId]: pendingAction.nextStatus,
    }))
    setPendingAction(null)
  }

  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.96),_rgba(237,246,252,0.92))]">
        <PageHeader
          eyebrow="المتقدمون"
          title={job?.title ?? 'المتقدمون على الوظيفة'}
          description="تعرض هذه الصفحة طلبات التقديم المرتبطة بالوظيفة الحالية فقط، مع نظام فرز وبحث وإجراءات واجهية لإدارة الترشيحات."
          actions={
            <div className="flex flex-wrap gap-2">
              <Badge tone="brand">إدارة المتقدمين</Badge>
              {previewCount > 0 ? <Badge tone="warning">{previewCount} تحديثات معاينة</Badge> : null}
            </div>
          }
        />
      </Card>

      <Card
        title="البحث والتصفية"
        description="ابحث باسم المتقدم أو بريده أو عنوانه المهني، وصفّ حسب الحالة الحالية، واستخدم الفرز الذكي لعرض أولويات مختلفة."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_auto]">
          <Input
            label="البحث"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="اسم المتقدم أو البريد أو العنوان المهني"
          />
          <Select label="الحالة" value={status} onChange={(event) => setStatus(event.target.value)} options={statusItems} />
          <Select
            label="البحث الذكي"
            value={smartMode}
            onChange={(event) => setSmartMode(event.target.value)}
            options={[{ label: 'بدون فرز ذكي', value: '' }].concat(smartPrompts.map((item) => ({ label: item, value: item })))}
            hint="ترتيب أو فلترة واجهية مبدئية لحين اكتمال البحث الذكي الحقيقي."
          />
          <div className="flex items-end sm:col-span-2 xl:col-span-1">
            <Button
              type="button"
              variant="secondary"
              className="w-full xl:w-auto"
              leadingIcon={<Search size={16} aria-hidden="true" />}
              onClick={() => setSearch(search.trim())}
            >
              تحديث النتائج
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {smartPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => setSmartMode(prompt)}
              className={`rounded-full px-3 py-2 text-sm transition ${
                smartMode === prompt
                  ? 'bg-[var(--brand)] text-white'
                  : 'border border-[var(--line)] bg-white text-[var(--text-soft)]'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <Sparkles size={14} aria-hidden="true" />
                {prompt}
              </span>
            </button>
          ))}
        </div>
      </Card>

      <Card
        title="قائمة المتقدمين"
        description={isLoading ? 'جار تحميل المتقدمين...' : `إجمالي النتائج الحالية: ${smartApplicants.length}`}
      >
        {isLoading ? (
          <div className="grid gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-56 w-full rounded-[22px]" />
            ))}
          </div>
        ) : error ? (
          <ErrorState
            title={isRlsBlocked ? 'الوصول إلى المتقدمين محجوب' : 'تعذر تحميل المتقدمين'}
            description={error}
          />
        ) : smartApplicants.length === 0 ? (
          <EmptyState
            title="لا توجد طلبات مطابقة"
            description="لم يتم العثور على متتقدمين مطابقين للبحث أو التصفية الحالية، أو لا توجد طلبات متاحة لهذه الوظيفة."
          />
        ) : (
          <div className="grid gap-4">
            {smartApplicants.map((applicant) => {
              const applicantName =
                applicant.profile?.full_name ?? applicant.user?.display_name ?? applicant.user?.email ?? 'المتقدم'

              return (
                <ApplicantCard
                  key={applicant.application.id}
                  applicant={applicant}
                  previewStatus={previewStatuses[applicant.application.id] ?? applicant.application.status}
                  onAccept={() => openStatusAction(applicant.application.id, applicantName, 'accepted')}
                  onReject={() => openStatusAction(applicant.application.id, applicantName, 'rejected')}
                />
              )
            })}
          </div>
        )}
      </Card>

      <Modal
        open={Boolean(pendingAction)}
        title={pendingAction?.nextStatus === 'accepted' ? 'قبول المتقدم' : 'رفض المتقدم'}
        description="سيتم تطبيق هذا التغيير داخل الواجهة الحالية فقط، إلى أن يتم ربط تحديث الحالة فعليًا مع الباك اند."
        onClose={() => setPendingAction(null)}
      >
        <div className="space-y-5">
          <div className="rounded-[20px] bg-[var(--surface-muted)] p-4 text-sm leading-7 text-[var(--text-soft)]">
            {pendingAction?.nextStatus === 'accepted'
              ? `سيتم وضع ${pendingAction?.applicantName} ضمن حالة القبول داخل المعاينة الحالية.`
              : `سيتم وضع ${pendingAction?.applicantName} ضمن حالة الرفض داخل المعاينة الحالية.`}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={confirmStatusAction}>
              {pendingAction?.nextStatus === 'accepted' ? 'تأكيد القبول' : 'تأكيد الرفض'}
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
