import Image from 'next/image';
import Link from 'next/link';
import RelatedProducts from '@/components/productos/RelatedProducts';

// Datos de productos (esto idealmente vendría de una base de datos o API)
const productsData = [
  {
    id: 'jabon-natural-1',
    name: 'Jabón Natural de Lavanda',
    price: 8.99,
    image: '/images/jabon0.jpeg',
    description: 'Jabón artesanal de lavanda con propiedades relajantes y calmantes para la piel.',
    longDescription: 'Este jabón está elaborado artesanalmente con ingredientes naturales y aceite esencial de lavanda. Ideal para relajar el cuerpo y la mente, proporciona una limpieza suave mientras calma la piel. La lavanda tiene propiedades antisépticas y antiinflamatorias que ayudan a tratar problemas cutáneos leves.',
    ingredients: ['Aceite de oliva', 'Aceite de coco', 'Manteca de karité', 'Aceite esencial de lavanda', 'Flores de lavanda'],
    benefits: ['Calma la piel irritada', 'Promueve la relajación', 'Limpia suavemente sin resecar', 'Aroma natural relajante']
  },
  {
    id: 'jabon-natural-2',
    name: 'Jabón de Avena y Miel',
    price: 7.99,
    image: '/images/jabon1.jpeg',
    description: 'Jabón nutritivo con avena y miel, ideal para pieles sensibles y secas.',
    longDescription: 'Elaborado con avena y miel orgánica, este jabón ofrece una limpieza delicada y nutritiva perfecta para pieles sensibles o secas. La avena tiene propiedades exfoliantes suaves que eliminan las células muertas, mientras que la miel hidrata profundamente la piel.',
    ingredients: ['Aceite de oliva', 'Aceite de coco', 'Miel orgánica', 'Avena molida', 'Manteca de cacao'],
    benefits: ['Hidratación profunda', 'Exfoliación suave', 'Reduce la irritación', 'Nutre pieles secas']
  },
  {
    id: 'jabon-natural-3',
    name: 'Jabón de Carbón Activado',
    price: 9.99,
    image: '/images/jabon2.jpeg',
    description: 'Jabón purificante con carbón activado, elimina toxinas e impurezas de la piel.',
    longDescription: 'Este jabón de carbón activado es ideal para pieles grasas o con tendencia al acné. El carbón activado actúa como un imán para eliminar impurezas, toxinas y exceso de grasa de la piel, dejándola limpia y purificada.',
    ingredients: ['Aceite de oliva', 'Aceite de coco', 'Carbón activado', 'Arcilla', 'Aceite esencial de árbol de té'],
    benefits: ['Purifica la piel', 'Controla el exceso de grasa', 'Ayuda a combatir el acné', 'Elimina impurezas']
  },
  {
    id: 'jabon-natural-4',
    name: 'Jabón de Aloe Vera',
    price: 8.49,
    image: '/images/jabon3.jpeg',
    description: 'Jabón hidratante con aloe vera, perfecto para calmar y refrescar la piel.',
    longDescription: 'Este jabón con aloe vera puro es ideal para hidratar y calmar todo tipo de pieles, especialmente las sensibles o irritadas. El aloe vera tiene propiedades calmantes, hidratantes y regeneradoras que ayudan a mantener la piel saludable.',
    ingredients: ['Aceite de oliva', 'Aceite de coco', 'Gel de aloe vera', 'Vitamina E', 'Glicerina vegetal'],
    benefits: ['Calma la piel irritada', 'Hidrata en profundidad', 'Refresca la piel', 'Ayuda en la regeneración celular']
  },
  {
    id: 'jabon-natural-5',
    name: 'Jabón de Eucalipto',
    price: 8.99,
    image: '/images/jabon4.jpeg',
    description: 'Jabón refrescante con aceite esencial de eucalipto, ideal para descongestionar.',
    longDescription: 'Este jabón con aceite esencial de eucalipto proporciona una sensación refrescante y vigorizante. Ideal para usar por la mañana o después del ejercicio, ayuda a abrir los poros y descongestionar las vías respiratorias.',
    ingredients: ['Aceite de oliva', 'Aceite de coco', 'Aceite esencial de eucalipto', 'Hojas de eucalipto', 'Arcilla verde'],
    benefits: ['Efecto refrescante', 'Descongestionante', 'Limpieza profunda', 'Estimulante']
  },
  {
    id: 'jabon-natural-6',
    name: 'Jabón de Caléndula',
    price: 7.99,
    image: '/images/jabon5.jpeg',
    description: 'Jabón suave con caléndula, con propiedades antiinflamatorias y calmantes.',
    longDescription: 'Este jabón con extracto de caléndula es especialmente suave y adecuado para pieles sensibles o con problemas como dermatitis o eczema. La caléndula tiene propiedades antiinflamatorias, calmantes y curativas.',
    ingredients: ['Aceite de oliva', 'Aceite de coco', 'Extracto de caléndula', 'Pétalos de caléndula', 'Miel'],
    benefits: ['Calma la piel irritada', 'Reduce la inflamación', 'Suaviza la piel', 'Ayuda en la cicatrización']
  },
  // Aquí agregar los productos de shampoo y cremas si tienes páginas de detalle para ellos
];

// Esta función es necesaria para la exportación estática con rutas dinámicas
export async function generateStaticParams() {
  return productsData.map((product) => ({
    id: product.id,
  }));
}

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