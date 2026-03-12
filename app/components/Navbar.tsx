'use client';

import Link from 'next/link';
import { useCart } from '@/lib/store';

export default function Navbar() {
  const { items } = useCart();
  const cartCount = items.length;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Left: Logo + Nav Links */}
          <div className="flex items-center gap-8">
            {/* Logo / Home Link */}
            <Link href="/" className="flex-shrink-0 group">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                LaunchPad
              </h1>
            </Link>

            {/* Navigation Links - Hidden on Mobile */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/products"
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200"
              >
                Produtos
              </Link>
            </div>
          </div>

          {/* Right Section: Cart + CTA Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Shopping Cart Icon */}
            <Link
              href="/checkout"
              className="relative p-2 sm:p-3 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
              title="Ver carrinho"
              aria-label={`Carrinho (${cartCount} itens)`}
            >
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700 group-hover:text-blue-600 transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>

              {/* Cart Count Badge */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 text-xs sm:text-sm font-bold leading-none text-white bg-red-600 rounded-full shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* CTA Button - Responsive */}
            <Link
              href="/products"
              className="px-3 sm:px-6 py-2 sm:py-2.5 bg-blue-600 text-white text-sm sm:text-base rounded-full font-semibold hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-md hover:shadow-lg inline-flex items-center gap-2 whitespace-nowrap"
            >
              <span>🛍️</span>
              <span className="hidden sm:inline">Explorar</span>
              <span className="sm:hidden">Shop</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
