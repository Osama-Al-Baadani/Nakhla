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
        'rounded-[24px] border border-slate-200/80 bg-white/90 p-5 sm:p-6 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-slate-300 hover:shadow-md',
        className,
      )}
      {...props}
    >
      {title || description || actions ? (
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            {title ? (
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">{title}</h3>
            ) : null}
            {description ? (
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-500 max-w-2xl">
                {description}
              </p>
            ) : null}
          </div>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </div>
      ) : null}
      <div className={title || description || actions ? 'mt-5' : ''}>{children}</div>
    </section>
  )
}
