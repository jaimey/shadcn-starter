import { Fragment } from "react"
import { Link, useLocation } from "react-router"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { breadcrumbLabels } from "@/data/nav"

export function SiteHeader() {
  const { pathname } = useLocation()
  const segments = pathname.split("/").filter(Boolean)

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      {/* `self-center` anula el `self-stretch` del primitivo: con una altura
          definida (`h-4`) flexbox ignora el stretch y alinea al inicio, dejando
          la línea pegada al borde superior del header. */}
      <Separator
        orientation="vertical"
        className="mr-2 h-4 data-vertical:self-center"
      />
      <Breadcrumb>
        <BreadcrumbList>
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1
            const label = breadcrumbLabels[segment] ?? segment
            const href = `/${segments.slice(0, index + 1).join("/")}`
            const isNavigable = !isLast && segment !== "settings"

            return (
              <Fragment key={href}>
                <BreadcrumbItem>
                  {isLast || !isNavigable ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={href}>{label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {isLast ? null : <BreadcrumbSeparator />}
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}
