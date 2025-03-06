"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Link
              href="/carrito"
              className="p-1 rounded-full text-sky-500 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              <span className="sr-only">Ver carrito</span>
              <svg
                className="h-6 w-6"
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </Link>
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