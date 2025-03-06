import Link from 'next/link';
import CustomImage from '@/components/CustomImage';

export default function Home() {
  // Productos destacados
  const productosDestacados = [
    {
      id: 1,
      nombre: 'Jabón de Lavanda y Romero',
      descripcion: 'Relaja tu piel y mente con nuestra combinación aromática de hierbas.',
      precio: '$7.99',
      imagen: '/images/jabon1.jpeg',
      categoria: 'jabones'
    },
    {
      id: 2,
      nombre: 'Jabón Exfoliante de Café',
      descripcion: 'Elimina células muertas y renueva tu piel con antioxidantes naturales.',
      precio: '$8.50',
      imagen: '/images/jabon2.jpeg',
      categoria: 'jabones'
    },
    {
      id: 3,
      nombre: 'Champú de Coco y Argán',
      descripcion: 'Hidratación profunda para cabello seco y maltratado.',
      precio: '$12.99',
      imagen: '/images/jabon3.jpeg',
      categoria: 'shampoo'
    },
    {
      id: 4,
      nombre: 'Crema Corporal de Karité',
      descripcion: 'Nutrición intensiva para piel extra seca.',
      precio: '$15.99',
      imagen: '/images/jabon5.jpg',
      categoria: 'cremas'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-indigo-800 h-96 sm:h-screen">
        <div className="absolute inset-0">
          <CustomImage
            src="/images/lavandaFondo.jpeg"
            alt="Jabones artesanales Solo Para Eva"
            width={1920}
            height={1080}
            className="w-full h-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-indigo-700 mix-blend-multiply opacity-60" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Solo Para Eva
          </h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
            Productos naturales para el cuidado de tu piel, elaborados artesanalmente con los mejores ingredientes.
          </p>
          <div className="mt-10">
            <Link
              href="/productos"
              className="inline-block bg-white py-3 px-8 rounded-md font-medium text-indigo-700 hover:bg-indigo-50 transition duration-300"
            >
              Ver nuestros productos
            </Link>
          </div>
        </div>
      </div>

      {/* Beneficios */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              ¿Por qué elegir nuestros productos?
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              En Solo Para Eva nos comprometemos con tu bienestar y el del planeta.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-indigo-50 rounded-lg p-8 text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-md bg-indigo-600 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">100% Artesanal</h3>
              <p className="mt-2 text-base text-gray-500">
                Elaboramos todos nuestros productos a mano en pequeños lotes para garantizar la máxima calidad.
              </p>
            </div>

            <div className="bg-indigo-50 rounded-lg p-8 text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-md bg-indigo-600 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Ingredientes Naturales</h3>
              <p className="mt-2 text-base text-gray-500">
                Utilizamos solo ingredientes de origen natural, evitando químicos dañinos y conservantes artificiales.
              </p>
            </div>

            <div className="bg-indigo-50 rounded-lg p-8 text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-md bg-indigo-600 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Eco-Friendly</h3>
              <p className="mt-2 text-base text-gray-500">
                Comprometidos con el medio ambiente, usamos empaques reciclables o biodegradables.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Productos destacados */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Productos Destacados
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Descubre nuestras creaciones más populares, elaboradas con ingredientes naturales de la más alta calidad.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
            {productosDestacados.map((producto) => (
              <div key={producto.id} className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="w-full h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-t-lg overflow-hidden group-hover:opacity-90 transition-opacity duration-300">
                  <CustomImage
                    src={producto.imagen}
                    alt={producto.nombre}
                    width={500}
                    height={500}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-medium text-gray-900">
                    <Link href={`/productos/${producto.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {producto.nombre}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{producto.descripcion}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <p className="text-lg font-medium text-indigo-600">{producto.precio}</p>
                    <div className="text-sm font-medium text-indigo-500">
                      <Link href={`/productos/categorias/${producto.categoria}`}>
                        Ver más
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/productos"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Ver todos los productos
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonios */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Lo que dicen nuestros clientes
            </h2>
          </div>
          <div className="mt-12 space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <p className="text-gray-600 italic">
                "He probado muchos jabones naturales, pero los de Solo Para Eva son excepcionales. Mi piel se siente hidratada y el aroma es simplemente divino."
              </p>
              <div className="mt-4 flex items-center">
                <div className="flex-shrink-0">
                  <CustomImage 
                    className="h-10 w-10 rounded-full" 
                    src="/images/testimonial-1.jpg" 
                    alt="Cliente" 
                    width={40} 
                    height={40}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">María Rodríguez</p>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <p className="text-gray-600 italic">
                "Desde que empecé a usar la crema corporal de karité, mi piel ha mejorado notablemente. La textura es perfecta y la hidratación dura todo el día."
              </p>
              <div className="mt-4 flex items-center">
                <div className="flex-shrink-0">
                  <CustomImage 
                    className="h-10 w-10 rounded-full" 
                    src="/images/testimonial-2.jpg" 
                    alt="Cliente" 
                    width={40} 
                    height={40}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Laura Sánchez</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suscripción */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
          <div className="lg:w-0 lg:flex-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Únete a nuestra comunidad
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-indigo-100">
              Recibe noticias sobre nuevos productos, promociones exclusivas y consejos para el cuidado natural de tu piel.
            </p>
          </div>
          <div className="mt-8 lg:mt-0 lg:ml-8">
            <form className="sm:flex">
              <label htmlFor="email-address" className="sr-only">Correo electrónico</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white focus:border-white sm:max-w-xs rounded-md"
                placeholder="Ingresa tu email"
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
                >
                  Suscribirme
                </button>
              </div>
            </form>
            <p className="mt-3 text-sm text-indigo-100">
              Nos importa tu privacidad. No compartiremos tu información con terceros.
            </p>
          </div>
        </div>
      </div>

      {/* Redes sociales */}
      <div className="bg-indigo-800">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-indigo-100 text-sm">© 2025 Solo Para Eva. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="https://www.facebook.com/share/18kSRN2JWi/" className="text-indigo-100 hover:text-white">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://www.instagram.com/soloparaeva/" className="text-indigo-100 hover:text-white">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}