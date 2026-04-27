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
import { getProductosPorCategoria, getCategorias, getColores } from '@/services/firestore';
import { Categoria, Colores, Producto } from '@/types';

const DEFAULT_COLORES: Partial<Colores> = {
  textoOscuro: '#333333',
  textoClaro: '#ffffff',
  texto: '#4a4a4a',
  acento1: '#f2bae0',
  acento2: '#cba3d7',
  primario: '#aad585',
  secundario: '#68dad6',
  fondo: '#f8f9fa',
  pastelVerde: '#c8e6c9',
};

export default function CategoryPage() {
  const router = useRouter();
  const { categoryId } = useParams();
  const [sortOrder, setSortOrder] = useState('');
  const [displayedProducts, setDisplayedProducts] = useState<Producto[]>([]);
  const [allProducts, setAllProducts] = useState<Producto[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<Categoria | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [colores, setColores] = useState<Colores>(DEFAULT_COLORES as Colores);

  useEffect(() => {
    getColores().then(c => { if (c) setColores(c); });
    getCategorias().then(cats => setCategorias(cats));
  }, []);

  useEffect(() => {
    if (!categoryId) return;
    setIsLoading(true);
    const id = categoryId as string;
    Promise.all([getCategorias(), getProductosPorCategoria(id)]).then(([cats, prods]) => {
      setCategory(cats.find(c => c.id === id) ?? null);
      setAllProducts(prods);
      setIsLoading(false);
      setIsVisible(true);
    });
  }, [categoryId]);

  useEffect(() => {
    const sorted = [...allProducts].sort((a, b) => {
      if (sortOrder === 'price-asc') return (a.variantes[0]?.precio ?? 0) - (b.variantes[0]?.precio ?? 0);
      if (sortOrder === 'price-desc') return (b.variantes[0]?.precio ?? 0) - (a.variantes[0]?.precio ?? 0);
      if (sortOrder === 'name') return a.nombre.localeCompare(b.nombre);
      return (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0);
    });
    setDisplayedProducts(sorted);
  }, [allProducts, sortOrder]);

  const textColors = {
    ...colores,
    texto: '#333333',
    textoOscuro: '#222222',
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colores.fondo }}>
      <HeroSection colores={colores} categoryTitle={category?.nombre} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <nav className="flex text-black">
            <button onClick={() => router.push('/')} className="hover:underline text-black">Inicio</button>
            <span className="mx-2 text-black">/</span>
            <button onClick={() => router.push('/productos')} className="hover:underline text-black">Productos</button>
            <span className="mx-2 text-black">/</span>
            <span className="font-semibold text-black">{category?.nombre || categoryId}</span>
          </nav>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-4 text-black">
            {category?.nombre || categoryId}
          </h1>
          {category?.descripcion && (
            <p className="text-lg text-black">{category.descripcion}</p>
          )}
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold mb-4 sm:mb-0 text-black">
              Productos en esta categoría
            </h2>
            <div className="flex items-center">
              <label htmlFor="sort-order" className="mr-2 text-black">Ordenar por:</label>
              <select
                id="sort-order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border border-gray-300 rounded p-2 text-black"
                style={{ backgroundColor: 'white' }}
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

        <div className="mb-6">
          {isLoading ? (
            <div className="text-center py-4">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
                style={{ color: colores.acento1 }}></div>
              <p className="mt-2 text-sm text-black font-medium">Cargando productos...</p>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p className="text-sm text-black">Mostrando {displayedProducts.length} productos</p>
              {displayedProducts.length > 0 && (
                <p className="text-xs px-2 py-1 rounded-full text-black"
                  style={{ backgroundColor: colores.pastelVerde }}>
                  {displayedProducts.filter(p => p.destacado).length} destacados
                </p>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {displayedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isVisible={isVisible}
              colores={textColors}
            />
          ))}
        </div>

        {!isLoading && displayedProducts.length === 0 && (
          <EmptyState
            setActiveCategory={() => router.push('/productos')}
            colores={textColors}
          />
        )}
      </div>

      <BenefitsSection colores={textColors} />
      <TestimonialsSection colores={textColors} />
      <CallToAction colores={textColors} />
    </div>
  );
}
