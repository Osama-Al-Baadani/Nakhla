'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '../../../../components/Card'
import { ErrorState } from '../../../../components/ErrorState'
import { JobForm } from '../../../../components/JobForm'
import { PageHeader } from '../../../../components/PageHeader'
import { useAuth } from '../../../../hooks/useAuth'
import { jobsService } from '../../../../services/jobs-service'
import { getUserFacingErrorMessage } from '../../../../lib/error-messages'

const initialValues = {
  company_name: '',
  title: '',
  location: '',
  salary_range: '',
  type: 'full-time',
  description: '',
  skills_required: '',
  status: 'open',
}

export default function CreateJobPage() {
  const router = useRouter()
  const { user, profile } = useAuth()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  function handleChange(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = {}

    if (!values.title.trim()) nextErrors.title = 'عنوان الوظيفة مطلوب.'
    if (!values.description.trim()) nextErrors.description = 'وصف الوظيفة مطلوب.'
    if (!values.type) nextErrors.type = 'نوع الوظيفة مطلوب.'

    setErrors(nextErrors)
    setSubmitError(null)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    const companyId = user?.id || 'anonymous'
    const companyName = values.company_name.trim() || profile?.full_name || user?.email || 'منشأة معتمدة'

    const result = await jobsService.createJob(companyId, companyName, {
      title: values.title.trim(),
      location: values.location.trim(),
      salary_range: values.salary_range.trim(),
      type: values.type,
      description: values.description.trim(),
      skills_required: values.skills_required.trim(),
      status: values.status || 'open',
    })

    setIsSubmitting(false)

    if (result.kind === 'error') {
      setSubmitError(
        getUserFacingErrorMessage(result.error, {
          fallback: 'تعذر نشر الوظيفة في الوقت الحالي. تحقق من صلاحياتك وحاول مرة أخرى.',
        }),
      )
      return
    }

    router.push('/jobs')
  }

  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.95),_rgba(239,246,252,0.92))]">
        <PageHeader
          eyebrow="قطاع الأعمال"
          title="إنشاء وظيفة جديدة"
          description="أدخل تفاصيل الوظيفة الشاغرة ليتم نشرها وتخزينها فوراً في قاعدة بيانات Firestore المباشرة."
        />
      </Card>

      {submitError && <ErrorState title="تعذر نشر الوظيفة" description={submitError} />}

      <JobForm
        title="بيانات الوظيفة"
        description="أدخل معلومات الوظيفة والمهارات المطلوبة لاستقطاب الكوادر المناسبة."
        values={{
          ...values,
          company_name: values.company_name || profile?.full_name || user?.email || '',
        }}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="نشر الوظيفة الآن"
        isSubmitting={isSubmitting}
      />
    </section>
  )
}
