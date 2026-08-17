export type UserRole = "Administrador" | "Editor" | "Visor"
export type UserStatus = "Activo" | "Inactivo" | "Pendiente"

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  createdAt: string
  lastLogin: string
}

export const DEMO_CREDENTIALS = {
  email: "admin@example.com",
  password: "password",
}

export const users: User[] = [
  { id: "u-01", name: "Ana Torres", email: "admin@example.com", role: "Administrador", status: "Activo", createdAt: "2023-01-15T09:00:00Z", lastLogin: "2026-08-15T08:42:00Z" },
  { id: "u-02", name: "Bruno Salas", email: "bruno.salas@acme.com", role: "Editor", status: "Activo", createdAt: "2023-02-03T11:20:00Z", lastLogin: "2026-08-14T17:05:00Z" },
  { id: "u-03", name: "Carla Méndez", email: "carla.mendez@acme.com", role: "Visor", status: "Inactivo", createdAt: "2023-02-27T14:45:00Z", lastLogin: "2025-11-02T10:15:00Z" },
  { id: "u-04", name: "Diego Ferrer", email: "diego.ferrer@acme.com", role: "Editor", status: "Activo", createdAt: "2023-03-11T08:30:00Z", lastLogin: "2026-08-16T07:10:00Z" },
  { id: "u-05", name: "Elena Ruiz", email: "elena.ruiz@acme.com", role: "Administrador", status: "Activo", createdAt: "2023-04-02T16:00:00Z", lastLogin: "2026-08-13T12:33:00Z" },
  { id: "u-06", name: "Fabio Nieto", email: "fabio.nieto@acme.com", role: "Visor", status: "Pendiente", createdAt: "2023-05-19T10:05:00Z", lastLogin: "2026-06-21T09:48:00Z" },
  { id: "u-07", name: "Gabriela Ponce", email: "gabriela.ponce@acme.com", role: "Editor", status: "Activo", createdAt: "2023-06-08T13:15:00Z", lastLogin: "2026-08-15T19:27:00Z" },
  { id: "u-08", name: "Héctor Lima", email: "hector.lima@acme.com", role: "Visor", status: "Inactivo", createdAt: "2023-06-30T09:40:00Z", lastLogin: "2025-09-14T15:02:00Z" },
  { id: "u-09", name: "Irene Castaño", email: "irene.castano@acme.com", role: "Editor", status: "Activo", createdAt: "2023-07-21T12:00:00Z", lastLogin: "2026-08-12T11:19:00Z" },
  { id: "u-10", name: "Javier Alarcón", email: "javier.alarcon@acme.com", role: "Administrador", status: "Activo", createdAt: "2023-08-05T07:55:00Z", lastLogin: "2026-08-16T06:04:00Z" },
  { id: "u-11", name: "Karina Vidal", email: "karina.vidal@acme.com", role: "Visor", status: "Pendiente", createdAt: "2023-09-12T15:30:00Z", lastLogin: "2026-07-30T14:41:00Z" },
  { id: "u-12", name: "Lucas Bermejo", email: "lucas.bermejo@acme.com", role: "Editor", status: "Activo", createdAt: "2023-10-01T10:10:00Z", lastLogin: "2026-08-11T09:56:00Z" },
  { id: "u-13", name: "Marina Solís", email: "marina.solis@acme.com", role: "Visor", status: "Activo", createdAt: "2023-10-24T08:20:00Z", lastLogin: "2026-08-09T16:38:00Z" },
  { id: "u-14", name: "Nicolás Prado", email: "nicolas.prado@acme.com", role: "Editor", status: "Inactivo", createdAt: "2023-11-16T17:45:00Z", lastLogin: "2025-12-19T08:23:00Z" },
  { id: "u-15", name: "Olga Restrepo", email: "olga.restrepo@acme.com", role: "Administrador", status: "Activo", createdAt: "2023-12-04T09:25:00Z", lastLogin: "2026-08-15T13:14:00Z" },
  { id: "u-16", name: "Pablo Quintero", email: "pablo.quintero@acme.com", role: "Visor", status: "Pendiente", createdAt: "2024-01-09T11:35:00Z", lastLogin: "2026-08-01T10:52:00Z" },
  { id: "u-17", name: "Queralt Bosch", email: "queralt.bosch@acme.com", role: "Editor", status: "Activo", createdAt: "2024-01-30T14:05:00Z", lastLogin: "2026-08-14T15:47:00Z" },
  { id: "u-18", name: "Raúl Ibáñez", email: "raul.ibanez@acme.com", role: "Visor", status: "Activo", createdAt: "2024-02-18T08:50:00Z", lastLogin: "2026-08-10T07:31:00Z" },
  { id: "u-19", name: "Sofía Landa", email: "sofia.landa@acme.com", role: "Editor", status: "Inactivo", createdAt: "2024-03-07T16:15:00Z", lastLogin: "2025-10-28T12:09:00Z" },
  { id: "u-20", name: "Tomás Espejo", email: "tomas.espejo@acme.com", role: "Administrador", status: "Activo", createdAt: "2024-03-29T10:40:00Z", lastLogin: "2026-08-16T05:22:00Z" },
  { id: "u-21", name: "Úrsula Camino", email: "ursula.camino@acme.com", role: "Visor", status: "Activo", createdAt: "2024-04-15T13:00:00Z", lastLogin: "2026-08-08T18:16:00Z" },
  { id: "u-22", name: "Víctor Palma", email: "victor.palma@acme.com", role: "Editor", status: "Pendiente", createdAt: "2024-05-06T09:10:00Z", lastLogin: "2026-07-22T11:44:00Z" },
  { id: "u-23", name: "Wendy Arocha", email: "wendy.arocha@acme.com", role: "Visor", status: "Activo", createdAt: "2024-05-27T15:55:00Z", lastLogin: "2026-08-13T09:03:00Z" },
  { id: "u-24", name: "Ximena Duarte", email: "ximena.duarte@acme.com", role: "Editor", status: "Activo", createdAt: "2024-06-17T08:05:00Z", lastLogin: "2026-08-15T20:11:00Z" },
  { id: "u-25", name: "Yago Herrera", email: "yago.herrera@acme.com", role: "Visor", status: "Inactivo", createdAt: "2024-07-08T12:25:00Z", lastLogin: "2025-08-30T13:37:00Z" },
  { id: "u-26", name: "Zoe Naranjo", email: "zoe.naranjo@acme.com", role: "Editor", status: "Activo", createdAt: "2024-07-29T10:30:00Z", lastLogin: "2026-08-12T16:29:00Z" },
  { id: "u-27", name: "Adrián Cifuentes", email: "adrian.cifuentes@acme.com", role: "Visor", status: "Pendiente", createdAt: "2024-08-19T14:20:00Z", lastLogin: "2026-08-05T08:58:00Z" },
  { id: "u-28", name: "Beatriz Olmedo", email: "beatriz.olmedo@acme.com", role: "Administrador", status: "Activo", createdAt: "2024-09-09T09:45:00Z", lastLogin: "2026-08-16T04:47:00Z" },
  { id: "u-29", name: "Camilo Serrano", email: "camilo.serrano@acme.com", role: "Editor", status: "Activo", createdAt: "2024-09-30T11:50:00Z", lastLogin: "2026-08-14T10:26:00Z" },
  { id: "u-30", name: "Daniela Ochoa", email: "daniela.ochoa@acme.com", role: "Visor", status: "Activo", createdAt: "2024-10-21T16:35:00Z", lastLogin: "2026-08-11T14:53:00Z" },
]
