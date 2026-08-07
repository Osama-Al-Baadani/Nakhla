import { Badge } from './Badge'

export function ApplicationStatusBadge({ status }) {
  if (!status) {
    return <Badge tone="neutral">غير محدد</Badge>
  }

  const toneMap = {
    pending: 'warning',
    accepted: 'brand',
    rejected: 'danger',
    interviewing: 'brand',
  }

  return <Badge tone={toneMap[status] || 'brand'}>{status}</Badge>
}
