"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { useTheme } from "next-themes";

export interface FloorSettings {
  textureType: string;
  color: string;
  pattern: string;
  rotation: number;
  scale: number;
  roughness: number;
  metalness: number;
}

interface FloorCustomizerProps {
  settings: FloorSettings;
  onSettingsChange: (settings: FloorSettings) => void;
}

// Floor texture options
const floorTextures = [
  { id: "wood", name: "Wood", thumbnail: "/images/wood.jpg" },
  {
    id: "tile",
    name: "Tile",
    thumbnail: "/images/tile.jpg",
  },
  {
    id: "carpet",
    name: "Carpet",
    thumbnail: "/images/carpet.jpg",
  },
  {
    id: "marble",
    name: "Marble",
    thumbnail: "/images/marbel.jpg",
  },
  {
    id: "concrete",
    name: "Concrete",
    thumbnail: "/images/con.jpg",
  },
  {
    id: "none",
    name: "None",
    thumbnail: "",
  },
];

// Floor pattern options
const floorPatterns = [
  { id: "none", name: "None" },
  { id: "checkerboard", name: "Checkerboard" },
  { id: "herringbone", name: "Herringbone" },
  { id: "diagonal", name: "Diagonal" },
  { id: "grid", name: "Grid" },
];

// Predefined color palettes for light and dark modes
const colorPalettes = {
  light: [
    "#8B4513", // Wood Brown
    "#D2B48C", // Tan
    "#A0522D", // Sienna
    "#F5F5DC", // Beige
    "#E6E6FA", // Lavender
    "#F0E68C", // Khaki
  ],
  dark: [
    "#3E2723", // Dark Brown
    "#5D4037", // Brown
    "#212121", // Almost Black
    "#424242", // Dark Gray
    "#263238", // Blue Gray
    "#37474F", // Dark Blue Gray
  ],
};

export default function FloorCustomizer({
  settings,
  onSettingsChange,
}: FloorCustomizerProps) {
  const [localSettings, setLocalSettings] = useState<FloorSettings>(settings);
  const { theme } = useTheme();

  // Update local settings when props change
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  // Update parent component when local settings change
  const updateSettings = (newSettings: Partial<FloorSettings>) => {
    const updatedSettings = { ...localSettings, ...newSettings };
    setLocalSettings(updatedSettings);
    onSettingsChange(updatedSettings);
  };

  // Determine which color palette to use based on theme
  const currentPalette =
    theme === "dark" ? colorPalettes.dark : colorPalettes.light;

  return (
    <div className="space-y-6">
      {/* Texture Selection */}
      <div>
        <Label className="mb-2 block">Floor Material</Label>
        <div className="grid grid-cols-3 gap-2">
          {floorTextures.map((texture) => (
            <div key={texture.id} className="text-center">
              <button
                className={`relative w-full aspect-square rounded-md overflow-hidden border-2 transition-all ${
                  localSettings.textureType === texture.id
                    ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50"
                    : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                }`}
                onClick={() => updateSettings({ textureType: texture.id })}
              >
                <img
                  src={texture.thumbnail || "/placeholder.svg"}
                  alt={texture.name}
                  className="w-full h-full object-cover"
                />
                {localSettings.textureType === texture.id && (
                  <div className="absolute top-1 right-1 bg-blue-500 rounded-full p-0.5">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </button>
              <span className="text-xs mt-1 block">{texture.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <Label htmlFor="floor-color" className="mb-2 block">
          Floor Color
        </Label>
        <div className="flex items-center space-x-2 mb-4">
          <div
            className="h-8 w-8 rounded-md border"
            style={{ backgroundColor: localSettings.color }}
          />
          <Input
            id="floor-color"
            type="color"
            value={localSettings.color}
            onChange={(e) => updateSettings({ color: e.target.value })}
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
                  localSettings.color === color
                    ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50"
                    : "border-gray-200 dark:border-gray-800"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => updateSettings({ color })}
                title={Color ${index + 1}}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pattern Selection */}
      <div>
        <Label className="mb-2 block">Floor Pattern</Label>
        <RadioGroup
          value={localSettings.pattern}
          onValueChange={(value) => updateSettings({ pattern: value })}
          className="grid grid-cols-2 gap-2"
        >
          {floorPatterns.map((pattern) => (
            <div key={pattern.id} className="flex items-center space-x-2">
              <RadioGroupItem value={pattern.id} id={pattern-${pattern.id}} />
              <Label htmlFor={pattern-${pattern.id}}>{pattern.name}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Scale and Rotation */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="scale">Pattern Scale</Label>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {localSettings.scale.toFixed(1)}x
            </span>
          </div>
          <Slider
            id="scale"
            min={0.5}
            max={5}
            step={0.1}
            value={[localSettings.scale]}
            onValueChange={(value) => updateSettings({ scale: value[0] })}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="rotation">Pattern Rotation</Label>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {localSettings.rotation}°
            </span>
          </div>
          <Slider
            id="rotation"
            min={0}
            max={360}
            step={15}
            value={[localSettings.rotation]}
            onValueChange={(value) => updateSettings({ rotation: value[0] })}
          />
        </div>
      </div>

      {/* Material Properties */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
        <h3 className="text-sm font-medium mb-4">Material Properties</h3>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="roughness">Roughness</Label>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {localSettings.roughness.toFixed(2)}
              </span>
            </div>
            <Slider
              id="roughness"
              min={0}
              max={1}
              step={0.01}
              value={[localSettings.roughness]}
              onValueChange={(value) => updateSettings({ roughness: value[0] })}
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Glossy</span>
              <span>Matte</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="metalness">Reflectivity</Label>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {localSettings.metalness.toFixed(2)}
              </span>
            </div>
            <Slider
              id="metalness"
              min={0}
              max={1}
              step={0.01}
              value={[localSettings.metalness]}
              onValueChange={(value) => updateSettings({ metalness: value[0] })}
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Non-metallic</span>
              <span>Metallic</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="rounded-md bg-gray-50 dark:bg-gray-900 p-3">
          <h4 className="text-sm font-medium mb-2">Preview</h4>
          <div
            className="h-24 w-full rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden"
            style={{
              backgroundColor: localSettings.color,
              position: "relative",
            }}
          >
            {/* Pattern overlay */}
            <div
              className="absolute inset-0"
              style={{
                backgroundSize: ${localSettings.scale * 25}%,
                transform: rotate(${localSettings.rotation}deg),
                backgroundImage:
                  localSettings.pattern === "checkerboard"
                    ? "linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%), linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%)"
                    : localSettings.pattern === "grid"
                    ? "linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)"
                    : localSettings.pattern === "diagonal"
                    ? "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)"
                    : localSettings.pattern === "herringbone"
                    ? "linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%), linear-gradient(-45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%)"
                    : "none",
                backgroundPosition:
                  localSettings.pattern === "checkerboard"
                    ? "0 0, 10px 10px"
                    : "0 0",
                opacity: 0.8,
              }}
            />

            {/* Texture overlay */}
            {localSettings.textureType !== "none" && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: url(/placeholder.svg?height=100&width=100&text=${localSettings.textureType}),
                  backgroundSize: ${localSettings.scale * 50}%,
                  backgroundRepeat: "repeat",
                  transform: rotate(${localSettings.rotation}deg),
                  opacity: 0.3,
                  mixBlendMode: "multiply",
                }}
              />
            )}

            {/* Lighting effect based on roughness/metalness */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,${
                  0.7 - localSettings.roughness * 0.5
                }), transparent 70%)`,
                opacity:
                  0.8 -
                  localSettings.roughness * 0.3 +
                  localSettings.metalness * 0.3,
              }}
            />
          </div>
        </div>
      </div>

      {/* Reset button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={() =>
            updateSettings({
              roughness: 0.5,
              metalness: 0.1,
              scale: 1,
              rotation: 0,
              pattern: "none",
            })
          }
        >
          Reset Settings
        </Button>
      </div>
    </div>
  );
}