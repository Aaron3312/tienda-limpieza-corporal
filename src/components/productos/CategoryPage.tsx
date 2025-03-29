"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import HeroSection from '@/components/productos/HeroSection';
import FilterSortBar from '@/components/productos/FilterSortBar';
import ProductCard from '@/components/productos/ProductCard';
import EmptyState from '@/components/productos/EmptyState';
import BenefitsSection from '@/components/productos/BenefitsSection';
import TestimonialsSection from '@/components/productos/TestimonialsSection';
import CallToAction from '@/components/productos/CallToAction';
import { extractColorsFromPalette } from '@/utils/colorUtils';
import paletaColores from '@/data/paleta-colores.json';
import catalogoData from '@/data/productos.json';

export default function CategoryPage() {
  const router = useRouter();
  const { categoryId } = useParams();
  const [sortOrder, setSortOrder] = useState('');
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(null);
  
  // Extraer colores de la paleta
  const colores = extractColorsFromPalette(paletaColores);
  
  // Categorías para el filtro
  const categories = [
    { id: 'todos', nombre: 'Todos los productos' },
    ...catalogoData.categorias
  ];
  
  useEffect(() => {
    if (!categoryId) return;
    
    // Buscar la categoría en el catálogo
    const foundCategory = catalogoData.categorias.find(c => c.id === categoryId);
    setCategory(foundCategory);
    
    // Indicar que estamos cargando
    setIsLoading(true);
    
    // Pequeño retraso para asegurar que el DOM esté listo
    setTimeout(() => {
      try {
        // Obtener todos los productos del catálogo
        const allProducts = catalogoData.productos || [];
        
        // Filtrar por la categoría actual
        const filtered = allProducts.filter(product => product.categoria === categoryId);
        
        console.log(`Productos filtrados para categoría ${categoryId}: ${filtered.length}`);
        
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
  }, [categoryId, sortOrder]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: colores.fondo }}>
      {/* Hero section */}
      <HeroSection colores={colores} categoryTitle={category?.nombre} />

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex" style={{ color: colores.textoOscuro }}>
            <button onClick={() => router.push('/')} className="hover:underline">Inicio</button>
            <span className="mx-2">/</span>
            <button onClick={() => router.push('/productos')} className="hover:underline">Productos</button>
            <span className="mx-2">/</span>
            <span className="font-semibold">{category?.nombre || categoryId}</span>
          </nav>
        </div>

        {/* Descripción de la categoría */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-4" style={{ color: colores.textoOscuro }}>
            {category?.nombre || categoryId}
          </h1>
          {category?.descripcion && (
            <p className="text-lg" style={{ color: colores.texto }}>
              {category.descripcion}
            </p>
          )}
        </div>

        {/* Ordenación */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold mb-4 sm:mb-0" style={{ color: colores.textoOscuro }}>
              Productos en esta categoría
            </h2>
            <div className="flex items-center">
              <label htmlFor="sort-order" className="mr-2" style={{ color: colores.texto }}>
                Ordenar por:
              </label>
              <select
                id="sort-order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border border-gray-300 rounded p-2"
                style={{ color: colores.textoOscuro }}
              >
                <option value="">Relevancia</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name">Nombre</option>
                <option value="destacados">Destacados</option>
              </select>
            </div>
          </div>
        </div>

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
          <EmptyState setActiveCategory={() => router.push('/productos')} colores={colores} />
        )}
      </div>

      {/* Sección de beneficios */}
      <BenefitsSection colores={colores} />

      {/* Sección de testimonios */}
      <TestimonialsSection colores={colores} />

      {/* Sección CTA */}
      <CallToAction colores={colores} />
    </div>
  );
}