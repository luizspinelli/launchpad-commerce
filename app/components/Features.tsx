'use client';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    title: 'Configuração Fácil',
    description: 'Nenhum conhecimento técnico necessário. Crie e lance em minutos com nosso construtor intuitivo.',
    icon: '⚡',
  },
  {
    title: 'Pagamentos Seguros',
    description: 'Integração com Stripe e conformidade PCI Nível 1. Todos os pagamentos totalmente seguro e confiável.',
    icon: '🔒',
  },
  {
    title: 'Automação de Email',
    description: 'Integração com Resend para confirmações automáticas. Mantenha seus clientes informados al instante.',
    icon: '📧',
  },
  {
    title: 'Design Bonito',
    description: 'Responsivo, moderno e profissional. Sua landing page fica perfeita em qualquer dispositivo.',
    icon: '🎨',
  },
];

export default function Features() {
  return (
    <section className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Tudo o Que Você Precisa para Suceder
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Recursos poderosos criados para criadores que querem lançar sem complicações.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-5xl mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
