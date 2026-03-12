'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import { useCart } from '@/lib/store';
import CheckoutForm from '@/app/components/CheckoutForm';

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const total = getTotal();
  const formattedTotal = (total / 100).toFixed(2);

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Carrinho Vazio</h1>
          <p className="text-gray-600 mb-6">Você não tem produtos no carrinho.</p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Ver Produtos
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
        {/* Header */}
        <div className="mb-8">
          <Link href="/products" className="text-blue-600 hover:underline font-semibold">
            ← Voltar aos Produtos
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Finalizar Compra</h1>
        </div>

        {/* Two Column Layout - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Summary - Left Column */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden sticky top-20">
              {/* Header */}
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Resumo do Pedido</h2>
              </div>

              {/* Items */}
              <div className="px-6 py-4 space-y-4 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm lg:text-base leading-tight">
                          {item.name}
                        </p>
                        <p className="text-xs lg:text-sm text-gray-600 mt-1">
                          {item.quantity}x • R$ {(item.price / 100).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 ml-2">
                        <p className="font-semibold text-gray-900 text-sm lg:text-base whitespace-nowrap">
                          R$ {((item.price * item.quantity) / 100).toFixed(2)}
                        </p>
                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => useCart.getState().removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded p-1.5 transition-colors"
                          title="Remover item"
                          aria-label={`Remover ${item.name}`}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700 text-sm font-medium">Subtotal</span>
                  <span className="text-gray-900 font-semibold">R$ {formattedTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 text-sm font-medium">Frete</span>
                  <span className="text-green-600 font-semibold">Grátis</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="bg-blue-50 border-t border-blue-200 px-6 py-5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold text-base">Total a Pagar</span>
                  <span className="text-3xl lg:text-4xl font-bold text-blue-600">
                    R$ {formattedTotal}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form - Right Column */}
          <div className="lg:col-span-2">
            <CheckoutForm
              items={items}
              total={total}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
            />
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
