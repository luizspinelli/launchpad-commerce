import { Suspense } from 'react';
import Navbar from '@/app/components/Navbar';
import OrderContent from './OrderContent';

export default function OrderPage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <main className="min-h-screen bg-white py-12 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Carregando seu pedido...</p>
            </div>
          </main>
        }
      >
        <OrderContent />
      </Suspense>
    </>
  );
}
