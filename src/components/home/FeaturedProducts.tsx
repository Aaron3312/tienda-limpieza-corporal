'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { C } from './constants';
import { getProductosDestacados, getCategorias } from '@/services/firestore';
import { getImageSrc } from '@/lib/utils';
import { Producto, Categoria } from '@/types';

function ProductCard({ product, categorias, className = '' }: { product: Producto; categorias: Categoria[]; className?: string }) {
  const catName = categorias.find(c => c.id === product.categoria)?.nombre ?? product.categoria;

  return (
    <Link href={`/productos/${product.id}`}
      className={`product-card group flex flex-col overflow-hidden rounded-3xl ${className}`}>
      <div className="flex-1 min-h-0 relative overflow-hidden" style={{ backgroundColor: C.muted }}>
        <Image src={getImageSrc(product.imagen)} alt={product.nombre} fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
        {product.destacado && (
          <div className="absolute top-4 left-4 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider"
            style={{ backgroundColor: C.sage, color: C.dark }}>
            Favorito
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.06] transition-colors duration-500" />
      </div>
      <div className="flex-shrink-0 px-4 py-4" style={{ backgroundColor: C.bg }}>
        <p className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: C.green }}>{catName}</p>
        <h3 className="font-serif text-base font-semibold leading-snug" style={{ color: C.dark }}>{product.nombre}</h3>
        <p className="text-xs mt-1 line-clamp-1 leading-relaxed" style={{ color: '#999' }}>{product.descripcion}</p>
        <div className="flex items-center gap-1.5 mt-2.5">
          <span className="text-xs font-semibold" style={{ color: C.dark }}>Ver detalles</span>
          <span className="text-xs inline-block transition-transform duration-300 group-hover:translate-x-1"
            style={{ color: C.green }}>→</span>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const [featured, setFeatured] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    Promise.all([getProductosDestacados(), getCategorias()]).then(([prods, cats]) => {
      setFeatured(prods.slice(0, 3));
      setCategorias(cats);
    });
  }, []);

  useEffect(() => {
    if (featured.length === 0) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo('.product-card',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.products-grid', start: 'top 82%' } });

      gsap.fromTo('.reveal-up-products',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 88%' } });
    }, sectionRef);

    return () => ctx.revert();
  }, [featured]);

  return (
    <section ref={sectionRef} className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: C.bg }}>

      {/* header */}
      <div className="flex-shrink-0 flex items-end justify-between
                      px-6 sm:px-14 lg:px-20 xl:px-24 pt-8 sm:pt-10 pb-4 sm:pb-6">
        <div className="reveal-up-products">
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] mb-1.5 sm:mb-2"
            style={{ color: C.green }}>Lo más amado</p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold"
            style={{ color: C.dark }}>Productos destacados</h2>
        </div>
        <Link href="/productos"
          className="reveal-up-products shrink-0 inline-flex items-center gap-1.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold border-2 transition-all duration-300 hover:bg-[#1C2B12] hover:text-white"
          style={{ borderColor: C.dark, color: C.dark }}>
          Ver todo →
        </Link>
      </div>

      {/* mobile: horizontal snap carousel */}
      <div className="sm:hidden flex-1 min-h-0 overflow-x-auto snap-x snap-mandatory flex gap-3 px-6 pb-6 scrollbar-hide">
        {featured.map(product => (
          <div key={product.id} className="snap-center flex-shrink-0 flex flex-col min-h-0"
            style={{ width: '78vw' }}>
            <ProductCard product={product} categorias={categorias} className="h-full" />
          </div>
        ))}
        <div className="flex-shrink-0 w-6" />
      </div>

      {/* desktop: 3-column grid */}
      <div className="products-grid hidden sm:grid grid-cols-3 gap-5 flex-1 min-h-0
                      px-14 lg:px-20 xl:px-24 pb-8 lg:pb-10">
        {featured.map(product => (
          <ProductCard key={product.id} product={product} categorias={categorias} className="h-full" />
        ))}
      </div>
    </section>
  );
}
