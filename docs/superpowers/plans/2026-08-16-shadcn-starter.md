# Starter frontend shadcn/ui — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir un starter frontend con shadcn/ui — login simulado, layout con sidebar, dashboard de placeholders, gestión de usuarios, gestión de API keys y perfil — íntegramente sobre datos mock.

**Architecture:** SPA de Vite + React con react-router. Un `AuthProvider` y un `ThemeProvider` en la raíz; rutas privadas envueltas en `ProtectedRoute`; un `AppLayout` con el sidebar de `@shadcn/sidebar-07` que renderiza las páginas en un `<Outlet/>`. Los datos mock se importan directamente desde las páginas: sin capa de servicios ni repositorios. La única abstracción compartida es un `DataTable` genérico, justificado por las dos tablas reales que lo consumen.

**Tech Stack:** Vite, React 19, TypeScript, Tailwind CSS v4, shadcn/ui (`base: radix`, preset `lyra`), react-router, react-hook-form, zod, @tanstack/react-table (fijada a la v8), sonner, lucide-react.

**Spec:** [docs/superpowers/specs/2026-08-16-shadcn-starter-design.md](../specs/2026-08-16-shadcn-starter-design.md)

## Global Constraints

Estas restricciones aplican a **todas** las tareas. No se repiten en cada una.

**Sobre el ciclo de trabajo:**

- **Este proyecto no lleva tests.** Es una decisión explícita de la spec (§2). Donde un plan normal llevaría un ciclo TDD, aquí va un ciclo de verificación: `npx tsc --noEmit`, `npm run build` y comprobación en navegador. Ningún paso de este plan debe crear ficheros de test ni instalar un framework de testing.
- **Documentación antes de código.** Antes de escribir código contra cualquier componente de shadcn que no hayas usado ya en una tarea anterior, ejecuta `npx shadcn@latest docs <componente>` y lee las URLs que devuelve. Los bloques de código de este plan reflejan la implementación pretendida; si la documentación oficial muestra una API distinta, manda la documentación — ajusta el código y sigue.
- **Commit al final de cada tarea.** Un commit por tarea, con el mensaje indicado.

**Sobre el código (reglas críticas de `.agents/skills/shadcn/`, vinculantes):**

- Formularios con `FieldGroup` + `Field` + `FieldLabel`. Nunca un `div` con `space-y-*`, nunca el wrapper `FormField`/`FormItem`.
- Validación: `data-invalid` en el `Field`, `aria-invalid` en el control, y el mensaje de error en **`FieldError`**, nunca en `FieldDescription`. `FieldError` renderiza `role="alert"` con `text-destructive`; `FieldDescription` es texto de ayuda en gris y no se anuncia a lectores de pantalla. Deshabilitado: `data-disabled` en el `Field`, `disabled` en el control.
- Estados vacíos con el componente `Empty`. Nada de markup propio.
- Buscadores con icono: `InputGroup` + `InputGroupInput` + `InputGroupAddon`. Nunca `Input` con padding y un icono en `absolute`.
- `Button` no tiene `isLoading`. Se compone con `Spinner`, `data-icon="inline-start"` y `disabled`.
- Solo tokens semánticos (`bg-primary`, `text-muted-foreground`, `text-destructive`) y variantes existentes. Prohibidos los colores crudos de Tailwind, incluso para estados. Prohibidos los `dark:` manuales.
- `gap-*`, nunca `space-x-*` ni `space-y-*`. `size-*` cuando ancho y alto coinciden. `truncate` en vez de la tríada larga.
- `SelectItem` dentro de `SelectGroup`. `DropdownMenuItem` dentro de `DropdownMenuGroup`.
- Iconos dentro de componentes con `data-icon`, sin clases de tamaño.
- Sin `z-index` manual en overlays. `Dialog` y `AlertDialog` siempre con su `Title`.
- Clases condicionales con `cn()`, nunca con plantillas ternarias.
- `Card` con composición completa: `CardHeader`/`CardTitle`/`CardDescription`/`CardContent`/`CardFooter`.

**Sobre shadcn:**

- Los bloques se piden **siempre con registro explícito**: `@shadcn/login-01`, `@shadcn/sidebar-07`. Nunca sin prefijo.
- Tras añadir cualquier bloque, **lee los ficheros generados** y corrige lo que incumpla las reglas de arriba. No asumas que vienen correctos.
- Los imports usan el alias real del proyecto (`aliasPrefix` de `npx shadcn@latest info`), nunca uno supuesto.
- El fichero CSS global es el que reporte `tailwindCssFile`. Se edita; no se crea otro.

**Sobre el producto:**

- Toda la UI en **español**. Las rutas y los identificadores de código, en inglés.
- Nada persiste en un backend. No hay backend.
- No añadas funcionalidad que no esté en este plan.

---

## File Structure

Rutas relativas a la raíz del repo. `src/` y el prefijo de alias se confirman en la Tarea 1.

| Fichero | Responsabilidad |
|---|---|
| `src/lib/auth.tsx` | `AuthProvider` + `useAuth()`. Sesión simulada en `localStorage`. |
| `src/components/theme-provider.tsx` | `ThemeProvider` + `useTheme()`. Lo trae la plantilla; la Tarea 12 lo adapta. |
| `src/lib/utils.ts` | `cn()`. Lo genera la CLI. |
| `src/data/users.ts` | Tipo `User`, array mock, `DEMO_CREDENTIALS`. |
| `src/data/api-keys.ts` | Tipo `ApiKey`, array mock. |
| `src/data/nav.ts` | Items del sidebar y etiquetas de breadcrumb. |
| `src/components/protected-route.tsx` | Redirige a `/login` si no hay sesión. |
| `src/components/data-table.tsx` | Tabla genérica sobre una instancia de TanStack Table. |
| `src/components/app-sidebar.tsx` | Sidebar completo, derivado de `@shadcn/sidebar-07`. |
| `src/components/nav-main.tsx` | Navegación principal colapsable. |
| `src/components/nav-user.tsx` | Footer del sidebar con dropdown y cerrar sesión. |
| `src/components/site-header.tsx` | Header con `SidebarTrigger` y breadcrumb. |
| `src/components/users/columns.tsx` | Column defs de la tabla de usuarios. |
| `src/components/api-keys/columns.tsx` | Column defs de la tabla de API keys. |
| `src/components/api-keys/create-key-dialog.tsx` | Diálogo de creación con revelado único. |
| `src/layouts/app-layout.tsx` | `SidebarProvider` + sidebar + header + `<Outlet/>`. |
| `src/pages/login-page.tsx` | Login. |
| `src/pages/dashboard-page.tsx` | Placeholders. |
| `src/pages/users-page.tsx` | Tabla de usuarios con filtros. |
| `src/pages/api-keys-page.tsx` | Tabla de API keys con filtros, creación y revocación. |
| `src/pages/profile-page.tsx` | Cuatro cards de perfil. |
| `src/app.tsx` | Árbol de rutas. |
| `src/main.tsx` | Providers y montaje. |
| `index.html` | Script inline anti-parpadeo de tema. |
| `README.md` | Cómo arrancar, credenciales demo, cómo cambiar el tema. |

---

### Task 1: Andamiaje del proyecto

Crear el proyecto Vite + shadcn dentro del repo existente sin pisar `docs/`, `.agents/`, `.git` ni `skills-lock.json`.

**Files:**
- Create: todo el andamiaje de la plantilla `vite` en la raíz del repo
- Create: `.claude/launch.json`

**Interfaces:**
- Consumes: nada
- Produces: un proyecto Vite arrancable; los valores reales de `aliasPrefix`, `tailwindCssFile` y `resolvedPaths`, que todas las tareas siguientes usan

- [ ] **Step 1: Generar el andamiaje en un subdirectorio temporal**

La plantilla `vite` de la CLI crea un proyecto nuevo, y este directorio ya tiene contenido. Se genera aparte y se traslada.

```bash
cd /Users/jaime/Herd/shadcn-starter && npx shadcn@latest init --name app --template vite --preset lyra --yes
```

- [ ] **Step 2: Trasladar el andamiaje a la raíz**

`rsync` copia también los ficheros ocultos y no borra nada de lo que ya existe. Se descarta `node_modules` y se reinstala en la raíz, que es más rápido que copiarlo.

```bash
cd /Users/jaime/Herd/shadcn-starter && rm -rf app/node_modules && rsync -a app/ ./ && rm -rf app && npm install
```

- [ ] **Step 3: Verificar que no se perdió nada**

```bash
cd /Users/jaime/Herd/shadcn-starter && ls -a && test -f docs/initial-spec.md && test -d .agents/skills/shadcn && test -f skills-lock.json && echo "OK"
```

Esperado: `OK`, y en el listado aparecen `package.json`, `vite.config.ts`, `components.json`, `index.html`, `src/`.

Si `rsync` hubiera sobrescrito algo del repo, `git status` lo mostraría como modificado en vez de nuevo. Compruébalo:

```bash
cd /Users/jaime/Herd/shadcn-starter && git status --short
```

Esperado: solo líneas `??` (ficheros nuevos). Cualquier ` M` sobre `docs/`, `.agents/` o `skills-lock.json` es un fallo: restaura con `git checkout -- <fichero>` y revisa el traslado.

- [ ] **Step 4: Confirmar la configuración resuelta**

```bash
cd /Users/jaime/Herd/shadcn-starter && npx shadcn@latest info
```

Anota y usa en el resto del plan: `base` (**debe ser `radix`**), `aliasPrefix`, `tailwindCssFile`, `resolvedPaths.ui`, `packageManager`, `iconLibrary`.

Si `base` no es `radix`, re-inicializa forzando el preset radix antes de continuar — los presets con prefijo `base-` seleccionan Base UI, y este proyecto usa Radix:

```bash
cd /Users/jaime/Herd/shadcn-starter && npx shadcn@latest init --preset lyra --force --no-reinstall
```

Vuelve a ejecutar `info` y confirma `base: radix`.

- [ ] **Step 5: Configurar el arranque del servidor de desarrollo**

Crear `.claude/launch.json` (el puerto debe coincidir con el que imprime `npm run dev`; la plantilla vite usa 5173):

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "shadcn-starter",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "port": 5173
    }
  ]
}
```

- [ ] **Step 6: Verificar que compila y arranca**

```bash
cd /Users/jaime/Herd/shadcn-starter && npx tsc --noEmit && npm run build
```

Esperado: ambos sin errores.

Arranca el servidor con la herramienta `preview_start` (nombre `shadcn-starter`) y confirma que la página por defecto de la plantilla carga sin errores en consola.

- [ ] **Step 7: Commit**

```bash
cd /Users/jaime/Herd/shadcn-starter && git add -A && git commit -m "chore: scaffold vite + shadcn/ui project"
```

---

### Task 2: Tema

Sustituir la paleta del preset por la de la spec.

**Files:**
- Modify: el fichero de `tailwindCssFile` (bloques `:root` y `.dark`)

**Interfaces:**
- Consumes: `tailwindCssFile` de la Tarea 1
- Produces: tokens de color y `--radius: 0` disponibles para todos los componentes

- [ ] **Step 1: Reemplazar los bloques `:root` y `.dark`**

Sustituye **solo** el contenido de esos dos bloques. El bloque `@theme inline` que genera la CLI mapea las variables a los tokens de Tailwind y se deja intacto.

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.147 0.004 49.25);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.147 0.004 49.25);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.147 0.004 49.25);
  --primary: oklch(0.52 0.105 223.128);
  --primary-foreground: oklch(0.984 0.019 200.873);
  --secondary: oklch(0.967 0.001 286.375);
  --secondary-foreground: oklch(0.21 0.006 285.885);
  --muted: oklch(0.97 0.001 106.424);
  --muted-foreground: oklch(0.553 0.013 58.071);
  --accent: oklch(0.97 0.001 106.424);
  --accent-foreground: oklch(0.216 0.006 56.043);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.923 0.003 48.717);
  --input: oklch(0.923 0.003 48.717);
  --ring: oklch(0.709 0.01 56.259);
  --chart-1: oklch(0.865 0.127 207.078);
  --chart-2: oklch(0.715 0.143 215.221);
  --chart-3: oklch(0.609 0.126 221.723);
  --chart-4: oklch(0.52 0.105 223.128);
  --chart-5: oklch(0.45 0.085 224.283);
  --radius: 0;
  --sidebar: oklch(0.985 0.001 106.423);
  --sidebar-foreground: oklch(0.147 0.004 49.25);
  --sidebar-primary: oklch(0.609 0.126 221.723);
  --sidebar-primary-foreground: oklch(0.984 0.019 200.873);
  --sidebar-accent: oklch(0.97 0.001 106.424);
  --sidebar-accent-foreground: oklch(0.216 0.006 56.043);
  --sidebar-border: oklch(0.923 0.003 48.717);
  --sidebar-ring: oklch(0.709 0.01 56.259);
}

.dark {
  --background: oklch(0.147 0.004 49.25);
  --foreground: oklch(0.985 0.001 106.423);
  --card: oklch(0.216 0.006 56.043);
  --card-foreground: oklch(0.985 0.001 106.423);
  --popover: oklch(0.216 0.006 56.043);
  --popover-foreground: oklch(0.985 0.001 106.423);
  --primary: oklch(0.45 0.085 224.283);
  --primary-foreground: oklch(0.984 0.019 200.873);
  --secondary: oklch(0.274 0.006 286.033);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.268 0.007 34.298);
  --muted-foreground: oklch(0.709 0.01 56.259);
  --accent: oklch(0.268 0.007 34.298);
  --accent-foreground: oklch(0.985 0.001 106.423);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.553 0.013 58.071);
  --chart-1: oklch(0.865 0.127 207.078);
  --chart-2: oklch(0.715 0.143 215.221);
  --chart-3: oklch(0.609 0.126 221.723);
  --chart-4: oklch(0.52 0.105 223.128);
  --chart-5: oklch(0.45 0.085 224.283);
  --sidebar: oklch(0.216 0.006 56.043);
  --sidebar-foreground: oklch(0.985 0.001 106.423);
  --sidebar-primary: oklch(0.715 0.143 215.221);
  --sidebar-primary-foreground: oklch(0.302 0.056 229.695);
  --sidebar-accent: oklch(0.268 0.007 34.298);
  --sidebar-accent-foreground: oklch(0.985 0.001 106.423);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.553 0.013 58.071);
}
```

- [ ] **Step 2: Comprobar si falta algún token**

Busca en el bloque `@theme inline` referencias a variables que no estén definidas arriba:

```bash
cd /Users/jaime/Herd/shadcn-starter && grep -n "destructive-foreground\|--radius-" src/*.css src/**/*.css 2>/dev/null
```

Si `@theme inline` referencia `--destructive-foreground`, añádelo a `:root` con `oklch(0.985 0 0)` y a `.dark` con `oklch(0.985 0 0)`. Si no aparece, no añadas nada.

- [ ] **Step 3: Verificar**

```bash
cd /Users/jaime/Herd/shadcn-starter && npm run build
```

En el navegador, confirma que el fondo es blanco y que no hay esquinas redondeadas.

- [ ] **Step 4: Commit**

```bash
cd /Users/jaime/Herd/shadcn-starter && git add -A && git commit -m "style: apply the project theme tokens"
```

---

### Task 3: Dependencias y componentes

Instalar de una vez todo lo que consumen las tareas siguientes.

**Files:**
- Modify: `package.json`
- Create: los componentes en `resolvedPaths.ui` y los ficheros de los dos bloques

**Interfaces:**
- Consumes: proyecto inicializado de la Tarea 1
- Produces: componentes shadcn instalados y las dependencias `react-router`, `react-hook-form`, `zod`, `@hookform/resolvers`, `@tanstack/react-table@^8` disponibles

- [ ] **Step 1: Instalar dependencias de aplicación**

Usa el gestor que reportó `packageManager` en la Tarea 1. Con npm:

```bash
cd /Users/jaime/Herd/shadcn-starter && npm install react-router react-hook-form zod @hookform/resolvers @tanstack/react-table@^8
```

- [ ] **Step 2: Añadir los bloques oficiales**

Registro explícito, siempre:

```bash
cd /Users/jaime/Herd/shadcn-starter && npx shadcn@latest add @shadcn/sidebar-07 @shadcn/login-01 --yes
```

- [ ] **Step 3: Añadir el resto de componentes**

```bash
cd /Users/jaime/Herd/shadcn-starter && npx shadcn@latest add table badge dialog alert-dialog alert select empty spinner sonner toggle-group input-group field --yes
```

- [ ] **Step 4: Revisar lo generado**

Lista los ficheros que añadieron los bloques (todo lo que no esté en `resolvedPaths.ui`) y **léelos enteros**. Corrige antes de seguir:

- Imports de iconos que no coincidan con el `iconLibrary` del proyecto.
- Rutas de import que no usen el `aliasPrefix` real.
- Cualquier incumplimiento de las reglas críticas de Global Constraints.

Los bloques oficiales vienen pensados para Next.js: si algún fichero trae la directiva `"use client"`, elimínala — este proyecto es una SPA de Vite y `isRSC` es `false`. Si un bloque trae un `page.tsx`, no lo conserves: su contenido se reescribe en tareas posteriores.

- [ ] **Step 5: Verificar**

```bash
cd /Users/jaime/Herd/shadcn-starter && npx tsc --noEmit && npm run build
```

- [ ] **Step 6: Commit**

```bash
cd /Users/jaime/Herd/shadcn-starter && git add -A && git commit -m "chore: add shadcn components and app dependencies"
```

---

### Task 4: Datos mock

**Files:**
- Create: `src/data/users.ts`
- Create: `src/data/api-keys.ts`
- Create: `src/data/nav.ts`

**Interfaces:**
- Consumes: nada
- Produces:
  - `type UserRole = "Administrador" | "Editor" | "Visor"`
  - `type UserStatus = "Activo" | "Inactivo" | "Pendiente"`
  - `type User = { id: string; name: string; email: string; role: UserRole; status: UserStatus; createdAt: string; lastLogin: string }`
  - `const users: User[]`
  - `const DEMO_CREDENTIALS: { email: string; password: string }`
  - `type ApiKeyStatus = "Activa" | "Revocada" | "Expirada"`
  - `type ApiKey = { id: string; name: string; tokenPreview: string; status: ApiKeyStatus; createdAt: string; lastUsed: string | null; expiresAt: string | null }`
  - `const apiKeys: ApiKey[]`
  - `const navMain: NavItem[]` y `const breadcrumbLabels: Record<string, string>`

- [ ] **Step 1: Crear `src/data/users.ts`**

```ts
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
  email: "ana.torres@acme.com",
  password: "demo1234",
}

export const users: User[] = [
  { id: "u-01", name: "Ana Torres", email: "ana.torres@acme.com", role: "Administrador", status: "Activo", createdAt: "2023-01-15T09:00:00Z", lastLogin: "2026-08-15T08:42:00Z" },
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
```

- [ ] **Step 2: Crear `src/data/api-keys.ts`**

```ts
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
```

- [ ] **Step 3: Crear `src/data/nav.ts`**

Sustituye `LayoutDashboardIcon`/`SettingsIcon`/`UserIcon` por los nombres reales del `iconLibrary` del proyecto si no es `lucide`.

```ts
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
```

- [ ] **Step 4: Verificar**

```bash
cd /Users/jaime/Herd/shadcn-starter && npx tsc --noEmit
```

Esperado: sin errores.

- [ ] **Step 5: Commit**

```bash
cd /Users/jaime/Herd/shadcn-starter && git add -A && git commit -m "feat: add mock data for users, api keys and navigation"
```

---

### Task 5: Autenticación y rutas

**Files:**
- Create: `src/lib/auth.tsx`
- Create: `src/components/protected-route.tsx`
- Create: `src/app.tsx`
- Delete: `src/App.tsx` (el de la plantilla)
- Modify: `src/main.tsx`
- Create: `src/pages/login-page.tsx`, `src/pages/dashboard-page.tsx`, `src/pages/users-page.tsx`, `src/pages/api-keys-page.tsx`, `src/pages/profile-page.tsx` (versiones mínimas)
- Create: `src/layouts/app-layout.tsx` (versión mínima)

**Interfaces:**
- Consumes: `users`, `DEMO_CREDENTIALS`, `type User` de `src/data/users.ts`
- Produces:
  - `AuthProvider` (componente con `children`)
  - `useAuth(): { user: User | null; login(email: string, password: string): Promise<void>; logout(): void; updateName(name: string): void }`
  - `ProtectedRoute` (componente con `children`)
  - Las cinco páginas exportadas por nombre: `LoginPage`, `DashboardPage`, `UsersPage`, `ApiKeysPage`, `ProfilePage`
  - `AppLayout`

- [ ] **Step 1: Crear `src/lib/auth.tsx`**

```tsx
import { createContext, useCallback, useContext, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { DEMO_CREDENTIALS, users, type User } from "@/data/users"

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
    const parsed: unknown = JSON.parse(raw)
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
```

- [ ] **Step 2: Crear `src/components/protected-route.tsx`**

```tsx
import type { ReactNode } from "react"
import { Navigate } from "react-router"
import { useAuth } from "@/lib/auth"

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}
```

- [ ] **Step 3: Crear las cinco páginas y el layout en versión mínima**

Se rellenan en tareas posteriores. Aquí solo permiten comprobar que el enrutado funciona.

`src/pages/login-page.tsx`:

```tsx
export function LoginPage() {
  return <div>Login</div>
}
```

`src/pages/dashboard-page.tsx`:

```tsx
export function DashboardPage() {
  return <div>Dashboard</div>
}
```

`src/pages/users-page.tsx`:

```tsx
export function UsersPage() {
  return <div>Usuarios</div>
}
```

`src/pages/api-keys-page.tsx`:

```tsx
export function ApiKeysPage() {
  return <div>API Keys</div>
}
```

`src/pages/profile-page.tsx`:

```tsx
export function ProfilePage() {
  return <div>Perfil</div>
}
```

`src/layouts/app-layout.tsx`:

```tsx
import { Outlet } from "react-router"

export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col gap-4 p-4">
      <Outlet />
    </div>
  )
}
```

- [ ] **Step 4: Crear `src/app.tsx` y eliminar `src/App.tsx`**

La plantilla dejó un `src/App.tsx` de demostración. El nuevo fichero de rutas se llama
`src/app.tsx`, y en macOS el sistema de ficheros no distingue mayúsculas: los dos nombres
colisionan. Elimina primero el de la plantilla con `git rm src/App.tsx` y crea después el
nuevo. No basta con sobrescribir.

```tsx
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
```

La ruta comodín cubre también `/`: sin sesión, `ProtectedRoute` la reconduce a `/login`.

- [ ] **Step 5: Reescribir `src/main.tsx`**

`main.tsx` ya envuelve la aplicación en el `ThemeProvider` que trae la plantilla. **Ese
provider se conserva** — la Tarea 12 lo adapta en lugar de escribir otro. No lo quites.

```tsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/lib/auth"
import { App } from "@/app"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
```

- [ ] **Step 6: Verificar**

```bash
cd /Users/jaime/Herd/shadcn-starter && npx tsc --noEmit && npm run build
```

En el navegador: abre `/dashboard` sin sesión y confirma que redirige a `/login`. Ejecuta en la consola del navegador `localStorage.setItem("shadcn-starter.session", JSON.stringify({id:"u-01",name:"Ana Torres",email:"ana.torres@acme.com",role:"Administrador",status:"Activo",createdAt:"2023-01-15T09:00:00Z",lastLogin:"2026-08-15T08:42:00Z"}))`, recarga y confirma que `/dashboard` ya sí se muestra. Limpia después con `localStorage.clear()`.

- [ ] **Step 7: Commit**

```bash
cd /Users/jaime/Herd/shadcn-starter && git add -A && git commit -m "feat: add simulated auth and protected routing"
```

---

### Task 6: Login

**Files:**
- Modify: `src/pages/login-page.tsx`
- Reference: los ficheros que añadió `@shadcn/login-01`

**Interfaces:**
- Consumes: `useAuth()` de la Tarea 5, `DEMO_CREDENTIALS` de la Tarea 4
- Produces: `LoginPage` funcional que navega a `/dashboard` tras un login correcto

- [ ] **Step 1: Leer la documentación de los componentes implicados**

```bash
cd /Users/jaime/Herd/shadcn-starter && npx shadcn@latest docs field input button alert spinner card
```

Lee las URLs que devuelve antes de escribir el componente.

- [ ] **Step 2: Escribir `src/pages/login-page.tsx`**

Toma como referencia visual el bloque `@shadcn/login-01` que ya está en el proyecto: misma estructura de `Card` centrada. La lógica es propia.

```tsx
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router"
import { z } from "zod"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { DEMO_CREDENTIALS } from "@/data/users"
import { useAuth } from "@/lib/auth"

const loginSchema = z.object({
  email: z.string().min(1, "El email es obligatorio.").email("Introduce un email válido."),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
})

type LoginValues = z.infer<typeof loginSchema>

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  async function onSubmit(values: LoginValues) {
    setFormError(null)
    try {
      await login(values.email, values.password)
      navigate("/dashboard", { replace: true })
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "No se pudo iniciar sesión.")
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-muted p-6">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Inicia sesión</CardTitle>
            <CardDescription>
              Introduce tus credenciales para acceder al panel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <FieldGroup>
                {formError ? (
                  <Alert variant="destructive">
                    <AlertTitle>No se pudo iniciar sesión</AlertTitle>
                    <AlertDescription>{formError}</AlertDescription>
                  </Alert>
                ) : null}
                <Field data-invalid={errors.email ? true : undefined}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@empresa.com"
                    aria-invalid={errors.email ? true : undefined}
                    {...register("email")}
                  />
                  {errors.email ? (
                    <FieldError>{errors.email.message}</FieldError>
                  ) : null}
                </Field>
                <Field data-invalid={errors.password ? true : undefined}>
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    aria-invalid={errors.password ? true : undefined}
                    {...register("password")}
                  />
                  {errors.password ? (
                    <FieldError>{errors.password.message}</FieldError>
                  ) : null}
                </Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
                  {isSubmitting ? "Entrando…" : "Entrar"}
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
        <p className="text-center text-sm text-muted-foreground">
          Demo: {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verificar**

```bash
cd /Users/jaime/Herd/shadcn-starter && npx tsc --noEmit && npm run build
```

En el navegador, sobre `/login`, comprueba las cuatro rutas de comportamiento:

1. Enviar vacío → dos mensajes de error de campo.
2. Email mal formado → error de formato.
3. Credenciales incorrectas → `Alert` destructivo, sin navegación.
4. Credenciales demo → spinner en el botón, luego `/dashboard`.

- [ ] **Step 4: Commit**

```bash
cd /Users/jaime/Herd/shadcn-starter && git add -A && git commit -m "feat: add login page with simulated authentication"
```

---

### Task 7: Layout y sidebar

**Files:**
- Modify: `src/layouts/app-layout.tsx`
- Modify o Create: `src/components/app-sidebar.tsx`, `src/components/nav-main.tsx`, `src/components/nav-user.tsx`
- Create: `src/components/site-header.tsx`
- Delete: los ficheros de `@shadcn/sidebar-07` que dejen de usarse (`team-switcher.tsx`, `nav-projects.tsx` y cualquier `page.tsx` del bloque)

**Interfaces:**
- Consumes: `navMain`, `breadcrumbLabels` de la Tarea 4; `useAuth()` de la Tarea 5
- Produces: `AppLayout` completo; `AppSidebar`, `NavMain`, `NavUser`, `SiteHeader`

- [ ] **Step 1: Leer la documentación**

```bash
cd /Users/jaime/Herd/shadcn-starter && npx shadcn@latest docs sidebar breadcrumb dropdown-menu avatar collapsible separator
```

- [ ] **Step 2: Adaptar `src/components/app-sidebar.tsx`**

Parte del fichero que generó el bloque. Sustituye el `TeamSwitcher` por una marca simple y elimina `NavProjects`.

```tsx
import { Command } from "lucide-react"
import { Link } from "react-router"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { navMain } from "@/data/nav"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc.</span>
                  <span className="truncate text-xs">Starter</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
```

- [ ] **Step 3: Adaptar `src/components/nav-main.tsx`**

El item activo se marca comparando con la ruta actual. Los grupos con subitems se abren si alguno de sus hijos está activo.

```tsx
import { ChevronRight } from "lucide-react"
import { Link, useLocation } from "react-router"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import type { NavItem } from "@/data/nav"

export function NavMain({ items }: { items: NavItem[] }) {
  const { pathname } = useLocation()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navegación</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          if (!item.items) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }

          const hasActiveChild = item.items.some((child) => pathname === child.url)

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={hasActiveChild}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title} isActive={hasActiveChild}>
                    <item.icon />
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((child) => (
                      <SidebarMenuSubItem key={child.title}>
                        <SidebarMenuSubButton asChild isActive={pathname === child.url}>
                          <Link to={child.url}>
                            <span>{child.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
```

- [ ] **Step 4: Adaptar `src/components/nav-user.tsx`**

```tsx
import { ChevronsUpDown, LogOut, UserCog } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/lib/auth"

function initialsOf(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
}

export function NavUser() {
  const { user, logout } = useAuth()
  const { isMobile } = useSidebar()
  const navigate = useNavigate()

  if (!user) return null

  function handleLogout() {
    logout()
    navigate("/login", { replace: true })
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <Avatar className="size-8">
                <AvatarFallback>{initialsOf(user.name)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
            side={isMobile ? "bottom" : "right"}
            align="end"
          >
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to="/profile">
                  <UserCog />
                  Perfil
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={handleLogout}>
                <LogOut />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
```

- [ ] **Step 5: Crear `src/components/site-header.tsx`**

El breadcrumb se deriva de los segmentos de la ruta. `/settings` no es una ruta navegable, así que se muestra como texto, no como enlace.

```tsx
import { Fragment } from "react"
import { Link, useLocation } from "react-router"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { breadcrumbLabels } from "@/data/nav"

export function SiteHeader() {
  const { pathname } = useLocation()
  const segments = pathname.split("/").filter(Boolean)

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1
            const label = breadcrumbLabels[segment] ?? segment
            const href = `/${segments.slice(0, index + 1).join("/")}`
            const isNavigable = !isLast && segment !== "settings"

            return (
              <Fragment key={href}>
                <BreadcrumbItem>
                  {isLast || !isNavigable ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={href}>{label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {isLast ? null : <BreadcrumbSeparator />}
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}
```

- [ ] **Step 6: Escribir `src/layouts/app-layout.tsx`**

```tsx
import { Outlet } from "react-router"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

- [ ] **Step 7: Eliminar lo que sobra del bloque**

```bash
cd /Users/jaime/Herd/shadcn-starter && rm -f src/components/team-switcher.tsx src/components/nav-projects.tsx
```

Busca cualquier `page.tsx` que dejara el bloque y elimínalo también. Después comprueba que no queda ningún import huérfano:

```bash
cd /Users/jaime/Herd/shadcn-starter && grep -rn "team-switcher\|nav-projects" src/ || echo "sin referencias"
```

- [ ] **Step 8: Verificar**

```bash
cd /Users/jaime/Herd/shadcn-starter && npx tsc --noEmit && npm run build
```

En el navegador, con sesión iniciada:

1. A 1280 px: sidebar visible, el trigger lo colapsa a modo icono, los tooltips aparecen al pasar por encima.
2. A 375 px: el sidebar se abre como panel deslizante.
3. Navegar a `/settings/users` deja *Configuración* abierto con *Usuarios* marcado como activo, y el breadcrumb muestra "Configuración / Usuarios" con "Configuración" sin enlace.
4. *Cerrar sesión* en el dropdown lleva a `/login`, y volver atrás no devuelve al panel.

- [ ] **Step 9: Commit**

```bash
cd /Users/jaime/Herd/shadcn-starter && git add -A && git commit -m "feat: add app layout with sidebar and header"
```

---

### Task 8: Dashboard

**Files:**
- Modify: `src/pages/dashboard-page.tsx`

**Interfaces:**
- Consumes: `AppLayout` de la Tarea 7
- Produces: `DashboardPage`

- [ ] **Step 1: Escribir `src/pages/dashboard-page.tsx`**

Placeholders vacíos. Sin datos, sin componentes de dato.

```tsx
export function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video border border-dashed bg-muted/50" />
        <div className="aspect-video border border-dashed bg-muted/50" />
        <div className="aspect-video border border-dashed bg-muted/50" />
      </div>
      <div className="min-h-[60vh] flex-1 border border-dashed bg-muted/50 md:min-h-min" />
    </div>
  )
}
```

- [ ] **Step 2: Verificar**

```bash
cd /Users/jaime/Herd/shadcn-starter && npx tsc --noEmit && npm run build
```

En el navegador: a 1280 px los tres bloques van en fila; a 375 px se apilan.

- [ ] **Step 3: Commit**

```bash
cd /Users/jaime/Herd/shadcn-starter && git add -A && git commit -m "feat: add dashboard placeholders"
```

---

### Task 9: Tabla genérica y gestión de usuarios

**Files:**
- Create: `src/components/data-table.tsx`
- Create: `src/components/users/columns.tsx`
- Modify: `src/pages/users-page.tsx`

**Interfaces:**
- Consumes: `users`, `type User`, `type UserRole`, `type UserStatus` de la Tarea 4
- Produces:
  - `DataTable<TData>({ table, columnCount, emptyTitle, emptyDescription }): JSX.Element`
  - `userColumns: ColumnDef<User>[]`
  - `formatDate(value: string | null): string` exportado desde `src/components/data-table.tsx`

- [ ] **Step 1: Leer la documentación**

```bash
cd /Users/jaime/Herd/shadcn-starter && npx shadcn@latest docs table badge empty select input-group dropdown-menu button
```

- [ ] **Step 2: Crear `src/components/data-table.tsx`**

Recibe una instancia de TanStack Table ya construida. No configura columnas ni filtros: eso es de cada módulo.

```tsx
import { flexRender, type Table as TanstackTable } from "@tanstack/react-table"
import { FileSearch } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function formatDate(value: string | null) {
  if (!value) return "—"
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value))
}

type DataTableProps<TData> = {
  table: TanstackTable<TData>
  columnCount: number
  emptyTitle: string
  emptyDescription: string
}

export function DataTable<TData>({
  table,
  columnCount,
  emptyTitle,
  emptyDescription,
}: DataTableProps<TData>) {
  const rows = table.getRowModel().rows

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columnCount} className="h-64">
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <FileSearch />
                      </EmptyMedia>
                      <EmptyTitle>{emptyTitle}</EmptyTitle>
                      <EmptyDescription>{emptyDescription}</EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {rows.length} de {table.getCoreRowModel().rows.length} registros
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Crear `src/components/users/columns.tsx`**

Las variantes de `Badge` son las de la spec: *Activo* `default`, *Pendiente* `secondary`, *Inactivo* `outline`.

```tsx
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { toast } from "sonner"
import { formatDate } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { User, UserStatus } from "@/data/users"

const statusVariant: Record<UserStatus, "default" | "secondary" | "outline"> = {
  Activo: "default",
  Pendiente: "secondary",
  Inactivo: "outline",
}

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombre
        <ArrowUpDown data-icon="inline-end" />
      </Button>
    ),
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.email}</span>
    ),
  },
  {
    accessorKey: "role",
    header: "Rol",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status]}>{row.original.status}</Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Creación
        <ArrowUpDown data-icon="inline-end" />
      </Button>
    ),
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    accessorKey: "lastLogin",
    header: "Última conexión",
    cell: ({ row }) => formatDate(row.original.lastLogin),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label={`Acciones de ${row.original.name}`}>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={() => toast.info(`Editar ${row.original.name} (simulado).`)}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => toast.success(`${row.original.name} desactivado (simulado).`)}
              >
                Desactivar
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onSelect={() => toast.success(`${row.original.name} eliminado (simulado).`)}
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
]
```

Si la documentación de `DropdownMenuItem` no expone la prop `variant`, usa `className="text-destructive"` en su lugar.

- [ ] **Step 4: Escribir `src/pages/users-page.tsx`**

```tsx
import { useMemo, useState } from "react"
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table"
import { Search } from "lucide-react"
import { DataTable } from "@/components/data-table"
import { userColumns } from "@/components/users/columns"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { users } from "@/data/users"

const ALL = "all"

export function UsersPage() {
  const [search, setSearch] = useState("")
  const [role, setRole] = useState(ALL)
  const [status, setStatus] = useState(ALL)
  const [sorting, setSorting] = useState<SortingState>([])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return users.filter((user) => {
      const matchesTerm =
        term === "" ||
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      const matchesRole = role === ALL || user.role === role
      const matchesStatus = status === ALL || user.status === status
      return matchesTerm && matchesRole && matchesStatus
    })
  }, [search, role, status])

  const table = useReactTable({
    data: filtered,
    columns: userColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Usuarios</h1>
        <p className="text-sm text-muted-foreground">
          Consulta y filtra los usuarios de la organización.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <InputGroup className="sm:max-w-xs">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Buscar por nombre o email"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </InputGroup>

        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="sm:w-44">
            <SelectValue placeholder="Rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={ALL}>Todos los roles</SelectItem>
              <SelectItem value="Administrador">Administrador</SelectItem>
              <SelectItem value="Editor">Editor</SelectItem>
              <SelectItem value="Visor">Visor</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="sm:w-44">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={ALL}>Todos los estados</SelectItem>
              <SelectItem value="Activo">Activo</SelectItem>
              <SelectItem value="Inactivo">Inactivo</SelectItem>
              <SelectItem value="Pendiente">Pendiente</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        table={table}
        columnCount={userColumns.length}
        emptyTitle="Sin resultados"
        emptyDescription="Ningún usuario coincide con los filtros aplicados."
      />
    </div>
  )
}
```

- [ ] **Step 5: Verificar**

```bash
cd /Users/jaime/Herd/shadcn-starter && npx tsc --noEmit && npm run build
```

En el navegador, sobre `/settings/users`:

1. La tabla muestra 10 filas y la paginación avanza y retrocede.
2. Buscar "ana" filtra por nombre; buscar "@acme" no vacía la tabla.
3. Filtrar por rol *Visor* + estado *Inactivo* reduce el listado.
4. Una combinación imposible (buscar "zzz") muestra el `Empty`.
5. Ordenar por Nombre y por Creación invierte el orden.
6. El menú de acciones lanza un toast y la tabla no cambia.
7. A 375 px la tabla hace scroll horizontal y los filtros se apilan.

- [ ] **Step 6: Commit**

```bash
cd /Users/jaime/Herd/shadcn-starter && git add -A && git commit -m "feat: add users management screen"
```

---

### Task 10: Gestión de API keys

**Files:**
- Create: `src/components/api-keys/columns.tsx`
- Create: `src/components/api-keys/create-key-dialog.tsx`
- Modify: `src/pages/api-keys-page.tsx`

**Interfaces:**
- Consumes: `apiKeys`, `type ApiKey`, `type ApiKeyStatus` de la Tarea 4; `DataTable`, `formatDate` de la Tarea 9
- Produces:
  - `createApiKeyColumns(onRevoke: (key: ApiKey) => void): ColumnDef<ApiKey>[]`
  - `CreateKeyDialog({ onCreated }: { onCreated: (key: ApiKey) => void }): JSX.Element`

- [ ] **Step 1: Leer la documentación**

```bash
cd /Users/jaime/Herd/shadcn-starter && npx shadcn@latest docs dialog alert-dialog alert select field input-group
```

- [ ] **Step 2: Crear `src/components/api-keys/columns.tsx`**

Las columnas necesitan avisar de la revocación hacia arriba, así que se construyen con una función en vez de exportarse como constante.

```tsx
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { formatDate } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { ApiKey, ApiKeyStatus } from "@/data/api-keys"

const statusVariant: Record<ApiKeyStatus, "default" | "secondary" | "destructive"> = {
  Activa: "default",
  Expirada: "secondary",
  Revocada: "destructive",
}

export function createApiKeyColumns(
  onRevoke: (key: ApiKey) => void,
): ColumnDef<ApiKey>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown data-icon="inline-end" />
        </Button>
      ),
      cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
    },
    {
      accessorKey: "tokenPreview",
      header: "Token",
      cell: ({ row }) => (
        <span className="font-mono text-sm text-muted-foreground">
          {row.original.tokenPreview}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => (
        <Badge variant={statusVariant[row.original.status]}>{row.original.status}</Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Creación
          <ArrowUpDown data-icon="inline-end" />
        </Button>
      ),
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      accessorKey: "lastUsed",
      header: "Último uso",
      cell: ({ row }) =>
        row.original.lastUsed ? formatDate(row.original.lastUsed) : "Nunca",
    },
    {
      accessorKey: "expiresAt",
      header: "Expiración",
      cell: ({ row }) =>
        row.original.expiresAt ? formatDate(row.original.expiresAt) : "Sin expiración",
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Acciones de ${row.original.name}`}
              >
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  variant="destructive"
                  disabled={row.original.status === "Revocada"}
                  onSelect={() => onRevoke(row.original)}
                >
                  Revocar
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]
}
```

- [ ] **Step 3: Crear `src/components/api-keys/create-key-dialog.tsx`**

El diálogo tiene dos estados: formulario y token revelado. El token completo solo vive aquí, en estado local, y se pierde al cerrar.

```tsx
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Copy, Plus, TriangleAlert } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import type { ApiKey } from "@/data/api-keys"

const FAKE_LATENCY_MS = 800
const TOKEN_ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789"
const TOKEN_LENGTH = 32

const EXPIRATION_DAYS: Record<string, number | null> = {
  "30d": 30,
  "90d": 90,
  "1y": 365,
  never: null,
}

const createKeySchema = z.object({
  name: z.string().trim().min(3, "El nombre debe tener al menos 3 caracteres."),
  expiration: z.enum(["30d", "90d", "1y", "never"]),
})

type CreateKeyValues = z.infer<typeof createKeySchema>

function generateToken() {
  const bytes = new Uint8Array(TOKEN_LENGTH)
  crypto.getRandomValues(bytes)
  const body = Array.from(bytes, (byte) => TOKEN_ALPHABET[byte % TOKEN_ALPHABET.length]).join("")
  return `sk_live_${body}`
}

function maskToken(token: string) {
  return `sk_live_••••••••${token.slice(-4)}`
}

function expiresAtFrom(expiration: CreateKeyValues["expiration"]) {
  const days = EXPIRATION_DAYS[expiration]
  if (days === null) return null
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString()
}

export function CreateKeyDialog({ onCreated }: { onCreated: (key: ApiKey) => void }) {
  const [open, setOpen] = useState(false)
  const [revealedToken, setRevealedToken] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateKeyValues>({
    resolver: zodResolver(createKeySchema),
    defaultValues: { name: "", expiration: "90d" },
  })

  const expiration = watch("expiration")

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setRevealedToken(null)
      reset()
    }
  }

  async function onSubmit(values: CreateKeyValues) {
    await new Promise((resolve) => setTimeout(resolve, FAKE_LATENCY_MS))
    const token = generateToken()
    const now = new Date().toISOString()
    onCreated({
      id: `k-${token.slice(-8)}`,
      name: values.name,
      tokenPreview: maskToken(token),
      status: "Activa",
      createdAt: now,
      lastUsed: null,
      expiresAt: expiresAtFrom(values.expiration),
    })
    setRevealedToken(token)
  }

  async function copyToken() {
    if (!revealedToken) return
    await navigator.clipboard.writeText(revealedToken)
    toast.success("Token copiado al portapapeles.")
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus data-icon="inline-start" />
          Nueva API key
        </Button>
      </DialogTrigger>
      <DialogContent>
        {revealedToken ? (
          <>
            <DialogHeader>
              <DialogTitle>API key creada</DialogTitle>
              <DialogDescription>
                Cópiala ahora y guárdala en un lugar seguro.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Alert>
                <TriangleAlert />
                <AlertTitle>No volverás a ver este token</AlertTitle>
                <AlertDescription>
                  Al cerrar este diálogo solo quedará visible una versión enmascarada.
                </AlertDescription>
              </Alert>
              <InputGroup>
                <InputGroupInput readOnly value={revealedToken} className="font-mono" />
                <InputGroupAddon align="inline-end">
                  <Button variant="ghost" size="icon" onClick={copyToken} aria-label="Copiar token">
                    <Copy />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <DialogFooter>
              <Button onClick={() => handleOpenChange(false)}>Hecho</Button>
            </DialogFooter>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <DialogHeader>
              <DialogTitle>Nueva API key</DialogTitle>
              <DialogDescription>
                Dale un nombre reconocible y elige cuándo debe expirar.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup className="py-4">
              <Field data-invalid={errors.name ? true : undefined}>
                <FieldLabel htmlFor="key-name">Nombre</FieldLabel>
                <Input
                  id="key-name"
                  placeholder="Integración de facturación"
                  aria-invalid={errors.name ? true : undefined}
                  {...register("name")}
                />
                {errors.name ? (
                  <FieldError>{errors.name.message}</FieldError>
                ) : null}
              </Field>
              <Field>
                <FieldLabel htmlFor="key-expiration">Expiración</FieldLabel>
                <Select
                  value={expiration}
                  onValueChange={(value) =>
                    setValue("expiration", value as CreateKeyValues["expiration"])
                  }
                >
                  <SelectTrigger id="key-expiration">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="30d">30 días</SelectItem>
                      <SelectItem value="90d">90 días</SelectItem>
                      <SelectItem value="1y">1 año</SelectItem>
                      <SelectItem value="never">Sin expiración</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
                {isSubmitting ? "Creando…" : "Crear key"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
```

Si la documentación de `InputGroupAddon` no expone `align="inline-end"`, consulta el valor correcto en los ejemplos y ajústalo.

- [ ] **Step 4: Escribir `src/pages/api-keys-page.tsx`**

```tsx
import { useMemo, useState } from "react"
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table"
import { Search } from "lucide-react"
import { toast } from "sonner"
import { createApiKeyColumns } from "@/components/api-keys/columns"
import { CreateKeyDialog } from "@/components/api-keys/create-key-dialog"
import { DataTable } from "@/components/data-table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { apiKeys as initialApiKeys, type ApiKey } from "@/data/api-keys"

const ALL = "all"

export function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>(initialApiKeys)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState(ALL)
  const [sorting, setSorting] = useState<SortingState>([])
  const [keyToRevoke, setKeyToRevoke] = useState<ApiKey | null>(null)

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return keys.filter((key) => {
      const matchesTerm = term === "" || key.name.toLowerCase().includes(term)
      const matchesStatus = status === ALL || key.status === status
      return matchesTerm && matchesStatus
    })
  }, [keys, search, status])

  const columns = useMemo(() => createApiKeyColumns(setKeyToRevoke), [])

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  function handleCreated(key: ApiKey) {
    setKeys((current) => [key, ...current])
    toast.success(`API key "${key.name}" creada.`)
  }

  function confirmRevoke() {
    if (!keyToRevoke) return
    setKeys((current) =>
      current.map((key) =>
        key.id === keyToRevoke.id ? { ...key, status: "Revocada" as const } : key,
      ),
    )
    toast.success(`API key "${keyToRevoke.name}" revocada.`)
    setKeyToRevoke(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">API Keys</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona los tokens de acceso de tu organización.
          </p>
        </div>
        <CreateKeyDialog onCreated={handleCreated} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <InputGroup className="sm:max-w-xs">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Buscar por nombre"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </InputGroup>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="sm:w-44">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={ALL}>Todos los estados</SelectItem>
              <SelectItem value="Activa">Activa</SelectItem>
              <SelectItem value="Revocada">Revocada</SelectItem>
              <SelectItem value="Expirada">Expirada</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        table={table}
        columnCount={columns.length}
        emptyTitle="Sin resultados"
        emptyDescription="Ninguna API key coincide con los filtros aplicados."
      />

      <AlertDialog
        open={keyToRevoke !== null}
        onOpenChange={(open) => {
          if (!open) setKeyToRevoke(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Revocar esta API key?</AlertDialogTitle>
            <AlertDialogDescription>
              {keyToRevoke
                ? `"${keyToRevoke.name}" dejará de funcionar de inmediato. Esta acción no se puede deshacer.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRevoke}>Revocar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
```

- [ ] **Step 5: Verificar**

```bash
cd /Users/jaime/Herd/shadcn-starter && npx tsc --noEmit && npm run build
```

En el navegador, sobre `/settings/api-keys`:

1. Ocho keys en la tabla. "Nunca" en la que no tiene último uso, "Sin expiración" en las que no expiran.
2. *Nueva API key* → enviar con nombre de 2 caracteres muestra el error de validación.
3. Con un nombre válido → spinner, luego el token completo con el `Alert` de advertencia.
4. *Copiar* muestra el toast; pegar en cualquier campo devuelve el token completo.
5. *Hecho* cierra y la nueva key aparece la primera, enmascarada, con estado *Activa*.
6. Revocar una key activa abre el `AlertDialog`; cancelar no cambia nada, confirmar la pasa a *Revocada* con badge destructivo.
7. En una key ya revocada, la opción *Revocar* está deshabilitada.
8. Filtrar por *Expirada* deja una sola fila; buscar "zzz" muestra el `Empty`.
9. A 375 px la tabla hace scroll horizontal y el diálogo cabe en pantalla.

- [ ] **Step 6: Commit**

```bash
cd /Users/jaime/Herd/shadcn-starter && git add -A && git commit -m "feat: add api keys management with create and revoke"
```

---

### Task 11: Perfil

Tres de las cuatro cards. La de *Apariencia* llega en la Tarea 12.

**Files:**
- Modify: `src/pages/profile-page.tsx`

**Interfaces:**
- Consumes: `useAuth()` de la Tarea 5; `formatDate` de la Tarea 9
- Produces: `ProfilePage`

- [ ] **Step 1: Escribir `src/pages/profile-page.tsx`**

```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { z } from "zod"
import { formatDate } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/lib/auth"

const FAKE_LATENCY_MS = 800

const personalSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres."),
})

const passwordSchema = z
  .object({
    currentPassword: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
    newPassword: z.string().min(8, "La nueva contraseña debe tener al menos 8 caracteres."),
    confirmPassword: z.string().min(1, "Confirma la nueva contraseña."),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  })

type PersonalValues = z.infer<typeof personalSchema>
type PasswordValues = z.infer<typeof passwordSchema>

export function ProfilePage() {
  const { user, updateName } = useAuth()

  const personalForm = useForm<PersonalValues>({
    resolver: zodResolver(personalSchema),
    defaultValues: { name: user?.name ?? "" },
  })

  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  })

  if (!user) return null

  async function onSubmitPersonal(values: PersonalValues) {
    await new Promise((resolve) => setTimeout(resolve, FAKE_LATENCY_MS))
    updateName(values.name)
    toast.success("Datos actualizados.")
  }

  async function onSubmitPassword() {
    await new Promise((resolve) => setTimeout(resolve, FAKE_LATENCY_MS))
    passwordForm.reset()
    toast.success("Contraseña actualizada.")
  }

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Perfil</h1>
        <p className="text-sm text-muted-foreground">
          Gestiona tu información y tus preferencias.
        </p>
      </div>

      <Card>
        <form onSubmit={personalForm.handleSubmit(onSubmitPersonal)} noValidate>
          <CardHeader>
            <CardTitle>Datos personales</CardTitle>
            <CardDescription>Tu nombre visible en la aplicación.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field data-invalid={personalForm.formState.errors.name ? true : undefined}>
                <FieldLabel htmlFor="name">Nombre</FieldLabel>
                <Input
                  id="name"
                  aria-invalid={personalForm.formState.errors.name ? true : undefined}
                  {...personalForm.register("name")}
                />
                {personalForm.formState.errors.name ? (
                  <FieldError>
                    {personalForm.formState.errors.name.message}
                  </FieldError>
                ) : null}
              </Field>
              <Field data-disabled>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" value={user.email} disabled />
                <FieldDescription>El email no se puede modificar.</FieldDescription>
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={personalForm.formState.isSubmitting}>
              {personalForm.formState.isSubmitting ? (
                <Spinner data-icon="inline-start" />
              ) : null}
              Guardar cambios
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} noValidate>
          <CardHeader>
            <CardTitle>Cambiar contraseña</CardTitle>
            <CardDescription>
              El cambio es simulado: no se guarda ninguna contraseña.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field
                data-invalid={
                  passwordForm.formState.errors.currentPassword ? true : undefined
                }
              >
                <FieldLabel htmlFor="current-password">Contraseña actual</FieldLabel>
                <Input
                  id="current-password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={
                    passwordForm.formState.errors.currentPassword ? true : undefined
                  }
                  {...passwordForm.register("currentPassword")}
                />
                {passwordForm.formState.errors.currentPassword ? (
                  <FieldError>
                    {passwordForm.formState.errors.currentPassword.message}
                  </FieldError>
                ) : null}
              </Field>
              <Field
                data-invalid={passwordForm.formState.errors.newPassword ? true : undefined}
              >
                <FieldLabel htmlFor="new-password">Nueva contraseña</FieldLabel>
                <Input
                  id="new-password"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={
                    passwordForm.formState.errors.newPassword ? true : undefined
                  }
                  {...passwordForm.register("newPassword")}
                />
                {passwordForm.formState.errors.newPassword ? (
                  <FieldError>
                    {passwordForm.formState.errors.newPassword.message}
                  </FieldError>
                ) : null}
              </Field>
              <Field
                data-invalid={
                  passwordForm.formState.errors.confirmPassword ? true : undefined
                }
              >
                <FieldLabel htmlFor="confirm-password">Confirmar contraseña</FieldLabel>
                <Input
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={
                    passwordForm.formState.errors.confirmPassword ? true : undefined
                  }
                  {...passwordForm.register("confirmPassword")}
                />
                {passwordForm.formState.errors.confirmPassword ? (
                  <FieldError>
                    {passwordForm.formState.errors.confirmPassword.message}
                  </FieldError>
                ) : null}
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={passwordForm.formState.isSubmitting}>
              {passwordForm.formState.isSubmitting ? (
                <Spinner data-icon="inline-start" />
              ) : null}
              Actualizar contraseña
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información de la cuenta</CardTitle>
          <CardDescription>Datos de solo lectura.</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-1">
              <dt className="text-sm text-muted-foreground">Rol</dt>
              <dd className="text-sm font-medium">{user.role}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-sm text-muted-foreground">Alta</dt>
              <dd className="text-sm font-medium">{formatDate(user.createdAt)}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-sm text-muted-foreground">Último acceso</dt>
              <dd className="text-sm font-medium">{formatDate(user.lastLogin)}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}
```

- [ ] **Step 2: Verificar**

```bash
cd /Users/jaime/Herd/shadcn-starter && npx tsc --noEmit && npm run build
```

En el navegador, sobre `/profile`:

1. El email aparece deshabilitado y no se puede editar.
2. Vaciar el nombre y enviar muestra el error de validación.
3. Cambiar el nombre y guardar: spinner, toast, y el nombre cambia **también en el sidebar**.
4. Recargar la página conserva el nombre nuevo.
5. Contraseñas distintas en nueva y confirmación → error en el campo de confirmación.
6. Contraseñas válidas → spinner, toast, y los tres campos quedan vacíos.

- [ ] **Step 3: Commit**

```bash
cd /Users/jaime/Herd/shadcn-starter && git add -A && git commit -m "feat: add profile page with simulated forms"
```

---

### Task 12: Selector de tema

**Files:**
- Modify: `src/components/theme-provider.tsx`
- Modify: `src/components/ui/sonner.tsx`
- Modify: `package.json` (eliminar `next-themes`)
- Modify: `index.html`
- Modify: `src/pages/profile-page.tsx`

**Interfaces:**
- Consumes: `ProfilePage` de la Tarea 11
- Produces:
  - `ThemeProvider` y `useTheme(): { theme: Theme; setTheme(theme: Theme): void }`,
    ambos exportados desde `@/components/theme-provider`, con
    `type Theme = "light" | "dark" | "system"`

> **Cambio respecto al plan original.** La plantilla de Vite ya trae
> `src/components/theme-provider.tsx`, un provider completo con persistencia en
> `localStorage`, escucha de `prefers-color-scheme`, sincronización entre pestañas y
> supresión de transiciones al cambiar. Hace todo lo que este plan iba a escribir en
> `src/lib/theme.tsx`, y mejor. **Se adopta el existente**: no se crea `src/lib/theme.tsx`.
> Esta tarea lo adapta a la spec y lo conecta.

- [ ] **Step 1: Adaptar `src/components/theme-provider.tsx`**

Tres cambios, ninguno más. No reescribas el fichero.

1. **Tema por defecto claro.** El provider declara `defaultTheme = "system"`. La spec exige
   claro: cámbialo a `defaultTheme = "light"`, de modo que sin preferencia guardada la
   aplicación arranque en claro aunque el sistema operativo esté en oscuro.
2. **Eliminar el atajo de teclado.** El provider registra un listener global de `keydown`
   que alterna el tema al pulsar `d`. No está en la spec y el humano decidió quitarlo: una
   tecla sin modificador cambia el tema sin querer. Elimina ese `useEffect` completo y las
   funciones que solo él usaba (`isEditableTarget`). Deja intactos los otros dos `useEffect`
   (aplicación del tema y sincronización entre pestañas).
3. **Exportar el tipo `Theme`.** Está declarado como `type Theme = "dark" | "light" | "system"`
   pero sin `export`, y el Step 4 lo necesita para tipar el `ToggleGroup`. Añádele `export`.
4. **Nada más.** La persistencia, la clave `storageKey = "theme"`, la escucha del sistema y
   la supresión de transiciones se conservan tal cual.

- [ ] **Step 2: Comprobar que `sonner` está conectado al provider del proyecto**

Ya hecho en la Tarea 3, que sacó `next-themes` del proyecto y reescribió el import. Aquí
solo se verifica, porque el paso siguiente depende de ello:

```bash
cd /Users/jaime/Herd/shadcn-starter && head -1 src/components/ui/sonner.tsx && grep -rn "next-themes" src/ package.json || echo "sin referencias"
```

Esperado: el import es `from "@/components/theme-provider"` y no queda ninguna referencia
a `next-themes`. Si no fuera así, corrígelo aquí antes de seguir.

- [ ] **Step 3: Añadir el script anti-parpadeo a `index.html`**

Va dentro de `<head>`, antes de cualquier `<script type="module">`. La clave de
`localStorage` debe ser exactamente la del provider (`theme`); si no coinciden, el script
no hace nada útil.

El provider añade al elemento `<html>` la clase `light` o `dark` según el tema resuelto,
así que el script debe hacer lo mismo para que no haya salto al montar React.

```html
<script>
  (function () {
    var stored = localStorage.getItem("theme")
    var isDark =
      stored === "dark" ||
      (stored === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
    document.documentElement.classList.add(isDark ? "dark" : "light")
  })()
</script>
```

Sin preferencia guardada el script aplica `light`, que es el valor por defecto exigido por
la spec.

- [ ] **Step 4: Añadir la card *Apariencia* a `src/pages/profile-page.tsx`**

Va entre la card de contraseña y la de información de la cuenta. Añade los imports:

```tsx
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useTheme, type Theme } from "@/components/theme-provider"
```

Dentro del componente, junto a los dos `useForm` y **antes** del `if (!user) return null`
— si va después, el hook dejaría de ejecutarse en algunos renders y React lanzaría un
error de orden de hooks:

```tsx
const { theme, setTheme } = useTheme()
```

Y la card:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Apariencia</CardTitle>
    <CardDescription>Elige el tema de la interfaz.</CardDescription>
  </CardHeader>
  <CardContent>
    <Field orientation="horizontal">
      <FieldTitle id="theme-label">Tema</FieldTitle>
      <ToggleGroup
        type="single"
        aria-labelledby="theme-label"
        spacing={2}
        value={theme}
        onValueChange={(value) => {
          if (value) setTheme(value as Theme)
        }}
      >
        <ToggleGroupItem value="light">Claro</ToggleGroupItem>
        <ToggleGroupItem value="dark">Oscuro</ToggleGroupItem>
        <ToggleGroupItem value="system">Sistema</ToggleGroupItem>
      </ToggleGroup>
    </Field>
  </CardContent>
</Card>
```

Esta card no lleva `CardFooter`: el cambio se aplica al instante y no hay botón de guardar ni toast.

- [ ] **Step 5: Verificar**

```bash
cd /Users/jaime/Herd/shadcn-starter && npx tsc --noEmit && npm run build
```

En el navegador:

1. Con `localStorage` limpio y el SO en oscuro, la aplicación arranca en **claro**.
2. Pulsar *Oscuro* cambia la interfaz al instante.
3. Recargar mantiene el tema oscuro y **no hay fogonazo blanco** al cargar.
4. Pulsar *Sistema* adopta la preferencia del SO.
5. Cerrar sesión y volver a `/login` conserva el tema elegido.
6. Pulsar la tecla `d` fuera de un campo de texto **no** hace nada: el atajo debe estar eliminado.
7. Un toast (por ejemplo, el de una acción en la tabla de usuarios) se ve correctamente en tema oscuro — comprueba que `sonner` sigue el tema tras cambiarle el import.
8. Recorre las cinco pantallas en oscuro y comprueba que ningún texto queda ilegible ni ningún borde desaparece.

- [ ] **Step 6: Commit**

```bash
cd /Users/jaime/Herd/shadcn-starter && git add -A && git commit -m "feat: add theme selector to the profile page"
```

---

### Task 13: Documentación y revisión final

**Files:**
- Modify o Create: `README.md`

**Interfaces:**
- Consumes: todo lo anterior
- Produces: el starter terminado y documentado

- [ ] **Step 1: Escribir `README.md`**

Sustituye el README que generó la plantilla.

````markdown
# Starter frontend shadcn/ui

Plantilla de partida para proyectos frontend: login simulado, layout con sidebar,
gestión de usuarios, gestión de API keys y perfil de usuario. Todos los datos son
mock. No hay backend, base de datos ni persistencia real.

## Requisitos

- Node.js 20 o superior

## Arranque

```bash
npm install
npm run dev
```

## Credenciales de demostración

```
ana.torres@acme.com
demo1234
```

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- shadcn/ui (`base: radix`, preset `lyra`)
- react-router, react-hook-form + zod, @tanstack/react-table v8, sonner

## Estructura

```
src/
  components/ui/       primitivos de shadcn
  components/          componentes de la aplicación
  layouts/             layout autenticado
  pages/               una por pantalla
  data/                datos mock
  lib/                 auth, tema, utilidades
```

## Tema

Los tokens de color viven en el fichero CSS global, en los bloques `:root` y `.dark`.
Para cambiar la paleta, edita esos valores siguiendo
[la documentación de theming de shadcn](https://ui.shadcn.com/docs/theming).

El tema por defecto es claro. El usuario puede cambiarlo desde *Perfil → Apariencia*,
y la preferencia se guarda en `localStorage`.

## Qué NO incluye

Backend, base de datos, autenticación real, persistencia, tests e i18n. Es un punto de
partida, no una aplicación terminada.
````

- [ ] **Step 2: Revisión final contra las reglas de shadcn**

Barrido de las violaciones más fáciles de colar. Los cuatro comandos deben salir vacíos:

```bash
cd /Users/jaime/Herd/shadcn-starter && grep -rn "space-y-\|space-x-" src/ --include="*.tsx" | grep -v "components/ui/"
```

```bash
cd /Users/jaime/Herd/shadcn-starter && grep -rnE "(bg|text|border)-(red|green|blue|emerald|amber|yellow|slate|gray|zinc)-[0-9]" src/ --include="*.tsx" | grep -v "components/ui/"
```

```bash
cd /Users/jaime/Herd/shadcn-starter && grep -rn "dark:" src/ --include="*.tsx" | grep -v "components/ui/"
```

```bash
cd /Users/jaime/Herd/shadcn-starter && grep -rn "use client" src/ --include="*.tsx"
```

Cualquier resultado se corrige antes de cerrar la tarea.

- [ ] **Step 3: Verificación completa**

```bash
cd /Users/jaime/Herd/shadcn-starter && npx tsc --noEmit && npm run build
```

Recorrido completo en el navegador, en **claro y oscuro**, a **1280 px, 768 px y 375 px**:

1. `/login` → entrar con las credenciales demo.
2. Dashboard → placeholders correctos.
3. Sidebar → colapso, modo icono, panel deslizante en móvil, item activo correcto.
4. Usuarios → búsqueda, dos filtros, orden, paginación, `Empty`, acciones con toast.
5. API Keys → crear key con revelado y copia, revocar con confirmación, filtros, `Empty`.
6. Perfil → los dos formularios, el selector de tema, la información de cuenta.
7. Cerrar sesión → vuelta a `/login`, y `/dashboard` ya no es accesible.

Confirma también que la consola del navegador no muestra errores ni advertencias de React.

- [ ] **Step 4: Commit**

```bash
cd /Users/jaime/Herd/shadcn-starter && git add -A && git commit -m "docs: add project README"
```

---

## Cobertura de la spec

| Sección de la spec | Tarea |
|---|---|
| §3 Stack, andamiaje | 1, 3 |
| §3.1 Reglas de la skill | Global Constraints, 13 |
| §4 Rutas | 5 |
| §5 Autenticación simulada | 5 |
| §6 Layout y navegación | 7 |
| §7 Login | 6 |
| §7 Dashboard | 8 |
| §7 Gestión de usuarios | 9 |
| §7 Gestión de API keys | 10 |
| §7 Perfil | 11, 12 |
| §8 Datos mock | 4 |
| §9 Tema y selector | 2, 12 |
| §10 Estructura de carpetas | 4–12 |
| §11 Responsive | 7–13 |
| §12 Verificación | cada tarea, y 13 |
