"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const showcaseItems = [
  {
    id: 1,
    title: "Modern Living Room",
    description:
      "Clean lines and minimalist design for contemporary living spaces.",
    image: "/images/moddern.jpg",
    color: "from-indigo-500/20 to-purple-500/20",
  },
  {
    id: 2,
    title: "Scandinavian Bedroom",
    description:
      "Light, airy spaces with natural materials and functional design.",
    image: "/images/moddern5.jpg",
    color: "from-amber-500/20 to-yellow-500/20",
  },
  {
    id: 3,
    title: "Industrial Office",
    description:
      "Raw materials and utilitarian elements for a productive workspace.",
    image: "/images/moddern3.jpg",
    color: "from-slate-500/20 to-gray-500/20",
  },
  {
    id: 4,
    title: "Mid-Century Dining",
    description: "Retro-inspired furniture with organic forms and bold colors.",
    image: "/images/moddern4.jpg",
    color: "from-emerald-500/20 to-teal-500/20",
  },
];

export default function DesignShowcase() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const next = () => {
    setCurrent((current + 1) % showcaseItems.length);
  };

  const prev = () => {
    setCurrent((current - 1 + showcaseItems.length) % showcaseItems.length);
  };

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(interval);
  }, [current, autoplay]);

  return (
    <div className="relative overflow-hidden bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Design Inspiration</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore curated room designs and get inspired for your next home
            transformation
          </p>
        </div>

        <div className="relative h-[500px] rounded-xl overflow-hidden">
          <AnimatePresence mode="wait">
            {showcaseItems.map(
              (item, index) =>
                index === current && (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                  >
                    <div
                      className={absolute inset-0 bg-gradient-to-r ${item.color} mix-blend-overlay opacity-70}
                    ></div>
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: url(${item.image}) }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <h3 className="text-3xl md:text-4xl font-bold mb-3">
                          {item.title}
                        </h3>
                        <p className="text-lg text-gray-200 mb-6 max-w-lg">
                          {item.description}
                        </p>
                        <Button className="bg-white text-black hover:bg-gray-200">
                          Explore Design
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>

          <div className="absolute bottom-6 right-6 flex space-x-2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full bg-black/50 hover:bg-black/70 border-gray-500"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full bg-black/50 hover:bg-black/70 border-gray-500"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>

          <div className="absolute bottom-6 left-6 z-10">
            <div className="flex space-x-2">
              {showcaseItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === current ? "bg-white scale-125" : "bg-white/50"
                  }`}
                >
                  <span className="sr-only">Go to slide {index + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}