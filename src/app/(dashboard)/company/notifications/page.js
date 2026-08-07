'use client'

import { BellRing, Mail, MessageSquareText, ShieldCheck } from 'lucide-react'
import { Badge } from '../../../../components/Badge'
import { Button } from '../../../../components/Button'
import { Card } from '../../../../components/Card'
import { EmptyState } from '../../../../components/EmptyState'
import { PageHeader } from '../../../../components/PageHeader'

const channels = [
  {
    title: 'البريد الإلكتروني',
    description:
      'القناة الأساسية لإرسال تنبيهات الرسائل الجديدة للموظف أو الباحث عن عمل عند تفعيل الربط الخلفي.',
    status: 'جاهز للربط',
    icon: Mail,
  },
  {
    title: 'الرسائل النصية',
    description:
      'تنبيهات مختصرة للحالات العاجلة أو التحديثات المهمة عند توفر مزود الرسائل وربطه من فريق الباك اند.',
    status: 'جاهز للربط',
    icon: MessageSquareText,
  },
]

const notificationScenarios = [
  'إشعار بريدي عند إرسال رسالة جديدة من الشركة',
  'إشعار بوصول متتقدم جديد إلى الوظيفة',
  'إشعار بتحديث حالة الطلب أو المرشح',
  'إشعار بموعد مقابلة جديد أو تعديلها',
  'إشعار بتقرير تشغيلي أو تنبيه إداري',
]

export default function CompanyNotificationsPage() {
  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.96),_rgba(238,247,246,0.92))]">
        <PageHeader
          eyebrow="الإشعارات"
          title="إشعارات الشركة"
          description="هذه الواجهة تجهز مسار الإشعارات الخاص بالشركة. عند اكتمال الربط الخلفي، سيتمكن النظام من إرسال تنبيه إلى البريد الإلكتروني الخاص بالموظف فور وصول رسالة جديدة من الشركة."
          actions={
            <div className="flex flex-wrap gap-2">
              <Badge tone="brand">جاهزة من جهة الواجهة</Badge>
              <Badge tone="warning">بانتظار الربط الخلفي</Badge>
            </div>
          }
        />
      </Card>

      <div className="grid gap-5 sm:grid-cols-2">
        {channels.map((channel) => {
          const Icon = channel.icon

          return (
            <Card key={channel.title}>
              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-2xl bg-[var(--brand-soft)] text-[var(--brand)]">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-[var(--text)]">{channel.title}</h2>
                  <Badge tone="neutral">{channel.status}</Badge>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">{channel.description}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button variant="secondary" disabled leadingIcon={<BellRing size={16} aria-hidden="true" />}>
                  التفعيل قريبًا
                </Button>
                <Button variant="ghost" disabled leadingIcon={<ShieldCheck size={16} aria-hidden="true" />}>
                  إدارة التفضيلات
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      <Card
        title="سيناريوهات الإشعارات"
        description="أمثلة على التنبيهات التي ستعمل بعد اكتمال خدمة الإرسال والصلاحيات من جهة الباك اند."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {notificationScenarios.map((item) => (
            <div key={item} className="rounded-[20px] border border-[var(--line)] bg-[var(--surface-muted)] p-4">
              <div className="flex items-center gap-2">
                <BellRing size={16} aria-hidden="true" className="text-[var(--brand)]" />
                <span className="text-sm font-medium text-[var(--text)]">{item}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card
        title="الحالة الحالية"
        description="تم تجهيز الواجهة فقط. الإرسال الفعلي للبريد أو الرسائل النصية سيبدأ بعد اعتماد الخدمة الخلفية المناسبة."
      >
        <EmptyState
          title="الإشعارات غير مفعلة بعد"
          description="بمجرد أن يربط فريق الباك اند خدمة الرسائل والإشعارات، سيتم إرسال تنبيه بريدي إلى الموظف عند استلامه رسالة جديدة من الشركة، مع إمكانية إضافة قنوات أخرى لاحقًا."
        />
      </Card>
    </section>
  )
}
