'use client';

import { useState } from 'react';
import { CartItem } from '@/lib/store';

interface CheckoutFormProps {
  items: CartItem[];
  total: number;
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
}

export default function CheckoutForm({
  items,
  total,
  isProcessing,
  setIsProcessing,
}: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setIsProcessing(true);

      // Validate form
      if (!formData.name || !formData.email) {
        throw new Error('Por favor, preencha todos os campos');
      }

      // Create checkout session
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.id,
            productName: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          customerEmail: formData.email,
          customerName: formData.name,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Erro ao criar sessão de pagamento');
      }

      // Redirect to Stripe hosted checkout
      if (data.sessionId) {
        setSuccess(true);
        console.log('✅ Checkout session created:', data.sessionId);

        // Redirect to Stripe Checkout in 2 seconds
        setTimeout(() => {
          window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
        }, 2000);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Erro ao processar pagamento');
    } finally {
      setIsProcessing(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-green-900 mb-2">Redirecionando para Stripe...</h2>
        <p className="text-green-800 mb-6">
          Você será redirecionado em breve para completar o pagamento de forma segura.
        </p>
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold mb-6">Informações de Pagamento</h2>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Name Field */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
          Nome Completo
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          disabled={isProcessing}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          placeholder="João Silva"
          required
        />
      </div>

      {/* Email Field */}
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isProcessing}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          placeholder="seu.email@example.com"
          required
        />
      </div>

      {/* Stripe Info */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          🔒 Você será redirecionado para o checkout seguro do Stripe para completar o pagamento.
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isProcessing}
        className={`w-full py-3 px-4 rounded-lg font-bold text-lg text-white transition-colors ${
          isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
        }`}
      >
        {isProcessing ? '⏳ Processando...' : 'Ir para Stripe Checkout'}
      </button>

      {/* Security Info */}
      <p className="text-center text-xs text-gray-500 mt-4">
        🔒 Seu pagamento é 100% seguro e processado por Stripe
      </p>
    </form>
  );
}
