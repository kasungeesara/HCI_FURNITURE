"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import SofaModel from "./models/sofa-model"
import ChairModel from "./models/chair-model"
import TableModel from "./models/table-model"
import BedModel from "./models/bed-model"

interface FeaturedFurnitureProps {
  modelType?: string
  showDecorations?: boolean
  customColor?: string
  position?: [number, number, number]
  scale?: number
}

export default function FeaturedFurniture({
  modelType = "sofa",
  showDecorations = true,
  customColor,
  position = [0, 0, 0],
  scale = 1,
  ...props
}: FeaturedFurnitureProps) {
  const group = useRef<Group>(null)

  useFrame((state) => {
    if (group.current) {
      // Apply a subtle floating animation
      group.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05
    }
  })

  // Render different models based on the modelType prop
  const renderModel = () => {
    switch (modelType) {
      case "chair":
        return <ChairModel customColor={customColor} />
      case "table":
        return <TableModel customColor={customColor} />
      case "bed":
        return <BedModel customColor={customColor} />
      case "sofa":
      default:
        return <SofaModel customColor={customColor} />
    }
  }

  return (
    <group ref={group} position={[position[0], position[1], position[2]]} scale={scale} {...props} dispose={null}>
      {renderModel()}
    </group>
  )
}