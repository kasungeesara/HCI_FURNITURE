"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Share2, Camera, FileJson, FileImage, Check, Copy } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { FurnitureItem, CanvasType } from "@/types/types"

interface ExportPanelProps {
  currentView: "2d" | "3d"
  canvasType: CanvasType
  canvasColor: string
  furniture: FurnitureItem[]
  onExport2D: () => void
  onExport3D: () => void
}

export default function ExportPanel({
  currentView,
  canvasType,
  canvasColor,
  furniture,
  onExport2D,
  onExport3D,
}: ExportPanelProps) {
  const [exportFormat, setExportFormat] = useState<"png" | "jpeg">("png")
  const [exportQuality, setExportQuality] = useState<"high" | "medium" | "low">("high")
  const [showExportSuccess, setShowExportSuccess] = useState(false)
  const [exportedImageUrl, setExportedImageUrl] = useState<string | null>(null)
  const [designName, setDesignName] = useState("My Room Design")
  const [copied, setCopied] = useState(false)

  // Generate JSON data for the current design
  const designData = {
    name: designName,
    timestamp: new Date().toISOString(),
    canvasType,
    canvasColor,
    furniture,
    view: currentView,
  }

  // Handle export button click
  const handleExport = () => {
    if (currentView === "2d") {
      onExport2D()
    } else {
      onExport3D()
    }

    // Simulate successful export
    setTimeout(() => {
      setShowExportSuccess(true)
      // For demo purposes, we're using a placeholder image
      setExportedImageUrl("/placeholder.svg?height=400&width=600")
    }, 500)
  }

  // Handle JSON data download
  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(designData, null, 2))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", ${designName.replace(/\s+/g, "-").toLowerCase()}.json)
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  // Handle copy to clipboard
  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(designData, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Export Design
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Export Room Design</DialogTitle>
            <DialogDescription>Save your design as an image or download the design data</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="image" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="image">
                <FileImage className="mr-2 h-4 w-4" />
                Export as Image
              </TabsTrigger>
              <TabsTrigger value="data">
                <FileJson className="mr-2 h-4 w-4" />
                Export as Data
              </TabsTrigger>
            </TabsList>

            <TabsContent value="image" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="design-name">Design Name</Label>
                  <Input
                    id="design-name"
                    value={designName}
                    onChange={(e) => setDesignName(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Image Format</Label>
                  <RadioGroup
                    value={exportFormat}
                    onValueChange={(value) => setExportFormat(value as "png" | "jpeg")}
                    className="flex space-x-4 mt-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="png" id="png" />
                      <Label htmlFor="png">PNG</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="jpeg" id="jpeg" />
                      <Label htmlFor="jpeg">JPEG</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Quality</Label>
                  <RadioGroup
                    value={exportQuality}
                    onValueChange={(value) => setExportQuality(value as "high" | "medium" | "low")}
                    className="flex space-x-4 mt-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high">High</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low">Low</Label>
                    </div>
                  </RadioGroup>
                </div>

                {showExportSuccess && exportedImageUrl && (
                  <div className="border rounded-md p-4 mt-4">
                    <div className="text-center mb-2 text-green-500 flex items-center justify-center">
                      <Check className="h-5 w-5 mr-2" />
                      <span>Export successful!</span>
                    </div>
                    <div className="relative aspect-video w-full overflow-hidden rounded-md border">
                      <img
                        src={exportedImageUrl || "/placeholder.svg"}
                        alt="Exported design"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <a
                        href={exportedImageUrl}
                        download={${designName.replace(/\s+/g, "-").toLowerCase()}.${exportFormat}}
                        className="text-sm text-blue-500 hover:underline"
                      >
                        Click to download
                      </a>
                    </div>
                  </div>
                )}

                <Button onClick={handleExport} className="w-full">
                  <Camera className="mr-2 h-4 w-4" />
                  Capture {currentView.toUpperCase()} View
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="data" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="design-name-json">Design Name</Label>
                  <Input
                    id="design-name-json"
                    value={designName}
                    onChange={(e) => setDesignName(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="border rounded-md p-2 bg-gray-50 dark:bg-gray-900">
                  <pre className="text-xs overflow-auto max-h-[200px] p-2">{JSON.stringify(designData, null, 2)}</pre>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={handleDownloadJSON} className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download JSON
                  </Button>
                  <Button onClick={handleCopyJSON} variant="outline" className="flex-1">
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy JSON
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-4">
            <Button variant="outline" asChild>
              <DialogTrigger>Close</DialogTrigger>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button variant="outline" className="w-full">
        <Share2 className="mr-2 h-4 w-4" />
        Share Design
      </Button>
    </div>
  )
}