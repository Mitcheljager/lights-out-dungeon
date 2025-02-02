import { TileType } from "./TileType"

export const TileFill = Object.freeze({
  [TileType.Floor]: "green",
  [TileType.Wall]: "red",
  [TileType.Void]: "black"
})
