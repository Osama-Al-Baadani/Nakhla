import { Timeline } from '../../../components/public/Timeline'
import { FeatureGrid } from '../../../components/public/FeatureGrid'
import { PublicSection } from '../../../components/public/PublicSection'
import { PublicShell } from '../../../components/public/PublicShell'

export const metadata = {
  title: 'للباحثين عن عمل - نخلة',
  description: 'رحلة الباحث عن عمل عبر منصة نخلة: تسجيل، تقييم، مسار تدريبي، اختبارات، وتقديم على الوظائف.',
}

const seekerFlow = [
  { phase: '01', title: 'التسجيل', description: 'فتح الحساب وتحديد المسار كباحث عن عمل.' },
  { phase: '02', title: 'التقييم التأهيلي', description: 'معرفة المستوى الحالي ونقطة البداية.' },
  { phase: '03', title: 'المسار التدريبي', description: 'التقدم أسبوعيًا عبر مهام واختبارات ومتابعة واضحة.' },
  { phase: '04', title: 'الاختبارات والشهادات', description: 'قياس التقدم ومنح ما يدعم الجاهزية المهنية.' },
  { phase: '05', title: 'الطلبات والمقابلات', description: 'متابعة التقديمات والاستعداد الفعلي لسوق العمل.' },
]

export default function ForSeekersPage() {
  return (
    <PublicShell>
      <PublicSection
        eyebrow="للباحثين عن عمل"
        title="رحلة تبدأ من التقييم وتنتهي بالجاهزية المهنية"
        description="تصمم نخلة تجربة الباحث عن عمل على شكل مسار واضح: تسجيل، تقييم، تدريب، اختبارات، شهادات، ثم متابعة التقديمات والمقابلات."
      >
        <Timeline items={seekerFlow} />
      </PublicSection>

      <PublicSection
        title="ما الذي يحصل عليه الباحث؟"
        description="المحتوى هنا يشرح التجربة المستهدفة من جهة الواجهة العامة، مع بقاء التنفيذ التشغيلي بانتظار اكتمال الباكند."
      >
        <FeatureGrid
          columns="3"
          items={[
            { title: 'التسجيل السريع', description: 'إنشاء الحساب واختيار المسار المناسب بوضوح.' },
            { title: 'التأهيل الأسبوعي', description: 'خطة تقدم مرحلية تدعم الانضباط والتحسن المستمر.' },
            { title: 'الاختبارات', description: 'قياس التطور بشكل متكرر خلال الرحلة.' },
            { title: 'الشهادات', description: 'إظهار إنجازات التعلم والجاهزية المهنية.' },
            { title: 'التقديمات', description: 'متابعة الطلبات المرتبطة بالوظائف وتفاصيلها.' },
            { title: 'الاستعداد للمقابلات', description: 'ربط التقدم التدريبي بجاهزية فعلية للتوظيف.' },
          ]}
        />
      </PublicSection>
    </PublicShell>
  )
}
