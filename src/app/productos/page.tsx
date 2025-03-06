"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import CustomImage from '@/components/CustomImage';

// Datos de productos
const productsData = [
  {
    id: 'jabon-natural-1',
    name: 'Jabón Natural de Lavanda',
    price: 8.99,
    image: '/images/jabon0.jpeg',
    category: 'jabones',
    bestSeller: true,
    description: 'Jabón artesanal de lavanda con propiedades relajantes y calmantes para la piel.',
    ingredients: ['Aceite de oliva', 'Aceite de coco', 'Manteca de karité', 'Aceite esencial de lavanda']
  },
  {
    id: 'jabon-natural-2',
    name: 'Jabón de Avena y Miel',
    price: 7.99,
    image: '/images/jabon1.jpeg',
    category: 'jabones',
    bestSeller: false,
    description: 'Jabón nutritivo con avena y miel, ideal para pieles sensibles y secas.',
    ingredients: ['Aceite de oliva', 'Aceite de coco', 'Miel orgánica', 'Avena molida']
  },
  {
    id: 'jabon-natural-3',
    name: 'Jabón de Carbón Activado',
    price: 9.99,
    image: '/images/jabon2.jpeg',
    category: 'jabones',
    bestSeller: true,
    description: 'Jabón purificante con carbón activado, elimina toxinas e impurezas de la piel.',
    ingredients: ['Aceite de oliva', 'Aceite de coco', 'Carbón activado', 'Arcilla']
  },
  {
    id: 'jabon-natural-4',
    name: 'Jabón de Aloe Vera',
    price: 8.49,
    image: '/images/jabon3.jpeg',
    category: 'jabones',
    bestSeller: false,
    description: 'Jabón hidratante con aloe vera, perfecto para calmar y refrescar la piel.',
    ingredients: ['Aceite de oliva', 'Aceite de coco', 'Gel de aloe vera', 'Vitamina E']
  },
  {
    id: 'jabon-natural-5',
    name: 'Jabón de Eucalipto',
    price: 8.99,
    image: '/images/jabon4.jpeg',
    category: 'jabones',
    bestSeller: false,
    description: 'Jabón refrescante con aceite esencial de eucalipto, ideal para descongestionar.',
    ingredients: ['Aceite de oliva', 'Aceite de coco', 'Aceite esencial de eucalipto', 'Hojas de eucalipto']
  },
  {
    id: 'jabon-natural-6',
    name: 'Jabón de Caléndula',
    price: 7.99,
    image: '/images/jabon5.jpeg',
    category: 'jabones',
    bestSeller: false,
    description: 'Jabón suave con caléndula, con propiedades antiinflamatorias y calmantes.',
    ingredients: ['Aceite de oliva', 'Aceite de coco', 'Extracto de caléndula', 'Pétalos de caléndula']
  },
  {
    id: 'crema-hidratante-1',
    name: 'Crema Hidratante de Rosas',
    price: 12.99,
    image: '/images/crema1.jpeg',
    category: 'cremas',
    bestSeller: true,
    description: 'Crema facial hidratante con extracto de rosas, para una piel radiante y suave.',
    ingredients: ['Agua de rosas', 'Manteca de karité', 'Aceite de jojoba', 'Vitamina E']
  },
  {
    id: 'exfoliante-1',
    name: 'Exfoliante Natural de Café',
    price: 10.99,
    image: '/images/crema2.jpeg',
    category: 'exfoliantes',
    bestSeller: false,
    description: 'Exfoliante corporal con café molido que estimula la circulación y elimina células muertas.',
    ingredients: ['Café molido orgánico', 'Aceite de coco', 'Azúcar moreno', 'Vainilla']
  }
];

export default function ProductosPage() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [sortOrder, setSortOrder] = useState('');
  
  // Categorías únicas para el filtro
  const categories = [
    { id: 'todos', name: 'Todos los productos' },
    { id: 'jabones', name: 'Jabones naturales' },
    { id: 'cremas', name: 'Cremas hidratantes' },
    { id: 'exfoliantes', name: 'Exfoliantes' }
  ];
  
  // Filtrado de productos por categoría
  const filteredProducts = activeCategory === 'todos' 
    ? productsData 
    : productsData.filter(product => product.category === activeCategory);
  
  // Ordenar productos según la selección
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'price-asc') return a.price - b.price;
    if (sortOrder === 'price-desc') return b.price - a.price;
    if (sortOrder === 'name') return a.name.localeCompare(b.name);
    return 0; // Por defecto, no ordenar
  });
  
  // Función para manejar cambios en el orden
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="bg-white">
      {/* Hero section con imagen de fondo y título */}
      <div className="relative bg-indigo-800">
        <div className="absolute inset-0">
          <CustomImage
            src="/images/lavandaFondo.jpeg"
            alt="Jabones artesanales Solo Para Eva"
            width={1920}
            height={1080}
            className="w-full h-full object-cover object-center opacity-80"
          />
          <div className="absolute inset-0 bg-indigo-700 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
            Nuestros Productos
          </h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
            Descubre nuestra colección de productos artesanales elaborados con ingredientes naturales
            para el cuidado completo de tu piel.
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Descripción de los productos */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Cuidado natural para tu cuerpo
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
            En Solo Para Eva, elaboramos cada producto con ingredientes naturales cuidadosamente 
            seleccionados. Nuestro proceso artesanal garantiza productos libres de químicos dañinos, 
            respetuosos con tu piel y con el medio ambiente.
          </p>
        </div>

        {/* Filtros y ordenación */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          {/* Filtros por categoría */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Ordenación */}
          <div className="flex items-center">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700 mr-2">
              Ordenar por:
            </label>
            <select
              id="sort"
              value={sortOrder}
              onChange={handleSortChange}
              className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            >
              <option value="">Relevancia</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="name">Nombre</option>
            </select>
          </div>
        </div>

        {/* Cuadrícula de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {sortedProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden group-hover:opacity-90 transition-opacity duration-200">
                {product.bestSeller && (
                  <div className="absolute top-2 right-2 z-10 bg-yellow-400 text-xs font-bold uppercase px-2 py-1 rounded">
                    Más vendido
                  </div>
                )}
                <CustomImage
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-center object-cover"
                />
                {/* Superposición con botón */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link href={`/productos/${product.id}`} legacyBehavior>
                    <a className="w-full bg-white text-gray-900 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Ver detalles
                    </a>
                  </Link>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    <Link href={`/productos/${product.id}`} legacyBehavior>
                      <a className="hover:text-indigo-600">{product.name}</a>
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.ingredients.slice(0, 2).join(', ')}</p>
                </div>
                <p className="text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
              </div>
              <div className="mt-2">
                <button 
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3.5a1.5 1.5 0 013 0V4h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h3v-.5a1.5 1.5 0 013 0V4h1v-.5z" clipRule="evenodd" />
                  </svg>
                  Añadir al carrito
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Caso de no encontrar productos */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron productos en esta categoría.</p>
            <button 
              onClick={() => setActiveCategory('todos')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>

      {/* Sección de beneficios */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Por qué elegir Solo Para Eva
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Descubre los beneficios de nuestros productos naturales elaborados con amor y respeto por tu piel y el medio ambiente.
              </p>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <dl className="space-y-10">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      100% Naturales
                    </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      Todos nuestros productos están elaborados con ingredientes naturales de la más alta calidad,
                      libres de químicos dañinos, sulfatos, parabenos y derivados del petróleo.
                    </dd>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      Elaboración Artesanal
                    </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      Cada producto es elaborado a mano en pequeños lotes, asegurando la máxima calidad y atención
                      al detalle en cada paso del proceso de fabricación.
                    </dd>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      Compromiso Ecológico
                    </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      Nuestros empaques son biodegradables o reutilizables, y todos nuestros procesos están
                      diseñados pensando en minimizar el impacto ambiental.
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de testimonios */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Lo que nuestros clientes dicen
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Descubre por qué nuestros productos marcan la diferencia en la rutina diaria de cuidado personal.
            </p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <div className="bg-gray-50 rounded-lg shadow-sm p-8">
              <p className="text-gray-600 italic">
                "Los jabones de Solo Para Eva han transformado por completo mi piel. Después de años usando productos con químicos, mi piel se siente revitalizada y más saludable que nunca."
              </p>
              <div className="mt-4 flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
                    MC
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">María Castillo</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-sm p-8">
              <p className="text-gray-600 italic">
                "El jabón de lavanda es simplemente maravilloso. Lo uso antes de dormir y me ayuda a relajarme. Además, el aroma es natural y no abrumador como otros productos artificiales."
              </p>
              <div className="mt-4 flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
                    JL
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Javier López</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-sm p-8">
              <p className="text-gray-600 italic">
                "Como persona con piel sensible, siempre he tenido problemas con jabones comerciales. El jabón de caléndula de Solo Para Eva es el único que no me produce irritación y deja mi piel hidratada."
              </p>
              <div className="mt-4 flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
                    SR
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Sofia Ramírez</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección CTA */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">¿Listo para probar nuestros productos?</span>
            <span className="block text-indigo-200">Haz tu pedido hoy y recibe un regalo especial.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link href="/contacto" legacyBehavior>
                <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                  Contáctanos
                </a>
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Ver ofertas
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}