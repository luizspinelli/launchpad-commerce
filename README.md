# LaunchPad Commerce

<div align="center">

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.1.6-black.svg)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org)
[![Production Ready](https://img.shields.io/badge/Status-Production%20Ready-green.svg)](https://launchpad-commerce-roan.vercel.app)

**[🚀 Acesse Agora](https://launchpad-commerce-roan.vercel.app)** • **[📖 Documentação](#-estrutura-de-pasta)** • **[💻 GitHub](https://github.com/luizspinelli/launchpad-commerce)**

</div>

---

Uma plataforma e-commerce **production-ready** construída com Next.js, Stripe e PostgreSQL.

Este é um **projeto de demonstração técnica** que mostra capacidade de implementar um sistema completo de vendas com:
- Carrinho de compras
- Integração com Stripe (pagamentos)
- Webhooks (confirmação de pagamento)
- Emails transacionais
- Database design com Prisma
- API REST type-safe

## 🚀 Live Demo

**[Acesse a aplicação ao vivo →](https://launchpad-commerce-roan.vercel.app)**

- **Landing Page:** https://launchpad-commerce-roan.vercel.app
- **Produtos:** https://launchpad-commerce-roan.vercel.app/products
- **Checkout:** https://launchpad-commerce-roan.vercel.app/checkout
- **Código no GitHub:** https://github.com/luizspinelli/launchpad-commerce

## 📊 Status do Projeto

| Item | Status | Link |
|------|--------|------|
| **Aplicação** | ✅ Live em Vercel | [launchpad-commerce-roan.vercel.app](https://launchpad-commerce-roan.vercel.app) |
| **Build** | ✅ Passing (0 errors) | [GitHub Workflow](https://github.com/luizspinelli/launchpad-commerce) |
| **Type Coverage** | ✅ 100% TypeScript | — |
| **License** | 📜 MIT | [LICENSE](./LICENSE) |
| **Last Commit** | 📅 Março 2026 | [Commits](https://github.com/luizspinelli/launchpad-commerce/commits) |

## 🎯 Visão Geral

**O que foi construído:**
- Landing page (portfolio showcase)
- Listagem de produtos (dinâmica via API)
- Carrinho de compras (Zustand state management)
- Checkout flow (Stripe Hosted Checkout)
- Webhook handler (pagamento confirmado)
- Email de confirmação (Resend)
- Página de sucesso com detalhes do pedido

**Stack Tecnológico:**
- **Frontend:** Next.js 16, React 19, TypeScript, TailwindCSS
- **Backend:** Node.js, Stripe API, Resend API, Vercel Blob
- **Database:** PostgreSQL (Vercel Postgres), Prisma ORM
- **File Storage:** Vercel Blob (digital product downloads, 100MB max)
- **Deployment:** Vercel (auto-deploy on git push)
- **State Management:** Zustand (with localStorage persist)
- **Validation:** Zod (client + server-side)

## 🔗 Links Úteis

### Production
- **Main Site:** [https://launchpad-commerce-roan.vercel.app](https://launchpad-commerce-roan.vercel.app)
- **Products Listing:** [https://launchpad-commerce-roan.vercel.app/products](https://launchpad-commerce-roan.vercel.app/products)
- **Checkout:** [https://launchpad-commerce-roan.vercel.app/checkout](https://launchpad-commerce-roan.vercel.app/checkout)

### Development
- **GitHub Repository:** [github.com/luizspinelli/launchpad-commerce](https://github.com/luizspinelli/launchpad-commerce)
- **Issue Tracker:** [Issues](https://github.com/luizspinelli/launchpad-commerce/issues)
- **MIT License:** [LICENSE](./LICENSE)

### Author
- **Author:** Luiz Spinelli
- **Portfolio:** [https://spinelli.dev.br](https://spinelli.dev.br)
- **GitHub:** [github.com/luizspinelli](https://github.com/luizspinelli)
- **Twitter:** [@luizspinelli](https://twitter.com/luizspinelli)

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+ e npm
- Conta Stripe (test mode)
- Conta Resend (opcional, para emails)

### Instalação Local

```bash
# Clone o repositório
git clone https://github.com/luizspinelli/launchpad-commerce.git
cd launchpad-commerce

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env.local

# (Opcional) Setup database local
npm run setup-db

# Inicie servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 🔧 Configuração

### Environment Variables

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Stripe (obtenha em https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Resend (opcional, para emails - https://resend.com)
RESEND_API_KEY=re_...

# URLs
NEXT_PUBLIC_URL=http://localhost:3000

# Database (se estiver usando localmente)
DATABASE_URL=postgresql://user:password@localhost:5432/launchpad
```

### Stripe Webhook (para Vercel/Produção)

1. Acesse [https://dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
2. Clique em "Add endpoint"
3. URL: `https://seu-dominio.vercel.app/api/stripe/webhook`
4. Selecione evento: `checkout.session.completed`
5. Copie o "Webhook Secret" → `STRIPE_WEBHOOK_SECRET` no Vercel

## 📁 Estrutura de Pasta

```
launchpad-commerce/
├── app/
│   ├── page.tsx                    # Landing page (portfolio)
│   ├── globals.css                 # Global styles + animations
│   ├── checkout/
│   │   └── page.tsx               # Página de checkout
│   ├── order/[id]/
│   │   └── page.tsx               # Página de sucesso
│   ├── products/
│   │   ├── page.tsx               # Listagem de produtos
│   │   └── [slug]/page.tsx        # Detalhe do produto
│   ├── api/
│   │   ├── products/              # GET /api/products, /api/products/[slug]
│   │   ├── stripe/
│   │   │   ├── checkout/route.ts  # POST /api/stripe/checkout
│   │   │   └── webhook/route.ts   # POST /api/stripe/webhook
│   │   └── setup/route.ts         # POST /api/setup (bootstrap)
│   └── components/
│       ├── HeroPortfolio.tsx       # Hero section (portfolio)
│       ├── FeaturesPortfolio.tsx   # Features section (tech)
│       ├── StackPortfolio.tsx      # Stack showcase
│       ├── CheckoutForm.tsx        # Checkout form
│       ├── Navbar.tsx              # Navigation
│       └── Footer.tsx              # Footer
├── lib/
│   ├── stripe.ts                   # Stripe client + helpers
│   ├── email.ts                    # Resend email templates
│   ├── store.ts                    # Zustand cart store
│   └── db.ts                       # Prisma client
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── seed.ts                    # Seed data
├── scripts/
│   └── setup-db.ts                # Database setup script
├── public/
│   └── og-image.png               # Open Graph image
├── .env.example                   # Environment variables template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md (este arquivo)
```

## 🗄️ Database Schema

### Models

**Product**
```prisma
- id: String (unique)
- slug: String (unique)
- name: String
- description: String
- price: Int (em centavos)
- image: String
- category: String?
- featured: Boolean?
- createdAt: DateTime
- updatedAt: DateTime
```

**Order**
```prisma
- id: String (unique)
- stripeSessionId: String (unique)
- customerEmail: String
- totalAmount: Int (em centavos)
- status: String (PENDING, PAID, FAILED)
- createdAt: DateTime
- updatedAt: DateTime
- items: OrderItem[]
```

**OrderItem**
```prisma
- id: String
- orderId: String
- productId: String
- productName: String
- quantity: Int
- pricePerUnit: Int
- total: Int
- createdAt: DateTime
```

## 🔐 Segurança

- ✅ Stripe webhook signature verification
- ✅ Input validation com Zod em todos endpoints
- ✅ Environment variables para secrets
- ✅ Type-safe TypeScript em 100%
- ✅ Error logging estruturado
- ✅ Idempotência no webhook handler

## ⚡ Try It Now (Sem instalação!)

Quer ver o projeto em ação sem fazer setup local?

1. **[Visite o site live →](https://launchpad-commerce-roan.vercel.app)**
2. Explore os produtos
3. Adicione ao carrinho
4. Vá para checkout (Stripe em test mode)
5. Use test card: `4242 4242 4242 4242` (qualquer data futura e CVC)

> **Nota:** Este é um projeto de demonstração em test mode. Nenhuma cobrança real será feita.

## 🧪 Testes

### Testar Localmente

```bash
# 1. Inicie o servidor
npm run dev

# 2. Acesse http://localhost:3000
# 3. Clique em um produto → Add to Cart
# 4. Vá para Checkout

# 5. Use test card do Stripe:
# Card: 4242 4242 4242 4242
# Expiry: 12/25
# CVC: 123

# 6. Confirme pagamento
# 7. Veja a página de sucesso
```

### Testar Webhook Localmente

```bash
# Use Stripe CLI para tunnel webhooks local
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Em outro terminal:
npm run dev

# Faça um pagamento de teste na aplicação
# O webhook será entregue localmente
```

## 📊 API Endpoints

### Products
```
GET /api/products
  Retorna lista de produtos

GET /api/products/[slug]
  Retorna detalhes de um produto
```

### Stripe Checkout
```
POST /api/stripe/checkout
  Body: { items: [], customerEmail, customerName }
  Retorna: { success: true, sessionId: string }
```

### Stripe Webhook
```
POST /api/stripe/webhook
  Recebe eventos do Stripe
  Cria order quando checkout.session.completed
  Envia email de confirmação
```

### Setup (Apenas desenvolvimento)
```
POST /api/setup
  Inicializa database com seed products
```

## 🚀 Deployment (Vercel)

### ✅ Já Deployado em Vercel!

Este projeto já está deployado e rodando em produção:

**[🌐 https://launchpad-commerce-roan.vercel.app](https://launchpad-commerce-roan.vercel.app)**

Para fazer deploy de sua própria cópia:

### Passo 1: Conectar GitHub
1. Acesse [https://vercel.com/new](https://vercel.com/new)
2. Conecte seu repositório GitHub
3. Selecione `launchpad-commerce`

### Passo 2: Environment Variables
No Vercel dashboard, adicione:
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_URL=https://seu-dominio.vercel.app
DATABASE_URL=[Vercel cria automaticamente]
```

### Passo 3: Deploy
Clique em "Deploy". O Vercel fará:
- Build automaticamente
- Deploy pra produção
- Setup banco de dados PostgreSQL

### Auto-Deploy
Cada vez que fazer push pra `main`:
```bash
git push origin main
# Vercel faz redeploy automaticamente (~2-3 min)
```

## 📈 Métricas & Estatísticas

- **Commits:** 33 commits
- **Linhas de código:** 2700+ LOC
- **Type coverage:** 100% TypeScript
- **Build time:** ~30 segundos
- **Page load:** <1s
- **Lighthouse:** 95+
- **Database queries:** Otimizadas com Prisma

## 🔒 Segurança & Resilience

Este projeto implementa várias features críticas de produção:

### ✅ Persistência (P1)
- **Cart localStorage:** Carrinho persiste após reload/tab close
- Automático com Zustand persist middleware
- Zero data loss entre sessões

### ✅ Idempotência (P4)
- **Webhook safety:** Verifica se Order já existe antes de criar
- Retries do Stripe não criam duplicatas
- Email enviado apenas uma vez

### ✅ Validação (P5 + P6)
- **Form validation:** Name (min 3 chars), Email (format check)
- **Product validation:** Verifica se produtos ainda existem no checkout
- **Input security:** Zod validation em todos endpoints
- Mensagens de erro claras ao usuário

### ✅ File Storage (Vercel Blob)
- **Upload seguro:** Max 100MB, formato validado
- **Download links:** Signed URLs, email-bound access
- **Global CDN:** Vercel Blob distribui arquivos globalmente

## 🧪 Testing

Veja **[TESTING.md](./TESTING.md)** para guia completo de testes:
- Step-by-step checkout flow
- Admin product creation
- Email verification
- Download validation
- Pre-launch checklist

## 🎯 Próximos Passos (Roadmap Phase 2)

### ✅ Implementado (MVP+)
- ✅ Admin dashboard (gerenciar produtos/pedidos)
- ✅ Download de produtos digitais (Vercel Blob)
- ✅ Analytics MVP (KPI cards)
- ✅ Webhook idempotency (P4)
- ✅ Form validation (P5)
- ✅ Cart persistence (P1)

### 📋 Planejado (Phase 2+)
- [ ] User authentication (criar contas/login)
- [ ] Order history (histórico por user)
- [ ] Analytics avançado (conversão, funnels, charts)
- [ ] Affiliate system (partner links)
- [ ] Coupon system (código de desconto)
- [ ] Integração com Zapier
- [ ] Multi-currency support
- [ ] Mobile app (React Native)

## 🤝 Contribuições

Este é um projeto de portfolio. Sugestões e issues são bem-vindos!

Para reportar bugs ou sugerir features:
1. Abra uma issue no GitHub
2. Descreva o problema/feature
3. Inclua exemplo se possível

## 📝 Licença

MIT License - veja LICENSE file para detalhes

## 💡 Tecnologias Usadas

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Stripe](https://stripe.com/)
- [Prisma](https://www.prisma.io/)
- [Zod](https://zod.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Resend](https://resend.com/)
- [Vercel](https://vercel.com/)

## 📧 Contato

Dúvidas sobre o projeto?
- Issues: [GitHub Issues](https://github.com/luizspinelli/launchpad-commerce/issues)
- Twitter: [@luizspinelli](https://twitter.com/luizspinelli)

---

**Última atualização:** Março de 2026  
**Status:** Production-ready for soft launch
