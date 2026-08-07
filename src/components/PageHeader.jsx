'use client'

export function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 mb-2">
      <div className="space-y-1">
        {eyebrow ? (
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-600">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {description ? (
          <p className="mt-1.5 max-w-3xl text-xs sm:text-sm leading-relaxed text-slate-500">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2 sm:gap-3">{actions}</div> : null}
    </div>
  )
}
