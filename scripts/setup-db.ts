import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Setting up database...');

  try {
    // Check if Product table exists
    const result = await prisma.$queryRaw`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'Product'
      );
    `;

    const tableExists = (result as any[])[0]?.exists || false;

    if (!tableExists) {
      console.log('📝 Creating tables...');
      await prisma.$executeRaw`
        CREATE TABLE "Product" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "slug" TEXT NOT NULL UNIQUE,
          "name" TEXT NOT NULL,
          "description" TEXT NOT NULL,
          "price" INTEGER NOT NULL,
          "image" TEXT NOT NULL,
          "category" TEXT,
          "featured" BOOLEAN NOT NULL DEFAULT false,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `;

      console.log('📝 Creating indexes...');
      await prisma.$executeRaw`CREATE INDEX "Product_slug_idx" ON "Product"("slug");`;
      await prisma.$executeRaw`CREATE INDEX "Product_createdAt_idx" ON "Product"("createdAt");`;

      console.log('✅ Tables created!');
    } else {
      console.log('✅ Tables already exist');
    }

    // Seed products if table is empty
    const count = await prisma.product.count();
    if (count === 0) {
      console.log('🌱 Seeding products...');

      const products = [
        {
          slug: 'react-mastery-course',
          name: 'React Mastery Course',
          description: 'Aprenda React do zero ao avançado. Domine hooks, context, performance optimization e padrões do mundo real em 8 semanas.',
          price: 19999,
          image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
          category: 'course',
          featured: true,
        },
        {
          slug: 'nodejs-backend-masterclass',
          name: 'Node.js Backend Masterclass',
          description: 'Construa APIs escaláveis com Node.js. Aprenda Express, autenticação, testes, deployment e melhores práticas.',
          price: 24999,
          image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
          category: 'course',
          featured: true,
        },
        {
          slug: 'typescript-guide',
          name: 'Guia Completo de TypeScript',
          description: 'Domine TypeScript. Tipos avançados, genéricos, decoradores e padrões. Perfeito para projetos grandes.',
          price: 14999,
          image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
          category: 'course',
          featured: false,
        },
        {
          slug: 'nextjs-production',
          name: 'Next.js para Produção',
          description: 'Construa aplicações Next.js production-ready. Otimização, deployment, performance e segurança.',
          price: 17999,
          image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
          category: 'course',
          featured: true,
        },
        {
          slug: 'web-design-ebook',
          name: 'Web Design Moderno - E-book',
          description: 'Aprenda princípios de web design, cores, tipografia, layout e UX. Inclui 50+ exemplos práticos.',
          price: 4999,
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
          category: 'ebook',
          featured: false,
        },
        {
          slug: 'stripe-integration-guide',
          name: 'Guia de Integração Stripe',
          description: 'Integre pagamentos com Stripe. Checkout, webhooks, billing, fraude e compliance. Código pronto para usar.',
          price: 8999,
          image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
          category: 'course',
          featured: false,
        },
        {
          slug: 'figma-ui-kit',
          name: 'Figma UI Kit - Premium',
          description: 'Kit completo de UI com 200+ componentes prontos. Botões, cards, forms, navegação, modais e mais.',
          price: 3999,
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
          category: 'template',
          featured: false,
        },
        {
          slug: 'tailwind-components',
          name: 'Tailwind CSS Components Pack',
          description: '100+ componentes Tailwind prontos para copiar. Navbar, cards, forms, footers, hero sections.',
          price: 2999,
          image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
          category: 'template',
          featured: true,
        },
        {
          slug: 'javascript-algorithms',
          name: 'Algoritmos JavaScript',
          description: 'Entenda estruturas de dados, sorting, busca, recursão e otimização. +100 exercícios com soluções.',
          price: 12999,
          image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
          category: 'course',
          featured: false,
        },
        {
          slug: 'css-animations-guide',
          name: 'Guia de Animações CSS',
          description: 'Crie animações CSS incríveis. Transitions, keyframes, performance, acessibilidade. 50+ exemplos.',
          price: 6999,
          image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
          category: 'course',
          featured: false,
        },
      ];

      for (const product of products) {
        await prisma.product.create({
          data: {
            slug: product.slug,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            category: product.category || null,
            featured: product.featured || false,
          },
        });
      }

      console.log(`✅ ${products.length} products seeded!`);
    } else {
      console.log(`✅ Database already has ${count} products`);
    }
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
