'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import Providers from './providers';
import Header from '@/components/layout/Header';
import Footers from '@/components/layout/Footer';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="es">
      <body className={inter.className}>
        {/* Mostrar el Header solo si no estamos en una ruta de admin */}
        {!isAdminRoute && <Header />}
        
        <Providers>{children}</Providers>
        
        {/* Mostrar el Footer solo si no estamos en una ruta de admin */}
        {!isAdminRoute && <Footers />}
      </body>
    </html>
  );
}