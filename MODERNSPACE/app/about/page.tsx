import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 dark:from-black/80 to-transparent z-10"></div>
        <Image
          src="/images/moddern6.jpg"
          alt="Modern office with designer furniture"
          fill
          className="object-cover"
          priority
        />
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About ModernSpace
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Redefining furniture shopping with immersive 3D experiences and
              exceptional design.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Founded in 2020, ModernSpace began with a simple vision: to
                transform how people shop for furniture by leveraging
                cutting-edge technology to create immersive, interactive
                experiences.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our founders, a team of furniture designers and tech
                enthusiasts, were frustrated with the traditional furniture
                shopping experience. They believed customers deserved to see
                exactly how pieces would look in their spaces before making
                significant investments.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Today, we're proud to offer a revolutionary platform that
                combines premium furniture with advanced 3D visualization
                technology, allowing you to experience our products in virtual
                reality before they arrive at your doorstep.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/moddern7.jpg"
                alt="ModernSpace founders"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              "To revolutionize furniture shopping by combining exceptional
              design with immersive technology, creating spaces that inspire and
              transform how people live."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Design</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We partner with skilled artisans and use premium materials to
                  create furniture that lasts.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We're committed to sustainable practices and materials in all
                  our products and operations.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We continuously push boundaries with our 3D visualization
                  technology and design approach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the future of furniture shopping with ModernSpace.
            Explore our collection and transform your space today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products">
              <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                Explore Collection
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
