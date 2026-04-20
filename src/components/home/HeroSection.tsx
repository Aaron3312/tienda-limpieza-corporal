'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { C, MARQUEE } from './constants';

export default function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const heroImgRef  = useRef<HTMLDivElement>(null);
  const h1Ref       = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* image clip-path reveal */
      gsap.fromTo(heroImgRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.7, ease: 'expo.out', delay: 0.1 });

      /* headline word stagger */
      const words = h1Ref.current?.querySelectorAll<HTMLSpanElement>('.w');
      if (words?.length) {
        gsap.fromTo(words,
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, ease: 'power4.out', stagger: 0.07, delay: 0.5 });
      }

      /* sub elements */
      gsap.fromTo(['.hero-sub', '.hero-ctas', '.hero-stats'],
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', stagger: 0.16, delay: 1.1 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-[calc(100vh-4rem)] flex flex-col overflow-hidden">

      {/* split content */}
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
            {[['500+', 'Clientas'], ['50+', 'Productos'], ['3+', 'Años']].map(([num, label]) => (
              <div key={label}>
                <p className="text-xl sm:text-2xl font-bold font-serif" style={{ color: C.green }}>{num}</p>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-widest mt-0.5"
                  style={{ color: '#bbb' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right image (desktop) ── */}
        <div className="hidden lg:block relative overflow-hidden" style={{ backgroundColor: C.muted }}>
          <div ref={heroImgRef} className="absolute inset-0">
            <Image src="/images/home/stock-hero-soap.jpg" alt="Jabones artesanales Solo Para Eva"
              fill className="object-cover" priority />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0) 50%,rgba(28,43,18,0.48) 100%)' }} />
          </div>

          {/* glass badge */}
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
            <span key={i}
              className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.24em] shrink-0"
              style={{ color: C.sage }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
