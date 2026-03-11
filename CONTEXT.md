# 📋 LaunchPad Commerce — Quick Context

**Created:** March 11, 2026  
**Status:** Development Phase 1 (Landing Page)  
**Repository:** https://github.com/luizspinelli/launchpad-commerce

---

## 🎯 Project Summary

**What:** Modern landing page + e-commerce platform to sell digital products online  
**Who:** Digital creators (educators, designers, authors, coaches)  
**Why:** Easy, beautiful, no friction — sell in minutes, not weeks  
**How:** Next.js 14 + React + Stripe + Resend + Prisma  
**When:** Launch March 30, 2026 (3 weeks from now)

---

## 📊 Quick Stats

- **Stack:** Next.js 14, TypeScript, TailwindCSS, Stripe, Resend, Prisma
- **Database:** SQLite (dev) → PostgreSQL (prod)
- **Hosting:** Vercel (automatic CI/CD)
- **Timeline:** 3 weeks (Week 1: Frontend, Week 2: Backend, Week 3: QA+Deploy)
- **Team:** 1 developer (you)
- **Budget:** €0 (free tier everything)

---

## 🎬 What to Build (MVP)

### Landing Page
- Hero section (headline, subheadline, CTA)
- Features section (3-5 key benefits)
- Testimonials (social proof)
- Product showcase
- FAQ section
- CTA + Footer

### Product Catalog
- Product listing (grid, pagination)
- Product detail page (image, description, price)
- "Add to Cart" button

### Checkout
- Cart review
- Stripe payment (hosted checkout)
- Thank you page (order confirmation)

### Admin Dashboard
- Overview (revenue, orders, conversion)
- Orders list (pagination, search, export)
- Product management (add/edit/delete)

### Email
- Order confirmation (Resend)
- Receipt with download link

---

## 🔌 API Endpoints (Quick Reference)

**Public:**
```
GET  /api/products           → List all products
GET  /api/products/:slug     → Product detail
POST /api/stripe/checkout    → Create Stripe session
POST /api/stripe/webhook     → Stripe webhook handler
```

**Admin (password protected):**
```
GET  /api/admin/dashboard    → Overview stats
GET  /api/admin/orders       → Orders list
GET  /api/admin/orders/:id   → Order details
POST /api/admin/products     → Create product
PATCH /api/admin/products/:id → Update product
DELETE /api/admin/products/:id → Delete product
```

---

## 🗄️ Database Models (Prisma)

```
Product
├── id, slug, name, description, price, image

Order
├── id, stripeSessionId, customerEmail, totalAmount, status
├── items → OrderItem[]
└── history → OrderHistory[]

OrderItem
├── orderId, productId, quantity, priceAtTime

AnalyticsEvent
├── eventType, customerEmail, productId, path, createdAt
```

---

## 📁 Project Structure

```
launchpad-commerce/
├── .bmad/                  # BMAD documentation
│   ├── discovery/          # Project brief, PRD, personas
│   ├── architecture/       # API design, database schema, system design
│   ├── implementation/     # Dev roadmap
│   └── decisions/          # 3 ADRs (Next.js, Stripe, Vercel)
│
├── app/
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── api/               # API routes
│   │   ├── products.ts
│   │   └── stripe/
│   ├── products/          # Product pages
│   ├── checkout/          # Checkout page
│   ├── thank-you/         # Thank you page
│   ├── admin/             # Admin dashboard
│   ├── components/        # React components
│   └── lib/               # Utils, db, helpers
│
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── .env.local
└── README.md
```

---

## 🛠️ Development Workflow

1. **Read:** Check `.bmad/` docs if confused
2. **Code:** Build the feature
3. **Test:** Manual testing (browser + API)
4. **Commit:** `git add . && git commit -m "..."` + `git push`

---

## 📅 Week 1 Plan (Landing Page)

| Day | Task | Hours | Status |
|-----|------|-------|--------|
| Mon-Tue | Hero + Features + Testimonials | 12h | ⏳ TODO |
| Wed-Thu | Product listing + detail pages | 12h | ⏳ TODO |
| Fri | Cart UI + Checkout form | 8h | ⏳ TODO |
| **Total** | **Landing page + Frontend** | **32h** | - |

---

## 🔑 Key Files to Reference

| Document | Purpose | Location |
|----------|---------|----------|
| **PRD** | What to build | `.bmad/discovery/prd-product-requirements.md` |
| **API Design** | How to implement backend | `.bmad/architecture/api-design.md` |
| **Database Schema** | Data models + migrations | `.bmad/architecture/database-schema.md` |
| **Dev Roadmap** | Week-by-week tasks | `.bmad/implementation/dev-roadmap.md` |
| **ADRs** | Why each tech choice | `.bmad/decisions/` |

---

## 💻 Quick Commands

```bash
# Start development server
npm run dev

# Build for production
npm build

# Type check
npm run type-check

# Database (later)
npx prisma migrate dev --name init
npx prisma studio

# Push to GitHub
git add .
git commit -m "description"
git push
```

---

## 🎯 Success Metrics

- ✅ Landing page live by end of Week 1
- ✅ Backend complete by end of Week 2
- ✅ Zero critical bugs in Week 3
- ✅ Lighthouse score >95
- ✅ First sale within 2 weeks of launch

---

## 📌 Important Links

- **GitHub Repo:** https://github.com/luizspinelli/launchpad-commerce
- **Dev Server:** http://localhost:3000 (when running `npm run dev`)
- **Vercel Deployment:** https://launchpad-commerce.vercel.app (when live)
- **Stripe Dashboard:** https://dashboard.stripe.com (test mode)
- **Resend Console:** https://resend.com (email logs)

---

## ⚡ Rules

- **No perfection:** MVP first, polish later
- **Push regularly:** Commit after each feature
- **Test as you go:** Don't wait for QA phase
- **Ask docs when stuck:** PRD + API Design + DB Schema answer 90% of questions
- **Keep it simple:** YAGNI (You Aren't Gonna Need It)

---

## 🚀 Next Steps

1. Open `http://localhost:3000` (run `npm run dev`)
2. See basic landing page
3. Start building Week 1 features
4. Push commits to GitHub
5. Reference `.bmad/` docs when confused

---

**Last Updated:** March 11, 2026 16:47 UTC  
**Ready to code?** YES ✅
