import path from "path"
import { defineConfig } from "vitest/config"
import { sveltekit } from "@sveltejs/kit/vite"

export default defineConfig({
  plugins: [sveltekit()],

  test: {
    environment: "happy-dom",
    include: ["src/**/*.{test,spec}.{js,ts}"],
    setupFiles: ["src/tests/setup.ts"]
  },

  resolve: {
    conditions: process.env.VITEST ? ["browser"] : [],
    alias: {
      "$lib": path.resolve(__dirname, "./src/lib")
    }
  }
})
