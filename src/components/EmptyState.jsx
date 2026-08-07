import { FileSearch } from 'lucide-react'

export function EmptyState({ title, description, action, icon: Icon = FileSearch }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 p-8 sm:p-12 text-center backdrop-blur-sm">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-teal-50 text-teal-600 shadow-sm border border-teal-100">
        <Icon size={26} aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-serif text-xl sm:text-2xl font-bold text-slate-800">{title}</h3>
      <p className="mx-auto mt-2 max-w-lg text-xs sm:text-sm leading-relaxed text-slate-500">
        {description}
      </p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  )
}
