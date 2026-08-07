'use client'

import { useMemo } from 'react'
import { Building2, Eye, FilePenLine, Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../../../../components/Button'
import { Card } from '../../../../components/Card'
import { EmptyState } from '../../../../components/EmptyState'
import { ErrorState } from '../../../../components/ErrorState'
import { JobCard } from '../../../../components/JobCard'
import { PageHeader } from '../../../../components/PageHeader'
import { Skeleton } from '../../../../components/Skeleton'
import { useAuth } from '../../../../hooks/useAuth'
import { useJobs } from '../../../../hooks/useJobs'

export default function CompanyJobsPage() {
  const { user } = useAuth()

  const filters = useMemo(
    () => ({
      search: '',
      location: '',
      type: '',
      status: '',
      companyId: user?.id,
    }),
    [user?.id],
  )

  const { isLoading, isLoadingMore, jobs, totalCount, error, hasMore, loadMore } = useJobs(filters)

  const companyName = jobs[0]?.company_name ?? 'وظائف الشركة'

  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.96),_rgba(238,247,246,0.92))]">
        <PageHeader
          eyebrow="وظائف الشركة"
          title={companyName}
          description="عرض وتعديل جميع الوظائف المرتبطة بحساب الشركة الحالي والمخزنة في Firestore."
          actions={
            <div className="flex flex-wrap gap-3">
              <Link href="/jobs/create">
                <Button leadingIcon={<Plus size={16} aria-hidden="true" />}>إنشاء وظيفة</Button>
              </Link>
              <Link href="/company/dashboard">
                <Button variant="secondary">العودة إلى لوحة الشركة</Button>
              </Link>
            </div>
          }
        />
      </Card>

      <Card
        title="القائمة"
        description={isLoading ? 'جارٍ تحميل وظائف الشركة...' : `تم العثور على ${totalCount} وظيفة مرتبطة بهذه الشركة.`}
      >
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-3 rounded-[24px] border border-[var(--line)] bg-white p-5">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full rounded-[18px]" />
              </div>
            ))}
          </div>
        ) : error ? (
          <ErrorState title="تعذر تحميل وظائف الشركة" description={error} />
        ) : jobs.length === 0 ? (
          <EmptyState
            title="لا توجد وظائف لهذه الشركة"
            description="لم يتم العثور على وظائف مرتبطة بحساب الشركة الحالي."
            action={
              <Link href="/jobs/create">
                <Button leadingIcon={<Plus size={16} aria-hidden="true" />}>إنشاء أول وظيفة للشركة</Button>
              </Link>
            }
          />
        ) : (
          <div className="space-y-5">
            <div className="rounded-[20px] bg-[var(--surface-muted)] p-4 text-sm text-[var(--text-soft)]">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Building2 size={16} aria-hidden="true" className="text-teal-600" />
                {companyName}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <div key={job.id} className="space-y-3">
                  <JobCard job={job} />
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/jobs/${job.id}`}>
                      <Button variant="secondary" leadingIcon={<Eye size={16} aria-hidden="true" />}>
                        عرض التفاصيل
                      </Button>
                    </Link>
                    <Link href={`/jobs/${job.id}/edit`}>
                      <Button variant="ghost" leadingIcon={<FilePenLine size={16} aria-hidden="true" />}>
                        تعديل
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {hasMore ? (
              <div className="flex justify-center">
                <Button variant="secondary" onClick={loadMore} isLoading={isLoadingMore}>
                  تحميل المزيد
                </Button>
              </div>
            ) : null}
          </div>
        )}
      </Card>
    </section>
  )
}
