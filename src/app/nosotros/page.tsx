import Image from 'next/image';
import Link from 'next/link';

export default function NosotrosPage() {
  return (
    <div className="bg-white">
      {/* Encabezado con imagen */}
      <div className="relative bg-primary-800 h-80">
        <div className="absolute inset-0">
          <Image
            src="/images/banner-nosotros.jpeg"
            alt="Productos naturales para el cuidado personal"
            fill
            className="w-full h-full object-cover object-center opacity-70"
            unoptimized={true}
            priority
          />
          <div className="absolute inset-0 bg-indigo-700 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Nuestra Historia</h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
            Descubre lo que nos hace diferentes y cómo nuestros productos están transformando el cuidado personal.
          </p>
        </div>
      </div>

      {/* Sección de nuestra historia */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Solo Para Eva
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Nuestro emprendimiento nació de la pasión por crear productos naturales que cuiden y embellezcan de forma genuina.
              En Solo Para Eva, creemos que cada mujer merece productos elaborados con ingredientes naturales de la más alta calidad, 
              libres de químicos dañinos y respetuosos con el medio ambiente.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Todos nuestros productos son elaborados artesanalmente con gran cuidado y amor. Cada jabón, cada crema y cada aceite 
              que ofrecemos está pensado para realzar la belleza natural y proporcionar bienestar a quienes los usan.
            </p>
          </div>

          <div className="mt-8 lg:mt-0">
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <Image
                src="/images/nosotros-1.jpeg"
                alt="Elaboración artesanal de jabones"
                width={1000}
                height={667}
                className="w-full h-full object-center object-cover"
                unoptimized={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sección de valores */}
      <div className="bg-indigo-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Nuestros Valores</h2>
              <p className="mt-4 text-lg text-gray-500">
                En Solo Para Eva nos guiamos por principios que dan forma a cada uno de nuestros productos.
              </p>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <dl className="space-y-10">
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">Naturalidad</dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Utilizamos ingredientes naturales, orgánicos y sustentables. Evitamos completamente los químicos dañinos, sulfatos, parabenos y derivados del petróleo.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">Cuidado Artesanal</dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Cada producto es elaborado a mano en pequeños lotes, asegurando calidad y atención al detalle en cada paso del proceso.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">Respeto por el Medio Ambiente</dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Nuestros empaques son biodegradables o reutilizables, y nuestros procesos de producción están diseñados para minimizar el impacto ambiental.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de compromiso */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="lg:order-2">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Nuestro Compromiso
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              En Solo Para Eva, nos comprometemos a ofrecer productos que no solo cuiden tu piel, sino que también contribuyan a tu bienestar general.
              Cada jabón, cada crema, cada aceite esencial está pensado para brindarte una experiencia sensorial completa, conectándote con lo natural.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Además, nos preocupamos por el impacto que dejamos en el planeta. Por eso, todos nuestros procesos y empaques están diseñados pensando en la sostenibilidad.
            </p>
          </div>
          
          <div className="mt-8 lg:mt-0 lg:order-1">
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <Image
                src="/images/nosotros-2.jpeg"
                alt="Ingredientes naturales para productos de belleza"
                width={1000}
                height={667}
                className="w-full h-full object-center object-cover"
                unoptimized={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sección de redes sociales */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">¿Quieres conocer más sobre nosotros?</span>
            <span className="block text-indigo-200">Síguenos en nuestras redes sociales</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 space-x-4">
            <a
              href="https://www.facebook.com/share/18kSRN2JWi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
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
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
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