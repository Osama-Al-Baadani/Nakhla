import { ChevronDown } from 'lucide-react'
import { cn } from '../lib/cn'

export function Select({
  label,
  hint,
  error,
  className,
  id,
  options = [],
  ...props
}) {
  const selectId = id ?? props.name

  return (
    <label className="block space-y-1.5" htmlFor={selectId}>
      {label ? (
        <span className="block text-xs font-bold text-slate-800">{label}</span>
      ) : null}
      <span className="relative block">
        <select
          id={selectId}
          className={cn(
            'w-full appearance-none rounded-full border border-slate-200/90 bg-white px-4 py-2.5 pe-10 text-xs sm:text-sm font-semibold text-slate-900 shadow-2xs transition-all duration-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 focus:outline-none hover:border-amber-300',
            error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10',
            className,
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
          aria-hidden="true"
        />
      </span>
      {error ? (
        <span className="block text-xs font-bold text-rose-600">{error}</span>
      ) : hint ? (
        <span className="block text-xs font-medium text-slate-500">{hint}</span>
      ) : null}
    </label>
  )
}
