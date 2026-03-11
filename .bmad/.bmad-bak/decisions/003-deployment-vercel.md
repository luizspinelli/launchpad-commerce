# ADR 003: Deployment on Vercel

**Status:** ✅ Accepted  
**Date:** March 11, 2026  
**Author:** Luiz Spinelli  
**Category:** Infrastructure & Deployment

---

## Context

We need to:
- Deploy Next.js application with minimal DevOps overhead
- Support automatic CI/CD on git push
- Have free/low-cost hosting for MVP
- Scale easily as traffic grows
- Monitor performance & errors

## Decision

**Deploy to Vercel (official Next.js hosting platform)**

## Rationale

### Zero-Config Deployment
- **Git Integration:** Connect GitHub → auto-deploy on push
- **Environment Variables:** UI-based management (secure secrets)
- **Domains:** Custom domains, automatic SSL certificates
- **Rollbacks:** One-click rollback to previous deployment

### Performance
- **Global CDN:** Automatic edge caching worldwide
- **ISR Support:** Incremental Static Regeneration out-of-box
- **Edge Functions:** Run code at edge (future optimization)
- **Web Vitals:** Built-in monitoring & alerts
- **Analytics:** Real User Monitoring (RUM)

### Cost
- **Free Tier:** Sufficient for MVP
  - 100 GB bandwidth/month
  - Unlimited deployments
  - 1 concurrency (adequate for MVP)
- **Pay-as-you-grow:** Only pay for additional compute
- **Predictable pricing:** No surprises

### Security
- **HTTPS:** Automatic SSL/TLS (free)
- **DDoS Protection:** Included
- **WAF:** Optional additional protection
- **Secrets Management:** Encrypted environment variables

---

## Alternatives Considered

### 1. **Self-hosted (AWS EC2/DigitalOcean)** ❌
**Why not:**
- Requires DevOps knowledge (Docker, Nginx, CI/CD setup)
- More expensive (~$5-10/month minimum)
- Maintenance overhead (updates, security patches)
- Overkill for MVP

### 2. **Netlify** ❌
**Why not:**
- Better for static sites (Astro, Gatsby)
- Next.js SSR not as native as Vercel
- Functions pricing less clear
- Slightly more expensive

### 3. **Railway/Render** ❌
**Why not:**
- Good alternatives, but less integrated
- Billing can be unpredictable
- Smaller ecosystems
- Less optimized for Next.js

### 4. **AWS Amplify** ❌
**Why not:**
- Better for full-stack AWS apps
- More complex setup
- Confusing billing model
- Overkill for Next.js-only

---

## Consequences

### Positive
✅ Zero DevOps overhead (just `git push`)  
✅ Free tier covers MVP needs  
✅ Best Next.js integration available  
✅ Global CDN = fast loading worldwide  
✅ Built-in monitoring (errors, performance)  
✅ Easy to invite team members  
✅ Analytics & Web Vitals tracking  

### Negative
❌ Vendor lock-in (Vercel-specific)  
❌ Limited customization (can't modify Nginx, etc.)  
❌ One-click scale-up when usage grows  

### Mitigation
- Code stays agnostic (can migrate to self-hosted if needed)
- Export database separately (not locked in)
- Use standard libraries (no Vercel-specific dependencies)

---

## Implementation

### Setup Steps

```bash
# 1. Create GitHub repo
git remote add origin https://github.com/luizspinelli/launchpad-commerce.git
git push -u origin main

# 2. Go to https://vercel.com/new
# 3. Connect GitHub account
# 4. Select this repo
# 5. Set environment variables (in Vercel UI):
#    - STRIPE_PUBLISHABLE_KEY
#    - STRIPE_SECRET_KEY
#    - STRIPE_WEBHOOK_SECRET
#    - RESEND_API_KEY
#    - DATABASE_URL (if using external DB)

# 6. Click "Deploy"
# 7. Done! URL auto-generated
```

### Automatic Deployments

- **Push to main** → Production deployment (automatic)
- **Push to feature branch** → Preview URL (automatic)
- **Pull Request** → Preview URL comment on PR
- **Manual redeploy** → Vercel UI

### Environment Variables

```env
# .env.example (commit this)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...
RESEND_API_KEY=re_...
```

### Vercel Config (optional)

```javascript
// vercel.json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY": "@stripe_pk",
    "STRIPE_SECRET_KEY": "@stripe_sk",
    "STRIPE_WEBHOOK_SECRET": "@stripe_webhook"
  }
}
```

---

## Monitoring

### Web Vitals (Built-in)
- Core Web Vitals dashboard in Vercel
- Real User Monitoring (RUM) data
- Performance alerts

### Error Tracking
- Vercel logs (readable in UI)
- Integration with Sentry (optional)

### Observability
```bash
# View logs
vercel logs

# View real-time logs
vercel logs --follow
```

---

## Future Scaling

### Free → Paid
- If traffic exceeds free tier, upgrade to **Pro** ($20/month)
- Automatic scaling (no manual intervention)

### Custom Domain
```bash
# Add custom domain
vercel domains add launchpad.spinelli.dev.br
```

### Custom Middleware
```typescript
// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Custom logic (redirects, auth, etc)
  return NextResponse.next();
}
```

---

## Related Decisions

- [ADR 001: Next.js Selection](./001-next-js-selection.md)
- [ADR 002: Stripe Integration](./002-stripe-integration.md)

---

## References

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel + Next.js](https://vercel.com/docs/frameworks/nextjs)
- [Vercel Pricing](https://vercel.com/pricing)
- [Vercel Web Analytics](https://vercel.com/analytics)

---

**Approved By:** Self (POC)  
**Last Updated:** March 11, 2026
