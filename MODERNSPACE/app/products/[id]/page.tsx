"use client"

import { useParams } from "next/navigation"
import { products } from "@/data/products"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Heart, Share2, Truck, RotateCcw, Shield, Maximize2 } from "lucide-react"
import { useCart } from "@/context/cart-context"
import ProductModel from "@/components/product-model"
import RelatedProducts from "@/components/related-products"
import { notFound } from "next/navigation"
import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export default function ProductPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState("details")

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 3D Model Viewer */}
        <div className="relative h-[600px] rounded-lg overflow-hidden bg-gray-950 border border-gray-800">
          <ProductModel productId={product.id} />

          <div className="absolute top-4 right-4 flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-black/50 hover:bg-black/70 transition-colors rounded-full"
                  aria-label="View fullscreen"
                >
                  <Maximize2 className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] max-h-[90vh] w-[1200px] h-[800px] p-0">
                <ProductModel productId={product.id} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-400 mt-2">{product.category}</p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-xl text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>

          <p className="text-gray-300">{product.description}</p>

          <div className="flex flex-wrap gap-4">
            <Button onClick={() => addToCart(product)} className="bg-white text-black hover:bg-gray-200" size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="mr-2 h-5 w-5" />
              Save
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="border-t border-gray-800 pt-6 space-y-4">
            <div className="flex items-start space-x-3">
              <Truck className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <h3 className="font-medium">Free Shipping</h3>
                <p className="text-sm text-gray-400">Free shipping on orders over $100</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <RotateCcw className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <h3 className="font-medium">30-Day Returns</h3>
                <p className="text-sm text-gray-400">Return or exchange within 30 days</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <h3 className="font-medium">2-Year Warranty</h3>
                <p className="text-sm text-gray-400">All our furniture comes with a 2-year warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start border-b border-gray-800 bg-transparent">
            <TabsTrigger value="details" className="text-sm">
              Details & Dimensions
            </TabsTrigger>
            <TabsTrigger value="materials" className="text-sm">
              Materials & Care
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-sm">
              Reviews
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-6">
            <div className="prose prose-invert max-w-none">
              <p>{product.details || "Detailed product information including dimensions and specifications."}</p>
              <ul>
                <li>Width: {product.dimensions?.width || "N/A"}</li>
                <li>Height: {product.dimensions?.height || "N/A"}</li>
                <li>Depth: {product.dimensions?.depth || "N/A"}</li>
                <li>Weight: {product.dimensions?.weight || "N/A"}</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="materials" className="mt-6">
            <div className="prose prose-invert max-w-none">
              <p>{product.materials || "Information about the materials used and care instructions."}</p>
              <h3>Care Instructions</h3>
              <ul>
                <li>Clean with a soft, dry cloth</li>
                <li>Avoid direct sunlight for prolonged periods</li>
                <li>Do not use harsh cleaning chemicals</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <p className="text-gray-400">No reviews yet for this product.</p>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Related Products</h2>
        <RelatedProducts currentProductId={product.id} category={product.category} />
      </div>
    </div>
  )
}
