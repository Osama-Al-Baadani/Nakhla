import { Avatar } from '../Avatar'
import { Badge } from '../Badge'
import { Card } from '../Card'

export function TestimonialGrid({ items = [] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.name} className="h-full bg-white">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar name={item.name} />
              <div>
                <p className="font-medium text-[var(--text)]">{item.name}</p>
                <Badge tone="warning">{item.role}</Badge>
              </div>
            </div>
            <p className="text-sm leading-8 text-[var(--text-soft)]">{item.quote}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
