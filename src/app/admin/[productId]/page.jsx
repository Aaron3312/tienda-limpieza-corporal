"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import catalogoData from '@/data/productos.json';

export default function ProductosPage() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [sortOrder, setSortOrder] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  
  // Obtener datos del JSON
  const { categorias } = catalogoData;
  const productos = catalogoData.productos;
  const { primario, secundario, acento1, acento2, textoOscuro, textoClaro, fondo } = catalogoData.colores;
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ backgroundColor: `${primario}30` }}>
        <div className="animate-pulse text-xl font-bold" style={{ color: secundario }}>
          Cargando el catálogo...
        </div>
      </div>
    );
  }
  
  // Filtrado de productos por categoría
  const filteredProducts = activeCategory === 'todos' 
    ? productos 
    : productos.filter(product => product.categoria === activeCategory);
  
  // Ordenar productos según la selección
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'price-asc') {
      return a.variantes[0].precio - b.variantes[0].precio;
    }
    if (sortOrder === 'price-desc') {
      return b.variantes[0].precio - a.variantes[0].precio;
    }
    if (sortOrder === 'name') {
      return a.nombre.localeCompare(b.nombre);
    }
    return 0; // Por defecto, no ordenar
  });
  
  // Función para manejar cambios en el orden
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Añadir una categoría "todos" a las categorías
  const allCategories = [
    { id: 'todos', nombre: 'Todos los productos', descripcion: 'Ver catálogo completo' },
    ...categorias
  ];

  // Generar un color aleatorio para cada producto basado en los acentos
  const getRandomColor = (productId) => {
    const colors = [
      `${primario}`,
      `${secundario}`,
      `${acento1}`,
      `${acento2}`
    ];
    
    // Usamos el id del producto para asignar un color de manera consistente
    const index = (productId.charCodeAt(0) + productId.charCodeAt(productId.length - 1)) % colors.length;
    return colors[index];
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: fondo }}>
      {/* Hero section con colores más vibrantes */}
      <div className="relative py-24" 
        style={{ 
          background: `linear-gradient(135deg, ${primario} 0%, ${secundario} 100%)`,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl" style={{ color: textoClaro }}>
            Nuestros Productos
          </h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto" style={{ color: textoClaro }}>
            Descubre nuestra colección de productos artesanales elaborados con ingredientes naturales
            para el cuidado completo de tu piel.
          </p>
          
          {/* Iconos decorativos */}
          <div className="absolute top-10 right-10 opacity-20">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                stroke={textoClaro} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" 
                stroke={textoClaro} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 9H9.01" stroke={textoClaro} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 9H15.01" stroke={textoClaro} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <div className="absolute bottom-10 left-10 opacity-20">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" 
                stroke={textoClaro} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 10L12 15L17 10" stroke={textoClaro} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15V3" stroke={textoClaro} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Introducción con diseño atractivo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-block p-3 rounded-full mb-4" 
            style={{ 
              background: `linear-gradient(135deg, ${acento1}50 0%, ${acento2}50 100%)`,
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke={secundario} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold sm:text-5xl" style={{ color: textoOscuro }}>
            Cosmética de Autor
          </h2>
          <div className="w-24 h-1 mx-auto my-4" style={{ backgroundColor: acento1 }}></div>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-600">
            En Solo Para Eva, elaboramos cada producto con ingredientes naturales cuidadosamente 
            seleccionados. Nuestro proceso artesanal garantiza productos libres de químicos dañinos, 
            respetuosos con tu piel y con el medio ambiente.
          </p>
        </div>

        {/* Filtros con diseño más destacado */}
        <div className="bg-white rounded-xl shadow-xl p-6 mb-12" 
          style={{ 
            borderTop: `4px solid ${secundario}`,
            borderBottom: `4px solid ${acento1}`
          }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            {/* Título de categorías */}
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h3 className="text-lg font-bold" style={{ color: primario }}>Filtrar por categoría:</h3>
            </div>
            
            {/* Filtros por categoría */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {allCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-md`}
                  style={
                    activeCategory === category.id 
                      ? { 
                          backgroundColor: secundario, 
                          color: textoClaro,
                          boxShadow: `0 4px 10px ${secundario}80`
                        } 
                      : { 
                          backgroundColor: `${secundario}20`, 
                          color: textoOscuro 
                        }
                  }
                >
                  {category.nombre}
                </button>
              ))}
            </div>
            
            {/* Ordenación */}
            <div className="flex items-center mt-4 md:mt-0">
              <label htmlFor="sort" className="text-sm font-medium mr-2" style={{ color: textoOscuro }}>
                Ordenar por:
              </label>
              <select
                id="sort"
                value={sortOrder}
                onChange={handleSortChange}
                className="rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 transition-shadow duration-200"
                style={{ 
                  borderColor: secundario, 
                  color: textoOscuro,
                  backgroundColor: `${secundario}10`,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <option value="">Relevancia</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="name">Nombre</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cuadrícula de productos con más color y diseño */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product) => {
            const productColor = getRandomColor(product.id);
            return (
              <div 
                key={product.id} 
                className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ borderTop: `3px solid ${productColor}` }}
              >
                <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                  {product.destacado && (
                    <div className="absolute top-0 right-0 z-10 m-2 px-3 py-1 rounded-full text-xs font-bold uppercase" 
                      style={{ backgroundColor: acento1, color: textoOscuro, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      Destacado
                    </div>
                  )}
                  <div className="w-full h-full flex items-center justify-center p-6" 
                    style={{ backgroundColor: `${productColor}20` }}>
                    {/* Aquí iría la imagen real cuando esté disponible */}
                    <div className="flex flex-col items-center justify-center text-center h-full">
                      <div className="w-24 h-24 mb-4 rounded-full flex items-center justify-center" 
                        style={{ backgroundColor: `${productColor}40` }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke={productColor} strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                        </svg>
                      </div>
                      <div className="text-gray-500 text-sm italic">Imagen de producto</div>
                    </div>
                  </div>
                  {/* Superposición al hacer hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link href={`/productos/${product.id}`} className="px-4 py-2 bg-white text-sm font-medium rounded-md shadow-lg transform hover:scale-105 transition-transform duration-200" style={{ color: productColor }}>
                      Ver detalles
                    </Link>
                  </div>
                </div>
                
                <div className="p-6">
                  <Link href={`/productos/${product.id}`}>
                    <h3 className="text-xl font-bold mb-2 group-hover:underline" style={{ color: productColor }}>
                      {product.nombre}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.descripcion}</p>

                  {/* Lista de variantes con precios */}
                  <div className="space-y-2 mb-4">
                    {product.variantes.map((variante) => (
                      <div key={variante.id} className="flex justify-between items-center py-1 border-b" style={{ borderColor: `${productColor}30` }}>
                        <span className="text-sm text-gray-700">{variante.nombre}</span>
                        <span className="text-sm font-bold bg-white px-2 py-1 rounded-lg shadow-sm" style={{ color: productColor, borderLeft: `2px solid ${productColor}` }}>
                          ${variante.precio.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Variedades disponibles */}
                  {product.variedades && product.variedades.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Variedades disponibles:</p>
                      <div className="flex flex-wrap gap-1">
                        {product.variedades.slice(0, 3).map((variedad, index) => (
                          <span key={index} className="inline-block px-2 py-1 text-xs rounded-full"
                            style={{ backgroundColor: `${productColor}20`, color: textoOscuro }}>
                            {variedad}
                          </span>
                        ))}
                        {product.variedades.length > 3 && (
                          <span className="inline-block px-2 py-1 text-xs rounded-full"
                            style={{ backgroundColor: `${productColor}40`, color: textoOscuro }}>
                            +{product.variedades.length - 3} más
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Footer de la tarjeta */}
                <div className="bg-gray-50 p-4 border-t flex justify-between items-center" style={{ borderColor: `${productColor}30` }}>
                  <span className="text-xs font-medium" style={{ color: `${productColor}` }}>
                    {categorias.find(cat => cat.id === product.categoria)?.nombre || 'Producto'}
                  </span>
                  <Link href={`/productos/${product.id}`} className="text-xs font-medium flex items-center" style={{ color: productColor }}>
                    Ver detalles
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Caso de no encontrar productos */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <div className="inline-block p-3 rounded-full mb-4" style={{ backgroundColor: `${acento1}30` }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke={acento1} strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">No se encontraron productos</h3>
            <p className="text-gray-500 mb-6">No hay productos disponibles en esta categoría por el momento.</p>
            <button 
              onClick={() => setActiveCategory('todos')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-md transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: secundario, color: textoClaro }}
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>

      {/* Sección de beneficios con diseño atractivo */}
      <div className="py-20 mt-16" 
        style={{ 
          background: `linear-gradient(135deg, ${secundario}20 0%, ${acento2}20 100%)`,
          borderTop: `5px solid ${secundario}`, 
          borderBottom: `5px solid ${acento1}`
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold sm:text-4xl" style={{ color: textoOscuro }}>
              ¿Por qué elegir Solo Para Eva?
            </h2>
            <div className="w-24 h-1 mx-auto my-4" style={{ backgroundColor: acento1 }}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg transform transition-transform duration-300 hover:scale-105"
              style={{ borderTop: `3px solid ${primario}` }}>
              <div className="flex items-center justify-center h-16 w-16 rounded-full mb-6 mx-auto" 
                style={{ backgroundColor: `${primario}30` }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke={primario} strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: primario }}>
                100% Naturales
              </h3>
              <p className="text-gray-600 text-center">
                Todos nuestros productos están elaborados con ingredientes naturales de la más alta calidad,
                libres de químicos dañinos, sulfatos, parabenos y derivados del petróleo.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg transform transition-transform duration-300 hover:scale-105"
              style={{ borderTop: `3px solid ${secundario}` }}>
              <div className="flex items-center justify-center h-16 w-16 rounded-full mb-6 mx-auto" 
                style={{ backgroundColor: `${secundario}30` }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke={secundario} strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: secundario }}>
                Elaboración Artesanal
              </h3>
              <p className="text-gray-600 text-center">
                Cada producto es elaborado a mano en pequeños lotes, asegurando la máxima calidad y atención
                al detalle en cada paso del proceso de fabricación.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg transform transition-transform duration-300 hover:scale-105"
              style={{ borderTop: `3px solid ${acento1}` }}>
              <div className="flex items-center justify-center h-16 w-16 rounded-full mb-6 mx-auto" 
                style={{ backgroundColor: `${acento1}30` }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke={acento1} strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: acento1 }}>
                Compromiso Ecológico
              </h3>
              <p className="text-gray-600 text-center">
                Nuestros empaques son biodegradables o reutilizables, y todos nuestros procesos están
                diseñados pensando en minimizar el impacto ambiental.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de contacto con llamada a la acción */}
      <div className="relative py-16" style={{ background: `linear-gradient(135deg, ${primario} 0%, ${secundario} 100%)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: textoClaro }}>
                ¿Interesado en nuestros productos?
              </h2>
              <p className="mt-3 text-lg" style={{ color: `${textoClaro}CC` }}>
                Solicita más información sobre precios, variedades y disponibilidad. Estaremos encantados de atenderte y resolver todas tus dudas.
              </p>
              <div className="mt-8">
                <Link href="/contacto" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-full shadow-md transition-all duration-300 hover:shadow-xl transform hover:scale-105"
                  style={{ backgroundColor: textoClaro, color: secundario }}>
                  Contáctanos
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/3 relative">
              <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-white opacity-10 backdrop-filter backdrop-blur"></div>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke={textoClaro} strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full" 
                style={{ 
                  background: `linear-gradient(135deg, ${acento1} 0%, ${acento2} 100%)`,
                  opacity: 0.7 
                }}>
              </div>
            </div>
          </div>
        </div>
        
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform translate-y-0" style={{ lineHeight: 0 }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill={fondo}></path>
          </svg>
        </div>
      </div>
    </div>
  );
}