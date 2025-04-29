"use client"
import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/productos/HeroSection';
import ProductDescription from '@/components/productos/ProductDescription';
import FilterSortBar from '@/components/productos/FilterSortBar';
import ProductCard from '@/components/productos/ProductCard';
import EmptyState from '@/components/productos/EmptyState';
import BenefitsSection from '@/components/productos/BenefitsSection';
import TestimonialsSection from '@/components/productos/TestimonialsSection';
import CallToAction from '@/components/productos/CallToAction';
import { extractColorsFromPalette } from '@/utils/colorUtils';
import paletaColores from '@/data/paleta-colores.json';
import catalogoData from '@/data/productos.json';
import Footers from '@/components/layout/Footer';
import Testimonios from '@/components/testimonios/Testimonios';


export default function ProductosPage() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [sortOrder, setSortOrder] = useState('');
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Para manejo de carga
  
  // Extraer colores de la paleta
  const colores = extractColorsFromPalette(paletaColores);
  
  // Categorías para el filtro
  const categories = [
    { id: 'todos', nombre: 'Todos los productos' },
    ...catalogoData.categorias
  ];
  
  useEffect(() => {
    // Indicar que estamos cargando
    setIsLoading(true);
    
    // Pequeño retraso para asegurar que el DOM esté listo
    setTimeout(() => {
      try {
        // Obtener todos los productos del catálogo
        const allProducts = catalogoData.productos || [];
        console.log(`Total productos en catálogo: ${allProducts.length}`);
        
        // Filtrar por categoría si es necesario
        let filtered = activeCategory === 'todos' 
          ? allProducts 
          : allProducts.filter(product => product.categoria === activeCategory);
        
        console.log(`Productos filtrados para categoría ${activeCategory}: ${filtered.length}`);
        
        // Ordenar productos según la selección
        const sorted = [...filtered].sort((a, b) => {
          if (sortOrder === 'price-asc') return a.variantes[0].precio - b.variantes[0].precio;
          if (sortOrder === 'price-desc') return b.variantes[0].precio - a.variantes[0].precio;
          if (sortOrder === 'name') return a.nombre.localeCompare(b.nombre);
          if (sortOrder === 'destacados') return (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0);
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
      } finally {
        setIsLoading(false);
      }
    }, 100);
  }, [activeCategory, sortOrder]);

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
      {/* <Footers/> */}
    </div>
  );
}