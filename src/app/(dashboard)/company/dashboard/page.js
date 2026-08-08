'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  ChevronLeft,
  CreditCard,
  FileBarChart2,
  FileSignature,
  GraduationCap,
  PlusCircle,
  Receipt,
  Settings2,
  ShieldCheck,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { Badge } from '../../../../components/Badge'
import { Button } from '../../../../components/Button'
import { Card } from '../../../../components/Card'
import { ErrorState } from '../../../../components/ErrorState'
import { PageHeader } from '../../../../components/PageHeader'
import { useAuth } from '../../../../hooks/useAuth'
import { useJobs } from '../../../../hooks/useJobs'

const operations = [
  {
    title: 'نشر وإدارة الوظائف الشاغرة',
    description: 'إنشاء فرصة وظيفية جديدة، مراجعة الطلبات، وتخصيص المتطلبات الشاغرة.',
    to: '/jobs',
    icon: Building2,
    badge: 'نشط',
  },
  {
    title: 'مركز استعراض المرشحين',
    description: 'مراجعة المتقدمين، تصفية المهارات، وعرض الملفات السريعة والسير الذاتية.',
    to: '/company/candidates',
    icon: Users,
    badge: 'مباشر',
  },
  {
    title: 'لوحات متابعة الأداء',
    description: 'مؤشرات الأداء التشغيلي ومقاييس سرعة الاختيار ومستوى جودة المتقدمين.',
    to: '/company/performance',
    icon: BarChart3,
  },
  {
    title: 'الإشعارات والتنبيهات',
    description: 'إدارة وتتبع تنبيهات المتقدمين ومتابعة المراسلات مع الكوادر المرشحة.',
    to: '/company/notifications',
    icon: ShieldCheck,
  },
  {
    title: 'سجل الحضور والانضباط',
    description: 'متابعة الدوام ومواعيد العمل وحضور الموظفين المتعاقد معهم.',
    to: '/company/attendance',
    icon: CalendarClock,
  },
  {
    title: 'طلبات التعهيد وتأجير الكوادر',
    description: 'رفع طلبات تزويد العمالة والتشغيل والفرق عن بُعد بسرعة تامة.',
    to: '/company/outsourcing-requests',
    icon: BriefcaseBusiness,
  },
]

const administration = [
  { title: 'إدارة المستخدمين والصلاحيات', to: '/company/admin/users', icon: Users },
  { title: 'إدارة وظائف المنشأة', to: '/company/admin/jobs', icon: Settings2 },
  { title: 'برامج وتدريب الكوادر', to: '/company/admin/courses', icon: GraduationCap },
  { title: 'العقود واتفاقيات العمل', to: '/company/admin/contracts', icon: FileSignature },
  { title: 'التقارير والإحصائيات', to: '/company/admin/reports', icon: FileBarChart2 },
  { title: 'إدارة خطط الاشتراكات', to: '/company/admin/subscriptions', icon: Receipt },
  { title: 'الفواتير والمدفوعات', to: '/company/admin/payments', icon: CreditCard },
]

export default function CompanyDashboardPage() {
  const router = useRouter()
  const { user, profile, isProfileLoading, profileError, role, isLoading } = useAuth()
  const jobsState = useJobs({
    search: '',
    location: '',
    type: '',
    status: '',
    companyId: user?.id,
  })

  const companyName = profile?.full_name || (user?.email ? user.email.split('@')[0] : 'المنشأة')
  const jobsRoute = user?.id ? `/company/jobs` : '/jobs'

  return (
    <section className="space-y-6 animate-slide-up">
      
      {/* Luxury Soft Cream Gold Banner (Matching attached image style!) */}
      <div className="luxury-cream-banner p-6 sm:p-8">
        <PageHeader
          eyebrow="لوحة التحكم للأعمال"
          title={`مساحة عمل: ${companyName}`}
          description="مركز الإدارة والتشغيل الشامل للشركة: استقطاب الكوادر، متابعة المرشحين، التعهيد الخارجي، وإدارة الصلاحيات."
          actions={
            <div className="flex flex-wrap gap-3">
              <Link href="/jobs/create">
                <Button leadingIcon={<PlusCircle size={18} />}>
                  نشر وظيفة جديدة
                </Button>
              </Link>
              <Link href={jobsRoute}>
                <Button variant="secondary">
                  وظائف الشركة
                </Button>
              </Link>
            </div>
          }
        />
      </div>

      {/* Metrics Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          icon={<Building2 size={22} className="text-teal-600" />}
          label="إجمالي الوظائف النشطة"
          value={jobsState.isLoading ? '...' : String(jobsState.totalCount)}
          trend="فرص منشورة"
          tone="teal"
        />
        <MetricCard
          icon={<Users size={22} className="text-amber-600" />}
          label="المرشحون المتاحون"
          value="المساحة جاهزة"
          trend="مرشحون مؤهلون"
          tone="amber"
        />
        <MetricCard
          icon={<ShieldCheck size={22} className="text-blue-600" />}
          label="أقسام الإدارة والتشغيل"
          value={String(administration.length)}
          trend="مفعل بالكامل"
          tone="blue"
        />
      </div>

      {profileError && <ErrorState title="تعذر تحميل بيانات الشركة" description={profileError} />}

      {/* Main Operations Grid */}
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card title="الخدمات والعمليات التشغيلية" description="إدارة التوظيف اليومية وحلول تزويد الكوادر والتعهيد.">
          <div className="grid gap-3.5 sm:grid-cols-2">
            {operations.map((item) => {
              const Icon = item.icon
              const to = item.to === '/jobs' ? jobsRoute : item.to

              return (
                <Link
                  key={item.title}
                  href={to}
                  className="group relative rounded-[24px] border border-slate-200/90 bg-white p-4.5 hover:border-amber-300 hover:shadow-md hover:bg-gradient-to-b hover:from-white hover:to-amber-50/30 transition-all duration-200 block"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 group-hover:bg-amber-500 group-hover:text-white text-slate-600 transition-colors shadow-2xs">
                        <Icon size={20} />
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors">{item.title}</h3>
                    </div>
                    {item.badge && <Badge tone="gold">{item.badge}</Badge>}
                  </div>
                  <p className="mt-3 text-xs text-slate-500 leading-relaxed font-medium">{item.description}</p>
                </Link>
              )
            })}
          </div>
        </Card>

        {/* Administration Links */}
        <Card title="إدارة المنشأة والعقود" description="الأقسام التنظيمية والمالية وإدارة المستخدمين بالشركة.">
          <div className="space-y-2.5">
            {administration.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.to}
                  href={item.to}
                  className="group flex items-center justify-between rounded-2xl border border-slate-200/70 bg-slate-50/60 p-3.5 hover:bg-white hover:border-amber-300 hover:shadow-2xs transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-teal-600 border border-slate-200/60 shadow-2xs">
                      <Icon size={18} />
                    </div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-amber-800">{item.title}</span>
                  </div>
                  <ChevronLeft size={16} className="text-slate-400 group-hover:text-amber-600 transition-colors" />
                </Link>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Account Info */}
      <Card title="تفاصيل حساب المنشأة" description="معلومات الحساب النشط بقطاع الأعمال.">
        <div className="grid gap-3.5 sm:grid-cols-2">
          <InfoItem label="اسم الحساب / الشركة" value={companyName} />
          <InfoItem label="نوع العضوية" value="منشأة معتمدة" />
          <InfoItem label="حالة الربط" value={isProfileLoading ? 'جارٍ التحميل...' : 'مكتمل ومفعل'} />
          <InfoItem label="البريد الإلكتروني" value={user?.email ?? 'غير محدد'} />
        </div>
      </Card>

    </section>
  )
}

function MetricCard({ icon, label, value, trend, tone = 'teal' }) {
  const toneClasses = {
    teal: 'bg-teal-50 border-teal-100 text-teal-700',
    amber: 'bg-gradient-to-br from-amber-50 to-amber-100/60 border-amber-200 text-amber-800',
    blue: 'bg-blue-50 border-blue-100 text-blue-700',
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

function InfoItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="mt-1 text-xs font-bold text-slate-800 truncate">{value}</p>
    </div>
  )
}
