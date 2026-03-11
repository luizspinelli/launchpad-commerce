/**
 * LaunchPad Commerce - Admin Dashboard
 * MIT License - Copyright (c) 2026 Luiz Spinelli
 * 
 * Dashboard home with overview statistics and recent activity
 */

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Bem-vindo ao painel administrativo</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 border border-blue-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-white mt-2">R$ 0,00</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
          <p className="text-xs text-slate-400 mt-4">Sem pedidos ainda</p>
        </div>

        {/* Total Orders */}
        <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 border border-green-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Orders</p>
              <p className="text-3xl font-bold text-white mt-2">0</p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
          <p className="text-xs text-slate-400 mt-4">Nenhum pedido recebido</p>
        </div>

        {/* Pending Orders */}
        <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/50 border border-yellow-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Pending Orders</p>
              <p className="text-3xl font-bold text-white mt-2">0</p>
            </div>
            <div className="text-4xl">⏳</div>
          </div>
          <p className="text-xs text-slate-400 mt-4">Aguardando processamento</p>
        </div>

        {/* Products */}
        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 border border-purple-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Products</p>
              <p className="text-3xl font-bold text-white mt-2">10</p>
            </div>
            <div className="text-4xl">🛍️</div>
          </div>
          <p className="text-xs text-slate-400 mt-4">Seed products</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">⚡ Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/products/new"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-center"
          >
            ➕ Criar Produto
          </Link>
          <Link
            href="/admin/orders"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-center"
          >
            📥 Ver Pedidos
          </Link>
          <Link
            href="/admin/analytics"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-center"
          >
            📊 Analytics
          </Link>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-3">🚀 Getting Started</h2>
        <ol className="space-y-2 text-slate-300">
          <li>1. ✅ <strong>Admin Dashboard</strong> — Você está aqui!</li>
          <li>2. 📦 <strong>Gerenciar Produtos</strong> — Crie/edite seus produtos</li>
          <li>3. 📁 <strong>Upload Files</strong> — Adicione arquivos digitais aos produtos</li>
          <li>4. 🛍️ <strong>Receber Pedidos</strong> — Fique atento aos novos pedidos</li>
          <li>5. 📊 <strong>Analytics</strong> — Veja estatísticas de vendas</li>
        </ol>
      </div>

      {/* Info Box */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h3 className="text-sm font-bold text-slate-300 mb-2">💡 Dica</h3>
        <p className="text-sm text-slate-400">
          Este é um painel administrativo para demonstração. Em produção, adicione autenticação robusta, 
          validações mais rigorosas e auditoria de ações.
        </p>
      </div>
    </div>
  );
}
