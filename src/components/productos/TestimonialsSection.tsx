// src/components/productos/TestimonialsSection.jsx
"use client"
import React from 'react';
import { motion } from 'framer-motion';

export default function TestimonialsSection({ colores }) {
  return (
    <div style={{ backgroundColor: colores.fondo }}>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold sm:text-4xl font-serif"
            style={{ color: colores.acento1 }}
          >
            Lo que nuestros clientes dicen
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-3 max-w-2xl mx-auto text-xl sm:mt-4"
            style={{ color: colores.texto }}
          >
            Descubre por qué nuestros productos marcan la diferencia en la rutina diaria de cuidado personal.
          </motion.p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 italic">
              "Los jabones de Solo Para Eva han transformado por completo mi piel. Después de años usando productos con químicos, mi piel se siente revitalizada y más saludable que nunca."
            </p>
            <div className="mt-4 flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: colores.acento1 }}>
                  MC
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium" style={{ color: colores.texto }}>María Castillo</p>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 italic">
              "El jabón de lavanda es simplemente maravilloso. Lo uso antes de dormir y me ayuda a relajarme. Además, el aroma es natural y no abrumador como otros productos artificiales."
            </p>
            <div className="mt-4 flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: colores.acento2 }}>
                  JL
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium" style={{ color: colores.texto }}>Javier López</p>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 italic">
              "Como persona con piel sensible, siempre he tenido problemas con jabones comerciales. El jabón de caléndula de Solo Para Eva es el único que no me produce irritación y deja mi piel hidratada."
            </p>
            <div className="mt-4 flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: colores.primario }}>
                  SR
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium" style={{ color: colores.texto }}>Sofia Ramírez</p>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}