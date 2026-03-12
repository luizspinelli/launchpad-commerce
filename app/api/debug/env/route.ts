/**
 * LaunchPad Commerce - Debug Endpoint
 * Shows environment variables status (secure, no secrets exposed)
 * DELETE THIS IN PRODUCTION
 */

import { NextResponse } from 'next/server';

export async function GET() {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const databaseUrl = process.env.DATABASE_URL;
  const nextPublicUrl = process.env.NEXT_PUBLIC_URL;

  return NextResponse.json(
    {
      environment: {
        nodeEnv: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV,
      },
      stripe: {
        hasSecretKey: !!stripeSecretKey,
        secretKeyLength: stripeSecretKey?.length || 0,
        secretKeyPrefix: stripeSecretKey ? stripeSecretKey.substring(0, 10) : 'MISSING',
        hasPublishableKey: !!stripePublishableKey,
        publishableKeyLength: stripePublishableKey?.length || 0,
        publishableKeyPrefix: stripePublishableKey ? stripePublishableKey.substring(0, 10) : 'MISSING',
      },
      database: {
        hasDatabaseUrl: !!databaseUrl,
        databaseUrlLength: databaseUrl?.length || 0,
      },
      urls: {
        nextPublicUrl: nextPublicUrl || 'NOT SET (using default)',
      },
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
