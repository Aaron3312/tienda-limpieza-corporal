'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { getProductos, getCategorias } from '@/services/firestore';
import { getImageSrc } from '@/lib/utils';
import { useSiteData } from '@/context/SiteDataContext';
import { Producto, Categoria } from '@/types';

function ProductCard({ p, categorias }: { p: Producto; categorias: Categoria[] }) {
  const { C } = useSiteData();
  const catName = categorias.find(c => c.id === p.categoria)?.nombre ?? p.categoria;

  return (
    <Link href={`/productos/${p.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white
                 transition-shadow duration-300 hover:shadow-xl">
      <div className="relative overflow-hidden aspect-[4/3]" style={{ backgroundColor: C.muted }}>
        <Image src={getImageSrc(p.imagen)} alt={p.nombre} fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
        {p.destacado && (
          <div className="absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
            style={{ backgroundColor: C.sage, color: C.dark }}>
            Favorito
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <p className="text-[10px] uppercase tracking-[0.2em] mb-1 font-semibold"
          style={{ color: C.green }}>{catName}</p>
        <h3 className="font-serif font-semibold text-base leading-snug mb-1"
          style={{ color: C.dark }}>{p.nombre}</h3>
        <p className="text-xs leading-relaxed line-clamp-2 flex-1"
          style={{ color: C.body }}>{p.descripcion}</p>

        <div className="flex items-center justify-end mt-4 pt-4 border-t"
          style={{ borderColor: '#eee' }}>
          <span className="text-xs font-semibold flex items-center gap-1 transition-all duration-300 group-hover:gap-2"
            style={{ color: C.green }}>
            Ver más →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ProductosPage() {
  const { C } = useSiteData();
  const [active, setActive] = useState('todos');
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([getProductos(), getCategorias()]).then(([prods, cats]) => {
      setProductos(prods);
      setCategorias(cats);
      setLoading(false);
    });
  }, []);

  const CATS = [{ id: 'todos', nombre: 'Todos' }, ...categorias];
  const products = active === 'todos' ? productos : productos.filter(p => p.categoria === active);

  useEffect(() => {
    gsap.fromTo([headerRef.current],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' });
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.prod-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.06 });
  }, [active, productos]);

  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div ref={headerRef}
        className="px-6 sm:px-14 lg:px-20 xl:px-24 pt-14 sm:pt-20 pb-10 sm:pb-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ backgroundColor: C.green }} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em]"
              style={{ color: C.green }}>Catálogo completo</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h1 className="font-serif font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', color: C.dark }}>
              Nuestros productos
            </h1>
            <p className="text-sm max-w-xs sm:text-right" style={{ color: C.body }}>
              {productos.length} productos artesanales,<br className="hidden sm:block" /> 100% naturales
            </p>
          </div>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className="sticky top-16 z-30 border-b"
        style={{ backgroundColor: C.bg, borderColor: 'rgba(0,0,0,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-14 lg:px-20 xl:px-24">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-3">
            {CATS.map(cat => (
              <button key={cat.id} onClick={() => setActive(cat.id)}
                className="shrink-0 px-4 py-2 rounded-full text-xs font-semibold
                           uppercase tracking-[0.18em] transition-all duration-250"
                style={{
                  backgroundColor: active === cat.id ? C.dark : 'transparent',
                  color:           active === cat.id ? '#fff'  : C.body,
                  border: `1px solid ${active === cat.id ? C.dark : 'rgba(0,0,0,0.14)'}`,
                }}>
                {cat.nombre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-14 lg:px-20 xl:px-24 py-10 sm:py-14">

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2"
              style={{ borderColor: C.dark }} />
          </div>
        ) : (
          <>
            <p className="text-xs mb-8 font-medium" style={{ color: '#bbb' }}>
              {products.length} {products.length === 1 ? 'producto' : 'productos'}
              {active !== 'todos' && ` · ${CATS.find(c => c.id === active)?.nombre}`}
            </p>

            <div ref={gridRef}
              className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {products.map(p => (
                <div key={p.id} className="prod-card">
                  <ProductCard p={p} categorias={categorias} />
                </div>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-24">
                <p className="font-serif text-xl mb-2" style={{ color: C.dark }}>Sin productos</p>
                <p className="text-sm mb-6" style={{ color: C.body }}>No hay productos en esta categoría.</p>
                <button onClick={() => setActive('todos')}
                  className="px-6 py-3 rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: C.dark }}>
                  Ver todos
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
