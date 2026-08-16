import { Navigate, Route, Routes } from "react-router"
import { ProtectedRoute } from "@/components/protected-route"
import { AppLayout } from "@/layouts/app-layout"
import { ApiKeysPage } from "@/pages/api-keys-page"
import { DashboardPage } from "@/pages/dashboard-page"
import { LoginPage } from "@/pages/login-page"
import { ProfilePage } from "@/pages/profile-page"
import { UsersPage } from "@/pages/users-page"

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/settings/users" element={<UsersPage />} />
        <Route path="/settings/api-keys" element={<ApiKeysPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
