import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export const metadata = {
  title: 'LaunchPad Commerce - Create & Sell Digital Products in Minutes',
  description:
    'No coding needed. Launch a beautiful storefront with secure Stripe payments and automatic email delivery. Start selling digital products today.',
  keywords: [
    'digital products',
    'online course platform',
    'ebook seller',
    'stripe integration',
    'no-code commerce',
  ],
  authors: [{ name: 'LaunchPad Commerce' }],
  creator: 'LaunchPad Commerce',
  openGraph: {
    title: 'LaunchPad Commerce - Create & Sell Digital Products',
    description: 'Launch your digital business in minutes. No coding required.',
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
    description: 'Create & sell digital products in minutes',
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
