import { useState } from "react"
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table"
import {
  ChevronsUpDown,
  LogOut,
  Search,
  TriangleAlert,
  UserCog,
} from "lucide-react"
import { CreateKeyDialog } from "@/components/api-keys/create-key-dialog"
import { DataTable } from "@/components/data-table"
import { userColumns } from "@/components/users/columns"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { users } from "@/data/users"
import {
  KitComponent,
  KitGroup,
  KitRow,
  KitSection,
  KitSpecimen,
} from "@/pages/ui-kit/kit"
import {
  AlertDialogActionReplica,
  AlertDialogCancelReplica,
  AlertDialogSurface,
  DialogSurface,
  MenuItemReplica,
  MenuLabelReplica,
  MenuSeparatorReplica,
  MenuSurface,
} from "@/pages/ui-kit/replicas"

function UsersToolbarDemo() {
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data: users.slice(0, 6),
    columns: userColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 3 } },
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <InputGroup className="sm:max-w-xs">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput placeholder="Buscar por nombre" />
        </InputGroup>
        <Select defaultValue="Activo">
          <SelectTrigger className="sm:w-44">
            <SelectValue />
          </SelectTrigger>
        </Select>
      </div>
      <DataTable
        table={table}
        columnCount={userColumns.length}
        emptyTitle="Sin resultados"
        emptyDescription="Ningún usuario coincide con los filtros aplicados."
      />
    </div>
  )
}

export function CompositeSection() {
  return (
    <KitSection
      id="composite"
      title="Composite"
      description="Composiciones reales extraídas de las páginas de la aplicación."
    >
      <KitComponent
        id="search-bar"
        name="Search bar"
        description="Búsqueda sobre una colección. Origen: users-page y api-keys-page."
      >
        <KitGroup label="Special cases">
          <KitRow>
            <KitSpecimen label="default" className="w-72">
              <InputGroup>
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
                <InputGroupInput type="search" placeholder="Buscar por nombre" />
              </InputGroup>
            </KitSpecimen>
            <KitSpecimen label="con término" className="w-72">
              <InputGroup>
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
                <InputGroupInput type="search" defaultValue="facturación" />
              </InputGroup>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="filter-bar"
        name="Filter bar"
        description="Búsqueda más filtro de estado. Origen: api-keys-page."
      >
        <KitGroup label="Special cases">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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

      <KitComponent
        id="data-table-toolbar"
        name="Data table toolbar"
        description="Filtros, tabla y paginación montados juntos. Origen: users-page."
      >
        <KitGroup label="Special cases">
          <UsersToolbarDemo />
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="user-menu"
        name="User menu"
        description="Avatar con menú de cuenta. Recompuesto: el NavUser real devuelve null sin sesión activa."
      >
        <KitGroup label="Variants">
          <KitRow>
            <KitSpecimen label="Trigger">
              <Button variant="ghost" className="h-auto gap-2 py-2">
                <Avatar size="sm">
                  <AvatarFallback>AT</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">Ana Torres</span>
                <ChevronsUpDown />
              </Button>
            </KitSpecimen>
            <KitSpecimen label="Open" className="w-56">
              <MenuSurface>
                <MenuLabelReplica>Mi cuenta</MenuLabelReplica>
                <p className="truncate px-2 pb-2 text-xs text-muted-foreground">
                  ana.torres@acme.com
                </p>
                <MenuSeparatorReplica />
                <MenuItemReplica>
                  <UserCog />
                  Perfil
                </MenuItemReplica>
                <MenuSeparatorReplica />
                <MenuItemReplica>
                  <LogOut />
                  Cerrar sesión
                </MenuItemReplica>
              </MenuSurface>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="form-section"
        name="Form section"
        description="Card con grupo de campos y acciones en el pie. Origen: profile-page."
      >
        <KitGroup label="Special cases">
          <div className="max-w-md">
            <Card>
              <CardHeader>
                <CardTitle>Datos personales</CardTitle>
                <CardDescription>
                  Actualiza tu nombre visible en la aplicación.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="kit-composite-name">Nombre</FieldLabel>
                    <Input id="kit-composite-name" defaultValue="Ana Torres" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="kit-composite-email">Email</FieldLabel>
                    <Input
                      id="kit-composite-email"
                      defaultValue="ana.torres@acme.com"
                      readOnly
                    />
                  </Field>
                </FieldGroup>
              </CardContent>
              <CardFooter>
                <Button>Guardar cambios</Button>
              </CardFooter>
            </Card>
          </div>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="login-form"
        name="Login form"
        description="Formulario de acceso. Recompuesto en estático: el real autentica y navega, y el catálogo no ejecuta acciones."
      >
        <KitGroup label="States">
          <KitRow>
            <KitSpecimen label="default" className="w-80">
              <Card>
                <CardHeader>
                  <CardTitle>Iniciar sesión</CardTitle>
                  <CardDescription>Accede con tu cuenta.</CardDescription>
                </CardHeader>
                <CardContent>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="kit-login-email">Email</FieldLabel>
                      <Input
                        id="kit-login-email"
                        type="email"
                        defaultValue="admin@example.com"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="kit-login-password">
                        Contraseña
                      </FieldLabel>
                      <Input
                        id="kit-login-password"
                        type="password"
                        defaultValue="password"
                      />
                    </Field>
                    <Button className="w-full">Entrar</Button>
                  </FieldGroup>
                </CardContent>
              </Card>
            </KitSpecimen>
            <KitSpecimen label="error" className="w-80">
              <Card>
                <CardHeader>
                  <CardTitle>Iniciar sesión</CardTitle>
                  <CardDescription>Accede con tu cuenta.</CardDescription>
                </CardHeader>
                <CardContent>
                  <FieldGroup>
                    <Alert variant="destructive">
                      <AlertTitle>Credenciales incorrectas</AlertTitle>
                      <AlertDescription>
                        Revisa el email y la contraseña.
                      </AlertDescription>
                    </Alert>
                    <Field>
                      <FieldLabel htmlFor="kit-login-error-email">
                        Email
                      </FieldLabel>
                      <Input
                        id="kit-login-error-email"
                        type="email"
                        defaultValue="admin@example.com"
                        aria-invalid
                      />
                    </Field>
                    <Button className="w-full">Entrar</Button>
                  </FieldGroup>
                </CardContent>
              </Card>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="create-key-dialog"
        name="Create key dialog"
        description="Diálogo con formulario y revelado único del token. El trigger monta el componente real de la aplicación."
      >
        <KitGroup label="Variants">
          <KitRow>
            <KitSpecimen label="Trigger">
              <CreateKeyDialog onCreated={() => {}} />
            </KitSpecimen>
            <KitSpecimen label="Open" className="w-full max-w-sm">
              <DialogSurface>
                <DialogHeader>
                  <DialogTitle>Crear API key</DialogTitle>
                  <DialogDescription>
                    Dale un nombre y elige cuándo debe expirar.
                  </DialogDescription>
                </DialogHeader>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="kit-create-key-name">Nombre</FieldLabel>
                    <Input
                      id="kit-create-key-name"
                      defaultValue="Integración de facturación"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="kit-create-key-exp">
                      Expiración
                    </FieldLabel>
                    <Select defaultValue="90d">
                      <SelectTrigger id="kit-create-key-exp" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </Select>
                  </Field>
                </FieldGroup>
                <DialogFooter>
                  <Button variant="secondary">Cancelar</Button>
                  <Button>Crear</Button>
                </DialogFooter>
              </DialogSurface>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="confirmation-dialog"
        name="Confirmation dialog"
        description="Confirmación de una acción destructiva. Origen: la revocación de api-keys-page."
      >
        <KitGroup label="Variants">
          <KitRow>
            <KitSpecimen label="Open" className="w-full max-w-sm">
              <AlertDialogSurface>
                <AlertDialogHeader>
                  <AlertDialogMedia>
                    <TriangleAlert />
                  </AlertDialogMedia>
                  <AlertDialogTitle>¿Revocar esta API key?</AlertDialogTitle>
                  <AlertDialogDescription>
                    &quot;Integración de facturación&quot; dejará de funcionar de
                    inmediato. Esta acción no se puede deshacer.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancelReplica>Cancelar</AlertDialogCancelReplica>
                  <AlertDialogActionReplica>Revocar</AlertDialogActionReplica>
                </AlertDialogFooter>
              </AlertDialogSurface>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>
    </KitSection>
  )
}
