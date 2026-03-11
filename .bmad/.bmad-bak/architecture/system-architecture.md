# 🏗️ System Architecture — LaunchPad Commerce

**Version:** 1.0  
**Date:** March 11, 2026  
**Status:** Approved for Implementation  

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        USERS (Creators/Buyers)              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│                    VERCEL (Global Edge Network)              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │               Next.js 14 Application                   │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │ │
│  │  │   Frontend   │  │  API Routes  │  │ Middleware │  │ │
│  │  │   (React)    │  │ (Stripe,     │  │ (Auth,     │  │ │
│  │  │              │  │  Resend,     │  │  Logging)  │  │ │
│  │  │ - Landing    │  │  Analytics)  │  │            │  │ │
│  │  │ - Products   │  │              │  │            │  │ │
│  │  │ - Checkout   │  │ - Webhooks   │  │            │  │ │
│  │  │              │  │ - Orders     │  │            │  │ │
│  │  └──────────────┘  └──────────────┘  └────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────┬──────────────────┬──────────────────┬─────────────┘
           │                  │                  │
    ┌──────▼────┐     ┌──────▼────┐     ┌──────▼────┐
    │  Stripe   │     │  Resend   │     │ Plausible │
    │ (Payments)│     │  (Email)  │     │(Analytics)│
    └───────────┘     └───────────┘     └───────────┘
```

---

## 2. Technology Stack

### Frontend
```typescript
// Runtime & Framework
- Node.js: 20+
- Next.js: 14 (App Router)
- React: 18
- TypeScript: 5.3+

// Styling & Components
- TailwindCSS: 3.3+
- Shadcn/ui: Latest (optional)
- Lucide Icons: Latest

// State & Data
- React Hooks (useState, useContext)
- Fetch API (data fetching)
- Client-side caching (optional)

// UI Features
- Responsive Design (mobile-first)
- Dark Mode (optional)
- Form Validation (client-side)

// Build & Optimization
- Image Optimization: next/image
- Font Optimization: next/font
- Code Splitting: Automatic
- Bundle Analysis: webpack-bundle-analyzer
```

### Backend (API Routes)
```typescript
// Node.js API Routes (Next.js)
- Express middleware (built-in)
- JSON request/response
- Error handling
- Logging (Winston or Pino)

// Authentication & Security
- Basic password protection (env var) for admin
- JWT for API routes (optional future)
- Rate limiting: Vercel's built-in
- CORS: Configured per endpoint

// External Integrations
- Stripe SDK (payments)
- Resend SDK (email)
- Plausible API (analytics)

// Database Interaction
- Prisma ORM (type-safe queries)
- SQLite (MVP)
- PostgreSQL (production upgrade)
```

### Database
```sql
-- Schema (Prisma)
model Product {
  id String @id @default(cuid())
  name String
  slug String @unique
  description String
  price Int (in cents: $9.99 = 999)
  image String (URL)
  created_at DateTime @default(now())
}

model Order {
  id String @id @default(cuid())
  stripe_session_id String @unique
  customer_email String
  total_amount Int (in cents)
  items Json (product_id, quantity, price)
  status String (paid, refunded, failed)
  created_at DateTime @default(now())
}

model Analytics {
  id String @id @default(cuid())
  event_type String (page_view, add_to_cart, checkout_start, purchase)
  customer_email String? (nullable for anonymous)
  product_id String?
  metadata Json
  created_at DateTime @default(now())
}
```

### Hosting & Deployment
```
Platform: Vercel
- Automatic CI/CD from GitHub
- Zero-config Next.js deployment
- Global edge network (serverless functions)
- Environment variables (secure secrets)
- Automatic SSL/TLS certificates
- Monitoring & logs
- Rollback capability
```

---

## 3. API Routes & Endpoints

### Authentication & Admin
```
GET /api/admin/health          → Health check
POST /api/admin/login          → Simple password auth
GET /api/admin/dashboard       → Overview stats
```

### Products
```
GET /api/products              → List all products
GET /api/products/[slug]       → Get product details
POST /api/products             → Create product (admin)
PATCH /api/products/[id]       → Update product (admin)
DELETE /api/products/[id]      → Delete product (admin)
```

### Cart & Checkout
```
POST /api/cart/add             → Add item to cart
POST /api/cart/remove          → Remove from cart
GET /api/cart                  → Get cart contents

POST /api/stripe/checkout      → Create Stripe Checkout session
POST /api/stripe/webhook       → Stripe webhook (payment events)
```

### Orders
```
GET /api/orders                → List orders (admin)
GET /api/orders/[id]           → Get order details (admin)
POST /api/orders/[id]/cancel   → Cancel order (admin)
```

### Email
```
POST /api/email/send-confirmation → Trigger confirmation email
POST /api/email/send-receipt       → Trigger receipt email
```

### Analytics
```
GET /api/analytics/overview    → Dashboard stats
GET /api/analytics/orders      → Orders over time
GET /api/analytics/revenue     → Revenue metrics
```

---

## 4. Data Flow Diagrams

### Customer Purchase Flow
```
1. Customer lands on /              (landing page loads)
   ▼
2. Navigates to /products           (product listing)
   ▼
3. Clicks product → /products/[slug] (product detail)
   ▼
4. Adds to cart                     (client-side state)
   ▼
5. Clicks "Checkout"                (navigates to /checkout)
   ▼
6. Clicks "Pay with Stripe"         (POST /api/stripe/checkout)
   ▼
7. Redirected to Stripe Checkout    (hosted, Stripe handles security)
   ▼
8. Enters email + card details      (Stripe PCI compliant)
   ▼
9. Clicks "Pay"                     (Stripe processes)
   ▼
10. Success → Webhook /api/stripe/webhook (async event)
    ▼
11. Create Order in database        (insert order record)
    ▼
12. Send confirmation email         (POST /api/email/send-confirmation)
    ▼
13. Redirect to /thank-you          (display order summary)
    ▼
14. Customer receives email         (Resend delivers)
    ▼
15. Downloads product               (from email link or thank-you page)
```

### Creator Dashboard Flow
```
1. Creator navigates to /admin
   ▼
2. Authenticates (password or email magic link)
   ▼
3. Sees dashboard stats (GET /api/admin/dashboard)
   - Total revenue
   - Order count
   - Conversion rate
   ▼
4. Navigates to "Orders"           (GET /api/orders)
   - List of recent orders
   - Customer email, amount, date
   ▼
5. Clicks order → /admin/orders/[id] (view details)
   - All items, price breakdown
   - Customer email
   - Payment status
   ▼
6. Can export orders (CSV download)
   ▼
7. Navigates to "Products"
   - List all products
   - Edit/delete actions
   ▼
8. Adds new product (form submission)
   - POST /api/products
   - Creates product in database
   ▼
9. Back to dashboard (refresh analytics)
```

---

## 5. Security Architecture

### Authentication & Authorization
```
Admin Access:
- Simple password (env var) for MVP
- Future: JWT tokens + refresh
- Middleware: Check auth on /api/admin/* routes

API Security:
- No auth required for public endpoints (/products, /checkout)
- Admin endpoints protected by middleware
- Stripe webhooks verified (signature validation)
```

### PCI Compliance
```
✅ Never touch credit card data
   - Stripe Checkout is PCI Level 1
   - All card data handled by Stripe
   - We only store: customer_email, stripe_session_id

✅ HTTPS everywhere
   - Vercel automatic SSL/TLS
   - All data in transit encrypted

✅ SQL Injection prevention
   - Prisma ORM with parameterized queries
   - No raw SQL

✅ XSS Protection
   - React auto-escapes content
   - Input validation (Zod schema)
```

### Environment Variables (Secrets)
```env
# .env.local (never commit, only in Vercel)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_live_...
RESEND_API_KEY=re_...
ADMIN_PASSWORD=...
DATABASE_URL=postgresql://...
```

---

## 6. Performance Architecture

### Frontend Performance
```
Image Optimization:
- next/image component
- Automatic WebP conversion
- Responsive srcsets
- Lazy loading

Font Optimization:
- Self-hosted fonts (no external CDN)
- Preload critical fonts
- Subset fonts (Latin only)

Code Splitting:
- Per-route bundles
- Dynamic imports for heavy libs
- Tree-shaking (remove unused code)

Caching Strategy:
- Static: Landing page, products (ISR 3600s)
- Dynamic: Cart, orders (no cache)
- Browser: Images, CSS, JS (1 year)
- CDN: Vercel edge cache (5 minutes)
```

### Backend Performance
```
Database:
- Indexes on frequently queried fields (product_id, customer_email)
- Pagination (default 50 items/page)
- Connection pooling

API:
- Minimal response payloads
- JSON compression (gzip)
- Response caching (Redis optional)

Stripe Integration:
- Use Stripe Checkout (pre-built, fast)
- Async webhooks (don't block checkout)
- Retry logic on failures
```

### Monitoring
```
Metrics:
- Lighthouse score (target >95)
- Core Web Vitals (LCP, FID, CLS)
- Page load time (target <2s)
- API response time (target <500ms)
- Error rate (target <0.1%)

Tools:
- Vercel Web Analytics (built-in)
- Plausible Analytics (privacy-first)
- Stripe Dashboard (payment monitoring)
- Resend Dashboard (email logs)
```

---

## 7. Scalability & Growth Path

### MVP (Week 1-2)
```
- Single product or small product list
- SQLite database (local or serverless)
- Basic analytics (page views, orders)
- Vercel free tier (sufficient)
```

### Growth Phase (Month 1-3)
```
- Multiple products
- PostgreSQL database (scale beyond SQLite)
- Advanced analytics (cohorts, funnels)
- Customer portal (login, download history)
- Upgrade to Vercel Pro ($20/mo)
```

### Scale Phase (Month 3+)
```
- Subscriptions (recurring billing)
- Multiple currencies
- Affiliate/referral system
- White-labeling (custom domain)
- API for integrations
- Edge caching optimization
- Database sharding (if needed)
```

---

## 8. Deployment Architecture

### CI/CD Pipeline
```
GitHub Main Branch Push
  │
  ├─→ GitHub Actions (automated)
  │    ├─ Run tests
  │    ├─ Run linter
  │    └─ Build project
  │
  ├─→ Vercel Auto-Deploy
  │    ├─ Build Next.js project
  │    ├─ Run Prisma migrations
  │    ├─ Deploy to edge network
  │    └─ Health check
  │
  └─→ Production Live
       ├─ URL: https://launchpad-commerce.vercel.app
       └─ Custom domain: https://launchpad.spinelli.dev.br (future)
```

### Rollback Strategy
```
If deployment fails:
1. Vercel automatically rolls back to previous version
2. Manual rollback via Vercel dashboard (one-click)
3. Git revert (emergency)

Database migrations:
- Always backward compatible
- Prisma version control
- Manual rollback if needed
```

---

## 9. Infrastructure as Code

### Vercel Config (vercel.json)
```json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY": "@stripe_pk",
    "STRIPE_SECRET_KEY": "@stripe_sk",
    "STRIPE_WEBHOOK_SECRET": "@stripe_webhook",
    "RESEND_API_KEY": "@resend_key",
    "DATABASE_URL": "@database_url"
  },
  "functions": {
    "api/**": {
      "maxDuration": 10
    }
  }
}
```

### Next.js Config (next.config.js)
```javascript
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'cdn.example.com'],
    formats: ['image/avif', 'image/webp'],
  },
  headers: [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
      ],
    },
  ],
};
```

---

## 10. Architecture Decisions (ADRs)

| Decision | Rationale | Status |
|----------|-----------|--------|
| Next.js 14 | ISR + SSR, Vercel native, TypeScript | ✅ Decided |
| Stripe Checkout | PCI compliant, secure, minimal setup | ✅ Decided |
| Resend Email | Modern API, reliable, free tier | ✅ Decided |
| SQLite (MVP) | Zero setup, file-based, perfect for MVP | ✅ Decided |
| Vercel Hosting | Zero-config, free tier, auto-scale | ✅ Decided |
| Prisma ORM | Type-safe, migrations, easy to learn | ✅ Decided |

---

## 11. System Health & Monitoring

### Health Checks
```
GET /api/health
→ Database connectivity ✅
→ Stripe API connectivity ✅
→ Resend API connectivity ✅
→ Response: { status: 'ok' }
```

### Alerting (Optional)
```
- Uptime monitoring: Vercel (built-in)
- Error rate: Sentry (optional)
- Performance: Vercel Web Vitals
- Email delivery: Resend dashboard
- Payments: Stripe dashboard
```

---

## 12. Disaster Recovery

### Backup Strategy
```
Database:
- SQLite: Backed up to git (dev)
- PostgreSQL: Automated backups (prod)

Stripe:
- No backup needed (Stripe = source of truth for orders)
- Customer data stored locally (our backup)

Code:
- GitHub repo (git history)
- Vercel deployments (versioned)
```

### Failure Scenarios
```
Scenario 1: Stripe Down
- Impact: Can't process new payments
- Mitigation: Display "maintenance" message, retry queue
- Recovery: Automatic when Stripe recovers

Scenario 2: Database Corruption
- Impact: Can't query orders
- Mitigation: Automated backups, Stripe webhook as source
- Recovery: Restore from backup (manual, ~1 hour)

Scenario 3: Email Service Down
- Impact: Can't send confirmations
- Mitigation: Retry queue (exponential backoff)
- Recovery: Automatic when Resend recovers
```

---

**Document Owner:** Luiz Spinelli (via BMAD)  
**Last Updated:** March 11, 2026  
**Next Steps:** Implementation → API design, database schema, dev roadmap
