"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import catalogoData from '@/data/catalogo.json';

export default function AdminMenu() {
  const pathname = usePathname();
  const colores = catalogoData.colores;
  
  // Enlaces del menú
  const enlaces = [
    { nombre: 'Dashboard', ruta: '/admin', icono: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { nombre: 'Productos', ruta: '/admin/productos', icono: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { nombre: 'Categorías', ruta: '/admin/categorias', icono: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
    { nombre: 'Importar/Exportar', ruta: '/admin/importar-exportar', icono: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' }
  ];
  
  // Verificar si un enlace está activo
  const esEnlaceActivo = (ruta) => {
    if (ruta === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(ruta);
  };
  
  return (
    <nav className="w-64 bg-white min-h-screen shadow-sm">
      <div className="py-6 px-4">
        <ul className="space-y-2">
          {enlaces.map((enlace) => (
            <li key={enlace.ruta}>
              <Link
                href={enlace.ruta}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  esEnlaceActivo(enlace.ruta)
                    ? 'bg-gray-100 font-medium'
                    : 'hover:bg-gray-50'
                }`}
                style={{
                  color: esEnlaceActivo(enlace.ruta) ? colores.primario : 'inherit'
                }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-3" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={enlace.icono} />
                </svg>
                {enlace.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Footer del menú */}
      <div className="mt-auto border-t border-gray-200 p-4">
        <p className="text-sm text-gray-500">
          Panel de administración <br/>
          <span className="font-semibold">Solo Para Eva</span>
        </p>
      </div>
    </nav>
  );
}