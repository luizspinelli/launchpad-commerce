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
          <h1 className="text-4xl font-bold mt-4">Finalizar Compra</h1>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Summary - Left Column */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-20">
              <h2 className="text-2xl font-bold mb-4">Resumo do Pedido</h2>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">R$ {((item.price * item.quantity) / 100).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mb-4" />

              {/* Total */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>R$ {formattedTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Frete</span>
                  <span>Grátis</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mb-4" />

              {/* Grand Total */}
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>R$ {formattedTotal}</span>
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
