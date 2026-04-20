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

const INFO = [
  { label: 'Teléfono',   value: '+52 55 1802 6391',        href: 'tel:+5215518026391' },
  { label: 'Correo',     value: 'altardelcielogp@gmail.com', href: 'mailto:altardelcielogp@gmail.com' },
  { label: 'Instagram',  value: '@soloparaeva',              href: 'https://www.instagram.com/soloparaeva/' },
  { label: 'Facebook',   value: 'Solo Para Eva',             href: 'https://www.facebook.com/share/18kSRN2JWi/' },
];

const HORARIOS = [
  { dia: 'Lunes – Sábado', hora: '9:00 AM – 5:00 PM' },
  { dia: 'Domingos',       hora: 'Cerrado' },
];

export default function ContactoPage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.hi',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.1 });
      gsap.utils.toArray<HTMLElement>('.r').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{ backgroundColor: C.bg, minHeight: '100vh' }}>

      {/* ══ HERO split ══ */}
      <section className="grid lg:grid-cols-2 min-h-[calc(100vh-4rem)]">

        {/* left */}
        <div className="flex flex-col justify-between
                        px-6 sm:px-14 lg:px-20 xl:px-24
                        pt-16 pb-12 lg:py-20">

          <p className="hi text-[10px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: C.green }}>Solo Para Eva</p>

          <div>
            <h1 className="hi font-serif font-bold leading-[0.95] mb-6"
              style={{ fontSize: 'clamp(3.2rem, 7vw, 7rem)', color: C.dark }}>
              Hablemos
            </h1>
            <p className="hi text-base sm:text-lg leading-relaxed mb-10 max-w-sm"
              style={{ color: C.body }}>
              Estamos aquí para atenderte. Escríbenos, llámanos o síguenos en redes —
              con gusto te ayudamos.
            </p>

            {/* info list */}
            <div className="hi flex flex-col divide-y"
              style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
              {INFO.map(({ label, value, href }) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-4 group">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: C.green }}>{label}</span>
                  <span className="text-sm font-medium transition-colors duration-200
                                   group-hover:underline underline-offset-2"
                    style={{ color: C.dark }}>{value}</span>
                </a>
              ))}
            </div>
          </div>

          {/* horarios */}
          <div className="hi pt-8 border-t" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] mb-4"
              style={{ color: C.green }}>Horarios</p>
            {HORARIOS.map(({ dia, hora }) => (
              <div key={dia} className="flex justify-between items-baseline mb-2">
                <span className="text-sm" style={{ color: C.body }}>{dia}</span>
                <span className="text-sm font-semibold" style={{ color: C.dark }}>{hora}</span>
              </div>
            ))}
          </div>
        </div>

        {/* right image */}
        <div className="relative min-h-[50vh] lg:min-h-0 overflow-hidden">
          <Image src="/images/contacto/contacto-banner.jpeg" alt="Contáctanos"
            fill className="object-cover object-center" />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(28,43,18,0.5) 0%, transparent 60%)' }} />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="font-serif italic text-white text-lg leading-relaxed">
              &ldquo;Productos pensados para ti, con el amor que mereces.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ══ MENSAJE + FOTO ══ */}
      <section className="px-6 sm:px-14 lg:px-20 xl:px-24 py-16 sm:py-24"
        style={{ backgroundColor: C.dark }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-center">

          <div>
            <p className="r text-[10px] font-semibold uppercase tracking-[0.28em] mb-6"
              style={{ color: C.sage }}>Estamos para ti</p>
            <p className="r font-serif italic text-white leading-[1.4] mb-8"
              style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)' }}>
              Si tienes preguntas sobre nuestros productos, pedidos especiales o simplemente
              quieres conocernos mejor — escríbenos.
            </p>
            <p className="r text-sm leading-relaxed mb-10"
              style={{ color: 'rgba(255,255,255,0.52)' }}>
              La Cosmética de Autor de Solo Para Eva ofrece productos exclusivos y personalizados,
              creados con ingredientes específicos para las necesidades únicas de cada clienta.
              Estaremos encantadas de atenderte.
            </p>
            <div className="r flex flex-wrap gap-3">
              <a href="mailto:altardelcielogp@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm
                           transition-all duration-300 hover:-translate-y-px"
                style={{ backgroundColor: C.sage, color: C.dark }}>
                Enviar correo →
              </a>
              <a href="https://www.instagram.com/soloparaeva/"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm
                           border transition-all duration-300 hover:-translate-y-px text-white"
                style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                Instagram
              </a>
            </div>
          </div>

          <div className="r rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] relative">
            <Image src="/images/contacto/contacto-2.jpeg"
              alt="Productos naturales" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* ══ CTA final ══ */}
      <section className="px-6 sm:px-14 lg:px-20 xl:px-24 py-16 sm:py-20"
        style={{ backgroundColor: C.muted }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="r text-center sm:text-left">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-1"
              style={{ color: C.dark }}>¿Lista para explorar nuestros productos?</h2>
            <p className="text-sm" style={{ color: C.body }}>100% naturales, hechos a mano con amor</p>
          </div>
          <Link href="/productos"
            className="r inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-sm
                       text-white shrink-0 transition-all duration-300 hover:-translate-y-px hover:shadow-xl"
            style={{ backgroundColor: C.dark }}>
            Ver catálogo →
          </Link>
        </div>
      </section>

    </div>
  );
}
