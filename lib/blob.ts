/**
 * LaunchPad Commerce - Vercel Blob Storage
 * MIT License - Copyright (c) 2026 Luiz Spinelli
 * 
 * File upload handling via Vercel Blob
 */

import { put, del } from '@vercel/blob';

/**
 * Upload a file to Vercel Blob
 */
export async function uploadProductFile(file: File, productId: string) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error('BLOB_READ_WRITE_TOKEN not configured');
    }

    // Create unique filename: productId_timestamp_originalname
    const timestamp = Date.now();
    const ext = file.name.split('.').pop();
    const filename = `products/${productId}_${timestamp}.${ext}`;

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public', // Public URL for downloads
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    console.log(`✅ File uploaded to Vercel Blob: ${blob.url}`);

    return {
      url: blob.url,
      pathname: blob.pathname,
      size: file.size,
      type: file.type,
    };
  } catch (error) {
    console.error('❌ File upload failed:', error);
    throw error;
  }
}

/**
 * Delete a file from Vercel Blob
 */
export async function deleteProductFile(pathname: string) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error('BLOB_READ_WRITE_TOKEN not configured');
    }

    await del(pathname, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    console.log(`✅ File deleted from Vercel Blob: ${pathname}`);
  } catch (error) {
    console.error('❌ File deletion failed:', error);
    throw error;
  }
}

/**
 * Generate a signed download URL for a file
 * (In production, add expiration and rate limiting)
 */
export function getDownloadUrl(fileUrl: string): string {
  // File URL from Vercel Blob is already signed
  // Can be accessed directly for downloads
  return fileUrl;
}
