'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
        {/* Image Container */}
        <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          {/* Name */}
          <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 text-sm md:text-base">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center justify-between">
            <p className="text-blue-600 font-bold text-lg md:text-xl">
              R$ {(product.price / 100).toFixed(2)}
            </p>
          </div>

          {/* CTA Button */}
          <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm md:text-base">
            Ver Detalhes
          </button>
        </div>
      </div>
    </Link>
  );
}
