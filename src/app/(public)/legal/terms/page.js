import { Badge } from '../../../../components/Badge'
import { Card } from '../../../../components/Card'
import { PublicSection } from '../../../../components/public/PublicSection'
import { PublicShell } from '../../../../components/public/PublicShell'

export const metadata = {
  title: 'الشروط والأحكام - نخلة',
  description: 'الشروط والأحكام الخاصة باستكشاف واستخدام منصة نخلة.',
}

export default function TermsPage() {
  return (
    <PublicShell>
      <PublicSection
        eyebrow="الشروط والأحكام"
        title="هيكل الشروط والأحكام"
        description="هذه الصفحة تقدم بنية قانونية أولية فقط، ويجب استبدالها بالنص الرسمي بعد المراجعة القانونية النهائية."
      >
        <Badge tone="warning">بانتظار المحتوى القانوني المعتمد</Badge>
        <div className="grid gap-4">
          {['قبول الاستخدام', 'حقوق ومسؤوليات المستخدم', 'حقوق الشركة', 'الاستخدام المسموح', 'الملكية الفكرية', 'الإنهاء والنزاعات'].map((item) => (
            <Card key={item} className="bg-white">
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-[var(--text)]">{item}</h3>
                <p className="text-sm leading-8 text-[var(--text-soft)]">
                  محتوى قانوني تمهيدي بانتظار الاعتماد النهائي من العميل أو المستشار القانوني.
                </p>
              </div>
            </Card>
          ))}
        </div>
      </PublicSection>
    </PublicShell>
  )
}
