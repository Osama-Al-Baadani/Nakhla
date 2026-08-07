'use client'

import { ApplicationCard } from '../../../components/ApplicationCard'
import { Card } from '../../../components/Card'
import { EmptyState } from '../../../components/EmptyState'
import { ErrorState } from '../../../components/ErrorState'
import { PageHeader } from '../../../components/PageHeader'
import { Skeleton } from '../../../components/Skeleton'
import { useAuth } from '../../../hooks/useAuth'
import { useMyApplications } from '../../../hooks/useMyApplications'

export default function MyApplicationsPage() {
  const { user } = useAuth()
  const { isLoading, applications, error, isRlsBlocked } = useMyApplications(user?.id)

  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.96),_rgba(237,246,252,0.92))]">
        <PageHeader
          eyebrow="طلباتي"
          title="متابعة طلبات التقديم"
          description="يمكنك من هنا مراجعة طلباتك الحالية ومعرفة حالة كل طلب والبيانات المرتبطة به."
        />
      </Card>

      <Card
        title="قائمة الطلبات"
        description={
          isLoading ? 'جار تحميل طلبات التقديم...' : `إجمالي الطلبات: ${applications.length}`
        }
      >
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-48 w-full rounded-[22px]" />
            ))}
          </div>
        ) : error ? (
          <ErrorState
            title={isRlsBlocked ? 'الوصول إلى طلباتك محجوب' : 'تعذر تحميل الطلبات'}
            description={error}
          />
        ) : applications.length === 0 ? (
          <EmptyState
            title="لا توجد طلبات تقديم بعد"
            description="عند التقديم على وظيفة ستظهر هنا حالة الطلب وبياناته المرتبطة."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {applications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        )}
      </Card>
    </section>
  )
}
