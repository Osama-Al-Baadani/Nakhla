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
        'rounded-[28px] border border-slate-200/80 bg-white/95 p-5 sm:p-7 shadow-xs backdrop-blur-md transition-all duration-300 hover:border-teal-200 hover:shadow-md',
        className,
      )}
      {...props}
    >
      {title || description || actions ? (
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100/80 pb-4 mb-5">
          <div>
            {title ? (
              <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">{title}</h3>
            ) : null}
            {description ? (
              <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-500 max-w-2xl font-medium">
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
