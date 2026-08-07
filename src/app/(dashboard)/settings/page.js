'use client'

import { Bell, BriefcaseBusiness, Mail, MessageSquareText, ShieldCheck, UserCog } from 'lucide-react'
import { Badge } from '../../../components/Badge'
import { Card } from '../../../components/Card'
import { EmptyState } from '../../../components/EmptyState'
import { PageHeader } from '../../../components/PageHeader'
import { useAuth } from '../../../hooks/useAuth'

export default function SettingsPage() {
  const { role } = useAuth()
  const isCompany = role === 'company'

  const sections = [
    {
      title: isCompany ? 'إعدادات ملف الشركة' : 'إعدادات الملف الشخصي',
      description: isCompany
        ? 'إدارة بيانات الشركة وربطها بالخدمات الإضافية ما تزال بانتظار اكتمال دعم الباك اند.'
        : 'إدارة بيانات الحساب الموسعة وربطها بالخدمات الإضافية ما تزال بانتظار اكتمال دعم الباك اند.',
      icon: UserCog,
    },
    {
      title: 'الأمان والجلسات',
      description:
        'تسجيل الدخول والخروج وإعادة تعيين كلمة المرور متاح بالفعل، أما إدارة الجلسات المتقدمة فتظل غير متاحة حاليًا.',
      icon: ShieldCheck,
    },
    {
      title: isCompany ? 'إشعارات البريد الإلكتروني' : 'إشعارات البريد',
      description:
        'واجهة الإشعارات البريدية جاهزة، ويمكن ربط تنبيهات الوظائف أو المتقدمين أو المقابلات بها لاحقًا.',
      icon: Mail,
    },
    {
      title: isCompany ? 'إشعارات الرسائل النصية' : 'إشعارات الرسائل النصية',
      description:
        'يمكن لاحقًا ربط التنبيهات العاجلة أو المختصرة بخدمة الرسائل النصية بعد اعتماد المزود الخلفي.',
      icon: MessageSquareText,
    },
    {
      title: isCompany ? 'إعدادات الوظائف والمتقدمين' : 'تفضيلات التقديم والمتابعة',
      description: isCompany
        ? 'إدارة الوظائف وتحديث الحالات والإجراءات المرتبطة بالمتقدمين تحتاج إلى تأكيد نهائي من الباك اند.'
        : 'المتابعة المتقدمة للتقديمات والمقابلات ستتفعل عند اكتمال تكامل البيانات.',
      icon: BriefcaseBusiness,
    },
    {
      title: isCompany ? 'تنبيهات المنصة' : 'تنبيهات المنصة',
      description:
        'مكان مناسب لتجميع تنبيهات الأداء، الرسائل، المقابلات، أو أي تحديثات تشغيلية أخرى.',
      icon: Bell,
    },
  ]

  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.95),_rgba(239,246,252,0.92))]">
        <PageHeader
          eyebrow="الإعدادات"
          title={isCompany ? 'إعدادات الشركة والإشعارات' : 'إعدادات الحساب والإشعارات'}
          description="هذه الصفحة تعرض الإعدادات الحالية بوضوح، مع إبراز قنوات الإشعارات والخيارات التي تنتظر التكامل الخلفي."
        />
      </Card>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon

          return (
            <Card key={section.title}>
              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-2xl bg-[var(--brand-soft)] text-[var(--brand)]">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-[var(--text)]">{section.title}</h2>
                  <Badge tone="warning">بانتظار الربط</Badge>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">{section.description}</p>
            </Card>
          )
        })}
      </div>

      <EmptyState
        title="إعدادات إضافية بانتظار التكامل"
        description="سيتم تفعيل الحفظ الفعلي للتفضيلات وقنوات الإشعارات فقط بعد تأكيد الجداول أو الخدمات المرتبطة بها من فريق الباك اند."
      />
    </section>
  )
}
