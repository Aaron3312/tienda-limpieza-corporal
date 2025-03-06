import ProductCard from '@/components/productos/ProductCard';
import Link from 'next/link';

// Datos específicos de shampoo
const shampoos = [
  {
    id: 'shampoo-natural-1',
    name: 'Shampoo de Coco y Karité',
    price: 12.99,
    image: '/images/jabon0.jpeg',
    description: 'Shampoo hidratante elaborado con aceite de coco y manteca de karité para cabello seco y dañado.'
  },
  {
    id: 'shampoo-natural-2',
    name: 'Shampoo de Romero y Menta',
    price: 11.99,
    image: '/images/jabon2.jpeg',
    description: 'Shampoo revitalizante que estimula el crecimiento del cabello y refresca el cuero cabelludo.'
  },
  {
    id: 'shampoo-natural-3',
    name: 'Shampoo de Aloe Vera',
    price: 10.99,
    image: '/images/jabon3.jpeg',
    description: 'Shampoo suave con aloe vera, ideal para cabello normal y cuero cabelludo sensible.'
  }
];

export default function ShampooPage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Shampoo Natural
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Cuida tu cabello con nuestros shampoos naturales libres de sulfatos y parabenos
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
                  <span className="ml-4 text-gray-500 font-medium">Shampoo</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Listado de shampoos */}
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {shampoos.map((shampoo) => (
              <ProductCard
                key={shampoo.id}
                id={shampoo.id}
                name={shampoo.name}
                price={shampoo.price}
                image={shampoo.image}
                description={shampoo.description}
              />
            ))}
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-16 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">¿Por qué elegir shampoo natural?</h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                Nuestros shampoos están libres de sulfatos, parabenos, siliconas y otros químicos agresivos que dañan tu cabello a largo plazo.
                Al usar productos naturales, tu cabello mantendrá su equilibrio natural, luciendo más saludable y brillante con el tiempo.
              </p>
            </div>
            <div className="mt-5">
              <div className="rounded-md bg-gray-50 px-6 py-5">
                <div className="sm:flex sm:items-start sm:justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">¿Pronto disponible!</h4>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>Estamos desarrollando nuevas fórmulas de shampoo para diferentes tipos de cabello.</p>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
                    <Link
                      href="/contacto"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-sm"
                    >
                      Suscríbete
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