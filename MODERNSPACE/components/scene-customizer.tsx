"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sofa, ImageIcon, View } from "lucide-react"

interface SceneCustomizerProps {
  onFurnitureColorChange: (color: string) => void
  onRoomColorChange: (color: string) => void
  onViewChange: (view: "3d" | "2d") => void
  currentView: "3d" | "2d"
}

// Predefined color options
const furnitureColors = [
  { name: "Dark Gray", value: "#334155" },
  { name: "Brown", value: "#78350f" },
  { name: "Navy", value: "#1e3a8a" },
  { name: "Green", value: "#166534" },
  { name: "Beige", value: "#fef3c7" },
]

const roomColors = [
  { name: "White", value: "#f8fafc" },
  { name: "Light Gray", value: "#e2e8f0" },
  { name: "Cream", value: "#fef3c7" },
  { name: "Light Blue", value: "#e0f2fe" },
  { name: "Light Green", value: "#dcfce7" },
]

export default function SceneCustomizer({
  onFurnitureColorChange,
  onRoomColorChange,
  onViewChange,
  currentView,
}: SceneCustomizerProps) {
  const [activeTab, setActiveTab] = useState("furniture")

  return (
    <div className="bg-black/70 text-white rounded-lg backdrop-blur-sm border border-gray-800 overflow-hidden">
      <Tabs defaultValue="furniture" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3 bg-transparent">
          <TabsTrigger value="furniture" className="data-[state=active]:bg-gray-800">
            <Sofa className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Furniture</span>
          </TabsTrigger>
          <TabsTrigger value="room" className="data-[state=active]:bg-gray-800">
            <ImageIcon className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Room</span>
          </TabsTrigger>
          <TabsTrigger value="view" className="data-[state=active]:bg-gray-800">
            <View className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">View</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="furniture" className="p-4 space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Furniture Color</h3>
            <div className="grid grid-cols-5 gap-2">
              {furnitureColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => onFurnitureColorChange(color.value)}
                  className="w-full aspect-square rounded-md border border-gray-700 flex items-center justify-center"
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  <span className="sr-only">{color.name}</span>
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="room" className="p-4 space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Room Background</h3>
            <div className="grid grid-cols-5 gap-2">
              {roomColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => onRoomColorChange(color.value)}
                  className="w-full aspect-square rounded-md border border-gray-700 flex items-center justify-center"
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  <span className="sr-only">{color.name}</span>
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="view" className="p-4 space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">View Mode</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={currentView === "3d" ? "default" : "outline"}
                size="sm"
                onClick={() => onViewChange("3d")}
              >
                3D View
              </Button>
              <Button
                variant={currentView === "2d" ? "default" : "outline"}
                size="sm"
                onClick={() => onViewChange("2d")}
              >
                2D View
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}