'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footers from './Footer';
import Providers from '@/app/providers';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin  = pathname?.startsWith('/admin');

  // El header va dentro de Providers porque el contador del carrito consume
  // CartContext. Fuera del árbol de proveedores, useCart revienta.
  return (
    <Providers>
      {!isAdmin && <Header />}
      {children}
      {!isAdmin && <Footers />}
    </Providers>
  );
}
