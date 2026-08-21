import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    // Vite doesn't read PORT on its own; honor it when the harness assigns
    // a different port than the preferred one in .claude/launch.json.
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
})
