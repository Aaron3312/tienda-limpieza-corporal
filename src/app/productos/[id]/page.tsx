import Image from 'next/image';
import Link from 'next/link';
import RelatedProducts from '@/components/productos/RelatedProducts';

// Estos datos deberían venir de una base de datos o API
const productsData = [
  {
    id: 'jabon-natural-1',
    name: 'Jabón Natural de Lavanda',
    price: 8.99,
    image: '../images/jabon0.jpeg',
    description: 'Jabón artesanal de lavanda con propiedades relajantes y calmantes para la piel.',
    longDescription: 'Este jabón está elaborado artesanalmente con ingredientes naturales y aceite esencial de lavanda. Ideal para relajar el cuerpo y la mente, proporciona una limpieza suave mientras calma la piel. La lavanda tiene propiedades antisépticas y antiinflamatorias que ayudan a tratar problemas cutáneos leves.',
    ingredients: ['Aceite de oliva', 'Aceite de coco', 'Manteca de karité', 'Aceite esencial de lavanda', 'Flores de lavanda'],
    benefits: ['Calma la piel irritada', 'Promueve la relajación', 'Limpia suavemente sin resecar', 'Aroma natural relajante']
  },
  {
    id: 'jabon-natural-2',
    name: 'Jabón de Avena y Miel',
    price: 7.99,
    image: '/images/jabon1.jpg',
    description: 'Jabón nutritivo con avena y miel, ideal para pieles sensibles y secas.',
    longDescription: 'Elaborado con avena y miel orgánica, este jabón ofrece una limpieza delicada y nutritiva perfecta para pieles sensibles o secas. La avena tiene propiedades exfoliantes suaves que eliminan las células muertas, mientras que la miel hidrata profundamente la piel.',
    ingredients: ['Aceite de oliva', 'Aceite de coco', 'Miel orgánica', 'Avena molida', 'Manteca de cacao'],
    benefits: ['Hidratación profunda', 'Exfoliación suave', 'Reduce la irritación', 'Nutre pieles secas']
  },
  // Podríamos añadir el resto de productos aquí
];

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // En un caso real, aquí buscaríamos el producto en la base de datos
  const product = productsData.find(p => p.id === params.id) || productsData[0];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Imagen del producto */}
          <div className="lg:max-w-lg lg:self-end">
            <div className="rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>

          {/* Información del producto */}
          <div className="mt-10 lg:mt-0 lg:col-start-2">
            <Link href="/productos" className="text-indigo-600 hover:text-indigo-500 mb-4 inline-block">
              ← Volver a productos
            </Link>
            
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
            <div className="mt-3">
              <h2 className="sr-only">Precio del producto</h2>
              <p className="text-3xl text-gray-900">${product.price.toFixed(2)}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Descripción</h3>
              <p className="text-base text-gray-700">{product.longDescription}</p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Ingredientes</h3>
              <ul className="mt-2 space-y-2">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center">
                    <span className="h-2 w-2 bg-indigo-500 rounded-full mr-2"></span>
                    <span className="text-gray-600">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Beneficios</h3>
              <ul className="mt-2 space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <button
                type="button"
                className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Productos relacionados */}
      <RelatedProducts currentProductId={params.id} />
    </div>
  );
}