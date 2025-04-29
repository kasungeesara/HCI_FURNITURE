// This utility helps with 3D model management

import { MeshStandardMaterial } from "three"

// Create a reusable material with custom properties
export const createMaterial = (color: string, roughness = 0.5, metalness = 0.2): MeshStandardMaterial => {
  return new MeshStandardMaterial({
    color,
    roughness,
    metalness,
  })
}

// Helper to determine model type from product details
export const getModelTypeFromProduct = (category: string, name: string): string => {
  const nameLower = name.toLowerCase()

  if (nameLower.includes("sofa") || nameLower.includes("couch")) {
    return "sofa"
  } else if (nameLower.includes("chair")) {
    return "chair"
  } else if (nameLower.includes("table") || nameLower.includes("desk")) {
    return "table"
  } else if (nameLower.includes("bed")) {
    return "bed"
  }

  // Default based on category
  switch (category) {
    case "Living Room":
      return "sofa"
    case "Office":
      return "chair"
    case "Dining":
      return "table"
    case "Bedroom":
      return "bed"
    default:
      return "sofa"
  }
}

// Guide for integrating external GLTF models
export const modelIntegrationGuide = {
  step1: "Place your .glb or .gltf models in the /public/models/ directory",
  step2: "Import the model using useGLTF from @react-three/drei",
  step3: "Replace the primitive geometry with the loaded model",
  step4: "Adjust scale, position, and rotation as needed",
  example: `
    // Example code for loading external model
    import { useGLTF } from "@react-three/drei"
    
    export default function SofaModel(props) {
      const { scene } = useGLTF("/models/sofa.glb")
      return <primitive object={scene} {...props} />
    }
    
    // Don't forget to preload
    useGLTF.preload("/models/sofa.glb")
  `,
}
