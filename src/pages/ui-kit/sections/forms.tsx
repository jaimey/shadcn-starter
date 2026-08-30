import { Search } from "lucide-react"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  KitComponent,
  KitGroup,
  KitRow,
  KitSection,
  KitSpecimen,
} from "@/pages/ui-kit/kit"

export function FormsSection() {
  return (
    <KitSection
      id="forms"
      title="Forms"
      description="Captura y validación de datos."
    >
      <KitComponent
        id="input"
        name="Input"
        description="Campo de texto de una línea."
      >
        <KitGroup label="States">
          <KitRow>
            <KitSpecimen label="default">
              <Input defaultValue="Ana Torres" className="w-56" />
            </KitSpecimen>
            <KitSpecimen label="placeholder">
              <Input placeholder="Nombre completo" className="w-56" />
            </KitSpecimen>
            <KitSpecimen label="disabled">
              <Input defaultValue="Ana Torres" disabled className="w-56" />
            </KitSpecimen>
            <KitSpecimen label="readOnly">
              <Input defaultValue="u-01" readOnly className="w-56" />
            </KitSpecimen>
            <KitSpecimen label="aria-invalid">
              <Input defaultValue="ana@" aria-invalid className="w-56" />
            </KitSpecimen>
          </KitRow>
        </KitGroup>

        <KitGroup label="Special cases">
          <KitRow>
            <KitSpecimen label="type=email">
              <Input
                type="email"
                defaultValue="ana.torres@acme.com"
                className="w-56"
              />
            </KitSpecimen>
            <KitSpecimen label="type=password">
              <Input type="password" defaultValue="contrasena" className="w-56" />
            </KitSpecimen>
            <KitSpecimen label="type=number">
              <Input type="number" defaultValue={30} className="w-56" />
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="textarea"
        name="Textarea"
        description="Campo de texto multilínea."
      >
        <KitGroup label="States">
          <KitRow>
            <KitSpecimen label="default">
              <Textarea
                defaultValue="Integración de facturación para el entorno de producción."
                className="w-64"
              />
            </KitSpecimen>
            <KitSpecimen label="placeholder">
              <Textarea placeholder="Descripción de la API key" className="w-64" />
            </KitSpecimen>
            <KitSpecimen label="disabled">
              <Textarea
                defaultValue="Sin permisos de edición."
                disabled
                className="w-64"
              />
            </KitSpecimen>
            <KitSpecimen label="aria-invalid">
              <Textarea defaultValue="Muy corto" aria-invalid className="w-64" />
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="label"
        name="Label"
        description="Etiqueta asociada a un control de formulario."
      >
        <KitGroup label="States">
          <KitRow>
            <KitSpecimen label="default">
              <div className="flex flex-col gap-2">
                <Label htmlFor="kit-label-default">Nombre</Label>
                <Input
                  id="kit-label-default"
                  defaultValue="Ana Torres"
                  className="w-56"
                />
              </div>
            </KitSpecimen>
            <KitSpecimen label="control disabled">
              <div className="flex flex-col gap-2" data-disabled="true">
                <Label htmlFor="kit-label-disabled">Nombre</Label>
                <Input
                  id="kit-label-disabled"
                  defaultValue="Ana Torres"
                  disabled
                  className="w-56"
                />
              </div>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="field"
        name="Field"
        description="El sistema de composición de formularios: agrupación, etiqueta, ayuda y error."
      >
        <KitGroup label="Variants">
          <KitRow>
            <KitSpecimen label="orientation=vertical" className="w-72">
              <Field>
                <FieldLabel htmlFor="kit-field-vertical">
                  Nombre de la key
                </FieldLabel>
                <Input
                  id="kit-field-vertical"
                  defaultValue="Integración de facturación"
                />
                <FieldDescription>
                  Visible solo para tu organización.
                </FieldDescription>
              </Field>
            </KitSpecimen>
            <KitSpecimen label="orientation=horizontal" className="w-72">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Rotación automática</FieldTitle>
                  <FieldDescription>
                    Renueva el token cada 90 días.
                  </FieldDescription>
                </FieldContent>
              </Field>
            </KitSpecimen>
          </KitRow>
        </KitGroup>

        <KitGroup label="States">
          <KitRow>
            <KitSpecimen label="error" className="w-72">
              <Field data-invalid="true">
                <FieldLabel htmlFor="kit-field-error">
                  Nombre de la key
                </FieldLabel>
                <Input id="kit-field-error" defaultValue="AB" aria-invalid />
                <FieldError>
                  El nombre debe tener al menos 3 caracteres.
                </FieldError>
              </Field>
            </KitSpecimen>
          </KitRow>
        </KitGroup>

        <KitGroup label="Special cases">
          <div className="max-w-md">
            <FieldSet>
              <FieldLegend>Datos personales</FieldLegend>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="kit-fieldset-name">Nombre</FieldLabel>
                  <Input id="kit-fieldset-name" defaultValue="Ana Torres" />
                </Field>
                <FieldSeparator />
                <Field>
                  <FieldLabel htmlFor="kit-fieldset-email">Email</FieldLabel>
                  <Input
                    id="kit-fieldset-email"
                    defaultValue="ana.torres@acme.com"
                    readOnly
                  />
                  <FieldDescription>
                    El email no se puede cambiar.
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="input-group"
        name="Input group"
        description="Campo con adornos, texto o botones adosados. En este sistema, el search input y el password input son composiciones de este componente, no primitivos propios."
      >
        <KitGroup label="Variants">
          <KitRow>
            <KitSpecimen label="addon inline-start" className="w-64">
              <InputGroup>
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
                <InputGroupInput placeholder="Buscar por nombre" />
              </InputGroup>
            </KitSpecimen>
            <KitSpecimen label="addon inline-end" className="w-64">
              <InputGroup>
                <InputGroupInput defaultValue="acme" />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>.example.com</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </KitSpecimen>
            <KitSpecimen label="InputGroupButton" className="w-64">
              <InputGroup>
                <InputGroupInput readOnly defaultValue="sk_live_••••••••a3f9" />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton>Copiar</InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </KitSpecimen>
            <KitSpecimen label="InputGroupTextarea" className="w-64">
              <InputGroup>
                <InputGroupTextarea placeholder="Motivo de la revocación" />
              </InputGroup>
            </KitSpecimen>
          </KitRow>
        </KitGroup>

        <KitGroup label="Special cases">
          <KitRow>
            <KitSpecimen label="search input" className="w-64">
              <InputGroup>
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
                <InputGroupInput type="search" placeholder="Buscar usuarios" />
              </InputGroup>
            </KitSpecimen>
            <KitSpecimen label="password input" className="w-64">
              <InputGroup>
                <InputGroupInput type="password" defaultValue="contrasena" />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton>Mostrar</InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </KitSpecimen>
          </KitRow>
        </KitGroup>

        <KitGroup label="States">
          <KitRow>
            <KitSpecimen label="disabled" className="w-64">
              <InputGroup>
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
                <InputGroupInput placeholder="Buscar por nombre" disabled />
              </InputGroup>
            </KitSpecimen>
            <KitSpecimen label="aria-invalid" className="w-64">
              <InputGroup>
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
                <InputGroupInput defaultValue="??" aria-invalid />
              </InputGroup>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="select"
        name="Select"
        description="Selección de un valor entre una lista cerrada."
      >
        <KitGroup label="States">
          <KitRow>
            <KitSpecimen label="placeholder">
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
              </Select>
            </KitSpecimen>
            <KitSpecimen label="con valor">
              <Select defaultValue="Activa">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
              </Select>
            </KitSpecimen>
            <KitSpecimen label="disabled">
              <Select disabled>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
              </Select>
            </KitSpecimen>
            <KitSpecimen label="aria-invalid">
              <Select>
                <SelectTrigger className="w-48" aria-invalid>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
              </Select>
            </KitSpecimen>
          </KitRow>
        </KitGroup>

        <KitGroup label="Sizes">
          <KitRow>
            <KitSpecimen label="sm">
              <Select defaultValue="Activa">
                <SelectTrigger size="sm" className="w-48">
                  <SelectValue />
                </SelectTrigger>
              </Select>
            </KitSpecimen>
            <KitSpecimen label="default">
              <Select defaultValue="Activa">
                <SelectTrigger size="default" className="w-48">
                  <SelectValue />
                </SelectTrigger>
              </Select>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>
    </KitSection>
  )
}
