"use client"

import { Canvas } from "@react-three/fiber"
import {
  Environment,
  OrbitControls,
  PresentationControls,
  Float,
  Sparkles,
  useProgress,
  Html,
  Loader,
} from "@react-three/drei"
import { Suspense, useState, useEffect } from "react"
import FeaturedFurniture from "./featured-furniture"
import EnhancedRoomEnvironment from "./models/enhanced-room-environment"
import ComplementaryModels from "./models/complementary-models"
import { products } from "@/data/products"
import AbstractBackground from "./scene-backgrounds/abstract-background"
import OutdoorBackground from "./scene-backgrounds/outdoor-background"
import StudioBackground from "./scene-backgrounds/studio-background"
import ModernSet from "./furniture-sets/modern-set"
import ScandinavianSet from "./furniture-sets/scandinavian-set"
import IndustrialSet from "./furniture-sets/industrial-set"

interface ProductModelPreviewProps {
  productId: string
  size?: "small" | "medium" | "large"
  backgroundType?: string
  backgroundVariant?: string
  furnitureSet?: string
}

function LoadingScreen() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-white border-opacity-20 border-t-opacity-100 rounded-full animate-spin"></div>
        <p className="mt-4 text-white text-xs">{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  )
}

export default function ProductModelPreview({
  productId,
  size = "medium",
  backgroundType = "room",
  backgroundVariant = "modern",
  furnitureSet = "default",
}: ProductModelPreviewProps) {
  const [modelType, setModelType] = useState("sofa")
  const [showEnvironment, setShowEnvironment] = useState(true)
  const [showComplementary, setShowComplementary] = useState(true)

  // Get model position based on type to prevent clipping
  const getModelPosition = () => {
    switch (modelType) {
      case "sofa":
        return [0, 0, 0]
      case "chair":
        return [0, 0, 0]
      case "table":
        return [0, 0, 0]
      case "bed":
        return [0, 0.2, 0] // Raise bed slightly to prevent floor clipping
      default:
        return [0, 0, 0]
    }
  }

  // Get complementary model position
  const getComplementaryPosition = () => {
    switch (modelType) {
      case "sofa":
        return [0, 0, 0.5] // Move complementary items forward slightly
      case "chair":
        return [0, 0, 0.3]
      case "table":
        return [0, 0, 0]
      case "bed":
        return [0, 0.2, 0]
      default:
        return [0, 0, 0]
    }
  }

  // Determine model type based on product category and name
  useEffect(() => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      const name = product.name.toLowerCase()

      if (name.includes("sofa") || name.includes("couch")) {
        setModelType("sofa")
      } else if (name.includes("chair")) {
        setModelType("chair")
      } else if (name.includes("table") || name.includes("desk")) {
        setModelType("table")
      } else if (name.includes("bed")) {
        setModelType("bed")
      } else if (product.category === "Living Room") {
        setModelType("sofa")
      } else if (product.category === "Office") {
        setModelType("chair")
      } else if (product.category === "Dining") {
        setModelType("table")
      } else if (product.category === "Bedroom") {
        setModelType("bed")
      } else {
        setModelType("sofa")
      }
    }
  }, [productId])

  // Adjust camera position based on size
  const getCameraPosition = () => {
    switch (size) {
      case "small":
        return [0, 1, 4]
      case "large":
        return [0, 1.5, 6]
      case "medium":
      default:
        return [0, 1, 5]
    }
  }

  // Render the appropriate background
  const renderBackground = () => {
    if (!showEnvironment) return null

    switch (backgroundType) {
      case "room":
        return <EnhancedRoomEnvironment position={[0, 0, 0]} theme={backgroundVariant} />
      case "abstract":
        return <AbstractBackground position={[0, 0, 0]} colorScheme={backgroundVariant} />
      case "outdoor":
        return <OutdoorBackground position={[0, 0, 0]} season={backgroundVariant} />
      case "studio":
        return <StudioBackground position={[0, 0, 0]} style={backgroundVariant} />
      default:
        return <EnhancedRoomEnvironment position={[0, 0, 0]} theme={backgroundVariant} />
    }
  }

  // Render the appropriate furniture set
  const renderFurnitureSet = () => {
    if (!showComplementary) return null

    switch (furnitureSet) {
      case "modern":
        return <ModernSet position={[0, 0, 0]} scale={1.5} />
      case "scandinavian":
        return <ScandinavianSet position={[0, 0, 0]} scale={1.5} />
      case "industrial":
        return <IndustrialSet position={[0, 0, 0]} scale={1.5} />
      case "default":
      default:
        return <ComplementaryModels position={getComplementaryPosition()} scale={1.5} modelType={modelType} />
    }
  }

  return (
    <>
      <Canvas shadows camera={{ position: getCameraPosition(), fov: 45 }}>
        <color attach="background" args={["#0f172a"]} />
        <fog attach="fog" args={["#0f172a", 8, 15]} />

        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow shadow-mapSize={1024} />

        <Suspense fallback={<LoadingScreen />}>
          {renderBackground()}

          <PresentationControls
            global
            zoom={0.8}
            rotation={[0, -Math.PI / 4, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
              <FeaturedFurniture
                position={getModelPosition()}
                scale={1.5}
                modelType={modelType}
                showDecorations={false}
              />

              {renderFurnitureSet()}
            </Float>

            <Sparkles count={50} scale={10} size={1} speed={0.2} opacity={0.2} color="#ffffff" />
          </PresentationControls>

          <Environment preset="apartment" />
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
      </Canvas>

      <Loader />

      {size !== "small" && (
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-xs backdrop-blur-sm">
          <div className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              id="preview-show-room"
              checked={showEnvironment}
              onChange={() => setShowEnvironment(!showEnvironment)}
              className="rounded"
            />
            <label htmlFor="preview-show-room">Show Environment</label>
          </div>

          <div className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              id="preview-show-complementary"
              checked={showComplementary}
              onChange={() => setShowComplementary(!showComplementary)}
              className="rounded"
            />
            <label htmlFor="preview-show-complementary">Show Complementary Items</label>
          </div>
        </div>
      )}
    </>
  )
}