# 🚀 LaunchPad Commerce

Modern landing page + e-commerce platform with Next.js, Stripe, and Resend.

## 📋 Project Overview

- **Type:** Landing Page + E-commerce
- **Stack:** Next.js 14, TypeScript, TailwindCSS, Stripe, Resend
- **Timeline:** 1-2 weeks
- **Status:** Planning & Architecture (using BMAD-METHOD)

## 🏗️ Project Structure

```
launchpad-commerce/
├── .bmad/                          # BMAD-METHOD isolation (project-specific)
│   ├── discovery/                  # Discovery outputs
│   ├── architecture/                # Architecture decisions
│   ├── implementation/              # Dev roadmap
│   └── decisions/                   # ADRs
├── app/                            # Next.js app directory
├── components/                     # React components
├── lib/                            # Utilities & config
├── public/                         # Static assets
├── styles/                         # Global styles
├── .env.example                    # Environment template
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Install BMAD-METHOD (project-specific)
npx bmad-method install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 BMAD-METHOD Integration

This project uses **BMAD-METHOD** for structured planning and development.

### Workflows
- **Discovery:** Market analysis, user personas, requirements
- **Architecture:** Tech stack rationale, system design
- **Implementation:** Dev roadmap, task breakdown, testing strategy

### Documentation
All BMAD outputs are in `.bmad/` (project-isolated).

See BMAD documentation in `.bmad/README.md` once generated.

## 🔄 Development Workflow

1. **Discovery Phase** → `.bmad/discovery/`
2. **Architecture Phase** → `.bmad/architecture/`
3. **Implementation** → Code in `app/`, `components/`, `lib/`
4. **Testing & Deployment** → `.bmad/implementation/`

## 📝 Next Steps

- [ ] Run BMAD-METHOD discovery
- [ ] Document architecture decisions
- [ ] Generate code scaffolds
- [ ] Build landing page
- [ ] Implement Stripe integration
- [ ] Deploy to Vercel

## 📚 Resources

- [BMAD-METHOD Docs](https://docs.bmad-method.org)
- [Next.js Docs](https://nextjs.org/docs)
- [Stripe API](https://stripe.com/docs/api)
- [Resend Docs](https://resend.com/docs)

---

**Created:** March 11, 2026  
**Status:** Planning & Architecture
