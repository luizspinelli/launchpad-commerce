'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-blue-900 text-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">LaunchPad</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              A maneira mais fácil de criar e vender produtos digitais. Lance seu negócio em minutos.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Produto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Recursos
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Preços
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Segurança
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Carreiras
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Termos de Serviço
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  Política de Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-800 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Copyright */}
          <p className="text-sm text-blue-100">
            © {currentYear} LaunchPad Commerce. Todos os direitos reservados.
          </p>

          {/* Social Links */}
          <div className="flex gap-6">
            <a
              href="#"
              className="text-blue-100 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-blue-100 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-blue-100 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-8 text-center text-blue-200 text-xs">
          🔒 Seguro com Stripe | Emails com Resend
        </div>
      </div>
    </footer>
  );
}
