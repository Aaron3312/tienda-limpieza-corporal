'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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

interface ContactoClientProps {
  initialData: InformacionNegocio;
  colores: Colores;
}

export default function ContactoClient({ initialData, colores }: ContactoClientProps) {
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
  const getContactoInfo = () => {
    return informacion.contacto || {
      telefono: '+52 55 1802 6391',
      email: 'altardelcielogp@gmail.com',
      redesSociales: {
        facebook: 'https://www.facebook.com/share/18kSRN2JWi/',
        instagram: 'https://www.instagram.com/soloparaeva/'
      },
      horarios: {
        lunesViernes: '9:00 AM - 5:00 PM',
        sabados: '9:00 AM - 5:00 PM',
        domingos: 'Cerrado'
      }
    };
  };

  const contacto = getContactoInfo();

  return (
    <div className="bg-white" style={{ backgroundColor: colores.fondo }}>
      {/* Indicador de carga */}
      {loading && (
        <div className="fixed top-0 left-0 right-0 z-50 text-center py-2" 
             style={{ backgroundColor: colores.acento1, color: colores.textoClaro }}>
          <p className="text-sm font-medium">Actualizando información...</p>
        </div>
      )}
      
      {/* Header Banner */}
      <div className="relative bg-primary-800 h-64 sm:h-96">
        <div className="absolute inset-0">
          <Image
            src="/images/contacto-banner.jpeg"
            alt="Contáctanos"
            fill
            className="w-full h-full object-cover object-center opacity-80"
            priority
          />
          <div className="absolute inset-0" style={{ backgroundColor: colores.primario, mixBlendMode: 'multiply', opacity: 0.6 }} />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-serif">Contáctanos</h1>
          <p className="mt-6 text-xl max-w-3xl" style={{ color: colores.textoClaro }}>
            Estamos aquí para atender tus necesidades y responder a todas tus consultas.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Contact Information Card */}
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <div className="p-8" style={{ backgroundColor: colores.primario }}>
              <h2 className="text-2xl font-bold text-white font-serif mb-6">Información de Contacto</h2>
              
              <div className="space-y-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white opacity-80">Teléfono</p>
                    <p className="mt-1 text-lg text-white">{contacto.telefono}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white opacity-80">Correo Electrónico</p>
                    <p className="mt-1 text-lg text-white">{contacto.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white opacity-80">Redes Sociales</p>
                    <div className="mt-1">
                      <a 
                        href={contacto.redesSociales?.instagram || "https://www.instagram.com/soloparaeva/"} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-white hover:underline"
                      >
                        Instagram: @soloparaeva
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social media icons */}
              <div className="mt-10 flex space-x-6">
                <a 
                  href={contacto.redesSociales?.facebook || "https://www.facebook.com/share/18kSRN2JWi/"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-opacity-80"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a 
                  href={contacto.redesSociales?.instagram || "https://www.instagram.com/soloparaeva/"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-opacity-80"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Business hours */}
            <div className="p-8 bg-white">
              <h3 className="text-xl font-semibold mb-4" style={{ color: colores.texto }}>Horario de atención</h3>
              <dl className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b" style={{ borderColor: colores.pastelLavanda }}>
                  <dt className="text-sm font-medium" style={{ color: colores.texto }}>Lunes a Sabado</dt>
                  <dd className="text-sm font-semibold" style={{ color: colores.texto }}>
                    {contacto.horarios?.lunesViernes || '9:00 AM - 5:00 PM'}
                  </dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-sm font-medium" style={{ color: colores.texto }}>Domingos</dt>
                  <dd className="text-sm font-semibold" style={{ color: colores.texto }}>
                    {contacto.horarios?.domingos || 'Cerrado'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          
          {/* Company message and image */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold font-serif mb-6" style={{ color: colores.texto }}>Estamos para ayudarte</h2>
              <p className="text-lg mb-4" style={{ color: colores.texto }}>
                En {informacion.nombre} estamos comprometidos con ofrecer la mejor experiencia para nuestros clientes. 
              </p>
              <p className="text-lg mb-4" style={{ color: colores.texto }}>
                Si tienes alguna pregunta sobre nuestros productos artesanales, pedidos especiales o cualquier otra consulta, 
                no dudes en contactarnos por cualquiera de nuestros canales de comunicación.
              </p>
              <p className="text-lg" style={{ color: colores.texto }}>
                Estaremos encantados de atenderte y brindarte una experiencia personalizada de acuerdo a tus necesidades.
              </p>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/contacto-2.jpeg"
                alt="Productos naturales Solo Para Eva"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="p-6 rounded-lg" style={{ backgroundColor: colores.pastelLavanda }}>
              <p className="text-lg italic" style={{ color: colores.texto }}>
                "La Cosmética de Autor de Solo para Eva ofrece productos de cuidado personal exclusivos y personalizados, 
                creados con ingredientes específicos para atender las necesidades únicas de cada cliente."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}