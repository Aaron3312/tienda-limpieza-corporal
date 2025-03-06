import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NaturClean - Productos de Limpieza Corporal',
  description: 'Tienda de productos naturales para la limpieza corporal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        {children}
        <footer className="bg-gray-100 py-6 mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              © 2025 SoloParaEva. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}