'use client'

import { use } from 'react'
import { Avatar } from '../../../../components/Avatar'
import { Badge } from '../../../../components/Badge'
import { Card } from '../../../../components/Card'
import { EmptyState } from '../../../../components/EmptyState'
import { ErrorState } from '../../../../components/ErrorState'
import { PageHeader } from '../../../../components/PageHeader'
import { Skeleton } from '../../../../components/Skeleton'
import { usePublicProfile } from '../../../../hooks/usePublicProfile'

export default function PublicProfilePage({ params }) {
  const resolvedParams = use(params)
  const profileId = resolvedParams?.profileId
  const { isLoading, profile, error, isRlsBlocked } = usePublicProfile(profileId)

  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.95),_rgba(239,244,252,0.92))]">
        <PageHeader
          eyebrow="الملف الشخصي العام"
          title="عرض الملف الشخصي"
          description="يتم عرض المعلومات العامة المتاحة فقط من جدول profiles وفقاً لصلاحيات القراءة الحالية."
        />
      </Card>

      <Card title="المعلومات العامة" description="حقول مدعومة فقط من المخطط الحالي.">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full rounded-[24px]" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-24 w-full rounded-[20px]" />
          </div>
        ) : isRlsBlocked ? (
          <ErrorState
            title="الملف الشخصي غير متاح"
            description={error ?? 'تم منع الوصول إلى الملف الشخصي بواسطة سياسات الأمان الحالية.'}
          />
        ) : error ? (
          <ErrorState title="تعذر تحميل الملف الشخصي" description={error} />
        ) : profile ? (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Avatar
                name={profile.full_name ?? 'ملف شخصي'}
                src={profile.avatar_url ?? undefined}
                size="lg"
              />
              <div>
                <h2 className="font-serif text-3xl text-[var(--text)]">
                  {profile.full_name ?? 'بدون اسم كامل'}
                </h2>
                <p className="mt-2 text-sm text-[var(--text-soft)]">
                  {profile.headline ?? 'لا يوجد عنوان مهني متاح.'}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ProfileInfo label="الدور" value={profile.role ?? 'غير متوفر'} />
              <ProfileInfo
                label="سنوات الخبرة"
                value={
                  profile.experience_years !== null && profile.experience_years !== undefined
                    ? String(profile.experience_years)
                    : 'غير متوفر'
                }
              />
              <ProfileInfo label="GitHub" value={profile.github_url ?? 'غير متوفر'} />
              <ProfileInfo
                label="نسبة الاكتمال"
                value={
                  profile.completion_score !== null && profile.completion_score !== undefined
                    ? `${profile.completion_score}%`
                    : 'غير متوفر'
                }
              />
            </div>

            <div className="rounded-[22px] bg-[var(--surface-muted)] p-5">
              <p className="text-sm font-medium text-[var(--text)]">النبذة</p>
              <p className="mt-3 text-sm leading-8 text-[var(--text-soft)]">
                {profile.bio ?? 'لا توجد نبذة عامة متاحة.'}
              </p>
            </div>

            <div className="rounded-[22px] bg-[var(--surface-muted)] p-5">
              <p className="text-sm font-medium text-[var(--text)]">المهارات</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.skills && profile.skills.length > 0 ? (
                  profile.skills.map((skill) => (
                    <Badge key={skill} tone="brand">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-[var(--text-soft)]">لا توجد مهارات منشورة.</span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <EmptyState
            title="لم يتم العثور على الملف الشخصي"
            description="لا يوجد صف متاح بهذا المعرف في جدول profiles أو أن الوصول إليه غير متاح."
          />
        )}
      </Card>
    </section>
  )
}

function ProfileInfo({ label, value }) {
  return (
    <div className="rounded-[20px] bg-[var(--surface-muted)] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-faint)]">
        {label}
      </p>
      <p className="mt-3 break-all text-sm font-medium text-[var(--text)]">{value}</p>
    </div>
  )
}
