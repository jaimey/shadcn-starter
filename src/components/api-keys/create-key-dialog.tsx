import { useRef, useState } from "react"
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

// crypto.getRandomValues yields bytes 0-255, and 256 isn't a multiple of the
// alphabet's length, so a plain `byte % length` skews the first few
// characters. Reject any byte at or above the largest multiple of the
// alphabet length that fits in a byte, and redraw, so every character stays
// equally likely. The rejection rate is ~1.6% for a 36-character alphabet,
// so `maxBatches` is a generous safety cap, not a realistic limit.
function generateToken() {
  const alphabetLength = TOKEN_ALPHABET.length
  const rejectionThreshold = Math.floor(256 / alphabetLength) * alphabetLength
  const chars: string[] = []
  let batches = 0
  const maxBatches = 20

  while (chars.length < TOKEN_LENGTH && batches < maxBatches) {
    const bytes = new Uint8Array(TOKEN_LENGTH - chars.length)
    crypto.getRandomValues(bytes)
    for (const byte of bytes) {
      if (byte < rejectionThreshold) {
        chars.push(TOKEN_ALPHABET[byte % alphabetLength])
      }
    }
    batches += 1
  }

  if (chars.length < TOKEN_LENGTH) {
    throw new Error("No se pudo generar el token de forma segura.")
  }

  return `sk_live_${chars.join("")}`
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
  // Bumped every time the dialog closes, so an in-flight submission started
  // before the close can tell it was abandoned even if the dialog is
  // reopened again before the fake latency resolves.
  const submissionIdRef = useRef(0)

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
      submissionIdRef.current += 1
      setRevealedToken(null)
      reset()
    }
  }

  async function onSubmit(values: CreateKeyValues) {
    const submissionId = submissionIdRef.current
    await new Promise((resolve) => setTimeout(resolve, FAKE_LATENCY_MS))
    if (submissionId !== submissionIdRef.current) {
      // The dialog was closed (and possibly reopened) while this submission
      // was in flight. Abandon it silently: no toast, no key, no stale token.
      return
    }
    let token: string
    try {
      token = generateToken()
    } catch {
      toast.error("No se pudo generar la API key. Inténtalo de nuevo.")
      return
    }
    const now = new Date().toISOString()
    onCreated({
      // El id no debe derivarse del secreto: usa un identificador aleatorio
      // propio en vez de tomar caracteres del token.
      id: `k-${crypto.randomUUID()}`,
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
    try {
      await navigator.clipboard.writeText(revealedToken)
      toast.success("Token copiado al portapapeles.")
    } catch {
      toast.error(
        "No se pudo copiar el token. Cópialo manualmente del campo antes de cerrar este diálogo.",
      )
    }
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
