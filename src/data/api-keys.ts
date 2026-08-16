export type ApiKeyStatus = "Activa" | "Revocada" | "Expirada"

export type ApiKey = {
  id: string
  name: string
  tokenPreview: string
  status: ApiKeyStatus
  createdAt: string
  lastUsed: string | null
  expiresAt: string | null
}

export const apiKeys: ApiKey[] = [
  { id: "k-01", name: "Integración de facturación", tokenPreview: "sk_live_••••••••a3f9", status: "Activa", createdAt: "2025-11-04T10:00:00Z", lastUsed: "2026-08-15T09:12:00Z", expiresAt: null },
  { id: "k-02", name: "Sincronización de inventario", tokenPreview: "sk_live_••••••••7c21", status: "Activa", createdAt: "2026-01-19T14:30:00Z", lastUsed: "2026-08-16T06:48:00Z", expiresAt: "2027-01-19T14:30:00Z" },
  { id: "k-03", name: "Webhook de pedidos", tokenPreview: "sk_live_••••••••be04", status: "Revocada", createdAt: "2025-06-02T08:15:00Z", lastUsed: "2026-03-11T17:26:00Z", expiresAt: null },
  { id: "k-04", name: "Exportador de informes", tokenPreview: "sk_live_••••••••15d8", status: "Expirada", createdAt: "2024-08-23T11:45:00Z", lastUsed: "2025-08-20T13:04:00Z", expiresAt: "2025-08-23T11:45:00Z" },
  { id: "k-05", name: "Panel de analítica", tokenPreview: "sk_live_••••••••9e67", status: "Activa", createdAt: "2026-04-07T09:20:00Z", lastUsed: null, expiresAt: "2026-10-07T09:20:00Z" },
  { id: "k-06", name: "Pasarela de pagos", tokenPreview: "sk_live_••••••••42ba", status: "Activa", createdAt: "2026-02-28T16:05:00Z", lastUsed: "2026-08-14T22:31:00Z", expiresAt: null },
  { id: "k-07", name: "Migración heredada", tokenPreview: "sk_live_••••••••c810", status: "Revocada", createdAt: "2025-03-14T07:50:00Z", lastUsed: "2025-05-29T10:42:00Z", expiresAt: null },
  { id: "k-08", name: "Entorno de pruebas QA", tokenPreview: "sk_live_••••••••6f35", status: "Activa", createdAt: "2026-07-11T13:10:00Z", lastUsed: "2026-08-09T15:19:00Z", expiresAt: "2026-10-09T13:10:00Z" },
]
