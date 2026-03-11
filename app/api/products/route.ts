/**
 * GET /api/products
 * List all products with pagination
 *
 * Query params:
 * - limit: number of products (default: 20)
 * - offset: pagination offset (default: 0)
 */

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    // Validate inputs
    const validLimit = Math.min(Math.max(1, limit), 100); // Between 1-100
    const validOffset = Math.max(0, offset);

    // Fetch products and total count
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        take: validLimit,
        skip: validOffset,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count(),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: products,
        pagination: {
          total,
          limit: validLimit,
          offset: validOffset,
        },
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('[GET /api/products] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro ao buscar produtos',
      },
      { status: 500 }
    );
  }
}
