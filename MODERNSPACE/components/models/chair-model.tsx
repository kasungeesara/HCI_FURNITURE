"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { type Group, MeshStandardMaterial } from "three"

interface ChairModelProps {
  customColor?: string
}

export default function ChairModel({ customColor, ...props }: ChairModelProps) {
  const group = useRef<Group>(null)

  // Create materials for different parts of the chair
  const seatMaterial = new MeshStandardMaterial({
    color: customColor || "#475569",
    roughness: 0.7,
    metalness: 0.1,
  })

  const frameMaterial = new MeshStandardMaterial({
    color: customColor ? customColor : "#0f172a",
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
      {/* Chair seat */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow material={seatMaterial}>
        <boxGeometry args={[0.6, 0.1, 0.6]} />
      </mesh>

      {/* Chair back */}
      <mesh position={[0, 0.9, -0.25]} castShadow receiveShadow material={seatMaterial}>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
      </mesh>

      {/* Chair back frame */}
      <mesh position={[-0.3, 0.9, -0.25]} castShadow receiveShadow material={frameMaterial}>
        <boxGeometry args={[0.05, 0.8, 0.05]} />
      </mesh>

      <mesh position={[0.3, 0.9, -0.25]} castShadow receiveShadow material={frameMaterial}>
        <boxGeometry args={[0.05, 0.8, 0.05]} />
      </mesh>

      {/* Chair legs */}
      <mesh position={[-0.25, 0.2, 0.25]} castShadow receiveShadow material={legsMaterial}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
      </mesh>

      <mesh position={[0.25, 0.2, 0.25]} castShadow receiveShadow material={legsMaterial}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
      </mesh>

      <mesh position={[-0.25, 0.2, -0.25]} castShadow receiveShadow material={legsMaterial}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
      </mesh>

      <mesh position={[0.25, 0.2, -0.25]} castShadow receiveShadow material={legsMaterial}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
      </mesh>

      {/* Armrests */}
      <mesh position={[-0.325, 0.6, 0.1]} castShadow receiveShadow material={frameMaterial}>
        <boxGeometry args={[0.05, 0.05, 0.4]} />
      </mesh>

      <mesh position={[0.325, 0.6, 0.1]} castShadow receiveShadow material={frameMaterial}>
        <boxGeometry args={[0.05, 0.05, 0.4]} />
      </mesh>
    </group>
  )
}
