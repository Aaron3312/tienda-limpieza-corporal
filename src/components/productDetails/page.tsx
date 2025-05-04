"use client"
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { extractColorsFromPalette } from '@/utils/colorUtils';
import paletaColores from '@/data/paleta-colores.json';
import catalogoData from '@/data/productos.json';
import BenefitsSection from '@/components/productos/BenefitsSection';
import TestimonialsSection from '@/components/productos/TestimonialsSection';
import CallToAction from '@/components/productos/CallToAction';

export default function ProductDetailsPage() {
  const router = useRouter();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedVariety, setSelectedVariety] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Extraer colores de la paleta
  const colores = extractColorsFromPalette(paletaColores);

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

  const handleAddToCart = () => {
    // Aquí agregamos la lógica para añadir al carrito
    // Por ejemplo, usando un contexto o servicio de carrito
    alert(`Añadido al carrito: ${product.nombre} - ${selectedVariant.nombre} - ${selectedVariety || 'Sin variedad'} - Cantidad: ${quantity}`);
  };

  const handleGoBack = () => {
    router.back();
  };

  const getCategoryName = (categoryId) => {
    const category = catalogoData.categorias.find(c => c.id === categoryId);
    return category ? category.nombre : categoryId;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colores.fondo }}>
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" style={{ color: colores.acento1 }}></div>
        <p className="ml-4" style={{ color: colores.texto }}>Cargando producto...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: colores.fondo }}>
        <h1 className="text-3xl font-bold mb-4" style={{ color: colores.textoOscuro }}>{error || 'Producto no encontrado'}</h1>
        <p className="mb-6" style={{ color: colores.texto }}>Lo sentimos, no pudimos encontrar el producto que estás buscando.</p>
        <button 
          onClick={handleGoBack}
          className="px-6 py-2 rounded-md font-medium"
          style={{ backgroundColor: colores.acento1, color: colores.textoOscuro }}
        >
          Volver a Productos
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colores.fondo }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex" style={{ color: colores.textoOscuro }}>
          <button onClick={() => router.push('/')} className="hover:underline">Inicio</button>
          <span className="mx-2">/</span>
          <button onClick={() => router.push('/productos')} className="hover:underline">Productos</button>
          <span className="mx-2">/</span>
          <button onClick={() => router.push(`/productos/categorias/${product.categoria}`)} className="hover:underline">
            {getCategoryName(product.categoria)}
          </button>
          <span className="mx-2">/</span>
          <span className="font-semibold">{product.nombre}</span>
        </nav>
      </div>

      {/* Detalles del producto */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Columna Izquierda - Imagen */}
          <div className="relative h-96 md:h-full rounded-xl overflow-hidden shadow-lg">
            <Image 
              src={product.imagen || '/images/placeholder.png'} 
              alt={product.nombre}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 hover:scale-105"
            />
            {product.destacado && (
              <div 
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium" 
                style={{ backgroundColor: colores.acento2, color: colores.textoClaro }}
              >
                Destacado
              </div>
            )}
          </div>

          {/* Columna Derecha - Información */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-2" style={{ color: colores.textoOscuro }}>{product.nombre}</h1>
            <div className="mb-4 px-3 py-1 rounded-full inline-block w-fit text-sm" style={{ backgroundColor: colores.primario, color: colores.textoOscuro }}>
              {getCategoryName(product.categoria)}
            </div>
            <p className="mb-6 text-lg" style={{ color: colores.texto }}>{product.descripcion}</p>

            {/* Selección de variante */}
            {product.variantes && product.variantes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2" style={{ color: colores.textoOscuro }}>Presentación:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variantes.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => handleVariantChange(variant)}
                      className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                        selectedVariant?.id === variant.id ? 'border-transparent' : 'border-gray-300'
                      }`}
                      style={{ 
                        backgroundColor: selectedVariant?.id === variant.id ? colores.secundario : 'transparent',
                        color: selectedVariant?.id === variant.id ? colores.textoOscuro : colores.textoOscuro
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
                <h3 className="text-lg font-medium mb-2" style={{ color: colores.textoOscuro }}>Variedad:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variedades.map((variety) => (
                    <button
                      key={variety}
                      onClick={() => handleVarietyChange(variety)}
                      className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                        selectedVariety === variety ? 'border-transparent' : 'border-gray-300'
                      }`}
                      style={{ 
                        backgroundColor: selectedVariety === variety ? colores.acento1 : 'transparent',
                        color: colores.textoOscuro
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
                <div className="flex items-center">
                  <label htmlFor="quantity" className="mr-2" style={{ color: colores.textoOscuro }}>Cantidad:</label>
                  <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    className="w-16 px-3 py-2 border border-gray-300 rounded-md text-center"
                    style={{ color: colores.textoOscuro }}
                  />
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-colors"
                  style={{ backgroundColor: colores.primario, color: colores.textoOscuro }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                    <path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  Añadir al carrito
                </button>
              </div>
            </div>

            {/* Información adicional */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2" style={{ color: colores.textoOscuro }}>Detalles:</h3>
                  <ul className="list-disc list-inside space-y-1" style={{ color: colores.texto }}>
                    <li>Producto 100% natural</li>
                    <li>Elaborado artesanalmente</li>
                    <li>Libre de químicos nocivos</li>
                    <li>No testado en animales</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2" style={{ color: colores.textoOscuro }}>Beneficios:</h3>
                  <ul className="list-disc list-inside space-y-1" style={{ color: colores.texto }}>
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
          <h2 className="text-2xl font-bold mb-6" style={{ color: colores.textoOscuro }}>Productos relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((related) => (
              <div key={related.id} className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-105">
                <div className="relative h-48">
                  <Image 
                    src={related.imagen || '/images/placeholder.png'} 
                    alt={related.nombre}
                    layout="fill"
                    objectFit="cover"
                  />
                  {related.destacado && (
                    <div 
                      className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium" 
                      style={{ backgroundColor: colores.acento2, color: colores.textoClaro }}
                    >
                      Destacado
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-1" style={{ color: colores.textoOscuro }}>{related.nombre}</h3>
                  <p className="text-sm mb-2 line-clamp-2" style={{ color: colores.texto }}>{related.descripcion}</p>
                  <div className="flex justify-between items-center">

                    <button 
                      onClick={() => router.push(`/productos/${related.id}`)}
                      className="px-3 py-1 rounded text-sm font-medium"
                      style={{ backgroundColor: colores.primario, color: colores.textoOscuro }}
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
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