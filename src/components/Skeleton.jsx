import { cn } from '../lib/cn'

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-[16px] bg-slate-200/80',
        className,
      )}
      {...props}
    />
  )
}
