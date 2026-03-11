'use client';

import Link from 'next/link';
import { useCart } from '@/lib/store';

export default function Navbar() {
  const { items } = useCart();
  const cartCount = items.length;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Home Link */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-900 hover:text-blue-700 transition-colors">
              LaunchPad
            </h1>
          </Link>

          {/* Right Section: Cart + CTA Button */}
          <div className="flex items-center gap-4">
            {/* Shopping Cart Icon */}
            <Link
              href="/checkout"
              className="relative flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Ver carrinho"
            >
              <svg
                className="w-6 h-6 text-gray-700"
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
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* CTA Button */}
            <Link
              href="/products"
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors inline-block whitespace-nowrap"
            >
              Começar Grátis
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
