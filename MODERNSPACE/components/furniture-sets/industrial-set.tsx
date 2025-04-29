"use client"

import { useRef } from "react"
import { type Group, MeshStandardMaterial } from "three"
import { useFrame } from "@react-three/fiber"

export default function IndustrialSet({ position = [0, 0, 0], scale = 1, ...props }) {
  const group = useRef<Group>(null)

  // Materials
  const metalMaterial = new MeshStandardMaterial({
    color: "#71717a",
    roughness: 0.4,
    metalness: 0.8,
  })

  const darkWoodMaterial = new MeshStandardMaterial({
    color: "#44403c",
    roughness: 0.8,
    metalness: 0.2,
  })

  const concreteMaterial = new MeshStandardMaterial({
    color: "#a1a1aa",
    roughness: 0.9,
    metalness: 0.1,
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
      {/* Industrial Coffee Table */}
      <group position={[0, 0, 1]}>
        {/* Table top */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.05, 0.7]} />
          <meshStandardMaterial color="#44403c" roughness={0.8} metalness={0.2} />
        </mesh>

        {/* Metal frame */}
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.1, 0.3, 0.6]} />
          <meshStandardMaterial color="#71717a" roughness={0.4} metalness={0.8} />
        </mesh>

        {/* Wheels */}
        <mesh position={[-0.5, -0.05, -0.25]} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.05, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#27272a" roughness={0.4} metalness={0.8} />
        </mesh>

        <mesh position={[0.5, -0.05, -0.25]} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.05, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#27272a" roughness={0.4} metalness={0.8} />
        </mesh>

        <mesh position={[-0.5, -0.05, 0.25]} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.05, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#27272a" roughness={0.4} metalness={0.8} />
        </mesh>

        <mesh position={[0.5, -0.05, 0.25]} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.05, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#27272a" roughness={0.4} metalness={0.8} />
        </mesh>

        {/* Decorative items */}
        <mesh position={[0.3, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 0.05, 0.15]} />
          <meshStandardMaterial color="#44403c" roughness={0.9} />
        </mesh>

        <mesh position={[-0.2, 0.45, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.06, 0.15, 16]} />
          <meshStandardMaterial color="#71717a" roughness={0.5} metalness={0.5} />
        </mesh>
      </group>

      {/* Industrial Side Table */}
      <group position={[-1.5, 0, 0]}>
        {/* Table top */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
          <meshStandardMaterial color="#44403c" roughness={0.8} metalness={0.2} />
        </mesh>

        {/* Table base */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.15, 0.5, 8]} />
          <meshStandardMaterial color="#71717a" roughness={0.4} metalness={0.8} />
        </mesh>

        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.25, 0.25, 0.05, 16]} />
          <meshStandardMaterial color="#71717a" roughness={0.4} metalness={0.8} />
        </mesh>

        {/* Decorative object */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial color="#a1a1aa" roughness={0.9} metalness={0.1} />
        </mesh>
      </group>

      {/* Industrial Floor Lamp */}
      <group position={[1.5, 0, -0.5]}>
        {/* Base */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.25, 0.05, 16]} />
          <meshStandardMaterial color="#71717a" roughness={0.4} metalness={0.8} />
        </mesh>

        {/* Pole */}
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
          <meshStandardMaterial color="#71717a" roughness={0.4} metalness={0.8} />
        </mesh>

        {/* Lamp cage */}
        <group position={[0, 1.5, 0]}>
          {/* Top */}
          <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
            <meshStandardMaterial color="#71717a" roughness={0.4} metalness={0.8} />
          </mesh>

          {/* Bottom */}
          <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
            <meshStandardMaterial color="#71717a" roughness={0.4} metalness={0.8} />
          </mesh>

          {/* Cage bars */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2
            const x = Math.cos(angle) * 0.1
            const z = Math.sin(angle) * 0.1

            return (
              <mesh key={i} position={[x, 0, z]} castShadow receiveShadow>
                <cylinderGeometry args={[0.005, 0.005, 0.2, 8]} />
                <meshStandardMaterial color="#71717a" roughness={0.4} metalness={0.8} />
              </mesh>
            )
          })}

          {/* Light bulb */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial
              color="#f8fafc"
              roughness={0.9}
              metalness={0.1}
              emissive="#f8fafc"
              emissiveIntensity={0.5}
            />
          </mesh>

          {/* Light source */}
          <pointLight position={[0, 0, 0]} intensity={0.5} distance={3} color="#f8fafc" />
        </group>
      </group>

      {/* Decorative Object */}
      <group position={[-1, 0, -1]}>
        {/* Industrial gear */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
          <meshStandardMaterial color="#71717a" roughness={0.4} metalness={0.8} />
        </mesh>

        {/* Gear teeth */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          const x = Math.cos(angle) * 0.2
          const z = Math.sin(angle) * 0.2

          return (
            <mesh key={i} position={[x, 0, z]} castShadow receiveShadow>
              <boxGeometry args={[0.05, 0.05, 0.05]} />
              <meshStandardMaterial color="#71717a" roughness={0.4} metalness={0.8} />
            </mesh>
          )
        })}
      </group>

      {/* Concrete Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.19, 0]} receiveShadow>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial color="#a1a1aa" roughness={0.9} metalness={0.1} />
      </mesh>
    </group>
  )
}
