/**
 * LaunchPad Commerce - File Upload API
 * MIT License - Copyright (c) 2026 Luiz Spinelli
 * 
 * POST /api/admin/upload
 * Upload product file to Vercel Blob
 */

import { NextRequest, NextResponse } from 'next/server';
import { uploadProductFile } from '@/lib/blob';

/**
 * Handle file upload to Vercel Blob
 * Expects form-data with "file" field and "productId" field
 */
export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const productId = formData.get('productId') as string;

    // Validate inputs
    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo fornecido' },
        { status: 400 }
      );
    }

    if (!productId) {
      return NextResponse.json(
        { error: 'ID do produto é obrigatório' },
        { status: 400 }
      );
    }

    // Validate file size (max 100MB)
    const MAX_FILE_SIZE = 100 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Arquivo muito grande (máximo 100MB)' },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob
    const uploadResult = await uploadProductFile(file, productId);

    console.log(`✅ File upload API success: ${uploadResult.url}`);

    return NextResponse.json(
      {
        success: true,
        url: uploadResult.url,
        pathname: uploadResult.pathname,
        size: uploadResult.size,
        type: uploadResult.type,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[POST /api/admin/upload] Error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Erro ao fazer upload',
      },
      { status: 500 }
    );
  }
}
