'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { C, MARQUEE } from './constants';

/* ── animated counter ── */
function CountStat({ target, label, suffix = '', light = false }: { target: number; label: string; suffix?: string; light?: boolean }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const dur = 1400; const t0 = performance.now();
      const tick = (now: number) => {
        const p    = Math.min((now - t0) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(ease * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target]);
  return (
    <div ref={ref}>
      <p className="font-serif text-xl sm:text-2xl font-bold" style={{ color: light ? C.sage : C.green, lineHeight: 1 }}>
        {val}{suffix}
      </p>
      <p className="text-[10px] uppercase tracking-widest mt-1" style={{ color: light ? 'rgba(255,255,255,0.45)' : '#bbb' }}>{label}</p>
    </div>
  );
}

export default function HeroSection() {
  const sectionRef    = useRef<HTMLElement>(null);
  const mobileSectionRef = useRef<HTMLElement>(null);
  const imgRef        = useRef<HTMLDivElement>(null);

  /* parallax — desktop only */
  useEffect(() => {
    const fn = () => {
      if (imgRef.current) imgRef.current.style.transform = `translateY(${window.scrollY * 0.28}px)`;
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* word + sub reveal */
  useEffect(() => {
    const allRefs = [sectionRef.current, mobileSectionRef.current];
    allRefs.forEach(el => {
      el?.querySelectorAll<HTMLElement>('.hw').forEach((w, i) =>
        setTimeout(() => w.classList.add('hw-in'), 220 + i * 90));
      el?.querySelectorAll<HTMLElement>('.hsub').forEach((s, i) =>
        setTimeout(() => s.classList.add('hsub-in'), 820 + i * 130));
    });
  }, []);

  return (
    <>
      <style>{`
        .hw      { display: inline-block; transform: translateY(110%); transition: transform 1s cubic-bezier(0.16,1,0.3,1); }
        .hw-in   { transform: translateY(0) !important; }
        .hsub    { opacity: 0; transform: translateY(16px); transition: opacity 0.75s ease, transform 0.75s ease; }
        .hsub-in { opacity: 1 !important; transform: translateY(0) !important; }
        @keyframes floatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      `}</style>

      {/* ════════════════════════════════
          MOBILE HERO  (hidden on lg+)
      ════════════════════════════════ */}
      <section ref={mobileSectionRef}
        className="lg:hidden relative flex flex-col justify-end overflow-hidden"
        style={{ height: 'calc(100svh - 4rem - 40px)', backgroundColor: C.dark }}>

        {/* background image */}
        <div className="absolute inset-0">
          <Image src="/images/home/hero1.png" alt="Jabones artesanales Solo Para Eva"
            fill className="object-cover object-center" priority />
          {/* gradient: transparent top → dark bottom */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(28,43,18,0.18) 0%, rgba(28,43,18,0.55) 45%, rgba(28,43,18,0.92) 100%)' }} />
        </div>

        {/* overline — top left */}
        <div className="absolute top-6 left-6 hsub flex items-center gap-2 z-10">
          <span className="block h-px w-5 flex-shrink-0" style={{ backgroundColor: C.sage }} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: C.sage }}>
            Cosmética Artesanal · México
          </span>
        </div>

        {/* bottom copy */}
        <div className="relative z-10 px-6 pb-8 pt-16">

          {/* headline */}
          <h1 className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(2.8rem,12vw,4.2rem)', lineHeight: 0.93, letterSpacing: '-0.02em', color: '#fff' }}>
            {[['Cuida'], ['tu piel,'], ['ama la'], ['naturaleza.']].map((line, li) => (
              <span key={li} className="block overflow-hidden pb-[0.06em]">
                {line.map((word, wi) => (
                  <span key={wi} className="hw mr-[0.22em]">
                    {li === 2
                      ? <span style={{ color: C.sage }}>{word}</span>
                      : word}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          {/* sub */}
          <p className="hsub text-sm leading-[1.6] mb-6"
            style={{ color: 'rgba(255,255,255,0.72)' }}>
            Productos artesanales con ingredientes 100% naturales.
          </p>

          {/* CTAs */}
          <div className="hsub flex gap-3 mb-7">
            <Link href="/productos"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm
                         text-white transition-all duration-300 active:scale-95"
              style={{ backgroundColor: C.green }}>
              Ver colección →
            </Link>
            <Link href="/nosotros"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm
                         border transition-all duration-300 active:scale-95"
              style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}>
              Nuestra historia
            </Link>
          </div>

          {/* stats */}
          <div className="hsub flex gap-8 pt-5 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
            <CountStat target={500} label="Clientas"  suffix="+" light />
            <CountStat target={50}  label="Productos" suffix="+" light />
            <CountStat target={8}   label="Años"      suffix="+" light />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          DESKTOP HERO  (hidden below lg)
      ════════════════════════════════ */}
      <section ref={sectionRef}
        className="hidden lg:grid h-[calc(100vh-4rem-40px)] overflow-hidden"
        style={{ gridTemplateColumns: '48% 52%', backgroundColor: C.bg }}>

        {/* ── Left copy ── */}
        <div className="flex flex-col justify-center overflow-hidden
                        px-6 sm:px-14 lg:px-20 xl:px-24 py-3"
          style={{ backgroundColor: C.bg, position: 'relative', zIndex: 2 }}>

          {/* overline */}
          <div className="hsub flex items-center gap-3 mb-4">
            <span className="block h-px w-7 flex-shrink-0" style={{ backgroundColor: C.green }} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: C.green }}>
              Cosmética Artesanal · México
            </span>
          </div>

          {/* headline */}
          <h1 className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(2.2rem,4.5vw,4.8rem)', lineHeight: 0.93, letterSpacing: '-0.02em', color: C.dark }}>
            {[['Cuida'], ['tu piel,'], ['ama la'], ['naturaleza.']].map((line, li) => (
              <span key={li} className="block overflow-hidden pb-[0.06em]">
                {line.map((word, wi) => (
                  <span key={wi} className="hw mr-[0.22em]">
                    {li === 2
                      ? <span style={{ color: C.green }}>{word}</span>
                      : word}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          {/* sub */}
          <p className="hsub text-sm leading-[1.6] mb-5 max-w-[340px]"
            style={{ color: C.body }}>
            Productos artesanales con ingredientes 100% naturales.
            Sin compromiso con tu piel ni con el planeta.
          </p>

          {/* CTAs */}
          <div className="hsub flex flex-wrap gap-3 mb-6">
            <Link href="/productos"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm
                         text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-px"
              style={{ backgroundColor: C.dark }}>
              Ver colección →
            </Link>
            <Link href="/nosotros"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm
                         border-2 transition-all duration-300 hover:-translate-y-px"
              style={{ borderColor: C.dark, color: C.dark }}>
              Nuestra historia
            </Link>
          </div>

          {/* stats */}
          <div className="hsub flex gap-10 pt-5 border-t"
            style={{ borderColor: 'rgba(0,0,0,0.09)' }}>
            <CountStat target={500} label="Clientas"  suffix="+" />
            <CountStat target={50}  label="Productos" suffix="+" />
            <CountStat target={8}   label="Años"      suffix="+" />
          </div>
        </div>

        {/* ── Right image ── */}
        <div className="relative overflow-hidden" style={{ backgroundColor: C.muted }}>
          <div ref={imgRef}
            className="absolute"
            style={{ inset: '-20% 0', willChange: 'transform' }}>
            <Image src="/images/home/hero1.png" alt="Jabones artesanales Solo Para Eva"
              fill className="object-cover" priority />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg,rgba(247,244,239,0.15) 0%,transparent 28%), linear-gradient(0deg,rgba(28,43,18,0.44) 0%,transparent 52%)' }} />
          </div>

          {/* floating glass card */}
          <div className="absolute top-[10%] right-7 z-10 rounded-2xl px-5 py-4 shadow-2xl"
            style={{
              background: 'rgba(247,244,239,0.90)',
              border: '1px solid rgba(255,255,255,0.8)',
              backdropFilter: 'blur(20px)',
              animation: 'floatY 4s ease-in-out infinite',
            }}>
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] mb-1.5"
              style={{ color: C.green }}>Colección especial</p>
            <p className="font-serif text-sm font-semibold mb-2.5" style={{ color: C.dark }}>
              Jabones de lavanda & argán
            </p>
            <div className="flex items-center gap-1.5">
              <span style={{ color: '#C9A84C', fontSize: 11 }}>★★★★★</span>
              <span className="text-[11px]" style={{ color: '#aaa' }}>4.9 · 500+</span>
            </div>
          </div>

          {/* natural badge */}
          <div className="absolute bottom-8 left-7 z-10 rounded-full px-5 py-2.5 text-xs font-bold shadow-xl"
            style={{
              backgroundColor: C.sage, color: C.dark,
              animation: 'floatY 4s ease-in-out infinite 1.5s',
            }}>
            🌿 100% Natural
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="flex-shrink-0 py-3 overflow-hidden" style={{ backgroundColor: C.dark }}>
        <div className="flex gap-0 whitespace-nowrap" style={{ animation: 'marquee 30s linear infinite' }}>
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i}
              className="text-[10px] font-bold uppercase shrink-0 px-8"
              style={{ color: C.sage, letterSpacing: '0.28em' }}>
              {item} <span style={{ opacity: 0.35 }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
