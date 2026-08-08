'use client'

import { useMemo, useState } from 'react'
import { BriefcaseBusiness, FilterX, MapPin, Search } from 'lucide-react'
import { Badge } from '../../../components/Badge'
import { Button } from '../../../components/Button'
import { Card } from '../../../components/Card'
import { EmptyState } from '../../../components/EmptyState'
import { ErrorState } from '../../../components/ErrorState'
import { Input } from '../../../components/Input'
import { JobCard } from '../../../components/JobCard'
import { PageHeader } from '../../../components/PageHeader'
import { Select } from '../../../components/Select'
import { Skeleton } from '../../../components/Skeleton'
import { useJobs } from '../../../hooks/useJobs'

const typeOptions = [
  { label: 'جميع أنواع الوظائف', value: '' },
  { label: 'دوام كامل', value: 'full-time' },
  { label: 'دوام جزئي', value: 'part-time' },
  { label: 'عن بُعد', value: 'remote' },
  { label: 'هجين', value: 'hybrid' },
  { label: 'تعاقد', value: 'contract' },
]

const statusOptions = [
  { label: 'جميع الحالات', value: '' },
  { label: 'نشطة', value: 'open' },
  { label: 'مسودة', value: 'draft' },
  { label: 'مغلقة', value: 'closed' },
]

const initialFilters = {
  search: '',
  location: '',
  type: '',
  status: '',
}

export default function JobsListPage() {
  const [draftFilters, setDraftFilters] = useState(initialFilters)
  const [filters, setFilters] = useState(initialFilters)
  const { isLoading, isLoadingMore, jobs, totalCount, error, hasMore, loadMore } = useJobs(filters)

  const hasActiveFilters = useMemo(
    () => Boolean(filters.search || filters.location || filters.type || filters.status),
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
    <section className="space-y-6 animate-slide-up">
      
      {/* Luxury Cream Gold Pill Header Banner */}
      <div className="luxury-cream-banner p-6 sm:p-8">
        <PageHeader
          eyebrow="الفرص والوظائف"
          title="استعراض الوظائف الشاغرة"
          description="استكشف أحدث الوظائف المتاحة بالمنشآت المعتمدة، وتقدم بطلبك مباشرة عبر Firestore."
          actions={
            <Badge tone="gold" className="text-xs px-3.5 py-1.5 font-bold">
              {totalCount} فرصة متاحة
            </Badge>
          }
        />
      </div>

      {/* Advanced Search & Filter Bar */}
      <Card
        title="البحث والتصفية"
        description="ابحث بالعنوان، الشركة، أو الموقع للوصول السريع للفرص المناسبة."
      >
        <form className="space-y-4" onSubmit={handleSearchSubmit}>
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            <Input
              label="بحث بالكلمات"
              icon={Search}
              value={draftFilters.search}
              onChange={(event) =>
                setDraftFilters((current) => ({ ...current, search: event.target.value }))
              }
              placeholder="اسم الوظيفة أو الشركة..."
            />
            <Input
              label="الموقع / المدينة"
              icon={MapPin}
              value={draftFilters.location}
              onChange={(event) =>
                setDraftFilters((current) => ({ ...current, location: event.target.value }))
              }
              placeholder="الرياض / جدة / عن بُعد..."
            />
            <Select
              label="نوع الوظيفة"
              value={draftFilters.type}
              onChange={(event) =>
                setDraftFilters((current) => ({ ...current, type: event.target.value }))
              }
              options={typeOptions}
            />
            <Select
              label="حالة الوظيفة"
              value={draftFilters.status}
              onChange={(event) =>
                setDraftFilters((current) => ({ ...current, status: event.target.value }))
              }
              options={statusOptions}
            />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            {hasActiveFilters ? (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={resetFilters}
                leadingIcon={<FilterX size={16} />}
              >
                إعادة ضبط الفلاتر
              </Button>
            ) : null}
            <Button
              type="submit"
              size="sm"
              leadingIcon={<Search size={16} />}
            >
              تطبيق التصفية
            </Button>
          </div>
        </form>
      </Card>

      {/* Jobs Results List */}
      <Card
        title="نتائج الوظائف المنشورة"
        description={
          isLoading
            ? 'جارٍ تحميل الوظائف...'
            : `عرض ${jobs.length} من أصل ${totalCount} فرصة وظيفية متاحة.`
        }
      >
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-3 rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xs">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-16 w-full rounded-2xl" />
                <Skeleton className="h-9 w-32 rounded-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          <ErrorState title="تعذر تحميل الوظائف" description={error} />
        ) : jobs.length === 0 ? (
          <EmptyState
            title="لا توجد وظائف مطابقة"
            description="لم نتمكن من العثور على نتائج مطابقة للبحث الحالي. جرب تغيير فلاتر البحث."
            action={
              hasActiveFilters ? (
                <Button variant="secondary" onClick={resetFilters}>
                  عرض كافة الوظائف
                </Button>
              ) : null
            }
          />
        ) : (
          <div className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {hasMore ? (
              <div className="flex justify-center pt-4">
                <Button variant="secondary" onClick={loadMore} isLoading={isLoadingMore}>
                  تحميل المزيد من الوظائف
                </Button>
              </div>
            ) : null}
          </div>
        )}
      </Card>
    </section>
  )
}
