import type { GameTime } from "../types"

export class GameLoop {
  private callback: (params: GameTime) => void
  private request: number = 0
  private lastTime: number = 0
  private totalElapsedTime: number = 0

  constructor(callback: (params: GameTime) => void) {
    this.callback = callback
  }

  start(): void {
    if (this.request) return

    const frame = (time: number): void => {
      const frametime = (time - this.lastTime) / 1000
      this.totalElapsedTime += frametime
      this.lastTime = time

      this.callback({ totalElapsedTime: this.totalElapsedTime, frametime })
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
