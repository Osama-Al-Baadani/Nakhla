'use client'

import { BriefcaseBusiness, Building2, MapPin, Wallet } from 'lucide-react'
import Link from 'next/link'
import { Badge } from './Badge'
import { Button } from './Button'
import { Card } from './Card'

export function JobCard({ job }) {
  const skillsList = Array.isArray(job.skills_required)
    ? job.skills_required
    : typeof job.skills_required === 'string'
      ? job.skills_required.split(',').map((s) => s.trim()).filter(Boolean)
      : []

  return (
    <Card className="h-full bg-white p-5">
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-[var(--text)]">
              {job.title ?? 'بدون عنوان'}
            </p>
            <div className="mt-2 flex flex-wrap gap-2 text-sm text-[var(--text-soft)]">
              {job.company_name ? (
                <span className="inline-flex items-center gap-1">
                  <Building2 size={15} aria-hidden="true" />
                  {job.company_name}
                </span>
              ) : null}
              {job.location ? (
                <span className="inline-flex items-center gap-1">
                  <MapPin size={15} aria-hidden="true" />
                  {job.location}
                </span>
              ) : null}
            </div>
          </div>
          {job.status ? <Badge tone="neutral">{job.status}</Badge> : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.type ? <Badge tone="brand">{job.type}</Badge> : null}
          {job.salary_range ? (
            <Badge tone="warning">
              <span className="inline-flex items-center gap-1">
                <Wallet size={14} aria-hidden="true" />
                {job.salary_range}
              </span>
            </Badge>
          ) : null}
        </div>

        {job.description ? (
          <p className="mt-4 line-clamp-4 text-sm leading-8 text-[var(--text-soft)]">
            {job.description}
          </p>
        ) : (
          <p className="mt-4 text-sm leading-8 text-[var(--text-faint)]">
            لا يوجد وصف متاح لهذه الوظيفة حاليًا.
          </p>
        )}

        {skillsList.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {skillsList.slice(0, 4).map((skill) => (
              <Badge key={skill} tone="neutral">
                {skill}
              </Badge>
            ))}
          </div>
        ) : null}

        <div className="mt-auto flex flex-wrap gap-3 pt-5">
          <Link href={`/jobs/${job.id}`}>
            <Button
              variant="secondary"
              leadingIcon={<BriefcaseBusiness size={16} aria-hidden="true" />}
            >
              تفاصيل الوظيفة
            </Button>
          </Link>
          {job.company_id ? (
            <Link href={`/company/jobs`}>
              <Button variant="ghost">وظائف الشركة</Button>
            </Link>
          ) : null}
        </div>
      </div>
    </Card>
  )
}
