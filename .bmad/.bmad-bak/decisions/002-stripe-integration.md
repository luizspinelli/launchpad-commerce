# ADR 002: Stripe for Payment Processing

**Status:** ✅ Accepted  
**Date:** March 11, 2026  
**Author:** Luiz Spinelli  
**Category:** Payment Infrastructure

---

## Context

We need to process online payments securely for:
- Digital products (ebooks, courses, templates)
- Subscriptions (optional future phase)
- Multiple payment methods (card, Apple Pay, Google Pay)
- PCI compliance without handling sensitive data

## Decision

**Use Stripe for payment processing and webhook handling**

## Rationale

### Security
- **PCI Level 1 Compliance:** Stripe handles all card data (we never touch it)
- **Fraud Detection:** Built-in machine learning for fraud prevention
- **3D Secure:** Optional strong authentication for high-risk transactions
- **Tokenization:** Safe storage of payment methods

### Feature Set
- **Multiple Payment Methods:** Credit cards, digital wallets (Apple Pay, Google Pay, Link)
- **Webhooks:** Real-time event handling (payment success, refunds, disputes)
- **Checkout:** Pre-built Stripe Checkout (reduce development time)
- **Test Mode:** Free sandbox for development & testing
- **Pricing:** Simple: 2.9% + $0.30 per transaction (only when you sell)

### Developer Experience
- **SDK:** Excellent TypeScript types & documentation
- **Integration:** Works perfectly with Next.js API routes
- **Testing:** Comprehensive test cards for all scenarios
- **Monitoring:** Stripe Dashboard with detailed transaction history

### Ecosystem
- **Vercel + Stripe:** Native integration, great docs
- **Resend + Stripe:** Webhooks → send confirmation emails
- **Database:** Order models map cleanly to Stripe sessions

---

## Alternatives Considered

### 1. **PayPal** ❌
**Why not:**
- Higher transaction fees (3.49% + $0.49)
- User experience friction (redirect to PayPal)
- Less flexible webhook system

### 2. **Square** ❌
**Why not:**
- Smaller ecosystem (fewer integrations)
- Better for physical retail (POS), less for online
- Less mature online payment docs

### 3. **Paddle** ❌
**Why not:**
- Higher fees (5% + fixed fee per transaction)
- Overkill for our MVP (Paddle = full payment provider + platform)
- Less control over customer experience

### 4. **Direct Bank Integration** ❌
**Why not:**
- Massive compliance burden (PCI DSS Level 1)
- Regulatory complexity (AML, KYC)
- Build/maintain payment infrastructure = 6-12 months
- Not worth it for MVP

---

## Consequences

### Positive
✅ Zero PCI compliance burden (Stripe handles it)  
✅ Revenue-based pricing (free until you sell)  
✅ Excellent documentation & community  
✅ Scales from MVP to large volume  
✅ Webhook system enables automation (emails, inventory, etc.)  

### Negative
❌ Transaction fees (2.9% + $0.30) — unavoidable with any processor  
❌ Stripe account required (minimal setup)  
❌ Dependency on Stripe uptime (~99.99% SLA)  

### Mitigation
- Use Stripe test mode for development (free, no limits)
- Monitor Stripe status page for uptime
- Implement proper error handling for failed payments

---

## Implementation

### API Route Example

```typescript
// app/api/stripe/checkout.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const { items, email } = await request.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map((item: any) => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100, // in cents
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/products`,
    customer_email: email,
  });

  return Response.json({ sessionId: session.id });
}
```

### Webhook Handler

```typescript
// app/api/stripe/webhook.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // 1. Create order in database
    // 2. Send confirmation email
    // 3. Grant access to product (if digital)
  }

  return Response.json({ received: true });
}
```

---

## Environment Variables

```env
# .env.local
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...
```

---

## Related Decisions

- [ADR 001: Next.js Selection](./001-next-js-selection.md)
- [ADR 003: Deployment on Vercel](./003-deployment-vercel.md)

---

## References

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Webhook Events](https://stripe.com/docs/api/events)
- [PCI Compliance with Stripe](https://stripe.com/guides/pci-compliance)
- [Stripe + Next.js](https://stripe.com/docs/stripe-js/react#withStripe)

---

**Approved By:** Self (POC)  
**Last Updated:** March 11, 2026
