import type { TileType } from "$lib/enums/TileType"

export interface Level {
  id: string,
}

export interface Vector2 {
  x: number,
  y: number
}

export interface GameTime {
  frametime: number,
  totalElapsedTime: number
}

export interface GameLoopParams {
  time: GameTime,
}

export interface GameCameraParams {
  position: Vector2
}

export interface Entity {
  position: Vector2
}

export interface Tile {
  type: TileType,
  variant: number,
}

export interface Tiles {
  [key: string]: Tile
}
