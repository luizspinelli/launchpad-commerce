# 🗄️ Database Schema — LaunchPad Commerce

**Version:** 1.1  
**Date:** March 11, 2026  
**ORM:** Prisma  
**Database:** PostgreSQL (Vercel Postgres)

---

## 1. Schema Overview

```
Products (catalog)
  ├─ Order Items (junction)
  │  └─ Orders (transactions)
  │     └─ OrderHistory (audit trail)
  │
Analytics (events)
  └─ (independent, can scale separately)
```

---

## 2. Prisma Schema (schema.prisma)

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"  // PostgreSQL only (Vercel Postgres)
  url      = env("DATABASE_URL")
}

// ============================================
// PRODUCTS
// ============================================

model Product {
  id          String   @id @default(cuid())
  slug        String   @unique
  name        String
  description String   @db.Text  // Long text support
  price       Int      // In cents: $9.99 = 999
  currency    String   @default("BRL")
  image       String   // URL to product image
  
  // Relationships
  orderItems  OrderItem[]
  
  // Timestamps
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([slug])
  @@map("products")
}

// ============================================
// ORDERS
// ============================================

model Order {
  id                    String   @id @default(cuid())
  stripeSessionId       String   @unique  // Stripe checkout session ID
  customerEmail         String   // Customer email (no user account)
  totalAmount           Int      // In cents
  currency              String   @default("BRL")
  
  // Status: paid, refunded, failed, disputed
  status                String   @default("paid")
  
  // Payment details
  paymentMethod         String   @default("card")  // card, wallet, etc
  stripePaymentId       String?  // Stripe payment_intent ID
  
  // Communication
  confirmationEmailSentAt DateTime?
  receiptEmailSentAt    DateTime?
  
  // Refund tracking
  refundedAmount        Int?     // In cents (null if not refunded)
  refundedAt            DateTime?
  
  // Items in this order
  items                 OrderItem[]
  
  // Audit trail
  history               OrderHistory[]
  
  // Timestamps
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
  
  @@index([customerEmail])
  @@index([stripeSessionId])
  @@index([createdAt])
  @@map("orders")
}

// ============================================
// ORDER ITEMS (Associative entity)
// ============================================

model OrderItem {
  id          String   @id @default(cuid())
  
  // Order relationship
  orderId     String
  order       Order    @relation(fields: [orderId], onDelete: Cascade)
  
  // Product relationship
  productId   String
  product     Product  @relation(fields: [productId], onDelete: Restrict)
  
  // Order details (snapshot at purchase time)
  quantity    Int      @default(1)
  priceAtTime Int      // In cents (what customer paid)
  
  // Timestamps
  createdAt   DateTime @default(now())
  
  @@unique([orderId, productId])
  @@index([productId])
  @@map("order_items")
}

// ============================================
// ORDER HISTORY (Audit trail)
// ============================================

model OrderHistory {
  id        String   @id @default(cuid())
  
  // Audit reference
  orderId   String
  order     Order    @relation(fields: [orderId], onDelete: Cascade)
  
  // What changed
  action    String   // "created", "paid", "email_sent", "refunded"
  details   String   @db.Text  // JSON or text description
  
  // Who/what triggered it
  triggeredBy String  @default("system")  // "system", "admin", "webhook"
  
  // Timestamp (immutable)
  timestamp DateTime @default(now())
  
  @@index([orderId])
  @@index([timestamp])
  @@map("order_history")
}

// ============================================
// ANALYTICS
// ============================================

model AnalyticsEvent {
  id          String   @id @default(cuid())
  
  // Event metadata
  eventType   String   // "page_view", "add_to_cart", "checkout_start", "purchase", "error"
  
  // User tracking (optional)
  customerEmail String?  // Nullable for anonymous users
  
  // Context
  productId   String?   // Which product (if applicable)
  path        String    // URL path (/products, /checkout, etc)
  
  // Event data (flexible JSON)
  metadata    String?   @db.Text  // JSON serialized
  
  // Session tracking
  sessionId   String?   // Browser session ID
  ipAddress   String?   // Anonymized IP (first 3 octets)
  
  // Timestamps
  createdAt   DateTime @default(now())
  
  @@index([eventType])
  @@index([customerEmail])
  @@index([createdAt])
  @@index([productId])
  @@map("analytics_events")
}

// ============================================
// APP CONFIGURATION (future)
// ============================================

model AppConfig {
  id        String   @id @default("singleton")  // Only one config
  
  // Store metadata
  storeName String   @default("LaunchPad Store")
  storeDescription String?
  storeImage String?  // Logo URL
  
  // Contact
  supportEmail String  @default("support@example.com")
  
  // Customization
  theme     String   @default("light")  // light, dark, custom
  accentColor String  @default("#3B82F6")
  
  // Timestamps
  updatedAt DateTime @updatedAt
  
  @@map("app_config")
}
```

---

## 3. Data Model Relationships

### ERD (Entity Relationship Diagram)

```
┌─────────────┐
│  Products   │
│─────────────│
│ id (PK)     │
│ slug ⭐    │ ← UNIQUE INDEX
│ name        │
│ price       │
│ image       │
└──────┬──────┘
       │
       │ 1:M
       │
       ▼
┌────────────────────┐
│  Order Items       │
│────────────────────│
│ id (PK)            │
│ orderId (FK) ⭐   │
│ productId (FK) ⭐ │
│ quantity           │
│ priceAtTime        │
└────┬───────────────┘
     │
     │ M:1
     │
     ▼
┌──────────────────────┐
│  Orders              │
│──────────────────────│
│ id (PK)              │
│ stripeSessionId ⭐  │ ← UNIQUE INDEX
│ customerEmail ⭐    │ ← INDEX for queries
│ totalAmount          │
│ status               │
│ createdAt ⭐        │ ← INDEX for sorting
└──────┬───────────────┘
       │
       │ 1:M
       │
       ▼
┌──────────────────────┐
│  OrderHistory        │
│──────────────────────│
│ id (PK)              │
│ orderId (FK)         │
│ action               │
│ timestamp            │
└──────────────────────┘

┌──────────────────────┐
│  AnalyticsEvents     │
│  (independent)       │
│──────────────────────│
│ id (PK)              │
│ eventType ⭐        │ ← INDEX
│ customerEmail        │
│ productId            │
│ createdAt ⭐        │ ← INDEX
└──────────────────────┘
```

---

## 4. Migrations Strategy

### Initial Migration (001_init)

```prisma
// Migration file: migrations/001_init/migration.sql

CREATE TABLE products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  currency TEXT DEFAULT 'BRL',
  image TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX products_slug ON products(slug);

CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  stripeSessionId TEXT UNIQUE NOT NULL,
  customerEmail TEXT NOT NULL,
  totalAmount INTEGER NOT NULL,
  currency TEXT DEFAULT 'BRL',
  status TEXT DEFAULT 'paid',
  paymentMethod TEXT DEFAULT 'card',
  stripePaymentId TEXT,
  confirmationEmailSentAt DATETIME,
  receiptEmailSentAt DATETIME,
  refundedAmount INTEGER,
  refundedAt DATETIME,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX orders_customerEmail ON orders(customerEmail);
CREATE INDEX orders_stripeSessionId ON orders(stripeSessionId);
CREATE INDEX orders_createdAt ON orders(createdAt);

CREATE TABLE order_items (
  id TEXT PRIMARY KEY,
  orderId TEXT NOT NULL,
  productId TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  priceAtTime INTEGER NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(orderId, productId),
  FOREIGN KEY(orderId) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY(productId) REFERENCES products(id) ON DELETE RESTRICT
);

CREATE INDEX order_items_productId ON order_items(productId);

CREATE TABLE order_history (
  id TEXT PRIMARY KEY,
  orderId TEXT NOT NULL,
  action TEXT NOT NULL,
  details TEXT NOT NULL,
  triggeredBy TEXT DEFAULT 'system',
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY(orderId) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE INDEX order_history_orderId ON order_history(orderId);
CREATE INDEX order_history_timestamp ON order_history(timestamp);

CREATE TABLE analytics_events (
  id TEXT PRIMARY KEY,
  eventType TEXT NOT NULL,
  customerEmail TEXT,
  productId TEXT,
  path TEXT,
  metadata TEXT,
  sessionId TEXT,
  ipAddress TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX analytics_events_eventType ON analytics_events(eventType);
CREATE INDEX analytics_events_customerEmail ON analytics_events(customerEmail);
CREATE INDEX analytics_events_createdAt ON analytics_events(createdAt);
CREATE INDEX analytics_events_productId ON analytics_events(productId);

CREATE TABLE app_config (
  id TEXT PRIMARY KEY,
  storeName TEXT DEFAULT 'LaunchPad Store',
  storeDescription TEXT,
  storeImage TEXT,
  supportEmail TEXT DEFAULT 'support@example.com',
  theme TEXT DEFAULT 'light',
  accentColor TEXT DEFAULT '#3B82F6',
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial config
INSERT INTO app_config (id) VALUES ('singleton');
```

---

## 5. Queries & Use Cases

### Use Case 1: Create Order After Payment

```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createOrder(
  sessionData: {
    sessionId: string;
    customerEmail: string;
    items: Array<{ productId: string; quantity: number; priceAtTime: number }>;
    totalAmount: number;
  }
) {
  return prisma.order.create({
    data: {
      stripeSessionId: sessionData.sessionId,
      customerEmail: sessionData.customerEmail,
      totalAmount: sessionData.totalAmount,
      items: {
        createMany: {
          data: sessionData.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            priceAtTime: item.priceAtTime,
          })),
        },
      },
      history: {
        create: {
          action: 'created',
          details: 'Order created from Stripe webhook',
          triggeredBy: 'webhook',
        },
      },
    },
    include: { items: true },
  });
}
```

### Use Case 2: Get Order with Products

```typescript
export async function getOrderDetails(orderId: string) {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: { product: true },
      },
      history: { orderBy: { timestamp: 'desc' } },
    },
  });
}
```

### Use Case 3: List Orders (Paginated, Filtered)

```typescript
export async function listOrders(params: {
  page: number;
  limit: number;
  status?: string;
  search?: string;
}) {
  const skip = (params.page - 1) * params.limit;

  const where = {
    status: params.status || undefined,
    customerEmail: params.search
      ? { contains: params.search, mode: 'insensitive' }
      : undefined,
  };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { items: true },
      skip,
      take: params.limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.order.count({ where }),
  ]);

  return {
    data: orders,
    pagination: {
      page: params.page,
      limit: params.limit,
      total,
      pages: Math.ceil(total / params.limit),
    },
  };
}
```

### Use Case 4: Track Event (Analytics)

```typescript
export async function trackEvent(event: {
  eventType: string;
  customerEmail?: string;
  productId?: string;
  path: string;
  sessionId?: string;
  metadata?: Record<string, any>;
}) {
  return prisma.analyticsEvent.create({
    data: {
      ...event,
      metadata: event.metadata ? JSON.stringify(event.metadata) : null,
    },
  });
}
```

---

## 6. Indexing Strategy

### Indexes Created

| Table | Field | Reason |
|-------|-------|--------|
| products | slug | Fast product lookups by URL slug |
| orders | customerEmail | Filter/group by customer |
| orders | stripeSessionId | Map Stripe webhooks to orders |
| orders | createdAt | Sort orders by date (dashboard) |
| order_items | productId | Join orders ↔ products |
| order_history | orderId | Retrieve history for order |
| order_history | timestamp | Audit trail sorting |
| analytics_events | eventType | Filter events by type |
| analytics_events | customerEmail | User tracking |
| analytics_events | createdAt | Time-series analytics |
| analytics_events | productId | Product performance |

---

## 7. Data Retention Policy

```
Products:       Keep forever (reference data)
Orders:         Keep forever (business records)
OrderHistory:   Keep forever (audit trail)
AnalyticsEvents: Keep 90 days, then aggregate & delete
Backups:        Daily (automated by Vercel)
```

---

## 8. Seeding (Development)

```typescript
// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  // Seed products
  const product1 = await prisma.product.create({
    data: {
      slug: 'python-course',
      name: 'Python for Beginners',
      description: 'Learn Python basics...',
      price: 4999, // R$49.99
      image: 'https://via.placeholder.com/300x200',
    },
  });

  const product2 = await prisma.product.create({
    data: {
      slug: 'design-templates',
      name: 'UI Design Templates',
      description: 'Professional Figma templates...',
      price: 2999, // R$29.99
      image: 'https://via.placeholder.com/300x200',
    },
  });

  // Seed orders
  const order1 = await prisma.order.create({
    data: {
      stripeSessionId: 'cs_test_...',
      customerEmail: 'john@example.com',
      totalAmount: 4999,
      items: {
        create: [
          {
            productId: product1.id,
            quantity: 1,
            priceAtTime: 4999,
          },
        ],
      },
      history: {
        create: {
          action: 'created',
          details: 'Seeded test order',
          triggeredBy: 'seed',
        },
      },
    },
  });

  console.log('Seeded:', { product1, product2, order1 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

**Run seed:**
```bash
npx prisma db seed
```

---

## 9. Performance Considerations

### Query Optimization
```typescript
// ❌ N+1 problem (bad)
const orders = await prisma.order.findMany();
for (const order of orders) {
  const items = await prisma.orderItem.findMany({
    where: { orderId: order.id },
  });
}

// ✅ Use include (good)
const orders = await prisma.order.findMany({
  include: { items: true },
});
```

### Pagination
```typescript
// Always paginate large result sets
const orders = await prisma.order.findMany({
  take: 50,    // Limit results
  skip: 0,     // Offset
  orderBy: { createdAt: 'desc' },
});
```

---

## 10. Database Setup Instructions

### SQLite (Development)

```bash
# .env.local
DATABASE_URL="file:./dev.db"

# Initialize database
npx prisma migrate dev --name init

# View data (UI)
npx prisma studio
```

### PostgreSQL (Production)

```bash
# .env.production
DATABASE_URL="postgresql://user:password@host:5432/launchpad_db"

# Run migrations
npx prisma migrate deploy

# Backup strategy
# → Automated backups (Heroku/Railway/DigitalOcean)
```

---

**Document Owner:** Luiz Spinelli (via BMAD)  
**Last Updated:** March 11, 2026  
**Status:** Ready for Implementation
