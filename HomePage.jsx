// ═══════════════════════════════════════════════
//  Solo Para Eva — HOME PAGE v2 · Ultra Premium
// ═══════════════════════════════════════════════
const H = {
  bg:    '#F7F4EF',
  dark:  '#1C2B12',
  green: '#5C7A3E',
  sage:  '#aad585',
  muted: '#EDE8DF',
  body:  '#7A7060',
  gold:  '#C9A84C',
};

// ── Utility: scroll reveal via IntersectionObserver ──
function useReveal(ref, opts = {}) {
  React.useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const delay = e.target.dataset.delay || 0;
          setTimeout(() => e.target.classList.add('revealed'), Number(delay));
          io.unobserve(e.target);
        }
      });
    }, { threshold: opts.threshold || 0.15, ...opts });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ── Custom Cursor — rendered at portal level to avoid transform containment ──
function CustomCursor() {
  const dotRef  = React.useRef(null);
  const ringRef = React.useRef(null);
  const pos     = React.useRef({ x: -200, y: -200 });
  const ring    = React.useRef({ x: -200, y: -200 });
  const raf     = React.useRef(null);

  React.useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    // delegated hover detection — no need to attach per-element
    const onOver = (e) => {
      if (e.target.closest('a,button,[data-cursor]')) {
        ringRef.current?.classList.add('cursor-hover');
      } else {
        ringRef.current?.classList.remove('cursor-hover');
      }
    };
    document.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });

    const tick = () => {
      if (dotRef.current) {
        // use left/top instead of transform so no containing-block issues
        dotRef.current.style.left = `${pos.current.x - 4}px`;
        dotRef.current.style.top  = `${pos.current.y - 4}px`;
      }
      if (ringRef.current) {
        ring.current.x += (pos.current.x - ring.current.x) * 0.12;
        ring.current.y += (pos.current.y - ring.current.y) * 0.12;
        ringRef.current.style.left = `${ring.current.x - 20}px`;
        ringRef.current.style.top  = `${ring.current.y - 20}px`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  // Render directly into document.body via portal so it's never inside a transformed ancestor
  return ReactDOM.createPortal(
    <>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>,
    document.body
  );
}

// ── HERO ──
function Hero({ setPage }) {
  const ref    = React.useRef(null);
  const imgRef = React.useRef(null);

  // Parallax on scroll
  React.useEffect(() => {
    const fn = () => {
      if (!imgRef.current) return;
      const y = window.scrollY;
      imgRef.current.style.transform = `translateY(${y * 0.28}px)`;
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Entrance: staggered clip-path word reveal
  React.useEffect(() => {
    const words = ref.current?.querySelectorAll('.hw');
    words?.forEach((w, i) => {
      setTimeout(() => w.classList.add('hw-in'), 300 + i * 90);
    });
    const subs = ref.current?.querySelectorAll('.hsub');
    subs?.forEach((s, i) => {
      setTimeout(() => s.classList.add('hsub-in'), 900 + i * 120);
    });
  }, []);

  return (
    <section ref={ref} style={{ height: '100vh', display: 'grid', gridTemplateColumns: '48% 52%', overflow: 'hidden', position: 'relative' }} className="hero-section">

      {/* ── Left copy ── */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(40px,5vw,80px) clamp(24px,5vw,80px)', position: 'relative', zIndex: 2, backgroundColor: H.bg }}>

        {/* Overline */}
        <div className="hsub" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36, opacity: 0, transform: 'translateY(16px)', transition: 'all 0.7s ease' }}>
          <span style={{ display: 'block', width: 28, height: 1, backgroundColor: H.green }} />
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.32em', color: H.green, fontFamily: "'DM Sans',sans-serif" }}>
            Cosmética Artesanal · México
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ margin: '0 0 32px', fontFamily: "'Cormorant Garamond',Georgia,serif", lineHeight: 0.92, letterSpacing: '-0.025em', color: H.dark, fontSize: 'clamp(3.8rem,6.5vw,7rem)', fontWeight: 700 }}>
          {[['Cuida'],['tu piel,'],['ama la'],['naturaleza.']].map((line, li) => (
            <span key={li} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em' }}>
              {line.map((word, wi) => (
                <span key={wi} className="hw" style={{ display: 'inline-block', transform: 'translateY(110%)', transition: `transform 1s cubic-bezier(0.16,1,0.3,1)`, marginRight: '0.25em' }}>
                  {li === 2 ? <em style={{ fontStyle: 'normal', color: H.green }}>{word}</em> : word}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className="hsub" style={{ fontSize: 'clamp(14px,1.1vw,17px)', lineHeight: 1.75, color: H.body, maxWidth: 360, marginBottom: 40, opacity: 0, transform: 'translateY(16px)', transition: 'all 0.7s ease', fontFamily: "'DM Sans',sans-serif" }}>
          Productos artesanales con ingredientes 100% naturales. Sin compromiso con tu piel ni con el planeta.
        </p>

        {/* CTAs */}
        <div className="hsub" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 56, opacity: 0, transform: 'translateY(16px)', transition: 'all 0.7s ease' }}>
          <MagneticBtn onClick={() => setPage('productos')} dark>Ver colección →</MagneticBtn>
          <MagneticBtn onClick={() => setPage('nosotros')}>Nuestra historia</MagneticBtn>
        </div>

        {/* Stats */}
        <div className="hsub" style={{ display: 'flex', gap: 40, paddingTop: 32, borderTop: '1px solid rgba(0,0,0,0.08)', opacity: 0, transform: 'translateY(16px)', transition: 'all 0.7s ease' }}>
          {[['500','Clientas'],['50','Productos'],['8','Años']].map(([n,l]) => (
            <CountStat key={l} target={Number(n)} label={l} suffix="+" />
          ))}
        </div>
      </div>

      {/* ── Right image with parallax ── */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div ref={imgRef} style={{ position: 'absolute', inset: '-20% 0', willChange: 'transform' }}>
          <img src="images/home/stock-hero-soap.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(247,244,239,0.18) 0%, transparent 30%), linear-gradient(0deg, rgba(28,43,18,0.45) 0%, transparent 50%)' }} />
        </div>

        {/* Floating glass card */}
        <div className="float-card" style={{
          position: 'absolute', top: '12%', right: 28, zIndex: 10,
          background: 'rgba(247,244,239,0.88)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.8)', borderRadius: 20,
          padding: '18px 22px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          animation: 'floatY 4s ease-in-out infinite',
        }}>
          <p style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.24em', color: H.green, margin: '0 0 6px', fontFamily: "'DM Sans',sans-serif" }}>Colección especial</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: H.dark, margin: '0 0 10px', fontFamily: "'Cormorant Garamond',Georgia,serif" }}>Jabones de lavanda & argán</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: H.gold, fontSize: 11 }}>★★★★★</span>
            <span style={{ fontSize: 11, color: '#aaa', fontFamily: "'DM Sans',sans-serif" }}>4.9 · 500+</span>
          </div>
        </div>

        {/* Natural badge */}
        <div style={{
          position: 'absolute', bottom: 32, left: 28, zIndex: 10,
          background: H.sage, color: H.dark, borderRadius: 100,
          padding: '10px 22px', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em',
          fontFamily: "'DM Sans',sans-serif",
          animation: 'floatY 4s ease-in-out infinite 1.5s',
        }}>🌿 100% Natural</div>
      </div>

      <style>{`
        .hero-section { background: ${H.bg}; }
        .hw-in  { transform: translateY(0) !important; }
        .hsub-in { opacity: 1 !important; transform: translateY(0) !important; }
        @media(max-width:768px){
          .hero-section { grid-template-columns: 1fr !important; height: auto !important; }
          .hero-section > div:last-child { min-height: 55vw; }
        }
        @keyframes floatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      `}</style>
    </section>
  );
}

// ── Magnetic Button ──
function MagneticBtn({ children, onClick, dark: isDark }) {
  const ref = React.useRef(null);
  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.28;
    const y = (e.clientY - r.top  - r.height / 2) * 0.28;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const handleLeave = () => { ref.current.style.transform = 'translate(0,0)'; };
  return (
    <button ref={ref} onClick={onClick} onMouseMove={handleMove} onMouseLeave={handleLeave} style={{
      padding: '14px 30px', borderRadius: 100, cursor: 'pointer', fontSize: 13,
      fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
      fontFamily: "'DM Sans',sans-serif", transition: 'box-shadow 0.3s, background 0.3s, color 0.3s',
      background: isDark ? H.dark : 'transparent',
      color: isDark ? '#fff' : H.dark,
      border: isDark ? 'none' : `2px solid ${H.dark}`,
    }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow = isDark ? '0 14px 40px rgba(28,43,18,0.3)' : 'none'; e.currentTarget.style.background = isDark ? H.green : H.dark; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = H.dark; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = isDark ? H.dark : 'transparent'; e.currentTarget.style.color = isDark ? '#fff' : H.dark; e.currentTarget.style.borderColor = H.dark; handleLeave(); }}
    >{children}</button>
  );
}

// ── Animated counter ──
function CountStat({ target, label, suffix = '' }) {
  const [val, setVal] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let start = 0; const dur = 1400;
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / dur, 1);
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
      <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 30, fontWeight: 700, color: H.green, margin: 0, lineHeight: 1 }}>{val}{suffix}</p>
      <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#bbb', margin: '5px 0 0', fontFamily: "'DM Sans',sans-serif" }}>{label}</p>
    </div>
  );
}

// ── Marquee ──
function MarqueeBar() {
  const items = ['Cosmética Artesanal','100% Natural','Sin Parabenos','Cruelty Free','Hecho en México','Eco-consciente','Ingredientes Naturales','Con Amor'];
  return (
    <div style={{ backgroundColor: H.dark, padding: '13px 0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 0, whiteSpace: 'nowrap', animation: 'marquee 30s linear infinite' }}>
        {[...items,...items,...items,...items].map((item, i) => (
          <span key={i} style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.28em', color: H.sage, flexShrink: 0, padding: '0 32px', fontFamily: "'DM Sans',sans-serif" }}>
            {item} <span style={{ opacity: 0.35, marginLeft: 0 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Featured Products ──
function FeaturedSection({ setPage }) {
  const ref = React.useRef(null);
  const featured = window.PRODUCTOS.filter(p => p.destacado).slice(0, 5);
  useReveal(ref, { threshold: 0.1 });

  return (
    <section ref={ref} style={{ backgroundColor: H.bg, padding: 'clamp(72px,8vw,120px) 0' }}>
      {/* Header */}
      <div data-reveal data-delay="0" style={{ padding: '0 clamp(24px,5vw,80px)', marginBottom: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}
        className="reveal-fade-up">
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', color: H.green, marginBottom: 12, fontFamily: "'DM Sans',sans-serif" }}>Lo más amado</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2.4rem,4.5vw,4rem)', fontWeight: 700, color: H.dark, margin: 0, lineHeight: 0.95 }}>Productos destacados</h2>
        </div>
        <button onClick={() => setPage('productos')} style={{
          background: 'transparent', border: `2px solid ${H.dark}`, color: H.dark,
          padding: '12px 26px', borderRadius: 100, fontSize: 12, fontWeight: 600,
          letterSpacing: '0.08em', cursor: 'pointer', transition: 'all 0.25s',
          fontFamily: "'DM Sans',sans-serif", textTransform: 'uppercase',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = H.dark; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = H.dark; }}
        >Ver todo →</button>
      </div>

      {/* Horizontal scroll track */}
      <div style={{ display: 'flex', gap: 24, overflowX: 'auto', paddingLeft: 'clamp(24px,5vw,80px)', paddingRight: 'clamp(24px,5vw,80px)', paddingBottom: 24, scrollbarWidth: 'none', cursor: 'grab' }}
        className="feat-scroll"
        onMouseDown={e => {
          const el = e.currentTarget; let startX = e.pageX - el.offsetLeft; let scrollL = el.scrollLeft;
          const onMove = (ev) => { el.scrollLeft = scrollL - (ev.pageX - el.offsetLeft - startX); };
          const onUp = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
          window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp);
        }}>
        {featured.map((p, i) => (
          <div key={p.id} data-reveal data-delay={i * 80} className="reveal-fade-up">
            <FeatCard p={p} setPage={setPage} tall={i === 1} />
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatCard({ p, setPage, tall }) {
  const ref = React.useRef(null);
  const catLabel = { cabello:'Cabello', corporales:'Corporales', faciales:'Faciales', spa:'SPA', kits:'Kits' }[p.categoria] || p.categoria;

  const tilt = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 14;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * -14;
    ref.current.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateZ(8px)`;
  };
  const resetTilt = () => { ref.current.style.transform = 'perspective(600px) rotateY(0) rotateX(0) translateZ(0)'; };

  return (
    <div ref={ref} onClick={() => setPage('productos')}
      onMouseMove={tilt} onMouseLeave={resetTilt}
      style={{ flexShrink: 0, width: 280, height: tall ? 420 : 360, borderRadius: 24, overflow: 'hidden', cursor: 'pointer', position: 'relative', transition: 'transform 0.08s ease, box-shadow 0.4s ease', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', willChange: 'transform' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 24px 60px rgba(28,43,18,0.2)'}
    >
      <img src={p.imagen} alt={p.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
        onMouseEnter={e => e.target.style.transform = 'scale(1.07)'}
        onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,43,18,0.82) 0%, rgba(28,43,18,0.1) 50%, transparent 100%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 22px' }}>
        <p style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.24em', color: H.sage, margin: '0 0 5px', fontFamily: "'DM Sans',sans-serif" }}>{catLabel}</p>
        <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 6px', lineHeight: 1.1 }}>{p.nombre}</h3>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.5, fontFamily: "'DM Sans',sans-serif", display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.descripcion}</p>
      </div>
      {p.destacado && (
        <div style={{ position: 'absolute', top: 16, right: 16, background: H.sage, color: H.dark, borderRadius: 100, padding: '5px 12px', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: "'DM Sans',sans-serif" }}>✦ Favorito</div>
      )}
    </div>
  );
}

// ── Manifesto ──
function ManifestoSection() {
  const ref = React.useRef(null);
  const words = "Cada producto nace de la convicción de que cada mujer merece lo mejor — ingredientes honestos, formulados con esmero y respeto por su piel y por el planeta.".split(' ');

  React.useEffect(() => {
    const spans = ref.current?.querySelectorAll('.mw');
    if (!spans?.length) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      spans.forEach((s, i) => setTimeout(() => s.classList.add('mw-in'), i * 40));
      io.disconnect();
    }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ backgroundColor: H.dark, padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
      {/* Grain overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")', opacity: 0.4, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', color: H.sage, marginBottom: 36, fontFamily: "'DM Sans',sans-serif" }}>Nuestro manifiesto</p>
        <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(1.9rem,3.6vw,3.4rem)', fontWeight: 600, lineHeight: 1.35, fontStyle: 'italic', margin: '0 0 48px' }}>
          {words.map((w, i) => (
            <span key={i} className="mw" style={{ color: 'rgba(255,255,255,0.18)', transition: `color 0.5s ease`, display: 'inline' }}>
              {w}{' '}
            </span>
          ))}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 40, height: 1, backgroundColor: H.sage }} />
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Sans',sans-serif", textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0 }}>Solo Para Eva · Desde 2016</p>
        </div>
      </div>
      <style>{`.mw-in { color: rgba(255,255,255,0.9) !important; }`}</style>
    </section>
  );
}

// ── Bento Benefits ──
function BentoSection() {
  const ref = React.useRef(null);
  useReveal(ref, { threshold: 0.1 });

  const items = [
    { icon: '🌿', title: 'Ingredientes naturales', desc: 'Sin químicos dañinos. Solo lo que la naturaleza nos da.', bg: H.muted, span: 'col' },
    { icon: '🐾', title: 'Sin crueldad animal', desc: 'Nunca testeamos en animales. Cosmética ética y responsable.', bg: H.sage + '55', span: '' },
    { icon: '♻️', title: 'Eco-consciente', desc: 'Empaque sostenible y producción en pequeños lotes respetuosos.', bg: '#E8F4D9', span: '' },
    { icon: '✋', title: 'Hecho a mano', desc: 'Cada producto es creado artesanalmente con amor y cuidado.', bg: H.dark, dark: true, span: 'row' },
    { icon: '💚', title: 'Con propósito', desc: 'Comprometidas con el bienestar integral de la mujer.', bg: H.green + '20', span: '' },
  ];

  return (
    <section ref={ref} style={{ backgroundColor: H.bg, padding: 'clamp(72px,8vw,120px) clamp(24px,5vw,80px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div data-reveal data-delay="0" className="reveal-fade-up" style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', color: H.green, marginBottom: 12, fontFamily: "'DM Sans',sans-serif" }}>Por qué elegirnos</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2.2rem,4vw,3.6rem)', fontWeight: 700, color: H.dark, margin: 0, lineHeight: 1 }}>Cosmética con propósito</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto auto', gap: 16 }} className="bento-grid">
          {items.map(({ icon, title, desc, bg, dark: isDark, span }, i) => (
            <div key={title} data-reveal data-delay={i * 80} className="reveal-fade-up bento-item" style={{
              backgroundColor: bg, borderRadius: 24, padding: 'clamp(28px,3vw,40px)',
              gridColumn: span === 'col' ? 'span 2' : 'span 1',
              gridRow: span === 'row' ? 'span 2' : 'span 1',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              minHeight: 220, transition: 'transform 0.35s ease, box-shadow 0.35s ease',
              cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 56px rgba(0,0,0,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <span style={{ fontSize: 40, display: 'block' }}>{icon}</span>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 22, fontWeight: 700, color: isDark ? '#fff' : H.dark, margin: '0 0 10px' }}>{title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: isDark ? 'rgba(255,255,255,0.6)' : H.body, margin: 0, fontFamily: "'DM Sans',sans-serif" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:640px){ .bento-grid { grid-template-columns: 1fr !important; } .bento-item { grid-column: span 1 !important; grid-row: span 1 !important; } }`}</style>
    </section>
  );
}

// ── Brand Story ──
function BrandStory({ setPage }) {
  const ref    = React.useRef(null);
  const imgRef = React.useRef(null);
  useReveal(ref, { threshold: 0.1 });

  React.useEffect(() => {
    const fn = () => {
      if (!imgRef.current) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const pct = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      imgRef.current.style.transform = `translateY(${(pct - 0.5) * -60}px)`;
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <section ref={ref} style={{ backgroundColor: H.dark, overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="story-grid">
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: 560 }}>
          <div ref={imgRef} style={{ position: 'absolute', inset: '-15% 0', willChange: 'transform' }}>
            <img src="images/home/stock-brand-making.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {/* Image grid overlay */}
          <div style={{ position: 'absolute', bottom: 28, right: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, width: 160 }}>
            {['images/home/stock-brand-ingredients.jpg','images/home/stock-soap-bars.jpg'].map((src, i) => (
              <div key={i} style={{ width: 76, height: 76, borderRadius: 14, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.2)' }}>
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Copy */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(56px,6vw,96px) clamp(32px,5vw,80px)' }}>
          <p data-reveal data-delay="0" className="reveal-fade-up" style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', color: H.sage, marginBottom: 24, fontFamily: "'DM Sans',sans-serif" }}>Nuestra historia</p>
          <h2 data-reveal data-delay="80" className="reveal-fade-up" style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2rem,3.8vw,3.6rem)', fontWeight: 700, color: '#fff', lineHeight: 1.05, margin: '0 0 24px' }}>
            Nacimos de la convicción de que cada mujer merece lo mejor.
          </h2>
          <p data-reveal data-delay="160" className="reveal-fade-up" style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', marginBottom: 14, fontFamily: "'DM Sans',sans-serif" }}>
            Desde 2016, SoloParaEva es una pequeña empresa comprometida con el bienestar y salud de las mujeres, a través de la cosmética artesanal y los servicios de spa.
          </p>
          <p data-reveal data-delay="220" className="reveal-fade-up" style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', marginBottom: 40, fontFamily: "'DM Sans',sans-serif" }}>
            Cada jabón, crema y exfoliante es creado a mano en pequeños lotes, con ingredientes que conocemos y en los que confiamos.
          </p>
          <div data-reveal data-delay="280" className="reveal-fade-up">
            <button onClick={() => setPage('nosotros')} style={{
              background: H.sage, color: H.dark, border: 'none', cursor: 'pointer',
              padding: '14px 32px', borderRadius: 100, fontSize: 12, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.3s',
              fontFamily: "'DM Sans',sans-serif",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 48px rgba(170,213,133,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >Conocer más →</button>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){ .story-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ── Testimonials ──
function TestimonialsSection() {
  const testimonios = [
    { nombre: 'Ana R.', texto: 'Los jabones son increíbles, mi piel nunca había estado tan hidratada. ¡Ya no uso otra cosa!', producto: 'Jabón Gourmet' },
    { nombre: 'María L.', texto: 'La crema de rosas es maravillosa. El aroma es delicado y dura todo el día. Totalmente recomendada.', producto: 'Crema de Rosas' },
    { nombre: 'Carmen G.', texto: 'El kit de baño fue un regalo perfecto para mi mamá. Quedó encantada con la calidad artesanal.', producto: 'Kit de Baño' },
    { nombre: 'Sofía M.', texto: 'El shampo sólido cambió mi vida, el cabello me creció y tengo mucho menos caída. ¡Lo recomiendo!', producto: 'Shampo Sólido' },
  ];
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % testimonios.length), 4000);
    return () => clearInterval(t);
  }, []);

  const cur = testimonios[idx];

  return (
    <section style={{ backgroundColor: H.muted, padding: 'clamp(72px,8vw,120px) clamp(24px,5vw,80px)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', color: H.green, marginBottom: 48, fontFamily: "'DM Sans',sans-serif" }}>Testimonios</p>

        {/* Big quote */}
        <div style={{ position: 'relative', minHeight: 160 }}>
          <div style={{ fontSize: 'clamp(80px,12vw,140px)', lineHeight: 0.7, color: H.sage, fontFamily: "'Cormorant Garamond',Georgia,serif", marginBottom: 16, opacity: 0.6, userSelect: 'none' }}>"</div>
          <p key={idx} style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(1.3rem,2.4vw,2rem)', fontStyle: 'italic', color: H.dark, lineHeight: 1.5, margin: '0 0 32px', animation: 'fadeIn 0.6s ease' }}>
            {cur.texto}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: H.dark, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 700, fontFamily: "'Cormorant Garamond',Georgia,serif" }}>{cur.nombre[0]}</div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: H.dark, margin: 0, fontFamily: "'DM Sans',sans-serif" }}>{cur.nombre}</p>
              <p style={{ fontSize: 11, color: H.green, margin: '2px 0 0', fontFamily: "'DM Sans',sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>{cur.producto}</p>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 36 }}>
          {testimonios.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{
              width: i === idx ? 28 : 8, height: 8, borderRadius: 100, border: 'none', cursor: 'pointer',
              background: i === idx ? H.dark : 'rgba(0,0,0,0.2)',
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
            }} />
          ))}
        </div>
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }`}</style>
    </section>
  );
}

// ── CTA ──
function CtaSection({ setPage }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: 480, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src="images/home/stock-cta-bg.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(28,43,18,0.82) 0%, rgba(28,43,18,0.65) 100%)' }} />
      {/* Grain */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.05\'/%3E%3C/svg%3E")', opacity: 0.5, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: 'clamp(80px,10vw,120px) clamp(24px,5vw,80px)', maxWidth: 680 }}>
        <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.32em', color: H.sage, marginBottom: 20, fontFamily: "'DM Sans',sans-serif" }}>¿Lista para empezar?</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2.6rem,5.5vw,5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.0, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
          Tu piel merece<br /><em style={{ fontStyle: 'normal', color: H.sage }}>lo mejor</em> de la naturaleza.
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 40, fontFamily: "'DM Sans',sans-serif" }}>Explora nuestra colección completa de productos artesanales creados especialmente para ti.</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => setPage('productos')} style={{
            background: H.sage, color: H.dark, border: 'none', cursor: 'pointer',
            padding: '16px 40px', borderRadius: 100, fontSize: 13, fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.3s',
            fontFamily: "'DM Sans',sans-serif",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 18px 56px rgba(170,213,133,0.45)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
          >Ver productos →</button>
          <button onClick={() => setPage('contacto')} style={{
            background: 'transparent', color: '#fff', cursor: 'pointer',
            padding: '16px 40px', borderRadius: 100, fontSize: 13, fontWeight: 600,
            border: '2px solid rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.3s',
            fontFamily: "'DM Sans',sans-serif",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'transparent'; }}
          >Contáctanos</button>
        </div>
      </div>
    </section>
  );
}

// ── Global CSS for reveal animations ──
const HomeStyles = () => (
  <style>{`
    /* Cursor — portal-rendered into body, so never trapped by transforms */
    body.spe-home, body.spe-home * { cursor: none !important; }
    .cursor-dot  { position: fixed; width: 8px; height: 8px; border-radius: 50%; background: ${H.dark}; pointer-events: none; z-index: 999999; top: -100px; left: -100px; will-change: left, top; }
    .cursor-ring { position: fixed; width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid rgba(28,43,18,0.7); pointer-events: none; z-index: 999998; top: -100px; left: -100px; will-change: left, top; opacity: 0.6; transition: width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s, border-color 0.3s; }
    .cursor-ring.cursor-hover { width: 60px; height: 60px; background: rgba(170,213,133,0.15); border-color: ${H.green}; opacity: 0.9; }
    @media(hover: none){ .cursor-dot, .cursor-ring { display: none; } }

    /* Reveal */
    [data-reveal] { opacity: 0; transform: translateY(28px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
    [data-reveal].revealed { opacity: 1; transform: translateY(0); }

    /* Marquee */
    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

    /* feat scroll hide scrollbar */
    .feat-scroll::-webkit-scrollbar { display: none; }
    .feat-scroll { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

// ── Main HomePage ──
function HomePage({ setPage }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('spe-home');
    return () => { document.body.classList.remove('spe-home'); };
  }, []);
  return (
    <>
      <HomeStyles />
      <CustomCursor />
      <div style={{ backgroundColor: H.bg }}>
        <Hero setPage={setPage} />
        <MarqueeBar />
        <FeaturedSection setPage={setPage} />
        <ManifestoSection />
        <BentoSection />
        <BrandStory setPage={setPage} />
        <TestimonialsSection />
        <CtaSection setPage={setPage} />
      </div>
    </>
  );
}

Object.assign(window, { HomePage });
