/**
 * /admin/products/[id] - Edit Product Page
 */

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export const metadata = {
  title: 'Edit Product | Admin Dashboard',
  description: 'Edit product',
};

export default function EditProductPage({ params }: EditProductPageProps) {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Edit Product: {params.id}</h1>
        {/* TODO: Implement product edit form */}
        <p className="text-gray-600">Loading product...</p>
      </div>
    </main>
  );
}
