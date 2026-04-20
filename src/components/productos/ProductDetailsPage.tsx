'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import catalogoData from '@/data/productos.json';

const C = {
  bg:    '#F7F4EF',
  dark:  '#1C2B12',
  green: '#5C7A3E',
  sage:  '#aad585',
  muted: '#EDE8DF',
  body:  '#5A5A5A',
};

type Product = typeof catalogoData.productos[0];
type Variante = Product['variantes'][0];

export default function ProductDetailsPage() {
  const router   = useRouter();
  const params   = useParams();
  const ref      = useRef<HTMLDivElement>(null);

  const [product,       setProduct]       = useState<Product | null>(null);
  const [selectedVar,   setSelectedVar]   = useState<Variante | null>(null);
  const [selectedVty,   setSelectedVty]   = useState<string | null>(null);
  const [related,       setRelated]       = useState<Product[]>([]);
  const [imgError,      setImgError]      = useState(false);

  useEffect(() => {
    const id = params?.productId as string;
    if (!id) return;
    const found = catalogoData.productos.find(p => p.id === id) ?? null;
    setProduct(found);
    if (found) {
      setSelectedVar(found.variantes[0] ?? null);
      setSelectedVty(found.variedades[0] ?? null);
      setRelated(
        catalogoData.productos.filter(p => p.categoria === found.categoria && p.id !== id).slice(0, 3)
      );
    }
  }, [params]);

  useEffect(() => {
    if (!product || !ref.current) return;
    gsap.fromTo('.pd-in',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.05 });
  }, [product]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: C.bg }}>
      <div className="text-center">
        <p className="font-serif text-xl mb-4" style={{ color: C.dark }}>Producto no encontrado</p>
        <Link href="/productos" className="text-sm underline" style={{ color: C.green }}>← Ver todos los productos</Link>
      </div>
    </div>
  );

  const catName = catalogoData.categorias.find(c => c.id === product.categoria)?.nombre ?? product.categoria;
  const imgSrc  = imgError ? '/images/shared/placeholder-product.png' : product.imagen;

  return (
    <div ref={ref} style={{ backgroundColor: C.bg, minHeight: '100vh' }}>

      {/* ── breadcrumb ── */}
      <nav className="pd-in px-6 sm:px-14 lg:px-20 xl:px-24 pt-6 pb-0
                      flex items-center gap-2 text-[11px] font-medium"
        style={{ color: 'rgba(0,0,0,0.35)' }}>
        <Link href="/" className="hover:underline">Inicio</Link>
        <span>/</span>
        <Link href="/productos" className="hover:underline">Productos</Link>
        <span>/</span>
        <span style={{ color: C.dark }}>{product.nombre}</span>
      </nav>

      {/* ── main: image + info ── */}
      <section className="px-6 sm:px-14 lg:px-20 xl:px-24 pt-10 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">

          {/* image */}
          <div className="pd-in lg:sticky lg:top-24 rounded-3xl overflow-hidden shadow-xl
                          aspect-square relative"
            style={{ backgroundColor: C.muted }}>
            <Image src={imgSrc} alt={product.nombre} fill
              className="object-cover" onError={() => setImgError(true)} />
            {product.destacado && (
              <div className="absolute top-5 left-5 rounded-full px-3 py-1.5
                              text-[10px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: C.sage, color: C.dark }}>
                Favorito
              </div>
            )}
          </div>

          {/* info */}
          <div className="flex flex-col">
            <p className="pd-in text-[10px] font-semibold uppercase tracking-[0.24em] mb-3"
              style={{ color: C.green }}>{catName}</p>

            <h1 className="pd-in font-serif font-bold leading-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: C.dark }}>
              {product.nombre}
            </h1>

            <p className="pd-in text-base leading-relaxed mb-8" style={{ color: C.body }}>
              {product.descripcion}
            </p>

            {/* variantes */}
            {product.variantes.length > 1 && (
              <div className="pd-in mb-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-3"
                  style={{ color: C.green }}>Presentación</p>
                <div className="flex flex-wrap gap-2">
                  {product.variantes.map(v => (
                    <button key={v.id} onClick={() => setSelectedVar(v)}
                      className="px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200"
                      style={{
                        backgroundColor: selectedVar?.id === v.id ? C.dark : 'transparent',
                        color:           selectedVar?.id === v.id ? '#fff'  : C.dark,
                        borderColor:     selectedVar?.id === v.id ? C.dark  : 'rgba(0,0,0,0.18)',
                      }}>
                      {v.tamano ?? v.nombre}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* variedades */}
            {product.variedades.length > 0 && (
              <div className="pd-in mb-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-3"
                  style={{ color: C.green }}>
                  Variedad · {selectedVty}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variedades.map(v => (
                    <button key={v} onClick={() => setSelectedVty(v)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200"
                      style={{
                        backgroundColor: selectedVty === v ? C.sage  : 'transparent',
                        color:           selectedVty === v ? C.dark  : C.body,
                        borderColor:     selectedVty === v ? C.sage  : 'rgba(0,0,0,0.14)',
                      }}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="pd-in flex flex-col sm:flex-row gap-3 mb-10">
              <a href="https://www.instagram.com/soloparaeva/"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full
                           font-semibold text-sm text-white transition-all duration-300 hover:-translate-y-px hover:shadow-xl"
                style={{ backgroundColor: C.dark }}>
                Pedir por Instagram
              </a>
              <a href="https://www.facebook.com/share/18kSRN2JWi/"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full
                           font-semibold text-sm border-2 transition-all duration-300 hover:-translate-y-px"
                style={{ borderColor: C.dark, color: C.dark }}>
                Pedir por Facebook
              </a>
            </div>

            {/* detalles + beneficios */}
            <div className="pd-in grid sm:grid-cols-2 gap-6 pt-8 border-t"
              style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-3"
                  style={{ color: C.green }}>Detalles</p>
                <ul className="space-y-2 text-sm" style={{ color: C.body }}>
                  {['100% natural', 'Elaborado artesanalmente', 'Sin químicos nocivos', 'No testado en animales'].map(d => (
                    <li key={d} className="flex items-center gap-2">
                      <span style={{ color: C.sage }}>✓</span> {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-3"
                  style={{ color: C.green }}>Beneficios</p>
                <ul className="space-y-2 text-sm" style={{ color: C.body }}>
                  {['Cuida tu piel y tu salud', 'Respeta el medio ambiente', 'Larga duración', 'Apoya emprendedores locales'].map(b => (
                    <li key={b} className="flex items-center gap-2">
                      <span style={{ color: C.sage }}>✓</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── relacionados ── */}
      {related.length > 0 && (
        <section style={{ backgroundColor: C.muted }}
          className="px-6 sm:px-14 lg:px-20 xl:px-24 py-14 sm:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-8 flex-shrink-0" style={{ backgroundColor: C.green }} />
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em]"
                style={{ color: C.green }}>También te puede gustar</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {related.map(p => (
                <Link key={p.id} href={`/productos/${p.id}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white
                             transition-shadow duration-300 hover:shadow-lg">
                  <div className="relative aspect-square overflow-hidden"
                    style={{ backgroundColor: C.muted }}>
                    <Image src={p.imagen} alt={p.nombre} fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] mb-1 font-semibold"
                      style={{ color: C.green }}>
                      {catalogoData.categorias.find(c => c.id === p.categoria)?.nombre}
                    </p>
                    <h3 className="font-serif font-semibold text-sm leading-snug mb-3"
                      style={{ color: C.dark }}>{p.nombre}</h3>
                    <span className="text-xs font-semibold flex items-center gap-1
                                     transition-all duration-300 group-hover:gap-2"
                      style={{ color: C.green }}>
                      Ver más →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── back ── */}
      <div className="px-6 sm:px-14 lg:px-20 xl:px-24 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => router.back()}
            className="text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all duration-200"
            style={{ color: C.green }}>
            ← Volver
          </button>
          <Link href="/productos"
            className="text-sm font-medium underline underline-offset-2"
            style={{ color: C.body }}>
            Ver catálogo completo
          </Link>
        </div>
      </div>

    </div>
  );
}
