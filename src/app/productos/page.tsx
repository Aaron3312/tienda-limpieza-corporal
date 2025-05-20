'use client';

import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/productos/HeroSection';
import ProductDescription from '@/components/productos/ProductDescription';
import FilterSortBar from '@/components/productos/FilterSortBar';
import ProductCard from '@/components/productos/ProductCard';
import EmptyState from '@/components/productos/EmptyState';
import BenefitsSection from '@/components/productos/BenefitsSection';
import CallToAction from '@/components/productos/CallToAction';
import Testimonios from '@/components/testimonios/Testimonios';
import { getProductos, getCategorias, getColores } from '@/services/firestore';
import { Producto, Categoria, Colores } from '@/types';

export default function ProductosPage() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [sortOrder, setSortOrder] = useState('');
  const [displayedProducts, setDisplayedProducts] = useState<Producto[]>([]);
  const [allProducts, setAllProducts] = useState<Producto[]>([]);
  const [categoriesList, setCategoriesList] = useState<Categoria[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [colores, setColores] = useState<Colores>({
    primario: '#aad585',
    secundario: '#68dad6',
    acento1: '#f2bae0',
    acento2: '#cba3d7',
    textoOscuro: '#333333',
    textoClaro: '#ffffff',
    fondo: '#f8f9fa',
    pastelLavanda: '#e6e6fa',
    texto: '#333333',
    pastelVerde: '#d8f3dc'  // Añadimos el color pastelVerde que estaba faltando
  });
  
  // Cargar datos de Firebase
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // Cargar colores, productos y categorías en paralelo
        const [coloresData, productosData, categoriasData] = await Promise.all([
          getColores(),
          getProductos(),
          getCategorias()
        ]);
        
        // if (coloresData) {
        //   setColores({
        //     ...coloresData,
        //     pastelLavanda: '#e6e6fa',
        //     texto: coloresData.textoOscuro,
        //     pastelVerde: '#d8f3dc'  // Asegurarnos de que pastelVerde existe
        //   });
        // }
        
        setAllProducts(productosData);
        setCategoriesList(categoriasData);
        
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  
  // Filtrar y ordenar productos cuando cambian los filtros o datos
  useEffect(() => {
    // Si aún no tenemos productos, no hacer nada
    if (allProducts.length === 0) return;
    
    try {
      // Filtrar por categoría si es necesario
      let filtered = activeCategory === 'todos' 
        ? allProducts 
        : allProducts.filter(product => product.categoria === activeCategory);
      
      // Ordenar productos según la selección
      const sorted = [...filtered].sort((a, b) => {
        if (sortOrder === 'price-asc') {
          return (a.variantes[0]?.precio || 0) - (b.variantes[0]?.precio || 0);
        }
        if (sortOrder === 'price-desc') {
          return (b.variantes[0]?.precio || 0) - (a.variantes[0]?.precio || 0);
        }
        if (sortOrder === 'name') {
          return a.nombre.localeCompare(b.nombre);
        }
        if (sortOrder === 'destacados') {
          return (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0);
        }
        // Por defecto, mostrar destacados primero
        return (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0);
      });
      
      // Establecer los productos a mostrar
      setDisplayedProducts(sorted);
      
      // Activar la animación de aparición
      setIsVisible(true);
      
    } catch (error) {
      console.error("Error al procesar productos:", error);
      setDisplayedProducts([]);
    }
  }, [allProducts, activeCategory, sortOrder]);
  
  // Categorías para el filtro
  const categories = [
    { id: 'todos', nombre: 'Todos los productos' },
    ...categoriesList
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: colores.fondo }}>
      {/* Hero section */}
      <HeroSection colores={colores} />

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Descripción de los productos */}
        <ProductDescription colores={colores} />

        {/* Filtros y ordenación */}
        <FilterSortBar 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
          sortOrder={sortOrder} 
          setSortOrder={setSortOrder} 
          colores={colores} 
        />

        {/* Estado de carga y contador de productos */}
        <div className="mb-6">
          {isLoading ? (
            <div className="text-center py-4">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" 
                   style={{ color: colores.acento1 }}></div>
              <p className="mt-2 text-sm" style={{ color: colores.texto }}>Cargando productos...</p>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p className="text-sm" style={{ color: colores.texto }}>
                Mostrando {displayedProducts.length} productos
                {activeCategory !== 'todos' && ` en la categoría ${categories.find(c => c.id === activeCategory)?.nombre || activeCategory}`}
              </p>
              {displayedProducts.length > 0 && (
                <p className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: colores.pastelVerde, color: colores.texto }}>
                  {displayedProducts.filter(p => p.destacado).length} destacados
                </p>
              )}
            </div>
          )}
        </div>

        {/* Cuadrícula de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {displayedProducts.map((product, index) => (
            <ProductCard 
              key={product.id}
              product={product} 
              index={index} 
              isVisible={isVisible} 
              colores={colores} 
            />
          ))}
        </div>

        {/* Caso de no encontrar productos */}
        {!isLoading && displayedProducts.length === 0 && (
          <EmptyState setActiveCategory={setActiveCategory} colores={colores} />
        )}
      </div>

      {/* Sección de beneficios */}
      <BenefitsSection colores={colores} />

      {/* Sección de testimonios */}
      <Testimonios colores={colores} />

      {/* Sección CTA */}
      <CallToAction colores={colores} />
    </div>
  );
}