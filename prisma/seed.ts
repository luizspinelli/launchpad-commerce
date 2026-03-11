import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de produtos...');

  // Limpar produtos existentes
  await prisma.product.deleteMany();
  console.log('🗑️  Produtos antigos deletados');

  // Criar produtos
  const products = [
    {
      slug: 'react-mastery-course',
      name: 'React Mastery Course',
      description: 'Aprenda React do zero ao avançado. Domine hooks, context, performance optimization e padrões do mundo real em 8 semanas.',
      price: 19999, // R$199.99
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
      category: 'course',
      featured: true,
    },
    {
      slug: 'nodejs-backend-masterclass',
      name: 'Node.js Backend Masterclass',
      description: 'Construa APIs escaláveis com Node.js. Aprenda Express, autenticação, testes, deployment e melhores práticas.',
      price: 24999, // R$249.99
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
      category: 'course',
      featured: true,
    },
    {
      slug: 'typescript-guide',
      name: 'Guia Completo de TypeScript',
      description: 'Domine TypeScript. Tipos avançados, genéricos, decoradores e padrões. Perfeito para projetos grandes.',
      price: 14999, // R$149.99
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
      category: 'course',
      featured: false,
    },
    {
      slug: 'nextjs-production',
      name: 'Next.js para Produção',
      description: 'Construa aplicações Next.js production-ready. Otimização, deployment, performance e segurança.',
      price: 17999, // R$179.99
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
      category: 'course',
      featured: true,
    },
    {
      slug: 'web-design-ebook',
      name: 'Web Design Moderno - E-book',
      description: 'Aprenda princípios de web design, cores, tipografia, layout e UX. Inclui 50+ exemplos práticos.',
      price: 4999, // R$49.99
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
      category: 'ebook',
      featured: false,
    },
    {
      slug: 'stripe-integration-guide',
      name: 'Guia de Integração Stripe',
      description: 'Integre pagamentos com Stripe. Checkout, webhooks, billing, fraude e compliance. Código pronto para usar.',
      price: 8999, // R$89.99
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
      category: 'course',
      featured: false,
    },
    {
      slug: 'figma-ui-kit',
      name: 'Figma UI Kit - Premium',
      description: 'Kit completo de UI com 200+ componentes prontos. Botões, cards, forms, navegação, modais e mais.',
      price: 3999, // R$39.99
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
      category: 'template',
      featured: false,
    },
    {
      slug: 'tailwind-components',
      name: 'Tailwind CSS Components Pack',
      description: '100+ componentes Tailwind prontos para copiar. Navbar, cards, forms, footers, hero sections.',
      price: 2999, // R$29.99
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
      category: 'template',
      featured: true,
    },
    {
      slug: 'javascript-algorithms',
      name: 'Algoritmos JavaScript',
      description: 'Entenda estruturas de dados, sorting, busca, recursão e otimização. +100 exercícios com soluções.',
      price: 12999, // R$129.99
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
      category: 'course',
      featured: false,
    },
    {
      slug: 'css-animations-guide',
      name: 'Guia de Animações CSS',
      description: 'Crie animações CSS incríveis. Transitions, keyframes, performance, acessibilidade. 50+ exemplos.',
      price: 6999, // R$69.99
      image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
      category: 'course',
      featured: false,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log(`✅ ${products.length} produtos criados com sucesso!`);
  console.log('📊 Produtos adicionados:');
  products.forEach((p) => {
    console.log(`   • ${p.name} (R$ ${(p.price / 100).toFixed(2)})`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Erro ao fazer seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
