import Navbar from './components/Navbar';
import HeroPortfolio from './components/HeroPortfolio';
import FeaturesPortfolio from './components/FeaturesPortfolio';
import StackPortfolio from './components/StackPortfolio';
import Footer from './components/Footer';

export const metadata = {
  title: 'LaunchPad Commerce - Projeto Portfolio | E-commerce com Stripe',
  description:
    'Uma plataforma e-commerce production-ready construída com Next.js, Stripe e PostgreSQL. Demonstra full-stack development, payment processing, e arquitetura escalável.',
  keywords: [
    'portfolio',
    'e-commerce',
    'Next.js',
    'Stripe',
    'PostgreSQL',
    'full-stack',
    'TypeScript',
    'Node.js',
  ],
  authors: [{ name: 'Luiz Spinelli' }],
  creator: 'Luiz Spinelli',
  openGraph: {
    title: 'LaunchPad Commerce - Projeto Portfolio',
    description: 'Uma plataforma e-commerce completa com Stripe, webhooks, emails e PostgreSQL.',
    type: 'website',
    url: 'https://launchpad-commerce-roan.vercel.app',
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
    title: 'LaunchPad Commerce - Projeto Portfolio',
    description: 'E-commerce production-ready com Next.js, Stripe e PostgreSQL',
  },
};

export default function Home() {
  return (
    <main className="w-full bg-white">
      <Navbar />
      <HeroPortfolio />
      <FeaturesPortfolio />
      <StackPortfolio />
      <Footer />
    </main>
  );
}
