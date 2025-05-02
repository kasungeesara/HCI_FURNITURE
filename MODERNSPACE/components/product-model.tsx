"use client"

import { Canvas } from "@react-three/fiber"
import {
  Environment,
  Float,
  AccumulativeShadows,
  RandomizedLight,
  Html,
  useProgress,
  Loader,
  CameraControls,
} from "@react-three/drei"
import { Suspense, useState, useEffect, useRef } from "react"
import FeaturedFurniture from "./featured-furniture"
import { products } from "@/data/products"
import SceneCustomizer from "./scene-customizer"
import { Palette } from "lucide-react"

interface ProductModelProps {
  productId: string
}

function LoadingScreen() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-white border-opacity-20 border-t-opacity-100 rounded-full animate-spin"></div>
        <p className="mt-4 text-white text-sm">{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  )
}

// Simple room component with customizable color
function SimpleRoom({ color = "#f8fafc" }) {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 2, -5]} receiveShadow>
        <planeGeometry args={[20, 5]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Left Wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-10, 2, 0]} receiveShadow>
        <planeGeometry args={[20, 5]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Right Wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[10, 2, 0]} receiveShadow>
        <planeGeometry args={[20, 5]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
      </mesh>
    </group>
  )
}

export default function ProductModel({ productId }: ProductModelProps) {
  const [modelType, setModelType] = useState("sofa")
  const [furnitureColor, setFurnitureColor] = useState("#334155")
  const [roomColor, setRoomColor] = useState("#f8fafc")
  const [viewMode, setViewMode] = useState<"3d" | "2d">("3d")
  const [showCustomizer, setShowCustomizer] = useState(false)
  const cameraControlsRef = useRef(null)
  const product = products.find((p) => p.id === productId)

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

  // Reset camera when model type changes
  useEffect(() => {
    if (cameraControlsRef.current) {
      setTimeout(() => {
        cameraControlsRef.current?.reset(true)
      }, 100)
    }
  }, [modelType])

  // Handle furniture color change
  const handleFurnitureColorChange = (color: string) => {
    setFurnitureColor(color)
  }

  // Handle room color change
  const handleRoomColorChange = (color: string) => {
    setRoomColor(color)
  }

  // Handle view mode change
  const handleViewChange = (view: "3d" | "2d") => {
    setViewMode(view)
  }

  // 2D View Component
  const TwoDView = () => (
    <div className="relative h-full w-full bg-gray-100 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundColor: roomColor }}></div>
      <div className="relative z-10 p-8">
        <div
          className="w-64 h-32 rounded-lg shadow-lg"
          style={{
            backgroundColor: furnitureColor,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          }}
        >
          {modelType === "sofa" && (
            <>
              <div className="w-full h-8 rounded-t-lg" style={{ backgroundColor: furnitureColor }}></div>
              <div className="flex justify-between px-2">
                <div className="w-8 h-16 rounded" style={{ backgroundColor: ${furnitureColor} }}></div>
                <div className="w-8 h-16 rounded" style={{ backgroundColor: ${furnitureColor} }}></div>
              </div>
            </>
          )}

          {modelType === "chair" && (
            <>
              <div className="w-24 h-16 mx-auto rounded" style={{ backgroundColor: furnitureColor }}></div>
              <div className="w-8 h-8 mx-auto rounded" style={{ backgroundColor: ${furnitureColor} }}></div>
            </>
          )}

          {modelType === "table" && (
            <>
              <div className="w-56 h-4 mx-auto rounded" style={{ backgroundColor: furnitureColor }}></div>
              <div className="flex justify-between px-8 pt-2">
                <div className="w-4 h-20 rounded" style={{ backgroundColor: ${furnitureColor} }}></div>
                <div className="w-4 h-20 rounded" style={{ backgroundColor: ${furnitureColor} }}></div>
                <div className="w-4 h-20 rounded" style={{ backgroundColor: ${furnitureColor} }}></div>
                <div className="w-4 h-20 rounded" style={{ backgroundColor: ${furnitureColor} }}></div>
              </div>
            </>
          )}

          {modelType === "bed" && (
            <>
              <div className="w-64 h-24 rounded" style={{ backgroundColor: furnitureColor }}></div>
              <div className="w-64 h-8 rounded-b-lg" style={{ backgroundColor: ${furnitureColor} }}></div>
            </>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded text-black text-sm">
        {product?.name} - 2D View
      </div>
    </div>
  )

  return (
    <>
      {viewMode === "3d" ? (
        <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
          <color attach="background" args={["#0f172a"]} />
          <fog attach="fog" args={["#0f172a", 8, 15]} />

          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow shadow-mapSize={1024} />

          <Suspense fallback={<LoadingScreen />}>
            <SimpleRoom color={roomColor} />

            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
              <FeaturedFurniture
                position={[0, 0, 0]}
                scale={1.5}
                modelType={modelType}
                showDecorations={false}
                customColor={furnitureColor}
              />
            </Float>

            <AccumulativeShadows temporal frames={30} alphaTest={0.85} scale={10} position={[0, -0.19, 0]}>
              <RandomizedLight amount={4} radius={9} intensity={0.55} ambient={0.25} position={[5, 5, -10]} />
              <RandomizedLight amount={4} radius={5} intensity={0.25} ambient={0.55} position={[-5, 5, -9]} />
            </AccumulativeShadows>

            <Environment preset="apartment" />

            {/* Customizer UI */}
            {showCustomizer && (
              <Html position={[0, -2, 0]} transform>
                <div className="w-[300px] sm:w-[400px]">
                  <SceneCustomizer
                    onFurnitureColorChange={handleFurnitureColorChange}
                    onRoomColorChange={handleRoomColorChange}
                    onViewChange={handleViewChange}
                    currentView={viewMode}
                  />
                </div>
              </Html>
            )}
          </Suspense>

          <CameraControls
            ref={cameraControlsRef}
            minDistance={3}
            maxDistance={10}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      ) : (
        <TwoDView />
      )}

      <Loader />

      {/* Customizer toggle button */}
      <button
        onClick={() => setShowCustomizer(!showCustomizer)}
        className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm border border-gray-800 flex items-center space-x-2"
      >
        <Palette className="h-4 w-4" />
        <span>{showCustomizer ? "Hide Options" : "Customize"}</span>
      </button>
    </>
  )
}