// src/components/productos/ProductDescription.jsx
"use client"
import React from 'react';
import { motion } from 'framer-motion';

export default function ProductDescription({ colores }) {
  return (
    <div className="text-center mb-16">
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold sm:text-4xl font-serif"
        style={{ color: colores.acento1 }}
      >
        Cuidado natural para tu cuerpo
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4 text-lg max-w-3xl mx-auto"
        style={{ color: colores.texto }}
      >
        En Solo Para Eva, elaboramos cada producto con ingredientes naturales cuidadosamente 
        seleccionados. Nuestro proceso artesanal garantiza productos libres de químicos dañinos, 
        respetuosos con tu piel y con el medio ambiente.
      </motion.p>
    </div>
  );
}