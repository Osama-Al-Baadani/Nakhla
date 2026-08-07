'use client'

import {
  CreditCard,
  FileBarChart2,
  FileSignature,
  GraduationCap,
  Receipt,
  Settings2,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { Badge } from '../../../../components/Badge'
import { Card } from '../../../../components/Card'
import { PageHeader } from '../../../../components/PageHeader'

const adminModules = [
  {
    title: 'إدارة المستخدمين',
    description: 'تنظيم حسابات الفريق، الأدوار، والصلاحيات الداخلية.',
    to: '/company/admin/users',
    icon: Users,
  },
  {
    title: 'إدارة الوظائف',
    description: 'متابعة الوظائف المنشورة والمسودات وحالات النشر.',
    to: '/company/admin/jobs',
    icon: Settings2,
  },
  {
    title: 'إدارة الدورات',
    description: 'مراجعة المواد أو المسارات التدريبية الخاصة ببرامج الشركة.',
    to: '/company/admin/courses',
    icon: GraduationCap,
  },
  {
    title: 'إدارة العقود',
    description: 'تنظيم العقود والاتفاقيات والوثائق المرتبطة بالتشغيل.',
    to: '/company/admin/contracts',
    icon: FileSignature,
  },
  {
    title: 'إدارة التقارير',
    description: 'الوصول إلى التقارير التشغيلية والأداء والمتابعة الدورية.',
    to: '/company/admin/reports',
    icon: FileBarChart2,
  },
  {
    title: 'إدارة الاشتراكات',
    description: 'متابعة الخطة الحالية، الفواتير، وحالة الاشتراك.',
    to: '/company/admin/subscriptions',
    icon: Receipt,
  },
  {
    title: 'إدارة المدفوعات',
    description: 'عرض الدفعات، السجلات المالية، وحالات التحصيل.',
    to: '/company/admin/payments',
    icon: CreditCard,
  },
]

export default function CompanyAdminPage() {
  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.96),_rgba(238,247,246,0.92))]">
        <PageHeader
          eyebrow="الإدارة"
          title="إدارة الشركة والمنصة التشغيلية"
          description="صفحة مركزية تجمع أقسام الإدارة الداخلية للشركة، مع مسارات واضحة للمستخدمين والوظائف والدورات والعقود والتقارير والمدفوعات."
          actions={
            <div className="flex flex-wrap gap-2">
              <Badge tone="brand">لوحة إدارية</Badge>
              <Badge tone="warning">بانتظار الربط الخلفي</Badge>
            </div>
          }
        />
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {adminModules.map((module) => {
          const Icon = module.icon

          return (
            <Link
              key={module.to}
              href={module.to}
              className="rounded-[24px] border border-[var(--line)] bg-white p-5 shadow-[var(--shadow)] transition hover:-translate-y-0.5 hover:bg-[var(--surface-muted)] block"
            >
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-[18px] bg-[var(--brand-soft)] text-[var(--brand)]">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-[var(--text)]">{module.title}</h2>
                  <Badge tone="neutral">قسم إداري</Badge>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">{module.description}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
