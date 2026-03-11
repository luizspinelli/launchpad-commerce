import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export const metadata = {
  title: 'LaunchPad Commerce - Crie e Venda Produtos Digitais em Minutos',
  description:
    'Sem código. Lance uma loja bonita com pagamentos seguros no Stripe e entrega automática por email. Comece a vender produtos digitais hoje.',
  keywords: [
    'produtos digitais',
    'plataforma de cursos',
    'venda de ebooks',
    'integração stripe',
    'ecommerce sem código',
  ],
  authors: [{ name: 'LaunchPad Commerce' }],
  creator: 'LaunchPad Commerce',
  openGraph: {
    title: 'LaunchPad Commerce - Crie e Venda Produtos Digitais',
    description: 'Lance seu negócio digital em minutos. Sem código necessário.',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LaunchPad Commerce',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LaunchPad Commerce',
    description: 'Crie e venda produtos digitais em minutos',
  },
};

export default function Home() {
  return (
    <main className="w-full bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
