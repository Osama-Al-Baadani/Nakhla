'use client'

export function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1.5">
        {eyebrow ? (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-2.5 py-0.5 text-[11px] font-black text-amber-900 border border-amber-300/80 shadow-2xs">
            <span>✦</span>
            <span>{eyebrow}</span>
          </div>
        ) : null}
        <h1 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2.5 sm:shrink-0">{actions}</div>
      ) : null}
    </div>
  )
}
