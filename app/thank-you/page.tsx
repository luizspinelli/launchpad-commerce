/**
 * /thank-you - Order Confirmation Page
 */

'use client';

import Navbar from '@/app/components/Navbar';

export const metadata = {
  title: 'Thank You | LaunchPad Commerce',
  description: 'Order confirmation',
};

export default function ThankYouPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-8">Your order has been confirmed.</p>
        {/* TODO: Implement order confirmation details */}
      </div>
    </main>
    </>
  );
}
