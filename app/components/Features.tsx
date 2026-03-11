'use client';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    title: 'Easy Setup',
    description: 'No technical knowledge required. Create and launch in minutes with our intuitive drag-and-drop builder.',
    icon: '⚡',
  },
  {
    title: 'Secure Payments',
    description: 'Stripe integration with PCI Level 1 compliance. All payment processing is fully secured and reliable.',
    icon: '🔒',
  },
  {
    title: 'Email Automation',
    description: 'Resend integration for automatic order confirmations and delivery. Keep your customers informed instantly.',
    icon: '📧',
  },
  {
    title: 'Beautiful Design',
    description: 'Responsive, modern, and professional. Your landing page looks amazing on every device.',
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
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features built for creators who want to launch without the complexity.
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
