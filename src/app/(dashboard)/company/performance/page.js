'use client'

import { BarChart3, CheckCircle2, Gauge, ShieldCheck, Sparkles, Star, TimerReset } from 'lucide-react'
import { Badge } from '../../../../components/Badge'
import { Card } from '../../../../components/Card'
import { EmptyState } from '../../../../components/EmptyState'
import { PageHeader } from '../../../../components/PageHeader'

const kpiCards = [
  {
    title: 'عدد المهام',
    value: 'واجهة جاهزة',
    description: 'مكان مخصص لعرض عدد المهام المسندة أو المكتملة لكل موظف أو فريق أو فترة.',
    icon: CheckCircle2,
  },
  {
    title: 'سرعة الإنجاز',
    value: 'بانتظار البيانات',
    description: 'واجهة واضحة لقياس متوسط وقت الإنجاز ومقارنته بالمستهدف التشغيلي.',
    icon: TimerReset,
  },
  {
    title: 'الجودة',
    value: 'بانتظار البيانات',
    description: 'مكان لعرض تقييم الجودة أو نسبة الأخطاء أو الالتزام بمعايير التسليم.',
    icon: Sparkles,
  },
  {
    title: 'نسبة الالتزام',
    value: 'بانتظار البيانات',
    description: 'قسم لقياس الالتزام بالحضور أو التعليمات أو الجداول التشغيلية.',
    icon: ShieldCheck,
  },
  {
    title: 'تقييم المدير',
    value: 'جاهز للربط',
    description: 'مساحة لإظهار تقييم المدير المباشر أو المشرف على الأداء.',
    icon: Star,
  },
  {
    title: 'تقييم العميل',
    value: 'جاهز للربط',
    description: 'مكان مناسب لعرض تقييم العميل أو الجهة المستفيدة عند توفره.',
    icon: Gauge,
  },
]

const kpiPanels = [
  {
    title: 'لوحة مؤشرات الأداء',
    description: 'تجمع المؤشرات الرئيسية في مكان واحد لعرض الأداء العام على مستوى الفرق أو الأفراد.',
  },
  {
    title: 'مقارنة الفترات',
    description: 'واجهة جاهزة لمقارنة الأداء بين أسبوعي أو شهري أو ربعي بحسب ما يعتمد لاحقًا.',
  },
  {
    title: 'قراءة تنفيذية',
    description: 'مكان مناسب لعرض قراءة مختصرة عن الأداء مع التنبيهات والملاحظات المهمة.',
  },
]

export default function CompanyPerformancePage() {
  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.96),_rgba(238,247,246,0.92))]">
        <PageHeader
          eyebrow="نظام الأداء"
          title="مؤشرات KPI ومتابعة الأداء"
          description="هذه الصفحة مخصصة لقياس ومتابعة الأداء التشغيلي للشركة، وتشمل عدد المهام، سرعة الإنجاز، الجودة، نسبة الالتزام، تقييم المدير، وتقييم العميل."
          actions={
            <div className="flex flex-wrap gap-2">
              <Badge tone="brand">KPI</Badge>
              <Badge tone="warning">بانتظار الربط الخلفي</Badge>
            </div>
          }
        />
      </Card>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {kpiCards.map((item) => {
          const Icon = item.icon

          return (
            <Card key={item.title}>
              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-2xl bg-[var(--brand-soft)] text-[var(--brand)]">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-[var(--text)]">{item.title}</h2>
                  <p className="mt-1 text-sm text-[var(--text-soft)]">{item.value}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">{item.description}</p>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <Card title="مكونات نظام KPI" description="الأقسام الرئيسية التي ستظهر فيها البيانات والتحليلات بعد اكتمال التكامل.">
          <div className="grid gap-4 sm:grid-cols-2">
            {kpiPanels.map((panel) => (
              <div key={panel.title} className="rounded-[22px] border border-[var(--line)] bg-[var(--surface-muted)] p-4">
                <div className="flex items-center gap-2">
                  <BarChart3 size={18} aria-hidden="true" className="text-[var(--brand)]" />
                  <h3 className="text-base font-medium text-[var(--text)]">{panel.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">{panel.description}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="حالة الربط الحالية" description="تم تجهيز الواجهة بالكامل من جهة الفرونت اند، ويبقى ربط مصدر البيانات والصلاحيات من فريق الباك اند.">
          <div className="space-y-3">
            <KpiStatusRow label="عدد المهام" />
            <KpiStatusRow label="سرعة الإنجاز" />
            <KpiStatusRow label="الجودة" />
            <KpiStatusRow label="نسبة الالتزام" />
            <KpiStatusRow label="تقييم المدير" />
            <KpiStatusRow label="تقييم العميل" />
          </div>
        </Card>
      </div>

      <Card title="حالة الصفحة" description="الصفحة جاهزة للعرض الآن، ويمكن توصيل المؤشرات الحقيقية بها لاحقًا دون إعادة التصميم.">
        <EmptyState
          title="مؤشرات الأداء ستظهر هنا"
          description="بعد ربط خدمات الأداء أو المهام أو التقييمات من الباك اند، ستظهر القيم الفعلية في هذه البطاقات واللوحات مباشرة."
        />
      </Card>
    </section>
  )
}

function KpiStatusRow({ label }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[20px] border border-[var(--line)] bg-[var(--surface-muted)] p-4">
      <span className="text-sm font-medium text-[var(--text)]">{label}</span>
      <Badge tone="warning">بانتظار الربط</Badge>
    </div>
  )
}
