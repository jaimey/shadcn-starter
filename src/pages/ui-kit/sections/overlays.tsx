import { Check, TriangleAlert } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
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
  SheetSurface,
  TooltipSurface,
} from "@/pages/ui-kit/replicas"

const SHEET_SIDES = ["right", "left", "top", "bottom"] as const

export function OverlaysSection() {
  return (
    <KitSection
      id="overlays"
      title="Overlays"
      description="Capas que se sitúan por encima del contenido. Cada una se muestra dos veces: el trigger real y una réplica inline siempre presente en el DOM."
    >
      <KitComponent
        id="dialog"
        name="Dialog"
        description="Ventana modal para una tarea puntual."
      >
        <KitGroup label="Variants">
          <KitRow>
            <KitSpecimen label="Trigger">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Crear API key</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Crear API key</DialogTitle>
                    <DialogDescription>
                      El token se muestra una sola vez.
                    </DialogDescription>
                  </DialogHeader>
                  <Input defaultValue="Integración de facturación" />
                  <DialogFooter>
                    <Button variant="secondary">Cancelar</Button>
                    <Button>Crear</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </KitSpecimen>
            <KitSpecimen label="Open" className="w-full max-w-sm">
              <DialogSurface>
                <DialogHeader>
                  <DialogTitle>Crear API key</DialogTitle>
                  <DialogDescription>
                    El token se muestra una sola vez.
                  </DialogDescription>
                </DialogHeader>
                <Input defaultValue="Integración de facturación" />
                <DialogFooter>
                  <Button variant="secondary">Cancelar</Button>
                  <Button>Crear</Button>
                </DialogFooter>
              </DialogSurface>
            </KitSpecimen>
          </KitRow>
        </KitGroup>

        <KitGroup label="Special cases">
          <KitRow>
            <KitSpecimen label="Open — sin footer" className="w-full max-w-sm">
              <DialogSurface>
                <DialogHeader>
                  <DialogTitle>Detalle de la key</DialogTitle>
                  <DialogDescription>
                    Creada el 4 de noviembre de 2025. Sin fecha de expiración.
                  </DialogDescription>
                </DialogHeader>
              </DialogSurface>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="alert-dialog"
        name="Alert dialog"
        description="Modal que exige una decisión antes de continuar."
      >
        <KitGroup label="Variants">
          <KitRow>
            <KitSpecimen label="Trigger">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Revocar</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogMedia>
                      <TriangleAlert />
                    </AlertDialogMedia>
                    <AlertDialogTitle>¿Revocar esta API key?</AlertDialogTitle>
                    <AlertDialogDescription>
                      &quot;Integración de facturación&quot; dejará de funcionar
                      de inmediato. Esta acción no se puede deshacer.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction>Revocar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </KitSpecimen>
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

      <KitComponent
        id="sheet"
        name="Sheet"
        description="Panel lateral anclado a un borde de la pantalla. Cumple el papel de un drawer."
      >
        <KitGroup label="Variants">
          <KitRow>
            {SHEET_SIDES.map((side) => (
              <KitSpecimen key={side} label={`Trigger — side=${side}`}>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Abrir {side}</Button>
                  </SheetTrigger>
                  <SheetContent side={side}>
                    <SheetHeader>
                      <SheetTitle>Filtros</SheetTitle>
                      <SheetDescription>
                        Acota la lista de usuarios.
                      </SheetDescription>
                    </SheetHeader>
                    <SheetFooter>
                      <Button>Aplicar</Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </KitSpecimen>
            ))}
          </KitRow>
        </KitGroup>

        <KitGroup label="Special cases">
          <KitRow>
            <KitSpecimen label="Open — side=right" className="w-full max-w-sm">
              <SheetSurface side="right">
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                  <SheetDescription>
                    Acota la lista de usuarios.
                  </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                  <Button>Aplicar</Button>
                </SheetFooter>
              </SheetSurface>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="tooltip"
        name="Tooltip"
        description="Etiqueta breve que aparece al enfocar o apuntar un control."
      >
        <KitGroup label="Variants">
          <KitRow>
            <KitSpecimen label="Trigger">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Pasa el cursor</Button>
                </TooltipTrigger>
                <TooltipContent>Copia el token al portapapeles</TooltipContent>
              </Tooltip>
            </KitSpecimen>
            <KitSpecimen label="Open">
              <TooltipSurface>Copia el token al portapapeles</TooltipSurface>
            </KitSpecimen>
            <KitSpecimen label="Open — con icono">
              <TooltipSurface>
                <Check className="size-3.5" />
                Copiado
              </TooltipSurface>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>
    </KitSection>
  )
}
