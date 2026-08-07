'use client'

import { BarChart, FileBarChart2, LineChart } from 'lucide-react'
import { CompanyWorkspacePage } from '../../../../../components/CompanyWorkspacePage'

export default function CompanyReportsManagementPage() {
  return (
    <CompanyWorkspacePage
      eyebrow="إدارة التقارير"
      title="التقارير والتحليلات التشغيلية"
      description="صفحة تجمع تقارير الأداء، ملخصات التوظيف، ونسب الحضور والانضباط ضمن لوحات تحليلية."
      featureTitle="أنواع التقارير المتوقعة"
      featureDescription="واجهة مرنة لإظهار الرسومات البيانية والمؤشرات بعد ربط مصدر البيانات."
      features={[
        {
          title: 'تقارير التوظيف',
          description: 'تحليل عدد الوظائف، المتقدمين، ومعدل قبول المرشحين.',
          icon: FileBarChart2,
        },
        {
          title: 'تقارير الحضور والالتزام',
          description: 'متابعة الساعات، التأخير، ومؤشرات الانضباط الدوري.',
          icon: BarChart,
        },
        {
          title: 'تحليلات الأداء العام',
          description: 'مقارنة نتائج التشغيل بين الفترات وتحديد نقاط التحسين.',
          icon: LineChart,
        },
      ]}
    />
  )
}
