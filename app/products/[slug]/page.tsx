'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import { Product } from '@/lib/types';
import AddToCartButton from '@/app/components/AddToCartButton';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const resolvedParams = await params;
        const response = await fetch(`/api/products/${resolvedParams.slug}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError('Produto não encontrado');
          } else {
            setError('Erro ao buscar produto');
          }
          return;
        }

        const data = await response.json();

        if (data.success) {
          setProduct(data.data);
        } else {
          setError(data.error || 'Erro ao buscar produto');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Erro ao carregar produto. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-8" />
            <div className="h-10 bg-gray-200 rounded mb-4" />
            <div className="h-6 bg-gray-200 rounded mb-8 w-1/3" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        </div>
      </main>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-red-600 text-lg mb-6">{error || 'Produto não encontrado'}</p>
          <Link href="/products" className="text-blue-600 hover:underline font-semibold">
            ← Voltar aos produtos
          </Link>
        </div>
      </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link href="/products" className="text-blue-600 hover:underline font-semibold mb-8 block">
          ← Voltar aos produtos
        </Link>

        {/* Product Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Image */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden h-96 md:h-auto md:min-h-96">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            {/* Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-3xl font-bold text-blue-600 mb-6">
              R$ {(product.price / 100).toFixed(2)}
            </p>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Category Badge */}
            {product.category && (
              <div className="mb-6">
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
              </div>
            )}

            {/* Add to Cart Button */}
            <AddToCartButton product={product} />

            {/* Checkout Button (placeholder) */}
            <button className="w-full border-2 border-blue-600 text-blue-600 py-4 px-6 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors">
              Comprar Agora
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Informações do Produto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">ID do Produto</h3>
              <p className="text-gray-600 text-sm font-mono">{product.id}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Criado em</h3>
              <p className="text-gray-600">
                {new Date(product.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
