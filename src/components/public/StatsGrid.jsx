import { Card } from '../Card'

export function StatsGrid({ items = [] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="bg-white">
          <div className="space-y-3">
            <p className="font-serif text-4xl text-[var(--text)]">{item.value}</p>
            <p className="text-base font-medium text-[var(--text)]">{item.label}</p>
            <p className="text-sm leading-7 text-[var(--text-soft)]">{item.note}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
