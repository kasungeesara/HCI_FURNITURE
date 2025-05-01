"use client"

import { useState, useRef, useEffect } from "react"
import { products } from "@/data/products"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Eye, ShoppingCart, Maximize2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import ProductModelPreview from "./product-model-preview"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export default function FeaturedProducts() {
  const featuredProducts = products.filter((product) => product.featured).slice(0, 6)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeProduct, setActiveProduct] = useState(featuredProducts[0])
  const [isModelVisible, setIsModelVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const { addToCart } = useCart()

  useEffect(() => {
    setActiveProduct(featuredProducts[currentIndex])
  }, [currentIndex, featuredProducts])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? featuredProducts.length - 1 : prev - 1))
  }

  const handleProductClick = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 3D Model Preview */}
        <div className="h-[500px] rounded-lg overflow-hidden bg-gray-950 border border-gray-800 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {isModelVisible && <ProductModelPreview productId={activeProduct.id} />}
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 left-4 right-4 flex justify-between z-10">
            <Button onClick={() => addToCart(activeProduct)} className="bg-white text-black hover:bg-gray-200">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>

            <div className="flex space-x-2">
              <Link href={/products/${activeProduct.id}}>
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </Link>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] h-[600px] p-0">
                  <ProductModelPreview productId={activeProduct.id} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-bold mb-2">{activeProduct.name}</h2>
                <p className="text-gray-400 mb-4">{activeProduct.category}</p>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-2xl font-bold">${activeProduct.price.toFixed(2)}</span>
                  {activeProduct.oldPrice && (
                    <span className="text-xl text-gray-500 line-through">${activeProduct.oldPrice.toFixed(2)}</span>
                  )}
                </div>

                <p className="text-gray-300 mb-8">{activeProduct.description}</p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Premium Materials</h3>
                      <p className="text-sm text-gray-400">Crafted with high-quality, sustainable materials</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Modern Design</h3>
                      <p className="text-sm text-gray-400">Contemporary aesthetics that elevate any space</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">2-Year Warranty</h3>
                      <p className="text-sm text-gray-400">Peace of mind with our comprehensive warranty</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Browse Featured Collection</h3>
            <div className="flex space-x-4 overflow-x-auto pb-2" ref={containerRef}>
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`flex-shrink-0 cursor-pointer transition-all duration-300 ${
                    currentIndex === index
                      ? "opacity-100 scale-105 border-2 border-white"
                      : "opacity-60 hover:opacity-80"
                  }`}
                  onClick={() => handleProductClick(index)}
                >
                  <div className="w-20 h-20 bg-gray-900 rounded-md overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4">
              <Button variant="outline" size="icon" onClick={handlePrev} className="border-gray-800 hover:bg-gray-900">
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon" onClick={handleNext} className="border-gray-800 hover:bg-gray-900">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}