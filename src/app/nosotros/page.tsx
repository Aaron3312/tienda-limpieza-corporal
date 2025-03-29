import React from 'react';
import Link from 'next/link';
import CustomImage from '@/components/CustomImage';
import { extractColorsFromPalette } from '@/utils/colorUtils';
import paletaColores from '@/data/paleta-colores.json';

// Since there's an issue with the Footer component, let's remove it for now
// We'll add it back once we confirm the component structure

export default function NosotrosPage() {
  // Extraer colores de la paleta - mismo enfoque que en Home
  const colores = extractColorsFromPalette(paletaColores);

  return (
    <div className="bg-white" style={{ backgroundColor: colores.fondo }}>
      {/* Encabezado con imagen */}
      <div className="relative bg-primary-800 h-80 sm:h-96">
        <div className="absolute inset-0">
          <CustomImage
            src="/images/banner-nosotros.jpeg"
            alt="Productos naturales para el cuidado personal"
            width={1920}
            height={1080}
            className="w-full h-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0" style={{ backgroundColor: colores.primario, mixBlendMode: 'multiply', opacity: 0.6 }} />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-serif">
            Nuestra Historia
          </h1>
          <p className="mt-6 text-xl max-w-3xl" style={{ color: colores.textoClaro }}>
            *Porque Tú eres la fuente de vida, la luz con la que vemos*
            <span className="block italic">(Salmos 36:9)</span>
          </p>
        </div>
      </div>

      {/* Sección de nuestra historia */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl font-serif" style={{ color: colores.texto }}>
              Solo Para Eva
            </h2>
            <p className="mt-4 text-lg" style={{ color: colores.texto }}>
              SoloparaEva es una pequeña empresa comprometida con colaborar desde el 2016 con el Bienestar y Salud de las mujeres mediante la oferta de servicios de spa y Cosmética de Autor.
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
                <strong>Ser una empresa comprometida con sus valores.</strong>
              </p>
            </div>
            
            <div className="p-8 rounded-lg mt-8 lg:mt-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
              <h2 className="text-3xl font-extrabold font-serif mb-6" style={{ color: colores.texto }}>Misión</h2>
              <p className="text-xl" style={{ color: colores.texto }}>
                <strong>Colaborar con el bienestar de la mujer.</strong>
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
          <div className="rounded-lg p-6" style={{ backgroundColor: colores.pastelLavanda }}>
            <h3 className="text-xl font-medium mb-2" style={{ color: colores.texto }}>Amor</h3>
            <p style={{ color: colores.texto }}>
              "Si no amo, no conozco a Dios; porque Dios es amor." (1ª Juan 4:8)
            </p>
          </div>
          
          <div className="rounded-lg p-6" style={{ backgroundColor: colores.pastelLavanda }}>
            <h3 className="text-xl font-medium mb-2" style={{ color: colores.texto }}>Respeto</h3>
            <p style={{ color: colores.texto }}>
              "Hacer a los demás todo lo que quiero que me hagan a mi" (Mateo 7:12)
            </p>
          </div>
          
          <div className="rounded-lg p-6" style={{ backgroundColor: colores.pastelLavanda }}>
            <h3 className="text-xl font-medium mb-2" style={{ color: colores.texto }}>Honestidad</h3>
            <p style={{ color: colores.texto }}>
              "Dejar de decir mentiras, digamos siempre la verdad a todos" (Efesios 4:25)
            </p>
          </div>
          
          <div className="rounded-lg p-6" style={{ backgroundColor: colores.pastelLavanda }}>
            <h3 className="text-xl font-medium mb-2" style={{ color: colores.texto }}>Verdad</h3>
            <p style={{ color: colores.texto }}>
              "La verdad me hará libre" (Juan 8:32)
            </p>
          </div>
          
          <div className="rounded-lg p-6" style={{ backgroundColor: colores.pastelLavanda }}>
            <h3 className="text-xl font-medium mb-2" style={{ color: colores.texto }}>Solidaridad</h3>
            <p style={{ color: colores.texto }}>
              "Siempre habrá pobres la tierra; por eso mi Dios me ordena que comparta generosamente con ellos y con quienes pasen necesidad" (Deuteronomio 15:11)
            </p>
          </div>
          
          <div className="rounded-lg p-6" style={{ backgroundColor: colores.pastelLavanda }}>
            <h3 className="text-xl font-medium mb-2" style={{ color: colores.texto }}>Libertad</h3>
            <p style={{ color: colores.texto }}>
              "Donde esta mi Dios, ahí hay libertad" (2 Corintios 3:17)
            </p>
          </div>
          
          <div className="rounded-lg p-6 md:col-span-2 lg:col-span-3" style={{ backgroundColor: colores.pastelLavanda }}>
            <h3 className="text-xl font-medium mb-2" style={{ color: colores.texto }}>Paz</h3>
            <p style={{ color: colores.texto }}>
              "Si hablo con Dios experimento su paz, esa paz que supera todo entendimiento y que cuida mi corazón" (Filipenses 4:6-7)
            </p>
          </div>
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
              href="https://www.facebook.com/share/18kSRN2JWi/"
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
              href="https://www.instagram.com/soloparaeva/"
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