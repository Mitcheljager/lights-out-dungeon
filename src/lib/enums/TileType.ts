export const TileType = Object.freeze({
  Void: "void",
  Floor: "floor",
  Wall: "wall"
} as const)

export type TileType = (typeof TileType)[keyof typeof TileType]
