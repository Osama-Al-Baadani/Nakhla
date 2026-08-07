import { cn } from '../lib/cn'

const variantStyles = {
  primary:
    'bg-teal-600 text-white shadow-md shadow-teal-600/20 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-600/30 active:scale-[0.98]',
  secondary:
    'border border-slate-200 bg-white text-slate-800 shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 active:scale-[0.98]',
  ghost:
    'bg-transparent text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 active:scale-[0.98]',
  danger:
    'bg-rose-600 text-white shadow-md shadow-rose-600/20 hover:bg-rose-700 active:scale-[0.98]',
}

const sizeStyles = {
  sm: 'h-9 px-3.5 text-xs font-semibold rounded-xl',
  md: 'h-11 px-4 text-xs sm:text-sm font-semibold rounded-xl',
  lg: 'h-12 px-6 text-sm sm:text-base font-semibold rounded-2xl',
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
        'inline-flex items-center justify-center gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 select-none',
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
