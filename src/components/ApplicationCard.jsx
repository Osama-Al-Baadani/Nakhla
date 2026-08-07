'use client'

import { CalendarClock, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from './Button'
import { Card } from './Card'
import { ApplicationStatusBadge } from './ApplicationStatusBadge'

export function ApplicationCard({ application }) {
  return (
    <Card className="h-full bg-white p-5">
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-medium text-[var(--text)]">
              {application.job?.title ?? 'طلب تقديم'}
            </p>
            <p className="mt-2 text-sm text-[var(--text-soft)]">
              {application.job?.company_name ?? 'الشركة غير متوفرة'}
            </p>
          </div>
          <ApplicationStatusBadge status={application.status} />
        </div>

        <div className="grid gap-3 text-sm text-[var(--text-soft)] md:grid-cols-2">
          <div className="inline-flex items-center gap-2">
            <CalendarClock size={15} aria-hidden="true" />
            {application.applied_at
              ? new Date(application.applied_at).toLocaleString('ar-EG')
              : 'تاريخ التقديم غير متوفر'}
          </div>
          {application.match_score !== null && application.match_score !== undefined ? (
            <div className="inline-flex items-center gap-2">
              <Sparkles size={15} aria-hidden="true" />
              درجة المطابقة: {application.match_score}
            </div>
          ) : null}
        </div>

        {application.ai_feedback ? (
          <p className="rounded-[18px] bg-[var(--surface-muted)] p-4 text-sm leading-7 text-[var(--text-soft)]">
            {application.ai_feedback}
          </p>
        ) : null}

        <div className="mt-auto">
          <Link href={`/applications/${application.id}`}>
            <Button variant="secondary">تفاصيل الطلب</Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
