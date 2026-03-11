/**
 * LaunchPad Commerce - Order Download Section
 * MIT License - Copyright (c) 2026 Luiz Spinelli
 * 
 * Component showing download links for purchased products
 */

'use client';

interface Product {
  id: string;
  name: string;
  fileUrl?: string;
}

interface OrderDownloadSectionProps {
  products: Product[];
  orderEmail: string;
}

export default function OrderDownloadSection({
  products,
  orderEmail,
}: OrderDownloadSectionProps) {
  const hasDownloads = products.some((p) => p.fileUrl);

  if (!hasDownloads) {
    return null;
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
      <h3 className="text-lg font-bold text-slate-900 mb-4">📥 Seus Downloads</h3>

      <div className="space-y-3">
        {products
          .filter((p) => p.fileUrl)
          .map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between bg-white rounded-lg p-4 border border-blue-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📦</span>
                <div>
                  <p className="font-semibold text-slate-900">{product.name}</p>
                  <p className="text-sm text-slate-600">Pronto para download</p>
                </div>
              </div>
              <a
                href={product.fileUrl}
                download
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                ⬇️ Download
              </a>
            </div>
          ))}
      </div>

      {/* Info Box */}
      <div className="mt-4 bg-blue-100 border border-blue-300 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>💡 Dica:</strong> Guarde este email em um lugar seguro. Você pode precisar dele para fazer download novamente.
        </p>
      </div>

      {/* Security Note */}
      <p className="text-xs text-slate-500 mt-4">
        🔒 Links de download são únicos e associados a este email ({orderEmail}). Não compartilhe com terceiros.
      </p>
    </div>
  );
}
