"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sofa, Bed, Square, Coffee, Trash2 } from "lucide-react";
import type { FurnitureItem } from "@/types/types";
import { useTheme } from "next-themes";

interface FurniturePanelProps {
  onAddFurniture: (type: string) => void;
  selectedFurniture: FurnitureItem | null;
  onUpdateColor: (id: string, color: string) => void;
  onRemoveFurniture: (id: string) => void;
}

// Predefined color palettes for light and dark modes
const colorPalettes = {
  light: [
    "#8B4513", // Wood Brown
    "#A0522D", // Sienna
    "#D2B48C", // Tan
    "#DEB887", // Burlywood
    "#CD853F", // Peru
    "#F5DEB3", // Wheat
  ],
  dark: [
    "#3E2723", // Dark Brown
    "#5D4037", // Brown
    "#4E342E", // Brown 800
    "#6D4C41", // Brown 600
    "#795548", // Brown 500
    "#8D6E63", // Brown 400
  ],
};

export default function FurniturePanel({
  onAddFurniture,
  selectedFurniture,
  onUpdateColor,
  onRemoveFurniture,
}: FurniturePanelProps) {
  const { theme } = useTheme();

  // Determine which color palette to use based on theme
  const currentPalette =
    theme === "dark" ? colorPalettes.dark : colorPalettes.light;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center p-6"
          onClick={() => onAddFurniture("sofa")}
        >
          <Sofa className="mb-1 h-8 w-8" />
          <span>Sofa</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center p-6"
          onClick={() => onAddFurniture("chair")}
        >
          <Square className="mb-1 h-8 w-8" />
          <span>Chair</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center p-6"
          onClick={() => onAddFurniture("table")}
        >
          <Coffee className="mb-1 h-8 w-8" />
          <span>Table</span>
        </Button>
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center p-6"
          onClick={() => onAddFurniture("bed")}
        >
          <Bed className="mb-1 h-8 w-8" />
          <span>Bed</span>
        </Button>
      </div>

      {selectedFurniture && (
        <>
          <Separator />
          <div className="space-y-4">
            <h3 className="font-medium">Selected Furniture</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {selectedFurniture.type}
            </p>

            <div>
              <Label htmlFor="furniture-color" className="mb-2 block">
                Color
              </Label>
              <div className="flex items-center space-x-2 mb-4">
                <div
                  className="h-8 w-8 rounded-md border"
                  style={{ backgroundColor: selectedFurniture.color }}
                />
                <Input
                  id="furniture-color"
                  type="color"
                  value={selectedFurniture.color}
                  onChange={(e) =>
                    onUpdateColor(selectedFurniture.id, e.target.value)
                  }
                  className="w-full"
                />
              </div>

              {/* Color palette */}
              <div className="mt-2">
                <Label className="mb-2 block text-sm">Color Presets</Label>
                <div className="flex flex-wrap gap-2">
                  {currentPalette.map((color, index) => (
                    <button
                      key={index}
                      className={`w-8 h-8 rounded-md border transition-all ${
                        selectedFurniture.color === color
                          ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50"
                          : "border-gray-200 dark:border-gray-800"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => onUpdateColor(selectedFurniture.id, color)}
                      title={Color ${index + 1}}
                    />
                  ))}
                </div>
              </div>
            </div>

            <Button
              variant="destructive"
              className="w-full"
              onClick={() => onRemoveFurniture(selectedFurniture.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Furniture
            </Button>
          </div>
        </>
      )}
    </div>
  );
}