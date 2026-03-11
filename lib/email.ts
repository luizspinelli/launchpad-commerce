/**
 * Resend Email Service Client
 */

import { Resend } from 'resend';

const resendKey = process.env.RESEND_API_KEY;

if (!resendKey) {
  console.warn('⚠️  RESEND_API_KEY not configured. Email sending disabled.');
}

export const resend = resendKey ? new Resend(resendKey) : null;

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmation(email: string, orderId: string, amount: number) {
  if (!resend) {
    console.warn('⚠️  Resend not configured. Email not sent.');
    return { id: 'mock-' + orderId };
  }

  const formattedAmount = (amount / 100).toFixed(2);
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@launchpad-commerce.com';

  try {
    const response = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: '✅ Pedido Confirmado | LaunchPad Commerce',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
              .order-id { font-size: 14px; color: #666; }
              .order-number { font-size: 24px; font-weight: bold; color: #1e3a8a; }
              .amount { font-size: 32px; font-weight: bold; color: #059669; margin: 10px 0; }
              .button { background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0; }
              .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
              .checkmark { font-size: 48px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="checkmark">✅</div>
                <h1>Seu Pedido Foi Confirmado!</h1>
              </div>
              
              <div class="content">
                <p>Olá,</p>
                <p>Obrigado por sua compra! 🎉 Recebemos seu pagamento e estamos processando seu pedido.</p>
                
                <div class="order-details">
                  <div class="order-id">Número do Pedido</div>
                  <div class="order-number">${orderId}</div>
                  
                  <div style="margin-top: 15px;">
                    <div class="order-id">Valor Total</div>
                    <div class="amount">R$ ${formattedAmount}</div>
                  </div>
                </div>
                
                <h2 style="color: #1e3a8a; margin-top: 30px;">Próximos Passos:</h2>
                <ol style="color: #333; line-height: 1.8;">
                  <li><strong>Download:</strong> Acesse seu painel de cliente para fazer download dos produtos.</li>
                  <li><strong>Acesso:</strong> Você terá acesso imediato a todo o conteúdo comprado.</li>
                  <li><strong>Suporte:</strong> Se tiver dúvidas, responda este email ou entre em contato.</li>
                </ol>
                
                <div style="background: #e0f2fe; border-left: 4px solid #0ea5e9; padding: 15px; margin: 20px 0; border-radius: 4px;">
                  <p style="color: #0c4a6e; margin: 0;"><strong>💡 Dica:</strong> Guarde este email em um lugar seguro. Você pode precisar dele para acessar seus produtos novamente.</p>
                </div>
                
                <p style="margin-top: 30px; color: #666;">Qualquer dúvida, estamos aqui para ajudar!</p>
                <p style="color: #666;">Abraços,<br>Equipe LaunchPad Commerce</p>
              </div>
              
              <div class="footer">
                <p>© 2026 LaunchPad Commerce. Todos os direitos reservados.</p>
                <p>Este é um email automático. Por favor, não responda com dados sensíveis.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log(`✅ Order confirmation email sent to ${email}`);
    return response;
  } catch (error) {
    console.error('❌ Failed to send order confirmation email:', error);
    // Don't throw - webhook should complete even if email fails
    return null;
  }
}
