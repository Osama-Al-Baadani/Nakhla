'use client'

import {
  BriefcaseBusiness,
  FileText,
  GraduationCap,
  IdCard,
  Link2,
  PenSquare,
  Sparkles,
  UserRound,
} from 'lucide-react'
import Link from 'next/link'
import { Avatar } from '../../../components/Avatar'
import { Badge } from '../../../components/Badge'
import { Button } from '../../../components/Button'
import { Card } from '../../../components/Card'
import { EmptyState } from '../../../components/EmptyState'
import { ErrorState } from '../../../components/ErrorState'
import { PageHeader } from '../../../components/PageHeader'
import { Skeleton } from '../../../components/Skeleton'
import { useAuth } from '../../../hooks/useAuth'
import { useOwnUser } from '../../../hooks/useOwnUser'
import { useProfile } from '../../../hooks/useProfile'
import { trainingOverview } from '../../../lib/training-demo'

export default function MyProfilePage() {
  const { user, role } = useAuth()
  const profileState = useProfile(user?.id)
  const ownUserState = useOwnUser(user?.id)
  const isCompany = role === 'company'

  const displayName =
    profileState.profile?.full_name ??
    ownUserState.userRecord?.display_name ??
    user?.email ??
    (isCompany ? 'ملف الشركة' : 'ملفي الشخصي')

  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.95),_rgba(236,248,246,0.92))]">
        <PageHeader
          eyebrow={isCompany ? 'ملف الشركة' : 'ملفي الشخصي'}
          title={isCompany ? 'مراجعة بيانات الشركة الحالية' : 'مراجعة بياناتي الحالية'}
          description={
            isCompany
              ? 'يتم عرض بيانات الشركة المتاحة فقط من الجداول الحالية، مع واجهة مهيأة لإضافة الصورة والنبذة والتفاصيل التعريفية.'
              : 'يتم عرض البيانات المتاحة فقط من جدولي profiles و users وفقًا لصلاحيات المستخدم الحالي.'
          }
          actions={
            <div className="flex flex-wrap gap-3">
              <Link href="/profile/edit">
                <Button leadingIcon={<PenSquare size={16} aria-hidden="true" />}>
                  {isCompany ? 'تعديل ملف الشركة' : 'تعديل الملف الشخصي'}
                </Button>
              </Link>
              {!isCompany ? (
                <Link href="/profile/edit#resume">
                  <Button variant="secondary" leadingIcon={<FileText size={16} aria-hidden="true" />}>
                    السيرة الذاتية
                  </Button>
                </Link>
              ) : null}
            </div>
          }
        />
      </Card>

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <Card
          title={isCompany ? 'هوية الشركة' : 'الهوية العامة'}
          description={
            isCompany
              ? 'الصورة والاسم والعنوان التعريفي الأساسي لحساب الشركة.'
              : 'البيانات الأساسية المعروضة من الحساب والملف الشخصي.'
          }
        >
          {profileState.isLoading || ownUserState.isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full rounded-[24px]" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          ) : profileState.error && !profileState.profile ? (
            <ErrorState title={isCompany ? 'تعذر تحميل ملف الشركة' : 'تعذر تحميل الملف الشخصي'} description={profileState.error} />
          ) : (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <Avatar
                  name={displayName}
                  src={profileState.profile?.avatar_url ?? undefined}
                  size="lg"
                />
                <div>
                  <h2 className="font-serif text-3xl text-[var(--text)]">{displayName}</h2>
                  <p className="mt-2 text-sm text-[var(--text-soft)]">
                    {profileState.profile?.headline ??
                      (isCompany ? 'لا يوجد وصف مختصر محفوظ للشركة حاليًا.' : 'لا يوجد عنوان مهني محفوظ حاليًا.')}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <InfoTile
                  icon={<UserRound size={16} aria-hidden="true" />}
                  label={isCompany ? 'بريد الشركة' : 'البريد الإلكتروني'}
                  value={ownUserState.userRecord?.email ?? user?.email ?? 'غير متوفر'}
                />
                <InfoTile
                  icon={<IdCard size={16} aria-hidden="true" />}
                  label="الدور"
                  value={profileState.profile?.role ?? 'غير متوفر'}
                />
                <InfoTile
                  icon={<Sparkles size={16} aria-hidden="true" />}
                  label="نسبة الاكتمال"
                  value={
                    profileState.profile?.completion_score !== null &&
                    profileState.profile?.completion_score !== undefined
                      ? `${profileState.profile.completion_score}%`
                      : 'غير متوفرة'
                  }
                />
                <InfoTile
                  icon={<BriefcaseBusiness size={16} aria-hidden="true" />}
                  label={isCompany ? 'نبذة التشغيل' : 'سنوات الخبرة'}
                  value={
                    isCompany
                      ? profileState.profile?.headline ?? 'غير متوفرة'
                      : profileState.profile?.experience_years !== null &&
                          profileState.profile?.experience_years !== undefined
                        ? String(profileState.profile.experience_years)
                        : 'غير متوفرة'
                  }
                />
              </div>
            </div>
          )}
        </Card>

        <Card
          title={isCompany ? 'تفاصيل ملف الشركة' : 'تفاصيل الملف الشخصي'}
          description={isCompany ? 'عرض الحقول المتاحة للشركة ضمن المخطط الحالي فقط.' : 'عرض الحقول المتاحة في المخطط الحالي فقط.'}
        >
          {profileState.isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-24 w-full rounded-[18px]" />
            </div>
          ) : profileState.isRlsBlocked ? (
            <ErrorState
              title={isCompany ? 'الوصول إلى ملف الشركة محجوب' : 'الوصول إلى الملف الشخصي محجوب'}
              description={profileState.error ?? 'سياسات RLS منعت قراءة بيانات profiles.'}
            />
          ) : profileState.profile ? (
            <div className="space-y-5">
              <section className="rounded-[22px] bg-[var(--surface-muted)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-faint)]">
                  {isCompany ? 'نبذة عن الشركة' : 'النبذة'}
                </p>
                <p className="mt-3 text-sm leading-8 text-[var(--text-soft)]">
                  {profileState.profile.bio ?? (isCompany ? 'لا توجد نبذة محفوظة عن الشركة.' : 'لا توجد نبذة محفوظة.')}
                </p>
              </section>

              <section className="rounded-[22px] bg-[var(--surface-muted)] p-5">
                <div className="flex items-center gap-2">
                  <Link2 size={16} aria-hidden="true" className="text-[var(--brand)]" />
                  <p className="text-sm font-medium text-[var(--text)]">{isCompany ? 'رابط الشركة' : 'رابط GitHub'}</p>
                </div>
                <p className="mt-3 break-all text-sm text-[var(--text-soft)]">
                  {profileState.profile.github_url ?? 'غير متوفر'}
                </p>
              </section>

              <section className="rounded-[22px] bg-[var(--surface-muted)] p-5">
                <p className="text-sm font-medium text-[var(--text)]">{isCompany ? 'التخصصات أو المجالات' : 'المهارات'}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {profileState.profile.skills && profileState.profile.skills.length > 0 ? (
                    profileState.profile.skills.map((skill) => (
                      <Badge key={skill} tone="brand">
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-[var(--text-soft)]">
                      {isCompany ? 'لا توجد مجالات محفوظة حاليًا.' : 'لا توجد مهارات محفوظة.'}
                    </span>
                  )}
                </div>
              </section>

              {isCompany ? (
                <section className="rounded-[22px] border border-[#d8e8e3] bg-[linear-gradient(135deg,_rgba(237,247,246,0.96),_rgba(255,250,240,0.94))] p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <BriefcaseBusiness size={16} aria-hidden="true" className="text-[var(--brand)]" />
                        <p className="text-sm font-medium text-[var(--text)]">واجهة تعريف الشركة</p>
                      </div>
                      <p className="mt-3 text-sm leading-8 text-[var(--text-soft)]">
                        يمكن للشركة من هذه المساحة عرض صورتها واسمها ونبذتها ووصفها المختصر بشكل مرتب أمام المستخدمين
                        والمرشحين، باستخدام الحقول الموجودة حاليًا في الملف.
                      </p>
                    </div>

                    <Link href="/profile/edit">
                      <Button leadingIcon={<PenSquare size={16} aria-hidden="true" />}>تحديث صورة الشركة ونبذتها</Button>
                    </Link>
                  </div>
                </section>
              ) : (
                <>
                  <section className="rounded-[22px] bg-[var(--surface-muted)] p-5">
                    <div className="flex items-center gap-2">
                      <FileText size={16} aria-hidden="true" className="text-[var(--warn)]" />
                      <p className="text-sm font-medium text-[var(--text)]">السيرة الذاتية</p>
                    </div>
                    <p className="mt-3 text-sm leading-8 text-[var(--text-soft)]">
                      سيتم عرض السيرة الذاتية هنا ومشاركتها مع الشركات بعد تفعيل الحقل أو التخزين المدعوم لها من الباك اند.
                    </p>
                    <div className="mt-3">
                      <Badge tone="warning">غير متاحة حاليًا</Badge>
                    </div>
                  </section>

                  <section className="rounded-[22px] border border-[#d8e8e3] bg-[linear-gradient(135deg,_rgba(237,247,246,0.96),_rgba(255,250,240,0.94))] p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <GraduationCap size={16} aria-hidden="true" className="text-[var(--brand)]" />
                          <p className="text-sm font-medium text-[var(--text)]">التدريب</p>
                        </div>
                        <p className="mt-3 text-sm leading-8 text-[var(--text-soft)]">
                          تابع رحلتك التدريبية من نفس صفحة الملف الشخصي، مع الوصول السريع إلى الفيديوهات
                          وملفات PDF والاختبارات وخريطة الإنجاز.
                        </p>
                      </div>

                      <Link href="/seeker/training">
                        <Button leadingIcon={<GraduationCap size={16} aria-hidden="true" />}>
                          دخول نظام التدريب
                        </Button>
                      </Link>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-[18px] bg-white/80 p-4">
                        <p className="text-xs font-semibold text-[var(--text-faint)]">نسبة الإنجاز</p>
                        <p className="mt-3 font-serif text-3xl text-[var(--text)]">
                          {trainingOverview.overallProgress}%
                        </p>
                      </div>
                      <div className="rounded-[18px] bg-white/80 p-4">
                        <p className="text-xs font-semibold text-[var(--text-faint)]">العناصر المكتملة</p>
                        <p className="mt-3 font-serif text-3xl text-[var(--text)]">
                          {trainingOverview.completedAssets}
                        </p>
                      </div>
                      <div className="rounded-[18px] bg-white/80 p-4">
                        <p className="text-xs font-semibold text-[var(--text-faint)]">حالة الشهادة</p>
                        <p className="mt-3 text-sm font-medium text-[var(--text)]">
                          {trainingOverview.certificateStatus}
                        </p>
                      </div>
                    </div>
                  </section>
                </>
              )}
            </div>
          ) : (
            <EmptyState
              title={isCompany ? 'لا توجد بيانات ملف شركة متاحة' : 'لا يوجد ملف شخصي متاح'}
              description={
                isCompany
                  ? 'تم تسجيل الدخول، لكن لا يمكن عرض ملف الشركة من الجدول الحالي.'
                  : 'تم تسجيل الدخول، لكن لا يمكن عرض ملفك الشخصي من الجدول الحالي.'
              }
            />
          )}
        </Card>
      </div>
    </section>
  )
}

function InfoTile({ icon, label, value }) {
  return (
    <div className="rounded-[20px] bg-[var(--surface-muted)] p-4">
      <div className="flex items-center gap-2 text-[var(--text-faint)]">
        {icon}
        <p className="text-xs font-semibold uppercase tracking-[0.12em]">{label}</p>
      </div>
      <p className="mt-3 text-sm font-medium text-[var(--text)]">{value}</p>
    </div>
  )
}
