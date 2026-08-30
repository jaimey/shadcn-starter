import { KitSection } from "@/pages/ui-kit/kit"

const MISSING = [
  {
    group: "Formularios",
    items:
      "Checkbox, Radio, Switch, Slider, Combobox, Date picker, Date range picker, File upload, Number input como primitivo propio.",
  },
  {
    group: "Datos",
    items: "Progress, Description list, Statistics, List.",
  },
  {
    group: "Navegación",
    items: "Tabs, Pagination como primitivo, Navbar, Menubar.",
  },
  {
    group: "Overlays",
    items:
      "Popover, Command palette. Drawer no existe con ese nombre: su papel lo cumple Sheet.",
  },
  {
    group: "Layout",
    items:
      "Container, Grid, Stack, Section. En este proyecto son utilidades de Tailwind aplicadas en cada página, no componentes.",
  },
  {
    group: "Foundations",
    items:
      "Escala de sombras; tokens de éxito, aviso e información. La única semántica de estado en la paleta es destructive.",
  },
]

export function AusentesSection() {
  return (
    <KitSection
      id="ausentes"
      title="Ausentes"
      description="Componentes que este sistema de UI no tiene."
    >
      <div className="flex flex-col gap-4 border p-4">
        <p className="text-sm">
          Los componentes de esta lista <strong>no existen en el proyecto</strong>.
          No están ocultos ni pendientes de documentar: no hay ningún archivo que
          los implemente. Usarlos exige añadirlos antes desde el registro de
          shadcn.
        </p>
        <dl className="flex flex-col gap-3">
          {MISSING.map((entry) => (
            <div key={entry.group} className="flex flex-col gap-0.5">
              <dt className="text-sm font-medium">{entry.group}</dt>
              <dd className="text-sm text-muted-foreground">{entry.items}</dd>
            </div>
          ))}
        </dl>
      </div>
    </KitSection>
  )
}
