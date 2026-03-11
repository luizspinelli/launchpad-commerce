/**
 * StackPortfolio Component
 * Technology stack showcase
 */

export default function StackPortfolio() {
  const stack = [
    {
      category: 'Frontend',
      items: [
        { name: 'Next.js 16.1', description: 'App Router, SSR, API Routes' },
        { name: 'React 19', description: 'Hooks, Server Components' },
        { name: 'TypeScript 5', description: '100% type coverage' },
        { name: 'TailwindCSS 4', description: 'Utility-first styling' },
        { name: 'Zustand 4.4', description: 'State management' },
      ],
    },
    {
      category: 'Backend & APIs',
      items: [
        { name: 'Node.js', description: 'JavaScript runtime' },
        { name: 'Stripe', description: 'Payment processing' },
        { name: 'Resend', description: 'Email service' },
        { name: 'Zod', description: 'Schema validation' },
      ],
    },
    {
      category: 'Database & ORM',
      items: [
        { name: 'PostgreSQL', description: 'Relational database' },
        { name: 'Vercel Postgres', description: 'Managed database' },
        { name: 'Prisma 5.22', description: 'Type-safe ORM' },
      ],
    },
    {
      category: 'Deployment & DevOps',
      items: [
        { name: 'Vercel', description: 'Hosting & deployment' },
        { name: 'Git', description: 'Version control' },
        { name: 'GitHub', description: 'Repository' },
      ],
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Stack Tecnológico
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Tech stack moderno, escalável e production-ready
          </p>
        </div>

        {/* Stack Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stack.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-bold text-slate-900 mb-6 pb-3 border-b border-blue-200">
                {section.category}
              </h3>
              <ul className="space-y-4">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">
            📈 Métricas & Performance
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <p className="text-3xl font-bold text-blue-600">20+</p>
              <p className="text-slate-600 mt-2">Commits</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">1000+</p>
              <p className="text-slate-600 mt-2">Lines of Code</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">100%</p>
              <p className="text-slate-600 mt-2">Type Coverage</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">&lt;1s</p>
              <p className="text-slate-600 mt-2">Page Load</p>
            </div>
          </div>
        </div>

        {/* Code Quality */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900 text-white rounded-lg p-8">
            <h3 className="text-xl font-bold mb-4">✅ Code Quality</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• ESLint + Prettier configurados</li>
              <li>• TypeScript strict mode</li>
              <li>• Prisma migrations automáticas</li>
              <li>• Error logging estruturado</li>
              <li>• API route validation com Zod</li>
            </ul>
          </div>
          <div className="bg-slate-900 text-white rounded-lg p-8">
            <h3 className="text-xl font-bold mb-4">🔐 Security</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Stripe webhook signature verification</li>
              <li>• Environment variables com .env.example</li>
              <li>• API rate limiting ready</li>
              <li>• CORS configuration</li>
              <li>• Input validation em todos endpoints</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
