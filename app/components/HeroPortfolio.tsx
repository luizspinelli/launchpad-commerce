/**
 * LaunchPad Commerce - Hero Component
 * MIT License - Copyright (c) 2026 Luiz Spinelli
 * 
 * Portfolio-focused hero section with project overview and CTAs
 */

import Link from 'next/link';

export default function HeroPortfolio() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 sm:py-32">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center justify-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-8">
            <span className="text-blue-400 text-sm font-semibold">📦 Projeto Portfolio</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            LaunchPad Commerce
          </h1>

          {/* Subheading */}
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Uma plataforma e-commerce <strong>production-ready</strong> construída com Next.js, Stripe e PostgreSQL.
            Demonstra full-stack development, payment processing, e arquitetura escalável.
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur rounded-lg p-4 border border-white/10">
              <div className="text-2xl font-bold text-blue-400">13+</div>
              <div className="text-sm text-blue-200">Endpoints API</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-lg p-4 border border-white/10">
              <div className="text-2xl font-bold text-blue-400">16+</div>
              <div className="text-sm text-blue-200">Páginas & Rotas</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-lg p-4 border border-white/10">
              <div className="text-2xl font-bold text-blue-400">4</div>
              <div className="text-sm text-blue-200">Modelos DB</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://github.com/luizspinelli/launchpad-commerce"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <span>🔗 Ver Código no GitHub</span>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>🛍️ Ver Demo</span>
            </Link>
          </div>

          {/* Info */}
          <p className="text-sm text-blue-300 mt-8 max-w-xl mx-auto">
            💡 Este é um projeto de demonstração técnica. Usa Stripe em test mode. 
            <br/>
            Código completo disponível no repositório.
          </p>
        </div>
      </div>
    </section>
  );
}
