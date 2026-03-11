/**
 * LaunchPad Commerce - Admin Layout
 * MIT License - Copyright (c) 2026 Luiz Spinelli
 * 
 * Root layout for admin dashboard with sidebar navigation
 */

import Link from 'next/link';

export const metadata = {
  title: 'Admin Dashboard - LaunchPad Commerce',
  description: 'Manage products, orders, and analytics',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-900 text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-white">LaunchPad</h1>
          <p className="text-xs text-slate-400 mt-1">Admin Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors text-slate-300 hover:text-white"
          >
            <span className="text-xl">📊</span>
            <span className="font-medium">Dashboard</span>
          </Link>

          <Link
            href="/admin/products"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors text-slate-300 hover:text-white"
          >
            <span className="text-xl">📦</span>
            <span className="font-medium">Produtos</span>
          </Link>

          <Link
            href="/admin/orders"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors text-slate-300 hover:text-white"
          >
            <span className="text-xl">🛍️</span>
            <span className="font-medium">Pedidos</span>
          </Link>

          <Link
            href="/admin/analytics"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors text-slate-300 hover:text-white"
          >
            <span className="text-xl">📈</span>
            <span className="font-medium">Analytics</span>
          </Link>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors text-slate-400 hover:text-slate-200 text-sm"
          >
            <span>←</span>
            <span>Voltar à loja</span>
          </Link>
          <p className="text-xs text-slate-500 px-4 py-2">
            © {new Date().getFullYear()} LaunchPad Commerce
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-slate-900">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
