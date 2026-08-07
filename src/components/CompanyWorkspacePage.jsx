'use client'

import { ArrowLeft, LockKeyhole, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Badge } from './Badge'
import { Button } from './Button'
import { Card } from './Card'
import { EmptyState } from './EmptyState'
import { PageHeader } from './PageHeader'

export function CompanyWorkspacePage({
  eyebrow,
  title,
  description,
  featureTitle,
  featureDescription,
  features,
  quickLinks = [],
  pendingTitle = 'بانتظار التكامل الخلفي',
  pendingDescription = 'تم تجهيز هذه الواجهة بالكامل من جهة الفرونت اند، ويمكن لفريق الباك اند ربط الصلاحيات والبيانات والإجراءات الفعلية لاحقًا.',
}) {
  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.96),_rgba(238,247,246,0.92))]">
        <PageHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          actions={
            <div className="flex flex-wrap gap-2">
              <Badge tone="brand">واجهة جاهزة</Badge>
              <Badge tone="warning">بانتظار الربط</Badge>
            </div>
          }
        />
      </Card>

      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <Card title={featureTitle} description={featureDescription}>
          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <div key={feature.title} className="rounded-[22px] border border-[var(--line)] bg-[var(--surface-muted)] p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-2xl bg-white text-[var(--brand)] shadow-sm">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-[var(--text)]">{feature.title}</h3>
                      <Badge tone="neutral">جاهز للربط</Badge>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </Card>

        <div className="space-y-5">
          {quickLinks.length > 0 ? (
            <Card title="الوصول السريع" description="روابط مباشرة للأقسام ذات العلاقة ضمن مساحة الشركة.">
              <div className="space-y-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.to}
                    href={link.to}
                    className="flex items-center justify-between gap-3 rounded-[20px] border border-[var(--line)] bg-white p-4 transition hover:bg-[var(--surface-muted)]"
                  >
                    <div>
                      <p className="text-sm font-medium text-[var(--text)]">{link.title}</p>
                      <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">{link.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--brand)]">
                      {link.icon}
                      <ArrowLeft size={18} aria-hidden="true" />
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          ) : null}

          <Card title={pendingTitle} description={pendingDescription}>
            <div className="space-y-3">
              <PendingRow label="صلاحيات الوصول والإجراءات" />
              <PendingRow label="جلب البيانات الفعلية من الجداول" />
              <PendingRow label="الحفظ والتحديث والاعتماد" />
              <PendingRow label="الإشعارات والتقارير التشغيلية" />
            </div>
          </Card>
        </div>
      </div>

      <Card title="حالة الصفحة" description="هذه الصفحة جاهزة للعرض والتطوير المرحلي دون الحاجة إلى إعادة بنائها لاحقًا.">
        <EmptyState title="المحتوى التشغيلي سيظهر هنا" description="تم ترتيب الواجهة وتجهيز الأقسام الرئيسية. بعد اكتمال الباك اند، ستظهر البيانات والإجراءات الفعلية مباشرة في هذه الصفحة." />
      </Card>
    </section>
  )
}

function PendingRow({ label }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[20px] border border-[var(--line)] bg-[var(--surface-muted)] p-4">
      <div className="flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-2xl bg-white text-[var(--warn)]">
          <LockKeyhole size={18} aria-hidden="true" />
        </div>
        <span className="text-sm font-medium text-[var(--text)]">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge tone="warning">قيد الانتظار</Badge>
        <Button variant="ghost" size="sm" disabled leadingIcon={<Sparkles size={14} aria-hidden="true" />}>
          قريبًا
        </Button>
      </div>
    </div>
  )
}
