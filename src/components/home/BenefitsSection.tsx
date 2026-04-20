'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { C } from './constants';

const ITEMS = [
  { icon: '🌿', title: 'Ingredientes naturales', desc: 'Sin químicos dañinos. Solo lo que la naturaleza nos da.',     bg: C.muted,            dark: false, col: 2, row: 1 },
  { icon: '🐾', title: 'Sin crueldad animal',    desc: 'Nunca testeamos en animales. Cosmética ética y responsable.', bg: C.sage + '55',      dark: false, col: 1, row: 1 },
  { icon: '♻️', title: 'Eco-consciente',         desc: 'Empaque sostenible y producción en pequeños lotes.',          bg: '#E8F4D9',          dark: false, col: 1, row: 1 },
  { icon: '✋', title: 'Hecho a mano',            desc: 'Cada producto es creado artesanalmente con amor y cuidado.',  bg: C.dark,             dark: true,  col: 1, row: 2 },
  { icon: '💚', title: 'Con propósito',           desc: 'Comprometidas con el bienestar integral de la mujer.',       bg: C.green + '22',     dark: false, col: 1, row: 1 },
];

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.ben-head',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } });
      gsap.fromTo('.ben-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: '.ben-grid', start: 'top 82%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .ben-grid { grid-template-columns: 1fr !important; }
          .ben-card { grid-column: span 1 !important; grid-row: span 1 !important; }
        }
      `}</style>

      <section ref={sectionRef}
        className="overflow-hidden px-6 sm:px-14 lg:px-20 xl:px-24"
        style={{ backgroundColor: C.bg, padding: 'clamp(72px,8vw,120px) clamp(24px,5vw,80px)' }}>

        <div className="max-w-7xl mx-auto">

          <div className="ben-head mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3"
              style={{ color: C.green }}>Por qué elegirnos</p>
            <h2 className="font-serif font-bold leading-[1]"
              style={{ fontSize: 'clamp(2.2rem,4vw,3.6rem)', color: C.dark }}>
              La diferencia está en los detalles
            </h2>
          </div>

          <div className="ben-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto auto', gap: 16 }}>
            {ITEMS.map(({ icon, title, desc, bg, dark, col, row }) => (
              <div key={title}
                className="ben-card"
                style={{
                  backgroundColor: bg,
                  borderRadius: 24,
                  padding: 'clamp(28px,3vw,40px)',
                  gridColumn: `span ${col}`,
                  gridRow: `span ${row}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 220,
                  transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 56px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'none';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}>
                <span style={{ fontSize: 40, display: 'block' }}>{icon}</span>
                <div>
                  <h3 className="font-serif font-bold mb-2.5"
                    style={{ fontSize: 22, color: dark ? '#fff' : C.dark }}>
                    {title}
                  </h3>
                  <p className="text-[13px] leading-[1.7]"
                    style={{ color: dark ? 'rgba(255,255,255,0.6)' : C.body }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
