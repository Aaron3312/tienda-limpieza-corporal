"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/productos', label: 'Productos' },
  { href: '/nosotros',  label: 'Nosotros'  },
  { href: '/contacto',  label: 'Contacto'  },
];

const BRAND = 'Solo Para Eva';

/* Colors matching the homepage palette */
const BG     = '#F7F4EF';
const DARK   = '#1C2B12';
const BORDER = 'rgba(28,43,18,0.08)';
const MUTED  = '#5A5A5A';

export default function Header() {
  const pathname              = usePathname();
  const [open,    setOpen]    = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close drawer on navigation */
  useEffect(() => { setOpen(false); }, [pathname]);

  /* prevent body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* ── Main header ─────────────────────────────── */}
      <header
        className="sticky top-0 z-50 h-16 transition-shadow duration-300"
        style={{
          backgroundColor: BG,
          borderBottom: `1px solid ${BORDER}`,
          boxShadow: scrolled ? '0 1px 24px rgba(28,43,18,0.07)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-full flex items-center justify-between gap-8">

          {/* Brand name */}
          <Link
            href="/"
            className="font-serif text-xl font-bold tracking-tight flex-shrink-0 select-none"
            style={{ color: DARK }}
          >
            {BRAND}
          </Link>

          {/* Desktop nav — centered */}
          <nav className="hidden sm:flex items-center gap-8 flex-1 justify-center">
            {NAV.map(({ href, label }) => {
              const active = pathname === href || pathname?.startsWith(href + '/');
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative text-sm font-medium transition-colors duration-200 group"
                  style={{ color: active ? DARK : MUTED }}
                >
                  {label}
                  {/* animated underline */}
                  <span
                    className="absolute -bottom-px left-0 h-px transition-all duration-300 ease-out"
                    style={{
                      width: active ? '100%' : '0%',
                      backgroundColor: DARK,
                    }}
                    /* CSS hover via inline won't work — use the group trick */
                  />
                  <span
                    className="absolute -bottom-px left-0 h-px w-0 group-hover:w-full transition-all duration-300 ease-out"
                    style={{ backgroundColor: active ? 'transparent' : MUTED }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* CTA button (desktop) */}
            <Link
              href="/productos"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:-translate-y-px"
              style={{ backgroundColor: DARK }}
            >
              Ver colección
            </Link>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setOpen(v => !v)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              className="sm:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg transition-colors duration-200"
              style={{ backgroundColor: open ? `${DARK}12` : 'transparent' }}
            >
              <span
                className="block w-5 h-0.5 rounded-full transition-all duration-300 origin-center"
                style={{
                  backgroundColor: DARK,
                  transform: open ? 'rotate(45deg) translateY(6px)' : 'none',
                }}
              />
              <span
                className="block w-5 h-0.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: DARK,
                  opacity: open ? 0 : 1,
                  transform: open ? 'scaleX(0)' : 'scaleX(1)',
                }}
              />
              <span
                className="block w-5 h-0.5 rounded-full transition-all duration-300 origin-center"
                style={{
                  backgroundColor: DARK,
                  transform: open ? 'rotate(-45deg) translateY(-6px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ───────────────────────────── */}

      {/* backdrop */}
      <div
        className="fixed inset-0 z-40 sm:hidden transition-opacity duration-300"
        style={{
          backgroundColor: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(4px)',
          opacity:         open ? 1 : 0,
          pointerEvents:   open ? 'auto' : 'none',
        }}
        onClick={() => setOpen(false)}
      />

      {/* panel */}
      <div
        className="fixed top-0 right-0 h-full w-72 z-50 sm:hidden flex flex-col transition-transform duration-300 ease-out"
        style={{
          backgroundColor: BG,
          transform:        open ? 'translateX(0)' : 'translateX(100%)',
          boxShadow: '-8px 0 40px rgba(28,43,18,0.12)',
        }}
      >
        {/* drawer header */}
        <div
          className="flex items-center justify-between px-6 h-16 flex-shrink-0"
          style={{ borderBottom: `1px solid ${BORDER}` }}
        >
          <span className="font-serif text-xl font-bold" style={{ color: DARK }}>
            {BRAND}
          </span>
          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-lg"
            style={{ backgroundColor: `${DARK}0A` }}
            aria-label="Cerrar menú"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={DARK} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* drawer links */}
        <nav className="flex flex-col px-6 py-6 flex-1 gap-1">
          {NAV.map(({ href, label }, i) => {
            const active = pathname === href || pathname?.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between py-4 text-base font-medium border-b"
                style={{
                  color:       active ? DARK : MUTED,
                  borderColor: BORDER,
                  fontWeight:  active ? 700 : 500,
                  transitionDelay: `${i * 30}ms`,
                }}
              >
                {label}
                <span style={{ color: active ? DARK : 'transparent' }}>→</span>
              </Link>
            );
          })}
        </nav>

        {/* drawer CTA */}
        <div className="px-6 pb-10 flex-shrink-0">
          <Link
            href="/productos"
            className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: DARK }}
          >
            Ver colección completa
          </Link>
          <p className="text-center text-xs mt-4" style={{ color: '#ccc' }}>
            100% natural · hecho a mano en México
          </p>
        </div>
      </div>
    </>
  );
}
