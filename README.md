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
