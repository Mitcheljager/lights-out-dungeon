<script lang="ts">
  import { onMount } from "svelte"
	import type { Entity, GameTime, Tile, Tiles, Vector2 } from "../../../types"
	import { GameLoop } from "$lib/game/GameLoop"
	import { DraggableCamera } from "$lib/game/DraggableCamera"
	import { TileType } from "$lib/enums/TileType"
	import { TileFill } from "$lib/enums/TileFill"

  const gridCellSize = 50
  const gridRows = 20
  const gridColumns = 20
  const tiles: Tiles = {
    "1x2": { type: TileType.Floor, variant: 0 },
    "4x6": { type: TileType.Floor, variant: 0 },
    "2x3": { type: TileType.Wall, variant: 0 },
    "2x4": { type: TileType.Void, variant: 0 }
  }
  const entities: Entity[] = [{ position: { x: 0, y: 0 } }]

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

    const camera = new DraggableCamera(canvas, ctx!)

    const loop = new GameLoop(canvas, ({ time }) => {
      animate(time)
      draw(camera)
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

    for (let y = 0; y < gridRows; y++) {
      for (let x = 0; x < gridColumns; x++) {
        const matchingTile: Tile = tiles[`${x}x${y}`]
        const checkerboardTile: string = ((x + y) % 2 === 0 ? "#ddd" : "#bbb")

        ctx.fillStyle = TileFill[matchingTile?.type] || checkerboardTile
        ctx.fillRect(x * gridCellSize, y * gridCellSize, gridCellSize, gridCellSize)

        ctx.strokeStyle = "#888"
        ctx.strokeRect(x * gridCellSize, y * gridCellSize, gridCellSize, gridCellSize)
      }
    }
  }

  function drawEntities(): void {
    if (!ctx) return

    for (const { position } of entities) {
      ctx.fillStyle = "blue"
      ctx.fillRect(position.x, position.y, gridCellSize, gridCellSize)
    }
  }

  function drawOverlay(camera: DraggableCamera): void {
    if (!overlayCtx) return

    overlayCtx.globalCompositeOperation = "source-over"
    ctx!.drawImage(overlayCanvas, 0, 0)

    // Draw black square over the entire canvas
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
    overlayCtx.fillStyle = "rgba(0, 0, 0, 0.5)"
    overlayCtx.fillRect(0, 0, canvas.width, canvas.height)

    const positions: Vector2[] = [{ x: 50, y: 50 }, { x: 200, y: 200 }]
    for (const position of positions) {
      const computed: Vector2 = {
        x: position.x + x + camera.position.x,
        y: position.y + y + camera.position.y
      }

      // Cut a hole using a gradient
      const radius = 100
      const gradient = overlayCtx.createRadialGradient(computed.x, computed.y, 20, computed.x, computed.y, radius)
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

      overlayCtx.fillStyle = gradient
      overlayCtx.globalCompositeOperation = "destination-out"
      overlayCtx.beginPath()
      overlayCtx.arc(computed.x, computed.y, radius, 0, Math.PI * 2)
      overlayCtx.fill()
    }
  }

  function draw(camera: DraggableCamera): void {
    camera.translateWith(() => {
      drawGrid()
      drawEntities()
    })

    drawOverlay(camera)
  }
</script>

<canvas bind:this={canvas} width={window.innerWidth / 2} height={window.innerHeight / 2}></canvas>

<style>
  canvas {
    width: 100%;
    height: auto;
  }
</style>
