"use client"

import type React from "react"

import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react"
import type { FurnitureItem, CanvasType } from "@/types/types"

interface Canvas2DProps {
  canvasType: CanvasType
  canvasColor: string
  backgroundImage: string | null
  furniture: FurnitureItem[]
  selectedFurniture: string | null
  onSelectFurniture: (id: string | null) => void
  onUpdatePosition: (id: string, x: number, y: number) => void
}

export interface Canvas2DRef {
  getCanvasElement: () => HTMLDivElement | null
}

const Canvas2D = forwardRef<Canvas2DRef, Canvas2DProps>(
  (
    { canvasType, canvasColor, backgroundImage, furniture, selectedFurniture, onSelectFurniture, onUpdatePosition },
    ref,
  ) => {
    const canvasRef = useRef<HTMLDivElement>(null)
    const [dragging, setDragging] = useState<string | null>(null)
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
    const [canvasSize, setCanvasSize] = useState({ width: 600, height: 600 })

    // Expose the canvas element to parent components
    useImperativeHandle(ref, () => ({
      getCanvasElement: () => canvasRef.current,
    }))

    // Update canvas size based on type
    useEffect(() => {
      if (canvasType === "square") {
        setCanvasSize({ width: 600, height: 600 })
      } else {
        setCanvasSize({ width: 800, height: 600 })
      }
    }, [canvasType])

    // Handle mouse down on furniture
    const handleMouseDown = (e: React.MouseEvent, furniture: FurnitureItem) => {
      e.stopPropagation()
      onSelectFurniture(furniture.id)
      setDragging(furniture.id)

      const rect = (e.target as HTMLElement).getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    // Handle mouse move for dragging
    const handleMouseMove = (e: React.MouseEvent) => {
      if (!dragging) return

      const canvasRect = canvasRef.current?.getBoundingClientRect()
      if (!canvasRect) return

      const x = e.clientX - canvasRect.left - dragOffset.x
      const y = e.clientY - canvasRect.top - dragOffset.y

      // Ensure furniture stays within canvas bounds
      const item = furniture.find((f) => f.id === dragging)
      if (!item) return

      const boundedX = Math.max(0, Math.min(canvasSize.width - item.width, x))
      const boundedY = Math.max(0, Math.min(canvasSize.height - item.height, y))

      onUpdatePosition(dragging, boundedX, boundedY)
    }

    // Handle mouse up to stop dragging
    const handleMouseUp = () => {
      setDragging(null)
    }

    // Handle canvas click to deselect
    const handleCanvasClick = () => {
      onSelectFurniture(null)
    }

    // Render furniture item
    const renderFurnitureItem = (item: FurnitureItem) => {
      const isSelected = item.id === selectedFurniture

      return (
        <div
          key={item.id}
          className={`absolute cursor-move ${isSelected ? "ring-2 ring-blue-500" : ""}`}
          style={{
            left: `${item.position.x}px`,
            top: `${item.position.y}px`,
            width: `${item.width}px`,
            height: `${item.height}px`,
            backgroundColor: item.color,
            transform: `rotate(${item.rotation}deg)`,
            zIndex: isSelected ? 10 : 1,
          }}
          onMouseDown={(e) => handleMouseDown(e, item)}
        >
          <div className="flex h-full items-center justify-center text-white text-opacity-50">{item.type}</div>
        </div>
      )
    }

    return (
      <div className="h-full w-full overflow-hidden">
        <div
          ref={canvasRef}
          className="relative mx-auto border"
          style={{
            width: `${canvasSize.width}px`,
            height: `${canvasSize.height}px`,
            backgroundColor: canvasColor,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {furniture.map(renderFurnitureItem)}
        </div>
      </div>
    )
  },
)

Canvas2D.displayName = "Canvas2D"

export default Canvas2D
