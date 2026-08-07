'use client'

import { useState } from 'react'
import { Card } from '../../../../components/Card'
import { JobForm } from '../../../../components/JobForm'
import { PageHeader } from '../../../../components/PageHeader'

const initialValues = {
  company_name: '',
  title: '',
  location: '',
  salary_range: '',
  type: '',
  description: '',
  skills_required: '',
  status: '',
}

export default function CreateJobPage() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  function handleChange(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = {}

    if (!values.title.trim()) nextErrors.title = 'عنوان الوظيفة مطلوب.'
    if (!values.description.trim()) nextErrors.description = 'وصف الوظيفة مطلوب.'
    if (!values.type) nextErrors.type = 'نوع الوظيفة مطلوب.'

    setErrors(nextErrors)
  }

  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.95),_rgba(239,246,252,0.92))]">
        <PageHeader
          eyebrow="وظائف الشركة"
          title="إنشاء وظيفة جديدة"
          description="النموذج جاهز من جهة الواجهة الأمامية باستخدام الحقول المعروفة فقط، لكن الحفظ الفعلي يبقى معلقًا حتى يؤكد الباكند صلاحيات الإنشاء."
        />
      </Card>

      <JobForm
        title="بيانات الوظيفة"
        description="نستخدم فقط الحقول المعروفة حاليًا من جدول jobs."
        values={values}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="حفظ الوظيفة"
        submitUnavailableReason="إنشاء الوظائف غير مفعل حاليًا لأن صلاحيات الإدخال والحقول الإلزامية النهائية لم يتم تأكيدها بعد من الباكند."
      />
    </section>
  )
}
