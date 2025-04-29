import html2canvas from "html2canvas"
import type { Scene, WebGLRenderer, PerspectiveCamera } from "three"
import type { FurnitureItem } from "@/types/types"

// Function to export 2D canvas as an image
export const export2DView = async (
  canvasElement: HTMLElement | null,
  options: {
    format?: "png" | "jpeg"
    quality?: number
    fileName?: string
  } = {},
): Promise<string | null> => {
  if (!canvasElement) return null

  const { format = "png", quality = 0.95, fileName = "room-design" } = options

  try {
    // Use html2canvas to capture the DOM element
    const canvas = await html2canvas(canvasElement, {
      backgroundColor: null,
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable CORS for images
      logging: false,
    })

    // Convert to data URL
    const dataUrl = canvas.toDataURL(`image/${format}`, quality)

    return dataUrl
  } catch (error) {
    console.error("Error exporting 2D view:", error)
    return null
  }
}

// Function to export 3D view as an image
export const export3DView = (
  renderer: WebGLRenderer | null,
  scene: Scene | null,
  camera: PerspectiveCamera | null,
  options: {
    format?: "png" | "jpeg"
    quality?: number
    fileName?: string
  } = {},
): string | null => {
  if (!renderer || !scene || !camera) return null

  const { format = "png", quality = 0.95, fileName = "room-design-3d" } = options

  try {
    // Render the scene
    renderer.render(scene, camera)

    // Get the data URL from the renderer
    const dataUrl = renderer.domElement.toDataURL(`image/${format}`, quality)

    return dataUrl
  } catch (error) {
    console.error("Error exporting 3D view:", error)
    return null
  }
}

// Function to export design data as JSON
export const exportDesignData = (
  designData: {
    name: string
    canvasType: string
    canvasColor: string
    furniture: FurnitureItem[]
  },
  fileName = "room-design",
): void => {
  try {
    // Convert design data to JSON string
    const jsonString = JSON.stringify(designData, null, 2)

    // Create a Blob with the JSON data
    const blob = new Blob([jsonString], { type: "application/json" })

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob)

    // Create a download link
    const link = document.createElement("a")
    link.href = url
    link.download = `${fileName}.json`

    // Append the link to the document, click it, and remove it
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Release the URL object
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error exporting design data:", error)
  }
}

// Function to import design data from JSON
export const importDesignData = async (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target?.result as string)
        resolve(jsonData)
      } catch (error) {
        reject(new Error("Invalid JSON file"))
      }
    }

    reader.onerror = () => {
      reject(new Error("Error reading file"))
    }

    reader.readAsText(file)
  })
}
