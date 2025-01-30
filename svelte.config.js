import adapter from "@sveltejs/adapter-static"
import { sveltePreprocess  } from "svelte-preprocess"
import { levels } from "./src/lib/levels.js"

const dev = process.argv.includes("dev")

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: sveltePreprocess(),

  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: undefined,
      precompress: false,
      strict: true,
      paths: {
        base: dev ? "" : process.env.BASE_PATH
      }
    }),
    prerender: {
      entries: [
        "/",
        "/levels",
        "/settings",
        ...levels.map(l => `/levels/${l.id}`)
      ]
    }
  }
}

export default config
