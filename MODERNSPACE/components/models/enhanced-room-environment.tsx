"use client"

import { useRef } from "react"
import { type Group, MeshStandardMaterial, DoubleSide, Color } from "three"
import { useFrame } from "@react-three/fiber"

export default function EnhancedRoomEnvironment({ theme = "modern", ...props }) {
  const group = useRef<Group>(null)

  // Define different theme materials
  const themes = {
    modern: {
      floor: "#1e293b",
      wall: "#0f172a",
      accent: "#475569",
      trim: "#94a3b8",
    },
    warm: {
      floor: "#292524",
      wall: "#1c1917",
      accent: "#78350f",
      trim: "#d6d3d1",
    },
    minimal: {
      floor: "#f8fafc",
      wall: "#e2e8f0",
      accent: "#cbd5e1",
      trim: "#64748b",
    },
    elegant: {
      floor: "#1e1b4b",
      wall: "#312e81",
      accent: "#4f46e5",
      trim: "#a5b4fc",
    },
    nature: {
      floor: "#064e3b",
      wall: "#022c22",
      accent: "#059669",
      trim: "#6ee7b7",
    },
  }

  const colors = themes[theme as keyof typeof themes] || themes.modern

  // Materials
  const floorMaterial = new MeshStandardMaterial({
    color: colors.floor,
    roughness: 0.8,
    metalness: 0.2,
  })

  const wallMaterial = new MeshStandardMaterial({
    color: colors.wall,
    roughness: 0.9,
    metalness: 0.1,
  })

  const accentMaterial = new MeshStandardMaterial({
    color: colors.accent,
    roughness: 0.7,
    metalness: 0.3,
  })

  const trimMaterial = new MeshStandardMaterial({
    color: colors.trim,
    roughness: 0.5,
    metalness: 0.4,
  })

  // Subtle animation for ambient elements
  useFrame((state) => {
    if (group.current) {
      // Subtle movement for decorative elements
      const t = state.clock.getElapsedTime()
      const children = group.current.children

      // Find the plant and make it sway slightly
      const plantGroup = children.find((child) => child.name === "plant-group")
      if (plantGroup) {
        plantGroup.rotation.y = Math.sin(t * 0.3) * 0.05
      }

      // Make the light flicker slightly
      const lightSource = children.find((child) => child.name === "ceiling-light")
      if (lightSource && lightSource.children.length > 0) {
        const light = lightSource.children.find((child) => child.type === "PointLight")
        if (light) {
          light.intensity = 0.7 + Math.sin(t * 2) * 0.05
        }
      }
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Floor with wood texture pattern */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color={colors.floor} roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Floor pattern overlay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.19, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color={new Color(colors.floor).lerp(new Color("#ffffff"), 0.05)}
          roughness={0.7}
          metalness={0.2}
          opacity={0.3}
          transparent={true}
        />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 2, -5]} receiveShadow material={wallMaterial}>
        <planeGeometry args={[12, 5]} />
      </mesh>

      {/* Left Wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-6, 2, 0]} receiveShadow material={wallMaterial}>
        <planeGeometry args={[12, 5]} />
      </mesh>

      {/* Right Wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[6, 2, 0]} receiveShadow material={wallMaterial}>
        <planeGeometry args={[12, 5]} />
      </mesh>

      {/* Wall trim/baseboards */}
      <mesh position={[0, 0, -4.95]} receiveShadow>
        <boxGeometry args={[12, 0.3, 0.1]} />
        <meshStandardMaterial color={colors.trim} roughness={0.5} metalness={0.3} />
      </mesh>

      <mesh rotation={[0, Math.PI / 2, 0]} position={[-5.95, 0, 0]} receiveShadow>
        <boxGeometry args={[12, 0.3, 0.1]} />
        <meshStandardMaterial color={colors.trim} roughness={0.5} metalness={0.3} />
      </mesh>

      <mesh rotation={[0, -Math.PI / 2, 0]} position={[5.95, 0, 0]} receiveShadow>
        <boxGeometry args={[12, 0.3, 0.1]} />
        <meshStandardMaterial color={colors.trim} roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Decorative elements - Large Area Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.18, 0]} receiveShadow>
        <planeGeometry args={[6, 5]} />
        <meshStandardMaterial
          color={new Color(colors.accent).lerp(new Color("#ffffff"), 0.1)}
          roughness={0.9}
          side={DoubleSide}
        />
      </mesh>

      {/* Rug pattern */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.17, 0]} receiveShadow>
        <planeGeometry args={[5.8, 4.8]} />
        <meshStandardMaterial
          color={new Color(colors.accent).lerp(new Color("#000000"), 0.1)}
          roughness={0.9}
          opacity={0.3}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>

      {/* Wall Art - Gallery */}
      <group position={[0, 2, -4.9]}>
        {/* Large center piece */}
        <mesh position={[0, 0.5, 0]} receiveShadow>
          <boxGeometry args={[2.5, 1.5, 0.05]} />
          <meshStandardMaterial color={colors.trim} roughness={0.5} metalness={0.3} />
        </mesh>

        <mesh position={[0, 0.5, 0.03]} receiveShadow>
          <boxGeometry args={[2.4, 1.4, 0.02]} />
          <meshStandardMaterial color={colors.accent} roughness={0.5} metalness={0.3} />
        </mesh>

        {/* Left piece */}
        <mesh position={[-3, 0, 0]} receiveShadow>
          <boxGeometry args={[1.5, 1, 0.05]} />
          <meshStandardMaterial color={colors.trim} roughness={0.5} metalness={0.3} />
        </mesh>

        <mesh position={[-3, 0, 0.03]} receiveShadow>
          <boxGeometry args={[1.4, 0.9, 0.02]} />
          <meshStandardMaterial
            color={new Color(colors.accent).lerp(new Color("#ffffff"), 0.2)}
            roughness={0.5}
            metalness={0.3}
          />
        </mesh>

        {/* Right piece */}
        <mesh position={[3, 0, 0]} receiveShadow>
          <boxGeometry args={[1.5, 1, 0.05]} />
          <meshStandardMaterial color={colors.trim} roughness={0.5} metalness={0.3} />
        </mesh>

        <mesh position={[3, 0, 0.03]} receiveShadow>
          <boxGeometry args={[1.4, 0.9, 0.02]} />
          <meshStandardMaterial
            color={new Color(colors.accent).lerp(new Color("#000000"), 0.2)}
            roughness={0.5}
            metalness={0.3}
          />
        </mesh>
      </group>

      {/* Decorative Plant */}
      <group position={[-3.5, 0, -3]} name="plant-group">
        {/* Pot */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.3, 0.6, 16]} />
          <meshStandardMaterial color={colors.trim} roughness={0.7} />
        </mesh>

        {/* Plant stem */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 1.6, 8]} />
          <meshStandardMaterial color="#065f46" roughness={0.8} />
        </mesh>

        {/* Plant leaves - multiple layers for more realism */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <sphereGeometry args={[0.5, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#059669" roughness={0.8} side={DoubleSide} />
        </mesh>

        <mesh position={[0.2, 1.0, 0.2]} castShadow>
          <sphereGeometry args={[0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#047857" roughness={0.8} side={DoubleSide} />
        </mesh>

        <mesh position={[-0.2, 1.1, -0.1]} castShadow>
          <sphereGeometry args={[0.4, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#10b981" roughness={0.8} side={DoubleSide} />
        </mesh>
      </group>

      {/* Modern Coffee Table */}
      <group position={[2, 0, -2.5]}>
        {/* Table top - glass */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.05, 0.8]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.9} opacity={0.3} transparent={true} />
        </mesh>

        {/* Table base */}
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow material={accentMaterial}>
          <boxGeometry args={[0.8, 0.3, 0.6]} />
        </mesh>

        {/* Decorative items on table */}
        {/* Book stack */}
        <group position={[0.3, 0.4, 0.1]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.2, 0.03, 0.15]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.03, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.2, 0.03, 0.15]} />
            <meshStandardMaterial color="#7e22ce" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.2, 0.03, 0.15]} />
            <meshStandardMaterial color="#be185d" roughness={0.9} />
          </mesh>
        </group>

        {/* Small vase */}
        <group position={[-0.3, 0.45, -0.1]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.05, 0.08, 0.2, 16]} />
            <meshStandardMaterial color={colors.trim} roughness={0.3} metalness={0.7} />
          </mesh>

          {/* Flower stems */}
          <mesh position={[0, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.005, 0.005, 0.3, 8]} />
            <meshStandardMaterial color="#064e3b" roughness={0.8} />
          </mesh>

          <mesh position={[0.02, 0.15, 0.02]} castShadow rotation={[0.1, 0, 0.1]}>
            <cylinderGeometry args={[0.005, 0.005, 0.2, 8]} />
            <meshStandardMaterial color="#064e3b" roughness={0.8} />
          </mesh>

          <mesh position={[-0.02, 0.18, -0.02]} castShadow rotation={[-0.1, 0, -0.1]}>
            <cylinderGeometry args={[0.005, 0.005, 0.25, 8]} />
            <meshStandardMaterial color="#064e3b" roughness={0.8} />
          </mesh>

          {/* Flower blooms */}
          <mesh position={[0, 0.35, 0]} castShadow>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#f43f5e" roughness={0.8} />
          </mesh>

          <mesh position={[0.02, 0.25, 0.02]} castShadow>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial color="#ec4899" roughness={0.8} />
          </mesh>

          <mesh position={[-0.02, 0.3, -0.02]} castShadow>
            <sphereGeometry args={[0.028, 8, 8]} />
            <meshStandardMaterial color="#d946ef" roughness={0.8} />
          </mesh>
        </group>
      </group>

      {/* Floor Lamp */}
      <group position={[4, 0, -3.5]}>
        {/* Base */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.4, 0.05, 16]} />
          <meshStandardMaterial color={colors.trim} roughness={0.5} metalness={0.5} />
        </mesh>

        {/* Pole */}
        <mesh position={[0, 0.9, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 1.8, 8]} />
          <meshStandardMaterial color={colors.trim} roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Lamp shade */}
        <mesh position={[0, 1.8, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.4, 0.4, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.9} metalness={0.1} opacity={0.7} transparent={true} />
        </mesh>

        {/* Light source */}
        <pointLight position={[0, 1.8, 0]} intensity={0.8} distance={8} color="#f8fafc" castShadow />
      </group>

      {/* Ceiling Light */}
      <group position={[0, 3.5, 0]} name="ceiling-light">
        {/* Light fixture */}
        <mesh castShadow>
          <cylinderGeometry args={[0.3, 0.2, 0.1, 16]} />
          <meshStandardMaterial color={colors.trim} roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Light cord */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 1, 8]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>

        {/* Light shade */}
        <mesh position={[0, -0.2, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.6, 0.5, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.9} metalness={0.1} opacity={0.6} transparent={true} />
        </mesh>

        {/* Light bulb */}
        <mesh position={[0, -0.2, 0]} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#f8fafc"
            roughness={0.9}
            metalness={0.1}
            emissive="#f8fafc"
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Light source */}
        <pointLight position={[0, -0.2, 0]} intensity={0.7} distance={12} color="#f8fafc" castShadow />
      </group>

      {/* Window on back wall */}
      <group position={[3, 2, -4.95]}>
        {/* Window frame */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2, 2.5, 0.1]} />
          <meshStandardMaterial color={colors.trim} roughness={0.5} metalness={0.3} />
        </mesh>

        {/* Window glass */}
        <mesh position={[0, 0, 0.06]} receiveShadow>
          <boxGeometry args={[1.8, 2.3, 0.02]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.1} metalness={0.9} opacity={0.3} transparent={true} />
        </mesh>

        {/* Window dividers */}
        <mesh position={[0, 0, 0.07]} receiveShadow>
          <boxGeometry args={[0.05, 2.3, 0.03]} />
          <meshStandardMaterial color={colors.trim} roughness={0.5} metalness={0.3} />
        </mesh>

        <mesh position={[0, 0, 0.07]} receiveShadow>
          <boxGeometry args={[1.8, 0.05, 0.03]} />
          <meshStandardMaterial color={colors.trim} roughness={0.5} metalness={0.3} />
        </mesh>

        {/* Light from window */}
        <directionalLight position={[0, 0, 1]} intensity={0.3} color="#f8fafc" />
      </group>

      {/* Small side table */}
      <group position={[-3, 0, -1]}>
        {/* Table top */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.05, 16]} />
          <meshStandardMaterial color={colors.accent} roughness={0.5} metalness={0.2} />
        </mesh>

        {/* Table leg */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 8]} />
          <meshStandardMaterial color={colors.trim} roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Table base */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
          <meshStandardMaterial color={colors.accent} roughness={0.5} metalness={0.2} />
        </mesh>

        {/* Decorative object on table */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <dodecahedronGeometry args={[0.15, 0]} />
          <meshStandardMaterial color={colors.trim} roughness={0.2} metalness={0.8} />
        </mesh>
      </group>
    </group>
  )
}
