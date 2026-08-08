import { cn } from '../lib/cn'

export function Card({
  title,
  description,
  actions,
  children,
  className,
  ...props
}) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs transition-all duration-200 hover:border-slate-300 hover:shadow-sm',
        className,
      )}
      {...props}
    >
      {title || description || actions ? (
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3.5 mb-4">
          <div>
            {title ? (
              <h3 className="font-serif text-lg sm:text-xl font-black text-slate-900 tracking-tight">{title}</h3>
            ) : null}
            {description ? (
              <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-500 font-medium">
                {description}
              </p>
            ) : null}
          </div>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </div>
      ) : null}
      <div>{children}</div>
    </section>
  )
}
