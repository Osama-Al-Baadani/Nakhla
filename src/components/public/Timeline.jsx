import { Card } from '../Card'

export function Timeline({ items = [] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item) => (
        <Card key={item.title} className="h-full bg-white">
          <div className="space-y-4">
            {item.phase ? (
              <p className="text-sm font-semibold text-[var(--brand)]">{item.phase}</p>
            ) : null}
            <h3 className="text-lg font-medium text-[var(--text)]">{item.title}</h3>
            <p className="text-sm leading-8 text-[var(--text-soft)]">{item.description}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
