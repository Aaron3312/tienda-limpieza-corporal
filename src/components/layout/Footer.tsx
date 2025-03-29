"use client";

import React from 'react';
import Link from 'next/link';
import catalogoData from '@/data/productos.json';

export default function Footers() {
  // Obtener datos del JSON
  const { primario, secundario, acento1, acento2, textoOscuro, textoClaro } = catalogoData.colores;
  const { nombre, eslogan, contacto, valores } = catalogoData.informacionNegocio;
  const categorias = catalogoData.categorias;
  
  // Estilos personalizados
  const footerStyle = {
    backgroundColor: primario,
    color: textoOscuro
  };
  
  const accentStyle = {
    color: secundario
  };
  
  const linkStyle = {
    color: textoOscuro,
    transition: 'color 0.2s ease-in-out'
  };
  
  return (
    <footer style={footerStyle} className="w-full">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div>
              <h2 className="text-2xl font-bold">{nombre}</h2>
              <p className="text-sm mt-2 italic">{eslogan}</p>
            </div>
            <p className="text-base">
              Productos artesanales elaborados con los mejores ingredientes naturales para el cuidado completo de tu piel.
            </p>
            <div className="flex space-x-6">
              {contacto && contacto.redesSociales && (
                <>
                  {contacto.redesSociales.facebook && (
                    <a href={contacto.redesSociales.facebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity duration-200">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  {contacto.redesSociales.instagram && (
                    <a href={contacto.redesSociales.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity duration-200">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Productos
                </h3>
                <ul className="mt-4 space-y-4">
                  {categorias.map((categoria) => (
                    <li key={categoria.id}>
                      <Link href={`/productos?categoria=${categoria.id}`} className="hover:underline" style={linkStyle}>
                        {categoria.nombre}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Enlaces
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/" className="hover:underline" style={linkStyle}>
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link href="/productos" className="hover:underline" style={linkStyle}>
                      Productos
                    </Link>
                  </li>
                  <li>
                    <Link href="/nosotros" className="hover:underline" style={linkStyle}>
                      Nosotros
                    </Link>
                  </li>
                  <li>
                    <Link href="/contacto" className="hover:underline" style={linkStyle}>
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                Contáctanos
              </h3>
              <ul className="mt-4 space-y-4">
                {contacto && (
                  <>
                    {contacto.telefono && (
                      <li className="flex">
                        <svg className="flex-shrink-0 h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{contacto.telefono}</span>
                      </li>
                    )}
                    {contacto.email && (
                      <li className="flex">
                        <svg className="flex-shrink-0 h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href={`mailto:${contacto.email}`} className="hover:underline" style={linkStyle}>
                          {contacto.email}
                        </a>
                      </li>
                    )}
                  </>
                )}
                
                <li>
                  <h4 className="text-sm font-medium mb-2">Horarios de Atención:</h4>
                  <div className="ml-9 text-sm">
                    {contacto && contacto.horarios && (
                      <div className="space-y-1">
                        <p>Lunes a Viernes: {contacto.horarios.lunesViernes}</p>
                        <p>Sábados: {contacto.horarios.sabados}</p>
                        <p>Domingos: {contacto.horarios.domingos}</p>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8" style={{ borderColor: `${textoOscuro}20` }}>
          <p className="text-base text-center">
            &copy; {new Date().getFullYear()} {nombre}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}