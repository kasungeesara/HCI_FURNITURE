"use client"

import { useRef } from "react"
import { type Group, MeshStandardMaterial } from "three"
import { useFrame } from "@react-three/fiber"

export default function ModernSet({ position = [0, 0, 0], scale = 1, ...props }) {
  const group = useRef<Group>(null)

  // Materials
  const metalMaterial = new MeshStandardMaterial({
    color: "#94a3b8",
    roughness: 0.2,
    metalness: 0.8,
  })

  const woodMaterial = new MeshStandardMaterial({
    color: "#1e293b",
    roughness: 0.7,
    metalness: 0.2,
  })

  const fabricMaterial = new MeshStandardMaterial({
    color: "#334155",
    roughness: 0.8,
    metalness: 0.1,
  })

  const glassMaterial = new MeshStandardMaterial({
    color: "#e2e8f0",
    roughness: 0.1,
    metalness: 0.9,
    opacity: 0.3,
    transparent: true,
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
      {/* Modern Coffee Table */}
      <group position={[0, 0, 1]}>
        {/* Glass top */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.05, 0.7]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.1} metalness={0.9} opacity={0.3} transparent={true} />
        </mesh>

        {/* Metal frame */}
        <mesh position={[0, 0.175, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 0.05, 0.6]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Legs */}
        <mesh position={[-0.45, 0.075, -0.25]} castShadow receiveShadow>
          <boxGeometry args={[0.05, 0.15, 0.05]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
        </mesh>

        <mesh position={[0.45, 0.075, -0.25]} castShadow receiveShadow>
          <boxGeometry args={[0.05, 0.15, 0.05]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
        </mesh>

        <mesh position={[-0.45, 0.075, 0.25]} castShadow receiveShadow>
          <boxGeometry args={[0.05, 0.15, 0.05]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
        </mesh>

        <mesh position={[0.45, 0.075, 0.25]} castShadow receiveShadow>
          <boxGeometry args={[0.05, 0.15, 0.05]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Decorative items */}
        <mesh position={[0.3, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 0.05, 0.15]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.9} />
        </mesh>

        <mesh position={[-0.2, 0.45, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.06, 0.15, 16]} />
          <meshStandardMaterial color="#475569" roughness={0.5} metalness={0.5} />
        </mesh>
      </group>

      {/* Modern Side Table */}
      <group position={[-1.5, 0, 0]}>
        {/* Table top */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
          <meshStandardMaterial color="#1e293b" roughness={0.7} metalness={0.2} />
        </mesh>

        {/* Table base */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 8]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
        </mesh>

        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Decorative object  roughness={0.2} metalness={0.8} />
        </mesh>
        
        {/* Decorative object */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <dodecahedronGeometry args={[0.1, 0]} />
          <meshStandardMaterial color="#64748b" roughness={0.3} metalness={0.7} />
        </mesh>
      </group>

      {/* Modern Floor Lamp */}
      <group position={[1.5, 0, -0.5]}>
        {/* Base */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.25, 0.05, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} metalness={0.5} />
        </mesh>

        {/* Pole */}
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Lamp head */}
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Lamp shade */}
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <coneGeometry args={[0.25, 0.4, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.9} metalness={0.1} opacity={0.7} transparent={true} />
        </mesh>

        {/* Light source */}
        <pointLight position={[0, 1.5, 0]} intensity={0.5} distance={3} color="#f8fafc" />
      </group>

      {/* Decorative Plant */}
      <group position={[-1, 0, -1]}>
        {/* Pot */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.15, 0.1, 0.3, 16]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>

        {/* Plant stem */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
          <meshStandardMaterial color="#065f46" roughness={0.8} />
        </mesh>

        {/* Plant leaves */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#059669" roughness={0.8} side={2} />
        </mesh>
      </group>

      {/* Area Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.19, 0]} receiveShadow>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>
    </group>
  )
}
