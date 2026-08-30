import { useEffect } from "react"
import { useTheme, type Theme } from "@/components/theme-provider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { TooltipProvider } from "@/components/ui/tooltip"
import { FoundationsSection } from "@/pages/ui-kit/sections/foundations"
import { UI_KIT_SECTIONS } from "@/pages/ui-kit/ui-kit-nav"

const THEME_OPTIONS: { value: Theme; label: string }[] = [
  { value: "light", label: "Claro" },
  { value: "dark", label: "Oscuro" },
  { value: "system", label: "Sistema" },
]

// Invariante de la spec: todo id declarado en `ui-kit-nav.ts` debe existir en el
// DOM. Se comprueba solo en desarrollo, para que un ancla rota se detecte al
// añadir una ficha en lugar de descubrirse al hacer clic meses después.
function useDeclaredIdCheck() {
  useEffect(() => {
    if (!import.meta.env.DEV) return

    const declared = UI_KIT_SECTIONS.flatMap((section) => [
      section.id,
      ...section.entries.map((entry) => entry.id),
    ])
    const missing = declared.filter((id) => document.getElementById(id) === null)

    if (missing.length > 0) {
      console.error(
        `[ui-kit] ids declarados en ui-kit-nav.ts sin elemento en el DOM: ${missing.join(", ")}`,
      )
    }
  }, [])
}

export function UiKitPage() {
  const { theme, setTheme } = useTheme()
  useDeclaredIdCheck()

  return (
    <TooltipProvider>
      <div className="min-h-svh bg-background text-foreground">
        <header className="sticky top-0 z-40 flex flex-col gap-3 border-b bg-background px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg font-semibold">UI Kit</h1>
            <p className="text-sm text-muted-foreground">
              Referencia visual del sistema. Todos los datos son ficticios.
            </p>
          </div>
          <ToggleGroup
            type="single"
            variant="outline"
            spacing={0}
            value={theme}
            onValueChange={(value) => {
              if (value) setTheme(value as Theme)
            }}
            aria-label="Tema"
          >
            {THEME_OPTIONS.map((option) => (
              <ToggleGroupItem key={option.value} value={option.value}>
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </header>

        <div className="mx-auto flex w-full max-w-7xl gap-10 px-6">
          <aside className="sticky top-28 hidden h-fit w-44 shrink-0 py-10 lg:block">
            <nav aria-label="Secciones del UI Kit">
              <ul className="flex flex-col gap-0.5">
                {UI_KIT_SECTIONS.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block px-2 py-1 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <main className="flex min-w-0 flex-1 flex-col gap-16 py-10">
            <FoundationsSection />
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}
