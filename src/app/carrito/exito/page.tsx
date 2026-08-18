'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Mail } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useSiteData } from '@/context/SiteDataContext';

function Confirmacion() {
  const { C, info } = useSiteData();
  const { vaciar, hidratado } = useCart();
  const parametros = useSearchParams();
  const simulado = parametros.get('simulado') === '1';
  const [vaciado, setVaciado] = useState(false);

  // El carrito se vacía sólo después de hidratar, o el efecto correría contra
  // un carrito que todavía no se ha leído de localStorage.
  useEffect(() => {
    if (hidratado && !vaciado) {
      vaciar();
      setVaciado(true);
    }
  }, [hidratado, vaciado, vaciar]);

  return (
    <main
      className="min-h-[70vh] flex items-center"
      style={{ backgroundColor: C.bg }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="w-14 h-14 rounded-full grid place-items-center mb-8"
          style={{ backgroundColor: C.sage }}
        >
          <Check size={24} strokeWidth={2} style={{ color: C.dark }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
        >
          <h1
            className="text-3xl md:text-5xl tracking-tighter leading-none mb-5"
            style={{ color: C.dark }}
          >
            Gracias por tu compra
          </h1>

          <p className="text-base leading-relaxed max-w-[55ch]" style={{ color: C.body }}>
            Tu pedido quedó registrado y ya estamos preparándolo. Cada pieza se hace a mano en
            lotes pequeños, así que la cuidamos una por una.
          </p>

          <p
            className="mt-5 flex items-start gap-2.5 text-sm leading-relaxed max-w-[55ch]"
            style={{ color: C.body }}
          >
            <Mail size={16} strokeWidth={1.5} className="mt-0.5 shrink-0" />
            Te enviamos la confirmación por correo. Si no la ves, revisa tu carpeta de spam o
            escríbenos a {info.contacto?.email}.
          </p>

          {simulado ? (
            <p
              className="mt-8 text-sm leading-relaxed rounded-md px-4 py-3 max-w-[55ch]"
              style={{ backgroundColor: C.muted, color: C.body }}
            >
              Pago simulado: esta compra no cobró dinero. Se generó un pedido de demostración para
              mostrar el flujo completo.
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3 mt-10">
            <Link
              href="/productos"
              className="px-7 py-3.5 rounded-md text-sm tracking-wide transition-all active:scale-[0.98]"
              style={{ backgroundColor: C.green, color: '#FFFFFF' }}
            >
              Seguir comprando
            </Link>
            <Link
              href="/"
              className="px-7 py-3.5 rounded-md text-sm tracking-wide border transition-all active:scale-[0.98]"
              style={{ borderColor: C.sage, color: C.dark }}
            >
              Volver al inicio
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default function ExitoPage() {
  return (
    <Suspense fallback={null}>
      <Confirmacion />
    </Suspense>
  );
}
