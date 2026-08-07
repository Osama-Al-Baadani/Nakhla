import { FaqList } from '../../../components/public/FaqList'
import { PublicSection } from '../../../components/public/PublicSection'
import { PublicShell } from '../../../components/public/PublicShell'
import { faqs } from '../../../lib/public-content'

export const metadata = {
  title: 'الأسئلة الشائعة - نخلة',
  description: 'إجابات عن الأنشطة والخدمات المقدمة للباحثين والشركات عبر منصة نخلة.',
}

export default function FaqPage() {
  return (
    <PublicShell>
      <PublicSection
        eyebrow="الأسئلة الشائعة"
        title="إجابات مختصرة على أكثر ما يحتاجه الزائر"
        description="هذه الصفحة تجمع الأسئلة الأساسية حول التوظيف، التدريب، التعهيد، والتكامل التشغيلي المتوقع."
      >
        <FaqList items={faqs} />
      </PublicSection>
    </PublicShell>
  )
}
