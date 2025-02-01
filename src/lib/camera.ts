import type { Vector2 } from "../types"

export class DraggableCamera {
  public position: Vector2 = { x: 0, y: 0 }

  private lastMousePosition: Vector2 = { x: 0, y: 0 }
  private lastMoveTime: number = 0
  private velocity: Vector2 = { x: 0, y: 0 }
  private isDragging: boolean = false
  private request: number = 0

  constructor(
    private canvas: HTMLCanvasElement,
    private friction: number = 0.97
  ) {
    this.bindCameraControls()
  }

  private bindCameraControls(): void {
    this.canvas.addEventListener("mousedown", this.down)
    this.canvas.addEventListener("mousemove", this.move)
    this.canvas.addEventListener("mouseup", this.up)
    this.canvas.addEventListener("mouseleave", this.up)
  }

  private down = (event: MouseEvent): void => {
    this.isDragging = true
    this.lastMousePosition.x = event.clientX
    this.lastMousePosition.y = event.clientY

    this.stopMomentum()
  }

  private move = (event: MouseEvent): void => {
    if (!this.isDragging) return

    const deltaX = event.clientX - this.lastMousePosition.x
    const deltaY = event.clientY - this.lastMousePosition.y

    this.position.x += deltaX
    this.position.y += deltaY

    this.velocity.x = deltaX
    this.velocity.y = deltaY

    this.lastMousePosition.x = event.clientX
    this.lastMousePosition.y = event.clientY

    if (deltaX || deltaY) this.lastMoveTime = performance.now()
  }

  private up = (): void => {
    if (!this.isDragging) return

    this.isDragging = false

    if (performance.now() - this.lastMoveTime > 100) this.stopMomentum()
    else this.applyMomentum()
  }

  private applyMomentum(): void {
    const frame = (): void => {
      this.velocity.x *= this.friction
      this.velocity.y *= this.friction

      this.position.x += this.velocity.x
      this.position.y += this.velocity.y

      if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
        this.request = requestAnimationFrame(frame)
      }
    }

    this.request = requestAnimationFrame(frame)
  }

  private stopMomentum(): void {
    cancelAnimationFrame(this.request)

    this.velocity.x = 0
    this.velocity.y = 0
  }
}
