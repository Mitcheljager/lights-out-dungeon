import type { GameCamera, GameParams, GameTime } from "../types"

export class GameLoop {
  private callback: (params: GameParams) => void
  private request: number = 0
  private lastTime: number = 0
  private totalElapsedTime: number = 0

  constructor(callback: (params: GameParams) => void) {
    this.callback = callback
  }

  start(): void {
    if (this.request) return

    const frame = (currentTime: number): void => {
      const frametime = (currentTime - this.lastTime) / 1000
      this.totalElapsedTime += frametime
      this.lastTime = currentTime

      const time: GameTime = { totalElapsedTime: this.totalElapsedTime, frametime }
      const camera: GameCamera = { position: { x: 0, y: 0 } }

      this.callback({ time, camera })
      this.request = requestAnimationFrame(frame)
    }

    this.lastTime = performance.now()
    this.request = requestAnimationFrame(frame)
  }

  destroy(): void {
    if (!this.request) return

    cancelAnimationFrame(this.request)
    this.request = 0
  }
}
