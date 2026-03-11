/**
 * LaunchPad Commerce - Get Order by Stripe Session ID
 * MIT License - Copyright (c) 2026 Luiz Spinelli
 * 
 * GET /api/orders/session?sessionId={STRIPE_SESSION_ID}
 * Fetch order details using Stripe session ID
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId query param é obrigatório' },
        { status: 400 }
      );
    }

    // Find order by stripeSessionId
    const order = await prisma.order.findUnique({
      where: { stripeSessionId: sessionId },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Pedido não encontrado' },
        { status: 404 }
      );
    }

    // Fetch products with file URLs for downloads
    const productIds = order.items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: {
        id: true,
        name: true,
        fileUrl: true,
      },
    });

    // Build response
    const orderResponse = {
      id: order.id,
      stripeSessionId: order.stripeSessionId,
      customerEmail: order.customerEmail,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      items: order.items.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return {
          productId: item.productId,
          productName: product?.name || 'Produto',
          quantity: item.quantity,
          pricePerUnit: item.priceAtTime,
          total: item.priceAtTime * item.quantity,
        };
      }),
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        fileUrl: p.fileUrl,
      })),
    };

    console.log(`✅ Order fetched: ${order.id} (session: ${sessionId})`);

    return NextResponse.json(orderResponse, { status: 200 });
  } catch (error) {
    console.error('[GET /api/orders/session] Error:', error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao carregar pedido' },
      { status: 500 }
    );
  }
}
