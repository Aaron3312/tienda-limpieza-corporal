'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, LayoutGroup, type Variants } from 'framer-motion';
import { getProductos, getCategorias } from '@/services/firestore';
import { getImageSrc } from '@/lib/utils';
import { useSiteData } from '@/context/SiteDataContext';
import { Producto, Categoria } from '@/types';

// ── Skeleton card ──────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-[4/3] rounded-2xl bg-zinc-200 overflow-hidden">
        <div className="h-full w-full animate-pulse bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-200 bg-[length:200%_100%]" />
      </div>
      <div className="space-y-2 px-1">
        <div className="h-2.5 w-1/3 rounded-full bg-zinc-200 animate-pulse" />
        <div className="h-3.5 w-2/3 rounded-full bg-zinc-200 animate-pulse" />
        <div className="h-2.5 w-full rounded-full bg-zinc-200 animate-pulse" />
      </div>
    </div>
  );
}

// ── Product card ───────────────────────────────────────────────────────────────
function ProductCard({ p, catName }: { p: Producto; catName: string }) {
  const { C } = useSiteData();

  return (
    <Link href={`/productos/${p.id}`} className="group block">
      {/* Image container */}
      <div
        className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4"
        style={{ backgroundColor: C.muted }}
      >
        <Image
          src={getImageSrc(p.imagen)}
          alt={p.nombre}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />

        {/* Subtle dark vignette — always */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {/* Category badge */}
        <div
          className="absolute top-3 left-3 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(255,255,255,0.88)', color: C.green }}
        >
          {catName}
        </div>

        {/* Destacado badge */}
        {p.destacado && (
          <div
            className="absolute top-3 right-3 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider"
            style={{ backgroundColor: C.sage, color: C.dark }}
          >
            Favorito
          </div>
        )}

        {/* Hover overlay with CTA */}
        <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] bg-white/95 rounded-full px-4 py-2"
            style={{ color: C.dark }}
          >
            Ver producto →
          </span>
        </div>
      </div>

      {/* Text below image */}
      <div className="px-1">
        <h3
          className="font-serif font-semibold text-sm leading-snug mb-1.5 group-hover:opacity-70 transition-opacity duration-200"
          style={{ color: C.dark }}
        >
          {p.nombre}
        </h3>
        <p
          className="text-xs leading-relaxed line-clamp-2"
          style={{ color: C.body }}
        >
          {p.descripcion}
        </p>
      </div>
    </Link>
  );
}

// ── Stagger variants ───────────────────────────────────────────────────────────
const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 130, damping: 22 },
  },
};

// ── Page ───────────────────────────────────────────────────────────────────────
export default function ProductosPage() {
  const { C } = useSiteData();
  const [active, setActive] = useState('todos');
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProductos(), getCategorias()]).then(([prods, cats]) => {
      setProductos(prods);
      setCategorias(cats);
      setLoading(false);
    });
  }, []);

  const CATS = [{ id: 'todos', nombre: 'Todos' }, ...categorias];
  const catMap: Record<string, string> = {};
  categorias.forEach(c => { catMap[c.id] = c.nombre; });
  const products = active === 'todos' ? productos : productos.filter(p => p.categoria === active);

  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100dvh' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="px-6 sm:px-14 lg:px-20 xl:px-24 pt-16 sm:pt-24 pb-10 sm:pb-14"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ backgroundColor: C.green }} />
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.28em]"
                style={{ color: C.green }}
              >
                Catálogo completo
              </span>
            </div>
            <h1
              className="font-serif font-bold leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', color: C.dark }}
            >
              Nuestros<br />productos
            </h1>
          </div>

          {!loading && (
            <div className="text-sm sm:text-right shrink-0" style={{ color: C.body }}>
              <span className="font-semibold" style={{ color: C.dark }}>{productos.length}</span>
              <span className="ml-1">productos</span>
              <span className="block text-[10px] uppercase tracking-[0.2em] mt-0.5" style={{ color: C.green }}>
                100% naturales · artesanales
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* ── Filter bar ────────────────────────────────────────────────────── */}
      <div
        className="sticky top-16 z-30 border-b"
        style={{ backgroundColor: C.bg, borderColor: 'rgba(0,0,0,0.07)' }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-14 lg:px-20 xl:px-24">
          <LayoutGroup>
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide py-3">
              {CATS.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className="relative shrink-0 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-200"
                  style={{ color: active === cat.id ? '#fff' : C.body }}
                >
                  {active === cat.id && (
                    <motion.div
                      layoutId="cat-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: C.dark }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat.nombre}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>
      </div>

      {/* ── Grid ──────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-14 lg:px-20 xl:px-24 py-10 sm:py-14">

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center py-28"
          >
            <p className="font-serif text-2xl font-semibold mb-2" style={{ color: C.dark }}>
              Sin productos
            </p>
            <p className="text-sm mb-8" style={{ color: C.body }}>
              No hay productos en esta categoría.
            </p>
            <button
              onClick={() => setActive('todos')}
              className="px-8 py-3.5 rounded-full text-sm font-semibold text-white active:scale-[0.98] transition-transform"
              style={{ backgroundColor: C.dark }}
            >
              Ver todos
            </button>
          </motion.div>
        ) : (
          <>
            <p className="text-xs mb-8 tabular-nums" style={{ color: '#c0b8b0' }}>
              {products.length} {products.length === 1 ? 'producto' : 'productos'}
              {active !== 'todos' && ` · ${CATS.find(c => c.id === active)?.nombre}`}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                variants={gridVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
              >
                {products.map(p => (
                  <motion.div key={p.id} variants={cardVariants}>
                    <ProductCard p={p} catName={catMap[p.categoria] || p.categoria} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}
