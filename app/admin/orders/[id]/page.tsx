/**
 * /admin/orders/[id] - Order Detail Page
 */

interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

export const metadata = {
  title: 'Order Details | Admin Dashboard',
  description: 'Order details',
};

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Order: {params.id}</h1>
        {/* TODO: Implement order details */}
        <p className="text-gray-600">Loading order details...</p>
      </div>
    </main>
  );
}
