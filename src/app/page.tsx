'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import catalogoData from '@/data/productos.json';

/* ─── Palette ────────────────────────────────────────────────── */
const C = {
  bg:     '#F7F4EF',
  dark:   '#1C2B12',
  green:  '#5C7A3E',
  sage:   '#aad585',
  cream2: '#F0EBE3',
  muted:  '#EDE8DF',
  body:   '#5A5A5A',
  gold:   '#C9A87C',
};

const MARQUEE = [
  '✦ 100% Natural', '✦ Cruelty Free', '✦ Hecho a mano',
  '✦ Vegano', '✦ Eco-friendly', '✦ Sin sulfatos', '✦ Sin parabenos',
];

const TESTIMONIALS = [
  { text: 'El jabón de lavanda es increíble, mi piel nunca ha estado tan suave. Totalmente recomendado.', name: 'María G.',      city: 'Ciudad de México' },
  { text: 'El exfoliante de café dejó mi piel radiante en una sola aplicación. ¡Me encantaron!',           name: 'Sofía R.',      city: 'Guadalajara'      },
  { text: 'Por fin productos que realmente son naturales y huelen delicioso. No cambio a ninguna otra marca.', name: 'Valentina L.', city: 'Monterrey'        },
];

/* ─── Shared card renderer ───────────────────────────────────── */
type Product = typeof catalogoData.productos[0];

function ProductCard({ product, className = '' }: { product: Product; className?: string }) {
  const catName = catalogoData.categorias.find(c => c.id === product.categoria)?.nombre ?? product.categoria;
  return (
    <Link href={`/productos/${product.id}`}
      className={`product-card group flex flex-col overflow-hidden rounded-3xl ${className}`}>
      <div className="flex-1 min-h-0 relative overflow-hidden" style={{ backgroundColor: C.muted }}>
        <Image src={product.imagen} alt={product.nombre} fill
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

function TestiCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="testi-card flex flex-col rounded-3xl p-6 bg-white shadow-sm h-full">
      <div className="flex gap-0.5 mb-4">
        {'★★★★★'.split('').map((s, j) => (
          <span key={j} className="text-sm" style={{ color: C.gold }}>{s}</span>
        ))}
      </div>
      <p className="font-serif text-sm italic leading-relaxed flex-1 mb-6" style={{ color: '#333' }}>
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-4 border-t flex-shrink-0" style={{ borderColor: '#eee' }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ backgroundColor: C.sage, color: C.dark }}>
          {t.name[0]}
        </div>
        <div>
          <p className="font-semibold text-sm" style={{ color: C.dark }}>{t.name}</p>
          <p className="text-xs" style={{ color: '#bbb' }}>{t.city}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function Home() {
  const cursorRingRef  = useRef<HTMLDivElement>(null);
  const cursorDotRef   = useRef<HTMLDivElement>(null);
  const heroImgRef     = useRef<HTMLDivElement>(null);
  const h1Ref          = useRef<HTMLHeadingElement>(null);
  const brandImg1Ref   = useRef<HTMLDivElement>(null);
  const brandImg2Ref   = useRef<HTMLDivElement>(null);
  const benefitsSecRef = useRef<HTMLDivElement>(null);
  const ctaRef         = useRef<HTMLDivElement>(null);

  const featured = catalogoData.productos.filter(p => p.destacado).slice(0, 3);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.set([cursorRingRef.current, cursorDotRef.current], { x: -200, y: -200 });

    const ctx = gsap.context(() => {
      /* cursor */
      const onMove = (e: MouseEvent) => {
        gsap.to(cursorRingRef.current, { x: e.clientX - 16, y: e.clientY - 16, duration: 0.5, ease: 'power3.out' });
        gsap.to(cursorDotRef.current, { x: e.clientX - 3,  y: e.clientY - 3,  duration: 0.1 });
      };
      window.addEventListener('mousemove', onMove);
      document.querySelectorAll('a,button').forEach(el => {
        el.addEventListener('mouseenter', () => gsap.to(cursorRingRef.current, { scale: 1.8, duration: 0.3 }));
        el.addEventListener('mouseleave', () => gsap.to(cursorRingRef.current, { scale: 1.0, duration: 0.3 }));
      });

      /* hero clip-path */
      gsap.fromTo(heroImgRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.7, ease: 'expo.out', delay: 0.1 });

      /* headline stagger */
      const words = h1Ref.current?.querySelectorAll<HTMLSpanElement>('.w');
      if (words?.length) {
        gsap.fromTo(words,
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, ease: 'power4.out', stagger: 0.07, delay: 0.5 });
      }

      /* hero sub */
      gsap.fromTo(['.hero-sub', '.hero-ctas', '.hero-stats'],
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', stagger: 0.16, delay: 1.1 });

      /* brand parallax */
      gsap.to(brandImg1Ref.current, { yPercent: -12, ease: 'none',
        scrollTrigger: { trigger: brandImg1Ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 } });
      gsap.to(brandImg2Ref.current, { yPercent: -20, ease: 'none',
        scrollTrigger: { trigger: brandImg2Ref.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 } });

      /* benefits */
      gsap.fromTo('.benefit-card', { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.09,
          scrollTrigger: { trigger: benefitsSecRef.current, start: 'top 78%' } });

      /* generic reveals */
      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach(el => {
        gsap.fromTo(el, { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' } });
      });

      /* product cards */
      gsap.fromTo('.product-card', { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.products-grid', start: 'top 82%' } });

      /* testimonial cards */
      gsap.fromTo('.testi-card', { y: 45, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.testi-grid', start: 'top 82%' } });

      /* CTA clip expand */
      gsap.fromTo(ctaRef.current,
        { clipPath: 'inset(5% 3% 5% 3% round 32px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 82%' } });

      return () => window.removeEventListener('mousemove', onMove);
    });

    return () => ctx.revert();
  }, []);

  /* ─────────────────────────────────────────────────────────── */
  return (
    <>
      {/* Custom cursor */}
      <div ref={cursorRingRef}
        className="fixed z-[9999] w-8 h-8 rounded-full pointer-events-none mix-blend-difference hidden lg:block"
        style={{ top: 0, left: 0, backgroundColor: '#fff' }} />
      <div ref={cursorDotRef}
        className="fixed z-[9999] w-1.5 h-1.5 rounded-full pointer-events-none hidden lg:block"
        style={{ top: 0, left: 0, backgroundColor: C.dark }} />

      <div style={{ backgroundColor: C.bg, color: C.dark }}>

        {/* ══════════════════════════════════════════════════════
            S1 · HERO
            Height = 100vh − header(4rem) so header+hero = 1 screen.
            Marquee is flex-shrink-0 at the very bottom.
        ══════════════════════════════════════════════════════ */}
        <section className="h-[calc(100vh-4rem)] flex flex-col overflow-hidden">

          {/* split content — fills everything above marquee */}
          <div className="flex-1 min-h-0 grid lg:grid-cols-[55%_45%]">

            {/* ── Left copy ── */}
            <div className="flex flex-col justify-center px-6 sm:px-14 lg:px-20 xl:px-24 py-6 overflow-hidden">

              <div className="flex items-center gap-3 mb-5 sm:mb-7">
                <div className="h-px w-8 flex-shrink-0" style={{ backgroundColor: C.green }} />
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.26em]"
                  style={{ color: C.green }}>
                  Solo Para Eva · Cosmética Artesanal
                </span>
              </div>

              <h1 ref={h1Ref}
                className="font-serif font-bold leading-[1.03] tracking-tight overflow-hidden"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 5.5rem)', color: C.dark }}>
                <span className="block overflow-hidden pb-1">
                  <span className="w inline-block">Cuida</span>{' '}
                  <span className="w inline-block">tu</span>{' '}
                  <span className="w inline-block">piel,</span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <span className="w inline-block" style={{ color: C.green }}>ama</span>{' '}
                  <span className="w inline-block" style={{ color: C.green }}>la</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="w inline-block">naturaleza</span>
                </span>
              </h1>

              <p className="hero-sub mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed max-w-[340px]"
                style={{ color: C.body }}>
                Productos artesanales con ingredientes 100% naturales.
                Sin compromiso con tu piel ni con el planeta.
              </p>

              <div className="hero-ctas mt-5 sm:mt-7 flex flex-wrap gap-3">
                <Link href="/productos"
                  className="group inline-flex items-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-px"
                  style={{ backgroundColor: C.dark }}>
                  Ver colección
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <Link href="/nosotros"
                  className="inline-flex items-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-full font-semibold text-sm border-2 transition-all duration-300 hover:-translate-y-px"
                  style={{ borderColor: C.dark, color: C.dark }}>
                  Nuestra historia
                </Link>
              </div>

              <div className="hero-stats mt-5 sm:mt-8 pt-5 sm:pt-7 flex gap-8 sm:gap-10 border-t"
                style={{ borderColor: 'rgba(0,0,0,0.09)' }}>
                {[['500+','Clientas'],['50+','Productos'],['3+','Años']].map(([num, label]) => (
                  <div key={label}>
                    <p className="text-xl sm:text-2xl font-bold font-serif" style={{ color: C.green }}>{num}</p>
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-widest mt-0.5"
                      style={{ color: '#bbb' }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right image (desktop only) ── move the image a ittle to the left*/}
            <div className="hidden lg:block relative overflow-hidden" style={{ backgroundColor: C.muted}}>
              <div ref={heroImgRef} className="absolute inset-0">
                <Image src="images/home/hero1.png" alt="Jabones artesanales" fill
                  className="object-cover " priority />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0) 50%,rgba(28,43,18,0.48) 100%)' }} />
              </div>
              <div className="absolute top-10 left-8 z-10 rounded-2xl px-5 py-4 backdrop-blur-md shadow-2xl"
                style={{ background: 'rgba(247,244,239,0.90)', border: '1px solid rgba(255,255,255,0.7)' }}>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: C.green }}>
                  Colección especial
                </p>
                <p className="text-sm font-semibold" style={{ color: C.dark }}>Jabones de lavanda & argán</p>
                <div className="flex items-center gap-0.5 mt-2">
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i} className="text-[11px]" style={{ color: C.gold }}>{s}</span>
                  ))}
                  <span className="text-[11px] ml-2" style={{ color: '#999' }}>4.9 · 500+ reseñas</span>
                </div>
              </div>
              <div className="absolute bottom-10 right-8 z-10 rounded-full px-5 py-2.5 text-xs font-bold shadow-xl"
                style={{ backgroundColor: C.sage, color: C.dark }}>
                🌿 100% Natural
              </div>
            </div>
          </div>

          {/* ── Marquee pinned at bottom ── */}
          <div className="flex-shrink-0 py-2.5 sm:py-3 overflow-hidden" style={{ backgroundColor: C.dark }}>
            <div className="flex gap-12 whitespace-nowrap" style={{ animation: 'marquee 25s linear infinite' }}>
              {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((item, i) => (
                <span key={i} className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.24em] shrink-0"
                  style={{ color: C.sage }}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            S2 · FEATURED PRODUCTS
            Mobile: horizontal snap carousel (each card = ~80vw)
            Desktop: 3-column grid fills remaining height
        ══════════════════════════════════════════════════════ */}
        <section className="h-screen flex flex-col overflow-hidden" style={{ backgroundColor: C.bg }}>

          {/* section header */}
          <div className="flex-shrink-0 flex items-end justify-between
                          px-6 sm:px-14 lg:px-20 xl:px-24 pt-8 sm:pt-10 pb-4 sm:pb-6">
            <div className="reveal-up">
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] mb-1.5 sm:mb-2"
                style={{ color: C.green }}>Lo más amado</p>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold"
                style={{ color: C.dark }}>Productos destacados</h2>
            </div>
            <Link href="/productos"
              className="reveal-up shrink-0 inline-flex items-center gap-1.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold border-2 transition-all duration-300 hover:bg-[#1C2B12] hover:text-white"
              style={{ borderColor: C.dark, color: C.dark }}>
              Ver todo →
            </Link>
          </div>

          {/* ── Mobile: horizontal snap carousel ── */}
          <div className="sm:hidden flex-1 min-h-0 overflow-x-auto snap-x snap-mandatory flex gap-3 px-6 pb-6 scrollbar-hide">
            {featured.map(product => (
              <div key={product.id} className="snap-center flex-shrink-0 flex flex-col min-h-0"
                style={{ width: '78vw' }}>
                <ProductCard product={product} className="h-full" />
              </div>
            ))}
            {/* trailing space so last card centers cleanly */}
            <div className="flex-shrink-0 w-6" />
          </div>

          {/* ── Desktop: grid fills remaining height ── */}
          <div className="products-grid hidden sm:grid grid-cols-3 gap-5 flex-1 min-h-0
                          px-14 lg:px-20 xl:px-24 pb-8 lg:pb-10">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} className="h-full" />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            S3 · BENEFITS  (dark)
            Mobile: 2×2 card grid + compact stats
            Desktop: 4-column grid + stats row
        ══════════════════════════════════════════════════════ */}
        <section ref={benefitsSecRef}
          className="h-screen flex flex-col justify-center overflow-hidden
                     px-6 sm:px-14 lg:px-20 xl:px-24 py-8 sm:py-10"
          style={{ backgroundColor: C.dark }}>
          <div className="max-w-7xl mx-auto w-full flex flex-col gap-6 sm:gap-10">

            <div className="text-center reveal-up">
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.26em] mb-2 sm:mb-3"
                style={{ color: C.sage }}>Por qué elegirnos</p>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                La diferencia está en los detalles
              </h2>
            </div>

            {/* cards: 2 cols on mobile → 4 cols on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {[
                { icon: '🌿', title: 'Sin químicos',   desc: 'Sin sulfatos, parabenos ni derivados del petróleo.' },
                { icon: '🐰', title: 'Cruelty Free',   desc: 'Nunca testados en animales. Certificado.' },
                { icon: '♻️', title: 'Eco-packaging',  desc: 'Empaques biodegradables, cero residuos.' },
                { icon: '✋', title: 'Hecho a mano',   desc: 'Pequeños lotes. Cada pieza es única.' },
              ].map((b, i) => (
                <div key={i} className="benefit-card rounded-2xl sm:rounded-3xl p-4 sm:p-7"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
                  <span className="text-2xl sm:text-3xl block mb-3 sm:mb-5">{b.icon}</span>
                  <h3 className="text-white font-serif text-sm sm:text-lg font-bold mb-1.5 sm:mb-2">{b.title}</h3>
                  <p className="text-xs sm:text-sm leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.52)' }}>{b.desc}</p>
                </div>
              ))}
            </div>

            {/* stats: always 2×2 on mobile, 4 cols on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center pt-5 sm:pt-8 border-t"
              style={{ borderColor: 'rgba(255,255,255,0.09)' }}>
              {[['100%','Ingredientes naturales'],['0','Químicos dañinos'],['500+','Clientas felices'],['3+','Años de experiencia']]
                .map(([num, label]) => (
                  <div key={label}>
                    <p className="font-serif text-3xl sm:text-4xl font-bold" style={{ color: C.sage }}>{num}</p>
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-widest mt-1 sm:mt-2"
                      style={{ color: 'rgba(255,255,255,0.38)' }}>{label}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            S4 · BRAND STORY
            Mobile: only copy (images hidden), vertically centered
            Desktop: 50/50 split with parallax images
        ══════════════════════════════════════════════════════ */}
        <section className="h-screen flex items-center overflow-hidden
                            px-6 sm:px-14 lg:px-20 xl:px-24 py-8 sm:py-10"
          style={{ backgroundColor: C.bg }}>
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[50%_1fr] gap-12 lg:gap-16 items-center h-full py-8 sm:py-10">

            {/* images — desktop only */}
            <div className="relative h-full hidden lg:block">
              <div ref={brandImg1Ref}
                className="absolute left-0 top-0 w-[62%] h-[80%] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/images/home/quienes.png" alt="Elaboración artesanal" fill
                  className="object-cover scale-110" />
              </div>
              <div ref={brandImg2Ref}
                className="absolute right-0 bottom-0 w-[50%] h-[56%] rounded-3xl overflow-hidden shadow-2xl"
                style={{ border: `5px solid ${C.bg}` }}>
                <Image src="/images/home/quienes2.png" alt="Ingredientes naturales" fill
                  className="object-cover scale-110" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-3xl -z-10"
                style={{ backgroundColor: `${C.sage}40` }} />
            </div>

            {/* copy */}
            <div className="reveal-up flex flex-col justify-center">
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] mb-3 sm:mb-4"
                style={{ color: C.green }}>Nuestra historia</p>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4 sm:mb-5"
                style={{ color: C.dark }}>
                Cosmética de autor<br />con propósito
              </h2>
              <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4" style={{ color: C.body }}>
                Solo Para Eva nació de la convicción de que cada mujer merece productos honestos,
                formulados con esmero y respeto. Cada jabón, crema y exfoliante es creado a mano
                en pequeños lotes, usando ingredientes que conocemos y en los que confiamos.
              </p>
              <p className="text-sm sm:text-base leading-relaxed mb-5 sm:mb-8" style={{ color: C.body }}>
                Porque la belleza real viene de la naturaleza, y cuidarla es cuidarte a ti misma.
              </p>
              <blockquote className="border-l-4 pl-5 sm:pl-6 mb-6 sm:mb-8 font-serif text-sm sm:text-base italic"
                style={{ borderColor: C.sage, color: C.dark }}>
                "Porque Tú eres la fuente de vida, la luz con la que vemos."
                <cite className="block not-italic text-xs mt-1.5 font-sans" style={{ color: '#ccc' }}>— Salmos 36:9</cite>
              </blockquote>
              <div>
                <Link href="/nosotros"
                  className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-px"
                  style={{ backgroundColor: C.dark }}>
                  Conoce más sobre nosotras
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            S5 · TESTIMONIALS
            Mobile: horizontal snap carousel
            Desktop: 3-column grid
        ══════════════════════════════════════════════════════ */}
        <section className="h-screen flex flex-col overflow-hidden"
          style={{ backgroundColor: C.cream2 }}>

          {/* heading */}
          <div className="flex-shrink-0 text-center px-6 sm:px-14 lg:px-20 xl:px-24 pt-8 sm:pt-12 pb-4 sm:pb-8 reveal-up">
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] mb-2 sm:mb-3"
              style={{ color: C.green }}>Testimonios</p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ color: C.dark }}>
              Lo que dicen nuestras clientas
            </h2>
          </div>

          {/* ── Mobile: horizontal snap carousel ── */}
          <div className="md:hidden flex-1 min-h-0 overflow-x-auto snap-x snap-mandatory flex gap-3 px-6 pb-8 scrollbar-hide">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="snap-center flex-shrink-0 flex flex-col min-h-0"
                style={{ width: '82vw' }}>
                <TestiCard t={t} />
              </div>
            ))}
            <div className="flex-shrink-0 w-6" />
          </div>

          {/* ── Desktop: grid ── */}
          <div className="hidden md:flex flex-1 min-h-0 items-center px-14 lg:px-20 xl:px-24 pb-10 lg:pb-12">
            <div className="testi-grid grid grid-cols-3 gap-5 lg:gap-6 w-full max-w-7xl mx-auto h-full">
              {TESTIMONIALS.map((t, i) => <TestiCard key={i} t={t} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            S6 · CTA  (full-screen, clip-path expand on scroll)
        ══════════════════════════════════════════════════════ */}
        <div ref={ctaRef}
          className="h-screen relative flex items-center overflow-hidden"
          style={{ backgroundColor: C.dark }}>
          <div className="absolute inset-0 opacity-[0.13]">
            <Image src="/images/home/stock-cta-bg.jpg" alt="" fill className="object-cover" />
          </div>
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 72% 50%, rgba(170,213,133,0.22) 0%, transparent 58%)' }} />

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-14 lg:px-20 xl:px-24 w-full
                          flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
            <div>
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.26em] mb-4 sm:mb-5"
                style={{ color: C.sage }}>¿Lista para el cambio?</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Tu piel merece<br />lo mejor de la naturaleza
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
              <Link href="/productos"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-px"
                style={{ backgroundColor: C.sage, color: C.dark }}>
                Ver catálogo completo
              </Link>
              <Link href="/contacto"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-sm border-2 border-white text-white transition-all duration-300 hover:bg-white hover:text-gray-900">
                Contáctanos
              </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
