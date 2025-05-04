"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { extractColorsFromPalette } from '@/utils/colorUtils';
import paletaColores from '@/data/paleta-colores.json';
import catalogoData from '@/data/productos.json';
import BenefitsSection from '@/components/productos/BenefitsSection';
import TestimonialsSection from '@/components/productos/TestimonialsSection';
import CallToAction from '@/components/productos/CallToAction';

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.productId;
  
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedVariety, setSelectedVariety] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Extraer colores de la paleta
  const colores = extractColorsFromPalette(paletaColores);
  
  // Definir colores por defecto para los textos en caso de que no estén bien definidos
  const textColors = {
    textoOscuro: colores.textoOscuro || '#333333',
    textoClaro: colores.textoClaro || '#ffffff',
    texto: colores.texto || '#4a4a4a',
    acento1: colores.acento1 || '#f2bae0',
    acento2: colores.acento2 || '#cba3d7',
    primario: colores.primario || '#aad585',
    secundario: colores.secundario || '#68dad6',
    fondo: colores.fondo || '#f8f9fa'
  };

  useEffect(() => {
    if (!productId) return;

    try {
      // Buscar el producto en el catálogo
      const foundProduct = catalogoData.productos.find(p => p.id === productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
        // Establecer la primera variante como seleccionada por defecto
        if (foundProduct.variantes && foundProduct.variantes.length > 0) {
          setSelectedVariant(foundProduct.variantes[0]);
        }
        // Establecer la primera variedad como seleccionada por defecto
        if (foundProduct.variedades && foundProduct.variedades.length > 0) {
          setSelectedVariety(foundProduct.variedades[0]);
        }

        // Buscar productos relacionados (misma categoría)
        const related = catalogoData.productos
          .filter(p => p.categoria === foundProduct.categoria && p.id !== productId)
          .slice(0, 3); // Limitar a 3 productos relacionados
        setRelatedProducts(related);
      } else {
        setError('Producto no encontrado');
      }
    } catch (err) {
      console.error('Error al cargar el producto:', err);
      setError('Error al cargar los detalles del producto');
    } finally {
      setLoading(false);
    }
  }, [productId]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  const handleVarietyChange = (variety) => {
    setSelectedVariety(variety);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const getCategoryName = (categoryId) => {
    const category = catalogoData.categorias.find(c => c.id === categoryId);
    return category ? category.nombre : categoryId;
  };

  // Componente para manejar imágenes con fallback
  const ProductImage = ({ src, alt }) => {
    const [imgSrc, setImgSrc] = useState(src || '/images/placeholder-product.png');
    
    return (
      <div className="relative w-full h-full">
        <img 
          src={imgSrc}
          alt={alt} 
          className="w-full h-full object-cover object-center"
          onError={() => setImgSrc('/images/placeholder-product.png')}
        />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: textColors.fondo }}>
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" style={{ color: textColors.acento1 }}></div>
        <p className="ml-4 text-black font-medium">Cargando producto...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: textColors.fondo }}>
        <h1 className="text-3xl font-bold mb-4 text-black">{error || 'Producto no encontrado'}</h1>
        <p className="mb-6 text-black">Lo sentimos, no pudimos encontrar el producto que estás buscando.</p>
        <button 
          onClick={handleGoBack}
          className="px-6 py-2 rounded-md font-medium text-black"
          style={{ backgroundColor: textColors.acento1 }}
        >
          Volver a Productos
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: textColors.fondo }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex text-black">
          <Link href="/" className="hover:underline">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/productos" className="hover:underline">Productos</Link>
          <span className="mx-2">/</span>
          <Link href={`/productos/categorias/${product.categoria}`} className="hover:underline">
            {getCategoryName(product.categoria)}
          </Link>
          <span className="mx-2">/</span>
          <span className="font-semibold">{product.nombre}</span>
        </nav>
      </div>

      {/* Detalles del producto */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Columna Izquierda - Imagen */}
          <div className="relative h-96 md:h-auto rounded-xl overflow-hidden shadow-lg bg-white">
            <ProductImage 
              src={product.imagen} 
              alt={product.nombre}
            />
            {product.destacado && (
              <div 
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium" 
                style={{ backgroundColor: textColors.acento2, color: textColors.textoClaro }}
              >
                Destacado
              </div>
            )}
          </div>

          {/* Columna Derecha - Información */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-2 text-black">{product.nombre}</h1>
            <div className="mb-4 px-3 py-1 rounded-full inline-block w-fit text-sm text-black" 
                 style={{ backgroundColor: textColors.primario }}>
              {getCategoryName(product.categoria)}
            </div>
            <p className="mb-6 text-lg text-black">{product.descripcion}</p>

            {/* Selección de variante */}
            {product.variantes && product.variantes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2 text-black">Presentación:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variantes.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => handleVariantChange(variant)}
                      className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                        selectedVariant?.id === variant.id ? 'border-transparent text-black' : 'border-gray-300 text-black'
                      }`}
                      style={{ 
                        backgroundColor: selectedVariant?.id === variant.id ? textColors.secundario : 'transparent'
                      }}
                    >
                      {variant.nombre}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selección de variedad/aroma */}
            {product.variedades && product.variedades.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2 text-black">Variedad:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variedades.map((variety) => (
                    <button
                      key={variety}
                      onClick={() => handleVarietyChange(variety)}
                      className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors text-black ${
                        selectedVariety === variety ? 'border-transparent' : 'border-gray-300'
                      }`}
                      style={{ 
                        backgroundColor: selectedVariety === variety ? textColors.acento1 : 'transparent'
                      }}
                    >
                      {variety}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Precio y cantidad */}
            <div className="mb-8">
              <div className="flex items-baseline gap-2 mb-4">
              </div>

              <div className="flex items-center gap-6">


              </div>
            </div>

            {/* Información adicional */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2 text-black">Detalles:</h3>
                  <ul className="list-disc list-inside space-y-1 text-black">
                    <li>Producto 100% natural</li>
                    <li>Elaborado artesanalmente</li>
                    <li>Libre de químicos nocivos</li>
                    <li>No testado en animales</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2 text-black">Beneficios:</h3>
                  <ul className="list-disc list-inside space-y-1 text-black">
                    <li>Cuida tu piel y tu salud</li>
                    <li>Respeta el medio ambiente</li>
                    <li>Productos de larga duración</li>
                    <li>Apoya a emprendedores locales</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold mb-6 text-black">Productos relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((related) => (
              <Link href={`/productos/${related.id}`} key={related.id} className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-105 block">
                <div className="relative h-48">
                  <ProductImage 
                    src={related.imagen} 
                    alt={related.nombre}
                  />
                  {related.destacado && (
                    <div 
                      className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium" 
                      style={{ backgroundColor: textColors.acento2, color: textColors.textoClaro }}
                    >
                      Destacado
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-1 text-black">{related.nombre}</h3>
                  <p className="text-sm mb-2 line-clamp-2 text-black">{related.descripcion}</p>
                  <div className="flex justify-between items-center">
                    <span 
                      className="px-3 py-1 rounded text-sm font-medium text-black"
                      style={{ backgroundColor: textColors.primario }}
                    >
                      Ver detalles
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Secciones adicionales */}
      <BenefitsSection colores={colores} />
      <TestimonialsSection colores={colores} />
      <CallToAction colores={colores} />
    </div>
  );
}