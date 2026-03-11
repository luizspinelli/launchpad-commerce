/**
 * Resend Email Service Client
 */

import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmation(email: string, orderId: string, amount: number) {
  return await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'noreply@launchpad.example.com',
    to: email,
    subject: 'Order Confirmation',
    html: `
      <h1>Thank you for your purchase!</h1>
      <p>Order ID: ${orderId}</p>
      <p>Amount: R$ ${(amount / 100).toFixed(2)}</p>
      <p>Check your email for download links and further instructions.</p>
    `,
  });
}
