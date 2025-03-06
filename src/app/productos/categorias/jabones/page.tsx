import ProductCard from '@/components/productos/ProductCard';
import Link from 'next/link';

// Datos específicos de jabones
const jabones = [
  {
    id: 'jabon-natural-1',
    name: 'Jabón Natural de Lavanda',
    price: 8.99,
    image: '/images/jabon0.jpeg',
    description: 'Jabón artesanal de lavanda con propiedades relajantes y calmantes para la piel.'
  },
  {
    id: 'jabon-natural-2',
    name: 'Jabón de Avena y Miel',
    price: 7.99,
    image: '/images/jabon1.jpeg',
    description: 'Jabón nutritivo con avena y miel, ideal para pieles sensibles y secas.'
  },
  {
    id: 'jabon-natural-3',
    name: 'Jabón de Carbón Activado',
    price: 9.99,
    image: '/images/jabon2.jpeg',
    description: 'Jabón purificante con carbón activado, elimina toxinas e impurezas de la piel.'
  },
  {
    id: 'jabon-natural-4',
    name: 'Jabón de Aloe Vera',
    price: 8.49,
    image: '/images/jabon3.jpeg',
    description: 'Jabón hidratante con aloe vera, perfecto para calmar y refrescar la piel.'
  },
  {
    id: 'jabon-natural-5',
    name: 'Jabón de Eucalipto',
    price: 8.99,
    image: '/images/jabon4.jpeg',
    description: 'Jabón refrescante con aceite esencial de eucalipto, ideal para descongestionar.'
  },
  {
    id: 'jabon-natural-6',
    name: 'Jabón de Caléndula',
    price: 7.99,
    image: '/images/jabon5.jpeg',
    description: 'Jabón suave con caléndula, con propiedades antiinflamatorias y calmantes.'
  }
];

export default function JabonesPage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Jabones Naturales
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Descubre nuestra línea de jabones artesanales elaborados con ingredientes naturales
          </p>
        </div>

        {/* Breadcrumbs */}
        <div className="mt-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <div>
                  <Link href="/" className="text-gray-400 hover:text-gray-500">
                    Inicio
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                  <Link href="/productos" className="ml-4 text-gray-400 hover:text-gray-500">
                    Productos
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                  <span className="ml-4 text-gray-500 font-medium">Jabones</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Filtros (opcional) */}
        <div className="mt-8">
          <div className="bg-white shadow p-4 rounded-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Filtrar por</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">Tipo de piel</label>
                <select
                  id="tipo"
                  name="tipo"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Todos</option>
                  <option value="normal">Normal</option>
                  <option value="seca">Seca</option>
                  <option value="grasa">Grasa</option>
                  <option value="mixta">Mixta</option>
                  <option value="sensible">Sensible</option>
                </select>
              </div>
              <div>
                <label htmlFor="ingrediente" className="block text-sm font-medium text-gray-700 mb-1">Ingrediente principal</label>
                <select
                  id="ingrediente"
                  name="ingrediente"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Todos</option>
                  <option value="lavanda">Lavanda</option>
                  <option value="avena">Avena</option>
                  <option value="carbon">Carbón Activado</option>
                  <option value="aloe">Aloe Vera</option>
                  <option value="eucalipto">Eucalipto</option>
                  <option value="calendula">Caléndula</option>
                </select>
              </div>
              <div>
                <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                <select
                  id="precio"
                  name="precio"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Todos</option>
                  <option value="menor">Menor a $8.00</option>
                  <option value="medio">$8.00 - $9.00</option>
                  <option value="mayor">Mayor a $9.00</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Aplicar filtros
              </button>
            </div>
          </div>
        </div>

        {/* Listado de jabones */}
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {jabones.map((jabon) => (
              <ProductCard
                key={jabon.id}
                id={jabon.id}
                name={jabon.name}
                price={jabon.price}
                image={jabon.image}
                description={jabon.description}
              />
            ))}
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-16 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Beneficios de nuestros jabones naturales</h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                Todos nuestros jabones están elaborados con ingredientes naturales, libres de químicos dañinos como sulfatos, parabenos y ftalatos.
                Utilizamos aceites esenciales puros y materias primas de la más alta calidad para garantizar productos que cuidan tanto tu piel como el medio ambiente.
              </p>
            </div>
            <div className="mt-5">
              <div className="rounded-md bg-gray-50 px-6 py-5">
                <div className="sm:flex sm:items-start sm:justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">¿No encuentras lo que buscas?</h4>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>Contáctanos para realizar pedidos personalizados según tus necesidades específicas.</p>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
                    <Link
                      href="/contacto"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-sm"
                    >
                      Contactar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}