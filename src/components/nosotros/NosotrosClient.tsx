'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CustomImage from '@/components/CustomImage';
import { Colores, InformacionNegocio } from '@/types';

// Variables para Firebase
let firebaseLoaded = false;
let firestore;
let doc;
let getDoc;

// Intentar cargar Firebase solo en el cliente
if (typeof window !== 'undefined') {
  // Cargamos dinámicamente Firebase para evitar errores en tiempo de compilación
  import('firebase/firestore').then(module => {
    doc = module.doc;
    getDoc = module.getDoc;
    firebaseLoaded = true;
  }).catch(error => {
    console.error('Error cargando Firebase:', error);
  });

  // Cargamos la configuración de Firebase
  import('@/lib/clientFirebase').then(module => {
    const { firestore: fs } = module.useFirebase();
    firestore = fs;
  }).catch(error => {
    console.error('Error cargando clientFirebase:', error);
  });
}

interface NosotrosClientProps {
  initialData: InformacionNegocio;
  colores: Colores;
}

export default function NosotrosClient({ initialData, colores }: NosotrosClientProps) {
  const [informacion, setInformacion] = useState<InformacionNegocio>(initialData);
  const [loading, setLoading] = useState(false);

  // Intentar obtener datos actualizados de Firebase cuando el componente se monte
  useEffect(() => {
    // Solo ejecutar en el navegador
    if (typeof window === 'undefined') return;

    // Configuramos un temporizador para dar tiempo a la carga de Firebase
    const timer = setTimeout(async () => {
      if (!firebaseLoaded || !firestore || !doc || !getDoc) {
        console.log('Firebase aún no está listo');
        return;
      }

      try {
        setLoading(true);
        console.log('Intentando obtener datos de Firebase...');
        
        const infoRef = doc(firestore, 'configuracion', 'informacionNegocio');
        const snapshot = await getDoc(infoRef);
        
        if (snapshot.exists()) {
          console.log('Datos obtenidos de Firebase');
          setInformacion(snapshot.data() as InformacionNegocio);
        } else {
          console.log('No se encontraron datos en Firebase');
        }
      } catch (error) {
        console.error('Error al obtener datos de Firebase:', error);
      } finally {
        setLoading(false);
      }
    }, 1000); // Esperamos 1 segundo para asegurarnos de que Firebase esté cargado

    return () => clearTimeout(timer);
  }, []);

  // Función para asegurar que valores anidados existan
  const getRedesSociales = () => {
    return informacion.contacto?.redesSociales || {
      facebook: 'https://www.facebook.com/share/18kSRN2JWi/',
      instagram: 'https://www.instagram.com/soloparaeva/'
    };
  };

  const redesSociales = getRedesSociales();

  return (
    <div className="bg-white" style={{ backgroundColor: colores.fondo }}>
      {/* Indicador de carga */}
      {loading && (
        <div className="fixed top-0 left-0 right-0 z-50 text-center py-2" 
             style={{ backgroundColor: colores.acento1, color: colores.textoClaro }}>
          <p className="text-sm font-medium">Actualizando información...</p>
        </div>
      )}
      
      {/* Encabezado con imagen - Versión mejorada */}
      <div className="relative bg-primary-800 h-96 sm:h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <CustomImage
            src="/images/banner-nosotros.jpeg"
            alt="Productos naturales para el cuidado personal"
            width={1920}
            height={1080}
            className="w-full h-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0" style={{ backgroundColor: colores.primario, mixBlendMode: 'multiply', opacity: 0.7 }} />
        </div>
        
        {/* Contenedor central con efecto de desvanecimiento */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className=" bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-xl p-8 sm:p-12 shadow-2xl transform transition-all hover:scale-105 duration-500">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl font-serif mb-8">
              Nuestra Historia
            </h1>
            
            <div className="w-24 h-1 bg-white mx-auto mb-8 opacity-80"></div>
            
            <div className="relative">
              <svg className="absolute top-0 left-0 w-10 h-10 text-white opacity-30 transform -translate-x-6 -translate-y-6" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              
              <p className="text-2xl sm:text-3xl font-serif italic font-light text-white tracking-wide leading-relaxed">
                {informacion.eslogan?.split(',')?.[0] || 'Porque Tú eres la fuente de vida,'}<br/>
                {informacion.eslogan?.split(',')?.[1] || 'la luz con la que vemos'}
              </p>
              
              <p className="mt-4 text-lg sm:text-xl text-white opacity-80 font-light">
                — Salmos 36:9
              </p>
              
              <svg className="absolute bottom-0 right-0 w-10 h-10 text-white opacity-30 transform translate-x-6 translate-y-6" fill="currentColor" viewBox="0 0 32 32">
                <path d="M22.648 28C27.544 24.544 31 18.88 31 12.64c0-5.088-3.072-8.064-6.624-8.064-3.36 0-5.856 2.688-5.856 5.856 0 3.168 2.208 5.472 5.088 5.472.576 0 1.344-.096 1.536-.192-.48 3.264-3.552 7.104-6.624 9.024L22.648 28zm-16.512 0c4.8-3.456 8.256-9.12 8.256-15.36 0-5.088-3.072-8.064-6.624-8.064-3.264 0-5.856 2.688-5.856 5.856 0 3.168 2.304 5.472 5.184 5.472.576 0 1.248-.096 1.44-.192-.48 3.264-3.456 7.104-6.528 9.024L6.136 28z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de nuestra historia */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl font-serif" style={{ color: colores.texto }}>
              {informacion.nombre}
            </h2>
            <p className="mt-4 text-lg" style={{ color: colores.texto }}>
              {informacion.descripcion}
            </p>
            <p className="mt-4 text-lg" style={{ color: colores.texto }}>
              Compartir con las mujeres salud espiritual, emocional creando experiencias personalizadas mediante productos de higiene y belleza así como servicios terapéuticos de acuerdo a sus necesidades.
            </p>
          </div>

          <div className="mt-8 lg:mt-0">
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <CustomImage
                src="/images/nosotros-1.jpeg"
                alt="Elaboración artesanal de jabones"
                width={1000}
                height={667}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Visión y Misión */}
      <div style={{ backgroundColor: colores.pastelLavanda }}>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 text-center">
            <div className="p-8 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
              <h2 className="text-3xl font-extrabold font-serif mb-6" style={{ color: colores.texto }}>Visión</h2>
              <p className="text-xl" style={{ color: colores.texto }}>
                <strong>{informacion.vision}</strong>
              </p>
            </div>
            
            <div className="p-8 rounded-lg mt-8 lg:mt-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
              <h2 className="text-3xl font-extrabold font-serif mb-6" style={{ color: colores.texto }}>Misión</h2>
              <p className="text-xl" style={{ color: colores.texto }}>
                <strong>{informacion.mision}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de valores */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold sm:text-4xl font-serif" style={{ color: colores.texto }}>
            Nuestros Valores
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Renderizar valores dinámicamente desde Firebase */}
          {informacion.valores && informacion.valores.map((valor, index) => (
            <div key={index} className="rounded-lg p-6" style={{ backgroundColor: colores.pastelLavanda }}>
              <h3 className="text-xl font-medium mb-2" style={{ color: colores.texto }}>{valor.valor}</h3>
              <p style={{ color: colores.texto }}>{valor.cita}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de compromiso */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="lg:order-2">
            <h2 className="text-3xl font-extrabold font-serif sm:text-4xl" style={{ color: colores.texto }}>
              Cosmética de Autor
            </h2>
            <p className="mt-4 text-lg" style={{ color: colores.texto }}>
              La Cosmética de Autor de Solo para Eva ofrece productos de cuidado personal exclusivos y personalizados, creados con ingredientes específicos para atender las necesidades únicas de cada cliente.
            </p>
            <p className="mt-4 text-lg" style={{ color: colores.texto }}>
              Comprometida con el medio ambiente y el bienestar animal, formulamos cada producto con esmero, utilizando ingredientes naturales y sostenibles.
            </p>
          </div>
          
          <div className="mt-8 lg:mt-0 lg:order-1">
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <CustomImage
                src="/images/nosotros-2.jpeg"
                alt="Ingredientes naturales para productos de belleza"
                width={1000}
                height={667}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sección de redes sociales */}
      <div style={{ backgroundColor: colores.primario }}>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">¿Quieres conocer más sobre nosotros?</span>
            <span className="block" style={{ color: colores.textoClaro }}>Síguenos en nuestras redes sociales</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 space-x-4">
            <a
              href={redesSociales.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md transition-colors"
              style={{ backgroundColor: colores.textoClaro, color: colores.primario }}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
              Facebook
            </a>
            <a
              href={redesSociales.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md transition-colors"
              style={{ backgroundColor: colores.acento1, color: colores.textoClaro }}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
              Instagram: @soloparaeva
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}