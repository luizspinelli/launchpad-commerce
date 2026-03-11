'use client';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  initials: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    quote: 'Lancei meu primeiro curso em 2 horas. A integração com Stripe foi perfeita. Essa ferramenta muda o jogo.',
    author: 'Maria',
    role: 'Criadora de Cursos',
    initials: 'M',
    color: 'bg-blue-500',
  },
  {
    quote: 'Finalmente uma ferramenta para criadores não-técnicos. Recomendo muito para qualquer pessoa que queira vender produtos digitais.',
    author: 'João',
    role: 'Autor de Ebooks',
    initials: 'J',
    color: 'bg-emerald-500',
  },
  {
    quote: 'Design bonito, sem dores de cabeça. Vale cada centavo. Melhor investimento para meu negócio.',
    author: 'Ana',
    role: 'Designer',
    initials: 'A',
    color: 'bg-purple-500',
  },
];

export default function Testimonials() {
  return (
    <section className="w-full bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Amado por Criadores em Todo o Mundo
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Veja o que nossos clientes estão dizendo sobre LaunchPad Commerce.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${testimonial.color} flex items-center justify-center text-white font-bold text-lg`}>
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
