import {
  ChevronRight,
  ChevronsUpDown,
  Command,
  LogOut,
  Settings,
  UserCog,
} from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { navMain } from "@/data/nav"
import {
  KitComponent,
  KitGroup,
  KitRow,
  KitSection,
  KitSpecimen,
} from "@/pages/ui-kit/kit"
import {
  MenuItemReplica,
  MenuLabelReplica,
  MenuSeparatorReplica,
  MenuShortcutReplica,
  MenuSurface,
} from "@/pages/ui-kit/replicas"

export function NavigationSection() {
  return (
    <KitSection
      id="navigation"
      title="Navigation"
      description="Orientación y desplazamiento dentro de la aplicación."
    >
      <KitComponent
        id="breadcrumb"
        name="Breadcrumb"
        description="Ruta jerárquica hasta la página actual."
      >
        <KitGroup label="Special cases">
          <div className="flex flex-col gap-4">
            <KitSpecimen label="dos niveles">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#breadcrumb">
                      Configuración
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Usuarios</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </KitSpecimen>
            <KitSpecimen label="tres niveles">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#breadcrumb">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#breadcrumb">
                      Configuración
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>API Keys</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </KitSpecimen>
            <KitSpecimen label="con BreadcrumbEllipsis">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#breadcrumb">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbEllipsis />
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>API Keys</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </KitSpecimen>
          </div>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="sidebar"
        name="Sidebar"
        description="Navegación lateral principal. Aquí se recompone con datos mock: el sidebar de la aplicación incluye el menú de usuario, que necesita sesión activa."
      >
        <KitGroup label="Special cases">
          <div className="h-96 overflow-hidden border">
            <SidebarProvider className="min-h-full">
              <Sidebar collapsible="none" className="h-full">
                <SidebarHeader>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton size="lg">
                        <div className="flex aspect-square size-8 items-center justify-center bg-sidebar-primary text-sidebar-primary-foreground">
                          <Command />
                        </div>
                        <span className="truncate text-sm font-medium">
                          Starter shadcn/ui
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarMenu>
                      {navMain.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton isActive={item.url === "/dashboard"}>
                            <item.icon />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                          {item.url === "/dashboard" ? (
                            <SidebarMenuBadge>3</SidebarMenuBadge>
                          ) : null}
                          {item.items ? (
                            <SidebarMenuSub>
                              {item.items.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton>
                                    <span>{subItem.title}</span>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          ) : null}
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroup>
                  <SidebarGroup>
                    <SidebarMenu>
                      <SidebarMenuSkeleton showIcon />
                      <SidebarMenuSkeleton showIcon />
                    </SidebarMenu>
                  </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton size="lg">
                        <div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs">
                          AT
                        </div>
                        <span className="truncate text-sm font-medium">
                          Ana Torres
                        </span>
                        <ChevronsUpDown className="ml-auto" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarFooter>
              </Sidebar>
            </SidebarProvider>
          </div>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="site-header"
        name="Site header"
        description="Cabecera de la aplicación: disparador del sidebar y breadcrumb. Recompuesta con una ruta fija, porque la real deriva el breadcrumb de la URL actual."
      >
        <KitGroup label="Special cases">
          <SidebarProvider className="min-h-0">
            <div className="w-full border">
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 h-4 data-vertical:self-center"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage>Configuración</BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>API Keys</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </header>
            </div>
          </SidebarProvider>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="dropdown-menu"
        name="Dropdown menu"
        description="Menú contextual anclado a un control."
      >
        <KitGroup label="Variants">
          <KitRow>
            <KitSpecimen label="Trigger">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Acciones
                    <ChevronsUpDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-56">
                  <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserCog />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings />
                    Configuración
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <LogOut />
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </KitSpecimen>
            <KitSpecimen label="Open" className="w-56">
              <MenuSurface>
                <MenuLabelReplica>Mi cuenta</MenuLabelReplica>
                <MenuSeparatorReplica />
                <MenuItemReplica>
                  <UserCog />
                  Perfil
                </MenuItemReplica>
                <MenuItemReplica>
                  <Settings />
                  Configuración
                  <MenuShortcutReplica>⌘,</MenuShortcutReplica>
                </MenuItemReplica>
                <MenuItemReplica disabled>
                  <Command />
                  Paleta de comandos
                </MenuItemReplica>
                <MenuSeparatorReplica />
                <MenuItemReplica variant="destructive">
                  <LogOut />
                  Cerrar sesión
                </MenuItemReplica>
              </MenuSurface>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>

      <KitComponent
        id="collapsible"
        name="Collapsible"
        description="Bloque que se pliega. En el catálogo se muestran las dos posiciones a la vez, nunca una sola que haya que abrir."
      >
        <KitGroup label="States">
          <KitRow>
            <KitSpecimen label="open" className="w-64">
              <Collapsible defaultOpen className="border p-3">
                <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium">
                  Configuración
                  <ChevronRight className="size-4 rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground">
                  <span>Usuarios</span>
                  <span>API Keys</span>
                </CollapsibleContent>
              </Collapsible>
            </KitSpecimen>
            <KitSpecimen label="closed" className="w-64">
              <Collapsible className="border p-3">
                <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium">
                  Configuración
                  <ChevronRight className="size-4" />
                </CollapsibleTrigger>
                <CollapsibleContent
                  forceMount
                  className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground data-[state=closed]:hidden"
                >
                  <span>Usuarios</span>
                  <span>API Keys</span>
                </CollapsibleContent>
              </Collapsible>
            </KitSpecimen>
          </KitRow>
        </KitGroup>
      </KitComponent>
    </KitSection>
  )
}
