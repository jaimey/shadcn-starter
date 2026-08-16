import { useMemo, useState } from "react"
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table"
import { Search } from "lucide-react"
import { DataTable } from "@/components/data-table"
import { userColumns } from "@/components/users/columns"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { users } from "@/data/users"

const ALL = "all"

export function UsersPage() {
  const [search, setSearch] = useState("")
  const [role, setRole] = useState(ALL)
  const [status, setStatus] = useState(ALL)
  const [sorting, setSorting] = useState<SortingState>([])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return users.filter((user) => {
      const matchesTerm =
        term === "" ||
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      const matchesRole = role === ALL || user.role === role
      const matchesStatus = status === ALL || user.status === status
      return matchesTerm && matchesRole && matchesStatus
    })
  }, [search, role, status])

  const table = useReactTable({
    data: filtered,
    columns: userColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Usuarios</h1>
        <p className="text-sm text-muted-foreground">
          Consulta y filtra los usuarios de la organización.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <InputGroup className="sm:max-w-xs">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Buscar por nombre o email"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </InputGroup>

        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="sm:w-44">
            <SelectValue placeholder="Rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={ALL}>Todos los roles</SelectItem>
              <SelectItem value="Administrador">Administrador</SelectItem>
              <SelectItem value="Editor">Editor</SelectItem>
              <SelectItem value="Visor">Visor</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="sm:w-44">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={ALL}>Todos los estados</SelectItem>
              <SelectItem value="Activo">Activo</SelectItem>
              <SelectItem value="Inactivo">Inactivo</SelectItem>
              <SelectItem value="Pendiente">Pendiente</SelectItem>
            </SelectGroup>
          </SelectContent>
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
