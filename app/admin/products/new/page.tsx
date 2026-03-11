/**
 * LaunchPad Commerce - Create Product
 * MIT License - Copyright (c) 2026 Luiz Spinelli
 * 
 * Admin form to create new product with file upload
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    image: '',
    category: '',
  });

  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate slug from name
    if (name === 'name') {
      setFormData((prev) => ({
        ...prev,
        slug: value.toLowerCase().replace(/\s+/g, '-'),
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setIsLoading(true);

      // Validate inputs
      if (!formData.name || !formData.slug || !formData.price || !formData.image) {
        throw new Error('Por favor, preencha todos os campos obrigatórios');
      }

      // Create FormData for submission
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('slug', formData.slug);
      submitData.append('description', formData.description);
      submitData.append('price', (parseFloat(formData.price) * 100).toString()); // Convert to cents
      submitData.append('image', formData.image);
      submitData.append('category', formData.category);

      if (file) {
        submitData.append('file', file);
      }

      // Submit to API
      const response = await fetch('/api/admin/products/create', {
        method: 'POST',
        body: submitData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar produto');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/products');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar produto');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-12 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-300 mb-2">Produto Criado com Sucesso!</h2>
          <p className="text-green-200 mb-6">Você será redirecionado em breve...</p>
          <Link
            href="/admin/products"
            className="text-green-400 hover:text-green-300 font-medium"
          >
            Voltar agora
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">Novo Produto</h1>
          <p className="text-slate-400 mt-1">Criar um novo produto digital</p>
        </div>
        <Link
          href="/admin/products"
          className="text-slate-400 hover:text-slate-200 font-medium"
        >
          ← Voltar
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/30 border border-red-700/50 text-red-300 px-6 py-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-lg p-8 space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Nome do Produto *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            placeholder="ex: React Mastery Course"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Slug (URL) *
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            placeholder="react-mastery-course"
            required
          />
          <p className="text-xs text-slate-400 mt-1">Auto-gerado a partir do nome</p>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Preço (R$) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            placeholder="199.99"
            step="0.01"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Descrição
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            disabled={isLoading}
            rows={4}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            placeholder="Descreva o produto..."
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            URL da Imagem *
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            placeholder="https://images.unsplash.com/..."
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Categoria
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <option value="">Selecione uma categoria</option>
            <option value="course">Curso</option>
            <option value="ebook">Ebook</option>
            <option value="template">Template</option>
            <option value="tools">Ferramentas</option>
          </select>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Arquivo do Produto (ZIP, PDF, etc)
          </label>
          <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-slate-500 transition-colors">
            <input
              type="file"
              onChange={handleFileChange}
              disabled={isLoading}
              className="hidden"
              id="file-input"
              accept=".zip,.pdf,.rar,.tar,.gz"
            />
            <label
              htmlFor="file-input"
              className="flex flex-col items-center cursor-pointer"
            >
              <span className="text-3xl mb-2">📁</span>
              <p className="text-white font-medium">
                {file ? file.name : 'Clique para selecionar um arquivo'}
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Máximo 100MB (ZIP, PDF, etc)
              </p>
            </label>
          </div>
          {file && (
            <p className="text-green-400 text-sm mt-2">
              ✅ {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
            </p>
          )}
        </div>

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="w-full bg-slate-700 rounded-lg h-2">
            <div
              className="bg-blue-600 h-2 rounded-lg transition-all"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        {/* Submit */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`flex-1 py-3 px-4 rounded-lg font-bold text-white transition-colors ${
              isLoading
                ? 'bg-slate-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            }`}
          >
            {isLoading ? '⏳ Criando...' : '✅ Criar Produto'}
          </button>
          <Link
            href="/admin/products"
            className="py-3 px-6 rounded-lg font-bold text-white bg-slate-700 hover:bg-slate-600 transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>

      {/* Info Box */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h3 className="text-sm font-bold text-slate-300 mb-2">💡 Dicas</h3>
        <ul className="text-sm text-slate-400 space-y-1">
          <li>• O arquivo será armazenado de forma segura no Vercel Blob</li>
          <li>• Apenas clientes que comprarem podem fazer download</li>
          <li>• Você pode atualizar o arquivo depois</li>
          <li>• Slug é automático, mas pode ser editado</li>
        </ul>
      </div>
    </div>
  );
}
