'use client'

import { use } from 'react'
import { ArrowRight, Building2, CalendarClock, CheckCircle2, Files, MapPin, Send, Wallet } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '../../../../components/Badge'
import { Button } from '../../../../components/Button'
import { Card } from '../../../../components/Card'
import { EmptyState } from '../../../../components/EmptyState'
import { ErrorState } from '../../../../components/ErrorState'
import { PageHeader } from '../../../../components/PageHeader'
import { Skeleton } from '../../../../components/Skeleton'
import { useApplicationStatus } from '../../../../hooks/useApplicationStatus'
import { useAuth } from '../../../../hooks/useAuth'
import { useJob } from '../../../../hooks/useJob'

export default function JobDetailsPage({ params }) {
  const resolvedParams = use(params)
  const jobId = resolvedParams?.jobId
  const { user, isAuthenticated } = useAuth()
  const { isLoading, job, error } = useJob(jobId)
  const applicationState = useApplicationStatus(jobId, user?.id)

  const skillsList = Array.isArray(job?.skills_required)
    ? job.skills_required
    : typeof job?.skills_required === 'string'
      ? job.skills_required.split(',').map((s) => s.trim()).filter(Boolean)
      : []

  return (
    <section className="space-y-6 animate-slide-up">
      
      {/* Luxury Cream Gold Pill Banner */}
      <div className="luxury-cream-banner p-6 sm:p-8">
        <PageHeader
          eyebrow="تفاصيل الفرصة الشاغرة"
          title={job?.title ?? 'تفاصيل الوظيفة'}
          description={job?.company_name ? `فرصة وظيفية منشورة لدى منشأة ${job.company_name}` : 'تفاصيل ومسئوليات الوظيفة المسجلة بالمنصة.'}
          actions={
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/jobs">
                <Button variant="secondary" size="sm" leadingIcon={<ArrowRight size={16} />}>
                  العودة للوظائف
                </Button>
              </Link>
              {jobId ? (
                isAuthenticated ? (
                  <Button
                    size="sm"
                    onClick={() => void applicationState.apply()}
                    isLoading={applicationState.isSubmitting}
                    disabled={applicationState.hasApplied}
                    leadingIcon={<Send size={16} />}
                  >
                    {applicationState.hasApplied ? 'تم تقديم الطلب' : 'التقديم على الوظيفة'}
                  </Button>
                ) : (
                  <Link href="/login">
                    <Button size="sm">تسجيل الدخول للتقديم</Button>
                  </Link>
                )
              ) : null}
            </div>
          }
        />
      </div>

      {isLoading ? (
        <Card>
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/5" />
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-28 w-full rounded-[24px]" />
          </div>
        </Card>
      ) : error ? (
        <ErrorState title="تعذر تحميل تفاصيل الوظيفة" description={error} />
      ) : !job ? (
        <EmptyState
          title="لم يتم العثور على الوظيفة"
          description="عفواً، لم نتمكن من العثور على هذه الوظيفة في سجلات المنصة."
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          
          {/* Main Job Specs & Description Card */}
          <div className="space-y-6">
            <Card title="تفاصيل ومواصفات الوظيفة" description="معلومات المسئوليات والمهارات المطلوبة.">
              <div className="space-y-6">
                
                {applicationState.successMessage && (
                  <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4 text-xs font-bold text-teal-800 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-teal-600" />
                    <span>{applicationState.successMessage}</span>
                  </div>
                )}

                {applicationState.error && (
                  <ErrorState
                    title={applicationState.isRlsBlocked ? 'تعذر إرسال الطلب بسبب سياسات الوصول' : 'تعذر إرسال الطلب'}
                    description={applicationState.error}
                  />
                )}

                {/* Key Badges Chips */}
                <div className="flex flex-wrap gap-2">
                  {job.type ? <Badge tone="brand">{job.type}</Badge> : null}
                  {job.status ? <Badge tone="gold">{job.status}</Badge> : null}
                  {job.salary_range ? <Badge tone="warning">{job.salary_range}</Badge> : null}
                  {applicationState.hasApplied ? <Badge tone="brand">تم تقديم طلبك بنجاح</Badge> : null}
                </div>

                {/* Grid Metadata Row */}
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <InfoTile icon={<Building2 size={18} className="text-teal-600" />} label="اسم المنشأة" value={job.company_name ?? 'غير محدد'} />
                  <InfoTile icon={<MapPin size={18} className="text-amber-600" />} label="مكان العمل / المدينة" value={job.location ?? 'غير محدد'} />
                  <InfoTile icon={<Wallet size={18} className="text-emerald-600" />} label="الراتب المتوقع" value={job.salary_range ?? 'حسب المقابلة'} />
                  <InfoTile
                    icon={<CalendarClock size={18} className="text-blue-600" />}
                    label="تاريخ النشر"
                    value={job.posted_at ? new Date(job.posted_at).toLocaleDateString('ar-SA') : 'منشور حديثاً'}
                  />
                </div>

                {/* Detailed Description */}
                <div className="rounded-[24px] border border-slate-200/80 bg-slate-50/60 p-6 space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">الوصف الوظيفي والمهام:</h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700 whitespace-pre-line font-medium">
                    {job.description ?? 'لا يوجد وصف متاح لهذه الوظيفة حالياً.'}
                  </p>
                </div>

                {/* Skills Section */}
                {skillsList.length > 0 && (
                  <div className="rounded-[24px] border border-slate-200/80 bg-slate-50/60 p-6 space-y-3">
                    <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">المهارات والتقنيات المطلوبة:</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillsList.map((skill) => (
                        <Badge key={skill} tone="gold" className="px-3.5 py-1 text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right Action Sidebar Card */}
          <div className="space-y-6">
            <Card title="التقديم وتفاصيل الشركة" description="استعراض معطيات المنشأة وإجراءات الطلب.">
              <div className="space-y-5">
                <div className="luxury-cream-pill p-5 text-center space-y-3">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-teal-600 text-white font-extrabold text-2xl shadow-md">
                    {job.company_name ? job.company_name.charAt(0) : 'ش'}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-extrabold text-slate-900">{job.company_name ?? 'الشركة الناشرة'}</h3>
                    <p className="text-xs text-slate-500 font-bold mt-1">منشأة موثوقة في منصة نخلة</p>
                  </div>

                  {isAuthenticated ? (
                    <Button
                      className="w-full mt-2"
                      onClick={() => void applicationState.apply()}
                      isLoading={applicationState.isSubmitting}
                      disabled={applicationState.hasApplied}
                      leadingIcon={<Send size={16} />}
                    >
                      {applicationState.hasApplied ? 'تم تقديم الطلب بالفعل' : 'إرسال طلب التقديم'}
                    </Button>
                  ) : (
                    <Link href="/login" className="block w-full mt-2">
                      <Button className="w-full">تسجيل الدخول للتقديم</Button>
                    </Link>
                  )}
                </div>

                <div className="space-y-2 pt-2">
                  {job.company_id ? (
                    <Link href="/company/jobs" className="block">
                      <Button variant="secondary" className="w-full">
                        وظائف أخرى لهذه الشركة
                      </Button>
                    </Link>
                  ) : null}
                  <Link href={`/jobs/${job.id}/applicants`} className="block">
                    <Button variant="ghost" className="w-full" leadingIcon={<Files size={16} />}>
                      عرض سجل المتقدمين
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>

        </div>
      )}
    </section>
  )
}

function InfoTile({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-[11px] font-extrabold text-slate-500">{label}</span>
      </div>
      <p className="mt-2 text-xs sm:text-sm font-extrabold text-slate-900 truncate">{value}</p>
    </div>
  )
}
