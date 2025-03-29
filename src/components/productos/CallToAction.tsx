// src/components/productos/CallToAction.jsx
import React from 'react';
import Link from 'next/link';

export default function CallToAction({ colores }) {
  return (
    <div style={{ backgroundColor: colores.acento1 }}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <span className="block">¿Listo para probar nuestros productos?</span>
          <span className="block text-sm mt-2 opacity-90">Haz tu pedido hoy y recibe un regalo especial.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <Link href="/contacto" legacyBehavior>
            <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm transition-colors duration-300" 
               style={{ backgroundColor: colores.textoClaro, color: colores.acento1 }}>
              Contáctanos
            </a>
          </Link>
          <div className="ml-3">
            <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm transition-colors duration-300" 
               style={{ backgroundColor: colores.primario, color: colores.textoClaro, borderColor: 'rgba(255,255,255,0.3)' }}>
              Ver ofertas
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}