import { cn } from '../lib/cn'

const toneStyles = {
  brand: 'bg-teal-50 text-teal-700 border border-teal-200/80',
  neutral: 'bg-slate-100 text-slate-700 border border-slate-200/80',
  warning: 'bg-amber-50 text-amber-800 border border-amber-200/80',
  danger: 'bg-rose-50 text-rose-700 border border-rose-200/80',
}

export function Badge({ children, tone = 'neutral', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] sm:text-xs font-semibold tracking-tight transition-colors select-none',
        toneStyles[tone] || toneStyles.neutral,
        className,
      )}
    >
      {children}
    </span>
  )
}
