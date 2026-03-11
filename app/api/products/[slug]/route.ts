/**
 * GET /api/products/[slug]
 * Fetch a single product by slug
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'Slug inválido',
        },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { slug },
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: 'Produto não encontrado',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: product,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
        },
      }
    );
  } catch (error) {
    console.error('[GET /api/products/[slug]] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao buscar produto',
      },
      { status: 500 }
    );
  }
}
