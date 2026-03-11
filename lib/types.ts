/**
 * LaunchPad Commerce - TypeScript Types
 */

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  stripeSessionId: string;
  customerEmail: string;
  totalAmount: number;
  status: 'pending' | 'completed' | 'failed';
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  priceAtTime: number;
}

export interface AnalyticsEvent {
  id: string;
  eventType: 'visit' | 'click' | 'add_to_cart' | 'checkout' | 'purchase';
  customerEmail?: string;
  productId?: string;
  path: string;
  createdAt: Date;
}

export interface CreateOrderInput {
  stripeSessionId: string;
  customerEmail: string;
  totalAmount: number;
  items: {
    productId: string;
    quantity: number;
    priceAtTime: number;
  }[];
}
