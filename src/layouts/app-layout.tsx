import { Outlet } from "react-router"

export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col gap-4 p-4">
      <Outlet />
    </div>
  )
}
