'use client'

import { use, useEffect, useState } from 'react'
import { Card } from '../../../../../components/Card'
import { EmptyState } from '../../../../../components/EmptyState'
import { ErrorState } from '../../../../../components/ErrorState'
import { JobForm } from '../../../../../components/JobForm'
import { PageHeader } from '../../../../../components/PageHeader'
import { Skeleton } from '../../../../../components/Skeleton'
import { useJob } from '../../../../../hooks/useJob'

export default function EditJobPage({ params }) {
  const resolvedParams = use(params)
  const jobId = resolvedParams?.jobId
  const { isLoading, job, error } = useJob(jobId)
  const [values, setValues] = useState({
    company_name: '',
    title: '',
    location: '',
    salary_range: '',
    type: '',
    description: '',
    skills_required: '',
    status: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!job) return

    setValues({
      company_name: job.company_name ?? '',
      title: job.title ?? '',
      location: job.location ?? '',
      salary_range: job.salary_range ?? '',
      type: job.type ?? '',
      description: job.description ?? '',
      skills_required: job.skills_required?.join(', ') ?? '',
      status: job.status ?? '',
    })
  }, [job])

  function handleChange(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = {}

    if (!values.title.trim()) nextErrors.title = 'عنوان الوظيفة مطلوب.'
    if (!values.description.trim()) nextErrors.description = 'وصف الوظيفة مطلوب.'

    setErrors(nextErrors)
  }

  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.95),_rgba(239,246,252,0.92))]">
        <PageHeader
          eyebrow="تعديل الوظيفة"
          title={job?.title ?? 'تعديل بيانات الوظيفة'}
          description="الواجهة جاهزة لتحديث الحقول المعروفة، لكن تنفيذ الحفظ معلق حتى يتأكد دعم update والصلاحيات من الباكند."
        />
      </Card>

      {isLoading ? (
        <Card>
          <div className="space-y-4">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-80 w-full rounded-[22px]" />
          </div>
        </Card>
      ) : error ? (
        <ErrorState title="تعذر تحميل الوظيفة" description={error} />
      ) : !job ? (
        <EmptyState
          title="الوظيفة غير متاحة"
          description="لا يمكن تحميل بيانات هذه الوظيفة للتعديل في الوقت الحالي."
        />
      ) : (
        <JobForm
          title="تحرير البيانات"
          description="تمت تعبئة النموذج من بيانات القراءة الحالية."
          values={values}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel="حفظ التعديلات"
          submitUnavailableReason="تحديث الوظائف غير مفعل حاليًا إلى أن يتم تأكيد صلاحيات التعديل من الباكند وسياسات الوصول المرتبطة بها."
        />
      )}
    </section>
  )
}
