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
        <span className="block text-xs sm:text-sm font-semibold text-slate-700">{label}</span>
      ) : null}
      <span className="relative block">
        <select
          id={selectId}
          className={cn(
            'w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pe-11 text-xs sm:text-sm text-slate-800 shadow-sm transition-all duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none hover:border-slate-300',
            error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20',
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
        <span className="block text-xs font-medium text-rose-600">{error}</span>
      ) : hint ? (
        <span className="block text-xs text-slate-500">{hint}</span>
      ) : null}
    </label>
  )
}
