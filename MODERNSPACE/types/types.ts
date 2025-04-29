export type CanvasType = "square" | "rectangle"

export interface Position {
  x: number
  y: number
  z: number
}

export interface FurnitureItem {
  id: string
  type: string
  position: Position
  rotation: number
  color: string
  width: number
  height: number
}
