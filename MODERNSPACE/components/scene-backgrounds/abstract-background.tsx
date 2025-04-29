"use client"

import { useRef } from "react"
import { type Group, Color, MeshStandardMaterial } from "three"
import { useFrame } from "@react-three/fiber"

export default function AbstractBackground({ colorScheme = "default", ...props }) {
  const group = useRef<Group>(null)

  // Define color schemes
  const colorSchemes = {
    default: {
      primary: "#4f46e5",
      secondary: "#7c3aed",
      accent: "#c026d3",
      background: "#0f172a",
    },
    sunset: {
      primary: "#f97316",
      secondary: "#db2777",
      accent: "#8b5cf6",
      background: "#18181b",
    },
    ocean: {
      primary: "#0ea5e9",
      secondary: "#06b6d4",
      accent: "#14b8a6",
      background: "#0c4a6e",
    },
    forest: {
      primary: "#16a34a",
      secondary: "#65a30d",
      accent: "#84cc16",
      background: "#14532d",
    },
    monochrome: {
      primary: "#e5e5e5",
      secondary: "#a3a3a3",
      accent: "#525252",
      background: "#171717",
    },
  }

  const colors = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes.default

  // Create materials
  const floorMaterial = new MeshStandardMaterial({
    color: colors.background,
    roughness: 0.8,
    metalness: 0.2,
  })

  // Animate the abstract shapes
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime()

      // Animate each child differently
      group.current.children.forEach((child, i) => {
        if (child.name.includes("floating")) {
          // Floating animation
          child.position.y = Math.sin(t * 0.5 + i) * 0.2 + child.userData.baseY
          child.rotation.x = Math.sin(t * 0.3 + i) * 0.2
          child.rotation.z = Math.cos(t * 0.2 + i) * 0.2
        }

        if (child.name.includes("rotating")) {
          // Rotation animation
          child.rotation.y = t * 0.2 * (i % 2 === 0 ? 1 : -1)
        }
      })
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Infinite floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={colors.background} roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Abstract floating shapes */}
      <group position={[0, 0, -5]}>
        {/* Large center shape */}
        <mesh position={[0, 2, 0]} name="floating-shape-1" userData={{ baseY: 2 }} castShadow>
          <torusGeometry args={[2, 0.3, 16, 32]} />
          <meshStandardMaterial
            color={colors.primary}
            roughness={0.4}
            metalness={0.6}
            emissive={new Color(colors.primary).lerp(new Color("#ffffff"), 0.2)}
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Smaller floating shapes */}
        <mesh position={[-3, 1.5, 2]} name="floating-shape-2" userData={{ baseY: 1.5 }} castShadow>
          <dodecahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial
            color={colors.secondary}
            roughness={0.5}
            metalness={0.5}
            emissive={new Color(colors.secondary).lerp(new Color("#ffffff"), 0.2)}
            emissiveIntensity={0.2}
          />
        </mesh>

        <mesh position={[3, 1, 1]} name="floating-shape-3" userData={{ baseY: 1 }} castShadow>
          <icosahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color={colors.accent}
            roughness={0.5}
            metalness={0.5}
            emissive={new Color(colors.accent).lerp(new Color("#ffffff"), 0.2)}
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Rotating rings */}
        <mesh position={[0, 2, 0]} rotation={[Math.PI / 2, 0, 0]} name="rotating-ring-1" castShadow>
          <torusGeometry args={[3, 0.05, 16, 32]} />
          <meshStandardMaterial
            color={colors.primary}
            roughness={0.3}
            metalness={0.7}
            transparent={true}
            opacity={0.6}
          />
        </mesh>

        <mesh position={[0, 2, 0]} rotation={[Math.PI / 3, Math.PI / 4, 0]} name="rotating-ring-2" castShadow>
          <torusGeometry args={[2.5, 0.05, 16, 32]} />
          <meshStandardMaterial
            color={colors.secondary}
            roughness={0.3}
            metalness={0.7}
            transparent={true}
            opacity={0.6}
          />
        </mesh>
      </group>

      {/* Light sources */}
      <pointLight position={[-3, 3, 2]} intensity={0.8} color={colors.primary} castShadow />
      <pointLight position={[3, 2, -2]} intensity={0.6} color={colors.secondary} castShadow />
      <pointLight position={[0, 4, 0]} intensity={0.5} color={colors.accent} castShadow />

      {/* Ambient particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          position={[(Math.random() - 0.5) * 10, Math.random() * 4 + 1, (Math.random() - 0.5) * 10 - 2]}
          name={`floating-particle-${i}`}
          userData={{ baseY: Math.random() * 4 + 1 }}
          castShadow
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.accent}
            emissive={i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.accent}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}
