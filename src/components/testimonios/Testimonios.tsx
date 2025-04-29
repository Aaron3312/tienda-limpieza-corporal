"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Testimonios = ({ colores }) => {
  // Estado para controlar el testimonio activo
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Array con todos los testimonios
  const testimonios = [
    {
      id: 1,
      texto: "Los recomiendo mil productos naturales frescos me encantan",
      nombre: "Ivonne Montes"
    },
    {
      id: 2,
      texto: "Me encantan sus productos. Su atención es excelente. Y eI taller es buenísimo 100% recomendado",
      nombre: "Estrella Gutierrez"
    },
    {
      id: 3,
      texto: "Me encantan los productos naturales y la atención es increíble.",
      nombre: "Sarai Rydstedt"
    },
    {
      id: 4,
      texto: "Me encantaron estos productos",
      nombre: "Brenda Victoria"
    },
    {
      id: 5,
      texto: "Quiero agradecer a solopareva por estos lindos y deliciosos regalos, jabones, creams y exfoliantes artesanales, mil gracias por el apoyo a emprendedores",
      nombre: "Virna Gamboa"
    }
  ];

  // Efecto para cambiar automáticamente los testimonios cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonios.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonios.length]);

  // Funciones para navegación manual
  const goToNextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonios.length);
  };

  const goToPrevTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonios.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index) => {
    setActiveIndex(index);
  };
  
  return (
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg max-w-2xl mx-auto mb-12"
            style={{ color: colores.texto }}
          >
            Testimonios de quienes han experimentado nuestros productos
          </motion.p>
        </div>
        
        {/* Contenedor del carrusel */}
        <div className="relative max-w-4xl mx-auto mb-12">
          {/* Testimonial actual */}
          <div 
            className="bg-white rounded-lg shadow-lg p-8 md:p-10"
            style={{ backgroundColor: colores.pastelLavanda }}
          >
            <div className="mb-6">
              <svg 
                className="w-10 h-10 mx-auto mb-4 text-gray-400"
                style={{ color: colores.primario }}
                fill="currentColor" 
                viewBox="0 0 32 32"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
              </svg>
              <motion.p
                key={`text-${activeIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-xl italic text-center"
                style={{ color: colores.texto, minHeight: "80px" }}
              >
                "{testimonios[activeIndex].texto}"
              </motion.p>
            </div>
            <motion.div
              key={`name-${activeIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <p 
                className="font-bold text-lg"
                style={{ color: colores.primario }}
              >
                {testimonios[activeIndex].nombre}
              </p>
            </motion.div>
          </div>
          
          {/* Botones de navegación */}
          <button 
            onClick={goToPrevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-6 lg:-translate-x-12 w-12 h-12 rounded-full flex items-center justify-center shadow-lg focus:outline-none"
            style={{ backgroundColor: colores.primario }}
            aria-label="Testimonio anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button 
            onClick={goToNextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-6 lg:translate-x-12 w-12 h-12 rounded-full flex items-center justify-center shadow-lg focus:outline-none"
            style={{ backgroundColor: colores.primario }}
            aria-label="Siguiente testimonio"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
        
        {/* Indicadores */}
        <div className="flex justify-center space-x-2 mb-8">
          {testimonios.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none`}
              style={{ 
                backgroundColor: index === activeIndex ? colores.primario : colores.secundario,
                opacity: index === activeIndex ? 1 : 0.5,
                transform: index === activeIndex ? 'scale(1.2)' : 'scale(1)'
              }}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonios;