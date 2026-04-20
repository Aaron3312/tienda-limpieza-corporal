'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { C, TESTIMONIALS } from './constants';

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

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo('.testi-card',
        { y: 45, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.testi-grid', start: 'top 82%' } });

      gsap.fromTo('.reveal-up-testi',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 88%' } });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}
      className="h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: C.cream2 }}>

      <div className="flex-shrink-0 text-center px-6 sm:px-14 lg:px-20 xl:px-24 pt-8 sm:pt-12 pb-4 sm:pb-8 reveal-up-testi">
        <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] mb-2 sm:mb-3"
          style={{ color: C.green }}>Testimonios</p>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ color: C.dark }}>
          Lo que dicen nuestras clientas
        </h2>
      </div>

      {/* mobile: horizontal snap carousel */}
      <div className="md:hidden flex-1 min-h-0 overflow-x-auto snap-x snap-mandatory flex gap-3 px-6 pb-8 scrollbar-hide">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="snap-center flex-shrink-0 flex flex-col min-h-0"
            style={{ width: '82vw' }}>
            <TestiCard t={t} />
          </div>
        ))}
        <div className="flex-shrink-0 w-6" />
      </div>

      {/* desktop: grid */}
      <div className="hidden md:flex flex-1 min-h-0 items-center px-14 lg:px-20 xl:px-24 pb-10 lg:pb-12">
        <div className="testi-grid grid grid-cols-3 gap-5 lg:gap-6 w-full max-w-7xl mx-auto h-full">
          {TESTIMONIALS.map((t, i) => <TestiCard key={i} t={t} />)}
        </div>
      </div>
    </section>
  );
}
