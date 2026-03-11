/**
 * /checkout - Checkout Page
 */

export const metadata = {
  title: 'Checkout | LaunchPad Commerce',
  description: 'Review and complete your purchase',
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        {/* TODO: Implement checkout form */}
        <p className="text-gray-600">Loading checkout...</p>
      </div>
    </main>
  );
}
