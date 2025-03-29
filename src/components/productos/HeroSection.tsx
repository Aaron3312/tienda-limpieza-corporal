// src/components/productos/HeroSection.jsx
"use client"
import React from 'react';
import { motion } from 'framer-motion';
import CustomImage from '@/components/CustomImage';

export default function HeroSection({ colores }) {
  return (
    <div className="relative" style={{ backgroundColor: colores.acento1 }}>
      <div className="absolute inset-0">
        <CustomImage
          src="/images/lavandaFondo.jpeg"
          alt="Productos naturales Solo Para Eva"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0" style={{ backgroundColor: colores.acento1, mixBlendMode: 'multiply' }} />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl font-serif"
        >
          Nuestros Productos
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-xl max-w-3xl mx-auto font-light"
          style={{ color: colores.textoClaro }}
        >
          Descubre nuestra colección de productos artesanales elaborados con ingredientes naturales
          para el cuidado completo de tu piel.
        </motion.p>
      </div>
    </div>
  );
}