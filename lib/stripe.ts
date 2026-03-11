/**
 * LaunchPad Commerce - Stripe Client Configuration
 * MIT License - Copyright (c) 2026 Luiz Spinelli
 * 
 * Stripe initialization and payment processing helpers
 */

import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY;

if (!stripeKey) {
  console.warn('⚠️  STRIPE_SECRET_KEY not configured. Stripe features disabled.');
}

export const stripe = new Stripe(stripeKey || '', {
  apiVersion: '2023-10-16',
});

export const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

/**
 * Create a Stripe checkout session
 */
export async function createCheckoutSession(params: {
  items: Array<{
    productId: string;
    productName: string;
    price: number; // in cents
    quantity: number;
  }>;
  customerEmail: string;
  customerName: string;
}) {
  if (!stripeKey) {
    throw new Error('Stripe not configured');
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://launchpad-commerce-roan.vercel.app';

  const lineItems = params.items.map((item) => ({
    price_data: {
      currency: 'brl',
      product_data: {
        name: item.productName,
        metadata: {
          productId: item.productId,
        },
      },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    customer_email: params.customerEmail,
    metadata: {
      customerName: params.customerName,
      itemCount: params.items.length.toString(),
    },
    success_url: `${baseUrl}/order?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/checkout`,
  });

  return session;
}
