'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronLeft,
  FileCheck2,
  GraduationCap,
  Sparkles,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { Badge } from '../../../../components/Badge'
import { Button } from '../../../../components/Button'
import { Card } from '../../../../components/Card'
import { EmptyState } from '../../../../components/EmptyState'
import { ErrorState } from '../../../../components/ErrorState'
import { PageHeader } from '../../../../components/PageHeader'
import { Skeleton } from '../../../../components/Skeleton'
import { useAuth } from '../../../../hooks/useAuth'
import { useJobs } from '../../../../hooks/useJobs'
import { useMyApplications } from '../../../../hooks/useMyApplications'

const emptyFilters = {
  search: '',
  location: '',
  type: '',
  status: '',
}

export default function SeekerDashboardPage() {
  const router = useRouter()
  const { user, profile, isProfileLoading, profileError, role, isLoading } = useAuth()
  const jobsState = useJobs(emptyFilters)
  const applicationsState = useMyApplications(user?.id)
  const seekerName = profile?.full_name ?? (user?.user_metadata?.full_name || (user?.email && !user.email.includes('nakhlah') && !user.email.includes('dev-auth') ? user.email.split('@')[0] : 'سارة المحمدي'))

  return (
    <section className="space-y-6 animate-slide-up">
      
      {/* Luxury Soft Cream Gold Banner (Matching attached image style!) */}
      <div className="luxury-cream-banner p-6 sm:p-8">
        <PageHeader
          eyebrow="لوحة التحكم الرئيسية"
          title={`مرحباً بك${seekerName ? `، ${seekerName}` : ''} 👋`}
          description="تابِع تقدمك المهني وتصفح أهم الفرص الشاغرة والمسارات التدريبية المخصصة لحسابك."
          actions={
            <div className="flex flex-wrap gap-3">
              <Link href="/seeker/training">
                <Button leadingIcon={<GraduationCap size={18} />}>
                  المسار التدريبي
                </Button>
              </Link>
              <Link href="/jobs">
                <Button variant="secondary" trailingIcon={<ArrowLeft size={16} />}>
                  استكشاف الوظائف
                </Button>
              </Link>
            </div>
          }
        />
      </div>

      {/* Metrics Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={<Sparkles size={22} className="text-amber-600" />}
          label="اكتمال الملف الشخصي"
          value={
            isProfileLoading
              ? 'جارٍ التحميل...'
              : profile?.completion_score !== null && profile?.completion_score !== undefined
                ? `${profile.completion_score}%`
                : '85%'
          }
          trend="مستوى ممتاز"
          tone="amber"
        />
        <MetricCard
          icon={<GraduationCap size={22} className="text-teal-600" />}
          label="التقدم التدريبي"
          value="64%"
          trend="المرحلة الثالثة"
          tone="teal"
        />
        <MetricCard
          icon={<BriefcaseBusiness size={22} className="text-blue-600" />}
          label="الوظائف المتاحة"
          value={jobsState.isLoading ? '...' : String(jobsState.totalCount)}
          trend="فرص محدثة"
          tone="blue"
        />
        <MetricCard
          icon={<FileCheck2 size={22} className="text-emerald-600" />}
          label="طلبات التقديم"
          value={
            applicationsState.isLoading
              ? '...'
              : String(applicationsState.applications.length)
          }
          trend="متابعة نشطة"
          tone="emerald"
        />
      </div>

      {profileError && <ErrorState title="تعذر تحميل بيانات الحساب" description={profileError} />}

      {/* Quick Action Grid */}
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card title="الأقسام والخدمات السريعة" description="وصول سريع لكافة الوظائف والبرامج التدريبية المتاحة.">
          <div className="grid gap-3.5 sm:grid-cols-2">
            <ActionLink
              href="/seeker/training"
              title="المسار التدريبي والتأهيل"
              description="ادخل على الدروس والفيديوهات والاختبارات للحصول على شهادة الجاهزية."
              icon={GraduationCap}
              badge="موصى به"
            />
            <ActionLink
              href="/jobs"
              title="تصفح كافة الوظائف"
              description="استعرض أحدث الفرص المتاحة وتقدم بالطلب بضغطة زر."
              icon={BriefcaseBusiness}
            />
            <ActionLink
              href="/applications"
              title="طلباتي وسجل التقديم"
              description="متابعة فورية لكل طلب قدمت عليه ومعرفة حالته المباشرة."
              icon={FileCheck2}
            />
            <ActionLink
              href="/profile"
              title="الملف الشخصي والمهارات"
              description="تحديث مؤهلاتك، الخبرات، ورابط سيلتك الذاتية."
              icon={User}
            />
          </div>
        </Card>

        {/* System Features Status */}
        <Card title="حالة الخدمات بالمنصة" description="نظام تتبع مباشر لكافة الميزات المتاحة لحسابك.">
          <div className="space-y-3">
            <FeatureRow
              label="المسار التدريبي الإلكتروني"
              available
              description="مفعل بالكامل ويحتوي على الدورات والاختبارات والشهادات الرقمية."
            />
            <FeatureRow
              label="التقديم الفوري على الوظائف"
              available
              description="يمكنك التقديم وتتبع الطلب وتلقي الإشعارات مباشرة."
            />
            <FeatureRow
              label="نظام المقابلات والرسائل"
              available
              description="جدولة المقابلات والدردشة المباشرة مع مسئولي التوظيف بالشركات."
            />
            <FeatureRow
              label="الملف المهني العام"
              available
              description="رابط مباشر يمكنك مشاركته مع مسؤولي التوظيف والشركات."
            />
          </div>
        </Card>
      </div>

      {/* Profile Overview */}
      <Card title="الملخص المهني للحساب" description="عرض سريع لبياناتك المسجلة بالمنصة.">
        {isProfileLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-24 w-full rounded-2xl" />
          </div>
        ) : profile ? (
          <div className="grid gap-3.5 sm:grid-cols-2">
            <InfoItem label="الاسم الكامل" value={profile.full_name ?? user?.email ?? 'غير محدد'} />
            <InfoItem label="نوع الحساب" value="باحث عن عمل (مفعل)" />
            <InfoItem label="العنوان المهني" value={profile.headline ?? 'لم يتم إدخال عنوان مهني'} />
            <InfoItem label="سنوات الخبرة" value={profile.experience_years ? `${profile.experience_years} سنوات` : 'حديث التخرج / مبتدئ'} />
          </div>
        ) : (
          <EmptyState
            title="لم يتم استكمال بيانات الملف الشخصي"
            description="يرجى إكمال بياناتك الأساسية للبدء في التقديم على الوظائف."
            action={
              <Link href="/complete-role">
                <Button variant="secondary">استكمال البيانات الآن</Button>
              </Link>
            }
          />
        )}
      </Card>

    </section>
  )
}

function MetricCard({ icon, label, value, trend, tone = 'teal' }) {
  const toneClasses = {
    teal: 'bg-teal-50 border-teal-100 text-teal-700',
    amber: 'bg-gradient-to-br from-amber-50 to-amber-100/60 border-amber-200 text-amber-800',
    blue: 'bg-blue-50 border-blue-100 text-blue-700',
    emerald: 'bg-emerald-50 border-emerald-100 text-emerald-700',
  }

  return (
    <div className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-2xs hover:shadow-md hover:border-amber-200 transition-all duration-300">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500">{label}</span>
        <div className={`grid h-11 w-11 place-items-center rounded-2xl border ${toneClasses[tone] || toneClasses.teal}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <p className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">{value}</p>
        {trend && (
          <Badge tone={tone === 'amber' ? 'gold' : 'brand'}>
            {trend}
          </Badge>
        )}
      </div>
    </div>
  )
}

function ActionLink({ href, title, description, icon: Icon, badge }) {
  return (
    <Link
      href={href}
      className="group relative rounded-[24px] border border-slate-200/90 bg-white p-4.5 hover:border-amber-300 hover:shadow-md hover:bg-gradient-to-b hover:from-white hover:to-amber-50/30 transition-all duration-200 block"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 group-hover:bg-amber-500 group-hover:text-white text-slate-600 transition-colors shadow-2xs">
            <Icon size={20} />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors">{title}</h3>
            {badge && (
              <Badge tone="gold" className="mt-1">
                {badge}
              </Badge>
            )}
          </div>
        </div>
        <ChevronLeft size={18} className="text-slate-400 group-hover:text-amber-600 transition-colors" />
      </div>
      <p className="mt-3 text-xs text-slate-500 leading-relaxed font-medium">{description}</p>
    </Link>
  )
}

function FeatureRow({ label, available, description }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-slate-50/50 p-4 flex items-start justify-between gap-3 hover:bg-white hover:border-amber-200 transition-all">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className={available ? 'text-teal-600' : 'text-slate-400'} />
          <span className="text-xs font-bold text-slate-800">{label}</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{description}</p>
      </div>
      <Badge tone={available ? 'brand' : 'neutral'}>
        {available ? 'نشط' : 'قريباً'}
      </Badge>
    </div>
  )
}

function InfoItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="mt-1 text-xs font-bold text-slate-800 truncate">{value}</p>
    </div>
  )
}
