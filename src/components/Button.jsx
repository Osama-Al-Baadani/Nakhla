import { cn } from '../lib/cn'

const variantStyles = {
  primary:
    'bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 text-white shadow-sm shadow-emerald-800/20 hover:from-emerald-900 hover:to-teal-800 hover:shadow-md active:scale-[0.98]',
  secondary:
    'border border-slate-200/90 bg-white text-slate-800 shadow-2xs hover:bg-amber-50/60 hover:border-amber-300 hover:text-slate-900 active:scale-[0.98]',
  gold:
    'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-sm shadow-amber-600/20 hover:from-amber-700 hover:to-amber-800 hover:shadow-md active:scale-[0.98]',
  ghost:
    'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98]',
  danger:
    'bg-rose-600 text-white shadow-sm shadow-rose-600/20 hover:bg-rose-700 active:scale-[0.98]',
}

const sizeStyles = {
  sm: 'h-9 px-3.5 text-xs font-bold rounded-xl',
  md: 'h-10 px-4 text-xs sm:text-sm font-bold rounded-xl',
  lg: 'h-12 px-6 text-sm sm:text-base font-bold rounded-2xl',
}

export function Button({
  className,
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  leadingIcon,
  trailingIcon,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 select-none tracking-tight font-sans',
        variantStyles[variant] || variantStyles.primary,
        sizeStyles[size] || sizeStyles.md,
        className,
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {leadingIcon}
      <span>{isLoading ? 'جارٍ التنفيذ...' : children}</span>
      {trailingIcon}
    </button>
  )
}
