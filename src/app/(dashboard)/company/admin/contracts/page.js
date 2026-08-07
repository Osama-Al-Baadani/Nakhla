'use client'

import { FileCheck, FileSignature, FileSpreadsheet } from 'lucide-react'
import { CompanyWorkspacePage } from '../../../../../components/CompanyWorkspacePage'

export default function CompanyContractsManagementPage() {
  return (
    <CompanyWorkspacePage
      eyebrow="إدارة العقود"
      title="متابعة العقود والاتفاقيات"
      description="واجهة إدارية مخصصة لمتابعة عقود التوظيف والتعهيد، حالات الاعتماد، وتاريخ سريان الاتفاقيات."
      featureTitle="مميزات إدارة العقود"
      featureDescription="تصميم وواجهة منظمة لإبقاء الوثائق والعقود في متناول الفريق المعني."
      features={[
        {
          title: 'سجل العقود',
          description: 'عرض العقود النشطة، المنتهية، وتلك التي تحت الاعتماد.',
          icon: FileSignature,
        },
        {
          title: 'الاعتمادات والشروط',
          description: 'متابعة شروط الاتفاقية وملاحظات الأطراف قبل الاعتماد النهائي.',
          icon: FileCheck,
        },
        {
          title: 'التجميع والتقارير',
          description: 'إظهار بيانات العقود ضمن ملخصات تشغيلية عند اكتمال الربط.',
          icon: FileSpreadsheet,
        },
      ]}
    />
  )
}
