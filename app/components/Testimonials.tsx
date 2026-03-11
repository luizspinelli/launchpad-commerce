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
    quote: 'Launched my first course in 2 hours. Stripe integration was seamless. This tool is a game-changer.',
    author: 'Maria',
    role: 'Course Creator',
    initials: 'M',
    color: 'bg-blue-500',
  },
  {
    quote: 'Finally, a tool for non-technical creators. Highly recommend to anyone looking to sell digital products.',
    author: 'João',
    role: 'Ebook Author',
    initials: 'J',
    color: 'bg-emerald-500',
  },
  {
    quote: 'Beautiful design, zero headaches. Worth every penny. Best investment for my business.',
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
            Loved by Creators Worldwide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our customers are saying about LaunchPad Commerce.
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
