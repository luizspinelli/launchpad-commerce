'use client';

import { useState } from 'react';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/store';

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
}

export default function AddToCartButton({
  product,
  quantity = 1,
  className = '',
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);

      // Simulate slight delay for UX feedback
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Add to cart
      addItem(product, quantity);

      // Show notification
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className={`w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {isLoading ? 'Adicionando...' : 'Adicionar ao Carrinho'}
      </button>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse">
          ✅ Produto adicionado ao carrinho!
        </div>
      )}
    </>
  );
}
