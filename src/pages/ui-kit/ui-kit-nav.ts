export type KitEntry = { id: string; name: string }

export type KitSectionMeta = {
  id: string
  title: string
  description: string
  entries: KitEntry[]
}

export const UI_KIT_SECTIONS: KitSectionMeta[] = [
  {
    id: "foundations",
    title: "Foundations",
    description:
      "Tokens del sistema visual: tipografía, color, radios, spacing e iconos.",
    entries: [
      { id: "typography", name: "Typography" },
      { id: "colors", name: "Colors" },
      { id: "radius", name: "Radius" },
      { id: "spacing", name: "Spacing" },
      { id: "icons", name: "Icons" },
    ],
  },
  {
    id: "actions",
    title: "Actions",
    description: "Controles que disparan una operación.",
    entries: [
      { id: "button", name: "Button" },
      { id: "icon-button", name: "Icon button" },
      { id: "toggle", name: "Toggle" },
      { id: "toggle-group", name: "Toggle group" },
    ],
  },
  {
    id: "forms",
    title: "Forms",
    description: "Captura y validación de datos.",
    entries: [
      { id: "input", name: "Input" },
      { id: "textarea", name: "Textarea" },
      { id: "label", name: "Label" },
      { id: "field", name: "Field" },
      { id: "input-group", name: "Input group" },
      { id: "select", name: "Select" },
    ],
  },
  {
    id: "data-display",
    title: "Data display",
    description: "Presentación de información y de colecciones.",
    entries: [
      { id: "badge", name: "Badge" },
      { id: "avatar", name: "Avatar" },
      { id: "card", name: "Card" },
      { id: "table", name: "Table" },
      { id: "data-table", name: "Data table" },
      { id: "skeleton", name: "Skeleton" },
      { id: "empty", name: "Empty" },
    ],
  },
  {
    id: "feedback",
    title: "Feedback",
    description: "Respuesta del sistema a una acción.",
    entries: [
      { id: "alert", name: "Alert" },
      { id: "spinner", name: "Spinner" },
      { id: "toast", name: "Toast" },
    ],
  },
  {
    id: "navigation",
    title: "Navigation",
    description: "Orientación y desplazamiento dentro de la aplicación.",
    entries: [
      { id: "breadcrumb", name: "Breadcrumb" },
      { id: "sidebar", name: "Sidebar" },
      { id: "site-header", name: "Site header" },
      { id: "dropdown-menu", name: "Dropdown menu" },
      { id: "collapsible", name: "Collapsible" },
    ],
  },
  {
    id: "overlays",
    title: "Overlays",
    description: "Capas que se sitúan por encima del contenido.",
    entries: [
      { id: "dialog", name: "Dialog" },
      { id: "alert-dialog", name: "Alert dialog" },
      { id: "sheet", name: "Sheet" },
      { id: "tooltip", name: "Tooltip" },
    ],
  },
  {
    id: "layout",
    title: "Layout",
    description: "Estructura, separación y encabezados de página.",
    entries: [
      { id: "separator", name: "Separator" },
      { id: "page-header", name: "Page header" },
      { id: "toolbar", name: "Toolbar" },
    ],
  },
  {
    id: "composite",
    title: "Composite",
    description: "Composiciones reales extraídas de las páginas de la aplicación.",
    entries: [
      { id: "search-bar", name: "Search bar" },
      { id: "filter-bar", name: "Filter bar" },
      { id: "data-table-toolbar", name: "Data table toolbar" },
      { id: "user-menu", name: "User menu" },
      { id: "form-section", name: "Form section" },
      { id: "login-form", name: "Login form" },
      { id: "create-key-dialog", name: "Create key dialog" },
      { id: "confirmation-dialog", name: "Confirmation dialog" },
    ],
  },
  {
    id: "ausentes",
    title: "Ausentes",
    description: "Componentes que este sistema de UI no tiene.",
    entries: [],
  },
]
