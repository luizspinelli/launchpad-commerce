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
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
  }>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear field error when user starts typing
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: typeof fieldErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      errors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 3) {
      errors.name = 'Nome deve ter pelo menos 3 caracteres';
    }

    // Validate email
    if (!formData.email.trim()) {
      errors.email = 'Email é obrigatório';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Email inválido';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setIsProcessing(true);

      // Validate form
      if (!validateForm()) {
        setIsProcessing(false);
        return;
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
        const checkoutUrl = `https://checkout.stripe.com/pay/${data.sessionId}`;
        console.log('✅ Checkout session created:', data.sessionId);
        console.log('🔗 Redirecting to:', checkoutUrl);

        // Log session ID details for debugging
        console.log('📊 Session ID Details:', {
          sessionId: data.sessionId,
          length: data.sessionId.length,
          startsWithCsTest: data.sessionId.startsWith('cs_test_'),
          checkoutUrl: checkoutUrl,
        });

        // Redirect to Stripe Checkout in 2 seconds
        setTimeout(() => {
          window.location.href = checkoutUrl;
        }, 2000);
      } else {
        throw new Error('Nenhum ID de sessão retornado do servidor');
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Informações de Pagamento</h2>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Name Field */}
      <div className="mb-5">
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
          className={`w-full lg:max-w-md px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            isProcessing
              ? 'bg-gray-100 text-gray-600 cursor-not-allowed border-gray-300'
              : fieldErrors.name
                ? 'border-red-500 focus:ring-red-500 bg-white'
                : 'border-gray-300 focus:ring-blue-500 bg-white text-gray-900'
          }`}
          placeholder="João Silva"
        />
        {fieldErrors.name && <p className="text-red-600 text-sm mt-2">{fieldErrors.name}</p>}
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
          className={`w-full lg:max-w-md px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            isProcessing
              ? 'bg-gray-100 text-gray-600 cursor-not-allowed border-gray-300'
              : fieldErrors.email
                ? 'border-red-500 focus:ring-red-500 bg-white'
                : 'border-gray-300 focus:ring-blue-500 bg-white text-gray-900'
          }`}
          placeholder="seu.email@example.com"
        />
        {fieldErrors.email && <p className="text-red-600 text-sm mt-2">{fieldErrors.email}</p>}
      </div>

      {/* Stripe Redirect Warning */}
      <div className="mb-6 bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          🔒 <strong>Redirecionamento Seguro:</strong> Você será levado para o checkout seguro do Stripe.
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isProcessing}
        className={`w-full lg:w-auto lg:px-8 py-3.5 px-6 rounded-lg font-bold text-base lg:text-lg text-white transition-all duration-200 shadow-md hover:shadow-lg ${
          isProcessing
            ? 'bg-gray-400 cursor-not-allowed opacity-75'
            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
        }`}
      >
        {isProcessing ? (
          <>
            <span className="inline-block animate-spin mr-2">⏳</span>
            Processando...
          </>
        ) : (
          '💳 Finalizar Compra'
        )}
      </button>

      {/* Security Info */}
      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
        <p className="text-sm text-green-800 font-medium">
          ✅ Pagamento <strong>100% seguro</strong> via Stripe
        </p>
      </div>
    </form>
  );
}
