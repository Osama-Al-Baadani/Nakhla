'use client'

import { BriefcaseBusiness, Clock3, UsersRound } from 'lucide-react'
import { CompanyWorkspacePage } from '../../../../components/CompanyWorkspacePage'

export default function CompanyOutsourcingRequestsPage() {
  return (
    <CompanyWorkspacePage
      eyebrow="التعهيد"
      title="طلب موظفين بنظام التعهيد الخارجي"
      description="مساحة مهيأة للشركات لطلب عدد الموظفين، تحديد المهارات المطلوبة، وإدارة ساعات العمل والمتابعة التشغيلية ضمن نموذج واضح."
      featureTitle="ما الذي ستدعمه تجربة التعهيد؟"
      featureDescription="تم ترتيب الواجهة لتناسب سيناريوهات التعهيد الفعلية للشركات، مع قابلية إضافة النماذج والحالات والاعتمادات لاحقًا."
      features={[
        {
          title: 'طلبات القوى العاملة',
          description: 'إنشاء طلبات تعهيد بحسب العدد، الدور، الموقع، ونوع المهام المطلوبة.',
          icon: UsersRound,
        },
        {
          title: 'ساعات العمل',
          description: 'إظهار جداول العمل أو الاحتياج الزمني المتوقع لكل طلب تعهيد.',
          icon: Clock3,
        },
        {
          title: 'متابعة الطلبات',
          description: 'تتبع حالة طلب التعهيد من الإنشاء وحتى التفعيل والتشغيل.',
          icon: BriefcaseBusiness,
        },
      ]}
      quickLinks={[
        {
          title: 'صفحة التعهيد العامة',
          description: 'عرض صياغة الخدمة العامة المخصصة للشركات على الموقع.',
          to: '/outsourcing',
        },
      ]}
    />
  )
}
