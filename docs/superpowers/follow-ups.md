# Pendientes conocidos

Hallazgos reales que se decidió **no** corregir durante la construcción del starter. Ninguno
bloquea el uso del proyecto; todos salieron de las revisiones por tarea o de la revisión
final de rama, y están aquí para que no se pierdan.

Fecha: 2026-08-16. Estado del proyecto en ese momento: las 13 tareas del plan completadas y
revisadas, más una ronda de corrección final.

## Correctitud y robustez

**`localStorage` se toca de tres formas distintas, con tres niveles de cuidado.**
`src/lib/auth.tsx` usa `window.localStorage` con `try/catch` solo alrededor de `JSON.parse`.
`src/components/theme-provider.tsx` usa `localStorage` a secas, sin `try/catch`, pero sí
escucha el evento `storage` y sincroniza entre pestañas. El script de `index.html` usa
`localStorage` a secas.

Dos consecuencias. La asimetría está al revés: la preferencia de tema se sincroniza entre
pestañas, pero **cerrar sesión en una pestaña deja las demás autenticadas**, que es donde
la sincronización de verdad importa. Y ningún acceso está protegido, así que en un origen
con el almacenamiento deshabilitado (Safari en privado, ajustes endurecidos) el
inicializador de `ThemeProvider` lanza durante el primer render y, al no haber
`ErrorBoundary`, la aplicación se queda en blanco.

Arreglo: un `src/lib/storage.ts` mínimo con `try/catch` usado por ambos providers, y un
listener de `storage` en `AuthProvider` que refleje el del tema.

**`isStoredUser` afirma más de lo que comprueba.** En `src/lib/auth.tsx` está declarado
como `value is User` pero valida 4 de los 7 campos, y comprueba `role` como
`typeof === "string"` en vez de contra `UserRole`. Una entrada editada a mano con
`role: "SuperAdmin"` y sin `createdAt` pasa el filtro y queda tipada como `User` válido.
No rompe nada hoy, pero el guard se añadió justamente para enseñar a validar la sesión
rehidratada, y enseñarlo a medias es peor que no enseñarlo.

**Sin manejo de error en flujos secundarios.** Los formularios de perfil y el login
gestionan sus fallos; otros caminos no.

## Arquitectura

**`formatDate` vive en el módulo equivocado.** Está exportado desde
`src/components/data-table.tsx`, y `src/pages/profile-page.tsx` —una pantalla sin tabla—
lo importa de ahí. Debería estar en `src/lib/format.ts`.

**`FAKE_LATENCY_MS = 800` está declarado tres veces**, en `src/lib/auth.tsx`,
`src/pages/profile-page.tsx` y `src/components/api-keys/create-key-dialog.tsx`. Es la
duplicación que ya cruzó la tercera aparición. Un `src/lib/mock.ts` con `simulateLatency()`
daría además un único sitio donde ajustar la simulación.

**El cambio de nombre en Perfil nunca llega a la tabla de Usuarios.** `updateName` crea un
objeto nuevo, pero `src/data/users.ts` sigue teniendo "Ana Torres". Es una consecuencia
justa de la arquitectura deliberadamente plana, pero es el único sitio donde dos pantallas
discrepan sobre la misma entidad. Basta una frase en el README.

**`DataTable` recibe un `columnCount` redundante**, derivable de
`table.getVisibleLeafColumns().length`.

## Accesibilidad

**Los controles de filtro no tienen nombre accesible.** Los tres `SelectTrigger` de
`users-page.tsx` y `api-keys-page.tsx` solo llevan un `placeholder` en `SelectValue`, que
nunca se renderiza porque el valor siempre arranca en `"all"`. Un lector de pantalla anuncia
el valor sin decir qué filtra. Los dos buscadores usan el placeholder como etiqueta. Falta
`aria-label` en los cinco.

**Los `<th>` de la columna de acciones están vacíos** en ambas tablas. Deberían llevar un
encabezado `sr-only` con "Acciones".

**`DataTable` no indica en qué página estás.** Con 30 usuarios y páginas de 10, la 1 y la 2
muestran ambas "10 de 30 registros". Falta un `Página X de Y`.

## Consistencia

**El estado de carga se expresa de dos maneras.** Login y creación de API key cambian la
etiqueta del botón (`"Entrar"` → `"Entrando…"`); los dos formularios de perfil muestran el
spinner pero mantienen la etiqueta fija.

**`FieldError` se usa de dos formas.** `login-page.tsx` usa el prop `errors={[...]}`;
`profile-page.tsx` y `create-key-dialog.tsx` usan children condicionales. Ambas funcionan,
pero una plantilla debería enseñar un solo idioma — y el prop `errors` es el mejor, porque
evita el envoltorio condicional y deduplica.

**Terminología divergente para los mismos campos.** `lastLogin` es "Última conexión" en la
tabla de usuarios y "Último acceso" en el perfil. `createdAt` es "Creación" en las tablas y
"Alta" en el perfil. Y el dashboard es "Dashboard" en la navegación pero "el panel" en el
texto del login.

## Detalles menores

- `site-header.tsx` decide si un segmento del breadcrumb es navegable comparando con la
  cadena literal `"settings"`. Sería más limpio marcarlo en `src/data/nav.ts`.
- La clave de tema en `localStorage` es `"theme"`, sin espacio de nombres, mientras que la
  sesión usa `"shadcn-starter.session"`. En `localhost` todos los proyectos comparten
  origen, así que `"theme"` colisiona entre proyectos. Además está escrita a mano en
  `index.html`: si se cambia el prop `storageKey` del provider, el script anti-parpadeo se
  desincroniza en silencio y vuelve el parpadeo que existe para evitar.
- `npm run format` solo cubre `{ts,tsx}`, así que `src/index.css`, `index.html`, `README.md`
  y los JSON nunca se formatean. Al ampliar el glob hay que añadir `src/components/ui/` a
  `.prettierignore`, o se reformatearán los primitivos de shadcn.
- `.prettierignore` lista `pnpm-lock.yaml` dos veces.
- `src/index.css` usa 2 espacios de indentación en `:root`/`.dark` y 4 en el resto.
- Los enlaces profundos se pierden al entrar: `ProtectedRoute` descarta `useLocation()` y el
  login siempre navega a `/dashboard`. Quien marque `/settings/api-keys` acaba en el
  dashboard.
- `/login` es accesible con la sesión abierta; el formulario se renderiza sobre una sesión
  viva.
- El campo de nombre del perfil aplica `.trim()` al guardar, pero el input sigue mostrando
  el texto sin recortar hasta que se vuelve a montar.
- El `Input` de email deshabilitado es controlado y no tiene `onChange`. Es seguro porque
  está deshabilitado, pero conviene un comentario para que nadie lo "arregle".
- `@tanstack/react-table` está fijado con caret (`^8.21.3`). El caret nunca cruza a la v9,
  así que la intención se cumple, pero un pin exacto sería menos ambiguo.
- Ninguna de las dos tablas pasa `getRowId`, así que `DataTable` usa el índice como clave de
  fila. Inofensivo hoy, trampa latente si alguna fila gana estado propio.
- `npm run lint` sale con código 0 pero imprime 4 avisos `react-hooks/incompatible-library`
  sobre `useReactTable` y `watch`. Son inherentes a usar TanStack Table y react-hook-form
  con las reglas del React Compiler.

## Rendimiento

El build avisa de que hay chunks por encima de 500 kB: el principal ronda los 637 kB
(190 kB comprimido). La causa es que las cinco rutas se cargan de golpe, sin división de
código. Para un starter es asumible, pero es lo primero que conviene mirar si el proyecto
crece.

## Verificación no realizada

La ausencia de parpadeo blanco al recargar con tema oscuro se dedujo del código —el script
anti-parpadeo se ejecuta sincrónicamente en `<head>` y resuelve el tema igual que el
provider— pero nunca se capturó fotograma a fotograma. Ninguna herramienta disponible
durante la construcción podía medir por debajo del frame.

## Nota sobre el proceso

La spec §12 fija el estándar de verificación en `tsc --noEmit`, `vite build` y revisión en
navegador. **No incluía `npm run lint`**, y por eso el proyecto llegó a la revisión final
con el lint en rojo. Si un script existe en `package.json`, pertenece al estándar de
verificación; si no, se pudre.
