/**
 * /products/[slug] - Product Detail Page
 */

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export const metadata = {
  title: 'Product | LaunchPad Commerce',
  description: 'Product details',
};

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Product: {params.slug}</h1>
        {/* TODO: Implement product detail view */}
        <p className="text-gray-600">Loading product details...</p>
      </div>
    </main>
  );
}
