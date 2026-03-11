'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Do I need coding knowledge?',
    answer: "No, it's designed for non-developers. Our drag-and-drop builder makes it easy to create a professional landing page without writing any code.",
  },
  {
    question: 'Is it secure?',
    answer: 'Yes, Stripe handles all payment security with PCI Level 1 compliance. Your customers\' data is protected with industry-leading encryption.',
  },
  {
    question: 'Can I customize the design?',
    answer: 'Yes, full TailwindCSS customization is available. You can change colors, fonts, and layouts to match your brand perfectly.',
  },
  {
    question: 'What payment methods are supported?',
    answer: 'All major credit cards, Apple Pay, Google Pay, and other payment methods supported by Stripe. Your customers have flexibility in how they pay.',
  },
  {
    question: 'How do I send digital products?',
    answer: 'Automatic email delivery after purchase. Once a customer completes their payment, your digital product is immediately sent to their email address.',
  },
  {
    question: 'Can I track sales?',
    answer: 'Yes, built-in analytics dashboard shows all your sales, customer data, and revenue metrics in real-time.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about LaunchPad Commerce.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900 text-left">
                  {faq.question}
                </span>
                <span
                  className={`text-2xl text-blue-600 transition-transform duration-300 flex-shrink-0 ml-4 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* Answer */}
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Still have questions? We're here to help.
          </p>
          <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}
