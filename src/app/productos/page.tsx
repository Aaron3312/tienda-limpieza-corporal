import ProductCard from '@/components/productos/ProductCard';

// Datos de ejemplo para los productos
const products = [
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

export default function ProductsPage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Nuestros Productos
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Descubre nuestra línea de productos naturales para el cuidado de tu piel
          </p>
        </div>

        {/* Filtros */}
        <div className="mt-8 flex justify-center space-x-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md">Todos</button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-md">Jabones</button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-md">Shampoo</button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-md">Cremas</button>
        </div>

        {/* Listado de productos */}
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                description={product.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}