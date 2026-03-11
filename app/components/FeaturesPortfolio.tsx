/**
 * FeaturesPortfolio Component
 * Technical features showcase
 */

export default function FeaturesPortfolio() {
  const features = [
    {
      icon: '🛒',
      title: 'Shopping Cart',
      description: 'Estado gerenciado com Zustand. localStorage persistence. Operações: adicionar, remover, atualizar quantidade.',
      tech: 'Zustand, React Hooks',
    },
    {
      icon: '💳',
      title: 'Stripe Checkout',
      description: 'Integração com Stripe Hosted Checkout. Sessões seguras, validação de dados com Zod, error handling robusto.',
      tech: 'Stripe API, Next.js API Routes',
    },
    {
      icon: '📧',
      title: 'Email Transacional',
      description: 'Confirmação de pedido via Resend. Template HTML responsivo, fallback gracioso se email falhar.',
      tech: 'Resend, HTML Templates',
    },
    {
      icon: '🎣',
      title: 'Webhooks',
      description: 'Endpoint seguro de webhook. Verificação de assinatura Stripe, idempotência, logging detalhado.',
      tech: 'Stripe Webhooks, Next.js',
    },
    {
      icon: '📊',
      title: 'Database Design',
      description: 'Schema Prisma com Product, Order, OrderItem. Relacionamentos, indexes, migrations automáticas.',
      tech: 'PostgreSQL, Prisma ORM',
    },
    {
      icon: '🚀',
      title: 'API REST',
      description: 'Endpoints tipados (TypeScript). GET /api/products, POST /api/stripe/checkout, POST /api/stripe/webhook.',
      tech: 'Next.js App Router, TypeScript',
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            O Que Foi Construído
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Demonstra capacidade de implementar features complexas em produção
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-slate-200 p-8 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                {feature.description}
              </p>
              <div className="pt-4 border-t border-slate-200">
                <p className="text-sm font-semibold text-blue-600">
                  {feature.tech}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            🏗️ Arquitetura Escalável
          </h3>
          <ul className="grid md:grid-cols-2 gap-4 text-slate-700">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Type-safe com TypeScript em 100% do código</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Component-driven architecture (React)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Validação de dados com Zod</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Error handling e logging estruturado</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Database migrations automáticas</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>CI/CD via Vercel (auto-deploy)</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
