import { Badge } from '../../../components/Badge'
import { PublicSection } from '../../../components/public/PublicSection'
import { PublicShell } from '../../../components/public/PublicShell'
import { Timeline } from '../../../components/public/Timeline'
import { maturityLevels } from '../../../lib/public-content'

export const metadata = {
  title: 'التدريب والتأهيل - نخلة',
  description: 'خمس مراحل نضج مهني تبدأ بالتأسيس وتنتهي بالجاهزية لسوق العمل والشهادات.',
}

export default function TrainingPage() {
  return (
    <PublicShell>
      <PublicSection
        eyebrow="رحلة التدريب"
        title="خمس مراحل نضج مستوحاة من تدرج الثمرة حتى الاكتمال"
        description="تعتمد نخلة على مفهوم التدرج والنضج المهني خلال خمسة أسابيع أو خمس مراحل رئيسية، تبدأ بالتأسيس وتنتهي بالاحتراف والاستعداد الفعلي لسوق العمل."
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone="brand">التقييم</Badge>
          <Badge tone="neutral">الاختبارات</Badge>
          <Badge tone="neutral">التقدم الأسبوعي</Badge>
          <Badge tone="warning">الشهادات</Badge>
        </div>
        <Timeline items={maturityLevels} />
      </PublicSection>
    </PublicShell>
  )
}
