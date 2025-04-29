"use client"

import { useRef } from "react"
import { type Group, MeshStandardMaterial, DoubleSide } from "three"
import { useFrame } from "@react-three/fiber"

export default function OutdoorBackground({ season = "summer", ...props }) {
  const group = useRef<Group>(null)

  // Define seasonal variations
  const seasons = {
    summer: {
      grass: "#16a34a",
      sky: "#0ea5e9",
      trees: "#15803d",
      flowers: "#ec4899",
      sunlight: "#fbbf24",
    },
    autumn: {
      grass: "#65a30d",
      sky: "#60a5fa",
      trees: "#b45309",
      flowers: "#f97316",
      sunlight: "#f59e0b",
    },
    winter: {
      grass: "#e5e7eb",
      sky: "#93c5fd",
      trees: "#475569",
      flowers: "#f9fafb",
      sunlight: "#e2e8f0",
    },
    spring: {
      grass: "#22c55e",
      sky: "#38bdf8",
      trees: "#4ade80",
      flowers: "#f472b6",
      sunlight: "#fde047",
    },
  }

  const colors = seasons[season as keyof typeof seasons] || seasons.summer

  // Create materials
  const grassMaterial = new MeshStandardMaterial({
    color: colors.grass,
    roughness: 0.9,
    metalness: 0.1,
  })

  const skyMaterial = new MeshStandardMaterial({
    color: colors.sky,
    roughness: 1.0,
    metalness: 0.0,
    side: DoubleSide,
  })

  const treeMaterial = new MeshStandardMaterial({
    color: colors.trees,
    roughness: 0.8,
    metalness: 0.1,
  })

  const trunkMaterial = new MeshStandardMaterial({
    color: "#92400e",
    roughness: 0.9,
    metalness: 0.1,
  })

  const flowerMaterial = new MeshStandardMaterial({
    color: colors.flowers,
    roughness: 0.7,
    metalness: 0.2,
  })

  // Animate elements
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime()

      // Find and animate trees
      group.current.children.forEach((child) => {
        if (child.name.includes("tree")) {
          // Gentle swaying motion
          child.rotation.z = Math.sin(t * 0.5 + Number.parseInt(child.name.split("-")[1])) * 0.02
        }

        if (child.name.includes("cloud")) {
          // Slow cloud movement
          child.position.x = child.userData.baseX + Math.sin(t * 0.1) * 2
        }

        if (child.name.includes("flower")) {
          // Flower bobbing
          child.position.y = child.userData.baseY + Math.sin(t * 0.8 + Number.parseInt(child.name.split("-")[1])) * 0.05
        }
      })
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={colors.grass} roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Sky dome */}
      <mesh position={[0, 25, 0]}>
        <sphereGeometry args={[50, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color={colors.sky}
          side={DoubleSide}
          roughness={1.0}
          metalness={0.0}
          opacity={0.8}
          transparent={true}
        />
      </mesh>

      {/* Trees */}
      {Array.from({ length: 8 }).map((_, i) => {
        const posX = (Math.random() - 0.5) * 20
        const posZ = (Math.random() - 0.5) * 20 - 5
        const scale = 0.8 + Math.random() * 0.5

        return (
          <group key={i} position={[posX, 0, posZ]} scale={[scale, scale, scale]} name={`tree-${i}`}>
            {/* Tree trunk */}
            <mesh position={[0, 1, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.3, 2, 8]} />
              <meshStandardMaterial color="#92400e" roughness={0.9} metalness={0.1} />
            </mesh>

            {/* Tree foliage */}
            <mesh position={[0, 2.5, 0]} castShadow>
              <coneGeometry args={[1.2, 3, 8]} />
              <meshStandardMaterial color={colors.trees} roughness={0.8} metalness={0.1} />
            </mesh>
          </group>
        )
      })}

      {/* Clouds */}
      {Array.from({ length: 5 }).map((_, i) => {
        const posX = (Math.random() - 0.5) * 30
        const posY = 10 + Math.random() * 5
        const posZ = -20 - Math.random() * 10
        const scale = 1 + Math.random() * 2

        return (
          <group
            key={i}
            position={[posX, posY, posZ]}
            scale={[scale, scale, scale]}
            name={`cloud-${i}`}
            userData={{ baseX: posX }}
          >
            <mesh castShadow>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial color="white" roughness={0.9} metalness={0.1} />
            </mesh>

            <mesh position={[1, -0.2, 0]} castShadow>
              <sphereGeometry args={[0.8, 16, 16]} />
              <meshStandardMaterial color="white" roughness={0.9} metalness={0.1} />
            </mesh>

            <mesh position={[-1, -0.1, 0]} castShadow>
              <sphereGeometry args={[0.7, 16, 16]} />
              <meshStandardMaterial color="white" roughness={0.9} metalness={0.1} />
            </mesh>

            <mesh position={[0, -0.3, 0.7]} castShadow>
              <sphereGeometry args={[0.9, 16, 16]} />
              <meshStandardMaterial color="white" roughness={0.9} metalness={0.1} />
            </mesh>
          </group>
        )
      })}

      {/* Flowers */}
      {Array.from({ length: 30 }).map((_, i) => {
        const posX = (Math.random() - 0.5) * 15
        const posZ = (Math.random() - 0.5) * 15
        const baseY = 0.1

        return (
          <group key={i} position={[posX, baseY, posZ]} name={`flower-${i}`} userData={{ baseY }}>
            {/* Stem */}
            <mesh castShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
              <meshStandardMaterial color="#15803d" roughness={0.8} metalness={0.1} />
            </mesh>

            {/* Flower */}
            <mesh position={[0, 0.2, 0]} castShadow>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial
                color={i % 3 === 0 ? colors.flowers : i % 3 === 1 ? "#a855f7" : "#fbbf24"}
                roughness={0.7}
                metalness={0.2}
              />
            </mesh>
          </group>
        )
      })}

      {/* Sun/light source */}
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.2}
        color={colors.sunlight}
        castShadow
        shadow-mapSize={1024}
      />

      {/* Ambient light */}
      <ambientLight intensity={0.5} color={colors.sunlight} />
    </group>
  )
}
