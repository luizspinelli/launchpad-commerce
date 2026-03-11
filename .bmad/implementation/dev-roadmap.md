# 🗓️ Development Roadmap — LaunchPad Commerce

**Version:** 1.0  
**Date:** March 11, 2026  
**Timeline:** 2 weeks (March 17 - March 30)  
**Status:** Ready for Development

---

## 📋 Overview

```
Week 1 (Mar 17-21):  Setup + Frontend (Landing + Products)
Week 2 (Mar 24-28):  Backend + Integration (Stripe + Email + Deploy)
Soft Launch:         Mar 27 (internal)
Hard Launch:         Mar 30 (public)
```

**Daily Commitment:** 6-8 hours  
**Total Development Time:** ~100 hours

---

## ⚡ Prerequisites (Before Starting)

```
✅ Node.js 20+ installed
✅ GitHub account + repo created (luizspinelli/launchpad-commerce)
✅ Stripe account (test mode free)
✅ Resend account (100 emails/day free)
✅ Vercel account connected to GitHub
✅ VS Code + Claude Code extension
```

**Setup Time:** 1-2 hours  
**Deadline:** Mar 16 (before Week 1 starts)

---

## 📅 WEEK 1: Frontend Foundation & Landing Page

### **Monday, March 17 (8h)**

#### Morning (4h)
- [ ] **[0.5h]** Review all BMAD docs (Project Brief, PRD, Personas, Architecture)
- [ ] **[1.5h]** Setup Next.js 14 project
  ```bash
  npx create-next-app@latest launchpad --typescript --tailwind --app
  cd launchpad
  npm install stripe @stripe/react-stripe-js resend zod
  ```
- [ ] **[1.5h]** Configure TailwindCSS, setup file structure
  ```
  app/
  ├── layout.tsx
  ├── page.tsx (landing)
  ├── products/
  │   ├── page.tsx (listing)
  │   └── [slug]/
  │       └── page.tsx (detail)
  ├── checkout/
  │   └── page.tsx
  ├── thank-you/
  │   └── page.tsx
  ├── api/
  │   ├── products.ts
  │   └── stripe/
  ├── components/
  └── lib/
  ```
- [ ] **[0.5h]** Create root layout + navbar component
- [ ] **Commit:** "Initial Next.js 14 setup + TailwindCSS config"

#### Afternoon (4h)
- [ ] **[2h]** Build Hero section (landing page)
  - Headline, subheadline, CTA button
  - Hero image placeholder
  - Mobile responsive
- [ ] **[1h]** Build Features section
  - 3 columns on desktop, 1 on mobile
  - Icons (use Lucide)
  - Feature descriptions
- [ ] **[1h]** Build Testimonials section
  - Card-based layout
  - Star rating component
  - Quote text
- [ ] **Commit:** "Landing page hero + features + testimonials"

---

### **Tuesday, March 18 (8h)**

#### Morning (4h)
- [ ] **[2h]** Build Product Catalog Page
  - Product grid (3 columns on desktop)
  - Product cards (image, name, price, description)
  - "View Details" button
  - Mock data (3-5 products)
- [ ] **[1h]** Build Product Detail Page
  - Product image / gallery
  - Product name, price, description
  - Features list
  - "Add to Cart" button
  - Related products (mock)
- [ ] **[1h]** Setup client-side cart state
  - Use React Context or Zustand
  - Add to cart functionality
  - Cart persistance (localStorage)
- [ ] **Commit:** "Product catalog + detail pages + cart state"

#### Afternoon (4h)
- [ ] **[2h]** Build Checkout Page
  - Cart review (show items, total)
  - Cart item removal
  - Apply coupon input (disabled for MVP)
  - "Proceed to Payment" button
- [ ] **[1h]** Build Thank You Page
  - Order confirmation message
  - Order details (items, total, date)
  - Download button (placeholder)
  - FAQ/next steps
- [ ] **[1h]** Complete landing page
  - FAQ section (collapsible)
  - CTA section
  - Footer
- [ ] **Commit:** "Checkout + thank you page + complete landing page"

---

### **Wednesday, March 19 (8h)**

#### Full Day: Database Setup + API Routes (Products)

- [ ] **[1h]** Install & configure Prisma
  ```bash
  npm install @prisma/client
  npx prisma init
  ```
- [ ] **[1h]** Configure PostgreSQL (Vercel Postgres)
  ```
  # Production: Vercel provides DATABASE_URL
  # Local: Leave empty (schema compatible with PostgreSQL)
  ```
- [ ] **[1h]** Create Prisma schema (copy from docs)
  ```bash
  npx prisma migrate dev --name init
  ```
- [ ] **[1h]** Seed database with test products
  ```bash
  npx prisma db seed
  ```
- [ ] **[2h]** Create API routes
  - `GET /api/products` (list)
  - `GET /api/products/[slug]` (detail)
  - Fetch from database instead of mock data
- [ ] **[1h]** Update frontend to use API
  - Replace mock data with API calls
  - Handle loading/error states
- [ ] **Commit:** "Prisma setup + database + product API routes"

---

### **Thursday, March 20 (8h)**

#### Full Day: Stripe Setup + Checkout API

- [ ] **[1h]** Setup Stripe account & get API keys
  ```
  # .env.local
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
  STRIPE_SECRET_KEY=sk_test_...
  ```
- [ ] **[2h]** Create Stripe checkout API route
  - `POST /api/stripe/checkout`
  - Validate items
  - Create Stripe Checkout Session
  - Return sessionId
- [ ] **[1h]** Connect checkout page to Stripe
  - Use `@stripe/react-stripe-js`
  - Redirect to Stripe Checkout on "Proceed to Payment"
  - Handle success/cancel URLs
- [ ] **[2h]** Setup Stripe webhook handler
  - `POST /api/stripe/webhook`
  - Verify signature
  - Create order in database on `checkout.session.completed`
  - Log webhook event
- [ ] **[1h]** Setup webhook in Stripe dashboard
  - https://launchpad-commerce.vercel.app/api/stripe/webhook
  - Subscribe to: checkout.session.completed
  - Copy webhook secret
- [ ] **[1h]** Test full checkout flow
  - Use Stripe test cards
  - Verify order created in database
  - Check webhook logs
- [ ] **Commit:** "Stripe integration + checkout API + webhook handler"

---

### **Friday, March 21 (6h)**

#### Full Day: Email Setup + Polish

- [ ] **[1h]** Setup Resend account & get API key
  ```
  # .env.local
  RESEND_API_KEY=re_...
  ```
- [ ] **[2h]** Create order confirmation email API route
  - `POST /api/email/send-confirmation`
  - Use Resend SDK to send email
  - Include order details, receipt, download link (placeholder)
  - Trigger on webhook (order created)
- [ ] **[2h]** Polish & testing
  - Test end-to-end: landing → product → checkout → email
  - Mobile responsiveness check
  - Error handling & error messages
  - Lighthouse audit (target >90)
- [ ] **[1h]** Commit & push to GitHub
- [ ] **Commit:** "Email integration + polish + Lighthouse optimization"

---

### **Week 1 Summary**
```
✅ Landing page complete (hero, features, testimonials, FAQ)
✅ Product catalog (listing + detail pages)
✅ Shopping cart (add, remove, persist)
✅ Checkout page (review items, total)
✅ Thank you page (order confirmation)
✅ Database (Prisma + SQLite + seed)
✅ API routes (products, cart, checkout)
✅ Stripe integration (checkout + webhook)
✅ Email setup (Resend)
✅ Lighthouse score >90

Status: Ready for backend completion & deployment
```

---

## 📅 WEEK 2: Backend Completion + Admin + Deploy

### **Monday, March 24 (8h)**

#### Full Day: Admin Dashboard Setup

- [ ] **[2h]** Create admin routes (protected)
  - `GET /api/admin/dashboard` (overview stats)
  - `GET /api/admin/orders` (list orders)
  - `GET /api/admin/orders/[id]` (order details)
  - Simple password auth (env var)
- [ ] **[2h]** Create admin UI pages
  - `/admin/login` (password prompt)
  - `/admin/dashboard` (overview stats)
  - `/admin/orders` (orders table, pagination)
  - `/admin/orders/[id]` (order details)
- [ ] **[2h]** Build dashboard stats
  - Total revenue (this month, all-time)
  - Order count
  - Conversion rate
  - Recent orders
  - Revenue trend (chart — optional)
- [ ] **[2h]** Build orders table
  - List all orders (paginated)
  - Filter by status, search by email
  - Export to CSV
  - View order details
- [ ] **Commit:** "Admin dashboard + API routes + orders table"

---

### **Tuesday, March 25 (8h)**

#### Full Day: Analytics + Advanced Features

- [ ] **[2h]** Setup analytics tracking
  - Track page views (landing, products, checkout)
  - Track conversions (add to cart, purchase)
  - Store in database (AnalyticsEvents table)
- [ ] **[2h]** Create analytics endpoints
  - `GET /api/analytics/overview`
  - Return: page views, conversion rate, top products
  - Add to dashboard
- [ ] **[2h]** Product management API
  - `POST /api/admin/products` (create)
  - `PATCH /api/admin/products/[id]` (update)
  - `DELETE /api/admin/products/[id]` (delete)
- [ ] **[2h]** Testing & edge cases
  - Test checkout with various products
  - Test admin operations
  - Test error handling (invalid inputs, Stripe failures)
  - Test webhook retry logic
- [ ] **Commit:** "Analytics + product management + error handling"

---

### **Wednesday, March 26 (8h)**

#### Full Day: QA & Bug Fixes

- [ ] **[2h]** Manual testing
  - Complete purchase flow (end-to-end)
  - Check email delivery
  - Verify order in database
  - Check admin dashboard
  - Test on mobile
- [ ] **[2h]** Lighthouse audit & optimization
  - Target: Lighthouse >95 on all metrics
  - Optimize images (next/image)
  - Code splitting
  - Minify & compress assets
- [ ] **[2h]** Bug fixes & polish
  - Error messages (user-friendly)
  - Loading states (show spinners)
  - Empty states (no products, no orders)
  - Edge cases (failed payments, webhook retries)
- [ ] **[2h]** Documentation
  - Update README with setup instructions
  - Document API endpoints
  - Document environment variables
  - Add screenshot/video of demo
- [ ] **Commit:** "QA + optimizations + documentation"

---

### **Thursday, March 27 (8h)**

#### Full Day: Deployment Setup + Soft Launch

- [ ] **[1h]** Setup Vercel deployment
  ```bash
  npm install -g vercel
  vercel
  ```
- [ ] **[1h]** Configure environment variables in Vercel
  - Stripe (public + secret keys)
  - Resend API key
  - Database URL (PostgreSQL if upgraded)
  - Admin password
- [ ] **[2h]** Setup PostgreSQL on Vercel (production)
  - Vercel automatically provides Vercel Postgres
  - Set DATABASE_URL environment variable
  - Migration runs automatically on first deploy
  - Verify data integrity in production
- [ ] **[2h]** Final testing on production
  - Test checkout with Stripe live/test
  - Check email delivery
  - Verify admin dashboard
  - Check Lighthouse score
  - Test on mobile
- [ ] **[2h]** Launch preparation
  - Verify all links work
  - Test error pages
  - Security check (no secrets in code)
  - Performance check (load time <2s global)

**Soft Launch:** Open to internal testing only  
**URL:** https://launchpad-commerce.vercel.app

- [ ] **Commit:** "Deploy to Vercel + environment setup + soft launch"

---

### **Friday, March 28-29 (8h)**

#### Full Day: Monitoring + Hard Launch Prep

- [ ] **[2h]** Setup monitoring
  - Vercel analytics (built-in)
  - Stripe webhook monitoring
  - Error logging (optional: Sentry)
  - Uptime monitoring
- [ ] **[2h]** Create launch checklist
  - All features tested ✅
  - All pages mobile-responsive ✅
  - Lighthouse >95 ✅
  - No console errors ✅
  - Email delivery working ✅
  - Admin dashboard working ✅
  - Stripe payments working ✅
- [ ] **[2h]** Create marketing materials (optional)
  - Screenshot of landing page
  - Demo GIF (checkout flow)
  - Blog post / announcement
  - Social media teaser
- [ ] **[2h]** Post-launch follow-up plan
  - Monitor error logs (first 24h)
  - Respond to customer feedback
  - Track conversion metrics
  - Plan improvements for phase 2

**Hard Launch:** Mar 30 (Make public, announce)

- [ ] **Commit:** "Launch monitoring + marketing + post-launch plan"

---

### **Saturday, March 30 (4h)**

#### Morning: Final Checks + Launch

- [ ] **[1h]** Final production check
  - All systems operational
  - No critical bugs
  - Performance good
  - Emails delivering
- [ ] **[1h]** Announce launch
  - Tweet/LinkedIn post
  - GitHub repo update
  - Email to early list (if any)
- [ ] **[1h]** Monitor first sales
  - Check for any issues
  - Respond to customer emails
  - Celebrate first purchase 🎉
- [ ] **[1h]** Document learnings
  - What went well
  - What could improve
  - Phase 2 ideas

---

### **Week 2 Summary**
```
✅ Admin dashboard (stats, orders, products)
✅ Analytics tracking (page views, conversions)
✅ Advanced features (product management, export)
✅ QA & testing (end-to-end, mobile, performance)
✅ Lighthouse >95 on all metrics
✅ Deployed to Vercel (production)
✅ PostgreSQL database (scalable)
✅ Environment variables configured
✅ Stripe webhooks verified
✅ Email delivery verified
✅ Monitoring setup

Status: ✅ LIVE IN PRODUCTION
```

---

## 📊 Task Breakdown by Category

### Frontend (20h)
- Landing page: 4h
- Product pages: 4h
- Cart & checkout: 4h
- Thank you page: 2h
- Admin dashboard: 4h
- Responsive design: 2h

### Backend (30h)
- Database (Prisma + SQLite): 6h
- Product API: 3h
- Stripe checkout: 6h
- Stripe webhooks: 4h
- Email API: 3h
- Admin API: 4h
- Analytics: 4h

### DevOps & Testing (20h)
- Setup & config: 4h
- Testing & QA: 8h
- Optimization: 4h
- Deployment: 4h

### Documentation (10h)
- BMAD docs: 6h (done)
- Code docs: 2h
- README & guides: 2h

---

## 🎯 Daily Standup Template

**Every morning (5 min):**
```
Yesterday: What I did
  - [Task 1] ✅ Complete
  - [Task 2] ❌ Blocked by X

Today: What I'm doing
  - [Task 3] Estimated 2h
  - [Task 4] Estimated 3h

Blockers: Anything stuck?
  - X issue → plan: Y

Status: On track / At risk / Needs help
```

---

## ⚠️ Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Stripe API changes | Low | Medium | Subscribe to webhook updates |
| Email delivery issues | Low | High | Use Resend (reliable), test early |
| Performance bottlenecks | Medium | Medium | Lighthouse audit, optimize images |
| Database corruption | Very Low | High | Automated backups, Prisma migrations |
| Deployment failure | Low | High | Test on staging, rollback ready |

---

## 📌 Success Metrics

**Launch Success:**
- ✅ Zero critical bugs in first week
- ✅ Lighthouse >95 on all metrics
- ✅ <2 second load time (global)
- ✅ 99.9% uptime (Vercel SLA)
- ✅ Email delivery working
- ✅ First sale within 2 weeks

---

**Document Owner:** Luiz Spinelli (via BMAD)  
**Last Updated:** March 11, 2026  
**Status:** Ready for Development → Start March 17
