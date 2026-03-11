/**
 * /products - Product Listing Page
 */

export const metadata = {
  title: 'Products | LaunchPad Commerce',
  description: 'Browse our products',
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        {/* TODO: Implement product listing grid */}
        <p className="text-gray-600">Loading products...</p>
      </div>
    </main>
  );
}
