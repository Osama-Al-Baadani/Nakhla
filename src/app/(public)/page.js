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
    tone: 'from-teal-600 to-emerald-600 text-white shadow-teal-600/20',
    badge: 'الأفراد والكوادر',
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
    tone: 'from-emerald-600 to-teal-700 text-white shadow-emerald-600/20',
    badge: 'التشغيل والتعهيد',
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
    <div className="space-y-12 sm:space-y-16 animate-slide-up">
      
      {/* Live Ribbon Banner */}
      <div className="overflow-hidden rounded-2xl border border-amber-300/70 bg-gradient-to-r from-amber-500/10 via-amber-50 to-teal-50/60 p-3 sm:p-3.5 shadow-2xs">
        <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-amber-900">
          <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-amber-500 animate-ping shrink-0" />
          <span className="bg-gradient-to-r from-amber-600 to-amber-500 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md font-black shadow-xs">
            جديد المنصة
          </span>
          <p className="truncate font-semibold">
            منصة نخلة تجمع بين التوظيف المباشر، التأهيل المهني، وحلول التعهيد الكفاءات الرقمية.
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-teal-50/30 to-amber-50/20 p-6 sm:p-12 lg:p-16 shadow-xl overflow-hidden">
        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl text-center space-y-6 sm:space-y-8">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/90 px-4 py-1.5 text-xs font-extrabold text-teal-800 shadow-sm backdrop-blur-md">
            <Sparkles size={16} className="text-amber-500" />
            <span>منظومة توظيف سعودية متكاملة لـ رؤية 2030 🇸🇦</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
            مستقبل التوظيف والتأهيل وتعهيد الكوادر بين يديك
          </h1>

          <p className="mx-auto max-w-2xl text-xs sm:text-base leading-relaxed text-slate-600 font-medium">
            نربط الكفاءات الوطنية بالشركات عبر خوارزميات فرز ذكية، ونقدم برامج تأهيل احترافية وخدمات تشغيل وتعهيد مرنة بأعلى معايير الاعتمادية.
          </p>

          {/* Quick Search Card */}
          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-lg">
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
              <Button type="submit" size="md" className="h-11 rounded-xl px-6 font-bold shadow-md shadow-teal-600/20">
                ابحث عن فرصتك
              </Button>
            </form>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[11px] font-bold text-slate-500">
              <span className="text-slate-400">الفرص الأكثر طلباً:</span>
              <Link href="/jobs?search=مطور" className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors">مطور برمجيات</Link>
              <Link href="/jobs?search=تسويق" className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors">تسويق رقمي</Link>
              <Link href="/jobs?search=إدارة" className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors">إدارة مشاريع</Link>
              <Link href="/jobs?search=تعهيد" className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors">عقود تعهيد</Link>
            </div>
          </div>

          {/* Role Switcher Demo Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/seeker/dashboard"
              onClick={() => setDevAuthPreviewRole('seeker')}
              className="group flex items-center gap-2 rounded-2xl border border-teal-200 bg-white px-4 py-2.5 text-xs font-bold text-teal-800 shadow-sm hover:border-teal-400 hover:shadow-md transition-all active:scale-95"
            >
              <UserCheck size={16} className="text-teal-600 group-hover:scale-110 transition-transform" />
              <span>معاينة لوحة الباحث</span>
              <ArrowLeft size={14} className="text-teal-500 group-hover:-translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/company/dashboard"
              onClick={() => setDevAuthPreviewRole('company')}
              className="group flex items-center gap-2 rounded-2xl border border-amber-200 bg-white px-4 py-2.5 text-xs font-bold text-amber-900 shadow-sm hover:border-amber-400 hover:shadow-md transition-all active:scale-95"
            >
              <Building2 size={16} className="text-amber-600 group-hover:scale-110 transition-transform" />
              <span>معاينة لوحة الشركة</span>
              <ArrowLeft size={14} className="text-amber-500 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* Metrics Section */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard number="+15,000" label="باحث عن عمل مسجل" icon={<Users size={22} className="text-teal-600" />} />
        <MetricCard number="+1,200" label="منشأة معتمدة" icon={<Building2 size={22} className="text-amber-600" />} />
        <MetricCard number="+8,500" label="فرصة وظيفية منشورة" icon={<Briefcase size={22} className="text-teal-600" />} />
        <MetricCard number="98.4%" label="نسبة الرضا والاعتمادية" icon={<Award size={22} className="text-amber-600" />} />
      </div>

      {/* Three Tracks */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <Badge tone="brand">المسارات المعتمدة</Badge>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
            مسارات مهنية مصممة لاحتياجات السوق السعودي
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            اختر المسار المناسب لاهتماماتك للبدء فوراً في الاستفادة من حلول المنصة.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {trackOptions.map((track) => {
            const Icon = track.icon

            return (
              <div
                key={track.title}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${track.tone} shadow-md`}>
                      <Icon size={24} />
                    </div>
                    <Badge tone="brand">{track.badge}</Badge>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {track.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 leading-relaxed font-medium">{track.subtitle}</p>
                  </div>

                  <ul className="space-y-2.5 pt-3 border-t border-slate-100">
                    {track.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                        <CheckCircle2 size={16} className="text-teal-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link href="/register" className="w-full inline-block">
                    <Button variant="secondary" className="w-full justify-between rounded-xl group-hover:border-teal-300 font-bold">
                      <span>البدء في هذا المسار</span>
                      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* How it Works (4 Steps) */}
      <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
        <div className="text-center space-y-2">
          <Badge tone="warning">خطوات الانضمام</Badge>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
            كيف تعمل منصة نخلة؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            رحلة سهلة وسريعة تبدأ من التسجيل وحتى التوظيف الفعلي والتأهيل.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <div key={step.title} className="relative rounded-2xl border border-slate-100 bg-slate-50/80 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-teal-50 text-teal-700 font-bold border border-teal-100">
                    <Icon size={20} />
                  </div>
                  <span className="font-serif text-2xl font-black text-slate-300">0{index + 1}</span>
                </div>
                <h3 className="font-serif text-base font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{step.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Why Companies Choose Nakhlah (Ultra-Luxury Emerald & Amber Sand Theme - Zero Black) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-800 via-teal-700 to-amber-700 p-6 sm:p-10 lg:p-12 text-white shadow-xl border border-teal-600/50">
        <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
          
          <div className="space-y-5">
            <Badge tone="brand" className="bg-white/20 text-white border-white/30 font-bold">
              حلول قطاع الأعمال
            </Badge>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
              لماذا تختار المنشآت منصة نخلة للتوظيف والتعهيد؟
            </h2>
            <p className="text-xs sm:text-sm text-teal-50 leading-relaxed font-medium">
              نجمع لك بين سرعة الاختيار ودقة التقييم لتنفيذ عقود التوظيف وتوريد الكوادر بكل اطمئنان واعتمادية.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {companyReasons.map((reason) => (
                <div key={reason} className="flex items-center gap-3 rounded-xl bg-white/15 p-3 backdrop-blur-md border border-white/20">
                  <BadgeCheck size={18} className="text-amber-300 shrink-0" />
                  <span className="text-xs font-bold text-white">{reason}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link href="/register?role=company">
                <Button className="bg-white text-slate-900 hover:bg-slate-100 font-extrabold shadow-md rounded-xl">
                  سجل منشأتك الآن
                </Button>
              </Link>
              <Link href="/for-companies">
                <Button variant="secondary" className="bg-white/15 border-white/30 text-white hover:bg-white/25 font-bold rounded-xl">
                  استكشف حلول الأعمال
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <HighlightCard title="دقة التوافق" value="96%" text="مطابقة المهارات بالمتطلبات الوظيفية" />
            <HighlightCard title="سرعة التزويد" value="48 ساعة" text="متوسط سرعة ترشيح الكفاءات" />
            <HighlightCard title="الالتزام بالأنظمة" value="100%" text="توافق تام مع التشريعات السعودية" />
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
            <Link href="/register?role=seeker">
              <Button size="lg" className="font-extrabold rounded-xl shadow-md">تسجيل باحث عن عمل</Button>
            </Link>
            <Link href="/register?role=company">
              <Button size="lg" variant="secondary" className="font-extrabold rounded-xl">تسجيل منشأة / شركة</Button>
            </Link>
          </>
        }
      />

    </div>
  )
}

function MetricCard({ number, label, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-2 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500">{label}</span>
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50 border border-slate-100">
          {icon}
        </div>
      </div>
      <p className="font-serif text-3xl font-extrabold text-slate-900">{number}</p>
    </div>
  )
}

function HighlightCard({ title, value, text }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur-md space-y-1">
      <p className="text-[10px] font-extrabold text-amber-200 uppercase tracking-wider">{title}</p>
      <p className="font-serif text-2xl font-black text-white">{value}</p>
      <p className="text-[11px] text-slate-100 font-medium">{text}</p>
    </div>
  )
}
