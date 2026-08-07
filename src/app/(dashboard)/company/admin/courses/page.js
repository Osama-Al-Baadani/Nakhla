'use client'

import { BookOpen, FolderGit2, GraduationCap } from 'lucide-react'
import { CompanyWorkspacePage } from '../../../../../components/CompanyWorkspacePage'

export default function CompanyCoursesManagementPage() {
  return (
    <CompanyWorkspacePage
      eyebrow="إدارة الدورات"
      title="إدارة البرامج والمسارات التدريبية"
      description="صفحة مخصصة لمتابعة الدورات التدريبية الخاصة بالشركة، المواد، وخريطة التأهيل المرتبطة بالمرشحين أو الموظفين."
      featureTitle="الأقسام التي ستعرضها الصفحة"
      featureDescription="تجربة جاهزة لتنظيم البرامج التدريبية ومتابعة المحتوى."
      features={[
        {
          title: 'قائمة الدورات',
          description: 'عرض الدورات الحالية، حالات التفعيل، والمسارات المرتبطة بالشركة.',
          icon: GraduationCap,
        },
        {
          title: 'المواد والمحتوى',
          description: 'تنظيم الفيديوهات، الملفات، والمستندات التدريبية في مكان واحد.',
          icon: BookOpen,
        },
        {
          title: 'ربط التأهيل بالوظائف',
          description: 'إتاحة ربط مسارات التدريب بالمتطلبات الوظيفية عند توفر الربط الخلفي.',
          icon: FolderGit2,
        },
      ]}
    />
  )
}
