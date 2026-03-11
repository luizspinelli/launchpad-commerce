/**
 * LaunchPad Commerce - Admin Orders
 * MIT License - Copyright (c) 2026 Luiz Spinelli
 * 
 * Orders management page with order tracking
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Order {
  id: string;
  stripeSessionId: string;
  customerEmail: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      // For now, we'll show a placeholder since we don't have a GET /api/orders endpoint yet
      // In production, fetch from /api/admin/orders
      setOrders([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar pedidos');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-900/30 text-green-300 border-green-700/50';
      case 'PENDING':
        return 'bg-yellow-900/30 text-yellow-300 border-yellow-700/50';
      case 'FAILED':
        return 'bg-red-900/30 text-red-300 border-red-700/50';
      default:
        return 'bg-slate-700/30 text-slate-300 border-slate-700/50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">Pedidos</h1>
        <p className="text-slate-400 mt-1">Todos os pedidos recebidos</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm font-medium">Total de Pedidos</p>
          <p className="text-4xl font-bold text-white mt-2">{orders.length}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm font-medium">Pendentes</p>
          <p className="text-4xl font-bold text-yellow-400 mt-2">
            {orders.filter((o) => o.status === 'PENDING').length}
          </p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm font-medium">Confirmados</p>
          <p className="text-4xl font-bold text-green-400 mt-2">
            {orders.filter((o) => o.status === 'PAID').length}
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/30 border border-red-700/50 text-red-300 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="text-slate-400 mt-4">Carregando pedidos...</p>
        </div>
      )}

      {/* Orders Table */}
      {!isLoading && orders.length > 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900">
                  <th className="text-left px-6 py-4 text-slate-300 font-semibold">ID</th>
                  <th className="text-left px-6 py-4 text-slate-300 font-semibold">Cliente</th>
                  <th className="text-left px-6 py-4 text-slate-300 font-semibold">Total</th>
                  <th className="text-left px-6 py-4 text-slate-300 font-semibold">Status</th>
                  <th className="text-left px-6 py-4 text-slate-300 font-semibold">Data</th>
                  <th className="text-right px-6 py-4 text-slate-300 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 text-slate-300 font-mono text-sm">{order.id}</td>
                    <td className="px-6 py-4 text-white">{order.customerEmail}</td>
                    <td className="px-6 py-4 text-white font-medium">
                      R$ {(order.totalAmount / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold border ${getStatusColor(order.status)}`}>
                        {order.status === 'PAID'
                          ? '✅ Pago'
                          : order.status === 'PENDING'
                            ? '⏳ Pendente'
                            : '❌ Falhou'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                      >
                        👁️ Ver
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && orders.length === 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
          <p className="text-6xl mb-4">📭</p>
          <p className="text-slate-400 mb-4">Nenhum pedido recebido ainda</p>
          <p className="text-slate-500 text-sm">
            Os pedidos aparecerão aqui quando seus clientes fizerem compras na loja.
          </p>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h3 className="text-sm font-bold text-slate-300 mb-2">💡 Como Funciona</h3>
        <ol className="text-sm text-slate-400 space-y-1">
          <li>1. Customer compra um produto na loja (/checkout)</li>
          <li>2. Stripe processa o pagamento e envia webhook</li>
          <li>3. Webhook cria um Order no banco de dados</li>
          <li>4. Email de confirmação é enviado automaticamente</li>
          <li>5. Você vê o pedido aqui neste painel</li>
        </ol>
      </div>
    </div>
  );
}
