/**
 * LaunchPad Commerce - Stripe Checkout API
 * MIT License - Copyright (c) 2026 Luiz Spinelli
 * 
 * POST /api/stripe/checkout
 * Create Stripe checkout session
 *
 * Request body:
 * {
 *   items: Array<{ productId, productName, price, quantity }>,
 *   customerEmail: string,
 *   customerName: string
 * }
 *
 * Response:
 * {
 *   success: boolean,
 *   sessionId?: string,
 *   error?: string
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const CheckoutRequestSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().min(1),
      productName: z.string().min(1),
      price: z.number().int().positive(),
      quantity: z.number().int().positive(),
    })
  ),
  customerEmail: z.string().email(),
  customerName: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request
    const { items, customerEmail, customerName } = CheckoutRequestSchema.parse(body);

    // Check for empty cart
    if (items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Carrinho vazio' },
        { status: 400 }
      );
    }

    // Validate that all products still exist in database (P6)
    const productIds = items.map((item) => item.productId);
    const existingProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true },
    });

    if (existingProducts.length !== productIds.length) {
      // Some products were deleted
      const deletedProducts = productIds.filter(
        (id) => !existingProducts.find((p) => p.id === id)
      );

      console.warn('⚠️  Some products were deleted:', deletedProducts);

      return NextResponse.json(
        {
          success: false,
          error:
            'Um ou mais produtos no seu carrinho foram removidos. Por favor, revise seu carrinho e tente novamente.',
        },
        { status: 400 }
      );
    }

    // Create Stripe session with metadata containing item IDs for webhook
    const session = await createCheckoutSession({
      items,
      customerEmail,
      customerName,
      // Metadata will be used in webhook to create OrderItems
      metadata: {
        itemsJson: JSON.stringify(
          items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          }))
        ),
      },
    });

    console.log(`✅ Checkout session created: ${session.id}`);

    return NextResponse.json(
      {
        success: true,
        sessionId: session.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[POST /api/stripe/checkout] Error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Dados inválidos',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao criar sessão de checkout',
      },
      { status: 500 }
    );
  }
}
