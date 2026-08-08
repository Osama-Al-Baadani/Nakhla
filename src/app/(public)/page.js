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
    subtitle: 'ابنِ سيرتك الذاتية، قدم على أحدث الوظائف، والتحق ببرامج التأهيل',
    icon: UserCheck,
    tone: 'from-emerald-700 to-teal-600 text-white shadow-emerald-700/20',
    badge: 'الأفراد والكوادر',
    href: '/register?role=seeker',
    role: 'seeker',
    btnText: 'البدء في مسار الباحثين',
    items: [
      'تقديم فوري وبسيط بضغط زر واحدة',
      'خوارزميات توصية ذكية تناسب مهاراتك',
      'مسارات تدريبية وتأهيلية معتمدة',
      'إشعارات وتنبيهات فورية للمقابلات',
    ],
  },
  {
    title: 'مسار قطاع الأعمال والشركات',
    subtitle: 'استقطب أفضل المهارات الوطنية، أدر وظائفك، واستفد من التعهيد',
    icon: Building2,
    tone: 'from-amber-500 to-amber-600 text-white shadow-amber-500/20',
    badge: 'الشركات والمنشآت',
    href: '/register?role=company',
    role: 'company',
    btnText: 'البدء في مسار الشركات',
    items: [
      'نشر وإدارة الوظائف بمرونة كاملة',
      'فرز ذكي وتقييم دقيق للمتقدمين',
      'حلول تعهيد وتزود بالكوادر بسرعة',
      'متابعة أداء وحضور الكفاءات مباشرة',
    ],
  },
  {
    title: 'حلول التشغيل والتعهيد',
    subtitle: 'تشغيل الفرق وتوفير الكفاءات الموثوقة بأسلوب مرن ومستدام',
    icon: Layers3,
    tone: 'from-teal-700 to-emerald-800 text-white shadow-teal-700/20',
    badge: 'التشغيل والتعهيد',
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
  { title: 'ابدأ التعاقد', description: 'مقابلات مباشرة، توقيع إلكتروني، وبداية عمل موثقة.', icon: BadgeCheck },
]

const companyReasons = [
  'مرونة كاملة في التوظيف والتعهيد بحسب حاجة المنشأة',
  'قاعدة بيانات ضخمة من الكوادر السعودية الموثوقة',
  'تقارير أداء وحضور تفاعلية مفصلة ومباشرة',
  'امتثال تام بالتشريعات والمعايير السعودية 100%',
]

export default function HomePage() {
  return (
    <div className="space-y-10 sm:space-y-16 animate-slide-up">
      
      {/* Hero Section */}
      <section className="relative rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-emerald-50/30 to-amber-50/20 p-6 sm:p-10 lg:p-14 shadow-lg overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl text-center space-y-5 sm:space-y-7">
          
          {/* Main Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-snug sm:leading-tight tracking-tight">
            مستقبل التوظيف والتأهيل وتعهيد الكوادر بين يديك
          </h1>

          {/* Subtext */}
          <p className="mx-auto max-w-2xl text-xs sm:text-base leading-relaxed text-slate-600 font-medium">
            نربط الكفاءات الوطنية بالشركات عبر خوارزميات فرز ذكية، ونقدم برامج تأهيل احترافية وخدمات تشغيل وتعهيد مرنة بأعلى معايير الاعتمادية.
          </p>

          {/* Quick Search Card */}
          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-md">
            <form action="/jobs" method="GET" className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  type="search"
                  name="search"
                  placeholder="ابحث عن مسمى وظيفي، مهارة، أو مدينة..."
                  className="pr-10 bg-slate-50 border-slate-200 text-xs sm:text-sm h-11 rounded-xl"
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

          {/* Role Register Action Cards - Beautiful & Balanced */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto pt-2">
            <Link
              href="/register?role=seeker"
              onClick={() => setDevAuthPreviewRole('seeker')}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50/50 to-white p-3.5 sm:p-4 text-xs font-black text-emerald-950 shadow-2xs hover:border-emerald-400 hover:shadow-md transition-all active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100/80 text-emerald-800 group-hover:scale-105 transition-transform shrink-0">
                  <UserCheck size={18} />
                </div>
                <div className="text-right">
                  <span className="block font-black text-xs sm:text-sm text-slate-900">تسجيل كباحث عن عمل</span>
                  <span className="block text-[10px] text-emerald-700 font-bold mt-0.5">فرص وظيفية وتدريب</span>
                </div>
              </div>
              <ArrowLeft size={16} className="text-emerald-700 group-hover:-translate-x-1 transition-transform shrink-0" />
            </Link>

            <Link
              href="/register?role=company"
              onClick={() => setDevAuthPreviewRole('company')}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50/50 to-white p-3.5 sm:p-4 text-xs font-black text-amber-950 shadow-2xs hover:border-amber-400 hover:shadow-md transition-all active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100/80 text-amber-800 group-hover:scale-105 transition-transform shrink-0">
                  <Building2 size={18} />
                </div>
                <div className="text-right">
                  <span className="block font-black text-xs sm:text-sm text-slate-900">تسجيل كمنشأة / شركة</span>
                  <span className="block text-[10px] text-amber-700 font-bold mt-0.5">استقطاب وتعهيد الكفاءات</span>
                </div>
              </div>
              <ArrowLeft size={16} className="text-amber-700 group-hover:-translate-x-1 transition-transform shrink-0" />
            </Link>
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

      {/* Three Tracks */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <Badge tone="brand">المسارات المعتمدة</Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            مسارات مهنية مصممة لاحتياجات السوق السعودي
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-medium">
            اختر المسار المناسب لاهتماماتك للبدء فوراً في الاستفادة من حلول المنصة.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {trackOptions.map((track) => {
            const Icon = track.icon

            return (
              <div
                key={track.title}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${track.tone} shadow-md`}>
                      <Icon size={22} />
                    </div>
                    <Badge tone="brand">{track.badge}</Badge>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {track.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 leading-relaxed font-medium">{track.subtitle}</p>
                  </div>

                  <ul className="space-y-2 pt-3 border-t border-slate-100">
                    {track.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <Link
                    href={track.href}
                    onClick={() => {
                      if (track.role) {
                        setDevAuthPreviewRole(track.role)
                      }
                    }}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-200/90 bg-slate-50/80 px-4 py-2.5 text-xs font-black text-slate-800 shadow-2xs hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-900 active:scale-[0.98] transition-all cursor-pointer group-hover:border-emerald-300 group-hover:bg-emerald-50/60 group-hover:text-emerald-900"
                  >
                    <span>{track.btnText}</span>
                    <ArrowLeft size={15} className="group-hover:-translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* How it Works (4 Steps) */}
      <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xs">
        <div className="text-center space-y-2">
          <Badge tone="warning">خطوات الانضمام</Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
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
