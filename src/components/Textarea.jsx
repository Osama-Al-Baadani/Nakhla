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
        <span className="block text-xs font-bold text-slate-800">{label}</span>
      ) : null}
      <textarea
        id={textareaId}
        className={cn(
          'min-h-32 w-full rounded-[24px] border border-slate-200/90 bg-white p-4 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-2xs transition-all duration-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 focus:outline-none hover:border-amber-300',
          error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10',
          className,
        )}
        {...props}
      />
      {error ? (
        <span className="block text-xs font-bold text-rose-600">{error}</span>
      ) : hint ? (
        <span className="block text-xs font-medium text-slate-500">{hint}</span>
      ) : null}
    </label>
  )
}
