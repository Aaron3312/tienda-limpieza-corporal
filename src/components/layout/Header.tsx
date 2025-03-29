"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Este useEffect garantiza que el componente solo se renderice completamente
  // en el cliente, evitando diferencias entre el renderizado del servidor y el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Si no está montado, renderiza un placeholder con la misma altura
  if (!isMounted) {
    return (
      <header className="bg-sky-50 shadow-md h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-sky-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="font-bold text-xl text-sky-600">
                SoloParaEva
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/productos"
                className="border-transparent text-sky-700 hover:border-sky-300 hover:text-sky-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Productos
              </Link>
              <Link
                href="/nosotros"
                className="border-transparent text-sky-700 hover:border-sky-300 hover:text-sky-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Nosotros
              </Link>
              <Link
                href="/contacto"
                className="border-transparent text-sky-700 hover:border-sky-300 hover:text-sky-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Contacto
              </Link>
            </nav>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-sky-400 hover:text-sky-600 hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
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
            className="border-transparent text-sky-600 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Productos
          </Link>
          <Link
            href="/nosotros"
            className="border-transparent text-sky-600 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Nosotros
          </Link>
          <Link
            href="/contacto"
            className="border-transparent text-sky-600 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Contacto
          </Link>
          <Link
            href="/carrito"
            className="border-transparent text-sky-600 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Carrito
          </Link>
        </div>
      </div>
    </header>
  );
}