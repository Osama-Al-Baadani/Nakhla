'use client'

import { CalendarClock, ClipboardCheck, ScanLine } from 'lucide-react'
import { CompanyWorkspacePage } from '../../../../components/CompanyWorkspacePage'

export default function CompanyAttendancePage() {
  return (
    <CompanyWorkspacePage
      eyebrow="الحضور"
      title="متابعة الحضور والانضباط"
      description="صفحة مخصصة لعرض سجلات الحضور، التأخير، وساعات العمل ضمن تجربة واضحة للشركات وفرق التعهيد."
      featureTitle="عناصر صفحة الحضور"
      featureDescription="واجهة جاهزة لإظهار الحضور اليومي، ملخصات الدوام، والتنبيهات المتعلقة بالالتزام."
      features={[
        {
          title: 'سجل الحضور',
          description: 'عرض أيام الحضور والغياب والتأخير لكل موظف أو فريق عند توفر البيانات.',
          icon: ClipboardCheck,
        },
        {
          title: 'الجدول الزمني',
          description: 'مكان مخصص لعرض ساعات العمل، الورديات، ونقاط البداية والنهاية.',
          icon: CalendarClock,
        },
        {
          title: 'التتبع والتحقق',
          description: 'إمكانية إضافة آليات التحقق أو الاعتماد أو الربط بأجهزة الحضور لاحقًا.',
          icon: ScanLine,
        },
      ]}
    />
  )
}
