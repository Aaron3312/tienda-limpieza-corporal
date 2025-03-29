"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CustomImage from '@/components/CustomImage';
import ProductCard from '@/components/productos/ProductCard';
import { extractColorsFromPalette } from '@/utils/colorUtils';
import paletaColores from '@/data/paleta-colores.json';
import catalogoData from '@/data/productos.json';
import Footers from '@/components/layout/Footer';

export default function Home() {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Extraer colores de la paleta
  const colores = extractColorsFromPalette(paletaColores);

  useEffect(() => {
    // Indicar que estamos cargando
    setIsLoading(true);
    
    // Pequeño retraso para asegurar que el DOM esté listo
    setTimeout(() => {
      try {
        // Obtener productos destacados del catálogo
        const allProducts = catalogoData.productos || [];
        
        // Filtrar productos destacados
        const destacados = allProducts.filter(product => product.destacado);
        
        // Si no hay suficientes destacados, agregar algunos productos más
        let productsToShow = destacados.length >= 4 
          ? destacados.slice(0, 4) 
          : [...destacados, ...allProducts.filter(p => !p.destacado).slice(0, 4 - destacados.length)];
        
        // Establecer los productos a mostrar
        setDisplayedProducts(productsToShow);
        
        // Activar la animación de aparición
        setIsVisible(true);
        
      } catch (error) {
        console.error("Error al procesar productos:", error);
        setDisplayedProducts([]);
      } finally {
        setIsLoading(false);
      }
    }, 100);
  }, []);

  return (
    <div className="bg-white" style={{ backgroundColor: colores.fondo }}>
      {/* Hero Section */}
      <div className="relative bg-primary-800 h-96 sm:h-screen">
        <div className="absolute inset-0">
          <CustomImage
            src="/images/lavandaFondo.jpeg"
            alt="Jabones artesanales Solo Para Eva"
            width={1920}
            height={1080}
            className="w-full h-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0" style={{ backgroundColor: colores.primario, mixBlendMode: 'multiply', opacity: 0.6 }} />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-serif"
          >
            Solo Para Eva
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-xl max-w-3xl"
            style={{ color: colores.textoClaro }}
          >
            Productos naturales para el cuidado de tu piel, elaborados artesanalmente con los mejores ingredientes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10"
          >
            <Link
              href="/productos"
              className="inline-block py-3 px-8 rounded-md font-medium transition duration-300"
              style={{ backgroundColor: colores.acento1, color: colores.textoClaro }}
            >
              Ver nuestros productos
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Beneficios */}
      <div className="py-16" style={{ backgroundColor: colores.fondo }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-extrabold sm:text-4xl font-serif"
              style={{ color: colores.texto }}
            >
              ¿Por qué elegir nuestros productos?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-lg max-w-2xl mx-auto"
              style={{ color: colores.texto }}
            >
              En Solo Para Eva nos comprometemos con tu bienestar y el del planeta.
            </motion.p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-lg p-8 text-center"
              style={{ backgroundColor: colores.pastelLavanda }}
            >
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-md text-white" style={{ backgroundColor: colores.primario }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium" style={{ color: colores.texto }}>100% Artesanal</h3>
              <p className="mt-2 text-base" style={{ color: colores.texto }}>
                Elaboramos todos nuestros productos a mano en pequeños lotes para garantizar la máxima calidad.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-lg p-8 text-center"
              style={{ backgroundColor: colores.pastelLavanda }}
            >
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-md text-white" style={{ backgroundColor: colores.primario }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium" style={{ color: colores.texto }}>Ingredientes Naturales</h3>
              <p className="mt-2 text-base" style={{ color: colores.texto }}>
                Utilizamos solo ingredientes de origen natural, evitando químicos dañinos y conservantes artificiales.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-lg p-8 text-center"
              style={{ backgroundColor: colores.pastelLavanda }}
            >
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-md text-white" style={{ backgroundColor: colores.primario }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium" style={{ color: colores.texto }}>Eco-Friendly</h3>
              <p className="mt-2 text-base" style={{ color: colores.texto }}>
                Comprometidos con el medio ambiente, usamos empaques reciclables o biodegradables.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Productos destacados */}
      <div className="py-16" style={{ backgroundColor: colores.fondo }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-extrabold sm:text-4xl font-serif"
              style={{ color: colores.texto }}
            >
              Productos Destacados
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-lg max-w-2xl mx-auto"
              style={{ color: colores.texto }}
            >
              Descubre nuestras creaciones más populares, elaboradas con ingredientes naturales de la más alta calidad.
            </motion.p>
          </div>

          {/* Estado de carga */}
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" 
                   style={{ color: colores.acento1 }}></div>
              <p className="mt-2 text-sm" style={{ color: colores.texto }}>Cargando productos...</p>
            </div>
          ) : (
            <>
              {/* Cuadrícula de productos */}
              <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {displayedProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id}
                    product={product} 
                    index={index} 
                    isVisible={isVisible} 
                    colores={colores} 
                  />
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link
                  href="/productos"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md transition-colors"
                  style={{ backgroundColor: colores.acento1, color: colores.textoClaro }}
                >
                  Ver todos los productos
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Testimonios */}
      <div className="py-16" style={{ backgroundColor: colores.fondo }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-extrabold sm:text-4xl font-serif"
              style={{ color: colores.texto }}
            >
              Lo que dicen nuestros clientes
            </motion.h2>
          </div>
          <div className="mt-12 space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 rounded-lg"
              style={{ backgroundColor: colores.pastelLavanda }}
            >
              <p className="italic" style={{ color: colores.texto }}>
                "He probado muchos jabones naturales, pero los de Solo Para Eva son excepcionales. Mi piel se siente hidratada y el aroma es simplemente divino."
              </p>
              <div className="mt-4 flex items-center">
                <div className="flex-shrink-0">
                  <CustomImage 
                    className="h-10 w-10 rounded-full" 
                    src="/images/testimonial-1.jpg" 
                    alt="Cliente" 
                    width={40} 
                    height={40}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium" style={{ color: colores.texto }}>Mario Rodríguez</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 rounded-lg"
              style={{ backgroundColor: colores.pastelLavanda }}
            >
              <p className="italic" style={{ color: colores.texto }}>
                "Desde que empecé a usar la crema corporal de karité, mi piel ha mejorado notablemente. La textura es perfecta y la hidratación dura todo el día."
              </p>
              <div className="mt-4 flex items-center">
                <div className="flex-shrink-0">
                  <CustomImage 
                    className="h-10 w-10 rounded-full" 
                    src="/images/testimonial-2.jpg" 
                    alt="Cliente" 
                    width={40} 
                    height={40}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium" style={{ color: colores.texto }}>Laura Sánchez</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>



      {/* Redes sociales y Footer */}
          <Footers/>
    </div>
  );
}