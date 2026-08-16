/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { DEMO_CREDENTIALS, users, type User } from "@/data/users"

// Autenticación simulada: no hay backend detrás de este módulo. `login`
// valida contra una credencial fija y guarda el usuario completo —
// incluido `role`— en localStorage, que aquí actúa como fuente de verdad.
// Esa entrada es editable desde las devtools, así que `role` es
// falsificable y jamás debe usarse para autorizar nada en un backend real.
// Tampoco hay token, expiración ni renovación (la sesión simulada no
// caduca) ni propagación de `logout` entre pestañas. Al portar esto a un
// backend real, sustitúyelo por un token emitido por el servidor y valida
// permisos ahí, no en el cliente.
const STORAGE_KEY = "shadcn-starter.session"
const FAKE_LATENCY_MS = 800

type AuthContextValue = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateName: (name: string) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function isStoredUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.email === "string" &&
    typeof candidate.role === "string"
  )
}

function readStoredUser(): User | null {
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    if (!isStoredUser(parsed)) {
      window.localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return parsed
  } catch {
    window.localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readStoredUser)

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, FAKE_LATENCY_MS))
    const matches =
      email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
      password === DEMO_CREDENTIALS.password
    if (!matches) {
      throw new Error("Email o contraseña incorrectos.")
    }
    const demoUser = users.find((candidate) => candidate.email === DEMO_CREDENTIALS.email)
    if (!demoUser) {
      throw new Error("No se encontró el usuario de demostración.")
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser))
    setUser(demoUser)
  }, [])

  const logout = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  const updateName = useCallback((name: string) => {
    setUser((current) => {
      if (!current) return current
      const next = { ...current, name }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ user, login, logout, updateName }),
    [user, login, logout, updateName],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider.")
  }
  return context
}
