'use client'

import {
  Award,
  BookOpenCheck,
  CheckCircle2,
  FileText,
  Map,
  ShieldCheck,
  Sparkles,
  Video,
} from 'lucide-react'
import { Badge } from '../../../../components/Badge'
import { Card } from '../../../../components/Card'
import { EmptyState } from '../../../../components/EmptyState'
import { PageHeader } from '../../../../components/PageHeader'
import { cn } from '../../../../lib/cn'
import { trainingOverview, trainingStages } from '../../../../lib/training-demo'

const dateStages = [
  {
    id: 'stage-1',
    label: 'الأسبوع الأول',
    title: 'مؤهل',
    subtitle: 'بداية المسار',
    color: 'from-[#8fcf4c] via-[#b7df61] to-[#d8ef8d]',
    border: 'border-[#b7da7a]',
    progressThreshold: 0,
  },
  {
    id: 'stage-2',
    label: 'الأسبوع الثاني',
    title: 'جيّد',
    subtitle: 'أساس أقوى',
    color: 'from-[#d7de45] via-[#f0de4a] to-[#f7b95c]',
    border: 'border-[#e7cd68]',
    progressThreshold: 20,
  },
  {
    id: 'stage-3',
    label: 'الأسبوع الثالث',
    title: 'متوسط',
    subtitle: 'تطبيق واستمرار',
    color: 'from-[#f0a43c] via-[#f48c2f] to-[#f36f26]',
    border: 'border-[#f1aa59]',
    progressThreshold: 40,
  },
  {
    id: 'stage-4',
    label: 'الأسبوع الرابع',
    title: 'متقدم',
    subtitle: 'جاهزية أوضح',
    color: 'from-[#dc6937] via-[#d95331] to-[#b63a22]',
    border: 'border-[#d67b56]',
    progressThreshold: 60,
  },
  {
    id: 'stage-5',
    label: 'الأسبوع الخامس',
    title: 'احترافي',
    subtitle: 'تمرة ناضجة',
    color: 'from-[#7d2415] via-[#942918] to-[#4d120a]',
    border: 'border-[#8f4332]',
    progressThreshold: 80,
  },
]

const contentSections = [
  {
    id: 'videos',
    title: 'مكتبة الفيديوهات',
    description: 'مكان مخصص للدروس المصورة والعناوين ومدة كل فيديو وحالة المشاهدة.',
    icon: Video,
    tone: 'brand',
    items: ['عنوان الدرس', 'مدة المشاهدة', 'اسم المدرب أو الجهة', 'حالة الإنجاز'],
  },
  {
    id: 'files',
    title: 'الملفات ومواد PDF',
    description: 'قسم واضح للملفات المساندة والأدلة وأوراق العمل والمواد التعليمية.',
    icon: FileText,
    tone: 'warning',
    items: ['اسم الملف', 'نوع المحتوى', 'عدد الصفحات أو الحجم', 'زر العرض أو التحميل'],
  },
  {
    id: 'quizzes',
    title: 'الاختبارات',
    description: 'واجهة جاهزة لعرض الاختبارات ومدتها وعدد المحاولات والنتيجة.',
    icon: BookOpenCheck,
    tone: 'neutral',
    items: ['اسم الاختبار', 'عدد الأسئلة', 'الوقت المحدد', 'النتيجة وحالة الاجتياز'],
  },
]

const implementationSteps = [
  {
    id: 'step-1',
    title: 'التهيئة والانطلاق',
    description: 'تعريف المتدرب بالمسار والتعليمات الأساسية وأهداف المرحلة الأولى.',
    state: 'جاهز للإضافة',
  },
  {
    id: 'step-2',
    title: 'المهارات والتطبيق',
    description: 'إضافة الفيديوهات والملفات والأنشطة العملية لكل مهارة مطلوبة.',
    state: 'بانتظار الربط',
  },
  {
    id: 'step-3',
    title: 'الاختبارات والتقييم',
    description: 'عرض الاختبارات والنتائج وحدود النجاح لكل مستوى تدريبي.',
    state: 'بانتظار الربط',
  },
  {
    id: 'step-4',
    title: 'التخرج والشهادة',
    description: 'إظهار حالة الإكمال وإتاحة الشهادة عند استيفاء متطلبات البرنامج.',
    state: 'واجهة جاهزة',
  },
]

export default function SeekerTrainingPage() {
  const activeDateStageIndex = dateStages.reduce((current, stage, index) => {
    if (trainingOverview.overallProgress >= stage.progressThreshold) {
      return index
    }
    return current
  }, 0)

  return (
    <section className="space-y-5">
      <Card className="overflow-hidden bg-[linear-gradient(135deg,_rgba(255,255,255,0.97),_rgba(237,247,246,0.98)_48%,_rgba(255,247,232,0.96)_100%)]">
        <PageHeader
          eyebrow="نظام التدريب"
          title="رحلة تدريبية تنضج مع المتدرب مرحلة بعد مرحلة"
          description="تم تصميم صفحة التدريب بحيث يشعر المتدرب بأنه ينتقل من مستوى إلى آخر بوضوح. كلما تقدم في التعلم والاختبارات والإنجاز، تظهر له التمرة بشكل أنضج حتى يصل إلى المستوى الاحترافي."
          actions={
            <div className="flex flex-wrap gap-2">
              <Badge tone="brand">رحلة نخلة</Badge>
              <Badge tone="warning">خريطة نضج التمرة</Badge>
            </div>
          }
        />

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[28px] border border-white/70 bg-white/88 p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-[var(--text-soft)]">فكرة التجربة</p>
                <h2 className="mt-2 font-serif text-4xl text-[var(--text)]">التمرة تنضج معك</h2>
                <p className="mt-3 max-w-2xl text-sm leading-8 text-[var(--text-soft)]">
                  لأن اسم المنصة نخلة، جعلنا التقدم التدريبي مرتبطًا بمراحل نضج التمرة. يبدأ المتدرب من مستوى
                  أولي، ثم يتقدم أسبوعًا بعد أسبوع، حتى يصل في النهاية إلى تمرة ناضجة تمثل الجاهزية المهنية
                  والاحتراف.
                </p>
              </div>
              <div className="grid h-16 w-16 place-items-center rounded-[24px] bg-[var(--brand-soft)] text-[var(--brand)]">
                <Sparkles size={28} aria-hidden="true" />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <SummaryBox label="إجمالي التقدم" value={`${trainingOverview.overallProgress}%`} />
              <SummaryBox label="الأصول المكتملة" value={String(trainingOverview.completedAssets)} />
              <SummaryBox label="الاختبارات" value={String(trainingOverview.completedQuizzes)} />
            </div>
          </div>

          <div className="rounded-[28px] border border-[#eadcc8] bg-[linear-gradient(180deg,_#1b665a_0%,_#114a42_100%)] p-5 text-white shadow-[0_22px_60px_rgba(15,118,110,0.22)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-white/70">حالة المتدرب الحالية</p>
                <h3 className="mt-2 text-2xl font-semibold">
                  {dateStages[activeDateStageIndex].title} - {dateStages[activeDateStageIndex].subtitle}
                </h3>
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-[22px] bg-white/12">
                <ShieldCheck size={24} aria-hidden="true" />
              </div>
            </div>

            <p className="mt-4 text-sm leading-8 text-white/78">
              هذه البطاقة تلخص موقع المتدرب الحالي داخل رحلة النضج. عند ربط الباك اند لاحقًا، يمكن تحديث المستوى
              الحالي ونسبة الإنجاز مباشرة وربطها بالمحتوى والاختبارات والشهادة.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <StatusChip label={`المستوى الحالي: ${dateStages[activeDateStageIndex].title}`} />
              <StatusChip label={`الشهادة: ${trainingOverview.certificateStatus}`} />
              <StatusChip label={`المتبقي: ${trainingOverview.remainingAssets} عناصر`} />
              <StatusChip label="الرحلة مرتبطة بالنخلة" />
            </div>
          </div>
        </div>
      </Card>

      <Card
        title="خريطة نضج التمرة"
        description="كل أسبوع يمثل مرحلة جديدة من نضج المتدرب. كلما ارتفع مستواك، نضجت التمرة أكثر حتى تصل إلى التمرة الاحترافية في الأسبوع الخامس."
      >
        <div className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.94))] px-4 py-8 sm:px-6">
          <div className="relative space-y-6">
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded-[28px] border border-[#eadfce] bg-[linear-gradient(180deg,_#fffaf2_0%,_#fffefb_100%)] p-5">
                <p className="text-sm text-[var(--text-soft)]">تمثيل بصري للجاهزية</p>
                <h3 className="mt-2 text-2xl font-semibold text-[var(--text)]">رحلتك الآن</h3>

                <div className="mt-6 flex items-center justify-center">
                  <DateFruit
                    className="h-44 w-28"
                    stage={dateStages[activeDateStageIndex]}
                    isActive
                  />
                </div>

                <div className="mt-5 rounded-[20px] border border-[#efe5d6] bg-white p-4 text-center">
                  <p className="text-sm text-[var(--text-soft)]">الحالة الحالية</p>
                  <p className="mt-2 text-xl font-semibold text-[var(--text)]">
                    {dateStages[activeDateStageIndex].title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
                    {dateStages[activeDateStageIndex].subtitle} - تقدمك الحالي {trainingOverview.overallProgress}%
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                {dateStages.map((stage, index) => {
                  const isActive = index === activeDateStageIndex
                  const isCompleted = index < activeDateStageIndex

                  return (
                    <div
                      key={stage.id}
                      className={cn(
                        'rounded-[26px] border bg-white/92 p-4 text-center shadow-sm transition',
                        stage.border,
                        isActive && 'ring-2 ring-[#0f766e]/18',
                      )}
                    >
                      <p className="text-xs font-semibold text-[var(--text-faint)]">{stage.label}</p>
                      <div className="mt-4 flex justify-center">
                        <DateFruit className="h-28 w-18" stage={stage} isActive={isActive} />
                      </div>
                      <h4 className="mt-4 text-lg font-semibold text-[var(--text)]">{stage.title}</h4>
                      <p className="mt-2 text-xs leading-6 text-[var(--text-soft)]">{stage.subtitle}</p>
                      <div className="mt-4">
                        <Badge tone={isActive ? 'brand' : isCompleted ? 'warning' : 'neutral'}>
                          {isActive ? 'مرحلتك الحالية' : isCompleted ? 'تم تجاوزها' : 'قادمة'}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-[26px] border border-[var(--line)] bg-white/92 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-[var(--text-soft)]">من مؤهل إلى احترافي</p>
                  <h3 className="mt-2 text-xl font-semibold text-[var(--text)]">
                    الغاية من نخلة هي نقل المتدرب من المستوى المبدئي إلى مستوى التوظيف الجاهز
                  </h3>
                </div>
                <Badge tone="brand">5 أسابيع</Badge>
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-[var(--surface-muted)]">
                <div
                  className="h-3 rounded-full bg-[linear-gradient(90deg,_#8fcf4c_0%,_#f0c94b_25%,_#f2862d_50%,_#c74828_75%,_#6a1a10_100%)]"
                  style={{ width: `${trainingOverview.overallProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card
        title="مراحل التدريب الحالية"
        description="هذه المراحل تعرض تقدم المتدرب أسبوعًا بعد أسبوع، ويمكن لاحقًا ربطها مباشرة بالبيانات الحقيقية من النظام."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {trainingStages.map((stage, index) => {
            const currentDateStage = dateStages[Math.min(index, dateStages.length - 1)]

            return (
              <div
                key={stage.id}
                className={cn('relative', index % 2 === 1 ? 'lg:mt-12' : 'lg:mb-12')}
              >
                <div className="rounded-[26px] border border-[var(--line)] bg-white/92 p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-[var(--text-faint)]">{stage.level}</p>
                      <h3 className="mt-2 text-lg font-semibold text-[var(--text)]">{stage.title}</h3>
                    </div>
                    <Badge tone="neutral">{stage.progress}%</Badge>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <DateFruit className="h-24 w-16" stage={currentDateStage} />
                  </div>

                  <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">{stage.description}</p>

                  <div className="mt-4 h-2 rounded-full bg-[var(--surface-muted)]">
                    <div
                      className="h-2 rounded-full bg-[linear-gradient(90deg,_#0f766e,_#d4a14d)]"
                      style={{ width: `${stage.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <Card title="مناطق المحتوى" description="كل قسم أدناه مصمم ليكون واضحًا للمتدرب وسهل الربط للمطور لاحقًا.">
          <div className="grid gap-4">
            {contentSections.map((section) => {
              const Icon = section.icon

              return (
                <div
                  key={section.id}
                  className="rounded-[24px] border border-[var(--line)] bg-[var(--surface-muted)] p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-[18px] bg-white text-[var(--brand)] shadow-sm">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--text)]">{section.title}</h3>
                        <p className="mt-1 text-sm text-[var(--text-soft)]">{section.description}</p>
                      </div>
                    </div>
                    <Badge tone={section.tone}>جاهز للربط</Badge>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {section.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-[18px] border border-white bg-white p-3"
                      >
                        <CheckCircle2 size={16} aria-hidden="true" className="text-[var(--brand)]" />
                        <span className="text-sm text-[var(--text-soft)]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <div className="space-y-5">
          <Card title="مسار التنفيذ" description="هذا الجزء يوضح كيف سيستخدم الفريق هذه الصفحة بعد اكتمال الربط الخلفي.">
            <div className="space-y-3">
              {implementationSteps.map((step, index) => (
                <div key={step.id} className="rounded-[20px] bg-[var(--surface-muted)] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-[var(--text)]">
                        {index + 1}. {step.title}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
                        {step.description}
                      </p>
                    </div>
                    <Badge tone="neutral">{step.state}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card
            title="منطقة الشهادة"
            description="مكان جاهز لعرض حالة الاستحقاق وإظهار الشهادة بعد إكمال المسار."
          >
            <div className="rounded-[24px] border border-dashed border-[#d7b16d] bg-[linear-gradient(180deg,_#fffaf0_0%,_#fff3da_100%)] p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text)]">شهادة إتمام البرنامج التدريبي</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
                    عند اكتمال البيانات الخلفية وربط الاختبارات ونسب الإنجاز، سيظهر هنا وضع الشهادة النهائية مع زر
                    العرض أو التنزيل.
                  </p>
                </div>
                <Award size={24} aria-hidden="true" className="text-[var(--warn)]" />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Badge tone="warning">بانتظار المحتوى</Badge>
                <Badge tone="neutral">بانتظار الربط الخلفي</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card
        title="في حال لم تتم إضافة المحتوى بعد"
        description="هذه الحالة الافتراضية تعرض للمتدرب أن المنصة جاهزة، لكن المواد التدريبية ستظهر فور إضافتها وربطها."
      >
        <EmptyState
          title="سيظهر محتوى التدريب هنا قريبًا"
          description="تم تجهيز أماكن الفيديوهات والملفات والاختبارات وخريطة التقدم وخريطة نضج التمرة بشكل كامل. يمكن لفريق الباك اند إضافة المحتوى وربطه لاحقًا دون الحاجة إلى إعادة تصميم الصفحة."
        />
      </Card>

      <Card
        title="ما يحتاجه مطور الباك اند لاحقًا"
        description="قائمة مختصرة تساعد على ربط الصفحة دون أي إعادة بناء للواجهة."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            'ربط قائمة الفيديوهات بكل مرحلة تدريبية',
            'ربط ملفات PDF أو المواد المرفقة',
            'ربط الاختبارات والنتائج وعدد المحاولات',
            'ربط نسب الإنجاز في خريطة التمرة والخريطة التدريبية',
            'ربط حالة الشهادة والاستحقاق',
            'ربط ترتيب المستوى الحالي من مؤهل حتى احترافي',
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-[18px] border border-[var(--line)] bg-white p-4">
              <Map size={16} aria-hidden="true" className="text-[var(--brand)]" />
              <span className="text-sm text-[var(--text-soft)]">{item}</span>
            </div>
          ))}
        </div>
      </Card>
    </section>
  )
}

function SummaryBox({ label, value }) {
  return (
    <div className="rounded-[20px] bg-[var(--surface-muted)] p-4">
      <p className="text-xs font-semibold text-[var(--text-faint)]">{label}</p>
      <p className="mt-3 font-serif text-3xl text-[var(--text)]">{value}</p>
    </div>
  )
}

function StatusChip({ label }) {
  return (
    <div className="rounded-[18px] border border-white/14 bg-white/10 px-4 py-3 text-sm text-white/86">
      {label}
    </div>
  )
}

function DateFruit({ stage, className, isActive = false }) {
  return (
    <div
      className={cn(
        'relative rounded-[999px] border shadow-[inset_-8px_-12px_20px_rgba(0,0,0,0.18),inset_10px_12px_16px_rgba(255,255,255,0.28),0_14px_28px_rgba(45,29,14,0.16)]',
        'bg-gradient-to-br',
        stage.color,
        stage.border,
        isActive ? 'scale-[1.04]' : '',
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute left-[16%] top-[12%] h-[24%] w-[32%] rounded-full bg-white/24 blur-[6px]" />
      <div className="absolute bottom-[8%] right-[12%] h-[22%] w-[28%] rounded-full bg-black/10 blur-[8px]" />
      <div className="absolute right-[10%] top-[8%] h-[14%] w-[12%] rounded-full bg-[#6b3418]/65" />
      <div className="absolute right-[2%] top-[11%] h-[9%] w-[8%] rotate-25 rounded-full bg-[#8a4a22]/70" />
    </div>
  )
}
