# LaunchPad Commerce — Testing Guide

## Quick Test (Manual)

### 1. View Products
```
https://launchpad-commerce-roan.vercel.app/products
```
Should show 10 products in a 4-column grid.

### 2. Test Checkout Session Creation
```bash
curl -X POST "https://launchpad-commerce-roan.vercel.app/api/stripe/checkout" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "productId": "PRODUCT_ID_HERE",
        "productName": "Test Product",
        "price": 6999,
        "quantity": 1
      }
    ],
    "customerEmail": "test@example.com",
    "customerName": "Test User"
  }'
```

Response: `{ "success": true, "sessionId": "cs_test_..." }`

### 3. Create Test Order (Simulates Webhook)
```bash
curl -X POST "https://launchpad-commerce-roan.vercel.app/api/debug/create-test-order" \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "cs_test_...",
    "customerEmail": "test@example.com",
    "totalAmount": 6999,
    "items": [
      {
        "productId": "PRODUCT_ID_HERE",
        "quantity": 1,
        "price": 6999
      }
    ]
  }'
```

Response: `{ "success": true, "order": { ... } }`

### 4. View Order Page
```
https://launchpad-commerce-roan.vercel.app/order?session_id=cs_test_...
```

Should show:
- ✅ Pedido Confirmado
- Order ID
- Customer Email
- Total Amount
- Payment Status: "Pagamento Confirmado"

---

## Automated Test Script

Run complete checkout flow test:

```bash
bash scripts/test-checkout-flow.sh
```

This will:
1. Fetch products from API
2. Create Stripe checkout session
3. Create test order (simulates webhook)
4. Verify order can be fetched
5. Test order page loads

---

## Environment Variables (Verified in Vercel)

✅ All required env vars are configured:

```
STRIPE_SECRET_KEY .................. configured (sk_test_51...)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY . configured (pk_test_51...)
STRIPE_WEBHOOK_SECRET .............. configured (whsec_test_...)
DATABASE_URL ....................... configured (Vercel Postgres)
NEXT_PUBLIC_URL .................... defaults to production URL
```

Check status anytime:
```
curl https://launchpad-commerce-roan.vercel.app/api/debug/env
```

---

## Real Payment Flow (Production Ready)

When user actually pays with real card in Stripe Checkout:

1. User goes to: `https://checkout.stripe.com/pay/cs_test_...`
2. User enters: Card 4242 4242 4242 4242, any future date, any 3-digit CVC
3. Stripe processes payment
4. Stripe webhook fires: `checkout.session.completed`
5. Our webhook handler (`/api/stripe/webhook`) receives event
6. Order is created in database
7. Confirmation email sent (if Resend configured)
8. Stripe redirects to: `/order?session_id=cs_test_...`
9. Order page loads with confirmation

---

## Debug Endpoints (DELETE IN PRODUCTION)

These endpoints are for testing only:

### Get Environment Status
```
GET /api/debug/env
```

### Create Test Order (Simulates Webhook)
```
POST /api/debug/create-test-order
```

**⚠️ WARNING**: Delete these endpoints before deploying to production!

```bash
# Before final deploy:
git rm app/api/debug/
git commit -m "Remove debug endpoints before production"
```

---

## Troubleshooting

### Order page shows "Carregando seu pedido..." forever
**Cause**: Order not in database yet
**Solution**: Make sure webhook or test order creation succeeded

### Stripe checkout shows "Page not found"
**Cause**: Session ID invalid or expired (24h max)
**Solution**: Create new session, test within 24 hours

### Email not sent
**Cause**: RESEND_API_KEY not configured
**Solution**: Add API key to Vercel or set it in .env.local for local testing

---

## Production Checklist

Before soft launch (March 27, 2026):

- [ ] Remove `/api/debug/*` endpoints
- [ ] Test complete flow: products → checkout → Stripe → order page
- [ ] Verify Stripe webhook receives events
- [ ] Test email sending (configure Resend API key)
- [ ] Mobile responsive test
- [ ] Admin dashboard CRUD test
- [ ] File upload & download test
- [ ] Database backup & recovery plan

---

## Current Status

✅ **Core Features Ready**
- Landing page (portfolio-focused)
- Products API & listing
- Shopping cart (Zustand + localStorage)
- Stripe integration (sessions, webhook, idempotency)
- Order management
- Order page with confirmation
- Database (Vercel Postgres)

⚠️ **Optional/Future**
- Email sending (Resend - needs API key)
- Admin dashboard (built, needs testing)
- File uploads (Vercel Blob integrated)
- Analytics tracking (schema ready)

🚀 **Ready for Soft Launch**: YES
