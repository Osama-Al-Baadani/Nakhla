import { FeatureGrid } from '../../../components/public/FeatureGrid'
import { PublicSection } from '../../../components/public/PublicSection'
import { PublicShell } from '../../../components/public/PublicShell'

export const metadata = {
  title: 'عن نخلة - المنصة السعودية المهنية للتوظيف والتأهيل',
  description: 'تعرّف على منصة نخلة ورسالتها ورؤيتها في ربط التوظيف بالتأهيل والتدريب والتعهيد بالسعودية.',
}

const values = [
  { title: 'الثقة', description: 'بناء تجربة واضحة ومهنية تساعد جميع الأطراف على اتخاذ قرارات أفضل.' },
  { title: 'التدرج', description: 'رحلة منظمة تبدأ من التقييم وتنتهي بالجاهزية أو التوظيف أو التعهيد.' },
  { title: 'التمكين', description: 'منح الباحثين والشركات أدوات عملية بلغة عربية وبسياق محلي مفهوم.' },
  { title: 'القياس', description: 'ترتيب التقدم، الاختبارات، الأداء، والتقارير ضمن تجربة قابلة للتوسع.' },
]

export default function AboutPage() {
  return (
    <PublicShell>
      <PublicSection
        eyebrow="عن نخلة"
        title="منصة سعودية تربط التوظيف بالتأهيل والتعهيد"
        description="نخلة ليست مجرد بوابة وظائف، بل تجربة متكاملة تساعد الباحثين على النضج المهني، وتمكّن الشركات من الوصول إلى الكفاءات وإدارة الاحتياج البشري بوضوح."
      >
        <FeatureGrid
          columns="2"
          items={[
            { title: 'رسالتنا', description: 'بناء جسر عملي بين الاستعداد المهني واحتياج السوق الحقيقي.' },
            { title: 'رؤيتنا', description: 'أن تكون نخلة منصة موثوقة للتوظيف والتأهيل والتعهيد في السوق السعودي.' },
            { title: 'السوق المستهدف', description: 'الشركات السعودية، الباحثون عن عمل، والفرق التي تحتاج إلى تأهيل أو تعهيد منظم.' },
            { title: 'لماذا نخلة', description: 'لأنها تجمع بين التدريب، التقييم، التوظيف، والتعهيد ضمن تجربة واحدة مترابطة.' },
          ]}
        />
      </PublicSection>

      <PublicSection
        title="قيم المنصة"
        description="هذه القيم تشكل أساس التجربة العامة للموقع والمنتج."
      >
        <FeatureGrid columns="4" items={values} />
      </PublicSection>
    </PublicShell>
  )
}
