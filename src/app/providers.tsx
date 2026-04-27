'use client';

import { AuthProvider } from '@/context/AuthContext';
import { SiteDataProvider } from '@/context/SiteDataContext';
import { usePathname } from 'next/navigation';

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <AuthProvider>{children}</AuthProvider>;
  }

  return <SiteDataProvider>{children}</SiteDataProvider>;
}