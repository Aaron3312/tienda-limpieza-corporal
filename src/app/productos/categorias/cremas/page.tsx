import ProductCard from '@/components/productos/ProductCard';
import Link from 'next/link';

// Datos específicos de cremas
const cremas = [
  {
    id: 'crema-natural-1',
    name: 'Crema Hidratante de Rosas',
    price: 15.99,
    image: '/images/jabon0.jpeg',
    description: 'Crema hidratante con agua de rosas y aceite de jojoba para una piel radiante y nutrida.'
  },
  {
    id: 'crema-natural-2',
    name: 'Crema Corporal de Coco',
    price: 14.99,
    image: '/images/jabon1.jpeg',
    description: 'Crema corporal con aceite de coco y manteca de karité, hidratación profunda para piel seca.'
  },
  {
    id: 'crema-natural-3',
    name: 'Crema Facial de Aloe Vera',
    price: 16.99,
    image: '/images/jabon2.jpeg',
    description: 'Crema facial ligera con aloe vera y aceite de argán, ideal para uso diario en todo tipo de piel.'
  },
  {
    id: 'crema-natural-4',
    name: 'Crema Antiarrugas de Lavanda',
    price: 18.99,
    image: '/images/jabon3.jpeg',
    description: 'Crema facial antienvejecimiento con aceite esencial de lavanda y vitamina E.'
  }
];

export default function CremasPage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Cremas Naturales
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Hidratación y nutrición profunda con nuestras cremas elaboradas con ingredientes naturales
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
                  <span className="ml-4 text-gray-500 font-medium">Cremas</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Listado de cremas */}
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {cremas.map((crema) => (
              <ProductCard
                key={crema.id}
                id={crema.id}
                name={crema.name}
                price={crema.price}
                image={crema.image}
                description={crema.description}
              />
            ))}
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-16 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">La importancia de una hidratación natural</h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                Nuestras cremas están formuladas sin químicos dañinos como parabenos, siliconas o derivados del petróleo.
                Utilizamos aceites vegetales, mantecas naturales y activos botánicos que nutren tu piel en profundidad
                sin obstruir los poros ni alterar el equilibrio natural de la piel.
              </p>
            </div>
            <div className="mt-5">
              <div className="rounded-md bg-gray-50 px-6 py-5">
                <div className="sm:flex sm:items-start sm:justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Consejo de belleza</h4>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>Aplica tus cremas sobre la piel ligeramente húmeda para ayudar a sellar la hidratación.</p>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
                    <Link
                      href="/productos"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-sm"
                    >
                      Ver todos los productos
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