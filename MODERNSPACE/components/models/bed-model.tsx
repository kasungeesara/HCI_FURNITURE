"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { type Group, MeshStandardMaterial } from "three"

interface BedModelProps {
  customColor?: string
}

export default function BedModel({ customColor, ...props }: BedModelProps) {
  const group = useRef<Group>(null)

  // Create materials for different parts of the bed
  const frameMaterial = new MeshStandardMaterial({
    color: customColor || "#1e293b",
    roughness: 0.5,
    metalness: 0.2,
  })

  const mattressMaterial = new MeshStandardMaterial({
    color: "#f8fafc",
    roughness: 0.7,
    metalness: 0.1,
  })

  const pillowMaterial = new MeshStandardMaterial({
    color: "#f1f5f9",
    roughness: 0.8,
    metalness: 0.1,
  })

  const blanketMaterial = new MeshStandardMaterial({
    color: customColor || "#334155",
    roughness: 0.7,
    metalness: 0.1,
  })

  useFrame((state) => {
    if (group.current) {
      // Gentle rotation animation
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Bed frame */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow material={frameMaterial}>
        <boxGeometry args={[1.8, 0.4, 2.2]} />
      </mesh>

      {/* Mattress */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow material={mattressMaterial}>
        <boxGeometry args={[1.7, 0.2, 2.1]} />
      </mesh>

      {/* Headboard */}
      <mesh position={[0, 0.8, -1]} castShadow receiveShadow material={frameMaterial}>
        <boxGeometry args={[1.8, 1.2, 0.1]} />
      </mesh>

      {/* Pillows */}
      <mesh position={[-0.5, 0.65, -0.7]} castShadow receiveShadow material={pillowMaterial}>
        <boxGeometry args={[0.6, 0.1, 0.4]} />
      </mesh>

      <mesh position={[0.5, 0.65, -0.7]} castShadow receiveShadow material={pillowMaterial}>
        <boxGeometry args={[0.6, 0.1, 0.4]} />
      </mesh>

      {/* Blanket */}
      <mesh position={[0, 0.65, 0.3]} castShadow receiveShadow material={blanketMaterial}>
        <boxGeometry args={[1.7, 0.1, 1]} />
      </mesh>
    </group>
  )
}
