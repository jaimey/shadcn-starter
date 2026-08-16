import { useMemo, useState } from "react"
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table"
import { Search } from "lucide-react"
import { toast } from "sonner"
import { createApiKeyColumns } from "@/components/api-keys/columns"
import { CreateKeyDialog } from "@/components/api-keys/create-key-dialog"
import { DataTable } from "@/components/data-table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
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
import { apiKeys as initialApiKeys, type ApiKey } from "@/data/api-keys"

const ALL = "all"

export function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>(initialApiKeys)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState(ALL)
  const [sorting, setSorting] = useState<SortingState>([])
  const [keyToRevoke, setKeyToRevoke] = useState<ApiKey | null>(null)

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return keys.filter((key) => {
      const matchesTerm = term === "" || key.name.toLowerCase().includes(term)
      const matchesStatus = status === ALL || key.status === status
      return matchesTerm && matchesStatus
    })
  }, [keys, search, status])

  const columns = useMemo(() => createApiKeyColumns(setKeyToRevoke), [])

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  function handleCreated(key: ApiKey) {
    setKeys((current) => [key, ...current])
    toast.success(`API key "${key.name}" creada.`)
  }

  function confirmRevoke() {
    if (!keyToRevoke) return
    setKeys((current) =>
      current.map((key) =>
        key.id === keyToRevoke.id ? { ...key, status: "Revocada" as const } : key,
      ),
    )
    toast.success(`API key "${keyToRevoke.name}" revocada.`)
    setKeyToRevoke(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">API Keys</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona los tokens de acceso de tu organización.
          </p>
        </div>
        <CreateKeyDialog onCreated={handleCreated} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <InputGroup className="sm:max-w-xs">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Buscar por nombre"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </InputGroup>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="sm:w-44">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={ALL}>Todos los estados</SelectItem>
              <SelectItem value="Activa">Activa</SelectItem>
              <SelectItem value="Revocada">Revocada</SelectItem>
              <SelectItem value="Expirada">Expirada</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        table={table}
        columnCount={columns.length}
        emptyTitle="Sin resultados"
        emptyDescription="Ninguna API key coincide con los filtros aplicados."
      />

      <AlertDialog
        open={keyToRevoke !== null}
        onOpenChange={(open) => {
          if (!open) setKeyToRevoke(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Revocar esta API key?</AlertDialogTitle>
            <AlertDialogDescription>
              {keyToRevoke
                ? `"${keyToRevoke.name}" dejará de funcionar de inmediato. Esta acción no se puede deshacer.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRevoke}>Revocar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
