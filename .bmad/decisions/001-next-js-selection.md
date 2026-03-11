# ADR 001: Next.js 14 Selection

**Status:** ✅ Accepted  
**Date:** March 11, 2026  
**Author:** Luiz Spinelli  
**Category:** Technology Selection

---

## Context

We need to build a high-performance landing page + e-commerce platform with:
- Fast initial load (SEO critical)
- API routes for Stripe webhooks
- Real-time inventory updates
- Mobile-first UX
- Easy deployment & scaling

## Decision

**Use Next.js 14 with App Router + TypeScript**

## Rationale

### Performance
- **ISR (Incremental Static Regeneration):** Landing page static + product pages cached
- **SSR + SSG:** Hybrid rendering strategy (best of both worlds)
- **Image Optimization:** Built-in `next/image` (automatic WebP, srcset)
- **Code Splitting:** Automatic, per-route bundle splitting

### Developer Experience
- **File-based routing:** No config, intuitive structure
- **API Routes:** Built-in backend (`app/api/`) — no separate server needed
- **TypeScript:** Native support, excellent intellisense
- **Hot Reload:** Fast iteration during development

### Deployment & Scalability
- **Vercel Native:** Zero-config deployment (push to main = live)
- **Edge Functions:** Optional, for future CDN-level logic
- **Serverless by Default:** No server management
- **Analytics:** Vercel Web Analytics included

### Community & Ecosystem
- **Largest React meta-framework community**
- **Extensive documentation**
- **Third-party integrations:** Stripe, Resend, Prisma, etc. all have Next.js examples

---

## Alternatives Considered

### 1. **Remix** ❌
**Why not:**
- Newer ecosystem (less third-party integrations)
- Steeper learning curve for team onboarding
- Overkill for this project scope

### 2. **Astro** ❌
**Why not:**
- Not ideal for interactive components (checkout flow)
- Learning curve for island architecture
- Smaller community

### 3. **SvelteKit** ❌
**Why not:**
- Smaller job market (fewer developers)
- Less mature ecosystem for e-commerce
- Learning curve for Svelte

### 4. **Traditional Node.js + React** ❌
**Why not:**
- More setup & boilerplate
- Need separate frontend + backend deployment
- Harder to scale

---

## Consequences

### Positive
✅ Fast development cycle (Next.js ecosystem mature)  
✅ Minimal deployment complexity (Vercel)  
✅ Good SEO out-of-box  
✅ TypeScript + React = type safety  
✅ Easy to hire developers (popular stack)  

### Negative
❌ Locked to Vercel for optimal DX (low risk)  
❌ App Router still evolving (unstable API risk — mitigated by maturity)  
❌ Larger bundle size than some alternatives  

### Mitigation
- Use dynamic imports for heavy libraries
- Implement proper error boundaries
- Monitor Web Vitals with Vercel Analytics

---

## Implementation

### File Structure
```
app/
├── page.tsx               # Landing page
├── products/
│   ├── page.tsx          # Product listing
│   └── [slug]/
│       └── page.tsx      # Product detail
├── checkout/
│   └── page.tsx          # Checkout flow
├── api/
│   ├── stripe/
│   │   ├── checkout.ts   # Create session
│   │   └── webhook.ts    # Handle events
│   └── email/
│       └── confirm.ts    # Send confirmations
└── layout.tsx            # Root layout
```

### Tech Stack
```
- Runtime: Node.js 20+
- Framework: Next.js 14
- Language: TypeScript
- Styling: TailwindCSS
- UI Components: Shadcn/ui
- Payments: Stripe SDK
- Email: Resend SDK
- Database: Prisma ORM (optional, SQLite for MVP)
```

---

## Related Decisions

- [ADR 002: Stripe Integration](./002-stripe-integration.md)
- [ADR 003: Deployment on Vercel](./003-deployment-vercel.md)

---

## References

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Next.js Performance](https://nextjs.org/learn/foundations/how-nextjs-works/rendering)
- [Vercel Deployment](https://vercel.com/docs)

---

**Approved By:** Self (POC)  
**Last Updated:** March 11, 2026
