'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footers from './Footer';
import Providers from '@/app/providers';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin  = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Header />}
      <Providers>{children}</Providers>
      {!isAdmin && <Footers />}
    </>
  );
}
