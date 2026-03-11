/**
 * LaunchPad Commerce - Create Product API
 * MIT License - Copyright (c) 2026 Luiz Spinelli
 * 
 * POST /api/admin/products/create
 * Create a new product with optional file upload
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { uploadProductFile } from '@/lib/blob';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();

    // Extract fields
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const priceStr = formData.get('price') as string;
    const image = formData.get('image') as string;
    const category = formData.get('category') as string;
    const file = formData.get('file') as File | null;

    // Validate required fields
    if (!name || !slug || !priceStr || !image) {
      return NextResponse.json(
        { error: 'Nome, slug, preço e imagem são obrigatórios' },
        { status: 400 }
      );
    }

    // Validate slug is unique
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: 'Slug já existe. Escolha outro.' },
        { status: 400 }
      );
    }

    // Parse price
    const price = parseInt(priceStr);
    if (isNaN(price) || price < 0) {
      return NextResponse.json(
        { error: 'Preço inválido' },
        { status: 400 }
      );
    }

    // Upload file if provided
    let fileUrl: string | undefined;
    let filePathname: string | undefined;
    let fileSize: number | undefined;

    if (file && file.size > 0) {
      try {
        // Create temp product ID for file upload naming
        const tempId = slug;
        const uploadResult = await uploadProductFile(file, tempId);
        fileUrl = uploadResult.url;
        filePathname = uploadResult.pathname;
        fileSize = uploadResult.size;
        console.log(`✅ File uploaded: ${fileUrl}`);
      } catch (uploadError) {
        console.error('⚠️  File upload failed, continuing without file:', uploadError);
        // Don't fail product creation if file upload fails
      }
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        image,
        category: category || undefined,
        fileUrl,
        filePathname,
        fileSize,
        featured: false,
      },
    });

    console.log(`✅ Product created: ${product.id}`);

    return NextResponse.json(
      {
        success: true,
        product,
        message: file ? 'Produto e arquivo criados com sucesso!' : 'Produto criado (sem arquivo)',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[POST /api/admin/products/create] Error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Erro ao criar produto',
      },
      { status: 500 }
    );
  }
}
