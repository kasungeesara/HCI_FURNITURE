import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold mb-4">MODERNSPACE</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Curating the finest modern furniture for your living spaces.
              Experience furniture in 3D before you buy.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="/products"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Living Room
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Bedroom
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Dining
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Office
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href=""
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Warranty
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} ModernSpace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}    