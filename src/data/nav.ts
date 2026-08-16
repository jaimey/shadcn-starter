import { LayoutDashboard, Settings, User } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type NavItem = {
  title: string
  url: string
  icon: LucideIcon
  items?: { title: string; url: string }[]
}

export const navMain: NavItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  {
    title: "Configuración",
    url: "/settings",
    icon: Settings,
    items: [
      { title: "Usuarios", url: "/settings/users" },
      { title: "API Keys", url: "/settings/api-keys" },
    ],
  },
  { title: "Perfil", url: "/profile", icon: User },
]

export const breadcrumbLabels: Record<string, string> = {
  dashboard: "Dashboard",
  settings: "Configuración",
  users: "Usuarios",
  "api-keys": "API Keys",
  profile: "Perfil",
}
