import { Badge } from '../../../../components/Badge'
import { Card } from '../../../../components/Card'
import { PublicSection } from '../../../../components/public/PublicSection'
import { PublicShell } from '../../../../components/public/PublicShell'

export const metadata = {
  title: 'سياسة الخصوصية - نخلة',
  description: 'سياسة الخصوصية وحماية البيانات في منصة نخلة.',
}

export default function PrivacyPolicyPage() {
  return (
    <PublicShell>
      <PublicSection
        eyebrow="الخصوصية"
        title="هيكل سياسة الخصوصية"
        description="هذا المحتوى هيكل قانوني توضيحي فقط، ويجب استبداله لاحقًا بالنص المعتمد نهائيًا من الجهة القانونية."
      >
        <Badge tone="warning">بانتظار المحتوى القانوني المعتمد</Badge>
        <div className="grid gap-4">
          {['المعلومات التي نجمعها', 'كيفية الاستخدام', 'مشاركة البيانات', 'فترة الاحتفاظ', 'حقوق المستخدم', 'التواصل والامتثال'].map((item) => (
            <Card key={item} className="bg-white">
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-[var(--text)]">{item}</h3>
                <p className="text-sm leading-8 text-[var(--text-soft)]">
                  قسم قانوني تمهيدي بانتظار النص الرسمي المعتمد من العميل أو الفريق القانوني.
                </p>
              </div>
            </Card>
          ))}
        </div>
      </PublicSection>
    </PublicShell>
  )
}
