'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-br from-slate-900 to-slate-800 text-slate-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">LaunchPad</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Uma plataforma e-commerce production-ready. Projeto de demonstração de expertise em full-stack development.
            </p>
            <p className="text-xs text-slate-500">
              © {currentYear} Luiz Spinelli
            </p>
          </div>

          {/* Explorar Section */}
          <div>
            <h4 className="font-semibold text-white mb-4">📦 Explorar</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                  <span>🏠</span> Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                  <span>🛍️</span> Produtos
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                  <span>💳</span> Checkout
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/luizspinelli/launchpad-commerce" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>💻</span> Código
                </a>
              </li>
            </ul>
          </div>

          {/* Tech Stack Section */}
          <div>
            <h4 className="font-semibold text-white mb-4">🔧 Tech Stack</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>✓ Next.js 16 + React 19</li>
              <li>✓ TypeScript 5</li>
              <li>✓ TailwindCSS 4</li>
              <li>✓ PostgreSQL + Prisma</li>
              <li>✓ Stripe + Resend</li>
              <li>✓ Vercel Deployment</li>
            </ul>
          </div>

          {/* Contato & Social Section */}
          <div>
            <h4 className="font-semibold text-white mb-4">🤝 Conecte-se</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a 
                  href="https://github.com/luizspinelli" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>🐙</span> GitHub
                </a>
              </li>

              <li>
                <a 
                  href="https://linkedin.com/in/luizspinelli" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>in</span> LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="https://spinelli.dev.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>🌐</span> Portfolio
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 mb-8" />

        {/* Bottom Section */}
        <div className="space-y-6">
          {/* Legal Links */}
          <div className="flex flex-wrap gap-6 justify-center text-sm">
            <a 
              href="https://github.com/luizspinelli/launchpad-commerce/blob/main/LICENSE" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              📜 Licença MIT
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>Seguro com Stripe</span>
            </div>
            <span className="hidden sm:inline text-slate-600">•</span>
            <div className="flex items-center gap-2">
              <span>📧</span>
              <span>Emails com Resend</span>
            </div>
            <span className="hidden sm:inline text-slate-600">•</span>
            <div className="flex items-center gap-2">
              <span>✅</span>
              <span>Production-Ready</span>
            </div>
            <span className="hidden sm:inline text-slate-600">•</span>
            <div className="flex items-center gap-2">
              <span>100%</span>
              <span>TypeScript</span>
            </div>
          </div>

          {/* Final Note */}
          <div className="text-center text-xs text-slate-500 mt-8">
            <p>
              LaunchPad Commerce é um <strong>projeto de portfolio</strong> demonstrando expertise em full-stack development.
            </p>
            <p className="mt-2">
              Desenvolvido com Next.js 16, Stripe, PostgreSQL e Vercel.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
