// @ts-expect-error No types available
import { prng_alea as seedrandom } from "esm-seedrandom"

export const browser = typeof window !== "undefined"

export function getLevelColor(id: string, multiplier: number = 1): string {
  const random = seedrandom(id).quick()
  return `hsl(${random * 360}, ${35 * multiplier}%, ${25 * multiplier}%)`
}
