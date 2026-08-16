import type { ReactNode } from "react"
import { Navigate } from "react-router"
import { useAuth } from "@/lib/auth"

// Esto solo decide qué renderizar, no es un guardia de autorización: mira
// si hay un usuario en el estado del cliente (falsificable, ver
// `src/lib/auth.tsx`) y redirige si no lo hay. No protege ninguna API
// porque aquí no existe ninguna. Un backend real necesita repetir esta
// comprobación en el servidor, no confiar en esta pantalla.
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}
