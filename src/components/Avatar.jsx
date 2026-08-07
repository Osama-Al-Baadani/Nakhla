import { User } from 'lucide-react'
import { cn } from '../lib/cn'

const sizeStyles = {
  sm: 'size-9 text-sm',
  md: 'size-11 text-sm',
  lg: 'size-14 text-base',
}

export function Avatar({
  name,
  src,
  size = 'md',
  fallbackIcon,
}) {
  const initials = name
    ?.split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--brand-soft)] font-semibold text-[var(--brand-strong)] shrink-0',
        sizeStyles[size] || sizeStyles.md,
      )}
      aria-label={name ?? 'صورة المستخدم'}
    >
      {src ? (
        <img src={src} alt={name ?? 'صورة'} className="h-full w-full object-cover" />
      ) : initials ? (
        <span>{initials}</span>
      ) : (
        fallbackIcon ?? <User size={18} aria-hidden="true" />
      )}
    </div>
  )
}
