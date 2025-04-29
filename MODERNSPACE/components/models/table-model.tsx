"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { type Group, MeshStandardMaterial } from "three"

interface TableModelProps {
  customColor?: string
}

export default function TableModel({ customColor, ...props }: TableModelProps) {
  const group = useRef<Group>(null)

  // Create materials for different parts of the table
  const topMaterial = new MeshStandardMaterial({
    color: customColor || "#1e293b",
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
      {/* Table top */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow material={topMaterial}>
        <boxGeometry args={[1.2, 0.05, 0.8]} />
      </mesh>

      {/* Table legs */}
      <mesh position={[-0.5, 0.2, 0.3]} castShadow receiveShadow material={legsMaterial}>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
      </mesh>

      <mesh position={[0.5, 0.2, 0.3]} castShadow receiveShadow material={legsMaterial}>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
      </mesh>

      <mesh position={[-0.5, 0.2, -0.3]} castShadow receiveShadow material={legsMaterial}>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
      </mesh>

      <mesh position={[0.5, 0.2, -0.3]} castShadow receiveShadow material={legsMaterial}>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
      </mesh>

      {/* Table shelf (lower) */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow material={topMaterial}>
        <boxGeometry args={[1, 0.03, 0.6]} />
      </mesh>
    </group>
  )
}
