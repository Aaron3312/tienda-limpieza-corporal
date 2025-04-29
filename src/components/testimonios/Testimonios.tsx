"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Testimonios = ({ colores }) => {
  // Estado para controlar el índice inicial visible
  const [startIndex, setStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Número de testimonios visibles a la vez
  const visibleItems = isMobile ? 1 : 3;
  
  // Array con los testimonios de clientes
  const testimonios = [
    {
      texto: "Los recomiendo mil productos naturales frescos me encantan",
      nombre: "Ivonne Montes",
      iniciales: "IM"
    },
    {
      texto: "Me encantan sus productos. Su atención es excelente. Y eI taller es buenísimo 100% recomendado",
      nombre: "Estrella Gutierrez",
      iniciales: "EG"
    },
    {
      texto: "Me encantan los productos naturales y la atención es increíble.",
      nombre: "Sarai Rydstedt",
      iniciales: "SR"
    },
    {
      texto: "Me encantaron estos productos",
      nombre: "Brenda Victoria",
      iniciales: "BV"
    },
    {
      texto: "Quiero agradecer a solopareva por estos lindos y deliciosos regalos, jabones, creams y exfoliantes artesanales, mil gracias por el apoyo a emprendedores",
      nombre: "Virna Gamboa",
      iniciales: "VG"
    }
  ];
  
  // Total de páginas disponibles
  const totalPages = testimonios.length - visibleItems + 1;
  
  // Verificar tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Navegar al siguiente grupo
  const nextGroup = () => {
    setStartIndex(prev => {
      const newIndex = prev + 1;
      return newIndex >= testimonios.length - (visibleItems - 1) ? 0 : newIndex;
    });
  };
  
  // Navegar al grupo anterior
  const prevGroup = () => {
    setStartIndex(prev => {
      const newIndex = prev - 1;
      return newIndex < 0 ? testimonios.length - visibleItems : newIndex;
    });
  };
  
  // Ir a un índice específico
  const goToIndex = (index) => {
    setStartIndex(index);
  };
  
  // Obtener los testimonios visibles actualmente
  const getCurrentTestimonios = () => {
    const result = [];
    for (let i = 0; i < visibleItems; i++) {
      const index = (startIndex + i) % testimonios.length;
      result.push({...testimonios[index], originalIndex: index});
    }
    return result;
  };
  
  const currentTestimonios = getCurrentTestimonios();
  
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
        
        {/* Controles de navegación */}
        <div className="relative mt-12">
          <button
            onClick={prevGroup}
            className="absolute top-1/2 -left-4 md:-left-8 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md focus:outline-none hover:bg-gray-50"
            aria-label="Testimonios anteriores"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colores.primario }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Grid de testimonios */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
            {currentTestimonios.map((testimonio, idx) => (
              <motion.div 
                key={`${startIndex}-${idx}`}
                className="bg-white rounded-lg shadow-sm p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-600 italic">
                  "{testimonio.texto}"
                </p>
                <div className="mt-4 flex items-center">
                  <div className="flex-shrink-0">
                    <div 
                      className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold" 
                      style={{ 
                        backgroundColor: testimonio.originalIndex % 3 === 0 
                          ? colores.acento1 
                          : testimonio.originalIndex % 3 === 1 
                            ? colores.acento2 
                            : colores.primario 
                      }}
                    >
                      {testimonio.iniciales}
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium" style={{ color: colores.texto }}>
                      {testimonio.nombre}
                    </p>
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
            ))}
          </div>
          
          <button
            onClick={nextGroup}
            className="absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md focus:outline-none hover:bg-gray-50"
            aria-label="Testimonios siguientes"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colores.primario }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Indicadores */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                startIndex === idx ? 'scale-125' : 'opacity-50'
              }`}
              style={{ backgroundColor: colores.primario }}
              aria-label={`Página ${idx + 1} de testimonios`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonios;