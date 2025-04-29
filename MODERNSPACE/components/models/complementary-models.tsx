"use client"

import { useRef } from "react"
import { type Group, MeshStandardMaterial, DoubleSide } from "three"
import { useFrame } from "@react-three/fiber"

export default function ComplementaryModels({ modelType = "sofa", ...props }) {
  const group = useRef<Group>(null)

  // Materials
  const woodMaterial = new MeshStandardMaterial({
    color: "#4b5563",
    roughness: 0.8,
    metalness: 0.2,
  })

  const metalMaterial = new MeshStandardMaterial({
    color: "#94a3b8",
    roughness: 0.2,
    metalness: 0.8,
  })

  const fabricMaterial = new MeshStandardMaterial({
    color: "#334155",
    roughness: 0.7,
    metalness: 0.1,
  })

  const glassMaterial = new MeshStandardMaterial({
    color: "#e2e8f0",
    roughness: 0.1,
    metalness: 0.9,
    opacity: 0.3,
    transparent: true,
  })

  // Subtle animation for ambient elements
  useFrame((state) => {
    if (group.current) {
      // Subtle movement for decorative elements
      const t = state.clock.getElapsedTime()

      // Find specific elements and animate them
      group.current.children.forEach((child, index) => {
        if (child.name === "floating-object") {
          child.position.y = Math.sin(t * 0.5 + index) * 0.05 + 0.05
          child.rotation.y = t * 0.2
        }
      })
    }
  })

  // Render different complementary models based on the main model type
  const renderComplementaryModels = () => {
    switch (modelType) {
      case "sofa":
        return (
          <>
            {/* Coffee table to complement sofa */}
            <group position={[0, 0, 1]}>
              {/* Table top */}
              <mesh position={[0, 0.3, 0]} castShadow receiveShadow material={glassMaterial}>
                <boxGeometry args={[1, 0.05, 0.6]} />
              </mesh>

              {/* Table frame */}
              <mesh position={[0, 0.15, 0]} castShadow receiveShadow material={metalMaterial}>
                <boxGeometry args={[0.9, 0.3, 0.5]} />
              </mesh>

              {/* Decorative items */}
              <mesh position={[0.2, 0.35, 0]} castShadow receiveShadow name="floating-object">
                <boxGeometry args={[0.2, 0.05, 0.15]} />
                <meshStandardMaterial color="#1e3a8a" roughness={0.9} />
              </mesh>

              <mesh position={[-0.2, 0.35, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.05, 0.07, 0.1, 16]} />
                <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.7} />
              </mesh>
            </group>

            {/* Small side table */}
            <group position={[-1.5, 0, 0.5]}>
              <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
                <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.2} />
              </mesh>

              <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
                <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
              </mesh>

              <mesh position={[0, 0, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
                <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.2} />
              </mesh>
            </group>
          </>
        )

      case "chair":
        return (
          <>
            {/* Desk to complement chair */}
            <group position={[0, 0, 0.8]}>
              {/* Desk top */}
              <mesh position={[0, 0.75, 0]} castShadow receiveShadow material={woodMaterial}>
                <boxGeometry args={[1.2, 0.05, 0.7]} />
              </mesh>

              {/* Desk legs */}
              <mesh position={[-0.55, 0.375, 0]} castShadow receiveShadow material={metalMaterial}>
                <boxGeometry args={[0.05, 0.75, 0.05]} />
              </mesh>

              <mesh position={[0.55, 0.375, 0]} castShadow receiveShadow material={metalMaterial}>
                <boxGeometry args={[0.05, 0.75, 0.05]} />
              </mesh>

              <mesh position={[-0.55, 0.375, -0.3]} castShadow receiveShadow material={metalMaterial}>
                <boxGeometry args={[0.05, 0.75, 0.05]} />
              </mesh>

              <mesh position={[0.55, 0.375, -0.3]} castShadow receiveShadow material={metalMaterial}>
                <boxGeometry args={[0.05, 0.75, 0.05]} />
              </mesh>

              {/* Desk items */}
              <mesh position={[0.3, 0.8, 0]} castShadow receiveShadow name="floating-object">
                <boxGeometry args={[0.3, 0.1, 0.2]} />
                <meshStandardMaterial color="#0f172a" roughness={0.5} />
              </mesh>

              <mesh position={[-0.3, 0.8, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
                <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.7} />
              </mesh>
            </group>
          </>
        )

      case "table":
        return (
          <>
            {/* Chairs to complement table */}
            <group position={[0.7, 0, 0]}>
              {/* Chair seat */}
              <mesh position={[0, 0.45, 0]} castShadow receiveShadow material={fabricMaterial}>
                <boxGeometry args={[0.4, 0.05, 0.4]} />
              </mesh>

              {/* Chair back */}
              <mesh position={[0, 0.7, -0.2]} castShadow receiveShadow material={fabricMaterial}>
                <boxGeometry args={[0.4, 0.5, 0.05]} />
              </mesh>

              {/* Chair legs */}
              <mesh position={[-0.15, 0.225, 0.15]} castShadow receiveShadow material={metalMaterial}>
                <cylinderGeometry args={[0.02, 0.02, 0.45, 8]} />
              </mesh>

              <mesh position={[0.15, 0.225, 0.15]} castShadow receiveShadow material={metalMaterial}>
                <cylinderGeometry args={[0.02, 0.02, 0.45, 8]} />
              </mesh>

              <mesh position={[-0.15, 0.225, -0.15]} castShadow receiveShadow material={metalMaterial}>
                <cylinderGeometry args={[0.02, 0.02, 0.45, 8]} />
              </mesh>

              <mesh position={[0.15, 0.225, -0.15]} castShadow receiveShadow material={metalMaterial}>
                <cylinderGeometry args={[0.02, 0.02, 0.45, 8]} />
              </mesh>
            </group>

            <group position={[-0.7, 0, 0]}>
              {/* Chair seat */}
              <mesh position={[0, 0.45, 0]} castShadow receiveShadow material={fabricMaterial}>
                <boxGeometry args={[0.4, 0.05, 0.4]} />
              </mesh>

              {/* Chair back */}
              <mesh position={[0, 0.7, -0.2]} castShadow receiveShadow material={fabricMaterial}>
                <boxGeometry args={[0.4, 0.5, 0.05]} />
              </mesh>

              {/* Chair legs */}
              <mesh position={[-0.15, 0.225, 0.15]} castShadow receiveShadow material={metalMaterial}>
                <cylinderGeometry args={[0.02, 0.02, 0.45, 8]} />
              </mesh>

              <mesh position={[0.15, 0.225, 0.15]} castShadow receiveShadow material={metalMaterial}>
                <cylinderGeometry args={[0.02, 0.02, 0.45, 8]} />
              </mesh>

              <mesh position={[-0.15, 0.225, -0.15]} castShadow receiveShadow material={metalMaterial}>
                <cylinderGeometry args={[0.02, 0.02, 0.45, 8]} />
              </mesh>

              <mesh position={[0.15, 0.225, -0.15]} castShadow receiveShadow material={metalMaterial}>
                <cylinderGeometry args={[0.02, 0.02, 0.45, 8]} />
              </mesh>
            </group>

            {/* Decorative centerpiece */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow name="floating-object">
              <cylinderGeometry args={[0.1, 0.15, 0.2, 16]} />
              <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.7} />
            </mesh>
          </>
        )

      case "bed":
        return (
          <>
            {/* Nightstand */}
            <group position={[-1.2, 0, -0.5]}>
              {/* Nightstand body */}
              <mesh position={[0, 0.3, 0]} castShadow receiveShadow material={woodMaterial}>
                <boxGeometry args={[0.5, 0.6, 0.4]} />
              </mesh>

              {/* Nightstand drawer */}
              <mesh position={[0, 0.4, 0.21]} castShadow receiveShadow>
                <boxGeometry args={[0.45, 0.15, 0.02]} />
                <meshStandardMaterial color="#1e293b" roughness={0.5} />
              </mesh>

              {/* Drawer handle */}
              <mesh position={[0, 0.4, 0.22]} castShadow receiveShadow>
                <boxGeometry args={[0.1, 0.02, 0.02]} />
                <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
              </mesh>

              {/* Lamp on nightstand */}
              <group position={[0, 0.6, 0]}>
                <mesh castShadow receiveShadow>
                  <cylinderGeometry args={[0.1, 0.12, 0.05, 16]} />
                  <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
                </mesh>

                <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
                  <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
                  <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.8} />
                </mesh>

                <mesh position={[0, 0.3, 0]} castShadow receiveShadow name="floating-object">
                  <coneGeometry args={[0.15, 0.2, 16]} />
                  <meshStandardMaterial color="#f8fafc" roughness={0.9} opacity={0.7} transparent={true} />
                </mesh>

                <pointLight position={[0, 0.3, 0]} intensity={0.5} distance={3} color="#f8fafc" />
              </group>
            </group>

            {/* Rug beside bed */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.2, -0.19, 0]} receiveShadow>
              <planeGeometry args={[1, 1.5]} />
              <meshStandardMaterial color="#334155" roughness={0.9} side={DoubleSide} />
            </mesh>
          </>
        )

      default:
        return null
    }
  }

  return (
    <group ref={group} {...props} dispose={null}>
      {renderComplementaryModels()}
    </group>
  )
}
