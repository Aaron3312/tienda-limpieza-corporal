'use client';

import { AuthProvider } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  // Solo aplicar AuthProvider a rutas de administración
  if (isAdminRoute) {
    return <AuthProvider>{children}</AuthProvider>;
  }

  // Para rutas regulares, renderizar directamente los children
  return <>{children}</>;
}