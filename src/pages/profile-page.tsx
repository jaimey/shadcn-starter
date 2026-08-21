import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { z } from "zod"
import { formatDate } from "@/components/data-table"
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
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useAuth } from "@/lib/auth"
import { useTheme, type Theme } from "@/components/theme-provider"

const FAKE_LATENCY_MS = 800

const personalSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres."),
})

const passwordSchema = z
  .object({
    currentPassword: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
    newPassword: z.string().min(8, "La nueva contraseña debe tener al menos 8 caracteres."),
    confirmPassword: z.string().min(1, "Confirma la nueva contraseña."),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  })

type PersonalValues = z.infer<typeof personalSchema>
type PasswordValues = z.infer<typeof passwordSchema>

export function ProfilePage() {
  const { user, updateName } = useAuth()
  const { theme, setTheme } = useTheme()

  const personalForm = useForm<PersonalValues>({
    resolver: zodResolver(personalSchema),
    defaultValues: { name: user?.name ?? "" },
  })

  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  })

  if (!user) return null

  async function onSubmitPersonal(values: PersonalValues) {
    await new Promise((resolve) => setTimeout(resolve, FAKE_LATENCY_MS))
    updateName(values.name)
    toast.success("Datos actualizados.")
  }

  async function onSubmitPassword() {
    await new Promise((resolve) => setTimeout(resolve, FAKE_LATENCY_MS))
    passwordForm.reset()
    toast.success("Contraseña actualizada.")
  }

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Perfil</h1>
        <p className="text-sm text-muted-foreground">
          Gestiona tu información y tus preferencias.
        </p>
      </div>

      <Card>
        <form onSubmit={personalForm.handleSubmit(onSubmitPersonal)} noValidate>
          <CardHeader>
            <CardTitle>Datos personales</CardTitle>
            <CardDescription>Tu nombre visible en la aplicación.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field data-invalid={personalForm.formState.errors.name ? true : undefined}>
                <FieldLabel htmlFor="name">Nombre</FieldLabel>
                <Input
                  id="name"
                  aria-invalid={personalForm.formState.errors.name ? true : undefined}
                  {...personalForm.register("name")}
                />
                {personalForm.formState.errors.name ? (
                  <FieldError>
                    {personalForm.formState.errors.name.message}
                  </FieldError>
                ) : null}
              </Field>
              <Field data-disabled>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" value={user.email} disabled />
                <FieldDescription>El email no se puede modificar.</FieldDescription>
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={personalForm.formState.isSubmitting}>
              {personalForm.formState.isSubmitting ? (
                <Spinner data-icon="inline-start" />
              ) : null}
              Guardar cambios
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} noValidate>
          <CardHeader>
            <CardTitle>Cambiar contraseña</CardTitle>
            <CardDescription>
              El cambio es simulado: no se guarda ninguna contraseña.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field
                data-invalid={
                  passwordForm.formState.errors.currentPassword ? true : undefined
                }
              >
                <FieldLabel htmlFor="current-password">Contraseña actual</FieldLabel>
                <Input
                  id="current-password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={
                    passwordForm.formState.errors.currentPassword ? true : undefined
                  }
                  {...passwordForm.register("currentPassword")}
                />
                {passwordForm.formState.errors.currentPassword ? (
                  <FieldError>
                    {passwordForm.formState.errors.currentPassword.message}
                  </FieldError>
                ) : null}
              </Field>
              <Field
                data-invalid={passwordForm.formState.errors.newPassword ? true : undefined}
              >
                <FieldLabel htmlFor="new-password">Nueva contraseña</FieldLabel>
                <Input
                  id="new-password"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={
                    passwordForm.formState.errors.newPassword ? true : undefined
                  }
                  {...passwordForm.register("newPassword")}
                />
                {passwordForm.formState.errors.newPassword ? (
                  <FieldError>
                    {passwordForm.formState.errors.newPassword.message}
                  </FieldError>
                ) : null}
              </Field>
              <Field
                data-invalid={
                  passwordForm.formState.errors.confirmPassword ? true : undefined
                }
              >
                <FieldLabel htmlFor="confirm-password">Confirmar contraseña</FieldLabel>
                <Input
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={
                    passwordForm.formState.errors.confirmPassword ? true : undefined
                  }
                  {...passwordForm.register("confirmPassword")}
                />
                {passwordForm.formState.errors.confirmPassword ? (
                  <FieldError>
                    {passwordForm.formState.errors.confirmPassword.message}
                  </FieldError>
                ) : null}
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={passwordForm.formState.isSubmitting}>
              {passwordForm.formState.isSubmitting ? (
                <Spinner data-icon="inline-start" />
              ) : null}
              Actualizar contraseña
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Apariencia</CardTitle>
          <CardDescription>Elige el tema de la interfaz.</CardDescription>
        </CardHeader>
        <CardContent>
          <Field orientation="horizontal">
            <FieldTitle id="theme-label">Tema</FieldTitle>
            <ToggleGroup
              type="single"
              aria-labelledby="theme-label"
              spacing={2}
              value={theme}
              onValueChange={(value) => {
                if (value) setTheme(value as Theme)
              }}
            >
              <ToggleGroupItem value="light">Claro</ToggleGroupItem>
              <ToggleGroupItem value="dark">Oscuro</ToggleGroupItem>
              <ToggleGroupItem value="system">Sistema</ToggleGroupItem>
            </ToggleGroup>
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información de la cuenta</CardTitle>
          <CardDescription>Datos de solo lectura.</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-1">
              <dt className="text-sm text-muted-foreground">Rol</dt>
              <dd className="text-sm font-medium">{user.role}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-sm text-muted-foreground">Alta</dt>
              <dd className="text-sm font-medium">{formatDate(user.createdAt)}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-sm text-muted-foreground">Último acceso</dt>
              <dd className="text-sm font-medium">{formatDate(user.lastLogin)}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}
