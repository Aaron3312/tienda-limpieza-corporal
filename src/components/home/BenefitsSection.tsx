'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { C } from './constants';

const BENEFITS = [
  { icon: '🌿', title: 'Sin químicos',  desc: 'Sin sulfatos, parabenos ni derivados del petróleo.' },
  { icon: '🐰', title: 'Cruelty Free',  desc: 'Nunca testados en animales. Certificado.' },
  { icon: '♻️', title: 'Eco-packaging', desc: 'Empaques biodegradables, cero residuos.' },
  { icon: '✋', title: 'Hecho a mano',  desc: 'Pequeños lotes. Cada pieza es única.' },
];

const STATS = [
  ['100%', 'Ingredientes naturales'],
  ['0',    'Químicos dañinos'],
  ['500+', 'Clientas felices'],
  ['3+',   'Años de experiencia'],
];

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo('.benefit-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.09,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' } });

      gsap.fromTo('.reveal-up-benefits',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 88%' } });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}
      className="h-screen flex flex-col justify-center overflow-hidden
                 px-6 sm:px-14 lg:px-20 xl:px-24 py-8 sm:py-10"
      style={{ backgroundColor: C.dark }}>
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-6 sm:gap-10">

        <div className="text-center reveal-up-benefits">
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.26em] mb-2 sm:mb-3"
            style={{ color: C.sage }}>Por qué elegirnos</p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            La diferencia está en los detalles
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {BENEFITS.map((b, i) => (
            <div key={i} className="benefit-card rounded-2xl sm:rounded-3xl p-4 sm:p-7"
              style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <span className="text-2xl sm:text-3xl block mb-3 sm:mb-5">{b.icon}</span>
              <h3 className="text-white font-serif text-sm sm:text-lg font-bold mb-1.5 sm:mb-2">{b.title}</h3>
              <p className="text-xs sm:text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.52)' }}>{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center pt-5 sm:pt-8 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.09)' }}>
          {STATS.map(([num, label]) => (
            <div key={label}>
              <p className="font-serif text-3xl sm:text-4xl font-bold" style={{ color: C.sage }}>{num}</p>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-widest mt-1 sm:mt-2"
                style={{ color: 'rgba(255,255,255,0.38)' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
