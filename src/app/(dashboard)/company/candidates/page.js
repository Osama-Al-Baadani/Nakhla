'use client'

import { FileSearch, UserRoundCheck, Users } from 'lucide-react'
import { CompanyWorkspacePage } from '../../../../components/CompanyWorkspacePage'

export default function CompanyCandidatesPage() {
  return (
    <CompanyWorkspacePage
      eyebrow="المرشحون"
      title="استعراض المرشحين والمتقدمين"
      description="واجهة مخصصة لعرض المرشحين المرتبطين بوظائف الشركة، ومراجعة الملفات الأساسية، والانتقال إلى الطلبات والتفاصيل عند اكتمال الربط الخلفي."
      featureTitle="ما الذي ستدعمه هذه الصفحة؟"
      featureDescription="جهزنا تجربة واضحة لمراجعة المرشحين، الفرز الأولي، والانتقال إلى ملفاتهم المرتبطة بالوظائف."
      features={[
        {
          title: 'قائمة المرشحين',
          description: 'عرض منظّم للمرشحين المرتبطين بكل وظيفة مع حالات التقديم والتنقل إلى التفاصيل.',
          icon: Users,
        },
        {
          title: 'المراجعة الأولية',
          description: 'مكان مناسب لاستعراض البيانات الأساسية قبل المقابلة أو الانتقال لمرحلة الترشيح التالية.',
          icon: UserRoundCheck,
        },
        {
          title: 'البحث والفرز',
          description: 'واجهة جاهزة لإضافة البحث، الفلاتر، وحالة الطلب عند توفر الربط الخلفي.',
          icon: FileSearch,
        },
      ]}
      quickLinks={[
        {
          title: 'المتقدمون حسب الوظيفة',
          description: 'الانتقال إلى صفحات المتقدمين الحالية لكل وظيفة منشورة.',
          to: '/company/dashboard',
        },
      ]}
    />
  )
}
