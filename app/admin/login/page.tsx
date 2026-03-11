/**
 * LaunchPad Commerce - Admin Login
 * MIT License - Copyright (c) 2026 Luiz Spinelli
 * 
 * Admin login page with password authentication
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Call login API
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Falha na autenticação');
      }

      // Store token in cookie (httpOnly is set by API)
      // Redirect to dashboard
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">LaunchPad Admin</h1>
            <p className="text-slate-400">Acesso restrito ao painel administrativo</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-900/30 border border-red-700/50 text-red-300 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Senha do Administrador
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                placeholder="Digite sua senha"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-lg font-bold text-white transition-colors ${
                isLoading
                  ? 'bg-slate-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
              }`}
            >
              {isLoading ? 'Autenticando...' : 'Fazer Login'}
            </button>
          </form>

          {/* Info */}
          <div className="mt-8 pt-8 border-t border-slate-700">
            <p className="text-xs text-slate-500 text-center mb-4">
              💡 Esta é uma demonstração. Em produção, use autenticação mais robusta.
            </p>
            <Link
              href="/"
              className="text-blue-400 hover:text-blue-300 text-sm text-center block"
            >
              ← Voltar à loja
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-slate-400 text-xs mt-6">
          A senha é configurada via variável de ambiente <code className="text-slate-300">ADMIN_PASSWORD</code>
        </p>
      </div>
    </div>
  );
}
