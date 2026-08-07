import { TriangleAlert } from 'lucide-react'

export function ErrorState({ title, description, action }) {
  return (
    <div className="rounded-[24px] border border-[var(--danger-soft)] bg-white p-8 text-center shadow-sm">
      <div className="mx-auto grid size-14 place-items-center rounded-full bg-[var(--danger-soft)] text-[var(--danger)]">
        <TriangleAlert size={22} aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-serif text-2xl text-[var(--text)]">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--text-soft)]">
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}
