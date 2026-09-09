'use client';

import { AuthProvider } from '@/context/AuthContext';
import { SiteDataProvider } from '@/context/SiteDataContext';
import { CartProvider } from '@/context/CartContext';
import { usePathname } from 'next/navigation';

/**
 * La sesión de Firebase vive en todo el sitio: la tienda la usa para las
 * cuentas de clientas y el panel para el rol de administración.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <AuthProvider>{children}</AuthProvider>;
  }

  return (
    <AuthProvider>
      <SiteDataProvider>
        <CartProvider>{children}</CartProvider>
      </SiteDataProvider>
    </AuthProvider>
  );
}
