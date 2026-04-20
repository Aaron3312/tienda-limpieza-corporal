'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const C = {
  bg:    '#F7F4EF',
  dark:  '#1C2B12',
  green: '#5C7A3E',
  sage:  '#aad585',
  muted: '#EDE8DF',
  body:  '#5A5A5A',
};

const VALORES = [
  { n: '01', valor: 'Amor',        ref: '1ª Juan 4:8',       cita: '"Si no amo, no conozco a Dios; porque Dios es amor."' },
  { n: '02', valor: 'Respeto',     ref: 'Mateo 7:12',         cita: '"Hacer a los demás todo lo que quiero que me hagan a mí."' },
  { n: '03', valor: 'Honestidad',  ref: 'Efesios 4:25',       cita: '"Dejar de decir mentiras, digamos siempre la verdad."' },
  { n: '04', valor: 'Verdad',      ref: 'Juan 8:32',          cita: '"La verdad me hará libre."' },
  { n: '05', valor: 'Solidaridad', ref: 'Deuteronomio 15:11', cita: '"Mi Dios me ordena que comparta generosamente con quienes pasen necesidad."' },
  { n: '06', valor: 'Libertad',    ref: '2 Corintios 3:17',   cita: '"Donde está mi Dios, ahí hay libertad."' },
  { n: '07', valor: 'Paz',         ref: 'Filipenses 4:6-7',   cita: '"Experimento su paz, esa paz que supera todo entendimiento."' },
];

export default function NosotrosPage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.r').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' } });
      });
      gsap.fromTo('.hi',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.15 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{ backgroundColor: C.bg }}>

      {/* ══ 1 · HERO — split cream/image ══ */}
      <section className="grid lg:grid-cols-2 min-h-[calc(100vh-4rem)]">

        {/* left copy */}
        <div className="flex flex-col justify-between
                        px-6 sm:px-14 lg:px-20 xl:px-24
                        pt-16 pb-12 lg:py-20">
          <p className="hi text-[10px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: C.green }}>Solo Para Eva · Desde 2016</p>

          <div>
            <h1 className="hi font-serif font-bold leading-[0.95] mb-8"
              style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)', color: C.dark }}>
              Quiénes<br />
              <em className="not-italic" style={{ color: C.green }}>somos</em>
            </h1>
            <p className="hi text-base sm:text-lg leading-relaxed max-w-sm mb-10"
              style={{ color: C.body }}>
              Pequeña empresa comprometida desde 2016 con el bienestar y salud de las mujeres,
              a través de la cosmética artesanal y los servicios de spa.
            </p>
            <Link href="/productos"
              className="hi inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold
                         text-sm text-white transition-all duration-300 hover:-translate-y-px hover:shadow-xl"
              style={{ backgroundColor: C.dark }}>
              Ver colección →
            </Link>
          </div>

          <div className="hi flex gap-10 pt-10 border-t"
            style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
            {[['2016', 'Fundación'], ['100%', 'Natural'], ['500+', 'Clientas']].map(([n, l]) => (
              <div key={l}>
                <p className="font-serif text-2xl font-bold" style={{ color: C.dark }}>{n}</p>
                <p className="text-[10px] uppercase tracking-widest mt-1" style={{ color: '#bbb' }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* right image */}
        <div className="relative min-h-[50vh] lg:min-h-0">
          <Image src="/images/nosotros/banner-nosotros.jpeg" alt="Solo Para Eva"
            fill className="object-cover object-center" />
          {/* subtle quote overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-8"
            style={{ background: 'linear-gradient(to top, rgba(28,43,18,0.75) 0%, transparent 100%)' }}>
            <p className="font-serif italic text-white text-base sm:text-lg leading-relaxed">
              &ldquo;Porque Tú eres la fuente de vida,<br />la luz con la que vemos.&rdquo;
            </p>
            <p className="text-xs mt-2 tracking-widest uppercase"
              style={{ color: 'rgba(170,213,133,0.8)' }}>— Salmos 36:9</p>
          </div>
        </div>
      </section>

      {/* ══ 2 · HISTORIA ══ */}
      <section style={{ backgroundColor: C.dark }}
        className="px-6 sm:px-14 lg:px-20 xl:px-24 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto">

          <p className="r text-[10px] font-semibold uppercase tracking-[0.28em] mb-10"
            style={{ color: C.sage }}>Nuestra historia</p>

          {/* quote full width */}
          <p className="r font-serif italic leading-[1.35] text-white mb-14"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', maxWidth: '820px' }}>
            Nacimos de la convicción de que cada mujer merece productos honestos,
            formulados con esmero y respeto — por su piel y por el planeta.
          </p>

          {/* tres columnas de texto + badge */}
          <div className="r grid sm:grid-cols-3 gap-8 border-t pt-10"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <p className="text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.55)' }}>
              Cada jabón, crema y exfoliante es creado a mano en pequeños lotes,
              usando ingredientes que conocemos y en los que confiamos.
            </p>
            <p className="text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.55)' }}>
              Compartimos con las mujeres salud espiritual y emocional, creando
              experiencias personalizadas a través de la cosmética de autor y
              los servicios terapéuticos de spa.
            </p>
            {/* logo badge — circular, centrado */}
            <div className="flex items-center justify-center">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden relative
                              ring-1 ring-white/10">
                <Image src="/images/nosotros/nosotros-1.jpeg"
                  alt="Solo Para Eva" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3 · MISIÓN & VISIÓN — dos bloques horizontales ══ */}
      <section className="px-6 sm:px-14 lg:px-20 xl:px-24 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto">
          <p className="r text-[10px] font-semibold uppercase tracking-[0.28em] mb-14"
            style={{ color: C.green }}>Hacia dónde vamos</p>

          <div className="flex flex-col divide-y" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
            {[
              { label: 'Visión', text: 'Ser una empresa comprometida con sus valores, con el bienestar integral de la mujer y con el cuidado consciente del planeta.' },
              { label: 'Misión', text: 'Colaborar con el bienestar espiritual, emocional y físico de la mujer a través de productos artesanales honestos, naturales y con propósito.' },
            ].map(({ label, text }) => (
              <div key={label}
                className="r grid sm:grid-cols-[180px_1fr] gap-6 sm:gap-12 py-10 items-baseline">
                <h3 className="font-serif text-3xl sm:text-4xl font-bold" style={{ color: C.dark }}>{label}</h3>
                <p className="text-base sm:text-lg leading-relaxed" style={{ color: C.body }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4 · COSMÉTICA DE AUTOR — imagen full + texto ══ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: C.muted }}>
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[560px]">
            <Image src="/images/nosotros/nosotros-3.png"
              alt="Cosmética de autor" fill className="object-cover" />
          </div>
          <div className="flex flex-col justify-center
                          px-6 sm:px-14 lg:px-16 xl:px-20 py-16 sm:py-20">
            <p className="r text-[10px] font-semibold uppercase tracking-[0.28em] mb-5"
              style={{ color: C.green }}>Nuestro enfoque</p>
            <h2 className="r font-serif font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: C.dark }}>
              Cosmética de Autor
            </h2>
            <p className="r text-base leading-relaxed mb-4" style={{ color: C.body }}>
              Productos exclusivos y personalizados — creados con ingredientes específicos
              para las necesidades únicas de cada clienta.
            </p>
            <p className="r text-base leading-relaxed mb-10" style={{ color: C.body }}>
              Comprometidas con el medio ambiente y el bienestar animal, sin atajos,
              sin ingredientes que no reconozcamos.
            </p>
            <Link href="/productos"
              className="r inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold
                         text-sm self-start transition-all duration-300 hover:-translate-y-px"
              style={{ backgroundColor: C.dark, color: '#fff' }}>
              Ver productos →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 5 · VALORES — lista editorial ══ */}
      <section className="px-6 sm:px-14 lg:px-20 xl:px-24 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto">
          <p className="r text-[10px] font-semibold uppercase tracking-[0.28em] mb-14"
            style={{ color: C.green }}>Lo que nos guía</p>

          <div className="divide-y" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
            {VALORES.map(({ n, valor, ref: ref2, cita }) => (
              <div key={n}
                className="r grid grid-cols-[40px_1fr] sm:grid-cols-[60px_200px_1fr_140px]
                           gap-4 sm:gap-8 py-6 sm:py-7 items-center group">
                <span className="font-serif text-xs tabular-nums" style={{ color: 'rgba(0,0,0,0.22)' }}>{n}</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold col-start-2"
                  style={{ color: C.dark }}>{valor}</h3>
                <p className="text-sm leading-relaxed col-start-1 sm:col-start-3 col-span-2 sm:col-span-1"
                  style={{ color: C.body }}>{cita}</p>
                <p className="hidden sm:block text-[10px] font-semibold uppercase tracking-widest text-right"
                  style={{ color: C.green }}>{ref2}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6 · REDES ══ */}
      <section style={{ backgroundColor: C.sage }}
        className="px-6 sm:px-14 lg:px-20 xl:px-24 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="r text-center sm:text-left">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-1"
              style={{ color: C.dark }}>¿Quieres conocer más?</h2>
            <p className="text-sm" style={{ color: 'rgba(28,43,18,0.6)' }}>Síguenos en redes sociales</p>
          </div>
          <div className="r flex gap-3 shrink-0">
            {[
              { href: 'https://www.facebook.com/share/18kSRN2JWi/', label: 'Facebook' },
              { href: 'https://www.instagram.com/soloparaeva/', label: '@soloparaeva' },
            ].map(({ href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="px-5 py-3 rounded-full text-sm font-semibold
                           transition-all duration-300 hover:-translate-y-px"
                style={{ backgroundColor: C.dark, color: '#fff' }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
