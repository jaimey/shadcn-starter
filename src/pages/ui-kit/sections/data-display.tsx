import { useState } from "react"
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table"
import { FileSearch } from "lucide-react"
import { DataTable, formatDate } from "@/components/data-table"
import { userColumns } from "@/components/users/columns"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { apiKeys } from "@/data/api-keys"
import { users, type User } from "@/data/users"
import {
  KitComponent,
  KitGroup,
  KitRow,
  KitSection,
  KitSpecimen,
} from "@/pages/ui-kit/kit"

const BADGE_VARIANTS = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
] as const

function initialsOf(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
}

function UsersTableDemo({ data }: { data: User[] }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data,
    columns: userColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  })

  return (
    <DataTable
      table={table}
      columnCount={userColumns.length}
      emptyTitle="Sin resultados"
      emptyDescription="Ningún usuario coincide con los filtros aplicados."
    />
  )
}

export function DataDisplaySection() {
  return (
    <KitSection
      id="data-display"
      title="Data display"
      description="Presentación de información y de colecciones."
    >
      <KitComponent
        id="badge"
        name="Badge"
        description="Etiqueta compacta de estado o de categoría."
      >
        <KitGroup label="Variants">
          <KitRow>
            {BADGE_VARIANTS.map((variant) => (
              <KitSpecimen key={variant} label={variant}>
                <Badge variant={variant}>Activa</Badge>
              </KitSpecimen>
            ))}
          </KitRow>
        </KitGroup>

        <KitGroup label="Special cases">
          <KitRow>
            <KitSpecimen label="con icono">
              <Badge>
                <FileSearch data-icon="inline-start" />
                Pendiente
              </Badge>
            </KitSpecimen>
            <KitSpecimen label="estados de api key">
              <div className="flex gap-2">
                <Badge>Activa</Badge>
                <Badge variant="destructive">Revocada</Badge>
                <Badge variant="secondary">Expirada</Badge>
              </div>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="avatar"
        name="Avatar"
        description="Representación de una persona, con imagen o con iniciales."
      >
        <KitGroup label="Sizes">
          <KitRow>
            <KitSpecimen label="sm">
              <Avatar size="sm">
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
            </KitSpecimen>
            <KitSpecimen label="default">
              <Avatar>
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
            </KitSpecimen>
            <KitSpecimen label="lg">
              <Avatar size="lg">
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
            </KitSpecimen>
          </KitRow>
        </KitGroup>

        <KitGroup label="Special cases">
          <KitRow>
            <KitSpecimen label="AvatarBadge">
              <Avatar>
                <AvatarFallback>BS</AvatarFallback>
                <AvatarBadge className="bg-primary" />
              </Avatar>
            </KitSpecimen>
            <KitSpecimen label="AvatarGroup">
              <AvatarGroup>
                {users.slice(0, 3).map((user) => (
                  <Avatar key={user.id}>
                    <AvatarFallback>{initialsOf(user.name)}</AvatarFallback>
                  </Avatar>
                ))}
                <AvatarGroupCount>+{users.length - 3}</AvatarGroupCount>
              </AvatarGroup>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="card"
        name="Card"
        description="Contenedor con cabecera, cuerpo y pie."
      >
        <KitGroup label="Special cases">
          <KitRow>
            <KitSpecimen label="completa" className="w-72">
              <Card>
                <CardHeader>
                  <CardTitle>Integración de facturación</CardTitle>
                  <CardDescription>
                    Creada el 4 de noviembre de 2025.
                  </CardDescription>
                  <CardAction>
                    <Badge>Activa</Badge>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-xs">sk_live_••••••••a3f9</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Revocar</Button>
                </CardFooter>
              </Card>
            </KitSpecimen>
            <KitSpecimen label="sin footer" className="w-72">
              <Card>
                <CardHeader>
                  <CardTitle>Usuarios activos</CardTitle>
                  <CardDescription>Últimos 30 días.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">{users.length}</p>
                </CardContent>
              </Card>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="table"
        name="Table"
        description="El primitivo de tabla, sin ordenación ni paginación."
      >
        <KitGroup label="Special cases">
          <div className="border">
            <Table>
              <TableCaption>API keys de la organización.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Creada</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.slice(0, 4).map((key) => (
                  <TableRow key={key.id}>
                    <TableCell>{key.name}</TableCell>
                    <TableCell className="font-mono">{key.tokenPreview}</TableCell>
                    <TableCell>{key.status}</TableCell>
                    <TableCell>{formatDate(key.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>{apiKeys.length} keys en total</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="data-table"
        name="Data table"
        description="El compuesto real de la aplicación: cabeceras ordenables, paginación y estado vacío propio."
      >
        <KitGroup label="States">
          <div className="flex flex-col gap-6">
            <KitSpecimen label="con filas">
              <UsersTableDemo data={users} />
            </KitSpecimen>
            <KitSpecimen label="empty">
              <UsersTableDemo data={[]} />
            </KitSpecimen>
          </div>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="skeleton"
        name="Skeleton"
        description="Marcador de posición mientras se carga contenido."
      >
        <KitGroup label="Special cases">
          <KitRow>
            <KitSpecimen label="línea">
              <Skeleton className="h-4 w-48" />
            </KitSpecimen>
            <KitSpecimen label="bloque">
              <Skeleton className="h-24 w-48" />
            </KitSpecimen>
            <KitSpecimen label="fila de tabla" className="w-full max-w-md">
              <div className="flex flex-col gap-2">
                {[0, 1, 2].map((row) => (
                  <div key={row} className="flex items-center gap-3">
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="empty"
        name="Empty"
        description="Estado vacío de una colección."
      >
        <KitGroup label="Variants">
          <KitRow>
            <KitSpecimen label="EmptyMedia default" className="w-72">
              <div className="border">
                <Empty>
                  <EmptyHeader>
                    <EmptyTitle>Sin resultados</EmptyTitle>
                    <EmptyDescription>
                      Ninguna API key coincide con los filtros aplicados.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              </div>
            </KitSpecimen>
            <KitSpecimen label="EmptyMedia icon" className="w-72">
              <div className="border">
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <FileSearch />
                    </EmptyMedia>
                    <EmptyTitle>Sin resultados</EmptyTitle>
                    <EmptyDescription>
                      Ninguna API key coincide con los filtros aplicados.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              </div>
            </KitSpecimen>
          </KitRow>
        </KitGroup>

        <KitGroup label="Special cases">
          <KitRow>
            <KitSpecimen label="con acción" className="w-72">
              <div className="border">
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <FileSearch />
                    </EmptyMedia>
                    <EmptyTitle>Todavía no hay API keys</EmptyTitle>
                    <EmptyDescription>
                      Crea la primera para empezar a integrar.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Button>Crear API key</Button>
                  </EmptyContent>
                </Empty>
              </div>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>
    </KitSection>
  )
}
