import { FeatureGrid } from '../../../components/public/FeatureGrid'
import { PublicSection } from '../../../components/public/PublicSection'
import { PublicShell } from '../../../components/public/PublicShell'

export const metadata = {
  title: 'للشركات - نخلة',
  description: 'حلول التوظيف والتعهيد وإدارة المرشحين ومتابعة الأداء للشركات عبر منصة نخلة.',
}

export default function ForCompaniesPage() {
  return (
    <PublicShell>
      <PublicSection
        eyebrow="للشركات"
        title="من نشر الفرصة إلى متابعة الأداء"
        description="صُممت نخلة لمساعدة الشركات على تنظيم التوظيف والتعهيد ضمن تجربة مهنية: نشر وظائف، مراجعة مرشحين، فرز، مقابلات، ثم متابعة وتقارير."
      >
        <FeatureGrid
          columns="4"
          items={[
            { title: 'نشر الوظائف', description: 'تنظيم الطلبات الوظيفية ضمن صفحات جاهزة وقابلة للتوسع.' },
            { title: 'عرض المرشحين', description: 'الانتقال من قائمة المتقدمين إلى تفاصيل كل مرشح.' },
            { title: 'الفرز والمقابلات', description: 'تصميم الواجهات اللازمة للاختصار، الاختيار، والمتابعة.' },
            { title: 'طلبات التعهيد', description: 'إدارة طلب عدد الموظفين والمهارات وساعات العمل.' },
            { title: 'الحضور والانضباط', description: 'تجهيز تجربة متابعة الأداء والحضور لاحقًا.' },
            { title: 'التقارير', description: 'تهيئة تجربة KPI والتقارير التنفيذية للشركات.' },
            { title: 'التقييم المستمر', description: 'بناء واجهة تدعم القياس المستمر وتحسين الأداء.' },
            { title: 'الرؤية الموحدة', description: 'ربط التوظيف والتعهيد ضمن تجربة واحدة واضحة.' },
          ]}
        />
      </PublicSection>
    </PublicShell>
  )
}
