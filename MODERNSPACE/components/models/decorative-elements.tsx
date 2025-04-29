"use client"

import { useRef } from "react"
import type { Group } from "three"

export default function DecorativeElements({ ...props }) {
  const group = useRef<Group>(null)

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Decorative Plant */}
      <group position={[-2, 0, 1]}>
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

      {/* Small Side Table */}
      <group position={[2, 0, 1]}>
        {/* Table top */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.05, 16]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.2} />
        </mesh>

        {/* Table leg */}
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Table base */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.2} />
        </mesh>

        {/* Decorative vase */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.1, 0.15, 0.2, 16]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>

      {/* Wall Art */}
      <group position={[0, 1.5, -4.9]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2, 1.2, 0.05]} />
          <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.3} />
        </mesh>

        {/* Art frame */}
        <mesh position={[0, 0, 0.03]} castShadow receiveShadow>
          <boxGeometry args={[1.9, 1.1, 0.02]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} metalness={0.3} />
        </mesh>

        {/* Art content - abstract shapes */}
        <mesh position={[-0.5, 0.2, 0.04]} castShadow receiveShadow>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#f97316" roughness={0.5} metalness={0.3} />
        </mesh>

        <mesh position={[0.3, -0.1, 0.04]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.3, 0.01]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.5} metalness={0.3} />
        </mesh>

        <mesh position={[0.1, 0.3, 0.04]} castShadow receiveShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.01, 16]} />
          <meshStandardMaterial color="#a855f7" roughness={0.5} metalness={0.3} />
        </mesh>
      </group>

      {/* Area Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.19, 0]} receiveShadow>
        <planeGeometry args={[5, 4]} />
        <meshStandardMaterial color="#1e293b" roughness={0.9} />
      </mesh>

      {/* Decorative pattern on rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.18, 0]} receiveShadow>
        <planeGeometry args={[4.5, 3.5]} />
        <meshStandardMaterial color="#334155" roughness={0.9} />
      </mesh>

      {/* Ceiling Light */}
      <group position={[0, 3, 0]}>
        {/* Light fixture */}
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.3, 0.1, 16]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Light cord */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 1, 8]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>

        {/* Light bulb */}
        <mesh position={[0, -0.1, 0]} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#f8fafc"
            roughness={0.9}
            metalness={0.1}
            emissive="#f8fafc"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Light source */}
        <pointLight position={[0, -0.1, 0]} intensity={0.7} distance={10} color="#f8fafc" />
      </group>
    </group>
  )
}
