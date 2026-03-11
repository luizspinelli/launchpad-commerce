/**
 * LaunchPad Commerce - Admin Analytics
 * MIT License - Copyright (c) 2026 Luiz Spinelli
 * 
 * Analytics dashboard with key metrics and insights
 */

'use client';

import { useEffect, useState } from 'react';

interface Analytics {
  totalRevenue: number;
  totalOrders: number;
  conversionRate: number;
  avgOrderValue: number;
  topProducts: Array<{ name: string; sales: number; revenue: number }>;
}

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics>({
    totalRevenue: 0,
    totalOrders: 0,
    conversionRate: 0,
    avgOrderValue: 0,
    topProducts: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      // Placeholder data - in production, fetch from /api/admin/analytics
      setAnalytics({
        totalRevenue: 0,
        totalOrders: 0,
        conversionRate: 0,
        avgOrderValue: 0,
        topProducts: [],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">Analytics</h1>
        <p className="text-slate-400 mt-1">Insights sobre vendas e performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 border border-green-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-white mt-2">R$ {(analytics.totalRevenue / 100).toFixed(2)}</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
          <p className="text-xs text-green-300 mt-4">Sem pedidos ainda</p>
        </div>

        {/* Total Orders */}
        <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 border border-blue-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Total Orders</p>
              <p className="text-3xl font-bold text-white mt-2">{analytics.totalOrders}</p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
          <p className="text-xs text-blue-300 mt-4">Pedidos recebidos</p>
        </div>

        {/* Conversion Rate */}
        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 border border-purple-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">Conversion Rate</p>
              <p className="text-3xl font-bold text-white mt-2">{analytics.conversionRate.toFixed(1)}%</p>
            </div>
            <div className="text-4xl">📈</div>
          </div>
          <p className="text-xs text-purple-300 mt-4">Visitante → Comprador</p>
        </div>

        {/* Average Order */}
        <div className="bg-gradient-to-br from-orange-900/50 to-orange-800/50 border border-orange-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-400 text-sm font-medium">Average Order</p>
              <p className="text-3xl font-bold text-white mt-2">R$ {(analytics.avgOrderValue / 100).toFixed(2)}</p>
            </div>
            <div className="text-4xl">🎯</div>
          </div>
          <p className="text-xs text-orange-300 mt-4">AOV (Average Order Value)</p>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">🏆 Top Products</h2>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="text-slate-400 mt-4">Carregando...</p>
          </div>
        ) : analytics.topProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-slate-300 font-semibold">Produto</th>
                  <th className="text-left px-4 py-3 text-slate-300 font-semibold">Vendas</th>
                  <th className="text-right px-4 py-3 text-slate-300 font-semibold">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {analytics.topProducts.map((product, idx) => (
                  <tr key={idx} className="border-b border-slate-700 hover:bg-slate-700/30">
                    <td className="px-4 py-3 text-white font-medium">{product.name}</td>
                    <td className="px-4 py-3 text-slate-300">{product.sales}</td>
                    <td className="px-4 py-3 text-right text-white font-medium">
                      R$ {(product.revenue / 100).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-slate-400">Nenhum dado de vendas disponível</p>
          </div>
        )}
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tips */}
        <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-300 mb-4">💡 Dicas</h3>
          <ul className="space-y-2 text-blue-200 text-sm">
            <li>• Acompanhe o Conversion Rate para otimizar seu funnel</li>
            <li>• Identifique top-sellers e invista em marketing deles</li>
            <li>• Monitor AOV (Average Order Value) para insights de preço</li>
            <li>• Use dados para tomar decisões estratégicas</li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-purple-900/30 border border-purple-700/50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-purple-300 mb-4">🚀 Próximos Passos</h3>
          <ul className="space-y-2 text-purple-200 text-sm">
            <li>• Implementar gráficos interativos (Chart.js, Recharts)</li>
            <li>• Adicionar filtros por período (hoje, semana, mês)</li>
            <li>• Integrar com Posthog ou Vercel Analytics</li>
            <li>• Exportar relatórios em PDF/CSV</li>
          </ul>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h3 className="text-sm font-bold text-slate-300 mb-2">📊 Status do Analytics</h3>
        <p className="text-sm text-slate-400">
          Este é um painel MVP com métricas básicas. Após o soft launch, será implementado:
          <br />
          • Gráficos em tempo real (revenue, orders, conversion over time)
          <br />
          • Segmentação por produto, categoria, período
          <br />
          • Integração com Posthog ou Vercel Analytics para tracking automático
        </p>
      </div>
    </div>
  );
}
