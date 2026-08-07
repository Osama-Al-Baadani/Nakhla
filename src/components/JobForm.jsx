'use client'

import { Badge } from './Badge'
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
  { label: 'نشطة', value: 'active' },
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
  submitLabel,
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
            label="عنوان الوظيفة"
            value={values.title}
            onChange={(event) => onChange('title', event.target.value)}
            error={errors.title}
            placeholder="مثال: مسؤول تشغيل"
          />
          <Input
            label="الموقع"
            value={values.location}
            onChange={(event) => onChange('location', event.target.value)}
            error={errors.location}
            placeholder="المدينة أو الدولة"
          />
          <Input
            label="الراتب"
            value={values.salary_range}
            onChange={(event) => onChange('salary_range', event.target.value)}
            error={errors.salary_range}
            placeholder="مثال: 8000 - 12000"
          />
          <Select
            label="نوع الوظيفة"
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
            hint="يمكن استخدام هذه الحالة لإظهار الوظيفة كنشطة أو مسودة أو مغلقة عند اكتمال الربط الخلفي."
          />
        </div>

        <Textarea
          label="الوصف"
          value={values.description}
          onChange={(event) => onChange('description', event.target.value)}
          error={errors.description}
          rows={6}
          placeholder="أدخل وصف الوظيفة"
        />

        <Textarea
          label="المهارات المطلوبة"
          value={values.skills_required}
          onChange={(event) => onChange('skills_required', event.target.value)}
          error={errors.skills_required}
          rows={4}
          hint="أدخل المهارات مفصولة بفواصل. ستُستخدم لاحقًا في الفرز والبحث الذكي عند اكتمال الربط."
          placeholder="React, JavaScript, SQL"
        />

        <div className="rounded-[20px] border border-dashed border-[var(--line-strong)] bg-[var(--surface-muted)] p-4 text-sm leading-7 text-[var(--text-soft)]">
          {submitUnavailableReason}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled className="w-full sm:w-auto">
            {submitLabel}
          </Button>
          <Badge tone="warning">الحفظ الفعلي بانتظار الباك اند</Badge>
        </div>
      </form>
    </Card>
  )
}
