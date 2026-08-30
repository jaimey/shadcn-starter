import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  KitComponent,
  KitGroup,
  KitRow,
  KitSection,
  KitSpecimen,
} from "@/pages/ui-kit/kit"

export function LayoutSection() {
  return (
    <KitSection
      id="layout"
      title="Layout"
      description="Estructura, separación y encabezados de página."
    >
      <KitComponent
        id="separator"
        name="Separator"
        description="Línea divisoria entre bloques de contenido."
      >
        <KitGroup label="Variants">
          <KitRow>
            <KitSpecimen label="orientation=horizontal" className="w-64">
              <div className="flex flex-col gap-3 text-sm">
                <span>Datos personales</span>
                <Separator />
                <span>Contraseña</span>
              </div>
            </KitSpecimen>
            <KitSpecimen label="orientation=vertical">
              <div className="flex h-10 items-center gap-3 text-sm">
                <span>Activa</span>
                <Separator
                  orientation="vertical"
                  className="h-4 data-vertical:self-center"
                />
                <span>Revocada</span>
                <Separator
                  orientation="vertical"
                  className="h-4 data-vertical:self-center"
                />
                <span>Expirada</span>
              </div>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="page-header"
        name="Page header"
        description="Encabezado de página: título, descripción y acción principal. Apila en columna por debajo de sm."
      >
        <KitGroup label="Special cases">
          <div className="flex flex-col gap-4 border p-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold">API Keys</h1>
              <p className="text-sm text-muted-foreground">
                Gestiona los tokens de acceso de tu organización.
              </p>
            </div>
            <Button>Crear API key</Button>
          </div>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="toolbar"
        name="Toolbar"
        description="Fila de filtros sobre una colección: búsqueda más selector de estado."
      >
        <KitGroup label="Special cases">
          <div className="flex flex-col gap-3 border p-4 sm:flex-row sm:items-center">
            <InputGroup className="sm:max-w-xs">
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput placeholder="Buscar por nombre" />
            </InputGroup>
            <Select defaultValue="Activa">
              <SelectTrigger className="sm:w-44">
                <SelectValue />
              </SelectTrigger>
            </Select>
          </div>
        </KitGroup>
      </KitComponent>
    </KitSection>
  )
}
