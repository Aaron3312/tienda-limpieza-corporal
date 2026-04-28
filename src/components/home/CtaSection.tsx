'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSiteData } from '@/context/SiteDataContext';

const GRAIN = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")";

export default function CtaSection() {
  const { C } = useSiteData();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-in',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}
      className="relative overflow-hidden flex items-center justify-center"
      style={{ minHeight: 480 }}>

      {/* background image */}
      <div className="absolute inset-0">
        <Image src="/images/home/stock-cta-bg.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(28,43,18,0.82) 0%, rgba(28,43,18,0.65) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-50"
          style={{ backgroundImage: GRAIN }} />
      </div>

      {/* content */}
      <div className="relative z-10 text-center px-6 sm:px-12 py-20 sm:py-28 max-w-[680px] mx-auto">
        <p className="cta-in text-[10px] font-semibold uppercase tracking-[0.32em] mb-5"
          style={{ color: C.sage }}>
          ¿Lista para empezar?
        </p>

        <h2 className="cta-in font-serif font-bold leading-[1.0] mb-5"
          style={{ fontSize: 'clamp(2.6rem,5.5vw,5rem)', color: '#fff', letterSpacing: '-0.02em' }}>
          Tu piel merece<br />
          <em style={{ fontStyle: 'normal', color: C.sage }}>lo mejor</em> de la naturaleza.
        </h2>

        <p className="cta-in text-[15px] leading-[1.7] mb-10"
          style={{ color: 'rgba(255,255,255,0.65)' }}>
          Explora nuestra colección completa de productos artesanales creados especialmente para ti.
        </p>

        <div className="cta-in flex gap-4 justify-center flex-wrap">
          <Link href="/productos"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-px hover:shadow-xl"
            style={{ backgroundColor: C.sage, color: C.dark }}>
            Ver catálogo completo
          </Link>
          <Link href="/contacto"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-semibold text-sm border transition-all duration-300 hover:-translate-y-px text-white"
            style={{ borderColor: 'rgba(255,255,255,0.4)' }}>
            Contáctanos
          </Link>
        </div>
      </div>
    </section>
  );
}
