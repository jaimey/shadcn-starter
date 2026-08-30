import type { ReactNode } from "react"
import { AlertDialog } from "@/components/ui/alert-dialog"
import { Dialog } from "@/components/ui/dialog"
import { Sheet } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

// Superficie de DialogContent, copiada de src/components/ui/dialog.tsx sin el
// `fixed`, las traslaciones ni las animaciones de entrada. El `<Dialog open>`
// solo aporta el contexto de Radix que DialogTitle y DialogDescription
// necesitan; sin Content no hay portal, ni foco atrapado, ni scroll bloqueado.
export function DialogSurface({ children }: { children: ReactNode }) {
  return (
    <Dialog open modal={false}>
      <div className="grid w-full max-w-sm gap-4 rounded-none bg-popover p-4 text-xs/relaxed text-popover-foreground ring-1 ring-foreground/10">
        {children}
      </div>
    </Dialog>
  )
}

// Superficie de AlertDialogContent, copiada de src/components/ui/alert-dialog.tsx.
export function AlertDialogSurface({ children }: { children: ReactNode }) {
  return (
    <AlertDialog open>
      <div className="grid w-full max-w-sm gap-4 rounded-none bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10">
        {children}
      </div>
    </AlertDialog>
  )
}

// Superficie de SheetContent, copiada de src/components/ui/sheet.tsx. El borde
// depende del lado, igual que en el original.
const SHEET_SIDE_BORDER = {
  right: "border-l",
  left: "border-r",
  top: "border-b",
  bottom: "border-t",
} as const

export function SheetSurface({
  side,
  children,
}: {
  side: keyof typeof SHEET_SIDE_BORDER
  children: ReactNode
}) {
  return (
    <Sheet open modal={false}>
      <div
        data-side={side}
        className={cn(
          "flex w-full max-w-sm flex-col bg-popover bg-clip-padding text-xs/relaxed text-popover-foreground shadow-lg",
          SHEET_SIDE_BORDER[side],
        )}
      >
        {children}
      </div>
    </Sheet>
  )
}

// Superficie de TooltipContent, copiada de src/components/ui/tooltip.tsx.
export function TooltipSurface({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit max-w-xs items-center gap-1.5 rounded-none bg-foreground px-3 py-1.5 text-xs text-background">
      {children}
    </span>
  )
}

// Superficie de DropdownMenuContent y de SelectContent, copiada de
// src/components/ui/dropdown-menu.tsx y de src/components/ui/select.tsx: ambas
// comparten fondo, ring y sombra, y solo difieren en el ancho mínimo.
export function MenuSurface({
  minWidth = "min-w-56",
  children,
}: {
  minWidth?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-none bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10",
        minWidth,
      )}
    >
      {children}
    </div>
  )
}

// DropdownMenuItem y SelectItem son primitivos de Radix que lanzan fuera de su
// Content, así que aquí se replica su marcado. Clases copiadas de
// src/components/ui/dropdown-menu.tsx y src/components/ui/select.tsx.
export function MenuItemReplica({
  children,
  variant = "default",
  disabled = false,
  className,
}: {
  children: ReactNode
  variant?: "default" | "destructive"
  disabled?: boolean
  className?: string
}) {
  return (
    <div
      data-variant={variant}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-none px-2 py-2 text-xs select-none",
        variant === "destructive" && "text-destructive [&_svg]:text-destructive",
        disabled && "pointer-events-none opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
    >
      {children}
    </div>
  )
}

// Clases de DropdownMenuLabel y SelectLabel, idénticas en ambos primitivos.
export function MenuLabelReplica({ children }: { children: ReactNode }) {
  return <div className="px-2 py-2 text-xs text-muted-foreground">{children}</div>
}

// Clases de SelectSeparator; DropdownMenuSeparator usa el mismo trazo.
export function MenuSeparatorReplica() {
  return <div className="pointer-events-none -mx-1 h-px bg-border" />
}

// Clases de DropdownMenuShortcut.
export function MenuShortcutReplica({ children }: { children: ReactNode }) {
  return (
    <span className="ml-auto text-xs tracking-widest text-muted-foreground">
      {children}
    </span>
  )
}
