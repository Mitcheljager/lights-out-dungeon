import { defaultLanguage, setLanguage } from "$lib/language"
import { cleanup } from "@testing-library/svelte"
import { afterEach, beforeAll, vi } from "vitest"

beforeAll(() => {
  Element.prototype.animate ??= vi.fn().mockReturnValue({
    finished: Promise.resolve(),
    cancel: vi.fn(),
    startTime: null,
    currentTime: null
  })

  let store: Record<string, string> = {}

  ;(window as any).localStorage = {
    getItem: (key: string): string => store[key] ?? null,
    setItem: (key: string, value: string): void => {
      store[key] = value.toString()
    },
    removeItem: (key: string): void => {
      delete store[key]
    },
    clear: (): void => {
      store = {}
    }
  }
})

afterEach(() => {
  cleanup()
  setLanguage(defaultLanguage)
})
