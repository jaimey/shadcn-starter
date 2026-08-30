import {
  ArrowUpDown,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ChevronsUpDown,
  CircleCheck,
  Command,
  Copy,
  FileSearch,
  Info,
  LayoutDashboard,
  Loader2,
  LogOut,
  MoreHorizontal,
  OctagonX,
  PanelLeft,
  Plus,
  Search,
  Settings,
  TriangleAlert,
  UserCog,
  X,
} from "lucide-react"
import {
  KitComponent,
  KitGroup,
  KitRow,
  KitSection,
  KitSpecimen,
} from "@/pages/ui-kit/kit"

const TYPE_SCALE = [
  { label: "text-2xl font-semibold", className: "text-2xl font-semibold", sample: "Título de página" },
  { label: "text-lg font-semibold", className: "text-lg font-semibold", sample: "Título de bloque" },
  { label: "text-base font-medium", className: "text-base font-medium", sample: "Título de ficha" },
  { label: "text-sm font-medium", className: "text-sm font-medium", sample: "Título de card" },
  { label: "text-sm", className: "text-sm", sample: "Texto descriptivo bajo un título" },
  { label: "text-sm text-muted-foreground", className: "text-sm text-muted-foreground", sample: "Descripción secundaria" },
  { label: "text-xs", className: "text-xs", sample: "Texto de interfaz: botones, badges, celdas de tabla" },
  { label: "text-xs/relaxed", className: "text-xs/relaxed", sample: "Cuerpo de alerta y de diálogo" },
  { label: "text-xs text-muted-foreground", className: "text-xs text-muted-foreground", sample: "Ayuda y pie de campo" },
  { label: "font-mono text-xs", className: "font-mono text-xs", sample: "sk_live_••••••••a3f9" },
]

const COLOR_TOKENS = [
  { name: "background", swatch: "bg-background" },
  { name: "foreground", swatch: "bg-foreground" },
  { name: "card", swatch: "bg-card" },
  { name: "card-foreground", swatch: "bg-card-foreground" },
  { name: "popover", swatch: "bg-popover" },
  { name: "popover-foreground", swatch: "bg-popover-foreground" },
  { name: "primary", swatch: "bg-primary" },
  { name: "primary-foreground", swatch: "bg-primary-foreground" },
  { name: "secondary", swatch: "bg-secondary" },
  { name: "secondary-foreground", swatch: "bg-secondary-foreground" },
  { name: "muted", swatch: "bg-muted" },
  { name: "muted-foreground", swatch: "bg-muted-foreground" },
  { name: "accent", swatch: "bg-accent" },
  { name: "accent-foreground", swatch: "bg-accent-foreground" },
  { name: "destructive", swatch: "bg-destructive" },
  { name: "border", swatch: "bg-border" },
  { name: "input", swatch: "bg-input" },
  { name: "ring", swatch: "bg-ring" },
  { name: "chart-1", swatch: "bg-chart-1" },
  { name: "chart-2", swatch: "bg-chart-2" },
  { name: "chart-3", swatch: "bg-chart-3" },
  { name: "chart-4", swatch: "bg-chart-4" },
  { name: "chart-5", swatch: "bg-chart-5" },
  { name: "sidebar", swatch: "bg-sidebar" },
  { name: "sidebar-foreground", swatch: "bg-sidebar-foreground" },
  { name: "sidebar-primary", swatch: "bg-sidebar-primary" },
  { name: "sidebar-primary-foreground", swatch: "bg-sidebar-primary-foreground" },
  { name: "sidebar-accent", swatch: "bg-sidebar-accent" },
  { name: "sidebar-accent-foreground", swatch: "bg-sidebar-accent-foreground" },
  { name: "sidebar-border", swatch: "bg-sidebar-border" },
  { name: "sidebar-ring", swatch: "bg-sidebar-ring" },
]

const RADIUS_STEPS = [
  { name: "rounded-sm", className: "rounded-sm" },
  { name: "rounded-md", className: "rounded-md" },
  { name: "rounded-lg", className: "rounded-lg" },
  { name: "rounded-xl", className: "rounded-xl" },
  { name: "rounded-2xl", className: "rounded-2xl" },
  { name: "rounded-3xl", className: "rounded-3xl" },
  { name: "rounded-4xl", className: "rounded-4xl" },
]

const SPACING_STEPS = [
  { name: "1", className: "w-1" },
  { name: "2", className: "w-2" },
  { name: "3", className: "w-3" },
  { name: "4", className: "w-4" },
  { name: "6", className: "w-6" },
  { name: "8", className: "w-8" },
  { name: "10", className: "w-10" },
  { name: "12", className: "w-12" },
  { name: "16", className: "w-16" },
  { name: "24", className: "w-24" },
]

const ICONS = [
  { name: "ArrowUpDown", Icon: ArrowUpDown },
  { name: "Check", Icon: Check },
  { name: "ChevronDown", Icon: ChevronDown },
  { name: "ChevronRight", Icon: ChevronRight },
  { name: "ChevronUp", Icon: ChevronUp },
  { name: "ChevronsUpDown", Icon: ChevronsUpDown },
  { name: "CircleCheck", Icon: CircleCheck },
  { name: "Command", Icon: Command },
  { name: "Copy", Icon: Copy },
  { name: "FileSearch", Icon: FileSearch },
  { name: "Info", Icon: Info },
  { name: "LayoutDashboard", Icon: LayoutDashboard },
  { name: "Loader2", Icon: Loader2 },
  { name: "LogOut", Icon: LogOut },
  { name: "MoreHorizontal", Icon: MoreHorizontal },
  { name: "OctagonX", Icon: OctagonX },
  { name: "PanelLeft", Icon: PanelLeft },
  { name: "Plus", Icon: Plus },
  { name: "Search", Icon: Search },
  { name: "Settings", Icon: Settings },
  { name: "TriangleAlert", Icon: TriangleAlert },
  { name: "UserCog", Icon: UserCog },
  { name: "X", Icon: X },
]

function ColorGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {COLOR_TOKENS.map((token) => (
        <div key={token.name} className="flex flex-col gap-1.5">
          <div className={`h-10 w-full border ${token.swatch}`} />
          <span className="truncate font-mono text-xs text-muted-foreground">
            {token.name}
          </span>
        </div>
      ))}
    </div>
  )
}

export function FoundationsSection() {
  return (
    <KitSection
      id="foundations"
      title="Foundations"
      description="Tokens del sistema visual: tipografía, color, radios, spacing e iconos."
    >
      <KitComponent
        id="typography"
        name="Typography"
        description="Inter Variable para la interfaz y JetBrains Mono para tokens y valores literales."
      >
        <KitGroup label="Scale">
          <div className="flex flex-col gap-4">
            {TYPE_SCALE.map((step) => (
              <div key={step.label} className="flex flex-col gap-1">
                <span className="font-mono text-xs text-muted-foreground">
                  {step.label}
                </span>
                <span className={step.className}>{step.sample}</span>
              </div>
            ))}
          </div>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="colors"
        name="Colors"
        description="Los 31 tokens de color declarados en src/index.css, en sus dos temas."
      >
        <KitGroup label="Themes">
          <div className="grid gap-4 lg:grid-cols-2">
            <KitSpecimen label="light">
              <div className="light border bg-background p-4">
                <ColorGrid />
              </div>
            </KitSpecimen>
            <KitSpecimen label="dark">
              <div className="dark border bg-background p-4">
                <ColorGrid />
              </div>
            </KitSpecimen>
          </div>
        </KitGroup>
        <p className="text-sm text-muted-foreground">
          El sistema no define tokens de éxito, aviso ni información. La única
          semántica de estado en la paleta es{" "}
          <span className="font-mono">destructive</span>.
        </p>
      </KitComponent>

      <KitComponent
        id="radius"
        name="Radius"
        description="La escala de radios derivada de --radius."
      >
        <KitGroup label="Scale">
          <KitRow>
            {RADIUS_STEPS.map((step) => (
              <KitSpecimen key={step.name} label={step.name}>
                <div className={`size-16 border bg-muted ${step.className}`} />
              </KitSpecimen>
            ))}
          </KitRow>
        </KitGroup>
        <p className="text-sm text-muted-foreground">
          En este proyecto <span className="font-mono">--radius</span> vale{" "}
          <span className="font-mono">0</span>, así que toda la escala colapsa a
          esquinas rectas. Es deliberado: el sistema es cuadrado. Tampoco existe
          una escala de sombras; la elevación se expresa con bordes y con{" "}
          <span className="font-mono">ring</span>.
        </p>
      </KitComponent>

      <KitComponent
        id="spacing"
        name="Spacing"
        description="La escala de spacing de Tailwind usada por la aplicación."
      >
        <KitGroup label="Scale">
          <div className="flex flex-col gap-2">
            {SPACING_STEPS.map((step) => (
              <div key={step.name} className="flex items-center gap-3">
                <span className="w-8 shrink-0 font-mono text-xs text-muted-foreground">
                  {step.name}
                </span>
                <div className={`h-3 bg-primary ${step.className}`} />
              </div>
            ))}
          </div>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="icons"
        name="Icons"
        description="Los 23 glifos de lucide-react que la aplicación importa hoy."
      >
        <KitGroup label="Gallery">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {ICONS.map((icon) => (
              <div
                key={icon.name}
                className="flex flex-col items-center gap-2 border p-3"
              >
                <icon.Icon className="size-5" />
                <span className="truncate font-mono text-xs text-muted-foreground">
                  {icon.name}
                </span>
              </div>
            ))}
          </div>
        </KitGroup>
      </KitComponent>
    </KitSection>
  )
}
