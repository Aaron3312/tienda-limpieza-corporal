'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { C } from './constants';

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set([ringRef.current, dotRef.current], { x: -200, y: -200 });

    const onMove = (e: MouseEvent) => {
      gsap.to(ringRef.current, { x: e.clientX - 16, y: e.clientY - 16, duration: 0.5, ease: 'power3.out' });
      gsap.to(dotRef.current,  { x: e.clientX - 3,  y: e.clientY - 3,  duration: 0.1 });
    };
    window.addEventListener('mousemove', onMove);

    const links = document.querySelectorAll('a,button');
    links.forEach(el => {
      el.addEventListener('mouseenter', () => gsap.to(ringRef.current, { scale: 1.8, duration: 0.3 }));
      el.addEventListener('mouseleave', () => gsap.to(ringRef.current, { scale: 1.0, duration: 0.3 }));
    });

    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div ref={ringRef}
        className="fixed z-[9999] w-8 h-8 rounded-full pointer-events-none mix-blend-difference hidden lg:block"
        style={{ top: 0, left: 0, backgroundColor: '#fff' }} />
      <div ref={dotRef}
        className="fixed z-[9999] w-1.5 h-1.5 rounded-full pointer-events-none hidden lg:block"
        style={{ top: 0, left: 0, backgroundColor: C.dark }} />
    </>
  );
}
