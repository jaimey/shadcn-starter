import type { ReactNode } from "react"
import { CircleCheck, Info, OctagonX, TriangleAlert } from "lucide-react"
import { toast } from "sonner"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  KitComponent,
  KitGroup,
  KitRow,
  KitSection,
  KitSpecimen,
} from "@/pages/ui-kit/kit"

// Réplica inline de la superficie de un toast de sonner. El componente real
// vive en un portal y solo existe en el DOM mientras está visible, así que el
// catálogo reproduce su superficie para que sea inspeccionable sin interactuar.
// Superficie copiada de src/components/ui/sonner.tsx.
function ToastReplica({
  icon,
  title,
  description,
}: {
  icon: ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex w-72 items-start gap-2 border bg-popover p-3 text-xs text-popover-foreground ring-1 ring-foreground/10">
      <span className="mt-0.5 shrink-0 [&>svg]:size-4">{icon}</span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="font-medium">{title}</span>
        <span className="text-muted-foreground">{description}</span>
      </div>
    </div>
  )
}

export function FeedbackSection() {
  return (
    <KitSection
      id="feedback"
      title="Feedback"
      description="Respuesta del sistema a una acción."
    >
      <KitComponent
        id="alert"
        name="Alert"
        description="Mensaje persistente dentro del flujo de la página."
      >
        <KitGroup label="Variants">
          <div className="flex max-w-lg flex-col gap-3">
            <KitSpecimen label="default">
              <Alert>
                <AlertTitle>El token solo se muestra una vez</AlertTitle>
                <AlertDescription>
                  Cópialo ahora: no podrás volver a verlo.
                </AlertDescription>
              </Alert>
            </KitSpecimen>
            <KitSpecimen label="destructive">
              <Alert variant="destructive">
                <AlertTitle>No se pudo revocar la key</AlertTitle>
                <AlertDescription>
                  Vuelve a intentarlo en unos segundos.
                </AlertDescription>
              </Alert>
            </KitSpecimen>
          </div>
        </KitGroup>

        <KitGroup label="Special cases">
          <div className="flex max-w-lg flex-col gap-3">
            <KitSpecimen label="con icono">
              <Alert>
                <TriangleAlert />
                <AlertTitle>La key expira en 7 días</AlertTitle>
                <AlertDescription>
                  Renuévala antes del 6 de septiembre para evitar cortes.
                </AlertDescription>
              </Alert>
            </KitSpecimen>
            <KitSpecimen label="con AlertAction">
              <Alert>
                <Info />
                <AlertTitle>Hay una versión nueva del panel</AlertTitle>
                <AlertDescription>
                  Recarga para aplicar los cambios.
                </AlertDescription>
                <AlertAction>
                  <Button size="xs" variant="outline">
                    Recargar
                  </Button>
                </AlertAction>
              </Alert>
            </KitSpecimen>
            <KitSpecimen label="solo título">
              <Alert>
                <AlertTitle>Cambios guardados.</AlertTitle>
              </Alert>
            </KitSpecimen>
          </div>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="spinner"
        name="Spinner"
        description="Indicador de proceso en curso."
      >
        <KitGroup label="Sizes">
          <KitRow>
            <KitSpecimen label="default">
              <Spinner />
            </KitSpecimen>
            <KitSpecimen label="size-6">
              <Spinner className="size-6" />
            </KitSpecimen>
            <KitSpecimen label="size-8">
              <Spinner className="size-8" />
            </KitSpecimen>
          </KitRow>
        </KitGroup>

        <KitGroup label="Special cases">
          <KitRow>
            <KitSpecimen label="dentro de un botón">
              <Button disabled>
                <Spinner />
                Guardando
              </Button>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="toast"
        name="Toast"
        description="Aviso efímero, servido por sonner desde un portal."
      >
        <KitGroup label="Variants">
          <KitRow>
            <KitSpecimen label="Open — success">
              <ToastReplica
                icon={<CircleCheck className="text-primary" />}
                title="API key creada"
                description='"Integración de facturación" ya está activa.'
              />
            </KitSpecimen>
            <KitSpecimen label="Open — error">
              <ToastReplica
                icon={<OctagonX className="text-destructive" />}
                title="No se pudo crear la key"
                description="El nombre ya está en uso."
              />
            </KitSpecimen>
            <KitSpecimen label="Open — warning">
              <ToastReplica
                icon={<TriangleAlert className="text-destructive" />}
                title="La key expira pronto"
                description="Quedan 7 días antes de la expiración."
              />
            </KitSpecimen>
            <KitSpecimen label="Open — info">
              <ToastReplica
                icon={<Info className="text-muted-foreground" />}
                title="Sesión restaurada"
                description="Has vuelto a entrar desde este navegador."
              />
            </KitSpecimen>
          </KitRow>
        </KitGroup>

        <KitGroup label="Trigger">
          <KitRow>
            <KitSpecimen label="success">
              <Button
                variant="outline"
                onClick={() => toast.success("API key creada.")}
              >
                Lanzar success
              </Button>
            </KitSpecimen>
            <KitSpecimen label="error">
              <Button
                variant="outline"
                onClick={() => toast.error("No se pudo crear la key.")}
              >
                Lanzar error
              </Button>
            </KitSpecimen>
            <KitSpecimen label="warning">
              <Button
                variant="outline"
                onClick={() => toast.warning("La key expira pronto.")}
              >
                Lanzar warning
              </Button>
            </KitSpecimen>
            <KitSpecimen label="info">
              <Button
                variant="outline"
                onClick={() => toast.info("Sesión restaurada.")}
              >
                Lanzar info
              </Button>
            </KitSpecimen>
          </KitRow>
        </KitGroup>

        <p className="text-sm text-muted-foreground">
          Los cuatro iconos de estado se configuran en{" "}
          <span className="font-mono">src/components/ui/sonner.tsx</span> y son el
          único lugar del sistema con semántica de éxito y aviso: la paleta no
          define tokens de éxito, aviso ni información.
        </p>
      </KitComponent>
    </KitSection>
  )
}
