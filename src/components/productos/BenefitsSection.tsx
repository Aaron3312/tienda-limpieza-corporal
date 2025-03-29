"use client"
import React from 'react';
import { motion } from 'framer-motion';

export default function BenefitsSection({ colores }) {
  return (
    <div style={{ backgroundColor: colores.pastelVerde }}>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold font-serif"
              style={{ color: colores.acento1 }}
            >
              Por qué elegir Solo Para Eva
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-4 text-lg"
              style={{ color: colores.texto }}
            >
              Descubre los beneficios de nuestros productos naturales elaborados con amor y respeto por tu piel y el medio ambiente.
            </motion.p>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <dl className="space-y-10">
              <motion.div 
                className="flex"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full text-white" style={{ backgroundColor: colores.primario }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium" style={{ color: colores.acento1 }}>
                    100% Naturales
                  </dt>
                  <dd className="mt-2 text-base" style={{ color: colores.texto }}>
                    Todos nuestros productos están elaborados con ingredientes naturales de la más alta calidad,
                    libres de químicos dañinos, sulfatos, parabenos y derivados del petróleo.
                  </dd>
                </div>
              </motion.div>

              <motion.div 
                className="flex"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full text-white" style={{ backgroundColor: colores.acento2 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium" style={{ color: colores.acento1 }}>
                    Elaboración Artesanal
                  </dt>
                  <dd className="mt-2 text-base" style={{ color: colores.texto }}>
                    Cada producto es elaborado a mano en pequeños lotes, asegurando la máxima calidad y atención
                    al detalle en cada paso del proceso de fabricación.
                  </dd>
                </div>
              </motion.div>

              <motion.div 
                className="flex"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full text-white" style={{ backgroundColor: colores.acento1 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <dt className="text-lg leading-6 font-medium" style={{ color: colores.acento1 }}>
                    Compromiso Ecológico
                  </dt>
                  <dd className="mt-2 text-base" style={{ color: colores.texto }}>
                    Nuestros empaques son biodegradables o reutilizables, y todos nuestros procesos están
                    diseñados pensando en minimizar el impacto ambiental.
                  </dd>
                </div>
              </motion.div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}