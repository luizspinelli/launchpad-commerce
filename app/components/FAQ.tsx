'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Preciso de conhecimento em código?',
    answer: 'Não, é projetado para não-desenvolvedores. Nosso construtor tipo arrastar-e-soltar torna fácil criar uma landing page profissional sem escrever código.',
  },
  {
    question: 'É seguro?',
    answer: 'Sim, Stripe trata toda a segurança de pagamento com conformidade PCI Nível 1. Os dados dos seus clientes são protegidos com encriptação de nível industrial.',
  },
  {
    question: 'Posso personalizar o design?',
    answer: 'Sim, personalização completa com TailwindCSS está disponível. Você pode alterar cores, fontes e layouts para combinar perfeitamente com sua marca.',
  },
  {
    question: 'Quais métodos de pagamento são suportados?',
    answer: 'Todos os cartões de crédito principais, Apple Pay, Google Pay e outros métodos de pagamento suportados pelo Stripe. Seus clientes têm flexibilidade em como pagam.',
  },
  {
    question: 'Como envio produtos digitais?',
    answer: 'Entrega automática por email após a compra. Assim que um cliente completa o pagamento, seu produto digital é imediatamente enviado para o email dele.',
  },
  {
    question: 'Posso rastrear vendas?',
    answer: 'Sim, o painel de análise integrado mostra todas as suas vendas, dados dos clientes e métricas de receita em tempo real.',
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
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-600">
            Tudo o que você precisa saber sobre LaunchPad Commerce.
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
            Ainda tem dúvidas? Estamos aqui para ajudar.
          </p>
          <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-colors">
            Entrar em Contato
          </button>
        </div>
      </div>
    </section>
  );
}
