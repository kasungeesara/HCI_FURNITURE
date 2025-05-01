"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { ShoppingCart, Eye, Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ProductModelPreview from "./product-model-preview";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-lg bg-gray-500 border border-gray-900 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square overflow-hidden">
        {isHovered ? (
          <div className="h-full w-full">
            <ProductModelPreview productId={product.id} size="small" />
          </div>
        ) : (
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={500}
            height={500}
            className="h-full w-full object-cover transition-transform duration-500"
          />
        )}
      </div>

      {/* Quick actions overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex gap-2">
          <Link href={/products/${product.id}}>
            <Button variant="secondary" size="sm" className="rounded-full">
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
          </Link>
          <Button
            onClick={() => addToCart(product)}
            className="rounded-full bg-white text-black hover:bg-gray-200"
            size="sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-full">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] h-[600px] p-0">
              <ProductModelPreview productId={product.id} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-lg">{product.name}</h3>
        <p className="text-gray-400 text-sm">{product.category}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold">${product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="text-gray-500 line-through text-sm">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}