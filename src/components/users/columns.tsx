import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { toast } from "sonner"
import { formatDate } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { User, UserStatus } from "@/data/users"

const statusVariant: Record<UserStatus, "default" | "secondary" | "outline"> = {
  Activo: "default",
  Pendiente: "secondary",
  Inactivo: "outline",
}

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombre
        <ArrowUpDown data-icon="inline-end" />
      </Button>
    ),
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.email}</span>
    ),
  },
  {
    accessorKey: "role",
    header: "Rol",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status]}>{row.original.status}</Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Creación
        <ArrowUpDown data-icon="inline-end" />
      </Button>
    ),
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    accessorKey: "lastLogin",
    header: "Última conexión",
    cell: ({ row }) => formatDate(row.original.lastLogin),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label={`Acciones de ${row.original.name}`}>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={() => toast.info(`Editar ${row.original.name} (simulado).`)}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => toast.success(`${row.original.name} desactivado (simulado).`)}
              >
                Desactivar
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onSelect={() => toast.success(`${row.original.name} eliminado (simulado).`)}
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
]
