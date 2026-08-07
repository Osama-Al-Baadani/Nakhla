'use client'

import { BadgeCheck, CreditCard, Receipt, ShieldCheck, Sparkles, WalletCards } from 'lucide-react'
import { Badge } from '../../../../../components/Badge'
import { Button } from '../../../../../components/Button'
import { Card } from '../../../../../components/Card'
import { EmptyState } from '../../../../../components/EmptyState'
import { PageHeader } from '../../../../../components/PageHeader'

const planHighlights = [
  'إدارة نشر الوظائف والتوظيف للشركة',
  'الوصول إلى لوحة المرشحين والتقارير',
  'التوسع لاحقًا إلى المدفوعات والفواتير الإلكترونية',
]

const subscriptionCards = [
  {
    title: 'الخطة الحالية',
    description: 'مكان مخصص لعرض اسم الاشتراك الحالي، مستوى التفعيل، وتاريخ البداية أو التجديد.',
    icon: BadgeCheck,
  },
  {
    title: 'ترقية أو تغيير الخطة',
    description: 'واجهة جاهزة لعرض خيارات الترقية أو تعديل الباقة عند اكتمال الربط الخلفي.',
    icon: Sparkles,
  },
  {
    title: 'الفوترة المرتبطة بالاشتراك',
    description: 'ربط مباشر بين الاشتراك والفواتير المجدولة أو المدفوعة أو المتأخرة.',
    icon: Receipt,
  },
  {
    title: 'طريقة الدفع الافتراضية',
    description: 'مكان مخصص لحفظ وسيلة الدفع الإلكترونية الأساسية الخاصة بالشركة.',
    icon: CreditCard,
  },
]

export default function CompanySubscriptionsManagementPage() {
  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.96),_rgba(238,247,246,0.92))]">
        <PageHeader
          eyebrow="اشتراكات الشركات"
          title="إدارة الاشتراك والخطة"
          description="واجهة مخصصة للشركة لعرض حالة الاشتراك، مزايا الخطة، الربط مع الفواتير، والاستعداد للدفع الإلكتروني عند اكتمال خدمات الباك اند."
          actions={
            <div className="flex flex-wrap gap-2">
              <Badge tone="brand">واجهة جاهزة</Badge>
              <Badge tone="warning">بانتظار الربط الخلفي</Badge>
            </div>
          }
        />
      </Card>

      <div className="grid gap-5 sm:grid-cols-3">
        <MetricCard title="الخطة الحالية" value="بانتظار بيانات الاشتراك" icon={<WalletCards size={18} aria-hidden="true" />} />
        <MetricCard title="حالة التجديد" value="غير مرتبطة بعد" icon={<ShieldCheck size={18} aria-hidden="true" />} />
        <MetricCard title="وسيلة الدفع" value="ستظهر بعد الربط" icon={<CreditCard size={18} aria-hidden="true" />} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <Card title="عناصر الاشتراك" description="المسارات الأساسية التي تحتاجها الشركة لإدارة خطتها بسهولة ووضوح.">
          <div className="grid gap-4 sm:grid-cols-2">
            {subscriptionCards.map((item) => {
              const Icon = item.icon

              return (
                <div key={item.title} className="rounded-[22px] border border-[var(--line)] bg-[var(--surface-muted)] p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-2xl bg-white text-[var(--brand)] shadow-sm">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-[var(--text)]">{item.title}</h3>
                      <Badge tone="neutral">جاهز للربط</Badge>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">{item.description}</p>
                </div>
              )
            })}
          </div>
        </Card>

        <Card title="ملخص الخطة" description="هذا القسم يوضح ما الذي ستعرضه الصفحة فور وصول بيانات الاشتراك من الباك اند.">
          <div className="space-y-3">
            {planHighlights.map((item) => (
              <div key={item} className="rounded-[20px] border border-[var(--line)] bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-2xl bg-[var(--brand-soft)] text-[var(--brand)]">
                    <BadgeCheck size={18} aria-hidden="true" />
                  </div>
                  <p className="text-sm font-medium text-[var(--text)]">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <Card title="إجراءات الاشتراك" description="الأزرار جاهزة من جهة الواجهة فقط حتى تكتمل العمليات الفعلية.">
          <div className="flex flex-wrap gap-3">
            <Button disabled leadingIcon={<Sparkles size={16} aria-hidden="true" />}>
              ترقية الخطة
            </Button>
            <Button variant="secondary" disabled leadingIcon={<WalletCards size={16} aria-hidden="true" />}>
              تغيير الاشتراك
            </Button>
            <Button variant="ghost" disabled leadingIcon={<Receipt size={16} aria-hidden="true" />}>
              عرض الفواتير
            </Button>
          </div>
          <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">
            تم تجهيز الواجهة لتستوعب مسارات الاشتراك كاملة، لكن تنفيذ الترقية أو التجديد أو الربط المالي ما زال بانتظار الخدمات الخلفية.
          </p>
        </Card>

        <Card title="الحالة الحالية" description="لا نعرض مزايا مالية على أنها عاملة قبل تفعيلها فعليًا.">
          <EmptyState
            title="بيانات الاشتراك غير متاحة بعد"
            description="عند ربط الباك اند سيظهر هنا اسم الخطة، تاريخ التجديد، المزايا المفعلة، وحدود الاستخدام الخاصة بالشركة."
          />
        </Card>
      </div>
    </section>
  )
}

function MetricCard({ title, value, icon }) {
  return (
    <Card>
      <div className="flex items-center gap-2 text-[var(--text-faint)]">
        {icon}
        <p className="text-sm font-medium text-[var(--text)]">{title}</p>
      </div>
      <p className="mt-4 text-lg font-medium text-[var(--text)]">{value}</p>
    </Card>
  )
}
