import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutClient from '@/components/layout/LayoutClient';

const inter = Inter({ subsets: ['latin'] });

const BASE_URL = 'https://solo-para-eva.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Solo Para Eva — Cosmética Artesanal',
    template: '%s | Solo Para Eva',
  },
  description:
    'Productos artesanales 100% naturales para el cuidado de tu piel. Sin sulfatos, sin parabenos, hechos a mano en México con amor.',
  keywords: [
    'jabones artesanales', 'cosmética natural', 'cremas naturales',
    'sin parabenos', 'cruelty free', 'hecho en México',
    'solo para eva', 'spa', 'cuidado de la piel',
  ],
  authors: [{ name: 'Solo Para Eva' }],
  creator: 'Solo Para Eva',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: BASE_URL,
    siteName: 'Solo Para Eva',
    title: 'Solo Para Eva — Cosmética Artesanal',
    description:
      'Productos artesanales 100% naturales para el cuidado de tu piel. Sin sulfatos, sin parabenos, hechos a mano en México.',
    images: [
      {
        url: '/images/home/stock-hero-soap.jpg',
        width: 1200,
        height: 630,
        alt: 'Solo Para Eva — Jabones artesanales naturales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solo Para Eva — Cosmética Artesanal',
    description:
      'Productos artesanales 100% naturales para el cuidado de tu piel. Sin sulfatos, sin parabenos, hechos a mano en México.',
    images: ['/images/home/stock-hero-soap.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
