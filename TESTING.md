# LaunchPad Commerce - Testing Guide

## 🧪 Full Checkout Flow Test

### Prerequisites
- Stripe test API keys configured in `.env.local`
- Admin password set
- Database ready (PostgreSQL)
- Dev server running: `npm run dev`

### Step-by-Step Testing

#### 1. **Create a Test Product** (Admin)

```
1. Go to http://localhost:3000/admin/login
2. Enter ADMIN_PASSWORD from .env
3. Click "Dashboard" → "Produtos" → "➕ Novo Produto"
4. Fill form:
   - Nome: "Test Product"
   - Slug: "test-product" (auto-generated)
   - Preço: 99.99
   - Descrição: "Test Description"
   - Imagem: https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500 (any Unsplash URL)
   - Arquivo: (optional - use a small PDF for testing)
5. Click "✅ Criar Produto"
6. Verify: Product shows in /admin/products list
```

#### 2. **Browse Products** (Customer)

```
1. Go to http://localhost:3000
2. Click "🛍️ Ver Demo" or go to /products
3. You should see:
   - 10 seed products + your test product
   - Grid layout with price, image, name
4. Click on "Test Product" → details page
5. Verify: Name, price, image, "Adicionar ao Carrinho" button
```

#### 3. **Add to Cart**

```
1. On product detail page, click "➕ Adicionar ao Carrinho"
2. Go to /checkout
3. Verify:
   - Test Product appears in cart
   - Quantity defaults to 1
   - Total = R$ 99.99
   - Cart sidebar shows "1 items"
```

#### 4. **Checkout with Stripe**

```
1. On checkout page, fill form:
   - Nome: "John Test"
   - Email: your-test@example.com
2. Click "Ir para Stripe Checkout"
3. You're redirected to Stripe Hosted Checkout
4. Fill payment form:
   - Card: 4242 4242 4242 4242 (test card)
   - Expiry: 12/25 (any future date)
   - CVC: 123 (any 3 digits)
   - Name: John Test
5. Click "Pagar" (or "Pay" in English)
6. Wait for redirect...
```

#### 5. **Verify Order Confirmation Page**

```
Expected: Redirect to /order?session_id={STRIPE_SESSION_ID}

Verify on order page:
✅ Green checkmark (✅)
✅ "Pedido Confirmado!" title
✅ Order ID appears
✅ Status: "Pagamento Confirmado"
✅ Email: your-test@example.com
✅ Total: R$ 99.99
✅ Date/time displays
```

#### 6. **Verify Email Confirmation**

```
Expected: Email sent to your-test@example.com

Check inbox for:
✅ Subject: "✅ Pedido Confirmado | LaunchPad Commerce"
✅ Order ID
✅ Amount
✅ Next steps
✅ 📥 Downloads section (IF product has file):
   - File name
   - Download button/link
✅ Security message
```

#### 7. **Test Download (if file uploaded)**

```
1. Click download link in email
2. File should download (PDF, ZIP, etc)
3. Or go back to /order?session_id=... page
4. Scroll to "📥 Seus Downloads" section
5. Click download button
6. File downloads
```

#### 8. **Admin: View Order**

```
1. Go to /admin/orders
2. Click on your order
3. Verify:
   - Order details display
   - Items show with quantity & price
   - Status shows "PAID"
   - Customer email shows
```

#### 9. **Admin: Logout**

```
1. On /admin, click "🚪 Logout" in sidebar footer
2. Verify: Redirects to /admin/login
3. Try accessing /admin → redirects to /admin/login
```

---

## 🔴 Critical Issues to Check

| Test | Expected | Fail = 🔴 |
|------|----------|-----------|
| Product appears in cart | ✅ Yes | ❌ Cart empty |
| Stripe redirect works | ✅ Yes | ❌ Page breaks |
| Order created in DB | ✅ Yes | ❌ 404 on order page |
| Email sent | ✅ Yes | ❌ No email received |
| Download links in email | ✅ Yes (if file) | ❌ No download section |
| Order page shows data | ✅ Real data | ❌ Mock data |
| OrderDownloadSection renders | ✅ Download buttons visible | ❌ Empty or missing |

---

## 🐛 Debugging

### Build Issues
```bash
npm run type-check  # Check TypeScript
npm run build       # Full build
```

### Database Issues
```bash
npx prisma migrate dev  # Run pending migrations
npx prisma studio      # Open Prisma GUI
```

### Stripe Issues
- Check Stripe dashboard → Events → webhook logs
- Verify STRIPE_WEBHOOK_SECRET matches Webhook endpoint
- Check /api/stripe/webhook logs in terminal

### Email Issues
- Verify RESEND_API_KEY in .env
- Check Resend dashboard for delivery
- Check spam/promotions folder

---

## ✅ Checklist Before Soft Launch

- [ ] Test product creation (admin)
- [ ] Test add to cart
- [ ] Test checkout with test card
- [ ] Verify order page loads with real data
- [ ] Verify email sent with order details
- [ ] Verify download links in email (if applicable)
- [ ] Verify OrderDownloadSection renders on order page
- [ ] Test admin logout
- [ ] Test admin can view orders
- [ ] Build passes (`npm run build`)
- [ ] No TypeScript errors

---

## 🚀 Ready for Launch

If all tests pass, you're ready for soft launch on March 27! 🎉
