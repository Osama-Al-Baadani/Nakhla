import { cn } from '../lib/cn'

const variantStyles = {
  primary:
    'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md shadow-teal-600/20 hover:from-teal-700 hover:to-teal-800 hover:shadow-lg hover:shadow-teal-600/30 active:scale-[0.98]',
  secondary:
    'border border-slate-200 bg-white text-slate-800 shadow-2xs hover:bg-amber-50/50 hover:border-amber-300 hover:text-slate-900 active:scale-[0.98]',
  gold:
    'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/20 hover:from-amber-600 hover:to-amber-700 hover:shadow-lg hover:shadow-amber-500/30 active:scale-[0.98]',
  ghost:
    'bg-transparent text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 active:scale-[0.98]',
  danger:
    'bg-rose-600 text-white shadow-md shadow-rose-600/20 hover:bg-rose-700 active:scale-[0.98]',
}

const sizeStyles = {
  sm: 'h-9 px-4 text-xs font-bold rounded-full',
  md: 'h-11 px-5 text-xs sm:text-sm font-bold rounded-full',
  lg: 'h-12 px-7 text-sm sm:text-base font-bold rounded-full',
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
        'inline-flex items-center justify-center gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 select-none tracking-tight',
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
