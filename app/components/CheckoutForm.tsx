'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
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

      // Redirect to Stripe checkout
      if (data.sessionId) {
        // For now, just show success message
        // In production, redirect to Stripe checkout URL
        setSuccess(true);
        console.log('✅ Checkout session created:', data.sessionId);

        // TODO: Redirect to Stripe hosted checkout or use Stripe.js
        // window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
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
        <h2 className="text-2xl font-bold text-green-900 mb-2">Sessão de Checkout Criada!</h2>
        <p className="text-green-800 mb-6">
          Em breve você será redirecionado para completar o pagamento com Stripe.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-green-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Voltar
        </button>
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

      {/* Stripe Payment Form Placeholder */}
      <div className="mb-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <p className="text-gray-600 font-semibold mb-2">Formulário de Pagamento Stripe</p>
        <p className="text-sm text-gray-500">
          Integração Stripe.js será adicionada em T3.5
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
        {isProcessing ? '⏳ Processando Pagamento...' : 'Finalizar Compra'}
      </button>

      {/* Security Info */}
      <p className="text-center text-xs text-gray-500 mt-4">
        🔒 Seu pagamento é seguro e processado por Stripe
      </p>
    </form>
  );
}
