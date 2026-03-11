/**
 * LaunchPad Commerce - Admin Products
 * MIT License - Copyright (c) 2026 Luiz Spinelli
 * 
 * Products management page with CRUD operations
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  category?: string;
  featured?: boolean;
  createdAt: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Falha ao carregar produtos');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar produtos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este produto?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Falha ao deletar');
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao deletar');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">Produtos</h1>
          <p className="text-slate-400 mt-1">Gerenciar produtos da loja</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          ➕ Novo Produto
        </Link>
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
          <p className="text-slate-400 mt-4">Carregando produtos...</p>
        </div>
      )}

      {/* Products Table */}
      {!isLoading && products.length > 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900">
                  <th className="text-left px-6 py-4 text-slate-300 font-semibold">Nome</th>
                  <th className="text-left px-6 py-4 text-slate-300 font-semibold">Slug</th>
                  <th className="text-left px-6 py-4 text-slate-300 font-semibold">Preço</th>
                  <th className="text-left px-6 py-4 text-slate-300 font-semibold">Categoria</th>
                  <th className="text-left px-6 py-4 text-slate-300 font-semibold">Criado</th>
                  <th className="text-right px-6 py-4 text-slate-300 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{product.slug}</td>
                    <td className="px-6 py-4 text-white font-medium">
                      R$ {(product.price / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">
                      {product.category || '—'}
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">
                      {new Date(product.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3 flex justify-end">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                      >
                        ✏️ Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-400 hover:text-red-300 text-sm font-medium"
                      >
                        🗑️ Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && products.length === 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
          <p className="text-slate-400 mb-4">Nenhum produto criado ainda</p>
          <Link
            href="/admin/products/new"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-block"
          >
            ➕ Criar Primeiro Produto
          </Link>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h3 className="text-sm font-bold text-slate-300 mb-2">💡 Nota</h3>
        <p className="text-sm text-slate-400">
          Os produtos são exibidos em <Link href="/products" className="text-blue-400 hover:underline">/products</Link> na loja. 
          Você pode editar nome, descrição, preço e imagem aqui.
        </p>
      </div>
    </div>
  );
}
