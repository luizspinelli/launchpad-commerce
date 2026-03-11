/**
 * /admin/orders - Orders List Page
 */

export const metadata = {
  title: 'Orders | Admin Dashboard',
  description: 'View all orders',
};

export default function OrdersListPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Orders</h1>
        {/* TODO: Implement orders table */}
        <p className="text-gray-600">Loading orders...</p>
      </div>
    </main>
  );
}
