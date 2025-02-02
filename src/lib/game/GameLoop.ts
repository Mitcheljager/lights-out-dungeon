import type { GameLoopParams, GameTime } from "../../types"

export class GameLoop {
  private request: number = 0
  private lastTime: number = 0
  private totalElapsedTime: number = 0

  constructor(
    private canvas: HTMLCanvasElement,
    private callback: (params: GameLoopParams) => void
  ) {

  }

  start(): void {
    if (this.request) return

    const frame = (currentTime: number): void => {
      const frametime = (currentTime - this.lastTime) / 1000
      this.totalElapsedTime += frametime
      this.lastTime = currentTime

      const time: GameTime = { totalElapsedTime: this.totalElapsedTime, frametime }

      this.callback({ time })
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
