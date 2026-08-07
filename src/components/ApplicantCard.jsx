'use client'

import { useMemo } from 'react'
import {
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Link2,
  Mail,
  Sparkles,
  UserRound,
  XCircle,
} from 'lucide-react'
import Link from 'next/link'
import { Avatar } from './Avatar'
import { Badge } from './Badge'
import { Button } from './Button'
import { Card } from './Card'
import { ApplicationStatusBadge } from './ApplicationStatusBadge'

export function ApplicantCard({ applicant, previewStatus, onAccept, onReject }) {
  const effectiveStatus = previewStatus ?? applicant.application.status
  const hasActions = Boolean(onAccept || onReject)

  const statusNote = useMemo(() => {
    if (previewStatus && previewStatus !== applicant.application.status) {
      return 'تم تحديث الحالة داخل المعاينة فقط بانتظار الربط الخلفي.'
    }

    return 'تحديث حالة المتقدم سيحتاج ربطًا نهائيًا مع الباك اند وصلاحيات التعديل.'
  }, [applicant.application.status, previewStatus])

  return (
    <Card className="bg-white p-5">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar
              name={applicant.profile?.full_name ?? applicant.user?.display_name ?? applicant.user?.email ?? 'المتقدم'}
              src={applicant.profile?.avatar_url ?? undefined}
            />
            <div>
              <p className="text-base font-medium text-[var(--text)]">
                {applicant.profile?.full_name ?? applicant.user?.display_name ?? 'بدون اسم كامل'}
              </p>
              <p className="mt-1 text-sm text-[var(--text-soft)]">
                {applicant.profile?.headline ?? 'لا يوجد عنوان مهني متاح.'}
              </p>
            </div>
          </div>
          <ApplicationStatusBadge status={effectiveStatus} />
        </div>

        <div className="grid gap-3 text-sm text-[var(--text-soft)] md:grid-cols-2">
          {applicant.user?.email ? (
            <div className="inline-flex items-center gap-2">
              <Mail size={15} aria-hidden="true" />
              {applicant.user.email}
            </div>
          ) : null}
          {applicant.profile?.experience_years !== null && applicant.profile?.experience_years !== undefined ? (
            <div className="inline-flex items-center gap-2">
              <BriefcaseBusiness size={15} aria-hidden="true" />
              سنوات الخبرة: {applicant.profile.experience_years}
            </div>
          ) : null}
          {applicant.application.match_score !== null && applicant.application.match_score !== undefined ? (
            <div className="inline-flex items-center gap-2">
              <Sparkles size={15} aria-hidden="true" />
              درجة المطابقة: {applicant.application.match_score}
            </div>
          ) : null}
          {applicant.profile?.role ? (
            <div className="inline-flex items-center gap-2">
              <UserRound size={15} aria-hidden="true" />
              {applicant.profile.role}
            </div>
          ) : null}
        </div>

        {applicant.profile?.skills && applicant.profile.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {applicant.profile.skills.slice(0, 6).map((skill) => (
              <Badge key={skill} tone="neutral">
                {skill}
              </Badge>
            ))}
          </div>
        ) : null}

        <div className="rounded-[18px] bg-[var(--surface-muted)] p-4 text-sm leading-7 text-[var(--text-soft)]">
          <div className="flex items-center gap-2 font-medium text-[var(--text)]">
            <FileText size={16} aria-hidden="true" className="text-[var(--warn)]" />
            السيرة الذاتية
          </div>
          <p className="mt-2">
            الصورة الشخصية متاحة للعرض الآن، أما السيرة الذاتية فستظهر هنا بعد تفعيل الحقل أو التخزين المدعوم لها من الباك اند.
          </p>
        </div>

        {applicant.application.ai_feedback ? (
          <p className="rounded-[18px] bg-[var(--surface-muted)] p-4 text-sm leading-7 text-[var(--text-soft)]">
            {applicant.application.ai_feedback}
          </p>
        ) : null}

        <div className="rounded-[18px] border border-dashed border-[var(--line-strong)] bg-[var(--surface-muted)] p-4 text-sm text-[var(--text-soft)]">
          {statusNote}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href={`/jobs/${applicant.application.job_id}/applicants/${applicant.application.applicant_id}`}>
            <Button variant="secondary">تفاصيل المتقدم</Button>
          </Link>
          <Link href={`/profiles/${applicant.application.applicant_id}`}>
            <Button variant="secondary" leadingIcon={<Link2 size={16} aria-hidden="true" />}>
              ملف المتقدم
            </Button>
          </Link>
          {hasActions ? (
            <>
              <Button
                variant="secondary"
                leadingIcon={<CheckCircle2 size={16} aria-hidden="true" />}
                onClick={onAccept}
              >
                قبول المتقدم
              </Button>
              <Button
                variant="danger"
                leadingIcon={<XCircle size={16} aria-hidden="true" />}
                onClick={onReject}
              >
                رفض المتقدم
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </Card>
  )
}
