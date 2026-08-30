# Diseño — UI Kit, catálogo visual en una página

Fecha: 2026-08-30
Diseño base del proyecto: [2026-08-16-shadcn-starter-design.md](2026-08-16-shadcn-starter-design.md)

## 1. Objetivo

Una guía visual interna de los componentes reales de la aplicación, servida en una
sola página en `/ui-kit`.

Un desarrollador o un LLM debe poder abrir esa URL, hacer scroll de arriba abajo y
obtener el inventario completo del sistema de UI: qué componentes existen, qué
variantes tienen, qué estados soportan y cómo se combinan. Sin navegar, sin hacer
clic y sin leer código.

La prioridad, en este orden: **ver todo > navegar poco > interactuar poco > leer poco.**

El catálogo documenta lo que el sistema tiene hoy. No inventa componentes para
completar una lista, y declara explícitamente lo que falta (sección 12).

## 2. Decisiones tomadas

Estas decisiones resuelven las ambigüedades y contradicciones de la spec de partida.
Son vinculantes. Ante cualquier discrepancia con la spec original, manda este documento.

| Tema | Decisión |
|---|---|
| Alcance | Solo los componentes que existen hoy en el repositorio. Cero componentes nuevos |
| Ausencias | Se declaran en una sección propia del propio catálogo, no se omiten en silencio |
| Ruta | `/ui-kit`, fuera de `ProtectedRoute` y fuera de `AppLayout`. Pública, ancho completo |
| Overlays con portal | Doble render: trigger real + réplica inline etiquetada `Open` |
| Dark mode | Conmutador propio en la cabecera del kit. Doble render solo en Colors |
| Idioma | Etiquetas de variante, estado y tamaño en inglés; prosa y títulos en español |
| Datos mock | Se reutilizan `src/data/users.ts` y `src/data/api-keys.ts`. No se crea un set nuevo |
| Build | La ruta viaja en el build de producción, cargada con `React.lazy` |
| Navegación en el kit | Índice lateral de anclas. Sin tabs, sin accordions cerrados, sin páginas hijas |
| Estructura | Una página, nueve archivos de sección más el andamiaje |

### 2.1 Contradicción resuelta: §12 contra §13 de la spec original

La spec de partida pedía una lista mínima de componentes obligatorios (§12) y a la vez
prohibía crear componentes ficticios para completarla (§13). El repositorio no tiene
Checkbox, Radio, Switch, Slider, Progress, Tabs, Popover, Pagination, Combobox, Date
picker, File upload ni Command palette, así que ambas cláusulas no podían cumplirse.

Manda §13. El catálogo documenta los 27 primitivos existentes y los compuestos reales,
y añade una sección `#ausentes` que nombra lo que no existe. Declarar la ausencia es
tan útil para un LLM como mostrar la presencia: sin ella, un modelo asumirá que existe
un `<Checkbox>` porque todo panel de administración tiene uno.

Ampliar la librería de componentes es un trabajo distinto y queda fuera de esta spec.

## 3. Arquitectura

### 3.1 Ruta

En [src/app.tsx](../../../src/app.tsx), `/ui-kit` se declara como hermana de `/login`,
fuera del árbol protegido:

- Debe ir **antes** del catch-all `<Route path="*" element={<Navigate to="/dashboard" />} />`,
  que hoy capturaría cualquier ruta desconocida.
- No se envuelve en `ProtectedRoute` ni en `AppLayout`.
- Se importa con `React.lazy` más un `Suspense` con un fallback mínimo, para que el
  catálogo no pese en el bundle de la aplicación.

El `lazy` de la ruta no contradice el principio de "todo visible": el chunk entero
llega de una vez al visitar la URL. Lo prohibido es ocultar componentes *dentro* de la
página, no separar la ruta del resto de la aplicación.

`TooltipProvider` hoy solo vive dentro de `AppLayout`. El shell del kit debe montar el
suyo, o los tooltips del catálogo no funcionarán.

### 3.2 Shell de la página

```
<div>                          shell del kit, monta TooltipProvider
  <header>                     sticky: título, línea de contexto, conmutador de tema
  <div class="flex">
    <aside>                    sticky, oculto por debajo de lg: índice de anclas
    <main>                     las nueve secciones, en orden
```

El `<aside>` solo salta a anclas. No filtra, no colapsa y no oculta contenido. Por
debajo de `lg` desaparece y la página queda como una columna continua.

El conmutador de tema reutiliza el `useTheme` existente de
[src/components/theme-provider.tsx](../../../src/components/theme-provider.tsx), con
las mismas tres opciones que Perfil (claro / oscuro / sistema) y la misma clave de
`localStorage`. No se duplica lógica de tema ni se crea un segundo provider.

### 3.3 Archivos

```
src/pages/ui-kit/
  ui-kit-page.tsx        shell: cabecera, índice, orden de secciones
  ui-kit-nav.ts          catálogo declarativo de secciones, componentes e ids
  kit.tsx                primitivas de andamiaje
  sections/
    foundations.tsx
    actions.tsx
    forms.tsx
    data-display.tsx
    feedback.tsx
    navigation.tsx
    overlays.tsx
    layout.tsx
    composite.tsx
    ausentes.tsx
```

Una sola página, once archivos. Un único `.tsx` con las más de sesenta fichas sería
inmanejable de leer y de editar con fiabilidad. El split es del código, no de la
navegación: la página sigue siendo una.

### 3.4 Primitivas de andamiaje (`kit.tsx`)

Las fichas no se maquetan a mano. Todas se declaran con estas cinco primitivas, lo que
garantiza que la separación visual, la jerarquía de headings y los identificadores
salgan idénticos en las más de sesenta fichas.

| Primitiva | Props | Renderiza |
|---|---|---|
| `KitSection` | `id`, `title`, `description` | `<section id>` + `<h2>` + `<p>` |
| `KitComponent` | `id`, `name`, `description` | `<article id>` + `<h3>` + `<p>` |
| `KitGroup` | `label` | `<h4>` — `Variants` / `States` / `Sizes` / `Special cases` |
| `KitRow` | — | contenedor `flex-wrap` para poner variantes lado a lado |
| `KitSpecimen` | `label` | etiqueta + el ejemplo real debajo |

`KitRow` con `flex-wrap` cubre por sí solo el requisito responsive: en escritorio las
variantes quedan en horizontal, en pantallas estrechas pasan a varias filas. No se
elimina contenido en ningún breakpoint.

### 3.5 Fuente única de verdad para los identificadores

`ui-kit-nav.ts` exporta la lista declarativa de secciones y de componentes con sus
`id`. De ahí salen a la vez el índice lateral y los `id` que consumen `KitSection` y
`KitComponent`.

No hay dos listas que sincronizar, así que un ancla rota deja de ser posible. Añadir
una ficha es añadir una entrada en ese archivo y una llamada a `KitComponent` en la
sección correspondiente.

Los `id` son estables y en kebab-case, derivados del nombre del componente:
`#button`, `#icon-button`, `#input-group`, `#data-table`, `#dialog`. Permiten enlazar
a `/ui-kit#dialog` sin que el contenido salga de la página.

### 3.6 Regla de doble render para overlays

`Dialog`, `AlertDialog`, `Sheet`, `DropdownMenu`, `Select`, `Tooltip` y los toasts de
`sonner` viven en portales: mientras están cerrados, su contenido **no existe en el
DOM**. Eso choca de frente con el principio central de esta spec.

Cada uno de esos componentes se cataloga con dos especímenes:

- `KitSpecimen label="Trigger"` — el componente real, funcional. Quien quiera
  comprobar el comportamiento hace clic.
- `KitSpecimen label="Open"` — una réplica inline, siempre presente en el DOM.

La réplica reutiliza los subcomponentes reales dentro de un contenedor que reproduce
**solo la superficie exterior** del componente, sin el `fixed` ni el posicionamiento
del portal. Cuánto se puede reutilizar depende del contexto que exija cada primitivo
de Radix, y hay dos regímenes:

- Los que solo necesitan el contexto del **Root** — `DialogTitle`,
  `DialogDescription`, `SheetTitle`, `SheetDescription`, `AlertDialogTitle`,
  `AlertDialogDescription` — se reutilizan tal cual envueltos en `<Dialog open>`.
  `DialogHeader`, `DialogFooter`, `SheetHeader`, `SheetFooter`, `AlertDialogHeader`,
  `AlertDialogFooter` y `AlertDialogMedia` son divs planos y se reutilizan siempre.
- Los que exigen el contexto del **Content** y lanzan fuera de él —
  `DropdownMenuItem`, `SelectItem`, `AlertDialogCancel` y `AlertDialogAction` — no se
  pueden reutilizar: su marcado se replica. En el caso de los dos de `AlertDialog` la
  réplica es fiel al detalle, porque bajo la envoltura de Radix son exactamente un
  `Button` `default` y un `Button` `outline`.

Restricciones sobre la réplica, que la mantienen auditable:

- Un único helper por overlay, todos juntos en el mismo archivo de sección.
- Cada helper lleva un comentario que apunta al primitivo original del que copia las
  clases de superficie.
- No se modifica ningún archivo de `src/components/ui/`.

**Deuda conocida y aceptada:** las clases de la superficie exterior quedan duplicadas.
Si alguien cambia el aspecto de `DialogContent`, la réplica del catálogo no lo refleja
hasta que se actualice a mano. Es el precio de no tocar los primitivos compartidos de
la aplicación solo para servir al catálogo. La sección 8 recoge cómo se detecta.

## 4. Contenido de cada ficha

Toda ficha sigue la misma estructura, y omite los grupos que no apliquen:

```
Nombre del componente
Descripción de una línea, en español

Variants     ejemplos etiquetados, lado a lado
Sizes        ejemplos etiquetados, lado a lado
States       ejemplos etiquetados, simultáneos
Special cases  composiciones o casos límite
```

Las etiquetas de variante, tamaño y estado usan el valor literal del prop:
`default`, `outline`, `secondary`, `ghost`, `destructive`, `link`, `icon-sm`,
`aria-invalid`. Coinciden con lo que un LLM escribirá después. Los títulos de sección
y las descripciones de una línea van en español, como el resto de la aplicación.

Los estados se muestran **todos a la vez**. Ninguno exige interactuar para descubrirse:
`disabled` se renderiza deshabilitado, `aria-invalid` con el atributo puesto,
`loading` con su spinner girando.

## 5. Inventario por sección

### 5.1 Foundations — `#foundations`

| Ficha | `id` | Contenido |
|---|---|---|
| Typography | `#typography` | Inter Variable (`--font-sans`, también `--font-heading`) y JetBrains Mono (`--font-mono`). La escala **realmente usada**: `text-2xl font-semibold` en títulos de página, `text-sm` en descripciones, `text-xs` en la mayoría de primitivos, `text-xs/relaxed` en cuerpos de alerta y diálogo |
| Colors | `#colors` | Los tokens de `:root` y `.dark`: los 14 de superficie y texto, `destructive`, `border`, `input`, `ring`, `chart-1`…`chart-5` y los 8 de `sidebar`. Cada muestra con su nombre de token |
| Radius | `#radius` | `--radius` y la escala derivada `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl` |
| Spacing | `#spacing` | La escala de Tailwind usada de hecho en la aplicación, en rampa visual |
| Icons | `#icons` | Los 23 glifos de `lucide-react` realmente importados, cada uno con su nombre |

Colors es la única ficha con doble render claro/oscuro: se muestran las dos paletas a
la vez usando una isla `.dark`, que funciona porque el `@custom-variant dark` del
proyecto está definido como `&:is(.dark *)` y por tanto aplica a cualquier
descendiente. Comparar ambas paletas de un vistazo es justo lo que aporta valor aquí;
en el resto del catálogo, duplicar cada espécimen solo añadiría ruido.

Dos hechos que la ficha debe declarar en texto, porque contradicen lo que un lector
esperaría:

- **`--radius` vale `0`.** Toda la escala derivada colapsa a esquinas rectas. El
  sistema es deliberadamente cuadrado. La ficha muestra la escala y lo dice, en vez de
  fingir unos radios que no existen.
- **No hay escala de sombras.** El proyecto no usa `shadow-*` en ningún sitio; la
  elevación se expresa con `ring-1 ring-foreground/10` y con bordes.

Los 23 glifos: `ArrowUpDown`, `Check`, `ChevronDown`, `ChevronRight`, `ChevronUp`,
`ChevronsUpDown`, `CircleCheck`, `Command`, `Copy`, `FileSearch`, `Info`,
`LayoutDashboard`, `Loader2`, `LogOut`, `MoreHorizontal`, `OctagonX`, `PanelLeft`,
`Plus`, `Search`, `Settings`, `TriangleAlert`, `UserCog`, `X`.

### 5.2 Actions — `#actions`

| Ficha | `id` | Grupos |
|---|---|---|
| Button | `#button` | Variants: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`. Sizes: `xs`, `sm`, `default`, `lg`. States: default, `disabled`, loading (con `Spinner`), con icono `inline-start` e `inline-end` |
| Icon button | `#icon-button` | Sizes: `icon-xs`, `icon-sm`, `icon`, `icon-lg`, cruzados con las variantes principales |
| Toggle | `#toggle` | States: off, on, `disabled` |
| Toggle group | `#toggle-group` | Variants: `type="single"`, `type="multiple"`. States: con selección, sin selección |

### 5.3 Forms — `#forms`

| Ficha | `id` | Grupos |
|---|---|---|
| Input | `#input` | States: default con valor, con `placeholder`, `disabled`, `readOnly`, `aria-invalid`. Special cases: `type="password"`, `type="number"`, `type="email"` |
| Textarea | `#textarea` | States: default, `disabled`, `aria-invalid` |
| Label | `#label` | Default y asociado a un control deshabilitado |
| Field | `#field` | El sistema de formulario real: `FieldSet` + `FieldLegend`, `FieldGroup`, `Field` con `FieldLabel` y `FieldDescription`, `FieldError` con mensaje, `FieldTitle`, `FieldSeparator`, `FieldContent` |
| Input group | `#input-group` | Variants: addon `inline-start`, addon `inline-end`, `InputGroupButton`, `InputGroupText`, `InputGroupTextarea`. Special cases: search input y password input, que en este sistema **son composiciones de `InputGroup`**, no primitivos propios |
| Select | `#select` | Trigger cerrado, réplica `Open` con `SelectGroup`, `SelectLabel`, `SelectItem`, `SelectSeparator` e ítem seleccionado. States: default, `disabled`, `aria-invalid` |

### 5.4 Data display — `#data-display`

| Ficha | `id` | Grupos |
|---|---|---|
| Badge | `#badge` | Variants: `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`. Special cases: con icono |
| Avatar | `#avatar` | `AvatarImage`, `AvatarFallback` con iniciales, `AvatarGroup` con `AvatarGroupCount`, `AvatarBadge` |
| Card | `#card` | `CardHeader` + `CardTitle` + `CardDescription` + `CardAction`, `CardContent`, `CardFooter`. Special cases: card sin footer, card con acción en la cabecera |
| Table | `#table` | El primitivo puro: `TableCaption`, `TableHeader`, `TableBody`, `TableFooter` |
| Data table | `#data-table` | El compuesto real de `src/components/data-table.tsx`, con datos de `users.ts`, cabeceras ordenables y paginación. States: con filas, y el estado vacío con `Empty` que el propio compuesto ya renderiza |
| Skeleton | `#skeleton` | Special cases: línea, bloque, y la composición de fila de tabla en carga |
| Empty | `#empty` | Variants de `EmptyMedia`: `default`, `icon`. Special cases: con `EmptyContent` y un botón de acción |

### 5.5 Feedback — `#feedback`

| Ficha | `id` | Grupos |
|---|---|---|
| Alert | `#alert` | Variants: `default`, `destructive`. Special cases: sin icono, con icono, con `AlertAction` |
| Spinner | `#spinner` | Sizes: por defecto y ampliado. Special cases: dentro de un botón |
| Toast | `#toast` | Réplica inline de los cuatro tipos de `sonner` — `success`, `error`, `warning`, `info` — más un `KitSpecimen label="Trigger"` con botones que disparan los toasts reales |

La ficha de Toast debe declarar que los cuatro iconos de estado
(`CircleCheckIcon`, `OctagonXIcon`, `TriangleAlertIcon`, `InfoIcon`) vienen
configurados en [src/components/ui/sonner.tsx](../../../src/components/ui/sonner.tsx),
y que son el único lugar del sistema donde aparece una semántica de éxito y aviso: no
existen tokens `success`, `warning` ni `info` en la paleta.

### 5.6 Navigation — `#navigation`

| Ficha | `id` | Grupos |
|---|---|---|
| Breadcrumb | `#breadcrumb` | Special cases: dos niveles, tres niveles, con `BreadcrumbEllipsis`, con `BreadcrumbPage` final no navegable |
| Sidebar | `#sidebar` | Una demo embebida y a escala, con datos de `src/data/nav.ts`: `SidebarHeader`, `SidebarGroup`, `SidebarMenu`, `SidebarMenuButton` activo e inactivo, `SidebarMenuSub`, `SidebarMenuBadge`, `SidebarMenuSkeleton`, `SidebarFooter` |
| Site header | `#site-header` | El compuesto real: `SidebarTrigger` + `Separator` vertical + `Breadcrumb` |
| Dropdown menu | `#dropdown-menu` | Trigger real, y réplica `Open` con `DropdownMenuLabel`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`, `DropdownMenuSeparator`, `DropdownMenuShortcut` y `DropdownMenuSubTrigger` |
| Collapsible | `#collapsible` | States: abierto y cerrado, mostrados **a la vez** como dos instancias distintas, nunca como un único bloque que haya que abrir |

La demo de Sidebar no puede reutilizar la instancia de la aplicación: `AppSidebar`
depende de `SidebarProvider` y del ancho completo del viewport. Se monta un
`SidebarProvider` propio, acotado a un contenedor de altura fija dentro de la ficha.

### 5.7 Overlays — `#overlays`

Todas las fichas de esta sección siguen la regla de doble render de la sección 3.6.

| Ficha | `id` | Grupos |
|---|---|---|
| Dialog | `#dialog` | Trigger + `Open`. Special cases: con footer de acciones, sin botón de cierre |
| Alert dialog | `#alert-dialog` | Trigger + `Open`, con `AlertDialogMedia`, `AlertDialogCancel` y `AlertDialogAction` |
| Sheet | `#sheet` | Variants: los cuatro lados. Trigger por cada lado + una réplica `Open` |
| Tooltip | `#tooltip` | Trigger + réplica `Open` de `TooltipContent` |

### 5.8 Layout — `#layout`

| Ficha | `id` | Grupos |
|---|---|---|
| Separator | `#separator` | Variants: `horizontal`, `vertical` |
| Page header | `#page-header` | El patrón real de las páginas de la aplicación: `h1` + descripción + acción alineada a la derecha, que colapsa a columna en móvil |
| Toolbar | `#toolbar` | El patrón real de filtros: `InputGroup` de búsqueda + `Select` de estado |

`Container`, `Grid`, `Stack` y `Section` de la spec original no se catalogan: en este
proyecto son utilidades de Tailwind aplicadas en cada página, no componentes. Aparecen
en `#ausentes` con esa explicación.

### 5.9 Composite — `#composite`

Composiciones reales, extraídas de las páginas existentes. Cada ficha declara de qué
archivo procede el patrón.

| Ficha | `id` | Origen |
|---|---|---|
| Search bar | `#search-bar` | `InputGroup` + `Search`, de `users-page` y `api-keys-page` |
| Filter bar | `#filter-bar` | Búsqueda + `Select` de estado, de `api-keys-page` |
| Data table toolbar | `#data-table-toolbar` | Filtros + tabla + paginación, montados juntos |
| User menu | `#user-menu` | `NavUser`: avatar + `DropdownMenu` con el correo y las acciones de cuenta |
| Form section | `#form-section` | `Card` + `FieldGroup` + `CardFooter` con acciones, de `profile-page` |
| Login form | `#login-form` | El formulario de `login-page`, con validación zod y estado de envío |
| Create key dialog | `#create-key-dialog` | Diálogo con formulario y revelado único del token, de `create-key-dialog.tsx` |
| Confirmation dialog | `#confirmation-dialog` | `AlertDialog` de revocar API key, de `api-keys-page` |

### 5.10 Ausentes — `#ausentes`

Sección final, en texto plano y agrupada por categoría. Lista lo que la spec de
partida pedía y el sistema no tiene, con una nota por grupo:

- **Formularios:** Checkbox, Radio, Switch, Slider, Combobox, Date picker, Date range
  picker, File upload, Number input como primitivo propio.
- **Datos:** Progress, Description list, Statistics, List.
- **Navegación:** Tabs, Pagination como primitivo, Navbar, Menubar.
- **Overlays:** Popover, Command palette. Drawer no existe con ese nombre: su papel lo
  cumple `Sheet`.
- **Layout:** Container, Grid, Stack, Section — utilidades de Tailwind, no componentes.
- **Foundations:** escala de sombras; tokens `success`, `warning` e `info`.

La sección debe decir explícitamente que estos componentes **no existen en el
proyecto** y que usarlos requiere añadirlos primero al registro de shadcn.

## 6. Datos mock

Se reutilizan los datos mock que ya existen:
[src/data/users.ts](../../../src/data/users.ts) y
[src/data/api-keys.ts](../../../src/data/api-keys.ts). Ambos ya son ficticios, están en
español y son coherentes con el resto de la aplicación. No se crea un set paralelo.

Para las fichas que necesitan un dato suelto y no una colección (una card, un avatar,
un item de menú), se toman valores de esas mismas fuentes. Nunca información real de
personas.

Ninguna acción del catálogo muta nada persistente. Los botones que disparan toasts o
abren diálogos son la única interactividad, y su efecto es local a la página.

## 7. Restricciones

Vinculantes. Cada una viene de un principio de la spec de partida.

- **Sin código a la vista.** Ni HTML, ni CSS, ni JSX, ni props, ni interfaces, ni
  bloques de código. La única excepción es el nombre literal de un valor de prop
  cuando actúa como etiqueta (`variant="destructive"`), que es texto corto en línea,
  no un snippet.
- **Sin botones de copiar.** El catálogo no existe para reutilizar código.
- **Sin páginas hijas.** Nada de `/ui-kit/buttons`.
- **Sin tabs** que separen categorías o variantes.
- **Sin accordions cerrados** por defecto.
- **Sin modales** como forma de mostrar un componente.
- **Sin lazy loading dentro de la página.** El `React.lazy` de la ruta es la única
  carga diferida admitida, y trae la página entera de una vez.
- **Sin acciones reales.** Nada que salga de la página ni que persista.
- **Sin datos reales.**
- **Sin pérdida de contenido en móvil.** Los ejemplos se apilan, no se eliminan.

## 8. Mantenimiento

Cuando se añada un componente reutilizable al proyecto:

1. Añadir su entrada en `ui-kit-nav.ts`, con `id` y sección.
2. Añadir la ficha con `KitComponent` en el archivo de sección correspondiente.
3. Cubrir sus variantes, sus tamaños y sus estados relevantes.
4. Si es un overlay con portal, aplicar la regla de doble render de la sección 3.6.
5. Si el componente estaba en `#ausentes`, quitarlo de esa lista.

Sobre la deuda de las réplicas inline: cualquier cambio en las clases de superficie de
`DialogContent`, `SheetContent`, `DropdownMenuContent`, `SelectContent`,
`AlertDialogContent` o `TooltipContent` obliga a revisar el helper correspondiente en
el archivo de sección. Los comentarios que apuntan al primitivo original existen justo
para que esa revisión sea localizable con un `grep`.

## 9. Criterios de aceptación

### Página

- [ ] `/ui-kit` existe y responde sin estar autenticado.
- [ ] La ruta está declarada antes del catch-all y no la captura el redirect a `/dashboard`.
- [ ] Todo el catálogo está en una sola página, recorrible con scroll.
- [ ] No existe ninguna ruta hija bajo `/ui-kit`.
- [ ] `/ui-kit#dialog` y `/ui-kit#data-table` saltan a su ficha sin salir de la página.

### Contenido

- [ ] Están catalogados los 27 primitivos de `src/components/ui/` que aplican, más los compuestos de la sección 5.9.
- [ ] Cada componente muestra sus variantes reales, con la etiqueta igual al valor del prop.
- [ ] Los estados relevantes se ven sin interactuar: `disabled`, `aria-invalid` y `loading` están renderizados, no latentes.
- [ ] Los tamaños se muestran donde el componente los tiene.
- [ ] Cada overlay con portal tiene su espécimen `Trigger` y su espécimen `Open`.
- [ ] El contenido de todos los overlays es legible en el DOM sin ejecutar ningún clic.
- [ ] La sección `#ausentes` lista los componentes de la sección 5.10.
- [ ] Los datos visibles proceden de `users.ts` y `api-keys.ts`.

### Diseño

- [ ] El catálogo usa los componentes reales de la aplicación, sin restilizarlos.
- [ ] El conmutador de tema cambia toda la página, y Colors muestra las dos paletas a la vez.
- [ ] En móvil los ejemplos se apilan y no desaparece ningún contenido.
- [ ] La separación entre secciones y entre fichas es inequívoca.

### Legibilidad para un LLM

- [ ] Cada sección es un `<section>` con `id` y un `<h2>`.
- [ ] Cada componente es un `<article>` con `id` estable y un `<h3>`.
- [ ] Los grupos usan `<h4>` con las etiquetas `Variants`, `Sizes`, `States`, `Special cases`.
- [ ] Todo espécimen lleva su etiqueta visible.
- [ ] Los `id` del índice lateral y los de las fichas salen de `ui-kit-nav.ts`; no hay anclas rotas.

### Restricciones

- [ ] No hay bloques de código, snippets ni props documentadas.
- [ ] No hay botones de copiar.
- [ ] No hay tabs, accordions cerrados ni modales usados para mostrar componentes.
- [ ] Ningún componente del catálogo se carga bajo demanda dentro de la página.
- [ ] Ninguna acción persiste nada.

### Salud del proyecto

- [ ] `npm run typecheck` pasa.
- [ ] `npm run lint` pasa.
- [ ] `npm run build` pasa.
- [ ] Ningún archivo de `src/components/ui/` ha sido modificado.
