# Diseño — Starter frontend shadcn/ui

Fecha: 2026-08-16
Spec de origen: [docs/initial-spec.md](../../initial-spec.md)

## 1. Objetivo

Un starter frontend funcional y visualmente pulido, basado en shadcn/ui, que sirva
como punto de partida para nuevos proyectos. Toda la información proviene de datos
mock. No hay backend, base de datos ni persistencia real.

Este documento amplía la spec original con un módulo de gestión de API keys, acordado
después de escribirla. Ante cualquier discrepancia, manda este documento.

## 2. Decisiones tomadas

Estas decisiones resuelven ambigüedades de la spec original. Son vinculantes.

| Tema | Decisión |
|---|---|
| Contenido del Dashboard | Placeholders vacíos, sin datos ni gráficas |
| Tabla de usuarios | TanStack Table (`@tanstack/react-table`) |
| Formularios | react-hook-form + zod + componente `<Form>` de shadcn |
| Sesión | Persistida en `localStorage`; sobrevive al refresco |
| Acciones sobre usuarios | Decorativas: disparan un toast, no mutan datos |
| Módulo de API keys | Crear (con revelado único del token) y revocar, sobre estado local |
| Atributos de API key | Base, sin permisos ni entorno |
| Idioma de la UI | Español |
| Tests | Ninguno |
| Estructura de carpetas | Por tipo (`pages/`, `components/`, `data/`, `lib/`) |

## 3. Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- shadcn/ui

Dependencias adicionales, cada una justificada por una decisión de arriba:

- `react-router` — navegación y rutas protegidas
- `react-hook-form`, `zod`, `@hookform/resolvers` — formularios y validación
- `@tanstack/react-table` — tablas de usuarios y de API keys
- `sonner` — toasts
- `lucide-react` — iconos

No se añade ninguna otra dependencia.

## 4. Rutas

Las rutas van en inglés (convención de código); los textos visibles, en español.

| Ruta | Acceso | Pantalla |
|---|---|---|
| `/login` | Público | Login |
| `/dashboard` | Protegida | Dashboard |
| `/settings/users` | Protegida | Gestión de usuarios |
| `/settings/api-keys` | Protegida | Gestión de API keys |
| `/profile` | Protegida | Perfil de usuario |
| `/` | — | Redirige a `/dashboard` |

Cualquier ruta desconocida redirige a `/dashboard` si hay sesión, o a `/login` si no.

## 5. Autenticación simulada

`src/lib/auth.tsx` expone `AuthProvider` y el hook `useAuth()`, con:

- `user: User | null`
- `login(email, password): Promise<void>`
- `logout(): void`

`login()` espera ~800 ms simulados y valida contra las credenciales demo, exportadas
como `DEMO_CREDENTIALS` desde `src/data/users.ts` junto al usuario correspondiente del
array mock. Si no coinciden, rechaza con un error que el formulario
muestra. Si coinciden, guarda el usuario en `localStorage` bajo una clave única del
starter. `AuthProvider` rehidrata desde `localStorage` al montar.

`<ProtectedRoute>` envuelve las rutas privadas: si no hay sesión, redirige a `/login`.

La pantalla de login muestra las credenciales demo como pista visible. Sin ellas el
starter no se puede probar.

No hay tokens, refresh, roles a nivel de ruta ni expiración. Nada de eso está en la spec.

## 6. Layout principal

`AppLayout` compone `SidebarProvider` + `AppSidebar` + header + `<Outlet/>`, siguiendo
la plantilla `sidebar-07`.

Se conserva de `sidebar-07`: el header con marca, la navegación colapsable, `NavUser`
en el footer con su dropdown, el colapso a modo icono en desktop y el `Sheet` en móvil.

Se elimina de `sidebar-07`: el `TeamSwitcher` (lo reemplaza un bloque de marca simple)
y `NavProjects`. Ninguno aplica a este starter.

El header contiene `SidebarTrigger`, un separador y un breadcrumb derivado de la ruta
activa.

### Navegación

- **Dashboard** → `/dashboard`
- **Configuración** (colapsable)
  - *Usuarios* → `/settings/users`
  - *API Keys* → `/settings/api-keys`
- **Perfil** → `/profile`

El item activo se resalta con `isActive` de los componentes de sidebar de shadcn.
**Cerrar sesión** vive en el dropdown de `NavUser`, como en la plantilla original.

## 7. Pantallas

### Login

Estructura visual de `login-01`. Campos email y contraseña, validados con zod (email
con formato válido, contraseña con longitud mínima). El botón muestra spinner y queda
deshabilitado durante el envío. Credenciales incorrectas producen un mensaje de error
en el formulario. Un login correcto navega a `/dashboard`.

### Dashboard

Página de placeholders vacíos, al estilo del ejemplo oficial de `sidebar-07`: una fila
de tres bloques y un bloque grande debajo, con bordes punteados y sin contenido. No
consume datos mock.

### Gestión de usuarios

Data table construida con TanStack Table. Columnas: nombre, email, rol, estado (como
`Badge` con color por estado), fecha de creación y última conexión.

Controles sobre la tabla:

- Input de búsqueda que filtra por nombre y email
- Select de filtro por rol
- Select de filtro por estado
- Ordenamiento por columna
- Paginación

Cada fila tiene un menú `⋯` con Editar, Desactivar y Eliminar. Las tres acciones solo
disparan un toast de confirmación; no modifican los datos. Es intencional.

Si los filtros no devuelven resultados, la tabla muestra una fila de estado vacío.

### Gestión de API keys

Data table con las mismas capacidades que la de usuarios: búsqueda por nombre, filtro
por estado, ordenamiento y paginación. Columnas: nombre, token enmascarado, estado
(`Badge` por estado), fecha de creación, último uso y expiración. Último uso vacío se
muestra como "Nunca"; expiración vacía, como "Sin expiración".

**Crear.** Un botón *Nueva API key* abre un `Dialog` con react-hook-form + zod: nombre
(mínimo 3 caracteres) y expiración (`Select` con 30 días, 90 días, 1 año o sin
expiración). Al enviar espera ~800 ms y genera un token fake con el prefijo `sk_live_`
seguido de 32 caracteres aleatorios producidos con `crypto.getRandomValues`.

El diálogo entonces cambia a su segundo estado, el de **revelado**: muestra el token
completo en un campo monoespaciado de solo lectura, un botón *Copiar* que usa
`navigator.clipboard` y un `Alert` advirtiendo que el token no se volverá a mostrar.
Al cerrar, la nueva key ya figura en la tabla, enmascarada.

**Revocar.** El menú `⋯` de cada fila ofrece *Revocar*, que abre un `AlertDialog` de
confirmación. Al confirmar, la key pasa a estado *Revocada* y aparece un toast. La
opción se deshabilita en keys ya revocadas.

No existe acción de copiar en la tabla: una vez cerrado el diálogo de creación, el
token completo deja de estar disponible. Esa ausencia es parte del patrón que el
módulo enseña.

**Sobre la inconsistencia con Usuarios.** Usuarios tiene acciones decorativas y API
Keys muta de verdad el estado local. Es deliberado: el starter muestra los dos
patrones, el de pantalla de solo lectura y el de mutación en memoria. No es un
descuido y no debe "corregirse" unificando ambos.

### Perfil de usuario

Tres cards:

1. **Datos personales** — nombre editable, email deshabilitado en solo lectura.
2. **Cambiar contraseña** — contraseña actual, nueva y confirmación. El schema zod usa
   `refine` para exigir que la nueva y su confirmación coincidan.
3. **Información de la cuenta** — rol, fecha de alta y último acceso, en solo lectura.

Los dos formularios simulan ~800 ms de latencia, deshabilitan el botón mientras envían
y muestran un toast de éxito al terminar.

Guardar el nombre actualiza el usuario del `AuthContext` y su copia en `localStorage`,
de modo que el cambio se refleja de inmediato en `NavUser`. El cambio de contraseña es
puramente simulado: valida, espera, muestra el toast y limpia sus campos, sin guardar
nada. Los datos mock del array de usuarios nunca se modifican.

## 8. Datos mock

`src/data/users.ts` define el tipo `User` y exporta un array de unos 30 registros
escritos a mano. Sin librerías de generación de datos.

```ts
type UserRole = "Administrador" | "Editor" | "Visor"
type UserStatus = "Activo" | "Inactivo" | "Pendiente"

type User = {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  createdAt: string   // ISO 8601
  lastLogin: string   // ISO 8601
}
```

`src/data/api-keys.ts` define el tipo `ApiKey` y exporta unos 8 registros mock.

```ts
type ApiKeyStatus = "Activa" | "Revocada" | "Expirada"

type ApiKey = {
  id: string
  name: string
  tokenPreview: string      // "sk_live_••••••••a3f9"
  status: ApiKeyStatus
  createdAt: string         // ISO 8601
  lastUsed: string | null   // null = nunca usada
  expiresAt: string | null  // null = sin expiración
}
```

La página de API keys copia ese array a un `useState` al montar y opera sobre esa
copia. El módulo de usuarios lee su array directamente, sin copiarlo.

`src/data/nav.ts` exporta los items de navegación del sidebar.

Los datos se importan directamente desde las páginas. No hay capa de servicios,
repositorios ni cliente de datos.

## 9. Tema

`src/globals.css` contiene las variables CSS de shadcn para `:root` y `.dark`, según
la documentación de theming de shadcn.

No hay toggle de tema en la interfaz, tal como exige la spec. Para cambiar de tema se
añade `class="dark"` al elemento `<html>` en `index.html`. El README lo documenta.

## 10. Estructura de carpetas

```
src/
  components/ui/          primitivos de shadcn
  components/             app-sidebar, nav-main, nav-user,
                          site-header, protected-route,
                          data-table
  components/users/       columns.tsx
  components/api-keys/    columns.tsx, create-key-dialog.tsx
  layouts/                app-layout.tsx
  pages/                  login-page, dashboard-page,
                          users-page, api-keys-page, profile-page
  data/                   users.ts, api-keys.ts, nav.ts
  lib/                    auth.tsx, utils.ts
  app.tsx
  main.tsx
  globals.css
```

Cada archivo tiene un propósito único. Las páginas componen; los componentes de
`components/` no conocen las rutas salvo para navegar.

`components/data-table.tsx` es la única abstracción del starter: recibe una instancia
de TanStack Table y renderiza cabecera, cuerpo, estado vacío y paginación. Existe
porque hay dos tablas reales que la usan, no por anticipación. Las definiciones de
columnas y los controles de filtro siguen siendo propios de cada módulo.

## 11. Responsive

La aplicación funciona en desktop, tablet y móvil. El sidebar usa los mecanismos
propios de shadcn: colapso a modo icono en desktop y `Sheet` deslizable en móvil.
Ambas tablas hacen scroll horizontal en pantallas estrechas y sus controles de filtro
se apilan verticalmente.

## 12. Verificación

No hay tests automatizados. Cada entrega se valida con:

1. `tsc --noEmit` sin errores
2. `vite build` sin errores
3. Revisión visual en el navegador a 1280 px, 768 px y 375 px

## 13. Fuera de alcance

Explícitamente no se implementa: backend, base de datos, persistencia real,
autenticación real, i18n, toggle de tema en la UI, gráficas, creación o edición de
usuarios, tests, ni ninguna funcionalidad no contemplada en este documento.

Sobre las API keys en concreto: los tokens generados no autentican nada, no se validan
contra ningún servicio y no sobreviven a un refresco de la página. Tampoco hay
edición de keys, rotación, permisos ni entornos.
