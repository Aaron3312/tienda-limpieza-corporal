'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductoForm from '@/components/admin/ProductoForm';

// No necesitamos generateStaticParams para esta página
// porque ahora usará hash/query params en lugar de rutas dinámicas

export default function EditarProductoPage() {
  const searchParams = useSearchParams();
  const [productoId, setProductoId] = useState<string | null>(null);
  
  useEffect(() => {
    // Obtener el ID del producto desde los parámetros de búsqueda
    const id = searchParams.get('id');
    if (id) {
      setProductoId(id);
    } else {
      // Si no hay ID, intentar obtenerlo desde el hash de la URL
      // por si estamos usando navegación basada en hash (#)
      const hash = window.location.hash;
      if (hash && hash.startsWith('#')) {
        setProductoId(hash.substring(1));
      }
    }
  }, [searchParams]);

  if (!productoId) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Error: ID de producto no encontrado</h2>
        <p className="mb-4">No se ha especificado un ID de producto para editar.</p>
        <button 
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Volver
        </button>
      </div>
    );
  }

  return <ProductoForm productoId={productoId} isEditing={true} />;
}