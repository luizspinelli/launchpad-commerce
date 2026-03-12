/**
 * LaunchPad Commerce - Debug: Create Test Order
 * Used to simulate webhook without Stripe payment
 * DELETE THIS IN PRODUCTION
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, customerEmail, totalAmount, items } = body;

    if (!sessionId || !customerEmail || !totalAmount) {
      return NextResponse.json(
        { error: 'Missing required fields: sessionId, customerEmail, totalAmount' },
        { status: 400 }
      );
    }

    // Check if order already exists
    const existingOrder = await prisma.order.findUnique({
      where: { stripeSessionId: sessionId },
    });

    if (existingOrder) {
      return NextResponse.json(
        { error: 'Order already exists', order: existingOrder },
        { status: 409 }
      );
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        stripeSessionId: sessionId,
        status: 'PAID',
        customerEmail,
        totalAmount,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            pricePerUnit: item.price,
            total: item.price * item.quantity,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                fileUrl: true,
              },
            },
          },
        },
      },
    });

    // Transform response to match expected format
    const orderResponse = {
      ...order,
      products: order.items.map((item) => item.product),
    };

    console.log('✅ Test order created:', order.id);

    return NextResponse.json(
      {
        success: true,
        order: orderResponse,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST /api/debug/create-test-order] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create test order',
      },
      { status: 500 }
    );
  }
}
