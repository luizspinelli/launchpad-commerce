/**
 * /admin - Admin Dashboard
 */

export const metadata = {
  title: 'Admin Dashboard | LaunchPad Commerce',
  description: 'Admin dashboard',
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        {/* TODO: Implement admin overview */}
        <p className="text-gray-600">Loading dashboard stats...</p>
      </div>
    </main>
  );
}
