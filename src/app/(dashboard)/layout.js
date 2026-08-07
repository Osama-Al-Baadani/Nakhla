import { DashboardLayout } from '../../layouts/DashboardLayout'
import { ProtectedRoute } from '../../components/ProtectedRoute'

export default function DashboardRouteLayout({ children }) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  )
}
