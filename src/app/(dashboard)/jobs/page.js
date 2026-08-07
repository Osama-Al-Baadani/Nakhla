'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '../../../components/Button'
import { Card } from '../../../components/Card'
import { EmptyState } from '../../../components/EmptyState'
import { ErrorState } from '../../../components/ErrorState'
import { Input } from '../../../components/Input'
import { JobCard } from '../../../components/JobCard'
import { PageHeader } from '../../../components/PageHeader'
import { Skeleton } from '../../../components/Skeleton'
import { useJobs } from '../../../hooks/useJobs'

const initialFilters = {
  search: '',
  location: '',
  type: '',
  status: '',
}

export default function JobsListPage() {
  const [draftFilters, setDraftFilters] = useState(initialFilters)
  const [filters, setFilters] = useState(initialFilters)
  const { isLoading, isLoadingMore, jobs, totalCount, error, hasMore, loadMore } =
    useJobs(filters)

  const hasActiveFilters = useMemo(
    () =>
      Boolean(filters.search || filters.location || filters.type || filters.status),
    [filters],
  )

  function handleSearchSubmit(event) {
    event.preventDefault()
    setFilters(draftFilters)
  }

  function resetFilters() {
    setDraftFilters(initialFilters)
    setFilters(initialFilters)
  }

  return (
    <section className="space-y-5">
      <Card className="bg-[linear-gradient(140deg,_rgba(255,255,255,0.95),_rgba(237,245,252,0.9))]">
        <PageHeader
          eyebrow="الوظائف"
          title="استعراض الوظائف المتاحة"
          description="يتم جلب النتائج مباشرة من جدول jobs الحالي فقط، مع بحث وفلاتر تعتمد على الأعمدة الموجودة في المخطط."
        />
      </Card>

      <Card
        title="البحث والفلاتر"
        description="ابحث باستخدام العنوان أو اسم الشركة أو الوصف، وفلتر حسب الموقع والنوع والحالة."
      >
        <form className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]" onSubmit={handleSearchSubmit}>
          <Input
            label="البحث"
            value={draftFilters.search}
            onChange={(event) =>
              setDraftFilters((current) => ({ ...current, search: event.target.value }))
            }
            placeholder="ابحث بالعنوان أو الشركة أو الوصف"
          />
          <Input
            label="الموقع"
            value={draftFilters.location}
            onChange={(event) =>
              setDraftFilters((current) => ({ ...current, location: event.target.value }))
            }
            placeholder="مثال: الرياض"
          />
          <Input
            label="نوع الوظيفة"
            value={draftFilters.type}
            onChange={(event) =>
              setDraftFilters((current) => ({ ...current, type: event.target.value }))
            }
            placeholder="مثال: Full-time"
          />
          <Input
            label="الحالة"
            value={draftFilters.status}
            onChange={(event) =>
              setDraftFilters((current) => ({ ...current, status: event.target.value }))
            }
            placeholder="مثال: open"
          />
          <div className="flex items-end gap-3 sm:col-span-2 lg:col-span-1">
            <Button
              type="submit"
              className="w-full lg:w-auto"
              leadingIcon={<Search size={16} aria-hidden="true" />}
            >
              تطبيق
            </Button>
            {hasActiveFilters ? (
              <Button type="button" variant="secondary" onClick={resetFilters}>
                إعادة ضبط
              </Button>
            ) : null}
          </div>
        </form>
      </Card>

      <Card
        title="النتائج"
        description={
          isLoading
            ? 'جار تحميل الوظائف...'
            : `تم العثور على ${totalCount} وظيفة بناءً على المعايير الحالية.`
        }
      >
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-3 rounded-[24px] border border-[var(--line)] bg-white p-5">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-10 w-32 rounded-[14px]" />
              </div>
            ))}
          </div>
        ) : error ? (
          <ErrorState title="تعذر تحميل الوظائف" description={error} />
        ) : jobs.length === 0 ? (
          <EmptyState
            title="لا توجد وظائف مطابقة"
            description="لم يتم العثور على نتائج مطابقة للبحث أو الفلاتر الحالية."
          />
        ) : (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
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
