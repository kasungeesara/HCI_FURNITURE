"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, Float, Sparkles, Cloud } from "@react-three/drei"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import FeaturedFurniture from "./featured-furniture"
import RoomEnvironment from "./models/room-environment"

export default function Hero() {
  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
          <color attach="background" args={["#0f172a"]} />
          <fog attach="fog" args={["#0f172a", 8, 15]} />

          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow shadow-mapSize={1024} />

          <Suspense fallback={null}>
            <RoomEnvironment position={[0, 0, 0]} />

            {/* Animated floating effect for the furniture */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
              <FeaturedFurniture position={[0, 0, 0]} scale={1.5} modelType="sofa" />
            </Float>

            {/* Add some atmospheric elements */}
            <Sparkles count={100} scale={10} size={1} speed={0.2} opacity={0.2} color="#ffffff" />

            {/* Decorative clouds in the background */}
            <group position={[0, 3, -5]}>
              <Cloud opacity={0.5} speed={0.1} width={10} depth={1.5} segments={20} position={[-4, 2, -3]} />
              <Cloud opacity={0.3} speed={0.2} width={8} depth={1} segments={15} position={[4, 1, -2]} />
            </group>

            <Environment preset="apartment" />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2.5}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-xl backdrop-blur-sm bg-black/30 p-8 rounded-lg">
            <h1 className="text-5xl font-bold leading-tight md:text-6xl">Experience Furniture in 3D</h1>
            <p className="mt-4 text-xl text-gray-300">
              Explore our collection of modern furniture and visualize how they'll look in your space before you buy.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/products">
                <Button className="bg-white text-black hover:bg-gray-200">
                  Shop Collection <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
