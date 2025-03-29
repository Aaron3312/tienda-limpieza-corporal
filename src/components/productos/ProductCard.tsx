"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product, index, isVisible, colores }) {
  // Manejo de imágenes con fallback por si la ruta no existe
  const handleImageError = (e) => {
    e.target.src = '/images/placeholder-product.png'; // Imagen de respaldo
    e.target.onerror = null; // Prevenir bucle infinito
  };

  // Verificación para evitar errores si falta alguna propiedad
  if (!product || !product.variantes || product.variantes.length === 0) {
    return null;
  }

  return (
    <motion.div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative w-full h-72 overflow-hidden">
        {product.destacado && (
          <div className="absolute top-4 right-4 z-10 py-1 px-4 rounded-full text-xs font-bold uppercase" 
               style={{ backgroundColor: colores.acento2, color: colores.textoClaro }}>
            Destacado
          </div>
        )}
        
        {/* Imagen del producto con manejo de errores */}
        <div className="w-full h-full relative">
          <img
            src={product.imagen}
            alt={product.nombre}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
            onError={handleImageError}
          />
        </div>
        
        {/* Superposición con botón */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
             style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <Link href={`/productos/${product.id}`} legacyBehavior>
            <a className="transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white border border-transparent rounded-full py-3 px-6 flex items-center justify-center text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md" 
               style={{ color: colores.texto }}>
              Ver detalles
            </a>
          </Link>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-serif font-medium mb-2" style={{ color: colores.texto }}>
            <Link href={`/productos/${product.id}`} legacyBehavior>
              <a className="hover:underline transition-colors duration-300" 
                 style={{ color: colores.acento1 }}>
                {product.nombre}
              </a>
            </Link>
          </h3>
          <p className="text-sm line-clamp-2" style={{ color: colores.texto }}>
            {product.descripcion}
          </p>
        </div>
        
        {/* Mostrar variantes si hay más de una */}
        {product.variantes.length > 1 && (
          <div className="mb-4">
            <p className="text-xs uppercase mb-1 font-semibold" style={{ color: colores.primario }}>
              Presentaciones
            </p>
            <div className="flex flex-wrap gap-1">
              {product.variantes.map((variante, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded-full" 
                      style={{ backgroundColor: colores.pastelVerde, color: colores.texto }}>
                  {variante.tamano}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Mostrar variedades si existen */}
        {product.variedades && product.variedades.length > 0 && (
          <div className="mb-4">
            <p className="text-xs uppercase mb-1 font-semibold" style={{ color: colores.primario }}>
              Variedades
            </p>
            <div className="flex flex-wrap gap-1">
              {product.variedades.slice(0, 3).map((variedad, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded-full" 
                      style={{ backgroundColor: colores.pastelVerde, color: colores.texto }}>
                  {variedad}
                </span>
              ))}
              {product.variedades.length > 3 && (
                <span className="text-xs px-2 py-1 rounded-full" 
                      style={{ backgroundColor: colores.pastelLavanda, color: colores.texto }}>
                  +{product.variedades.length - 3} más
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold" style={{ color: colores.acento1 }}>
              ${product.variantes[0].precio.toFixed(2)}
            </p>
            {product.variantes.length > 1 && (
              <p className="text-xs" style={{ color: colores.texto }}>
                Desde ${Math.min(...product.variantes.map(v => v.precio)).toFixed(2)}
              </p>
            )}
          </div>
          

        </div>
      </div>
    </motion.div>
  );
}