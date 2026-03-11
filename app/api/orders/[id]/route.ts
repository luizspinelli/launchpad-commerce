/**
 * LaunchPad Commerce - Get Order Details API
 * MIT License - Copyright (c) 2026 Luiz Spinelli
 * 
 * GET /api/orders/[id]
 * Get order details with products
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch order with items
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            // Note: We can't join Product directly in OrderItem
            // So we'll fetch products separately
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Pedido não encontrado' },
        { status: 404 }
      );
    }

    // Fetch products for download links
    const productIds = order.items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      select: {
        id: true,
        name: true,
        fileUrl: true,
      },
    });

    return NextResponse.json(
      {
        order: {
          id: order.id,
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
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[GET /api/orders/[id]] Error:', error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao carregar pedido' },
      { status: 500 }
    );
  }
}
