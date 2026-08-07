'use client'

import Link from 'next/link'
import { Badge } from './Badge'
import { Card } from './Card'

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
}) {
  return (
    <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <Card className="overflow-hidden border-[#eadfce] bg-[linear-gradient(145deg,_#fffaf2,_#f4efe4)] p-8 shadow-[0_30px_80px_rgba(76,58,29,0.10)]">
        <p className="text-xs font-semibold tracking-[0.18em] text-[var(--brand)]">{eyebrow}</p>
        <h2 className="mt-4 font-serif text-5xl leading-tight text-[var(--text)]">{title}</h2>
        <p className="mt-4 max-w-2xl text-sm leading-8 text-[var(--text-soft)]">{description}</p>

        <div className="mt-8 grid gap-4">
          <div className="rounded-[22px] bg-white/80 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-[var(--text)]">رحلة عربية واضحة</p>
              <Badge tone="brand">RTL</Badge>
            </div>
            <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
              صممت صفحات الدخول والتسجيل لتخدم الباحثين والشركات ضمن هوية عربية احترافية متسقة مع تجربة نخلة العامة.
            </p>
          </div>
          <div className="rounded-[22px] bg-white/80 p-5 shadow-sm">
            <p className="text-sm font-medium text-[var(--text)]">تكامل مصادقة رسمي</p>
            <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
              تستخدم الواجهة تدفق المصادقة الحالي دون تجاوز للصلاحيات، مع بقاء بعض الخطوات بانتظار اكتمال الباك اند.
            </p>
          </div>
        </div>
      </Card>

      <Card className="bg-white p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link href="/" className="text-sm font-medium text-[var(--brand)] transition hover:text-[var(--brand-strong)]">
            العودة إلى الموقع الرئيسي
          </Link>
        </div>

        {children}

        {footer ? <div className="mt-6">{footer}</div> : null}
      </Card>
    </div>
  )
}
