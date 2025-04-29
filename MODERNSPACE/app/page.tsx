"use client"

import { useState, useRef, useEffect } from "react"
import CanvasSettings from "@/components/canvas-settings"
import FurniturePanel from "@/components/furniture-panel"
import Canvas2D, { type Canvas2DRef } from "@/components/canvas-2d"
import Canvas3D, { type Canvas3DRef } from "@/components/canvas-3d"
import DesignShowcase from "@/components/design-showcase"
import ExportPanel from "@/components/export-panel"
import FloorCustomizer, { type FloorSettings } from "@/components/floor-customizer"
import { Button } from "@/components/ui/button"
import { View, CuboidIcon as Cube, Grid3X3 } from "lucide-react"
import type { FurnitureItem, CanvasType } from "@/types/types"
import { export2DView } from "@/utils/export-utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useTheme } from "next-themes"

export default function Home() {
  // Get current theme
  const { theme } = useTheme()

  // Canvas state
  const [canvasType, setCanvasType] = useState<CanvasType>("square")
  const [canvasColor, setCanvasColor] = useState(theme === "dark" ? "#1f1f1f" : "#f5f5f5")
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)

  // Furniture state
  const [furniture, setFurniture] = useState<FurnitureItem[]>([])
  const [selectedFurniture, setSelectedFurniture] = useState<string | null>(null)

  // View state
  const [currentView, setCurrentView] = useState<"2d" | "3d">("2d")

  // Floor settings state
  const [floorSettings, setFloorSettings] = useState<FloorSettings>({
    textureType: "wood",
    color: theme === "dark" ? "#3E2723" : "#8B4513",
    pattern: "none",
    rotation: 0,
    scale: 1,
    roughness: 0.5,
    metalness: 0.1,
  })

  // Update canvas color and floor settings when theme changes
  useEffect(() => {
    setCanvasColor(theme === "dark" ? "#1f1f1f" : "#f5f5f5")

    // Only update floor color if it's the default color
    if (floorSettings.color === "#3E2723" || floorSettings.color === "#8B4513") {
      setFloorSettings((prev) => ({
        ...prev,
        color: theme === "dark" ? "#3E2723" : "#8B4513",
      }))
    }
  }, [theme, floorSettings.color])

  // Refs for canvas components
  const canvas2DRef = useRef<Canvas2DRef>(null)
  const canvas3DRef = useRef<Canvas3DRef>(null)

  // Add furniture to canvas
  const addFurniture = (type: string) => {
    const newFurniture: FurnitureItem = {
      id: `furniture-${Date.now()}`,
      type,
      position: { x: 50, y: 50, z: 0 },
      rotation: 0,
      color: theme === "dark" ? "#5D4037" : "#8B4513", // Adjust default color based on theme
      width: type === "sofa" ? 120 : type === "bed" ? 150 : 80,
      height: type === "sofa" ? 60 : type === "bed" ? 200 : 80,
    }

    setFurniture([...furniture, newFurniture])
    setSelectedFurniture(newFurniture.id)
  }

  // Update furniture position
  const updateFurniturePosition = (id: string, x: number, y: number) => {
    setFurniture(furniture.map((item) => (item.id === id ? { ...item, position: { ...item.position, x, y } } : item)))
  }

  // Update furniture color
  const updateFurnitureColor = (id: string, color: string) => {
    setFurniture(furniture.map((item) => (item.id === id ? { ...item, color } : item)))
  }

  // Remove furniture
  const removeFurniture = (id: string) => {
    setFurniture(furniture.filter((item) => item.id !== id))
    if (selectedFurniture === id) {
      setSelectedFurniture(null)
    }
  }

  // Get selected furniture item
  const getSelectedFurnitureItem = () => {
    return furniture.find((item) => item.id === selectedFurniture) || null
  }

  // Handle export of 2D view
  const handleExport2D = async () => {
    if (canvas2DRef.current) {
      const canvasElement = canvas2DRef.current.getCanvasElement()
      if (canvasElement) {
        try {
          const dataUrl = await export2DView(canvasElement, {
            format: "png",
            quality: 0.95,
            fileName: "room-design-2d",
          })

          if (dataUrl) {
            // Create a link to download the image
            const link = document.createElement("a")
            link.href = dataUrl
            link.download = "room-design-2d.png"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          }
        } catch (error) {
          console.error("Error exporting 2D view:", error)
        }
      }
    }
  }

  // Handle export of 3D view
  const handleExport3D = () => {
    if (canvas3DRef.current) {
      const dataUrl = canvas3DRef.current.takeScreenshot({
        format: "png",
        quality: 0.95,
      })

      if (dataUrl) {
        // Create a link to download the image
        const link = document.createElement("a")
        link.href = dataUrl
        link.download = "room-design-3d.png"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Design Showcase Carousel */}
      <DesignShowcase />

      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Room Designer</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant={currentView === "2d" ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentView("2d")}
            >
              <View className="mr-2 h-4 w-4" />
              2D View
            </Button>
            <Button
              variant={currentView === "3d" ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentView("3d")}
            >
              <Cube className="mr-2 h-4 w-4" />
              3D View
            </Button>

            {currentView === "3d" && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Grid3X3 className="mr-2 h-4 w-4" />
                    Floor Options
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px] bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
                  <DialogHeader>
                    <DialogTitle>Customize Floor</DialogTitle>
                  </DialogHeader>
                  <div className="py-4 max-h-[70vh] overflow-y-auto">
                    <FloorCustomizer
                      settings={floorSettings}
                      onSettingsChange={(newSettings) => {
                        console.log("Floor settings updated:", newSettings)
                        setFloorSettings(newSettings)
                      }}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto flex flex-1 gap-4 p-4">
        <div className="w-64 space-y-4">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Canvas Settings</h2>
              <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </div>
            </div>
            <div className="p-1">
              <CanvasSettings
                canvasType={canvasType}
                canvasColor={canvasColor}
                onCanvasTypeChange={setCanvasType}
                onCanvasColorChange={setCanvasColor}
                onBackgroundImageChange={setBackgroundImage}
              />
            </div>
          </div>

          <div className="rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-950 p-5 shadow-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-8 w-8 rounded-md bg-amber-600 flex items-center justify-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 9V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"></path>
                  <path d="M3 16V9"></path>
                  <path d="M21 9v7"></path>
                  <path d="M3 16H21"></path>
                  <path d="M8 16v4"></path>
                  <path d="M16 16v4"></path>
                </svg>
              </div>
              <h2 className="text-lg font-bold">Furniture Library</h2>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-md p-3 shadow-inner">
              <FurniturePanel
                onAddFurniture={addFurniture}
                selectedFurniture={getSelectedFurnitureItem()}
                onUpdateColor={updateFurnitureColor}
                onRemoveFurniture={removeFurniture}
              />
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Export & Share</h2>
              <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </div>
            </div>
            <div className="p-1">
              <ExportPanel
                currentView={currentView}
                canvasType={canvasType}
                canvasColor={canvasColor}
                furniture={furniture}
                onExport2D={handleExport2D}
                onExport3D={handleExport3D}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 shadow-sm">
          {currentView === "2d" ? (
            <Canvas2D
              ref={canvas2DRef}
              canvasType={canvasType}
              canvasColor={canvasColor}
              backgroundImage={backgroundImage}
              furniture={furniture}
              selectedFurniture={selectedFurniture}
              onSelectFurniture={setSelectedFurniture}
              onUpdatePosition={updateFurniturePosition}
            />
          ) : (
            <Canvas3D
              ref={canvas3DRef}
              canvasType={canvasType}
              canvasColor={canvasColor}
              backgroundImage={backgroundImage}
              furniture={furniture}
              selectedFurniture={selectedFurniture}
              onSelectFurniture={setSelectedFurniture}
              onUpdatePosition={updateFurniturePosition}
              floorSettings={floorSettings}
            />
          )}
        </div>
      </div>
    </main>
  )
}
