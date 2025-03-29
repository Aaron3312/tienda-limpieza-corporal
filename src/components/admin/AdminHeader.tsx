"use client";

import React from 'react';
import Link from 'next/link';
import catalogoData from '@/data/catalogo.json';

export default function AdminHeader({ titulo = "Panel de Administración" }) {
  const colores = catalogoData.colores;
  
  return (
    <header style={{ 
      backgroundColor: colores.primario,
      color: 'white',
      padding: '1rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/admin" className="text-white text-2xl font-bold">
            Solo Para Eva Admin
          </Link>
          <h1 className="ml-8 text-xl">{titulo}</h1>
        </div>
        
        <div>
          <Link 
            href="/" 
            className="text-white hover:underline flex items-center"
            target="_blank"
          >
            <span>Ver Catálogo</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}