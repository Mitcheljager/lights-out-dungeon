<script lang="ts">
  import { onDestroy, onMount } from "svelte"
	import type { Position } from "../../../types"

  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D | null = null
  let request: number | null = null
  let x = $state(150)
  let y = $state(150)

  $effect(() => {
    if (canvas) ctx = canvas.getContext("2d")
  })

  $effect(() => {
    if (x || y) draw()
  })

  onMount(() => {
    animate()
  })

  onDestroy(() => {
    if (request) cancelAnimationFrame(request)
  })

  function animate(): void {
    x = 150 + Math.sin(Date.now() / 500) * 50
    y = 150 + Math.cos(Date.now() / 500) * 50

    request = requestAnimationFrame(animate)
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

  function draw(): void {
    if (!ctx) return

    drawGrid()

    const overlayCanvas = document.createElement("canvas")
    const overlayCtx = overlayCanvas.getContext("2d")
    overlayCanvas.width = canvas.width
    overlayCanvas.height = canvas.height

    if (!overlayCtx) return

    // Fill the overlay with black
    overlayCtx.fillStyle = "black"
    overlayCtx.fillRect(0, 0, canvas.width, canvas.height)

    const positions: Position[] = [{ x: 50, y: 50 }, { x: 200, y: 200 }]
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

    // Draw the overlay onto the main canvas
    ctx.drawImage(overlayCanvas, 0, 0)
  }
</script>

<canvas bind:this={canvas} width={window.innerWidth / 2} height={window.innerHeight / 2}></canvas>

<style>
  canvas {
    width: 100%;
    height: auto;
  }
</style>
