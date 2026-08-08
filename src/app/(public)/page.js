'use client'

import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Briefcase,
  Building2,
  CheckCircle2,
  Compass,
  FileCheck,
  GraduationCap,
  Layers3,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Input } from '../../components/Input'
import { PublicCTA } from '../../components/public/PublicCTA'
import { setDevAuthPreviewRole } from '../../lib/dev-auth'

const trackOptions = [
  {
    title: 'مسار الباحثين عن عمل',
    subtitle: 'ابنِ سيرتك الذاتية، قدم على أحدث الوظائف المعتمدة، والتحق ببرامج التأهيل المهني.',
    icon: UserCheck,
    tone: 'from-emerald-600 via-emerald-700 to-teal-700 text-white shadow-emerald-700/25',
    badge: 'الأفراد والكوادر',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    btnClass: 'bg-emerald-50 text-emerald-950 border-emerald-200/90 hover:bg-emerald-700 hover:text-white hover:border-emerald-700 shadow-xs',
    href: '/register?role=seeker',
    role: 'seeker',
    btnText: 'البدء في مسار الباحثين',
    items: [
      'تقديم فوري وبسيط بضغطة زر واحدة',
      'خوارزميات توصية ذكية تناسب تخصصك',
      'مسارات تدريبية وتأهيلية معتمدة',
      'إشعارات وتنبيهات فورية لمواعيد المقابلات',
    ],
  },
  {
    title: 'مسار قطاع الأعمال والشركات',
    subtitle: 'استقطب أفضل المهارات الوطنية المؤهلة، أدر وظائفك، واستفد من حلول التعهيد.',
    icon: Building2,
    tone: 'from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-amber-500/25',
    badge: 'الشركات والمنشآت',
    badgeClass: 'bg-amber-50 text-amber-900 border-amber-200/80',
    btnClass: 'bg-amber-50 text-amber-950 border-amber-200/90 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 shadow-xs',
    href: '/register?role=company',
    role: 'company',
    btnText: 'البدء في مسار الشركات',
    items: [
      'نشر وإدارة الوظائف بمرونة كاملة',
      'فرز ذكي وتقييم دقيق للمتقدمين',
      'حلول تعهيد وتزويد بالكوادر بسرعة',
      'متابعة أداء وحضور الكفاءات مباشرة',
    ],
  },
  {
    title: 'حلول التشغيل والتعهيد',
    subtitle: 'تشغيل الفرق وتوفير الكفاءات الموثوقة بأسلوب مرن ومستدام مع الامتثال الكامل.',
    icon: Layers3,
    tone: 'from-teal-700 via-emerald-800 to-slate-900 text-white shadow-teal-700/25',
    badge: 'التشغيل والتعهيد',
    badgeClass: 'bg-teal-50 text-teal-900 border-teal-200/80',
    btnClass: 'bg-teal-50 text-teal-950 border-teal-200/90 hover:bg-teal-800 hover:text-white hover:border-teal-800 shadow-xs',
    href: '/for-companies',
    role: 'company',
    btnText: 'استكشاف حلول التعهيد',
    items: [
      'توفير كوادر مؤهلة في وقت قياسي',
      'إدارة العقود والالتزامات النظامية',
      'تقليل التكاليف التشغيلية والإدارية',
      'دعم مستمر وضمان الامتثال والجودة',
    ],
  },
]

const steps = [
  { title: 'أنشئ حسابك', description: 'سجل خلال دقيقة واحدة وحدد مسارك كباحث أو شركة.', icon: Users },
  { title: 'استكمل بياناتك', description: 'أضف خبراتك أو متطلبات وظائفك للفرز الفوري.', icon: FileCheck },
  { title: 'ابنِ توافقك', description: 'خوارزميات الفرز تضمن ربطاً فائق الدقة بين الطرفين.', icon: Compass },
  { title: 'ابدأ التوظيف أو العمل', description: 'باشر العمل أو استقطب الكفاءة وابدأ التعاقد مباشرة.', icon: Award },
]

const companyReasons = [
  'مرونة كاملة في التوظيف والتعهيد بحسب حاجة المنشأة',
  'قاعدة بيانات ضخمة من الكوادر السعودية الموثوقة',
  'تقارير أداء وحضور تفاعلية مفصلة ومباشرة',
  'امتثال تام بالتشريعات والمعايير السعودية 100%',
]

export default function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white via-slate-50/50 to-emerald-50/30 p-6 sm:p-10 lg:p-14 border border-slate-200/80 shadow-xs">
        
        {/* Subtle Ambient Background Gradients */}
        <div className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center space-y-6">
          
          {/* Saudi Royal Platform Tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-50/80 px-4 py-1.5 text-xs font-black text-emerald-900 shadow-2xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>المنصة السعودية الذكية للتوظيف والتأهيل المهني 🇸🇦</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.2]">
            وجهتك الشاملة نحو{' '}
            <span className="bg-gradient-to-l from-emerald-800 via-emerald-700 to-teal-700 bg-clip-text text-transparent">
              مستقبل وظيفي واعد
            </span>{' '}
            وكفاءات مهنية موثوقة
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            نربط الكفاءات الوطنية الطموحة بأفضل الفرص الوظيفية، ونمكن المنشآت من استقطاب وتعهيد الكوادر عبر تجربة رقمية ذكية.
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto pt-2">
            <form action="/jobs" method="GET" className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-lg shadow-slate-200/50">
              <div className="relative flex-1">
                <Search size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  type="search"
                  name="search"
                  placeholder="ابحث عن مسمى وظيفي، مهارة، أو مدينة..."
                  className="pr-10 bg-slate-50 border-none text-xs sm:text-sm h-11 rounded-xl focus-visible:ring-0"
                />
              </div>
              <Button type="submit" size="md" className="h-11 rounded-xl px-6 font-bold shadow-md shadow-emerald-700/20">
                ابحث عن فرصتك
              </Button>
            </form>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-bold text-slate-500">
              <span className="text-slate-400 ml-1">الفرص الأكثر طلباً:</span>
              <Link href="/jobs?search=مطور" className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors">مطور برمجيات</Link>
              <Link href="/jobs?search=تسويق" className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors">تسويق رقمي</Link>
              <Link href="/jobs?search=إدارة" className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors">إدارة مشاريع</Link>
              <Link href="/jobs?search=تعهيد" className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition-colors">عقود تعهيد</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <div className="grid gap-3.5 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <MetricCard number="+15,000" label="باحث عن عمل مسجل" icon={<Users size={20} className="text-emerald-700" />} />
        <MetricCard number="+1,200" label="منشأة معتمدة" icon={<Building2 size={20} className="text-amber-600" />} />
        <MetricCard number="+8,500" label="فرصة وظيفية منشورة" icon={<Briefcase size={20} className="text-emerald-700" />} />
        <MetricCard number="98.4%" label="نسبة الرضا والاعتمادية" icon={<Award size={20} className="text-amber-600" />} />
      </div>

      {/* Three Tracks - Prominent & Luxurious */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-black text-emerald-800 border border-emerald-200">
            <span>المسارات المعتمدة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            مسارات مهنية مصممة لاحتياجات السوق السعودي
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-semibold">
            اختر المسار المناسب لاهتماماتك للبدء فوراً في الاستفادة من حلول المنصة الذكية.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {trackOptions.map((track) => {
            const Icon = track.icon

            return (
              <div
                key={track.title}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-emerald-400/80 transition-all duration-300 overflow-hidden"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${track.tone} shadow-md`}>
                      <Icon size={24} />
                    </div>
                    <span className={`rounded-full px-3 py-1 text-[11px] font-black border shadow-2xs ${track.badgeClass}`}>
                      {track.badge}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                      {track.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                      {track.subtitle}
                    </p>
                  </div>

                  <ul className="space-y-2.5 pt-4 border-t border-slate-100">
                    {track.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-bold leading-normal">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100/70 text-emerald-700 shrink-0 border border-emerald-300/40">
                          <CheckCircle2 size={13} className="text-emerald-700" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <Link
                    href={track.href}
                    onClick={() => {
                      if (track.role) {
                        setDevAuthPreviewRole(track.role)
                      }
                    }}
                    className={`group/btn flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs sm:text-sm font-black transition-all cursor-pointer active:scale-[0.98] ${track.btnClass}`}
                  >
                    <span>{track.btnText}</span>
                    <ArrowLeft size={16} className="group-hover/btn:-translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* How it Works (4 Steps) */}
      <section className="space-y-6 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-9 shadow-xs">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-1 text-xs font-black text-amber-900 border border-amber-200">
            <span>خطوات الانضمام</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            كيف تعمل منصة نخلة؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-medium">
            رحلة سهلة وسريعة تبدأ من التسجيل وحتى التوظيف الفعلي والتأهيل.
          </p>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <div key={step.title} className="relative rounded-2xl border border-slate-100 bg-slate-50/80 p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-800 font-bold border border-emerald-100">
                    <Icon size={18} />
                  </div>
                  <span className="text-xl font-black text-slate-300">0{index + 1}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{step.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Why Companies Choose Nakhlah (Ultra-Luxury Emerald & Amber Sand Theme) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-[#0a3a30] to-emerald-950 p-6 sm:p-10 lg:p-12 text-white shadow-xl border border-emerald-700/50">
        <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
          
          <div className="space-y-5">
            <Badge tone="brand" className="bg-white/20 text-white border-white/30 font-bold">
              حلول قطاع الأعمال
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black leading-tight text-white">
              لماذا تختار المنشآت منصة نخلة للتوظيف والتعهيد؟
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-medium">
              نجمع لك بين سرعة الاختيار ودقة التقييم لتنفيذ عقود التوظيف وتوريد الكوادر بكل اطمئنان واعتمادية.
            </p>

            <div className="grid gap-2.5 sm:grid-cols-2">
              {companyReasons.map((reason) => (
                <div key={reason} className="flex items-center gap-2.5 rounded-xl bg-white/10 p-2.5 backdrop-blur-md border border-white/15">
                  <BadgeCheck size={16} className="text-amber-400 shrink-0" />
                  <span className="text-xs font-bold text-white">{reason}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <Link
                href="/register?role=company"
                onClick={() => setDevAuthPreviewRole('company')}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-2.5 text-xs sm:text-sm font-black text-slate-950 shadow-md hover:from-amber-500 hover:to-amber-600 transition-all active:scale-95"
              >
                سجل منشأتك الآن
              </Link>
              <Link
                href="/for-companies"
                className="inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/20 px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-white/20 transition-all active:scale-95"
              >
                استكشف حلول الأعمال
              </Link>
            </div>
          </div>

          <div className="grid gap-3 grid-cols-2">
            <HighlightCard title="دقة التوافق" value="96%" text="مطابقة المهارات بالمتطلبات" />
            <HighlightCard title="سرعة التزويد" value="48 ساعة" text="متوسط سرعة ترشيح الكفاءات" />
            <HighlightCard title="الالتزام بالأنظمة" value="100%" text="توافق مع التشريعات السعودية" />
            <HighlightCard title="رضا العملاء" value="4.9 / 5" text="تقييم المنشآت المتعاقدة" />
          </div>

        </div>
      </section>

      {/* Public CTA */}
      <PublicCTA
        title="جاهز لبدء رحلتك مع نخلة؟"
        description="انضم الآن لآلاف الباحثين عن عمل والشركات واستفد من أحدث الحلول الرقمية للتوظيف والتأهيل بالسعودية."
        actions={
          <>
            <Link
              href="/register?role=seeker"
              onClick={() => setDevAuthPreviewRole('seeker')}
              className="inline-flex items-center justify-center rounded-xl bg-emerald-800 px-6 py-3 text-sm font-black text-white shadow-md hover:bg-emerald-900 transition-all active:scale-95"
            >
              تسجيل باحث عن عمل
            </Link>
            <Link
              href="/register?role=company"
              onClick={() => setDevAuthPreviewRole('company')}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-800 hover:bg-amber-50/60 hover:border-amber-300 transition-all active:scale-95"
            >
              تسجيل منشأة / شركة
            </Link>
          </>
        }
      />

    </div>
  )
}

function MetricCard({ number, label, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs space-y-1.5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500">{label}</span>
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-50 border border-slate-100">
          {icon}
        </div>
      </div>
      <p className="text-2xl sm:text-3xl font-black text-slate-900">{number}</p>
    </div>
  )
}

function HighlightCard({ title, value, text }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md space-y-1">
      <p className="text-[10px] font-black text-amber-300 uppercase tracking-wider">{title}</p>
      <p className="text-xl sm:text-2xl font-black text-white">{value}</p>
      <p className="text-[10px] sm:text-[11px] text-emerald-100/80 font-medium">{text}</p>
    </div>
  )
}
