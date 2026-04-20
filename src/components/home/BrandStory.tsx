'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { C } from './constants';

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const img1Ref    = useRef<HTMLDivElement>(null);
  const img2Ref    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(img1Ref.current, { yPercent: -12, ease: 'none',
        scrollTrigger: { trigger: img1Ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 } });
      gsap.to(img2Ref.current, { yPercent: -20, ease: 'none',
        scrollTrigger: { trigger: img2Ref.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 } });

      gsap.fromTo('.brand-copy',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}
      className="h-screen flex items-center overflow-hidden
                 px-6 sm:px-14 lg:px-20 xl:px-24 py-8 sm:py-10"
      style={{ backgroundColor: C.bg }}>
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[50%_1fr] gap-12 lg:gap-16 items-center h-full py-8 sm:py-10">

        {/* images — desktop only */}
        <div className="relative h-full hidden lg:block">
          <div ref={img1Ref}
            className="absolute left-0 top-0 w-[62%] h-[80%] rounded-3xl overflow-hidden shadow-2xl">
            <Image src="/images/home/quienes.png" alt="Elaboración artesanal" fill
              className="object-cover scale-110" />
          </div>
          <div ref={img2Ref}
            className="absolute right-0 bottom-0 w-[50%] h-[56%] rounded-3xl overflow-hidden shadow-2xl"
            style={{ border: `5px solid ${C.bg}` }}>
            <Image src="/images/home/quienes2.png" alt="Ingredientes naturales" fill
              className="object-cover scale-110" />
          </div>
          <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-3xl -z-10"
            style={{ backgroundColor: `${C.sage}40` }} />
        </div>

        {/* copy */}
        <div className="brand-copy flex flex-col justify-center">
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
            &ldquo;Porque Tú eres la fuente de vida, la luz con la que vemos.&rdquo;
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
  );
}
