"use client"

import { useRef } from "react"
import { type Group, MeshStandardMaterial } from "three"

export default function RoomEnvironment({ ...props }) {
  const group = useRef<Group>(null)

  // Materials
  const floorMaterial = new MeshStandardMaterial({
    color: "#1e293b",
    roughness: 0.8,
    metalness: 0.2,
  })

  const wallMaterial = new MeshStandardMaterial({
    color: "#0f172a",
    roughness: 0.9,
    metalness: 0.1,
  })

  const accentMaterial = new MeshStandardMaterial({
    color: "#475569",
    roughness: 0.7,
    metalness: 0.3,
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]} receiveShadow material={floorMaterial}>
        <planeGeometry args={[10, 10]} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 2, -5]} receiveShadow material={wallMaterial}>
        <planeGeometry args={[10, 5]} />
      </mesh>

      {/* Left Wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-5, 2, 0]} receiveShadow material={wallMaterial}>
        <planeGeometry args={[10, 5]} />
      </mesh>

      {/* Right Wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[5, 2, 0]} receiveShadow material={wallMaterial}>
        <planeGeometry args={[10, 5]} />
      </mesh>

      {/* Decorative elements - Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.19, 0]} receiveShadow>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#334155" roughness={0.9} />
      </mesh>

      {/* Wall Art - Left */}
      <mesh position={[-3, 2, -4.9]} receiveShadow>
        <boxGeometry args={[1.5, 1, 0.05]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Wall Art - Right */}
      <mesh position={[3, 2, -4.9]} receiveShadow>
        <boxGeometry args={[1.5, 1, 0.05]} />
        <meshStandardMaterial color="#64748b" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Decorative Plant */}
      <group position={[-2.5, 0, -3]}>
        {/* Pot */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.2, 0.4, 16]} />
          <meshStandardMaterial color="#475569" roughness={0.7} />
        </mesh>

        {/* Plant stem */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
          <meshStandardMaterial color="#065f46" roughness={0.8} />
        </mesh>

        {/* Plant leaves */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <sphereGeometry args={[0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#059669" roughness={0.8} side={2} />
        </mesh>
      </group>

      {/* Coffee Table */}
      <group position={[1.5, 0, -2]}>
        {/* Table top */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow material={accentMaterial}>
          <boxGeometry args={[0.8, 0.05, 0.8]} />
        </mesh>

        {/* Table legs */}
        <mesh position={[-0.3, 0.15, -0.3]} castShadow receiveShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
        </mesh>

        <mesh position={[0.3, 0.15, -0.3]} castShadow receiveShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
        </mesh>

        <mesh position={[-0.3, 0.15, 0.3]} castShadow receiveShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
        </mesh>

        <mesh position={[0.3, 0.15, 0.3]} castShadow receiveShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Book on table */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 0.03, 0.3]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.9} />
        </mesh>
      </group>

      {/* Floor Lamp */}
      <group position={[3, 0, -3]}>
        {/* Base */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.3, 0.05, 16]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} metalness={0.5} />
        </mesh>

        {/* Pole */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 1.6, 8]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Lamp shade */}
        <mesh position={[0, 1.6, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.3, 0.3, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.9} metalness={0.1} />
        </mesh>

        {/* Light source */}
        <pointLight position={[0, 1.6, 0]} intensity={0.5} distance={5} color="#f8fafc" />
      </group>
    </group>
  )
}
