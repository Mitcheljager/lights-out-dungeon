import { beforeEach, describe, expect, it } from "vitest"

import { defaultLanguage, language, setLanguage, t } from "./language"

describe("language.ts", () => {
  beforeEach(() => {
    setLanguage(defaultLanguage)
  })

  describe("setLanguage", () => {
    it("Should set the language to the given code", () => {
      setLanguage("nl")
      expect(language).toBe("nl")
    })

    it("Should not set the language if code is not in supported language", () => {
      setLanguage("xx")
      expect(language).toBe(defaultLanguage)
    })
  })

  describe("t", () => {
    it("Should return translation for current language", () => {
      expect(t("Some Key")).toBe("Some value")

      setLanguage("nl")
      expect(t("Some Key")).toBe("Some dutch value")
    })

    it("Should return translation in default language if no valid translation was found for current language", () => {
      setLanguage("nl")
      expect(t("Some Other Key")).toBe("Some other value")
    })

    it("Should return key if no corresponding translation was found", () => {
      expect(t("Some Unknown Key")).toBe("Some Unknown Key")
    })
  })
})
