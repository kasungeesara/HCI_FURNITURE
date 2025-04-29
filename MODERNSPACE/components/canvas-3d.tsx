"use client"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { useState, useRef, useEffect, forwardRef, useImperativeHandle, useMemo } from "react"
import type { FurnitureItem, CanvasType } from "@/types/types"
import * as THREE from "three"
import type { Mesh, Texture, WebGLRenderer, Scene, Camera } from "three"
import type { FloorSettings } from "@/components/floor-customizer"
import { useTheme } from "next-themes"

interface Canvas3DProps {
  canvasType: CanvasType
  canvasColor: string
  backgroundImage: string | null
  furniture: FurnitureItem[]
  selectedFurniture: string | null
  onSelectFurniture: (id: string | null) => void
  onUpdatePosition: (id: string, x: number, y: number) => void
  floorSettings?: FloorSettings
}

export interface Canvas3DRef {
  takeScreenshot: (options?: { format?: "png" | "jpeg"; quality?: number }) => string | null
}

// Create a procedural texture for the floor
function createFloorTexture(settings: FloorSettings, theme: string | undefined): THREE.Texture | null {
  const size = 512
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  // Fill with base color
  ctx.fillStyle = settings.color
  ctx.fillRect(0, 0, size, size)

  // Add texture based on type
  if (settings.textureType !== "none") {
    // In a real app, you would use actual textures
    // For this example, we'll create procedural textures
    const baseColor = new THREE.Color(settings.color)
    const darkColor = baseColor.clone().multiplyScalar(0.8).getStyle()
    const lightColor = baseColor.clone().multiplyScalar(1.2).getStyle()

    switch (settings.textureType) {
      case "wood":
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
        break
      case "tile":
        // Create tile pattern
        const tileSize = size / 8
        for (let x = 0; x < size; x += tileSize) {
          for (let y = 0; y < size; y += tileSize) {
            ctx.fillStyle = Math.random() > 0.5 ? darkColor : lightColor
            ctx.globalAlpha = 0.1 + Math.random() * 0.1
            ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4)
          }
        }
        ctx.globalAlpha = 1.0
        break
      case "carpet":
        // Create carpet texture
        for (let i = 0; i < 5000; i++) {
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
        break
      case "marble":
        // Create marble texture
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
        break
      case "concrete":
        // Create concrete texture
        for (let x = 0; x < size; x += 2) {
          for (let y = 0; y < size; y += 2) {
            const noise = Math.random()
            if (noise > 0.5) {
              ctx.fillStyle = noise > 0.8 ? lightColor : darkColor
              ctx.globalAlpha = 0.05 + Math.random() * 0.05
              ctx.fillRect(x, y, 2, 2)
            }
          }
        }
        ctx.globalAlpha = 1.0
        break
    }
  }

  // Add pattern if selected
  if (settings.pattern !== "none") {
    const baseColor = new THREE.Color(settings.color)
    const patternColor =
      theme === "dark"
        ? baseColor.clone().multiplyScalar(0.7).getStyle()
        : baseColor.clone().multiplyScalar(1.3).getStyle()

    ctx.fillStyle = patternColor

    switch (settings.pattern) {
      case "checkerboard":
        const squareSize = size / 8
        for (let x = 0; x < 8; x++) {
          for (let y = 0; y < 8; y++) {
            if ((x + y) % 2 === 0) {
              ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize)
            }
          }
        }
        break
      case "herringbone":
        const hbSize = size / 16
        for (let y = -size; y < size * 2; y += hbSize * 2) {
          for (let x = -size; x < size * 2; x += hbSize * 8) {
            ctx.fillRect(x, y, hbSize * 4, hbSize)
            ctx.fillRect(x + hbSize * 4, y + hbSize, hbSize * 4, hbSize)
          }
        }
        break
      case "diagonal":
        ctx.save()
        ctx.translate(size / 2, size / 2)
        ctx.rotate(Math.PI / 4)
        ctx.translate(-size / 2, -size / 2)
        const stripeWidth = size / 16
        for (let i = -size; i < size * 2; i += stripeWidth * 2) {
          ctx.fillRect(i, -size, stripeWidth, size * 3)
        }
        ctx.restore()
        break
      case "grid":
        const gridSize = size / 8
        const lineWidth = gridSize / 8
        for (let x = 0; x < size; x += gridSize) {
          ctx.fillRect(x - lineWidth / 2, 0, lineWidth, size)
        }
        for (let y = 0; y < size; y += gridSize) {
          ctx.fillRect(0, y - lineWidth / 2, size, lineWidth)
        }
        break
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(settings.scale, settings.scale)
  texture.rotation = (settings.rotation * Math.PI) / 180

  return texture
}

// Scene component that manages the 3D scene
function Scene3D({
  canvasType,
  canvasColor,
  backgroundImage,
  furniture,
  selectedFurniture,
  onSelectFurniture,
  onUpdatePosition,
  floorSettings,
}: Canvas3DProps & { onUpdatePosition: (id: string, x: number, y: number) => void }) {
  const { gl, camera, scene } = useThree()
  const rendererRef = useRef<WebGLRenderer>(gl)
  const sceneRef = useRef<Scene>(scene)
  const cameraRef = useRef<Camera>(camera)
  const { theme } = useTheme()

  // Expose renderer, scene, and camera to parent component
  useEffect(() => {
    rendererRef.current = gl
    sceneRef.current = scene
    cameraRef.current = camera
  }, [gl, scene, camera])

  // Handle background click to deselect
  const handleBackgroundClick = (e: any) => {
    e.stopPropagation()
    onSelectFurniture(null)
  }

  // Handle furniture movement
  const handleFurnitureMove = (id: string, x: number, z: number) => {
    onUpdatePosition(id, x, z)
  }

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5, 10]} />
      <OrbitControls enableDamping dampingFactor={0.1} />

      <ambientLight intensity={theme === "dark" ? 0.4 : 0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={theme === "dark" ? 0.8 : 1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <Room
        canvasType={canvasType}
        canvasColor={canvasColor}
        backgroundImage={backgroundImage}
        floorSettings={floorSettings}
        theme={theme}
      />

      {/* Render furniture items */}
      {furniture.map((item) => (
        <Furniture
          key={item.id}
          item={item}
          isSelected={item.id === selectedFurniture}
          onClick={() => onSelectFurniture(item.id)}
          onMove={(x, z) => handleFurnitureMove(item.id, x, z)}
        />
      ))}

      {/* Invisible plane for background clicks */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} onClick={handleBackgroundClick}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </>
  )
}

// Room component that renders the floor and walls
function Room({
  canvasType,
  canvasColor,
  backgroundImage,
  floorSettings,
  theme,
}: {
  canvasType: CanvasType
  canvasColor: string
  backgroundImage: string | null
  floorSettings?: FloorSettings
  theme?: string
}) {
  const roomWidth = canvasType === "square" ? 10 : 13.33
  const roomDepth = 10
  const roomHeight = 5
  const [backgroundTexture, setBackgroundTexture] = useState<Texture | null>(null)

  // Default floor settings if not provided
  const defaultFloorSettings = {
    textureType: "wood",
    color: theme === "dark" ? "#3E2723" : "#8B4513",
    pattern: "none",
    rotation: 0,
    scale: 1,
    roughness: 0.5,
    metalness: 0.1,
  }

  const settings = floorSettings || defaultFloorSettings

  // Load background texture
  useEffect(() => {
    if (backgroundImage) {
      const loader = new THREE.TextureLoader()
      loader.load(backgroundImage, (loadedTexture) => {
        setBackgroundTexture(loadedTexture)
      })
    } else {
      setBackgroundTexture(null)
    }
  }, [backgroundImage])

  // Create floor texture
  const floorTexture = useMemo(() => {
    return createFloorTexture(settings, theme)
  }, [settings, theme])

  // Adjust wall color based on theme and canvasColor
  const wallColor =
    theme === "dark"
      ? canvasColor === "#f5f5f5"
        ? "#1e1e1e"
        : canvasColor // If light wall in dark mode, use dark gray
      : canvasColor // Otherwise use the specified color

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow userData={{ isFloor: true }}>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial
          color={settings.textureType === "none" && settings.pattern === "none" ? settings.color : "#ffffff"}
          map={floorTexture}
          roughness={settings.roughness}
          metalness={settings.metalness}
        />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, roomHeight / 2, -roomDepth / 2]} receiveShadow>
        <planeGeometry args={[roomWidth, roomHeight]} />
        <meshStandardMaterial color={wallColor} map={backgroundTexture || undefined} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-roomWidth / 2, roomHeight / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[roomWidth / 2, roomHeight / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
    </group>
  )
}

// Furniture component that renders a 3D furniture item
function Furniture({
  item,
  isSelected,
  onClick,
  onMove,
}: {
  item: FurnitureItem
  isSelected: boolean
  onClick: () => void
  onMove: (x: number, z: number) => void
}) {
  // Convert 2D position to 3D position
  const x = item.position.x / 100 - 3
  const z = item.position.y / 100 - 3

  const [isDragging, setIsDragging] = useState(false)
  const meshRef = useRef<Mesh>(null)
  const { camera, raycaster, mouse, scene } = useThree()
  const { theme } = useTheme()

  // Handle drag start
  const handlePointerDown = (e: any) => {
    if (isSelected) {
      e.stopPropagation()
      setIsDragging(true)
    }
  }

  // Handle drag end
  const handlePointerUp = () => {
    setIsDragging(false)
  }

  // Handle dragging
  useFrame(() => {
    if (isDragging && meshRef.current) {
      // Cast ray from mouse position
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(scene.children, true)

      // Find floor intersection
      const floorIntersect = intersects.find((intersect) => intersect.object.userData.isFloor)

      if (floorIntersect) {
        const newX = floorIntersect.point.x
        const newZ = floorIntersect.point.z

        // Convert 3D coordinates back to 2D
        const new2DX = (newX + 3) * 100
        const new2DY = (newZ + 3) * 100

        // Update position
        onMove(new2DX, new2DY)
      }
    }
  })

  // Get height based on furniture type
  const getHeight = () => {
    switch (item.type) {
      case "sofa":
        return 0.4
      case "chair":
        return 0.4
      case "table":
        return 0.25
      case "bed":
        return 0.25
      default:
        return 0.5
    }
  }

  // Create furniture mesh based on type
  const renderFurniture = () => {
    // Adjust furniture color based on theme if needed
    const furnitureColor = item.color

    switch (item.type) {
      case "sofa":
        return (
          <group>
            {/* Base */}
            <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
              <boxGeometry args={[2, 0.4, 1]} />
              <meshStandardMaterial color={furnitureColor} />
            </mesh>
            {/* Back */}
            <mesh castShadow receiveShadow position={[0, 0.6, -0.4]}>
              <boxGeometry args={[2, 0.8, 0.2]} />
              <meshStandardMaterial color={furnitureColor} />
            </mesh>
            {/* Arms */}
            <mesh castShadow receiveShadow position={[-0.9, 0.5, 0]}>
              <boxGeometry args={[0.2, 0.6, 0.8]} />
              <meshStandardMaterial color={furnitureColor} />
            </mesh>
            <mesh castShadow receiveShadow position={[0.9, 0.5, 0]}>
              <boxGeometry args={[0.2, 0.6, 0.8]} />
              <meshStandardMaterial color={furnitureColor} />
            </mesh>
          </group>
        )
      case "chair":
        return (
          <group>
            {/* Seat */}
            <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
              <boxGeometry args={[0.6, 0.1, 0.6]} />
              <meshStandardMaterial color={furnitureColor} />
            </mesh>
            {/* Back */}
            <mesh castShadow receiveShadow position={[0, 0.6, -0.25]}>
              <boxGeometry args={[0.6, 0.8, 0.1]} />
              <meshStandardMaterial color={furnitureColor} />
            </mesh>
            {/* Legs */}
            <mesh castShadow receiveShadow position={[-0.25, 0.1, -0.25]}>
              <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh castShadow receiveShadow position={[0.25, 0.1, -0.25]}>
              <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh castShadow receiveShadow position={[-0.25, 0.1, 0.25]}>
              <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh castShadow receiveShadow position={[0.25, 0.1, 0.25]}>
              <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
          </group>
        )
      case "table":
        return (
          <group>
            {/* Top */}
            <mesh castShadow receiveShadow position={[0, 0.25, 0]}>
              <boxGeometry args={[1.2, 0.05, 1.2]} />
              <meshStandardMaterial color={furnitureColor} />
            </mesh>
            {/* Legs */}
            <mesh castShadow receiveShadow position={[-0.5, 0.125, -0.5]}>
              <cylinderGeometry args={[0.05, 0.05, 0.25, 8]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh castShadow receiveShadow position={[0.5, 0.125, -0.5]}>
              <cylinderGeometry args={[0.05, 0.05, 0.25, 8]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh castShadow receiveShadow position={[-0.5, 0.125, 0.5]}>
              <cylinderGeometry args={[0.05, 0.05, 0.25, 8]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh castShadow receiveShadow position={[0.5, 0.125, 0.5]}>
              <cylinderGeometry args={[0.05, 0.05, 0.25, 8]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
          </group>
        )
      case "bed":
        return (
          <group>
            {/* Base */}
            <mesh castShadow receiveShadow position={[0, 0.15, 0]}>
              <boxGeometry args={[2, 0.3, 3]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* Mattress */}
            <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
              <boxGeometry args={[1.9, 0.2, 2.9]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Headboard */}
            <mesh castShadow receiveShadow position={[0, 0.7, -1.4]}>
              <boxGeometry args={[2, 1, 0.1]} />
              <meshStandardMaterial color={furnitureColor} />
            </mesh>
            {/* Pillows */}
            <mesh castShadow receiveShadow position={[-0.6, 0.5, -1]}>
              <boxGeometry args={[0.6, 0.1, 0.4]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh castShadow receiveShadow position={[0.6, 0.5, -1]}>
              <boxGeometry args={[0.6, 0.1, 0.4]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Blanket */}
            <mesh castShadow receiveShadow position={[0, 0.5, 0.5]}>
              <boxGeometry args={[1.9, 0.05, 1.8]} />
              <meshStandardMaterial color={furnitureColor} />
            </mesh>
          </group>
        )
      default:
        return (
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={furnitureColor} />
          </mesh>
        )
    }
  }

  // Selection indicator color based on theme
  const selectionColor = theme === "dark" ? "#3b82f6" : "#2563eb"

  return (
    <group
      position={[x, getHeight(), z]}
      rotation={[0, item.rotation * (Math.PI / 180), 0]}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <mesh ref={meshRef}>{renderFurniture()}</mesh>

      {/* Selection indicator */}
      {isSelected && (
        <mesh position={[0, -0.1, 0]}>
          <ringGeometry args={[1.2, 1.3, 32]} />
          <meshBasicMaterial color={selectionColor} transparent opacity={0.5} />
        </mesh>
      )}

      {/* Drag handles for selected furniture */}
      {isSelected && (
        <>
          <mesh position={[1.5, 0, 0]} onClick={(e) => e.stopPropagation()}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="red" />
          </mesh>
          <mesh position={[0, 0, 1.5]} onClick={(e) => e.stopPropagation()}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="green" />
          </mesh>
        </>
      )}
    </group>
  )
}

const Canvas3D = forwardRef<Canvas3DRef, Canvas3DProps>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<WebGLRenderer | null>(null)
  const sceneRef = useRef<Scene | null>(null)
  const cameraRef = useRef<Camera | null>(null)
  const { theme } = useTheme()

  // Function to capture the current state of the canvas as an image
  const takeScreenshot = (options: { format?: "png" | "jpeg"; quality?: number } = {}) => {
    const { format = "png", quality = 0.95 } = options

    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) {
      return null
    }

    // Render the scene
    rendererRef.current.render(sceneRef.current, cameraRef.current)

    // Get the data URL
    try {
      const dataUrl = rendererRef.current.domElement.toDataURL(image/${format}, quality)
      return dataUrl
    } catch (error) {
      console.error("Error taking screenshot:", error)
      return null
    }
  }

  // Expose the takeScreenshot function to parent components
  useImperativeHandle(ref, () => ({
    takeScreenshot,
  }))

  // Store references to renderer, scene, and camera
  const handleCreated = ({ gl, scene, camera }: { gl: WebGLRenderer; scene: Scene; camera: Camera }) => {
    rendererRef.current = gl
    sceneRef.current = scene
    cameraRef.current = camera
  }

  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        onCreated={handleCreated}
        ref={canvasRef}
        className={theme === "dark" ? "bg-gray-900" : "bg-gray-100"}
      >
        <Scene3D {...props} />
      </Canvas>
    </div>
  )
})

Canvas3D.displayName = "Canvas3D"

export default Canvas3D