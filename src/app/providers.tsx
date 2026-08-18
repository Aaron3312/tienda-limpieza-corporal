'use client';

import { AuthProvider } from '@/context/AuthContext';
import { SiteDataProvider } from '@/context/SiteDataContext';
import { CartProvider } from '@/context/CartContext';
import { usePathname } from 'next/navigation';

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <AuthProvider>{children}</AuthProvider>;
  }

  return (
    <SiteDataProvider>
      <CartProvider>{children}</CartProvider>
    </SiteDataProvider>
  );
}
