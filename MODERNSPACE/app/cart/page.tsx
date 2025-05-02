"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [promoCode, setPromoCode] = useState("");

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart is Empty</h1>
        <p className="text-gray-400 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link href="/products">
          <Button className="bg-gray-400 text-black hover:bg-gray-200">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-gray-800 overflow-hidden">
            <div className="bg-gray-500 p-4 border-b border-gray-800">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <h3 className="font-medium">Product</h3>
                </div>
                <div className="col-span-2 text-center">
                  <h3 className="font-medium">Price</h3>
                </div>
                <div className="col-span-2 text-center">
                  <h3 className="font-medium">Quantity</h3>
                </div>
                <div className="col-span-2 text-right">
                  <h3 className="font-medium">Total</h3>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-800">
              {cart.map((item) => (
                <div key={item.id} className="p-4">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-900">
                          <Image
                            src={item.image || ""}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-400">
                            {item.category}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="mt-1 flex items-center text-sm text-gray-400 hover:text-white"
                          >
                            <Trash2 className="mr-1 h-3 w-3" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-center">
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="h-8 w-8 rounded-full border border-gray-800 flex items-center justify-center"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="mx-2 w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="h-8 w-8 rounded-full border border-gray-800 flex items-center justify-center"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="col-span-2 text-right">
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-lg border border-gray-800 bg-gray-500 p-6">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 rounded-md border border-gray-800 bg-gray-900 px-3 py-2 text-sm"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline" size="sm">
                    Apply
                  </Button>
                </div>
              </div>

              <Button className="w-full bg-white text-black hover:bg-gray-200">
                Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
