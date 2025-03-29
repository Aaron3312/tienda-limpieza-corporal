"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// En una implementación real, esto se cargaría desde un archivo externo
import catalogoData from '@/app/data/catalogo.json';

export default function Catalogo() {
  // Estado para almacenar la categoría activa
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  
  // Obtener datos del JSON
  const { informacionTienda, colores, categorias, productos } = catalogoData;
  
  // Filtrar productos por categoría
  const productosFiltrados = categoriaActiva === 'todos' 
    ? productos 
    : productos.filter(producto => producto.categoria === categoriaActiva);
  
  // Función para cambiar la categoría activa
  const cambiarCategoria = (categoriaId) => {
    setCategoriaActiva(categoriaId);
  };

  // Obtén los productos destacados
  const productosDestacados = productos.filter(producto => producto.destacado);

  return (
    <div className="catalogo-container bg-gradient-to-b from-white to-gray-50">
      {/* Encabezado del catálogo */}
      <div className="cabecera-catalogo py-12" style={{ 
        background: `linear-gradient(135deg, ${colores.primario}, ${colores.secundario})`,
        borderBottom: `5px solid ${colores.terciario}`
      }}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white text-center drop-shadow-md">
            Catálogo de Productos 2025
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto text-center opacity-90">
            {informacionTienda.slogan}
          </p>
        </div>
      </div>

      {/* Introducción */}
      <div className="introduccion py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="px-8 py-8 rounded-lg" style={{ 
              background: `linear-gradient(to right, rgba(170, 213, 133, 0.1), rgba(104, 218, 214, 0.1))`,
              border: `1px solid ${colores.primario}`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <p className="text-lg mb-6 text-gray-800 leading-relaxed">
                La Cosmética de Autor de <strong style={{ color: colores.primario }}>Solo para Eva</strong> ofrece productos de cuidado personal exclusivos y
                personalizados. Estamos comprometidos con el medio ambiente y los animales,
                formulando productos con ingredientes específicos de acuerdo a cada necesidad.
              </p>
              <div className="text-right">
                <p className="text-lg font-semibold" style={{ color: colores.cuaternario }}>
                  Araceli García Padilla
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categorías */}
      <div className="categorias py-10" style={{ backgroundColor: 'rgba(242, 186, 224, 0.15)' }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800" style={{ 
            borderBottom: `3px solid ${colores.primario}`,
            display: 'inline-block',
            paddingBottom: '8px',
            marginLeft: '50%',
            transform: 'translateX(-50%)'
          }}>
            Nuestras Categorías
          </h2>
          
          <div className="filtros-categorias mb-10 flex flex-wrap justify-center">
            <button 
              onClick={() => cambiarCategoria('todos')}
              className={`rounded-full font-medium px-6 py-3 m-2 transition-all duration-300 ${
                categoriaActiva === 'todos' 
                  ? 'text-white shadow-md transform scale-105' 
                  : 'text-gray-700 hover:scale-105'
              }`}
              style={{ 
                backgroundColor: categoriaActiva === 'todos' ? colores.primario : 'white',
                border: `2px solid ${colores.primario}`
              }}
            >
              Todos los productos
            </button>
            {categorias.map(categoria => (
              <button 
                key={categoria.id}
                onClick={() => cambiarCategoria(categoria.id)}
                className={`rounded-full font-medium px-6 py-3 m-2 transition-all duration-300 ${
                  categoriaActiva === categoria.id 
                    ? 'text-white shadow-md transform scale-105' 
                    : 'text-gray-700 hover:scale-105'
                }`}
                style={{ 
                  backgroundColor: categoriaActiva === categoria.id ? colores.primario : 'white',
                  border: `2px solid ${colores.primario}`
                }}
              >
                {categoria.nombre}
              </button>
            ))}
          </div>

          {/* Mostrar las tarjetas de categorías solo cuando se muestra "todos" */}
          {categoriaActiva === 'todos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
              {categorias.map(categoria => (
                <div 
                  key={categoria.id} 
                  className="categoria-card cursor-pointer shadow-lg hover:shadow-xl rounded-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
                  onClick={() => cambiarCategoria(categoria.id)}
                >
                  <div className="categoria-img relative h-48 bg-gradient-to-br from-white to-gray-100 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full flex items-center justify-center" style={{ backgroundColor: colores.primario }}>
                      <span className="text-white font-bold text-xl">{categoria.nombre.split(' ')[0]}</span>
                    </div>
                  </div>
                  <div className="p-5 text-center" style={{ 
                    background: `linear-gradient(135deg, ${colores.primario}, ${colores.secundario})`,
                    color: 'white' 
                  }}>
                    <h3 className="text-xl font-bold mb-2">{categoria.nombre}</h3>
                    <p className="text-sm opacity-90">{categoria.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Listado de productos */}
      <div className="productos py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800" style={{ 
            borderBottom: `3px solid ${colores.secundario}`,
            display: 'inline-block',
            paddingBottom: '8px',
            marginLeft: '50%',
            transform: 'translateX(-50%)'
          }}>
            {categoriaActiva === 'todos' ? 'Todos Nuestros Productos' : 
             categorias.find(cat => cat.id === categoriaActiva)?.nombre || 'Productos'}
          </h2>

          {/* Mensaje si no hay productos */}
          {productosFiltrados.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-700">No se encontraron productos en esta categoría.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productosFiltrados.map(producto => (
                <div 
                  key={producto.id} 
                  className="producto-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  style={{ background: 'white' }}
                >
                  <div className="producto-img relative h-56">
                    {/* Simulación de imagen - en implementación real sería una imagen real */}
                    <div className="w-full h-full flex items-center justify-center" 
                      style={{ 
                        background: `linear-gradient(45deg, ${colores.terciario}40, ${colores.cuaternario}40)`,
                      }}
                    >
                      <div 
                        className="h-20 w-20 rounded-full flex items-center justify-center shadow-md" 
                        style={{ backgroundColor: colores.secundario }}
                      >
                        <span className="text-white font-bold">{producto.nombre.split(' ')[0]}</span>
                      </div>
                    </div>
                    
                    {/* Insignia de destacado */}
                    {producto.destacado && (
                      <div 
                        className="absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-bold shadow-md"
                        style={{ backgroundColor: colores.terciario, color: 'white' }}
                      >
                        Destacado
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-800" style={{ color: colores.primario }}>{producto.nombre}</h3>
                    <p className="text-gray-700 mb-5 text-sm">{producto.descripcion}</p>
                    
                    {/* Línea divisoria decorativa */}
                    <div className="flex items-center mb-4">
                      <div className="h-0.5 flex-grow" style={{ backgroundColor: `${colores.secundario}50` }}></div>
                      <div className="px-2 text-sm font-medium" style={{ color: colores.cuaternario }}>Presentaciones</div>
                      <div className="h-0.5 flex-grow" style={{ backgroundColor: `${colores.secundario}50` }}></div>
                    </div>
                    
                    {/* Variantes de producto */}
                    <div className="space-y-2">
                      {producto.variantes.map((variante, index) => (
                        <div key={index} className="flex justify-between py-1 px-2 rounded hover:bg-gray-50">
                          <span className="text-gray-800">{variante.descripcion} ({variante.unidad})</span>
                          <span 
                            className="font-bold"
                            style={{ color: colores.secundario }}
                          >${variante.precio.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sección de productos destacados (solo visible en la vista "todos") */}
      {categoriaActiva === 'todos' && productosDestacados.length > 0 && (
        <div className="destacados py-16" style={{ 
          background: `linear-gradient(to bottom, white, ${colores.primario}10)` 
        }}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center text-gray-800" style={{ 
              borderBottom: `3px solid ${colores.terciario}`,
              display: 'inline-block',
              paddingBottom: '8px',
              marginLeft: '50%',
              transform: 'translateX(-50%)'
            }}>Productos Destacados</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productosDestacados.map(producto => (
                <div 
                  key={producto.id} 
                  className="producto-card rounded-xl overflow-hidden shadow-xl transform hover:-translate-y-2 transition-all duration-300"
                  style={{
                    background: 'white',
                    border: `2px solid ${colores.terciario}`
                  }}
                >
                  <div className="producto-img relative h-64">
                    <div className="w-full h-full flex items-center justify-center" 
                      style={{ 
                        background: `linear-gradient(135deg, ${colores.cuaternario}30, ${colores.terciario}30)`,
                      }}
                    >
                      <div 
                        className="h-24 w-24 rounded-full flex items-center justify-center shadow-lg transform rotate-12" 
                        style={{ backgroundColor: colores.terciario }}
                      >
                        <span className="text-white font-bold text-xl">{producto.nombre.split(' ')[0]}</span>
                      </div>
                    </div>
                    
                    <div 
                      className="absolute top-3 right-3 px-4 py-2 rounded-full text-sm font-bold shadow-md"
                      style={{ backgroundColor: colores.terciario, color: 'white' }}
                    >
                      Destacado
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-800" style={{ color: colores.cuaternario }}>{producto.nombre}</h3>
                    <p className="text-gray-700 mb-5">{producto.descripcion}</p>
                    
                    {/* Mostrar solo la primera variante para destacados */}
                    {producto.variantes.length > 0 && (
                      <div className="mt-4 text-center p-3 rounded-lg" style={{ backgroundColor: `${colores.terciario}20` }}>
                        <p className="text-xl font-bold" style={{ color: colores.secundario }}>
                          Desde ${producto.variantes[0].precio.toFixed(2)}
                        </p>
                        <p className="text-sm mt-1 text-gray-700">
                          {producto.variantes.length} presentación(es) disponible(s)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Información de contacto */}
      <div className="contacto py-12 text-white" style={{ 
        background: `linear-gradient(135deg, ${colores.primario}, ${colores.secundario})`,
        borderTop: `5px solid ${colores.cuaternario}`
      }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Interesado en nuestros productos?</h2>
          <p className="mb-8 text-lg opacity-90">Contáctanos para más información o para realizar tu pedido:</p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="bg-white text-gray-800 px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-shadow max-w-xs w-full">
              <p className="font-bold mb-2" style={{ color: colores.secundario }}>Teléfono:</p>
              <p>{informacionTienda.contacto.telefono}</p>
            </div>
            <div className="bg-white text-gray-800 px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-shadow max-w-xs w-full">
              <p className="font-bold mb-2" style={{ color: colores.secundario }}>Email:</p>
              <p>{informacionTienda.contacto.email}</p>
            </div>
            <div className="bg-white text-gray-800 px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-shadow max-w-xs w-full">
              <p className="font-bold mb-2" style={{ color: colores.secundario }}>Instagram:</p>
              <p>{informacionTienda.contacto.instagram}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pie de página */}

    </div>
  );
}