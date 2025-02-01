<script lang="ts">
  import { onMount } from "svelte"
	import type { GameTime, Vector2 } from "../../../types"
	import { GameLoop } from "$lib/game"

  let canvas: HTMLCanvasElement
  let overlayCanvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D | null = null
  let overlayCtx: CanvasRenderingContext2D | null = null
  let x = $state(150)
  let y = $state(150)

  $effect(() => {
    if (canvas) ctx = canvas.getContext("2d")
  })

  onMount(() => {
    createOverlayCanvas()

    const loop = new GameLoop(({ time }) => {
      animate(time)
      draw()
    })

    loop.start()

    return (): void => loop.destroy()
  })

  function createOverlayCanvas(): void {
    overlayCanvas = document.createElement("canvas")
    overlayCtx = overlayCanvas.getContext("2d")
    overlayCanvas.width = canvas.width
    overlayCanvas.height = canvas.height
  }

  function animate(time: GameTime): void {
    const speed = 2 * Math.PI / 2
    const angle = time.totalElapsedTime * speed
    const radius = 50

    x += time.frametime * 10
    y = 150 + Math.cos(angle) * radius
  }

  function drawGrid(): void {
    if (!ctx) return

    const tileSize = 50
    const rows = 20
    const columns = 20

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        ctx.fillStyle = (x + y) % 2 === 0 ? "#ddd" : "#bbb" // Checkerboard pattern
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)

        ctx.strokeStyle = "#888"
        ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize)
      }
    }
  }

  function drawOverlay(): void {
    if (!overlayCtx) return

    overlayCtx.globalCompositeOperation = "source-over"
    ctx!.drawImage(overlayCanvas, 0, 0)

    // Fill the overlay with black
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
    overlayCtx.fillStyle = "rgba(0, 0, 0, 0.9)"
    overlayCtx.fillRect(0, 0, canvas.width, canvas.height)

    const positions: Vector2[] = [{ x: 50, y: 50 }, { x: 200, y: 200 }]
    for (const position of positions) {
      const computedX = position.x + x
      const computedY = position.y + y

      // Draw gradient hole on the overlay
      const radius = 100
      const gradient = overlayCtx.createRadialGradient(computedX, computedY, 20, computedX, computedY, radius)
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

      overlayCtx.fillStyle = gradient
      overlayCtx.globalCompositeOperation = "destination-out"
      overlayCtx.beginPath()
      overlayCtx.arc(computedX, computedY, radius, 0, Math.PI * 2)
      overlayCtx.fill()
    }
  }

  function draw(): void {
    if (!canvas) return
    if (!ctx) return

    drawGrid()
    drawOverlay()
  }
</script>

<canvas bind:this={canvas} width={window.innerWidth / 2} height={window.innerHeight / 2}></canvas>

<style>
  canvas {
    width: 100%;
    height: auto;
  }
</style>
