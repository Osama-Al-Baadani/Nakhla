'use client'

import { KeyRound, UserCog, Users } from 'lucide-react'
import { CompanyWorkspacePage } from '../../../../../components/CompanyWorkspacePage'

export default function CompanyUsersManagementPage() {
  return (
    <CompanyWorkspacePage
      eyebrow="إدارة المستخدمين"
      title="إدارة مستخدمي الشركة وصلاحياتهم"
      description="واجهة إدارية لتنظيم المستخدمين المرتبطين بحساب الشركة، توزيع الأدوار، ومتابعة الوصول الداخلي عند توفر دعم الباك اند."
      featureTitle="وظائف الإدارة المتوقعة"
      featureDescription="تم ترتيب الصفحة لتناسب إدارة فريق الشركة بشكل منظم وآمن."
      features={[
        {
          title: 'قائمة المستخدمين',
          description: 'عرض أعضاء الفريق أو المشرفين المرتبطين بحساب الشركة.',
          icon: Users,
        },
        {
          title: 'توزيع الأدوار',
          description: 'مكان واضح لتخصيص الصلاحيات والمسؤوليات لكل مستخدم.',
          icon: UserCog,
        },
        {
          title: 'صلاحيات الوصول',
          description: 'تجهيز الواجهة لإدارة الوصول إلى الوظائف، التقارير، والعقود وغيرها.',
          icon: KeyRound,
        },
      ]}
    />
  )
}
