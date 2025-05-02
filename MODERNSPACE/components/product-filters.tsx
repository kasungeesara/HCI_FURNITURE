"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 2000]);

  const categories = [
    { id: "living-room", label: "Living Room" },
    { id: "bedroom", label: "Bedroom" },
    { id: "dining", label: "Dining" },
    { id: "office", label: "Office" },
    { id: "outdoor", label: "Outdoor" },
  ];

  const materials = [
    { id: "wood", label: "Wood" },
    { id: "metal", label: "Metal" },
    { id: "fabric", label: "Fabric" },
    { id: "leather", label: "Leather" },
    { id: "glass", label: "Glass" },
  ];

  const colors = [
    { id: "black", label: "Black", color: "bg-black" },
    { id: "white", label: "White", color: "bg-white" },
    { id: "gray", label: "Gray", color: "bg-gray-500" },
    { id: "brown", label: "Brown", color: "bg-amber-800" },
    { id: "blue", label: "Blue", color: "bg-blue-600" },
  ];

  return (
    <div className="sticky top-20 space-y-6 rounded-lg border border-gray-800 bg-gray-500 p-4">
      <h2 className="text-xl font-semibold">Filters</h2>

      <Accordion
        type="multiple"
        defaultValue={["categories", "price", "materials", "colors"]}
      >
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-medium">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox id={category-${category.id}} />
                  <Label
                    htmlFor={category-${category.id}}
                    className="text-sm font-normal"
                  >
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 2000]}
                max={2000}
                step={50}
                value={priceRange}
                onValueChange={setPriceRange}
                className="py-4"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">${priceRange[0]}</span>
                <span className="text-sm">${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="materials">
          <AccordionTrigger className="text-sm font-medium">
            Materials
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {materials.map((material) => (
                <div key={material.id} className="flex items-center space-x-2">
                  <Checkbox id={material-${material.id}} />
                  <Label
                    htmlFor={material-${material.id}}
                    className="text-sm font-normal"
                  >
                    {material.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="colors">
          <AccordionTrigger className="text-sm font-medium">
            Colors
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <div
                  key={color.id}
                  className="flex flex-col items-center space-y-1"
                >
                  <button
                    className={h-6 w-6 rounded-full ${color.color} border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900}
                    title={color.label}
                  />
                  <span className="text-xs">{color.label}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}