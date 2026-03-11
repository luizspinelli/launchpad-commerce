/**
 * LaunchPad Commerce - Stripe Webhook Handler
 * MIT License - Copyright (c) 2026 Luiz Spinelli
 * 
 * POST /api/stripe/webhook
 * Stripe webhook handler for payment events
 *
 * Listens to:
 * - checkout.session.completed (payment succeeded)
 * - charge.failed (payment failed)
 */

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/db';
import { sendOrderConfirmation } from '@/lib/email';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    if (!webhookSecret) {
      console.error('❌ STRIPE_WEBHOOK_SECRET not configured');
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 500 }
      );
    }

    const signature = request.headers.get('stripe-signature');
    if (!signature) {
      console.error('❌ Missing stripe-signature header');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    const body = await request.text();

    // Verify Stripe signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('❌ Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Signature verification failed' },
        { status: 400 }
      );
    }

    console.log(`📬 Webhook event: ${event.type}`);

    // Handle checkout.session.completed (payment succeeded)
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;

      try {
        // Check if order already exists (idempotency check)
        // Prevent duplicate orders if webhook is called twice
        const existingOrder = await prisma.order.findUnique({
          where: { stripeSessionId: session.id },
        });

        if (existingOrder) {
          console.log(`✅ Order already exists: ${existingOrder.id}. Skipping duplicate.`);
          return NextResponse.json({ ok: true }, { status: 200 });
        }

        // Parse items from metadata
        let orderItems: Array<{ productId: string; quantity: number; price: number }> = [];
        if (session.metadata?.itemsJson) {
          try {
            orderItems = JSON.parse(session.metadata.itemsJson);
          } catch (e) {
            console.warn('⚠️  Failed to parse itemsJson from metadata:', e);
          }
        }

        // Create Order with OrderItems (will not be duplicate due to check above)
        const order = await prisma.order.create({
          data: {
            stripeSessionId: session.id,
            customerEmail: session.customer_email || '',
            totalAmount: session.amount_total || 0,
            status: 'PAID',
            items: {
              create: orderItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                priceAtTime: item.price,
              })),
            },
          },
          include: {
            items: true,
          },
        });

        console.log(`✅ Order created: ${order.id} with ${order.items.length} items`);

        // Send confirmation email with download links
        try {
          // Fetch products with download links
          const productIds = orderItems.map((item) => item.productId);
          const products = await prisma.product.findMany({
            where: { id: { in: productIds } },
            select: { name: true, fileUrl: true },
          });

          const downloadLinks = products
            .filter((p) => p.fileUrl)
            .map((p) => ({
              name: p.name,
              url: p.fileUrl!,
            }));

          await sendOrderConfirmation(
            session.customer_email,
            order.id,
            session.amount_total,
            downloadLinks.length > 0 ? downloadLinks : undefined
          );
          console.log(`📧 Confirmation email sent to ${session.customer_email}`);
        } catch (emailErr) {
          console.error('❌ Email send failed:', emailErr);
          // Don't fail webhook if email fails - order already created
        }
      } catch (dbErr: any) {
        // Check if order already exists (idempotency)
        if (dbErr.code === 'P2002') {
          console.log('ℹ️  Order already exists (idempotent)');
          return NextResponse.json({ received: true });
        }
        throw dbErr;
      }
    }

    // Handle charge.failed (payment failed)
    if (event.type === 'charge.failed') {
      console.warn('⚠️  Payment failed for session');
      // TODO: Send failure notification email
      // TODO: Mark order as FAILED if exists
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('[POST /api/stripe/webhook] Error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Webhook processing failed',
      },
      { status: 500 }
    );
  }
}
