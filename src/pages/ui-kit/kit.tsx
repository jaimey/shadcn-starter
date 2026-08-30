import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function KitSection({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="border-b pb-3">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="mt-8 flex flex-col gap-10">{children}</div>
    </section>
  )
}

export function KitComponent({
  id,
  name,
  description,
  children,
}: {
  id: string
  name: string
  description: string
  children: ReactNode
}) {
  return (
    <article id={id} className="scroll-mt-28">
      <h3 className="text-base font-medium">{name}</h3>
      <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      <div className="mt-4 flex flex-col gap-6 border p-4">{children}</div>
    </article>
  )
}

export function KitGroup({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-medium text-muted-foreground">{label}</h4>
      {children}
    </div>
  )
}

export function KitRow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-wrap items-start gap-x-6 gap-y-4", className)}>
      {children}
    </div>
  )
}

export function KitSpecimen({
  label,
  children,
  className,
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-2", className)}>
      <span className="font-mono text-xs text-muted-foreground">{label}</span>
      {children}
    </div>
  )
}
