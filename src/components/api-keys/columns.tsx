import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
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
import type { ApiKey, ApiKeyStatus } from "@/data/api-keys"

const statusVariant: Record<ApiKeyStatus, "default" | "secondary" | "destructive"> = {
  Activa: "default",
  Expirada: "secondary",
  Revocada: "destructive",
}

export function createApiKeyColumns(
  onRevoke: (key: ApiKey) => void,
): ColumnDef<ApiKey>[] {
  return [
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
      accessorKey: "tokenPreview",
      header: "Token",
      cell: ({ row }) => (
        <span className="font-mono text-sm text-muted-foreground">
          {row.original.tokenPreview}
        </span>
      ),
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
      accessorKey: "lastUsed",
      header: "Último uso",
      cell: ({ row }) =>
        row.original.lastUsed ? formatDate(row.original.lastUsed) : "Nunca",
    },
    {
      accessorKey: "expiresAt",
      header: "Expiración",
      cell: ({ row }) =>
        row.original.expiresAt ? formatDate(row.original.expiresAt) : "Sin expiración",
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Acciones de ${row.original.name}`}
              >
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  variant="destructive"
                  disabled={row.original.status === "Revocada"}
                  onSelect={() => onRevoke(row.original)}
                >
                  Revocar
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]
}
