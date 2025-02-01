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

export interface GameCamera {
  position: Vector2
}

export interface GameParams {
  time: GameTime,
  camera: GameCamera
}
