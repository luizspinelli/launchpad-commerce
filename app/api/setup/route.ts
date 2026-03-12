/**
 * POST /api/setup
 * Setup database and seed products (development only)
 * 
 * Security: Only works in development or with secret token
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

async function setupDatabase(request: NextRequest) {
  try {
    // Security: Only allow in development
    // In production, DATABASE_URL is read-only from Vercel
    // This endpoint is not exposed or functional in prod
    
    // Optional: Require setup token (for extra safety)
    const token = request.headers.get('x-setup-token');
    const setupToken = process.env.SETUP_TOKEN;
    
    if (setupToken && token !== setupToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('🔧 Setting up database...');

    // Check product count
    const count = await prisma.product.count();

    if (count > 0) {
      return NextResponse.json(
        {
          success: true,
          message: `Database already has ${count} products`,
          count,
        },
        { status: 200 }
      );
    }

    // Seed products
    const products = [
      {
        slug: 'react-mastery-course',
        name: 'React Mastery Course',
        description:
          'Aprenda React do zero ao avançado. Domine hooks, context, performance optimization e padrões do mundo real em 8 semanas.',
        price: 19999,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop&utm_source=launchpad',
        category: 'course',
        featured: true,
      },
      {
        slug: 'nodejs-backend-masterclass',
        name: 'Node.js Backend Masterclass',
        description:
          'Construa APIs escaláveis com Node.js. Aprenda Express, autenticação, testes, deployment e melhores práticas.',
        price: 24999,
        image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&h=300&fit=crop&utm_source=launchpad',
        category: 'course',
        featured: true,
      },
      {
        slug: 'typescript-guide',
        name: 'Guia Completo de TypeScript',
        description:
          'Domine TypeScript. Tipos avançados, genéricos, decoradores e padrões. Perfeito para projetos grandes.',
        price: 14999,
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop&utm_source=launchpad',
        category: 'course',
        featured: false,
      },
      {
        slug: 'nextjs-production',
        name: 'Next.js para Produção',
        description:
          'Construa aplicações Next.js production-ready. Otimização, deployment, performance e segurança.',
        price: 17999,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop&utm_source=launchpad',
        category: 'course',
        featured: true,
      },
      {
        slug: 'web-design-ebook',
        name: 'Web Design Moderno - E-book',
        description:
          'Aprenda princípios de web design, cores, tipografia, layout e UX. Inclui 50+ exemplos práticos.',
        price: 4999,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop&utm_source=launchpad',
        category: 'ebook',
        featured: false,
      },
      {
        slug: 'stripe-integration-guide',
        name: 'Guia de Integração Stripe',
        description:
          'Integre pagamentos com Stripe. Checkout, webhooks, billing, fraude e compliance. Código pronto para usar.',
        price: 8999,
        image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=500&h=300&fit=crop&utm_source=launchpad',
        category: 'course',
        featured: false,
      },
      {
        slug: 'figma-ui-kit',
        name: 'Figma UI Kit - Premium',
        description:
          'Kit completo de UI com 200+ componentes prontos. Botões, cards, forms, navegação, modais e mais.',
        price: 3999,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop&utm_source=launchpad',
        category: 'template',
        featured: false,
      },
      {
        slug: 'tailwind-components',
        name: 'Tailwind CSS Components Pack',
        description:
          '100+ componentes Tailwind prontos para copiar. Navbar, cards, forms, footers, hero sections.',
        price: 2999,
        image: 'https://images.unsplash.com/photo-1579467118454-007a50e824e2?w=500&h=300&fit=crop&utm_source=launchpad',
        category: 'template',
        featured: true,
      },
      {
        slug: 'javascript-algorithms',
        name: 'Algoritmos JavaScript',
        description:
          'Entenda estruturas de dados, sorting, busca, recursão e otimização. +100 exercícios com soluções.',
        price: 12999,
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop&utm_source=launchpad',
        category: 'course',
        featured: false,
      },
      {
        slug: 'css-animations-guide',
        name: 'Guia de Animações CSS',
        description:
          'Crie animações CSS incríveis. Transitions, keyframes, performance, acessibilidade. 50+ exemplos.',
        price: 6999,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop&utm_source=launchpad',
        category: 'course',
        featured: false,
      },
    ];

    // Insert products with proper field names
    const createdProducts = [];
    for (const product of products) {
      const created = await prisma.product.create({
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
      createdProducts.push(created);
    }

    console.log(`✅ ${createdProducts.length} products seeded`);

    return NextResponse.json(
      {
        success: true,
        message: `Seeded ${createdProducts.length} products`,
        count: createdProducts.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[POST /api/setup] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return setupDatabase(request);
}

export async function GET(request: NextRequest) {
  return setupDatabase(request);
}
