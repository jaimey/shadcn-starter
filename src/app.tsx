import { lazy, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router"
import { ProtectedRoute } from "@/components/protected-route"
import { AppLayout } from "@/layouts/app-layout"
import { ApiKeysPage } from "@/pages/api-keys-page"
import { DashboardPage } from "@/pages/dashboard-page"
import { LoginPage } from "@/pages/login-page"
import { ProfilePage } from "@/pages/profile-page"
import { UsersPage } from "@/pages/users-page"

const UiKitPage = lazy(() =>
  import("@/pages/ui-kit/ui-kit-page").then((module) => ({
    default: module.UiKitPage,
  })),
)

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/ui-kit"
        element={
          <Suspense
            fallback={
              <div className="p-6 text-sm text-muted-foreground">
                Cargando UI Kit…
              </div>
            }
          >
            <UiKitPage />
          </Suspense>
        }
      />
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
