"use client"

import { useRef } from "react"
import { type Group, MeshStandardMaterial } from "three"
import { useFrame } from "@react-three/fiber"

export default function ScandinavianSet({ position = [0, 0, 0], scale = 1, ...props }) {
  const group = useRef<Group>(null)

  // Materials
  const lightWoodMaterial = new MeshStandardMaterial({
    color: "#fef3c7",
    roughness: 0.8,
    metalness: 0.1,
  })

  const fabricMaterial = new MeshStandardMaterial({
    color: "#f1f5f9",
    roughness: 0.9,
    metalness: 0.0,
  })

  const accentMaterial = new MeshStandardMaterial({
    color: "#94a3b8",
    roughness: 0.7,
    metalness: 0.2,
  })

  // Subtle animation
  useFrame((state) => {
    if (group.current) {
      // Very subtle floating effect
      group.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05
    }
  })

  return (
    <group ref={group} position={position} scale={scale} {...props}>
      {/* Scandinavian Coffee Table */}
      <group position={[0, 0, 1]}>
        {/* Table top */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.05, 0.7]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.8} metalness={0.1} />
        </mesh>

        {/* Legs */}
        <mesh position={[-0.5, 0.15, -0.25]} castShadow receiveShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.8} metalness={0.1} />
        </mesh>

        <mesh position={[0.5, 0.15, -0.25]} castShadow receiveShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.8} metalness={0.1} />
        </mesh>

        <mesh position={[-0.5, 0.15, 0.25]} castShadow receiveShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.8} metalness={0.1} />
        </mesh>

        <mesh position={[0.5, 0.15, 0.25]} castShadow receiveShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.8} metalness={0.1} />
        </mesh>

        {/* Decorative items */}
        <mesh position={[0.3, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 0.05, 0.15]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.9} />
        </mesh>

        <mesh position={[-0.2, 0.45, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.06, 0.15, 16]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.5} metalness={0.5} />
        </mesh>
      </group>

      {/* Scandinavian Side Table */}
      <group position={[-1.5, 0, 0]}>
        {/* Table top */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.8} metalness={0.1} />
        </mesh>

        {/* Table legs */}
        <mesh position={[-0.15, 0.25, -0.15]} castShadow receiveShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.8} metalness={0.1} />
        </mesh>

        <mesh position={[0.15, 0.25, -0.15]} castShadow receiveShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.8} metalness={0.1} />
        </mesh>

        <mesh position={[-0.15, 0.25, 0.15]} castShadow receiveShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.8} metalness={0.1} />
        </mesh>

        <mesh position={[0.15, 0.25, 0.15]} castShadow receiveShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.8} metalness={0.1} />
        </mesh>

        {/* Decorative object */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.7} />
        </mesh>
      </group>

      {/* Scandinavian Floor Lamp */}
      <group position={[1.5, 0, -0.5]}>
        {/* Base */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.25, 0.05, 16]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.9} metalness={0.1} />
        </mesh>

        {/* Pole */}
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.8} metalness={0.1} />
        </mesh>

        {/* Lamp head */}
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.8} metalness={0.1} />
        </mesh>

        {/* Lamp shade */}
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <coneGeometry args={[0.25, 0.4, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.9} metalness={0.1} opacity={0.7} transparent={true} />
        </mesh>

        {/* Light source */}
        <pointLight position={[0, 1.5, 0]} intensity={0.5} distance={3} color="#fff7ed" />
      </group>

      {/* Decorative Plant */}
      <group position={[-1, 0, -1]}>
        {/* Pot */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.15, 0.1, 0.3, 16]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.9} />
        </mesh>

        {/* Plant stem */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
          <meshStandardMaterial color="#84cc16" roughness={0.8} />
        </mesh>

        {/* Plant leaves */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#84cc16" roughness={0.8} side={2} />
        </mesh>
      </group>

      {/* Area Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.19, 0]} receiveShadow>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.9} />
      </mesh>
    </group>
  )
}
