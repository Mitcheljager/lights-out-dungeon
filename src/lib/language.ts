import { translations } from "$lib/translations"

export const defaultLanguage = "en"
export const supportedLanguages = [
  "en", "nl", "de", "fr", "ja", "ru", "ko", "es", "pt", "it", "pl",
  "sv", "no", "tr", "is", "hi", "id", "ur", "ar", "sw", "fi", "el",
  "uk", "cs", "ro", "da", "he", "zh"
]

export let language = defaultLanguage

export function setLanguage(code: string): void {
  if (supportedLanguages.includes(code)) language = code
  else language = defaultLanguage
}

export function t(key: string): string {
  const value = translations[key]?.[language] || translations[key]?.[defaultLanguage]

  if (!value) console.error("Missing translation for key: " + key)

  return value || key
}
