import { useState } from "react"
import { Copy, Plus, Search, Settings, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  KitComponent,
  KitGroup,
  KitRow,
  KitSection,
  KitSpecimen,
} from "@/pages/ui-kit/kit"

const BUTTON_VARIANTS = [
  { value: "default", label: "Guardar" },
  { value: "outline", label: "Editar" },
  { value: "secondary", label: "Cancelar" },
  { value: "ghost", label: "Más" },
  { value: "destructive", label: "Eliminar" },
  { value: "link", label: "Ver todo" },
] as const

const BUTTON_SIZES = ["xs", "sm", "default", "lg"] as const
const ICON_BUTTON_SIZES = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const

export function ActionsSection() {
  const [toggleGroupSingle, setToggleGroupSingle] = useState("list")
  const [toggleGroupMultiple, setToggleGroupMultiple] = useState<string[]>([
    "bold",
  ])

  return (
    <KitSection
      id="actions"
      title="Actions"
      description="Controles que disparan una operación."
    >
      <KitComponent
        id="button"
        name="Button"
        description="Control de acción principal."
      >
        <KitGroup label="Variants">
          <KitRow>
            {BUTTON_VARIANTS.map((variant) => (
              <KitSpecimen key={variant.value} label={variant.value}>
                <Button variant={variant.value}>{variant.label}</Button>
              </KitSpecimen>
            ))}
          </KitRow>
        </KitGroup>

        <KitGroup label="Sizes">
          <KitRow>
            {BUTTON_SIZES.map((size) => (
              <KitSpecimen key={size} label={size}>
                <Button size={size}>Guardar</Button>
              </KitSpecimen>
            ))}
          </KitRow>
        </KitGroup>

        <KitGroup label="States">
          <KitRow>
            <KitSpecimen label="default">
              <Button>Guardar</Button>
            </KitSpecimen>
            <KitSpecimen label="disabled">
              <Button disabled>Guardar</Button>
            </KitSpecimen>
            <KitSpecimen label="loading">
              <Button disabled>
                <Spinner />
                Guardando
              </Button>
            </KitSpecimen>
          </KitRow>
        </KitGroup>

        <KitGroup label="Special cases">
          <KitRow>
            <KitSpecimen label="icon inline-start">
              <Button>
                <Plus data-icon="inline-start" />
                Crear
              </Button>
            </KitSpecimen>
            <KitSpecimen label="icon inline-end">
              <Button variant="outline">
                Copiar
                <Copy data-icon="inline-end" />
              </Button>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="icon-button"
        name="Icon button"
        description="Botón cuadrado sin etiqueta, siempre con nombre accesible."
      >
        <KitGroup label="Sizes">
          <KitRow>
            {ICON_BUTTON_SIZES.map((size) => (
              <KitSpecimen key={size} label={size}>
                <Button size={size} aria-label="Añadir">
                  <Plus />
                </Button>
              </KitSpecimen>
            ))}
          </KitRow>
        </KitGroup>

        <KitGroup label="Variants">
          <KitRow>
            <KitSpecimen label="default">
              <Button size="icon" aria-label="Añadir">
                <Plus />
              </Button>
            </KitSpecimen>
            <KitSpecimen label="outline">
              <Button size="icon" variant="outline" aria-label="Buscar">
                <Search />
              </Button>
            </KitSpecimen>
            <KitSpecimen label="secondary">
              <Button size="icon" variant="secondary" aria-label="Ajustes">
                <Settings />
              </Button>
            </KitSpecimen>
            <KitSpecimen label="ghost">
              <Button size="icon" variant="ghost" aria-label="Copiar">
                <Copy />
              </Button>
            </KitSpecimen>
            <KitSpecimen label="destructive">
              <Button size="icon" variant="destructive" aria-label="Eliminar">
                <Trash2 />
              </Button>
            </KitSpecimen>
          </KitRow>
        </KitGroup>

        <KitGroup label="States">
          <KitRow>
            <KitSpecimen label="disabled">
              <Button size="icon" disabled aria-label="Añadir">
                <Plus />
              </Button>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="toggle"
        name="Toggle"
        description="Botón de dos estados, activado o no."
      >
        <KitGroup label="Variants">
          <KitRow>
            <KitSpecimen label="default">
              <Toggle aria-label="Negrita">Negrita</Toggle>
            </KitSpecimen>
            <KitSpecimen label="outline">
              <Toggle variant="outline" aria-label="Negrita">
                Negrita
              </Toggle>
            </KitSpecimen>
          </KitRow>
        </KitGroup>

        <KitGroup label="Sizes">
          <KitRow>
            <KitSpecimen label="sm">
              <Toggle size="sm" variant="outline">
                Negrita
              </Toggle>
            </KitSpecimen>
            <KitSpecimen label="default">
              <Toggle size="default" variant="outline">
                Negrita
              </Toggle>
            </KitSpecimen>
            <KitSpecimen label="lg">
              <Toggle size="lg" variant="outline">
                Negrita
              </Toggle>
            </KitSpecimen>
          </KitRow>
        </KitGroup>

        <KitGroup label="States">
          <KitRow>
            <KitSpecimen label="off">
              <Toggle variant="outline">Negrita</Toggle>
            </KitSpecimen>
            <KitSpecimen label="on">
              <Toggle variant="outline" defaultPressed>
                Negrita
              </Toggle>
            </KitSpecimen>
            <KitSpecimen label="disabled">
              <Toggle variant="outline" disabled>
                Negrita
              </Toggle>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="toggle-group"
        name="Toggle group"
        description="Conjunto de toggles con selección única o múltiple."
      >
        <KitGroup label="Variants">
          <KitRow>
            <KitSpecimen label="type=single">
              <ToggleGroup
                type="single"
                variant="outline"
                spacing={0}
                value={toggleGroupSingle}
                onValueChange={(value) => {
                  if (value) setToggleGroupSingle(value)
                }}
              >
                <ToggleGroupItem value="list">Lista</ToggleGroupItem>
                <ToggleGroupItem value="grid">Cuadrícula</ToggleGroupItem>
                <ToggleGroupItem value="table">Tabla</ToggleGroupItem>
              </ToggleGroup>
            </KitSpecimen>
            <KitSpecimen label="type=multiple">
              <ToggleGroup
                type="multiple"
                variant="outline"
                spacing={0}
                value={toggleGroupMultiple}
                onValueChange={setToggleGroupMultiple}
              >
                <ToggleGroupItem value="bold">Negrita</ToggleGroupItem>
                <ToggleGroupItem value="italic">Cursiva</ToggleGroupItem>
                <ToggleGroupItem value="underline">Subrayado</ToggleGroupItem>
              </ToggleGroup>
            </KitSpecimen>
          </KitRow>
        </KitGroup>

        <KitGroup label="Special cases">
          <KitRow>
            <KitSpecimen label="spacing=2">
              <ToggleGroup type="single" variant="outline" defaultValue="dia">
                <ToggleGroupItem value="dia">Día</ToggleGroupItem>
                <ToggleGroupItem value="semana">Semana</ToggleGroupItem>
                <ToggleGroupItem value="mes">Mes</ToggleGroupItem>
              </ToggleGroup>
            </KitSpecimen>
            <KitSpecimen label="orientation=vertical">
              <ToggleGroup
                type="single"
                variant="outline"
                orientation="vertical"
                defaultValue="activa"
              >
                <ToggleGroupItem value="activa">Activa</ToggleGroupItem>
                <ToggleGroupItem value="revocada">Revocada</ToggleGroupItem>
              </ToggleGroup>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>
    </KitSection>
  )
}
