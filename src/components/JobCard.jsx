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
    <Card className="h-full bg-white p-6 shadow-2xs hover:shadow-md hover:border-amber-200 transition-all duration-300">
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-base font-extrabold text-slate-900 leading-snug">
              {job.title ?? 'بدون عنوان'}
            </p>
            <div className="mt-2 flex flex-wrap gap-2.5 text-xs font-semibold text-slate-500">
              {job.company_name ? (
                <span className="inline-flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                  <Building2 size={14} className="text-teal-600" aria-hidden="true" />
                  {job.company_name}
                </span>
              ) : null}
              {job.location ? (
                <span className="inline-flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                  <MapPin size={14} className="text-amber-600" aria-hidden="true" />
                  {job.location}
                </span>
              ) : null}
            </div>
          </div>
          {job.status ? <Badge tone="gold">{job.status}</Badge> : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.type ? <Badge tone="brand">{job.type}</Badge> : null}
          {job.salary_range ? (
            <Badge tone="gold">
              <span className="inline-flex items-center gap-1">
                <Wallet size={14} aria-hidden="true" />
                {job.salary_range}
              </span>
            </Badge>
          ) : null}
        </div>

        {job.description ? (
          <p className="mt-4 line-clamp-4 text-xs leading-relaxed text-slate-600 font-medium">
            {job.description}
          </p>
        ) : (
          <p className="mt-4 text-xs leading-relaxed text-slate-400 font-medium">
            لا يوجد وصف متاح لهذه الوظيفة حاليًا.
          </p>
        )}

        {skillsList.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {skillsList.slice(0, 4).map((skill) => (
              <Badge key={skill} tone="neutral" className="bg-slate-50 border-slate-200">
                {skill}
              </Badge>
            ))}
          </div>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-5 border-t border-slate-100/90">
          <Link href={`/jobs/${job.id}`}>
            <Button
              variant="secondary"
              size="sm"
              leadingIcon={<BriefcaseBusiness size={15} aria-hidden="true" />}
            >
              تفاصيل الوظيفة
            </Button>
          </Link>
          {job.company_id ? (
            <Link href={`/company/jobs`}>
              <Button variant="ghost" size="sm">وظائف الشركة</Button>
            </Link>
          ) : null}
        </div>
      </div>
    </Card>
  )
}
