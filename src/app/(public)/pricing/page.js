import Link from 'next/link'
import { Badge } from '../../../components/Badge'
import { Button } from '../../../components/Button'
import { Card } from '../../../components/Card'
import { PublicSection } from '../../../components/public/PublicSection'
import { PublicShell } from '../../../components/public/PublicShell'

export const metadata = {
  title: 'الأسعار - نخلة',
  description: 'خطط وأسعار خدمات التوظيف والتأهيل والتعهيد المتاحة للشركات عبر نخلة.',
}

const pricingCards = [
  { title: 'حلول التوظيف', note: 'حسب احتياج الشركة' },
  { title: 'التأهيل والتدريب', note: 'تواصل معنا' },
  { title: 'التعهيد وإدارة الفرق', note: 'حسب نطاق الخدمة' },
]

export default function PricingPage() {
  return (
    <PublicShell>
      <PublicSection
        eyebrow="الأسعار"
        title="هيكل أسعار مرن بحسب نوع الخدمة"
        description="تعرض نخلة هيكلًا مرنًا للتسعير دون افتراض خطط نهائية غير مؤكدة. يتم الاتفاق النهائي حسب احتياج الشركة ونطاق الخدمة."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pricingCards.map((card) => (
            <Card key={card.title} className="bg-white">
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-[var(--text)]">{card.title}</h3>
                <Badge tone="warning">{card.note}</Badge>
                <p className="text-sm leading-8 text-[var(--text-soft)]">
                  هذه البطاقة هيكل عرض فقط، وتحتاج إلى مراجعة واعتماد نهائي من العميل قبل تحويلها إلى نسخة تشغيلية.
                </p>
                <Link href="/contact" className="block">
                  <Button className="w-full">تواصل معنا</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </PublicSection>
    </PublicShell>
  )
}
