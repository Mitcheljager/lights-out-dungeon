import type { Vector2 } from "../types"

export function magnitudeOf({ x, y }: Vector2): number {
  return Math.sqrt(x * x + y * y)
}
