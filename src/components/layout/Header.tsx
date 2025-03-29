"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import configData from '@/data/productos.json';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Obtenemos los colores del JSON
  const { primario, secundario, textoOscuro, textoClaro } = configData.colores;
  const { nombre } = configData.informacionNegocio;
  
  // Este useEffect garantiza que el componente solo se renderice completamente
  // en el cliente, evitando diferencias entre el renderizado del servidor y el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Estilos personalizados basados en los colores del JSON
  const headerStyle = {
    backgroundColor: primario,
    color: textoOscuro
  };

  const linkStyle = {
    color: textoOscuro,
    borderColor: 'transparent'
  };

  const linkHoverStyle = {
    borderColor: secundario,
    color: textoOscuro
  };

  // Si no está montado, renderiza un placeholder con la misma altura
  if (!isMounted) {
    return (
      <header className="shadow-md h-16" style={headerStyle}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="shadow-md" style={headerStyle}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="font-bold text-xl" style={{ color: textoOscuro }}>
                {nombre}
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/productos"
                className="border-transparent hover:border-b-2 inline-flex items-center px-1 pt-1 text-sm font-medium"
                style={linkStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = linkHoverStyle.borderColor;
                  e.currentTarget.style.color = linkHoverStyle.color;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = linkStyle.borderColor;
                  e.currentTarget.style.color = linkStyle.color;
                }}
              >
                Productos
              </Link>
              <Link
                href="/nosotros"
                className="border-transparent hover:border-b-2 inline-flex items-center px-1 pt-1 text-sm font-medium"
                style={linkStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = linkHoverStyle.borderColor;
                  e.currentTarget.style.color = linkHoverStyle.color;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = linkStyle.borderColor;
                  e.currentTarget.style.color = linkStyle.color;
                }}
              >
                Nosotros
              </Link>
              <Link
                href="/contacto"
                className="border-transparent hover:border-b-2 inline-flex items-center px-1 pt-1 text-sm font-medium"
                style={linkStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = linkHoverStyle.borderColor;
                  e.currentTarget.style.color = linkHoverStyle.color;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = linkStyle.borderColor;
                  e.currentTarget.style.color = linkStyle.color;
                }}
              >
                Contacto
              </Link>
            </nav>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-inset"
              style={{ color: textoOscuro, backgroundColor: `${secundario}40` }}
            >
              <span className="sr-only">Abrir menú</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/productos"
            className="border-transparent hover:border-l-4 block pl-3 pr-4 py-2 text-base font-medium"
            style={{
              color: textoOscuro,
              backgroundColor: `${secundario}20`
            }}
          >
            Productos
          </Link>
          <Link
            href="/nosotros"
            className="border-transparent hover:border-l-4 block pl-3 pr-4 py-2 text-base font-medium"
            style={{
              color: textoOscuro,
              backgroundColor: `${secundario}20`
            }}
          >
            Nosotros
          </Link>
          <Link
            href="/contacto"
            className="border-transparent hover:border-l-4 block pl-3 pr-4 py-2 text-base font-medium"
            style={{
              color: textoOscuro,
              backgroundColor: `${secundario}20`
            }}
          >
            Contacto
          </Link>
        </div>
      </div>
    </header>
  );
}