import { Badge } from '../Badge'
import { Card } from '../Card'

const columnClasses = {
  '2': 'sm:grid-cols-2',
  '3': 'sm:grid-cols-2 lg:grid-cols-3',
  '4': 'sm:grid-cols-2 lg:grid-cols-4',
}

export function FeatureGrid({ items = [], columns = '3' }) {
  return (
    <div className={`grid gap-5 ${columnClasses[columns] || columnClasses['3']}`}>
      {items.map((item) => (
        <Card key={item.title} className="h-full bg-white">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-medium text-[var(--text)]">{item.title}</h3>
              {item.badge ? <Badge tone="neutral">{item.badge}</Badge> : null}
            </div>
            <p className="text-sm leading-8 text-[var(--text-soft)]">{item.description}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
