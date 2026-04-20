'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { C, TESTIMONIALS } from './constants';

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.testi-col',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 74%' } });
      gsap.fromTo('.testi-header',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}
      className="flex flex-col py-10 sm:py-14 overflow-hidden
                 px-6 sm:px-14 lg:px-15 xl:px-24"
      style={{ backgroundColor: C.bg }}>

      {/* header */}
      <div className="testi-header flex items-center gap-5 mb-10 sm:mb-14">
        <div className="h-px flex-shrink-0 w-8" style={{ backgroundColor: C.green }} />
        <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] shrink-0"
          style={{ color: C.green }}>Lo que dicen nuestras clientas</p>
        <div className="h-px flex-1" style={{ backgroundColor: 'rgba(0,0,0,0.08)' }} />
      </div>

      {/* desktop: 3 columns */}
      <div className="hidden md:grid grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="testi-col flex flex-col px-0 pr-10 lg:pr-14 xl:pr-16
                                  border-l pl-10 lg:pl-14 xl:pl-16 first:border-l-0 first:pl-0"
            style={{ borderColor: 'rgba(0,0,0,0.1)' }}>

            {/* index + stars */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-serif text-xs tabular-nums"
                style={{ color: 'rgba(0,0,0,0.2)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex gap-0.5">
                {'★★★★★'.split('').map((s, j) => (
                  <span key={j} style={{ color: C.gold, fontSize: '0.75rem' }}>{s}</span>
                ))}
              </div>
            </div>

            {/* quote */}
            <p className="font-serif italic leading-[1.55] flex-1"
              style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)', color: C.dark }}>
              &ldquo;{t.text}&rdquo;
            </p>

            {/* author */}
            <div className="mt-8 pt-6 flex items-center gap-3"
              style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center
                              font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: C.sage, color: C.dark }}>
                {t.name[0]}
              </div>
              <div>
                <p className="font-semibold text-sm leading-tight" style={{ color: C.dark }}>{t.name}</p>
                <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: '#bbb' }}>{t.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* mobile: vertical stack */}
      <div className="md:hidden flex flex-col gap-8">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="testi-col flex flex-col pb-8 border-b last:border-b-0"
            style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
            <div className="flex gap-0.5 mb-3">
              {'★★★★★'.split('').map((s, j) => (
                <span key={j} style={{ color: C.gold, fontSize: '0.75rem' }}>{s}</span>
              ))}
            </div>
            <p className="font-serif italic leading-[1.55] text-sm mb-4" style={{ color: C.dark }}>
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
                style={{ backgroundColor: C.sage, color: C.dark }}>
                {t.name[0]}
              </div>
              <div>
                <p className="font-semibold text-xs" style={{ color: C.dark }}>{t.name}</p>
                <p className="text-[10px] uppercase tracking-widest" style={{ color: '#bbb' }}>{t.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
