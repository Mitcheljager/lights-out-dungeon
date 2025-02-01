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
