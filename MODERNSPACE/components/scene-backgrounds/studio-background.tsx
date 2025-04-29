"use client"

import { useRef } from "react"
import { type Group, MeshStandardMaterial, DoubleSide } from "three"
import { useFrame } from "@react-three/fiber"

export default function StudioBackground({ style = "minimal", ...props }) {
  const group = useRef<Group>(null)

  // Define studio styles
  const styles = {
    minimal: {
      floor: "#f8fafc",
      wall: "#f1f5f9",
      accent: "#e2e8f0",
      light: "#ffffff",
    },
    dark: {
      floor: "#1e293b",
      wall: "#0f172a",
      accent: "#334155",
      light: "#f8fafc",
    },
    warm: {
      floor: "#fef2f2",
      wall: "#fee2e2",
      accent: "#fecaca",
      light: "#fffbeb",
    },
    cool: {
      floor: "#f0f9ff",
      wall: "#e0f2fe",
      accent: "#bae6fd",
      light: "#f0fdfa",
    },
    neutral: {
      floor: "#f5f5f5",
      wall: "#e5e5e5",
      accent: "#d4d4d4",
      light: "#fafafa",
    },
  }

  const colors = styles[style as keyof typeof styles] || styles.minimal

  // Create materials
  const floorMaterial = new MeshStandardMaterial({
    color: colors.floor,
    roughness: 0.5,
    metalness: 0.2,
  })

  const wallMaterial = new MeshStandardMaterial({
    color: colors.wall,
    roughness: 0.7,
    metalness: 0.1,
  })

  const accentMaterial = new MeshStandardMaterial({
    color: colors.accent,
    roughness: 0.6,
    metalness: 0.2,
  })

  // Subtle animation for light
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime()

      // Find and animate lights
      group.current.children.forEach((child) => {
        if (child.type === "DirectionalLight" || child.type === "SpotLight") {
          // Subtle intensity variation
          child.intensity = 1.0 + Math.sin(t * 0.5) * 0.1
        }
      })
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Infinite floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={colors.floor} roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Curved backdrop */}
      <mesh position={[0, 2, -5]} receiveShadow>
        <cylinderGeometry args={[10, 10, 10, 32, 1, true, Math.PI, Math.PI]} />
        <meshStandardMaterial color={colors.wall} roughness={0.7} metalness={0.1} side={DoubleSide} />
      </mesh>

      {/* Studio lights */}
      <spotLight
        position={[-3, 5, 3]}
        angle={Math.PI / 6}
        penumbra={0.2}
        intensity={1.0}
        color={colors.light}
        castShadow
      />

      <spotLight
        position={[3, 5, 3]}
        angle={Math.PI / 6}
        penumbra={0.2}
        intensity={0.8}
        color={colors.light}
        castShadow
      />

      <directionalLight position={[0, 5, 5]} intensity={0.6} color={colors.light} castShadow />

      {/* Ambient light */}
      <ambientLight intensity={0.4} color={colors.light} />

      {/* Studio equipment (simplified) */}
      {/* Light stand 1 */}
      <group position={[-3, 0, 3]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.1, 0.15, 0.1, 16]} />
          <meshStandardMaterial color={colors.accent} roughness={0.6} metalness={0.4} />
        </mesh>

        <mesh position={[0, 2.5, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 5, 8]} />
          <meshStandardMaterial color={colors.accent} roughness={0.4} metalness={0.6} />
        </mesh>

        <mesh position={[0, 5, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
          <meshStandardMaterial color={colors.accent} roughness={0.4} metalness={0.6} />
        </mesh>

        <mesh position={[0.5, 5, 0]} castShadow>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color={colors.accent} roughness={0.4} metalness={0.6} />
        </mesh>
      </group>

      {/* Light stand 2 */}
      <group position={[3, 0, 3]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.1, 0.15, 0.1, 16]} />
          <meshStandardMaterial color={colors.accent} roughness={0.6} metalness={0.4} />
        </mesh>

        <mesh position={[0, 2.5, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 5, 8]} />
          <meshStandardMaterial color={colors.accent} roughness={0.4} metalness={0.6} />
        </mesh>

        <mesh position={[0, 5, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
          <meshStandardMaterial color={colors.accent} roughness={0.4} metalness={0.6} />
        </mesh>

        <mesh position={[-0.5, 5, 0]} castShadow>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color={colors.accent} roughness={0.4} metalness={0.6} />
        </mesh>
      </group>
    </group>
  )
}
