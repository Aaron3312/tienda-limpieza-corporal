'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { C } from './constants';

export default function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { clipPath: 'inset(5% 3% 5% 3% round 32px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}
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
  );
}
