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

## Autenticación simulada

`src/lib/auth.tsx` no habla con ningún backend: `login` compara contra la
credencial de demostración y guarda el usuario completo —incluido su
`role`— en `localStorage`, que aquí hace de fuente de verdad. Esa entrada
se puede editar a mano desde las devtools, así que `role` es falsificable y
nunca debe usarse para autorizar nada en una implementación real. Tampoco
hay token, expiración ni renovación de sesión, ni propagación de `logout`
entre pestañas. `ProtectedRoute` (en `src/components/protected-route.tsx`)
solo decide qué renderizar; no es un control de autorización. Antes de
copiar este proyecto a producción, sustituye este módulo por un flujo con
token emitido por el servidor y valida los permisos ahí, no en el cliente.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- shadcn/ui (`base: radix`, preset `lyra`, con paleta, tipografía e iconos propios
  sobreescribiendo los del preset)
- react-router, react-hook-form + zod, `@tanstack/react-table` fijado en v8 (no v9),
  sonner
- Iconos con `lucide-react`; tipografía Inter para la interfaz y JetBrains Mono
  reservada al token de las API keys

## Estructura

```
src/
  components/ui/       primitivos de shadcn
  components/          componentes de la aplicación
  layouts/             layout autenticado
  pages/               una por pantalla
  data/                datos mock
  lib/                 auth, tema, utilidades
  hooks/               hooks compartidos
```

## Tema

Los tokens de color viven en `src/index.css`, en los bloques `:root` y `.dark`.
Para cambiar la paleta, edita esos valores siguiendo
[la documentación de theming de shadcn](https://ui.shadcn.com/docs/theming).

El tema por defecto es claro. El usuario puede cambiarlo desde *Perfil → Apariencia*,
y la preferencia se guarda en `localStorage` bajo la clave `theme`.

## Qué NO incluye

Backend, base de datos, autenticación real, persistencia, tests e i18n. Es un punto de
partida, no una aplicación terminada.
