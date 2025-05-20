'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CustomImage from '@/components/CustomImage';
import { Colores, InformacionNegocio } from '@/types';
import { Instagram, Facebook } from 'lucide-react';

// Importaciones condicionales de Firebase (solo se usarán en el cliente)
let useFirebase;
let firestore;

// Esta es una solución para evitar el error "Can't resolve '@/lib/clientFirebase'" durante la generación estática
if (typeof window !== 'undefined') {
  // Importación dinámica solo en el cliente
  try {
    // Intentamos importar Firebase solo en el cliente
    import('@/lib/clientFirebase').then(module => {
      useFirebase = module.useFirebase;
    });
    import('firebase/firestore').then(module => {
      firestore = module;
    });
  } catch (error) {
    console.error('Error al importar Firebase:', error);
  }
}

interface ClientNosotrosPageProps {
  initialData: InformacionNegocio;
  colores: Colores;
}

export default function ClientNosotrosPage({ initialData, colores }: ClientNosotrosPageProps) {
  const [informacion, setInformacion] = useState<InformacionNegocio>(initialData);
  const [loading, setLoading] = useState(false);
  const [firebaseLoaded, setFirebaseLoaded] = useState(false);
  
  // Intentar obtener datos actualizados de Firebase en el cliente
  useEffect(() => {
    // Solo ejecutar en el navegador
    if (typeof window === 'undefined') {
      return;
    }

    const fetchFirebaseData = async () => {
      // Si no tenemos las funciones de Firebase, no intentamos la actualización
      if (!useFirebase || !firestore) {
        return;
      }
      
      try {
        setLoading(true);
        const { firestore: fs } = useFirebase();
        if (!fs) return;
        
        const infoRef = firestore.doc(fs, 'configuracion', 'informacionNegocio');
        const snapshot = await firestore.getDoc(infoRef);
        
        if (snapshot.exists()) {
          setInformacion(snapshot.data() as InformacionNegocio);
        }
      } catch (error) {
        console.error('Error al obtener información del negocio:', error);
        // Si hay un error, mantenemos los datos iniciales
      } finally {
        setLoading(false);
      }
    };
    
    // Esperamos un poco para asegurar que la importación dinámica se complete
    const timer = setTimeout(() => {
      fetchFirebaseData();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-white min-h-screen" style={{ backgroundColor: colores.fondo }}>
      {/* Indicador de carga */}
      {loading && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-primary-100 text-center py-2" style={{ backgroundColor: colores.primario, color: colores.textoClaro }}>
          <p className="text-sm">Actualizando información...</p>
        </div>
      )}
      
      {/* Encabezado con imagen - Versión mejorada */}
      <div className="relative bg-primary-800 h-64 sm:h-96 lg:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <CustomImage
            src="/images/nosotros-hero.jpg"
            alt="Solo Para Eva - Nosotros"
            width={1920}
            height={1080}
            className="w-full h-full object-cover object-center"
          />
          <div 
            className="absolute inset-0" 
            style={{ backgroundColor: colores.primario, mixBlendMode: 'multiply', opacity: 0.6 }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          {/* Contenedor central con efecto de desvanecimiento */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.8 }}
            className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-3xl mx-auto"
          >
            <h1 
              className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl font-serif mb-4"
              style={{ color: colores.textoOscuro }}
            >
              Nuestra Historia
            </h1>
            
            <div className="text-center mb-6">
              <span 
                className="h-1 w-24 rounded-full mx-auto block"
                style={{ backgroundColor: colores.acento1 }}
              ></span>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: colores.primario, opacity: 0.2 }}
              >
                <span 
                  className="text-3xl font-serif"
                  style={{ color: colores.textoOscuro }}
                >"</span>
              </div>
              
              <blockquote
                className="italic text-xl mb-4"
                style={{ color: colores.textoOscuro }}
              >
                {informacion.eslogan.split(',')?.[0] || 'Porque Tú eres la fuente de vida,'}
                <br />
                {informacion.eslogan.split(',')?.[1] || 'la luz con la que vemos'}
              </blockquote>
              
              <cite
                className="not-italic font-medium"
                style={{ color: colores.textoOscuro }}
              >
                — Salmos 36:9
              </cite>
              
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mt-4 rotate-180"
                style={{ backgroundColor: colores.primario, opacity: 0.2 }}
              >
                <span 
                  className="text-3xl font-serif"
                  style={{ color: colores.textoOscuro }}
                >"</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sección de nuestra historia */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.8 }}
        className="py-16"
        style={{ backgroundColor: colores.fondo }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="bg-white rounded-lg shadow-lg p-8 sm:p-12"
            style={{ backgroundColor: colores.fondo }}
          >
            <h2 
              className="text-3xl font-bold mb-6 text-center font-serif"
              style={{ color: colores.textoOscuro }}
            >
              {informacion.nombre}
            </h2>
            
            <p 
              className="text-lg mb-6 text-center max-w-3xl mx-auto"
              style={{ color: colores.textoOscuro }}
            >
              {informacion.descripcion}
            </p>
            
            <p 
              className="text-lg text-center max-w-3xl mx-auto"
              style={{ color: colores.textoOscuro }}
            >
              Compartir con las mujeres salud espiritual, emocional creando experiencias personalizadas mediante productos de higiene y belleza así como servicios terapéuticos de acuerdo a sus necesidades.
            </p>
          </div>

          <div className="mt-16">
            <CustomImage
              src="/images/productos-display.jpg"
              alt="Nuestros productos"
              width={1200}
              height={600}
              className="w-full h-80 sm:h-96 object-cover object-center rounded-lg shadow-lg"
            />
          </div>
        </div>
      </motion.section>

      {/* Sección de Visión y Misión */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.8 }}
        className="py-16"
        style={{ backgroundColor: colores.pastelLavanda || '#f0f0ff' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              className="bg-white rounded-lg shadow-lg p-8 text-center"
              style={{ backgroundColor: colores.fondo }}
            >
              <h3 
                className="text-2xl font-bold mb-6 inline-flex flex-col items-center"
                style={{ color: colores.textoOscuro }}
              >
                <span
                  className="w-16 h-1 mb-4 rounded-full"
                  style={{ backgroundColor: colores.acento1 }}
                ></span>
                Visión
              </h3>
              
              <p 
                className="text-lg"
                style={{ color: colores.textoOscuro }}
              >
                {informacion.vision}
              </p>
            </div>
            
            <div 
              className="bg-white rounded-lg shadow-lg p-8 text-center"
              style={{ backgroundColor: colores.fondo }}
            >
              <h3 
                className="text-2xl font-bold mb-6 inline-flex flex-col items-center"
                style={{ color: colores.textoOscuro }}
              >
                <span
                  className="w-16 h-1 mb-4 rounded-full"
                  style={{ backgroundColor: colores.acento1 }}
                ></span>
                Misión
              </h3>
              
              <p 
                className="text-lg"
                style={{ color: colores.textoOscuro }}
              >
                {informacion.mision}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Sección de valores */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.8 }}
        className="py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-3xl font-bold mb-12 text-center font-serif"
            style={{ color: colores.textoOscuro }}
          >
            Nuestros Valores
          </h2>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {informacion.valores && informacion.valores.map((valor, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
                style={{ backgroundColor: colores.fondo }}
              >
                <h3 
                  className="text-xl font-bold mb-3 flex items-center"
                  style={{ color: colores.textoOscuro }}
                >
                  <span
                    className="w-2 h-2 mr-2 rounded-full"
                    style={{ backgroundColor: colores.acento1 }}
                  ></span>
                  {valor.valor}
                </h3>
                
                <p 
                  className="text-base italic"
                  style={{ color: colores.textoOscuro }}
                >
                  {valor.cita}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Sección de compromiso */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.8 }}
        className="py-16"
        style={{ backgroundColor: colores.pastelLavanda || '#f0f0ff' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="bg-white rounded-lg shadow-lg p-8 sm:p-12"
            style={{ backgroundColor: colores.fondo }}
          >
            <h2 
              className="text-3xl font-bold mb-6 text-center font-serif"
              style={{ color: colores.textoOscuro }}
            >
              Cosmética de Autor
            </h2>
            
            <p 
              className="text-lg mb-6 text-center max-w-3xl mx-auto"
              style={{ color: colores.textoOscuro }}
            >
              La Cosmética de Autor de Solo para Eva ofrece productos de cuidado personal exclusivos y personalizados, creados con ingredientes específicos para atender las necesidades únicas de cada cliente.
            </p>
            
            <p 
              className="text-lg text-center max-w-3xl mx-auto"
              style={{ color: colores.textoOscuro }}
            >
              Comprometida con el medio ambiente y el bienestar animal, formulamos cada producto con esmero, utilizando ingredientes naturales y sostenibles.
            </p>
          </div>
          
          <div className="mt-16">
            <CustomImage
              src="/images/ingredientes-naturales.jpg"
              alt="Ingredientes naturales"
              width={1200}
              height={600}
              className="w-full h-80 sm:h-96 object-cover object-center rounded-lg shadow-lg"
            />
          </div>
        </div>
      </motion.section>

      {/* Sección de redes sociales */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.8 }}
        className="py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="text-2xl font-bold mb-8"
            style={{ color: colores.textoOscuro }}
          >
            ¿Quieres conocer más sobre nosotros?
            <br />
            Síguenos en nuestras redes sociales
          </h2>
          
          <div className="flex justify-center space-x-6">
            <Link 
              href={informacion.contacto?.redesSociales?.facebook || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-lg font-medium hover:opacity-75 transition-opacity"
              style={{ color: colores.acento1 }}
            >
              <Facebook className="mr-2 h-6 w-6" />
              Facebook
            </Link>
            
            <Link 
              href={informacion.contacto?.redesSociales?.instagram || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-lg font-medium hover:opacity-75 transition-opacity"
              style={{ color: colores.acento1 }}
            >
              <Instagram className="mr-2 h-6 w-6" />
              Instagram: @soloparaeva
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}