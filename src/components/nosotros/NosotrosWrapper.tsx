'use client';

import React from 'react';
import { Colores, InformacionNegocio } from '@/types';
import dynamic from 'next/dynamic';

// Cargar el componente cliente dinámicamente pero solo en el cliente (no en SSR)
const ClientNosotrosPage = dynamic(
  () => import('./ClientNosotrosPage'),
  { ssr: false, loading: () => <LoadingComponent /> }
);

// Componente simple de carga
function LoadingComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

interface NosotrosWrapperProps {
  initialData: InformacionNegocio;
  colores: Colores;
}

export default function NosotrosWrapper({ initialData, colores }: NosotrosWrapperProps) {
  return <ClientNosotrosPage initialData={initialData} colores={colores} />;
}