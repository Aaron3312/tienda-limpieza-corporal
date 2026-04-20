import Link from 'next/link';

const C = {
  dark:  '#1C2B12',
  green: '#5C7A3E',
  sage:  '#aad585',
  bg:    '#F7F4EF',
};

const NAV = [
  { label: 'Inicio',    href: '/' },
  { label: 'Productos', href: '/productos' },
  { label: 'Nosotros',  href: '/nosotros' },
  { label: 'Contacto',  href: '/contacto' },
];

const CATS = [
  { label: 'Capilares',         href: '/productos?categoria=cabello' },
  { label: 'Corporales',        href: '/productos?categoria=corporales' },
  { label: 'Faciales',          href: '/productos?categoria=faciales' },
  { label: 'SPA',               href: '/productos?categoria=spa' },
  { label: 'Kits personalizados', href: '/productos?categoria=kits' },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: C.dark }}>

      {/* main grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-14 lg:px-20 xl:px-24
                      pt-16 sm:pt-20 pb-10 sm:pb-12
                      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

        {/* brand */}
        <div className="lg:col-span-1">
          <Link href="/"
            className="font-serif text-xl font-bold text-white mb-4 block">
            Solo Para Eva
          </Link>
          <p className="text-sm leading-relaxed mb-5"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            Cosmética artesanal con ingredientes 100% naturales.
            Hecha con esmero, respeto y propósito.
          </p>
          <p className="font-serif text-xs italic leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.28)' }}>
            &ldquo;Porque Tú eres la fuente de vida,<br />la luz con la que vemos.&rdquo;
            <span className="block not-italic mt-1" style={{ color: 'rgba(255,255,255,0.18)' }}>
              — Salmos 36:9
            </span>
          </p>
        </div>

        {/* nav */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] mb-5"
            style={{ color: C.sage }}>Páginas</p>
          <ul className="space-y-3">
            {NAV.map(({ label, href }) => (
              <li key={href}>
                <Link href={href}
                  className="text-sm transition-colors duration-200"
                  style={{ color: 'rgba(255,255,255,0.52)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.52)')}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* categories */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] mb-5"
            style={{ color: C.sage }}>Categorías</p>
          <ul className="space-y-3">
            {CATS.map(({ label, href }) => (
              <li key={href}>
                <Link href={href}
                  className="text-sm transition-colors duration-200"
                  style={{ color: 'rgba(255,255,255,0.52)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.52)')}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* contact */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] mb-5"
            style={{ color: C.sage }}>Contacto</p>
          <ul className="space-y-3 mb-7">
            {[
              { icon: '📞', text: '+52 55 1802 6391' },
              { icon: '✉️', text: 'altardelcielogp@gmail.com' },
              { icon: '🕐', text: 'Lun–Sáb · 9am–5pm' },
            ].map(({ icon, text }) => (
              <li key={text} className="flex items-center gap-2.5 text-sm"
                style={{ color: 'rgba(255,255,255,0.52)' }}>
                <span className="text-base">{icon}</span>
                {text}
              </li>
            ))}
          </ul>

          {/* social */}
          <div className="flex gap-3">
            <a href="https://www.facebook.com/share/18kSRN2JWi/"
              target="_blank" rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.52)' }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://www.instagram.com/soloparaeva/"
              target="_blank" rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.52)' }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-14 lg:px-20 xl:px-24
                      py-6 border-t flex items-center justify-between"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
          © {new Date().getFullYear()} Solo Para Eva · Todos los derechos reservados
        </p>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.18)' }}>
          Hecho con amor 🌿
        </p>
      </div>
    </footer>
  );
}
