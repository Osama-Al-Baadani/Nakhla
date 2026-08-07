'use client'

import { CalendarDays, Clock3 } from 'lucide-react'
import { Card } from '../../../components/Card'
import { EmptyState } from '../../../components/EmptyState'
import { PageHeader } from '../../../components/PageHeader'
import { useAuth } from '../../../hooks/useAuth'

export default function InterviewsPage() {
  const { role } = useAuth()
  const isCompany = role === 'company'

  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.95),_rgba(239,246,252,0.92))]">
        <PageHeader
          eyebrow="المقابلات"
          title={isCompany ? 'إدارة المقابلات' : 'مقابلاتي'}
          description={
            isCompany
              ? 'واجهة الشركة للمقابلات جاهزة من جهة التصميم والمسارات، لكنها بانتظار مصدر بيانات وتدفق جدولة مؤكد من الباكند.'
              : 'واجهة الباحث للمقابلات جاهزة من جهة التصميم والمسارات، لكنها بانتظار مصدر بيانات وتدفق جدولة مؤكد من الباكند.'
          }
        />
      </Card>

      <div className="grid gap-5 sm:grid-cols-2">
        <Card>
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-2xl bg-[var(--brand-soft)] text-[var(--brand)]">
              <CalendarDays size={20} aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-[var(--text)]">الجدولة</h2>
              <p className="mt-1 text-sm text-[var(--text-soft)]">
                ستظهر هنا المواعيد عندما يتم اعتماد كيان المقابلات وتدفق الصلاحيات.
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-2xl bg-[var(--brand-soft)] text-[var(--brand)]">
              <Clock3 size={20} aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-[var(--text)]">الحالة الحالية</h2>
              <p className="mt-1 text-sm text-[var(--text-soft)]">
                لا توجد بيانات مقابلات متاحة من الباكند حتى الآن.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <EmptyState
        title="المقابلات بانتظار التكامل"
        description="عند توفر جدول أو خدمة مقابلات وصلاحيات القراءة المناسبة، ستظهر هنا المواعيد والتفاصيل والإجراءات ذات الصلة."
      />
    </section>
  )
}
