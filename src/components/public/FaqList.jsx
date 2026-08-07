import { Card } from '../Card'

export function FaqList({ items = [] }) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <Card key={item.question} className="bg-white">
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-[var(--text)]">{item.question}</h3>
            <p className="text-sm leading-8 text-[var(--text-soft)]">{item.answer}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
