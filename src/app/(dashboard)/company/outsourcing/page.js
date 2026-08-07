'use client'

import { FeatureGrid } from '../../../../components/public/FeatureGrid'
import { PublicSection } from '../../../../components/public/PublicSection'

export default function OutsourcingPage() {
  return (
    <PublicSection
      eyebrow="التعهيد"
      title="إدارة احتياجك من القوى العاملة ضمن مسار واضح"
      description="تشرح هذه الصفحة تجربة التعهيد المستهدفة: طلب عدد الموظفين، تحديد المهارات، ساعات العمل، المتابعة، الحضور، والتقارير."
    >
      <FeatureGrid
        columns="3"
        items={[
          { title: 'عدد الموظفين', description: 'تحديد حجم الفريق المطلوب حسب احتياج الشركة.' },
          { title: 'المهارات المطلوبة', description: 'اختيار المهارات والمعايير الأساسية لتكوين الفريق.' },
          { title: 'ساعات العمل', description: 'تحديد الإطار التشغيلي والوردية أو النمط المطلوب.' },
          { title: 'المراقبة والأداء', description: 'متابعة مستوى التنفيذ والانضباط ضمن واجهات قابلة للتقارير.' },
          { title: 'الحضور', description: 'تجهيز تجربة عرض حضور وانصراف ومؤشرات انتظام.' },
          { title: 'التقييم والتقارير', description: 'عرض نتائج الأداء ومخرجات المتابعة بشكل منظم.' },
        ]}
      />
    </PublicSection>
  )
}
