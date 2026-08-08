import { cn } from '../lib/cn'

export function Input({ label, hint, error, className, id, icon: Icon, ...props }) {
  const inputId = id ?? props.name

  return (
    <label className="block space-y-1.5" htmlFor={inputId}>
      {label ? (
        <span className="block text-xs font-bold text-slate-800">{label}</span>
      ) : null}
      <div className="relative">
        {Icon ? (
          <Icon size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        ) : null}
        <input
          id={inputId}
          className={cn(
            'w-full rounded-full border border-slate-200/90 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 shadow-2xs transition-all duration-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 focus:outline-none hover:border-amber-300',
            Icon && 'pr-10',
            error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10',
            className,
          )}
          {...props}
        />
      </div>
      {error ? (
        <span className="block text-xs font-bold text-rose-600">{error}</span>
      ) : hint ? (
        <span className="block text-xs font-medium text-slate-500">{hint}</span>
      ) : null}
    </label>
  )
}
