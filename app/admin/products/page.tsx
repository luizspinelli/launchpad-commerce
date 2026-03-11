/**
 * /admin/products - Products Management Page
 */

export const metadata = {
  title: 'Products | Admin Dashboard',
  description: 'Manage products',
};

export default function ProductsManagementPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Products Management</h1>
        {/* TODO: Implement products management table */}
        <p className="text-gray-600">Loading products...</p>
      </div>
    </main>
  );
}
