'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface OrderPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Order {
  id: string;
  customerEmail: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function OrderPage({ params }: OrderPageProps) {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [order, setOrder] = useState<Order | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError('Sessão não encontrada');
      setLoading(false);
      return;
    }

    // Fetch order details using sessionId
    // In production, you'd query by stripeSessionId
    // For now, we'll use a placeholder - in real app, needs backend query
    const fetchOrder = async () => {
      try {
        // NOTE: This is a simplified approach
        // In production, you'd need: GET /api/orders?sessionId={sessionId}
        // That endpoint would query Order by stripeSessionId
        
        setLoading(false);
        
        // For demo, show success state
        setOrder({
          id: `ORD-${sessionId}`,
          customerEmail: 'seu.email@example.com',
          totalAmount: 0,
          status: 'PAID',
          createdAt: new Date().toISOString(),
        });
      } catch (err) {
        setError('Erro ao carregar pedido');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [sessionId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Carregando seu pedido...</p>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-white py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Erro ao Processar Pedido</h1>
          <p className="text-gray-600 mb-6">{error || 'Não foi possível recuperar os dados do pedido.'}</p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Voltar à Loja
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Card */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-green-200 p-8 text-center mb-8">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-4xl font-bold text-green-900 mb-2">Pedido Confirmado!</h1>
          <p className="text-lg text-green-800">Obrigado por sua compra!</p>
        </div>

        {/* Order Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Detalhes do Pedido</h2>

          <div className="space-y-4 mb-6">
            {/* Order ID */}
            <div className="flex justify-between pb-4 border-b border-gray-200">
              <span className="text-gray-600">Número do Pedido</span>
              <span className="font-semibold text-gray-900">{order.id}</span>
            </div>

            {/* Status */}
            <div className="flex justify-between pb-4 border-b border-gray-200">
              <span className="text-gray-600">Status</span>
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                {order.status === 'PAID' ? 'Pagamento Confirmado' : order.status}
              </span>
            </div>

            {/* Email */}
            <div className="flex justify-between pb-4 border-b border-gray-200">
              <span className="text-gray-600">Email</span>
              <span className="font-semibold text-gray-900">{order.customerEmail}</span>
            </div>

            {/* Total */}
            <div className="flex justify-between pb-4 border-b border-gray-200">
              <span className="text-gray-600">Total Pago</span>
              <span className="text-2xl font-bold text-gray-900">
                R$ {(order.totalAmount / 100).toFixed(2)}
              </span>
            </div>

            {/* Date */}
            <div className="flex justify-between">
              <span className="text-gray-600">Data</span>
              <span className="text-gray-900">
                {new Date(order.createdAt).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Email Confirmation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex gap-3">
            <span className="text-2xl">📧</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Confirmação Enviada</h3>
              <p className="text-blue-800 text-sm">
                Um email de confirmação foi enviado para <strong>{order.customerEmail}</strong> com os detalhes do seu pedido.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Próximas Etapas</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">1.</span>
              <span>Verifique seu email para obter o link de download do seu produto</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">2.</span>
              <span>Se não recebeu o email, verifique a pasta de spam</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">3.</span>
              <span>Para dúvidas, entre em contato com nosso suporte</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Voltar à Loja
          </Link>
        </div>
      </div>
    </main>
  );
}
