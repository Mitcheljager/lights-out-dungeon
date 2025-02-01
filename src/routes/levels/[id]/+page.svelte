<script lang="ts">
  import { onDestroy, onMount } from "svelte"
	import type { Position } from "../../../types"

  let canvas: HTMLCanvasElement | null = null
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

  function draw(): void {
    if (!canvas) return
    if (!ctx) return

    // Draw overlay
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const positions: Position[] = [{ x: 50, y: 50 }, { x: 200, y: 200 }]
    for (const position of positions) {
      const computedX = position.x + x
      const computedY = position.y + y

      // Draw gradient hole based on x and y
      const radius = 100
      const gradient = ctx.createRadialGradient(computedX, computedY, 20, computedX, computedY, radius)
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.fillStyle = gradient
      ctx.globalCompositeOperation = "destination-out"
      ctx.beginPath()
      ctx.arc(computedX, computedY, radius, 0, Math.PI * 2)
      ctx.fill()

      ctx.globalCompositeOperation = "source-over"
    }
  }
</script>

<canvas bind:this={canvas} width={window.innerWidth} height={window.innerHeight}></canvas>

<style>
  canvas {
    width: 100%;
    height: auto;
  }
</style>
