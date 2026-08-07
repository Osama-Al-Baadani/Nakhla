import { Card } from '../Card'

export function PublicCTA({ title, description, actions }) {
  return (
    <Card className="overflow-hidden border border-teal-200/80 bg-gradient-to-br from-teal-50/60 via-white to-amber-50/60 p-6 sm:p-10 shadow-lg">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">{title}</h2>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-600">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">{actions}</div>
      </div>
    </Card>
  )
}
