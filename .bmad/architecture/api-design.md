# 🔌 API Design — LaunchPad Commerce

**Version:** 1.0  
**Date:** March 11, 2026  
**Status:** Ready for Implementation

---

## 1. API Overview

**Type:** REST API (Next.js API Routes)  
**Authentication:** Basic (admin) + Public (customers)  
**Base URL:** `https://launchpad-commerce.vercel.app/api`  
**Response Format:** JSON  
**Error Handling:** HTTP status codes + error messages  

---

## 2. Request/Response Standards

### Success Response (200-201)
```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "...",
    ...
  },
  "timestamp": "2026-03-11T16:41:00Z"
}
```

### Error Response (4xx-5xx)
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid product price",
    "details": {
      "field": "price",
      "reason": "must be > 0"
    }
  },
  "timestamp": "2026-03-11T16:41:00Z"
}
```

### List Response (Paginated)
```json
{
  "success": true,
  "data": [
    { "id": "1", "name": "Product 1", ... },
    { "id": "2", "name": "Product 2", ... }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 102,
    "pages": 3
  },
  "timestamp": "2026-03-11T16:41:00Z"
}
```

---

## 3. Public Endpoints (No Auth Required)

### GET /api/products
**Description:** List all products  
**Auth:** None  
**Query Parameters:**
```
?page=1          (default: 1)
?limit=50        (default: 50, max: 100)
?search=keyword  (optional: search by name)
```

**Response:** 200 OK
```json
{
  "success": true,
  "data": [
    {
      "id": "prod_1",
      "slug": "python-course",
      "name": "Python for Beginners",
      "description": "Learn Python basics...",
      "price": 4999,
      "currency": "BRL",
      "image": "https://...",
      "created_at": "2026-03-11T00:00:00Z"
    }
  ],
  "pagination": { "page": 1, "limit": 50, "total": 5, "pages": 1 }
}
```

---

### GET /api/products/:slug
**Description:** Get single product details  
**Auth:** None  
**Path Parameters:**
```
:slug  (string, required) - e.g. "python-course"
```

**Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "id": "prod_1",
    "slug": "python-course",
    "name": "Python for Beginners",
    "description": "Comprehensive Python course...\n\nModule 1: Basics\n- Variables\n- Data types\n...",
    "price": 4999,
    "currency": "BRL",
    "image": "https://...",
    "features": [
      "10 hours of content",
      "Lifetime access",
      "Certificate included"
    ],
    "created_at": "2026-03-11T00:00:00Z",
    "updated_at": "2026-03-11T00:00:00Z"
  }
}
```

**Errors:**
```json
{ "success": false, "error": { "code": "NOT_FOUND", "message": "Product not found" } }
```

---

### POST /api/stripe/checkout
**Description:** Create Stripe Checkout session  
**Auth:** None  
**Method:** POST  
**Content-Type:** application/json  

**Request Body:**
```json
{
  "items": [
    {
      "product_id": "prod_1",
      "quantity": 1,
      "price": 4999
    }
  ],
  "customer_email": "john@example.com",
  "success_url": "https://launchpad.spinelli.dev.br/thank-you?session_id={CHECKOUT_SESSION_ID}",
  "cancel_url": "https://launchpad.spinelli.dev.br/products"
}
```

**Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "session_id": "cs_test_...",
    "checkout_url": "https://checkout.stripe.com/c/pay/cs_test_..."
  }
}
```

**Errors:**
```json
{ "success": false, "error": { "code": "INVALID_ITEMS", "message": "Items array is empty" } }
{ "success": false, "error": { "code": "STRIPE_ERROR", "message": "Failed to create session" } }
```

---

### POST /api/stripe/webhook
**Description:** Stripe webhook handler  
**Auth:** Signature validation (STRIPE_WEBHOOK_SECRET)  
**Method:** POST  
**Content-Type:** application/json  

**Event Types Handled:**
```
- checkout.session.completed  → Create order, send email
- charge.refunded             → Update order status (future)
- payment_intent.payment_failed → Log failure (future)
```

**Request Header:**
```
stripe-signature: t=1234567890,v1=...
```

**Response:** 200 OK
```json
{ "received": true }
```

**Processing (async):**
1. Verify Stripe signature
2. Parse event data
3. Create Order in database
4. Trigger confirmation email (Resend)
5. Log to analytics

---

## 4. Admin Endpoints (Password Protected)

**Admin Auth Middleware:**
```typescript
// Header required
Authorization: Bearer <ADMIN_PASSWORD>

// Or
?admin_key=<ADMIN_PASSWORD>
```

**Error (401 Unauthorized):**
```json
{ "success": false, "error": { "code": "UNAUTHORIZED", "message": "Invalid credentials" } }
```

---

### POST /api/admin/login
**Description:** Simple password authentication  
**Auth:** None (public endpoint)  
**Method:** POST  

**Request Body:**
```json
{
  "password": "admin_password"
}
```

**Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "expires_in": 86400
  }
}
```

**Errors:**
```json
{ "success": false, "error": { "code": "INVALID_PASSWORD", "message": "Incorrect password" } }
```

---

### GET /api/admin/dashboard
**Description:** Dashboard overview stats  
**Auth:** Required (admin)  
**Method:** GET  

**Query Parameters:**
```
?period=month  (day, week, month, year, all)
```

**Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "summary": {
      "total_revenue": 50000,
      "currency": "BRL",
      "total_orders": 25,
      "avg_order_value": 2000,
      "conversion_rate": 2.5
    },
    "revenue_by_day": [
      { "date": "2026-03-01", "amount": 5000 },
      { "date": "2026-03-02", "amount": 3500 }
    ],
    "top_products": [
      { "id": "prod_1", "name": "Python Course", "units_sold": 15, "revenue": 75000 }
    ],
    "recent_orders": [
      {
        "id": "order_1",
        "customer_email": "john@example.com",
        "amount": 4999,
        "status": "paid",
        "created_at": "2026-03-11T16:30:00Z"
      }
    ]
  }
}
```

---

### GET /api/admin/orders
**Description:** List all orders (paginated)  
**Auth:** Required (admin)  
**Method:** GET  

**Query Parameters:**
```
?page=1          (default: 1)
?limit=50        (default: 50)
?status=paid     (paid, refunded, failed, all)
?search=email    (search by customer email)
?from=2026-03-01 (date range start)
?to=2026-03-11   (date range end)
?export=csv      (optional: export instead of JSON)
```

**Response:** 200 OK
```json
{
  "success": true,
  "data": [
    {
      "id": "order_1",
      "stripe_session_id": "cs_test_...",
      "customer_email": "john@example.com",
      "amount": 4999,
      "currency": "BRL",
      "items": [
        {
          "product_id": "prod_1",
          "product_name": "Python Course",
          "quantity": 1,
          "price": 4999
        }
      ],
      "status": "paid",
      "payment_method": "card",
      "created_at": "2026-03-11T16:30:00Z",
      "refunded_at": null
    }
  ],
  "pagination": { "page": 1, "limit": 50, "total": 102 }
}
```

**Export CSV:**
```
Content-Type: text/csv
Content-Disposition: attachment; filename="orders_2026-03-11.csv"

Order ID,Customer Email,Amount,Currency,Status,Product,Created At
order_1,john@example.com,4999,BRL,paid,Python Course,2026-03-11T16:30:00Z
...
```

---

### GET /api/admin/orders/:id
**Description:** Get single order details  
**Auth:** Required (admin)  
**Method:** GET  

**Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "id": "order_1",
    "stripe_session_id": "cs_test_...",
    "customer_email": "john@example.com",
    "amount": 4999,
    "currency": "BRL",
    "items": [
      {
        "product_id": "prod_1",
        "product_name": "Python Course",
        "quantity": 1,
        "price": 4999
      }
    ],
    "status": "paid",
    "payment_method": "card",
    "stripe_payment_id": "pi_test_...",
    "created_at": "2026-03-11T16:30:00Z",
    "confirmed_email_sent_at": "2026-03-11T16:31:00Z",
    "refunded_at": null
  }
}
```

---

### POST /api/admin/products
**Description:** Create new product  
**Auth:** Required (admin)  
**Method:** POST  

**Request Body:**
```json
{
  "name": "Advanced Python",
  "slug": "advanced-python",
  "description": "Master Python for production...",
  "price": 9999,
  "currency": "BRL",
  "image": "https://cdn.example.com/image.jpg"
}
```

**Response:** 201 Created
```json
{
  "success": true,
  "data": {
    "id": "prod_2",
    "slug": "advanced-python",
    "name": "Advanced Python",
    "price": 9999,
    "created_at": "2026-03-11T16:41:00Z"
  }
}
```

**Errors:**
```json
{ "success": false, "error": { "code": "DUPLICATE_SLUG", "message": "Product with this slug already exists" } }
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "Price must be > 0" } }
```

---

### PATCH /api/admin/products/:id
**Description:** Update product  
**Auth:** Required (admin)  
**Method:** PATCH  

**Request Body:**
```json
{
  "name": "Advanced Python (Updated)",
  "price": 12999,
  "image": "https://cdn.example.com/new-image.jpg"
}
```

**Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "id": "prod_2",
    "name": "Advanced Python (Updated)",
    "price": 12999,
    "updated_at": "2026-03-11T16:41:00Z"
  }
}
```

---

### DELETE /api/admin/products/:id
**Description:** Delete product  
**Auth:** Required (admin)  
**Method:** DELETE  

**Response:** 200 OK
```json
{
  "success": true,
  "data": { "id": "prod_2", "deleted": true }
}
```

**Note:** Soft delete (keep historical data for orders)

---

### POST /api/admin/email/send-confirmation
**Description:** Send order confirmation email (manual)  
**Auth:** Required (admin)  
**Method:** POST  

**Request Body:**
```json
{
  "order_id": "order_1",
  "resend": true
}
```

**Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "order_id": "order_1",
    "email_sent_to": "john@example.com",
    "email_id": "resend_email_id_...",
    "timestamp": "2026-03-11T16:41:00Z"
  }
}
```

---

## 5. Analytics Endpoints (Read-Only)

### GET /api/analytics/overview
**Description:** Analytics overview  
**Auth:** None (public or admin only — TBD)  
**Method:** GET  

**Query Parameters:**
```
?period=month (day, week, month, year)
```

**Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "pageviews": {
      "total": 5000,
      "unique_visitors": 1200,
      "bounce_rate": 45.2,
      "avg_session_duration": 2.5
    },
    "conversion": {
      "total_visits": 5000,
      "total_conversions": 125,
      "conversion_rate": 2.5,
      "revenue": 500000
    },
    "top_pages": [
      { "path": "/", "views": 2000, "conversions": 75 },
      { "path": "/products", "views": 1500, "conversions": 35 }
    ],
    "traffic_by_day": [
      { "date": "2026-03-01", "visits": 150, "conversions": 3 }
    ]
  }
}
```

---

## 6. Rate Limiting

**Policy:**
```
- Public endpoints: 100 requests/minute per IP
- Admin endpoints: 50 requests/minute per token
- Stripe webhooks: No limit (trusted source)
```

**Response Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 75
X-RateLimit-Reset: 1234567890
```

**Error (429 Too Many Requests):**
```json
{ "success": false, "error": { "code": "RATE_LIMITED", "message": "Too many requests" } }
```

---

## 7. Error Codes

| Code | Status | Description |
|------|--------|-------------|
| VALIDATION_ERROR | 400 | Invalid input data |
| UNAUTHORIZED | 401 | Missing/invalid auth |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| DUPLICATE | 409 | Resource already exists |
| RATE_LIMITED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Server error |
| STRIPE_ERROR | 502 | Stripe API error |

---

## 8. Security

**HTTPS:** Required (enforced by Vercel)  
**CORS:** Configured for same-origin + localhost  
**Auth:** Password or JWT (future)  
**Validation:** Zod schema validation on all inputs  
**Logging:** All requests logged (timestamp, method, path, user)  
**Secrets:** Never exposed in responses  

---

## 9. Versioning Strategy

**Current:** v0 (no prefix, implicit)  
**Future:** `/api/v1/...`, `/api/v2/...` as needed  
**Breaking Changes:** Bump major version  

---

## 10. API Usage Examples

### Create Order (Customer)
```bash
# 1. Get products
curl -X GET https://launchpad-commerce.vercel.app/api/products

# 2. Create checkout session
curl -X POST https://launchpad-commerce.vercel.app/api/stripe/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"product_id": "prod_1", "quantity": 1}],
    "customer_email": "john@example.com"
  }'

# 3. Redirect to checkout_url
# → Browser opens Stripe Checkout
```

### View Orders (Admin)
```bash
curl -X GET https://launchpad-commerce.vercel.app/api/admin/orders \
  -H "Authorization: Bearer admin_password"
```

### Add Product (Admin)
```bash
curl -X POST https://launchpad-commerce.vercel.app/api/admin/products \
  -H "Authorization: Bearer admin_password" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "slug": "new-product",
    "price": 4999
  }'
```

---

**Document Owner:** Luiz Spinelli (via BMAD)  
**Last Updated:** March 11, 2026  
**Status:** Ready for Implementation
