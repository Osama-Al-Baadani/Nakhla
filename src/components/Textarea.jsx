import { cn } from '../lib/cn'

export function Textarea({
  label,
  hint,
  error,
  className,
  id,
  ...props
}) {
  const textareaId = id ?? props.name

  return (
    <label className="block space-y-1.5" htmlFor={textareaId}>
      {label ? (
        <span className="block text-xs sm:text-sm font-semibold text-slate-700">{label}</span>
      ) : null}
      <textarea
        id={textareaId}
        className={cn(
          'min-h-32 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 shadow-sm transition-all duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none hover:border-slate-300',
          error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20',
          className,
        )}
        {...props}
      />
      {error ? (
        <span className="block text-xs font-medium text-rose-600">{error}</span>
      ) : hint ? (
        <span className="block text-xs text-slate-500">{hint}</span>
      ) : null}
    </label>
  )
}
