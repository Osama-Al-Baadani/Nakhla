'use client'

import { Button } from './Button'
import { Card } from './Card'
import { Input } from './Input'
import { Select } from './Select'
import { Textarea } from './Textarea'

const typeOptions = [
  { label: 'اختر نوع الوظيفة', value: '' },
  { label: 'دوام كامل', value: 'full-time' },
  { label: 'دوام جزئي', value: 'part-time' },
  { label: 'عن بُعد', value: 'remote' },
  { label: 'هجين', value: 'hybrid' },
  { label: 'تعاقد', value: 'contract' },
]

const statusOptions = [
  { label: 'اختر الحالة', value: '' },
  { label: 'نشطة', value: 'open' },
  { label: 'مسودة', value: 'draft' },
  { label: 'مغلقة', value: 'closed' },
]

export function JobForm({
  title,
  description,
  values,
  errors = {},
  onChange,
  onSubmit,
  submitLabel = 'حفظ الوظيفة',
  isSubmitting = false,
  submitUnavailableReason,
}) {
  return (
    <Card title={title} description={description}>
      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="اسم الشركة"
            value={values.company_name}
            onChange={(event) => onChange('company_name', event.target.value)}
            error={errors.company_name}
            placeholder="اسم الشركة"
          />
          <Input
            label="عنوان الوظيفة *"
            value={values.title}
            onChange={(event) => onChange('title', event.target.value)}
            error={errors.title}
            placeholder="مثال: مهندس برمجيات"
          />
          <Input
            label="الموقع"
            value={values.location}
            onChange={(event) => onChange('location', event.target.value)}
            error={errors.location}
            placeholder="الرياض / جدة / عن بُعد"
          />
          <Input
            label="الراتب"
            value={values.salary_range}
            onChange={(event) => onChange('salary_range', event.target.value)}
            error={errors.salary_range}
            placeholder="مثال: 8000 - 12000"
          />
          <Select
            label="نوع الوظيفة *"
            value={values.type}
            onChange={(event) => onChange('type', event.target.value)}
            error={errors.type}
            options={typeOptions}
          />
          <Select
            label="الحالة"
            value={values.status}
            onChange={(event) => onChange('status', event.target.value)}
            error={errors.status}
            options={statusOptions}
            hint="اختر نشطة لإظهار الوظيفة فوراً للباحثين."
          />
        </div>

        <Textarea
          label="الوصف *"
          value={values.description}
          onChange={(event) => onChange('description', event.target.value)}
          error={errors.description}
          rows={6}
          placeholder="أدخل وصف الوظيفة والمهام المطلوبة"
        />

        <Textarea
          label="المهارات المطلوبة"
          value={values.skills_required}
          onChange={(event) => onChange('skills_required', event.target.value)}
          error={errors.skills_required}
          rows={4}
          hint="أدخل المهارات مفصولة بفواصل (مثال: React, JavaScript, SQL)."
          placeholder="React, JavaScript, SQL"
        />

        {submitUnavailableReason && (
          <div className="rounded-[20px] border border-dashed border-amber-300 bg-amber-50 p-4 text-sm leading-7 text-amber-800">
            {submitUnavailableReason}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button type="submit" isLoading={isSubmitting} className="w-full sm:w-auto">
            {submitLabel}
          </Button>
        </div>
      </form>
    </Card>
  )
}
