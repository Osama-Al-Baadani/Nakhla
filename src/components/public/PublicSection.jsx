import { cn } from '../../lib/cn'

export function PublicSection({
  eyebrow,
  title,
  description,
  children,
  className,
}) {
  return (
    <section className={cn('space-y-8', className)}>
      <div className="max-w-3xl space-y-4">
        {eyebrow ? (
          <p className="inline-flex rounded-full border border-[var(--line)] bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-[0.12em] text-[var(--brand)]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-serif text-3xl leading-tight text-[var(--text)] md:text-5xl">{title}</h2>
        {description ? <p className="max-w-2xl text-sm leading-8 text-[var(--text-soft)] md:text-base">{description}</p> : null}
      </div>
      {children}
    </section>
  )
}
