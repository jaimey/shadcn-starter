import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Copy, Plus, TriangleAlert } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
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
import { Spinner } from "@/components/ui/spinner"
import type { ApiKey } from "@/data/api-keys"

const FAKE_LATENCY_MS = 800
const TOKEN_ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789"
const TOKEN_LENGTH = 32

const EXPIRATION_DAYS: Record<string, number | null> = {
  "30d": 30,
  "90d": 90,
  "1y": 365,
  never: null,
}

const createKeySchema = z.object({
  name: z.string().trim().min(3, "El nombre debe tener al menos 3 caracteres."),
  expiration: z.enum(["30d", "90d", "1y", "never"]),
})

type CreateKeyValues = z.infer<typeof createKeySchema>

function generateToken() {
  const bytes = new Uint8Array(TOKEN_LENGTH)
  crypto.getRandomValues(bytes)
  const body = Array.from(bytes, (byte) => TOKEN_ALPHABET[byte % TOKEN_ALPHABET.length]).join("")
  return `sk_live_${body}`
}

function maskToken(token: string) {
  return `sk_live_••••••••${token.slice(-4)}`
}

function expiresAtFrom(expiration: CreateKeyValues["expiration"]) {
  const days = EXPIRATION_DAYS[expiration]
  if (days === null) return null
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString()
}

export function CreateKeyDialog({ onCreated }: { onCreated: (key: ApiKey) => void }) {
  const [open, setOpen] = useState(false)
  const [revealedToken, setRevealedToken] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateKeyValues>({
    resolver: zodResolver(createKeySchema),
    defaultValues: { name: "", expiration: "90d" },
  })

  const expiration = watch("expiration")

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setRevealedToken(null)
      reset()
    }
  }

  async function onSubmit(values: CreateKeyValues) {
    await new Promise((resolve) => setTimeout(resolve, FAKE_LATENCY_MS))
    const token = generateToken()
    const now = new Date().toISOString()
    onCreated({
      id: `k-${token.slice(-8)}`,
      name: values.name,
      tokenPreview: maskToken(token),
      status: "Activa",
      createdAt: now,
      lastUsed: null,
      expiresAt: expiresAtFrom(values.expiration),
    })
    setRevealedToken(token)
  }

  async function copyToken() {
    if (!revealedToken) return
    await navigator.clipboard.writeText(revealedToken)
    toast.success("Token copiado al portapapeles.")
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus data-icon="inline-start" />
          Nueva API key
        </Button>
      </DialogTrigger>
      <DialogContent>
        {revealedToken ? (
          <>
            <DialogHeader>
              <DialogTitle>API key creada</DialogTitle>
              <DialogDescription>
                Cópiala ahora y guárdala en un lugar seguro.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Alert>
                <TriangleAlert />
                <AlertTitle>No volverás a ver este token</AlertTitle>
                <AlertDescription>
                  Al cerrar este diálogo solo quedará visible una versión enmascarada.
                </AlertDescription>
              </Alert>
              <InputGroup>
                <InputGroupInput readOnly value={revealedToken} className="font-mono" />
                <InputGroupAddon align="inline-end">
                  <Button variant="ghost" size="icon" onClick={copyToken} aria-label="Copiar token">
                    <Copy />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <DialogFooter>
              <Button onClick={() => handleOpenChange(false)}>Hecho</Button>
            </DialogFooter>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <DialogHeader>
              <DialogTitle>Nueva API key</DialogTitle>
              <DialogDescription>
                Dale un nombre reconocible y elige cuándo debe expirar.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup className="py-4">
              <Field data-invalid={errors.name ? true : undefined}>
                <FieldLabel htmlFor="key-name">Nombre</FieldLabel>
                <Input
                  id="key-name"
                  placeholder="Integración de facturación"
                  aria-invalid={errors.name ? true : undefined}
                  {...register("name")}
                />
                {errors.name ? (
                  <FieldError>{errors.name.message}</FieldError>
                ) : null}
              </Field>
              <Field>
                <FieldLabel htmlFor="key-expiration">Expiración</FieldLabel>
                <Select
                  value={expiration}
                  onValueChange={(value) =>
                    setValue("expiration", value as CreateKeyValues["expiration"])
                  }
                >
                  <SelectTrigger id="key-expiration">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="30d">30 días</SelectItem>
                      <SelectItem value="90d">90 días</SelectItem>
                      <SelectItem value="1y">1 año</SelectItem>
                      <SelectItem value="never">Sin expiración</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
                {isSubmitting ? "Creando…" : "Crear key"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
