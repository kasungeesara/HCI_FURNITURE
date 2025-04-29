// This utility helps manage model loading and caching

import { Cache } from "three"

// Enable caching for loaded models to improve performance
Cache.enabled = true

// Map product categories to model types
export const getCategoryModelType = (category: string, productName = ""): string => {
  const nameLower = productName.toLowerCase()

  if (category === "Living Room") {
    if (nameLower.includes("sofa") || nameLower.includes("couch")) {
      return "sofa"
    } else if (nameLower.includes("table") || nameLower.includes("ottoman")) {
      return "table"
    } else if (nameLower.includes("chair") || nameLower.includes("armchair")) {
      return "chair"
    }
    return "sofa" // Default for living room
  }

  if (category === "Office") {
    if (nameLower.includes("desk")) {
      return "table"
    }
    return "chair" // Default for office
  }

  if (category === "Dining") {
    return "table" // Default for dining
  }

  if (category === "Bedroom") {
    if (nameLower.includes("bed")) {
      return "sofa" // Use sofa model for beds
    }
    return "table" // Default for other bedroom furniture
  }

  return "sofa" // Default fallback
}

// In a real application, you would map product IDs to specific model paths
export const getModelPathById = (productId: string): string => {
  // This would be replaced with actual model paths in a production environment
  const modelPaths: Record<string, string> = {
    "modern-sofa": "/models/modern-sofa.glb",
    "minimalist-coffee-table": "/models/coffee-table.glb",
    "ergonomic-office-chair": "/models/office-chair.glb",
    // Add more mappings as needed
  }

  return modelPaths[productId] || "/assets/3d/duck.glb" // Fallback to duck model
}

// Preload commonly used models
export const preloadCommonModels = () => {
  // In a real application, you would preload your most common models here
  const commonModels = [
    "/assets/3d/duck.glb",
    // Add your actual model paths here
  ]

  // This would be implemented with actual preloading logic
  console.log("Preloading models:", commonModels)
}
