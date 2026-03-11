/**
 * LaunchPad Commerce - Admin Auth API
 * MIT License - Copyright (c) 2026 Luiz Spinelli
 * 
 * POST /api/admin/auth
 * Authenticates admin user and returns httpOnly cookie with token
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const LoginSchema = z.object({
  password: z.string().min(1, 'Senha é obrigatória'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = LoginSchema.parse(body);

    // Get admin password from env
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('❌ ADMIN_PASSWORD not configured');
      return NextResponse.json(
        { error: 'Admin não configurado no servidor' },
        { status: 500 }
      );
    }

    // Validate password
    if (password !== adminPassword) {
      console.warn('⚠️ Failed admin login attempt');
      return NextResponse.json(
        { error: 'Senha incorreta' },
        { status: 401 }
      );
    }

    // Create token (base64 encoded admin:password for simplicity)
    const token = Buffer.from(`admin:${adminPassword}`).toString('base64');

    // Create response
    const response = NextResponse.json(
      { success: true, message: 'Autenticado com sucesso' },
      { status: 200 }
    );

    // Set httpOnly cookie (more secure than localStorage)
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/admin',
    });

    console.log('✅ Admin login successful');

    return response;
  } catch (error) {
    console.error('[POST /api/admin/auth] Error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Dados inválidos',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao autenticar' },
      { status: 500 }
    );
  }
}

// Logout endpoint
export async function DELETE(request: NextRequest) {
  const response = NextResponse.json(
    { success: true, message: 'Logout realizado' },
    { status: 200 }
  );

  response.cookies.set('admin-token', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/admin',
  });

  return response;
}
