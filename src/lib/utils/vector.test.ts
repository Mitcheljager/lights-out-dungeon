import { describe, expect, it } from "vitest"

import { magnitudeOf } from "./vector"

describe("vector.ts", () => {
  describe("magnitudeOf", () => {
    it("Should return the magnitude of a positive vector", () => {
      expect(magnitudeOf({ x: 3, y: 4 })).toBe(5)
    })

    it("Should return the magnitude of a negative vector", () => {
      expect(magnitudeOf({ x: -3, y: -4 })).toBe(5)
    })

    it("Should return the magnitude of a zero vector", () => {
      expect(magnitudeOf({ x: 0, y: 0 })).toBe(0)
    })

    it("Should return the magnitude of a vector with one zero component", () => {
      expect(magnitudeOf({ x: 0, y: 5 })).toBe(5)
      expect(magnitudeOf({ x: -7, y: 0 })).toBe(7)
    })

    it("Should return the magnitude of a vector with floating point values", () => {
      expect(magnitudeOf({ x: 1.5, y: 2.5 })).toBeCloseTo(2.9, 1)
    })
  })
})
