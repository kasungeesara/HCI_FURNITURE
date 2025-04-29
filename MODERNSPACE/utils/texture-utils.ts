import * as THREE from "three"

// Function to create a procedural texture
export const createProceduralTexture = (
  type: string,
  options: {
    color?: string
    scale?: number
    roughness?: number
    metalness?: number
  } = {},
): THREE.Texture | null => {
  const { color = "#8B4513", scale = 1, roughness = 0.5, metalness = 0.1 } = options

  const size = 512
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  // Fill with base color
  ctx.fillStyle = color
  ctx.fillRect(0, 0, size, size)

  switch (type) {
    case "wood":
      createWoodTexture(ctx, size, color)
      break
    case "tile":
      createTileTexture(ctx, size, color)
      break
    case "carpet":
      createCarpetTexture(ctx, size, color)
      break
    case "marble":
      createMarbleTexture(ctx, size, color)
      break
    case "concrete":
      createConcreteTexture(ctx, size, color)
      break
    default:
      // Just use the base color
      break
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(scale, scale)

  return texture
}

// Create a wood grain texture
const createWoodTexture = (ctx: CanvasRenderingContext2D, size: number, baseColor: string) => {
  const baseColorObj = new THREE.Color(baseColor)
  const darkColor = baseColorObj.clone().multiplyScalar(0.7).getStyle()
  const lightColor = baseColorObj.clone().lerp(new THREE.Color("#ffffff"), 0.2).getStyle()

  // Create wood grain
  for (let i = 0; i < size; i += 4) {
    const noise = Math.sin(i * 0.05) * 10 + Math.random() * 5
    const lineWidth = 2 + Math.random() * 3

    ctx.beginPath()
    ctx.strokeStyle = i % 8 === 0 ? darkColor : lightColor
    ctx.lineWidth = lineWidth
    ctx.moveTo(0, i + noise)
    ctx.lineTo(size, i + noise)
    ctx.stroke()
  }

  // Add some knots
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const radius = 5 + Math.random() * 15

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
    gradient.addColorStop(0, darkColor)
    gradient.addColorStop(0.7, baseColor)
    gradient.addColorStop(1, baseColor)

    ctx.beginPath()
    ctx.fillStyle = gradient
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

// Create a tile texture
const createTileTexture = (ctx: CanvasRenderingContext2D, size: number, baseColor: string) => {
  const baseColorObj = new THREE.Color(baseColor)
  const darkColor = baseColorObj.clone().multiplyScalar(0.8).getStyle()
  const tileSize = size / 8

  // Draw tiles
  for (let x = 0; x < size; x += tileSize) {
    for (let y = 0; y < size; y += tileSize) {
      ctx.fillStyle = baseColor
      ctx.fillRect(x, y, tileSize, tileSize)

      // Add some variation to each tile
      ctx.fillStyle = darkColor
      ctx.globalAlpha = 0.1 + Math.random() * 0.1
      ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4)
      ctx.globalAlpha = 1.0

      // Draw grout lines
      ctx.fillStyle = darkColor
      ctx.fillRect(x, y, tileSize, 2)
      ctx.fillRect(x, y, 2, tileSize)
    }
  }
}

// Create a carpet texture
const createCarpetTexture = (ctx: CanvasRenderingContext2D, size: number, baseColor: string) => {
  const baseColorObj = new THREE.Color(baseColor)
  const darkColor = baseColorObj.clone().multiplyScalar(0.8).getStyle()
  const lightColor = baseColorObj.clone().lerp(new THREE.Color("#ffffff"), 0.1).getStyle()

  // Fill with base color
  ctx.fillStyle = baseColor
  ctx.fillRect(0, 0, size, size)

  // Add carpet fibers
  for (let i = 0; i < 10000; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const length = 1 + Math.random() * 3
    const angle = Math.random() * Math.PI * 2

    ctx.beginPath()
    ctx.strokeStyle = Math.random() > 0.5 ? darkColor : lightColor
    ctx.lineWidth = 1
    ctx.moveTo(x, y)
    ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length)
    ctx.stroke()
  }
}

// Create a marble texture
const createMarbleTexture = (ctx: CanvasRenderingContext2D, size: number, baseColor: string) => {
  const baseColorObj = new THREE.Color(baseColor)
  const darkColor = baseColorObj.clone().multiplyScalar(0.8).getStyle()
  const lightColor = baseColorObj.clone().lerp(new THREE.Color("#ffffff"), 0.3).getStyle()

  // Fill with base color
  ctx.fillStyle = baseColor
  ctx.fillRect(0, 0, size, size)

  // Create marble veins
  for (let i = 0; i < 10; i++) {
    const startX = Math.random() * size
    const startY = Math.random() * size

    ctx.beginPath()
    ctx.strokeStyle = i % 2 === 0 ? darkColor : lightColor
    ctx.lineWidth = 1 + Math.random() * 3
    ctx.moveTo(startX, startY)

    let x = startX
    let y = startY

    for (let j = 0; j < 10; j++) {
      x += (Math.random() - 0.5) * 100
      y += (Math.random() - 0.5) * 100
      ctx.lineTo(x, y)
    }

    ctx.stroke()
  }

  // Add some noise
  for (let x = 0; x < size; x += 4) {
    for (let y = 0; y < size; y += 4) {
      if (Math.random() > 0.95) {
        ctx.fillStyle = lightColor
        ctx.globalAlpha = 0.1 + Math.random() * 0.1
        ctx.fillRect(x, y, 4, 4)
        ctx.globalAlpha = 1.0
      }
    }
  }
}

// Create a concrete texture
const createConcreteTexture = (ctx: CanvasRenderingContext2D, size: number, baseColor: string) => {
  const baseColorObj = new THREE.Color(baseColor)
  const darkColor = baseColorObj.clone().multiplyScalar(0.9).getStyle()
  const lightColor = baseColorObj.clone().lerp(new THREE.Color("#ffffff"), 0.1).getStyle()

  // Fill with base color
  ctx.fillStyle = baseColor
  ctx.fillRect(0, 0, size, size)

  // Add noise
  for (let x = 0; x < size; x += 2) {
    for (let y = 0; y < size; y += 2) {
      const noise = Math.random()
      if (noise > 0.5) {
        ctx.fillStyle = noise > 0.8 ? lightColor : darkColor
        ctx.globalAlpha = 0.05 + Math.random() * 0.05
        ctx.fillRect(x, y, 2, 2)
        ctx.globalAlpha = 1.0
      }
    }
  }

  // Add some cracks
  for (let i = 0; i < 5; i++) {
    const startX = Math.random() * size
    const startY = Math.random() * size

    ctx.beginPath()
    ctx.strokeStyle = darkColor
    ctx.lineWidth = 0.5
    ctx.moveTo(startX, startY)

    let x = startX
    let y = startY

    for (let j = 0; j < 5; j++) {
      x += (Math.random() - 0.5) * 50
      y += (Math.random() - 0.5) * 50
      ctx.lineTo(x, y)
    }

    ctx.stroke()
  }
}

// Create a normal map from a texture
export const createNormalMap = (texture: THREE.Texture): THREE.Texture => {
  // In a real application, you would generate a proper normal map
  // For this example, we'll just return the texture
  return texture
}

// Create a roughness map from a texture
export const createRoughnessMap = (texture: THREE.Texture): THREE.Texture => {
  // In a real application, you would generate a proper roughness map
  // For this example, we'll just return the texture
  return texture
}
