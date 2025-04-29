import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider as ShadcnThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { CartProvider } from "@/context/cart-context";
import { ThemeProvider } from "@/context/theme-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Modern Furniture | 3D Shopping Experience",
  description: "Explore our collection of modern furniture in 3D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ShadcnThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ThemeProvider>
            <CartProvider>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="flex-1">{children}</div>
                <Footer />
              </div>
            </CartProvider>
          </ThemeProvider>
        </ShadcnThemeProvider>
      </body>
    </html>
  );
}
