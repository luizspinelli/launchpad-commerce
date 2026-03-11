/**
 * LaunchPad Commerce - Admin Logout Button
 * MIT License - Copyright (c) 2026 Luiz Spinelli
 * 
 * Client component for admin logout
 */

'use client';

import { useState } from 'react';

export default function AdminLogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await fetch('/api/admin/auth', {
        method: 'DELETE',
      });

      if (response.ok) {
        // Redirect to login
        window.location.href = '/admin/login';
      } else {
        alert('Erro ao fazer logout');
      }
    } catch (error) {
      alert('Erro ao fazer logout');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-700/30 transition-colors text-red-400 hover:text-red-300 text-sm font-medium disabled:opacity-50"
    >
      <span>🚪</span>
      <span>{isLoggingOut ? 'Saindo...' : 'Logout'}</span>
    </button>
  );
}
