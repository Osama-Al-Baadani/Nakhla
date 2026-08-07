import { Badge } from './Badge'
import { getDevAuthRole, isDevAuthBypassEnabled } from '../lib/dev-auth'
import { getRoleLabel } from '../lib/roles'

export function DevAuthBadge() {
  if (!isDevAuthBypassEnabled) {
    return null
  }

  return <Badge tone="warning">{`وضع المعاينة التطويري - ${getRoleLabel(getDevAuthRole())}`}</Badge>
}
