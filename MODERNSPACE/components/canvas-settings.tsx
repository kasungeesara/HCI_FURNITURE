"use client";

import type React from "react";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Trash2 } from "lucide-react";
import type { CanvasType } from "@/types/types";
import { useTheme } from "next-themes";

interface CanvasSettingsProps {
  canvasType: CanvasType;
  canvasColor: string;
  onCanvasTypeChange: (type: CanvasType) => void;
  onCanvasColorChange: (color: string) => void;
  onBackgroundImageChange: (image: string | null) => void;
}

export default function CanvasSettings({
  canvasType,
  canvasColor,
  onCanvasTypeChange,
  onCanvasColorChange,
  onBackgroundImageChange,
}: CanvasSettingsProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { theme } = useTheme();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setPreviewImage(imageUrl);
        onBackgroundImageChange(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    onBackgroundImageChange(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-2 block">Canvas Type</Label>
        <RadioGroup
          value={canvasType}
          onValueChange={(value) => onCanvasTypeChange(value as CanvasType)}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="square" id="square" />
            <Label htmlFor="square">Square</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="rectangle" id="rectangle" />
            <Label htmlFor="rectangle">Rectangle</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="canvas-color" className="mb-2 block">
          Canvas Color
        </Label>
        <div className="flex items-center space-x-2">
          <div
            className="h-8 w-8 rounded-md border border-gray-200 dark:border-gray-700"
            style={{ backgroundColor: canvasColor }}
          />
          <Input
            id="canvas-color"
            type="color"
            value={canvasColor}
            onChange={(e) => onCanvasColorChange(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div>
        <Label className="mb-2 block">Background Image</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              id="background-image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() =>
                document.getElementById("background-image")?.click()
              }
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
            {previewImage && (
              <Button variant="outline" size="icon" onClick={handleRemoveImage}>
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          {previewImage && (
            <div className="relative h-32 w-full overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
              <img
                src={previewImage || "/placeholder.svg"}
                alt="Background preview"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
