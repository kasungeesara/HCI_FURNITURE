"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { type Group, MeshStandardMaterial } from "three"

interface SofaModelProps {
  customColor?: string
}

export default function SofaModel({ customColor, ...props }: SofaModelProps) {
  const group = useRef<Group>(null)

  // In a production app, you would use actual texture images
  // For now, we'll create materials programmatically
  const fabricMaterial = new MeshStandardMaterial({
    color: customColor || "#334155",
    roughness: 0.7,
    metalness: 0.1,
  })

  const frameMaterial = new MeshStandardMaterial({
    color: customColor ? customColor : "#1e293b",
    roughness: 0.5,
    metalness: 0.2,
  })

  const legsMaterial = new MeshStandardMaterial({
    color: "#94a3b8",
    roughness: 0.2,
    metalness: 0.8,
  })

  useFrame((state) => {
    if (group.current) {
      // Gentle rotation animation
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Sofa base */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow material={frameMaterial}>
        <boxGeometry args={[2.2, 0.4, 1]} />
      </mesh>

      {/* Sofa back */}
      <mesh position={[0, 0.8, -0.4]} castShadow receiveShadow material={frameMaterial}>
        <boxGeometry args={[2.2, 0.6, 0.2]} />
      </mesh>

      {/* Left arm */}
      <mesh position={[-1, 0.6, 0]} castShadow receiveShadow material={frameMaterial}>
        <boxGeometry args={[0.2, 0.6, 0.8]} />
      </mesh>

      {/* Right arm */}
      <mesh position={[1, 0.6, 0]} castShadow receiveShadow material={frameMaterial}>
        <boxGeometry args={[0.2, 0.6, 0.8]} />
      </mesh>

      {/* Seat cushion left */}
      <mesh position={[-0.55, 0.55, 0.1]} castShadow receiveShadow material={fabricMaterial}>
        <boxGeometry args={[1, 0.3, 0.7]} />
      </mesh>

      {/* Seat cushion right */}
      <mesh position={[0.55, 0.55, 0.1]} castShadow receiveShadow material={fabricMaterial}>
        <boxGeometry args={[1, 0.3, 0.7]} />
      </mesh>

      {/* Back cushion left */}
      <mesh position={[-0.55, 0.9, -0.25]} castShadow receiveShadow material={fabricMaterial}>
        <boxGeometry args={[1, 0.4, 0.3]} />
      </mesh>

      {/* Back cushion right */}
      <mesh position={[0.55, 0.9, -0.25]} castShadow receiveShadow material={fabricMaterial}>
        <boxGeometry args={[1, 0.4, 0.3]} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.9, -0.1, 0.4]} castShadow receiveShadow material={legsMaterial}>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
      </mesh>

      <mesh position={[0.9, -0.1, 0.4]} castShadow receiveShadow material={legsMaterial}>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
      </mesh>

      <mesh position={[-0.9, -0.1, -0.4]} castShadow receiveShadow material={legsMaterial}>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
      </mesh>

      <mesh position={[0.9, -0.1, -0.4]} castShadow receiveShadow material={legsMaterial}>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
      </mesh>
    </group>
  )
}
