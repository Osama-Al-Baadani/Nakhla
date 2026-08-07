'use client'

import { Banknote, CreditCard, LockKeyhole, Receipt, ShieldCheck, Smartphone } from 'lucide-react'
import { Badge } from '../../../../../components/Badge'
import { Button } from '../../../../../components/Button'
import { Card } from '../../../../../components/Card'
import { EmptyState } from '../../../../../components/EmptyState'
import { PageHeader } from '../../../../../components/PageHeader'

const invoices = [
  {
    id: 'INV-2026-001',
    title: 'فاتورة الاشتراك الشهري',
    status: 'بانتظار الربط',
    amount: 'سيظهر بعد الربط',
  },
  {
    id: 'INV-2026-002',
    title: 'فاتورة خدمات إضافية',
    status: 'بانتظار الربط',
    amount: 'سيظهر بعد الربط',
  },
]

const paymentFeatures = [
  {
    title: 'الفواتير',
    description: 'عرض الفواتير الحالية والسابقة مع حالتها وتفاصيل كل عملية مالية.',
    icon: Receipt,
  },
  {
    title: 'الدفع الإلكتروني',
    description: 'واجهة جاهزة لربط بوابات الدفع الإلكترونية وتمرير حالة السداد بأمان.',
    icon: CreditCard,
  },
  {
    title: 'سجل المدفوعات',
    description: 'عرض جميع العمليات المالية للشركة في سجل واضح وقابل للمراجعة.',
    icon: Banknote,
  },
  {
    title: 'الحماية والتحقق',
    description: 'إظهار حالات التحقق والحماية وتنبيهات المراجعة المالية عند الحاجة.',
    icon: ShieldCheck,
  },
]

export default function CompanyPaymentsManagementPage() {
  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.96),_rgba(238,247,246,0.92))]">
        <PageHeader
          eyebrow="المدفوعات"
          title="المدفوعات والفواتير"
          description="واجهة مالية خاصة بالشركة تشمل الفواتير، الدفع الإلكتروني، وسجل المدفوعات، مع تجهيز كامل للربط المستقبلي مع مزودات الدفع والباك اند."
          actions={
            <div className="flex flex-wrap gap-2">
              <Badge tone="brand">واجهة جاهزة</Badge>
              <Badge tone="warning">بانتظار الربط الخلفي</Badge>
            </div>
          }
        />
      </Card>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="الفواتير الحالية" value="ستظهر بعد الربط" icon={<Receipt size={18} aria-hidden="true" />} />
        <MetricCard title="حالة الدفع" value="غير مرتبطة بعد" icon={<CreditCard size={18} aria-hidden="true" />} />
        <MetricCard title="سجل المدفوعات" value="جاهز للعرض" icon={<Banknote size={18} aria-hidden="true" />} />
        <MetricCard title="بوابة السداد" value="بانتظار المزود" icon={<Smartphone size={18} aria-hidden="true" />} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <Card title="عناصر نظام المدفوعات" description="المكونات الأساسية التي تحتاجها الشركة لإدارة الجانب المالي داخل المنصة.">
          <div className="grid gap-4 sm:grid-cols-2">
            {paymentFeatures.map((item) => {
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

        <Card title="قائمة الفواتير" description="تم تجهيز مكان منظم لعرض الفواتير بمجرد تفعيل البيانات الحقيقية.">
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="rounded-[20px] border border-[var(--line)] bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-[var(--text)]">{invoice.title}</p>
                    <p className="mt-1 text-xs text-[var(--text-faint)]">{invoice.id}</p>
                  </div>
                  <Badge tone="warning">{invoice.status}</Badge>
                </div>
                <p className="mt-3 text-sm text-[var(--text-soft)]">{invoice.amount}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <Card title="إجراءات الدفع" description="تم بناء الأزرار والحالات البصرية دون تنفيذ حقيقي قبل اعتماد التكامل.">
          <div className="flex flex-wrap gap-3">
            <Button disabled leadingIcon={<CreditCard size={16} aria-hidden="true" />}>
              دفع إلكتروني
            </Button>
            <Button variant="secondary" disabled leadingIcon={<Receipt size={16} aria-hidden="true" />}>
              تنزيل فاتورة
            </Button>
            <Button variant="ghost" disabled leadingIcon={<Banknote size={16} aria-hidden="true" />}>
              عرض السجل المالي
            </Button>
          </div>
          <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">
            عند اكتمال الربط، ستدعم هذه الصفحة السداد الإلكتروني، التحقق من العملية، وتحديث السجل المالي تلقائيًا.
          </p>
        </Card>

        <Card title="الحالة الحالية" description="المنصة لا تنفذ أي عملية دفع فعلية من جهة الواجهة حاليًا.">
          <EmptyState
            title="المدفوعات غير مفعلة بعد"
            description="واجهة الفواتير والدفع والسجل المالي جاهزة، لكن تنفيذ السداد، إصدار الفواتير، وحفظ العمليات بانتظار خدمة الباك اند ومزود الدفع."
          />
          <div className="mt-4 rounded-[20px] border border-[var(--line)] bg-[var(--surface-muted)] p-4">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-2xl bg-white text-[var(--warn)]">
                <LockKeyhole size={18} aria-hidden="true" />
              </div>
              <p className="text-sm leading-7 text-[var(--text-soft)]">
                الربط المطلوب لاحقًا يشمل: مزود الدفع الإلكتروني، إصدار الفواتير، حفظ العمليات، وربط الاشتراك بالسداد.
              </p>
            </div>
          </div>
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
