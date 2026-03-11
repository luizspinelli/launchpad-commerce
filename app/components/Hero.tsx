'use client';

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-br from-blue-900 to-blue-800 text-white py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center flex flex-col items-center gap-8">
        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
          Crie e Venda Produtos Digitais em Minutos
        </h2>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-2xl leading-relaxed">
          Sem código. Landing page bonita + checkout seguro. Comece hoje.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="px-8 py-4 bg-white text-blue-900 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors">
            Começar Grátis
          </button>
          <button className="px-8 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
            Ver Demo
          </button>
        </div>

        {/* Trust Badge */}
        <div className="mt-12 text-blue-100 text-sm">
          ✓ Junte-se a 10.000+ criadores que lançaram seu negócio digital
        </div>
      </div>
    </section>
  );
}
