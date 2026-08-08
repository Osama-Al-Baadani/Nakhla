import { cn } from '../lib/cn'

const toneStyles = {
  brand: 'bg-teal-50 text-teal-800 border border-teal-200/90 shadow-2xs',
  gold: 'bg-gradient-to-r from-amber-50 to-yellow-100/70 text-amber-900 border border-amber-300/80 shadow-2xs',
  neutral: 'bg-slate-100 text-slate-700 border border-slate-200/80',
  warning: 'bg-amber-50 text-amber-900 border border-amber-300/80 shadow-2xs',
  danger: 'bg-rose-50 text-rose-800 border border-rose-200/90 shadow-2xs',
}

export function Badge({ children, tone = 'neutral', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-[11px] sm:text-xs font-bold tracking-tight transition-all duration-200 select-none',
        toneStyles[tone] || toneStyles.neutral,
        className,
      )}
    >
      {children}
    </span>
  )
}
