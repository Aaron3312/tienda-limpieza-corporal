import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface RelatedProductsProps {
  currentProductId: string;
}

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  // En un caso real, estos productos serían filtrados según características comunes con el producto actual
  const relatedProducts: Product[] = [
    {
      id: 'jabon-natural-3',
      name: 'Jabón de Carbón Activado',
      price: 9.99,
      image: '/images/jabon2.jpg',
    },
    {
      id: 'jabon-natural-4',
      name: 'Jabón de Aloe Vera',
      price: 8.49,
      image: '/images/jabon3.jpg',
    },
    {
      id: 'jabon-natural-5',
      name: 'Jabón de Eucalipto',
      price: 8.99,
      image: '/images/jabon4.jpg',
    },
  ].filter(product => product.id !== currentProductId).slice(0, 3);

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          También te podría interesar
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/productos/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}