/**
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
        // Create Order in database
        const order = await prisma.order.create({
          data: {
            stripeSessionId: session.id,
            customerEmail: session.customer_email || '',
            totalAmount: session.amount_total || 0,
            status: 'PAID',
          },
        });

        console.log(`✅ Order created: ${order.id}`);

        // Send confirmation email
        try {
          await sendOrderConfirmation(
            session.customer_email,
            order.id,
            session.amount_total
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
