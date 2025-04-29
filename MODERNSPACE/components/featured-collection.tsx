"use client"

import { useState } from "react"
import { products } from "@/data/products"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import ProductModelPreview from "./product-model-preview"
import { useTheme } from "@/context/theme-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define collection categories
const collections = [
  { id: "trending", name: "Trending Now" },
  { id: "living-room", name: "Living Room" },
  { id: "bedroom", name: "Bedroom" },
  { id: "dining", name: "Dining" },
  { id: "office", name: "Office" },
]

// Define background presets
const backgroundPresets = [
  { type: "room", variant: "modern", name: "Modern Room" },
  { type: "abstract", variant: "sunset", name: "Abstract Sunset" },
  { type: "outdoor", variant: "summer", name: "Summer Garden" },
  { type: "studio", variant: "minimal", name: "Studio" },
]

// Define furniture sets
const furnitureSets = [
  { id: "default", name: "Default" },
  { id: "modern", name: "Modern" },
  { id: "scandinavian", name: "Scandinavian" },
  { id: "industrial", name: "Industrial" },
]

export default function FeaturedCollection() {
  const [activeCollection, setActiveCollection] = useState("trending")
  const [backgroundPreset, setBackgroundPreset] = useState(0)
  const [furnitureSet, setFurnitureSet] = useState("default")
  const { theme, setTheme } = useTheme()

  // Filter products based on active collection
  const getCollectionProducts = () => {
    switch (activeCollection) {
      case "trending":
        return products.filter((product) => product.featured).slice(0, 4)
      case "living-room":
        return products.filter((product) => product.category === "Living Room").slice(0, 4)
      case "bedroom":
        return products.filter((product) => product.category === "Bedroom").slice(0, 4)
      case "dining":
        return products.filter((product) => product.category === "Dining").slice(0, 4)
      case "office":
        return products.filter((product) => product.category === "Office").slice(0, 4)
      default:
        return products.filter((product) => product.featured).slice(0, 4)
    }
  }

  const collectionProducts = getCollectionProducts()

  // Cycle through background presets
  const cycleBackgroundPreset = (direction: "next" | "prev") => {
    if (direction === "next") {
      setBackgroundPreset((prev) => (prev + 1) % backgroundPresets.length)
    } else {
      setBackgroundPreset((prev) => (prev - 1 + backgroundPresets.length) % backgroundPresets.length)
    }
  }

  // Cycle through furniture sets
  const cycleFurnitureSet = (direction: "next" | "prev") => {
    const currentIndex = furnitureSets.findIndex((set) => set.id === furnitureSet)
    if (direction === "next") {
      const nextIndex = (currentIndex + 1) % furnitureSets.length
      setFurnitureSet(furnitureSets[nextIndex].id)
    } else {
      const prevIndex = (currentIndex - 1 + furnitureSets.length) % furnitureSets.length
      setFurnitureSet(furnitureSets[prevIndex].id)
    }
  }

  const currentBackground = backgroundPresets[backgroundPreset]
  const currentFurnitureSetName = furnitureSets.find((set) => set.id === furnitureSet)?.name || "Default"

  return (
    <div className="py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-2">Featured Collection</h2>
          <p className="text-gray-400 max-w-2xl">
            Explore our curated collections of premium furniture pieces, each rendered in stunning 3D to help you
            visualize your perfect space.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm whitespace-nowrap">Background:</span>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => cycleBackgroundPreset("prev")}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="mx-2 text-sm min-w-[100px] text-center">{currentBackground.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => cycleBackgroundPreset("next")}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm whitespace-nowrap">Furniture:</span>
              <div className="flex items-center">
                <Button variant="outline" size="sm" onClick={() => cycleFurnitureSet("prev")} className="h-8 w-8 p-0">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="mx-2 text-sm min-w-[100px] text-center">{currentFurnitureSetName}</span>
                <Button variant="outline" size="sm" onClick={() => cycleFurnitureSet("next")} className="h-8 w-8 p-0">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="trending" value={activeCollection} onValueChange={setActiveCollection}>
        <TabsList className="w-full justify-start mb-8 bg-transparent overflow-x-auto flex-nowrap">
          {collections.map((collection) => (
            <TabsTrigger key={collection.id} value={collection.id} className="text-sm px-4 py-2 whitespace-nowrap">
              {collection.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {collections.map((collection) => (
          <TabsContent key={collection.id} value={collection.id} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {collectionProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group relative bg-gray-950 border border-gray-800 rounded-lg overflow-hidden"
                >
                  <div className="h-[300px] relative">
                    <ProductModelPreview
                      productId={product.id}
                      size="small"
                      backgroundType={currentBackground.type}
                      backgroundVariant={currentBackground.variant}
                      furnitureSet={furnitureSet}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <Link href={/products/${product.id}}>
                          <Button className="w-full bg-white text-black hover:bg-gray-200">View Details</Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <p className="text-gray-400 text-sm">{product.category}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-bold">${product.price.toFixed(2)}</span>
                      {product.oldPrice && (
                        <span className="text-gray-500 line-through text-sm">${product.oldPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/products">
                <Button variant="outline">View All {collection.name} Products</Button>
              </Link>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}