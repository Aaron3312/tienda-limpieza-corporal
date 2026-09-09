'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Clock, Mail, XCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useSiteData } from '@/context/SiteDataContext';
import { formatearPrecio } from '@/lib/comercio';
import type { LineaPedido } from '@/types';

interface Resumen {
  pagado: boolean;
  pedidoId: string | null;
  referencia: string | null;
  email: string | null;
  total: number;
  items: LineaPedido[];
  simulado: boolean;
}

type Estado =
  | { fase: 'cargando' }
  | { fase: 'confirmado'; resumen: Resumen }
  | { fase: 'procesando'; resumen: Resumen }
  | { fase: 'no-pagado'; resumen: Resumen }
  | { fase: 'error'; mensaje: string };

const INTENTOS_MAX = 8;

function Confirmacion() {
  const { C, info } = useSiteData();
  const { vaciar, hidratado } = useCart();
  const { user } = useAuth();
  const parametros = useSearchParams();
  const sessionId = parametros.get('session_id');
  const pedidoSimulado = parametros.get('pedido');

  const [estado, setEstado] = useState<Estado>({ fase: 'cargando' });
  const [vaciado, setVaciado] = useState(false);

  // Se consulta al servidor qué pasó con la sesión. El webhook puede tardar
  // unos segundos en crear el pedido, así que se reintenta un rato.
  useEffect(() => {
    if (!sessionId && !pedidoSimulado) {
      setEstado({ fase: 'error', mensaje: 'Falta la referencia del pago.' });
      return;
    }
    let cancelado = false;
    let intentos = 0;

    async function consultar() {
      intentos += 1;
      try {
        const qs = sessionId ? `session_id=${encodeURIComponent(sessionId)}` : `pedido=${encodeURIComponent(pedidoSimulado!)}`;
        const r = await fetch(`/api/checkout/sesion?${qs}`, { cache: 'no-store' });
        const datos = await r.json();
        if (cancelado) return;
        if (!r.ok) {
          setEstado({ fase: 'error', mensaje: datos?.error ?? 'No pudimos verificar el pago.' });
          return;
        }
        const resumen = datos as Resumen;
        if (!resumen.pagado) {
          setEstado({ fase: 'no-pagado', resumen });
          return;
        }
        if (resumen.pedidoId) {
          setEstado({ fase: 'confirmado', resumen });
          return;
        }
        setEstado({ fase: 'procesando', resumen });
        if (intentos < INTENTOS_MAX) setTimeout(consultar, 2000);
      } catch {
        if (!cancelado) setEstado({ fase: 'error', mensaje: 'No pudimos verificar el pago. Revisa tu correo.' });
      }
    }

    consultar();
    return () => {
      cancelado = true;
    };
  }, [sessionId, pedidoSimulado]);

  // El carrito se vacía sólo con pago confirmado y después de hidratar.
  const pagado = estado.fase === 'confirmado' || estado.fase === 'procesando';
  useEffect(() => {
    if (hidratado && pagado && !vaciado) {
      vaciar();
      setVaciado(true);
    }
  }, [hidratado, pagado, vaciado, vaciar]);

  const resumen = 'resumen' in estado ? estado.resumen : null;

  return (
    <main className="min-h-[70vh] flex items-center" style={{ backgroundColor: C.bg }}>
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-24 grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-20 items-start">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="w-14 h-14 rounded-full grid place-items-center mb-8"
            style={{ backgroundColor: estado.fase === 'no-pagado' || estado.fase === 'error' ? '#F3E4E1' : C.sage }}
          >
            {estado.fase === 'cargando' || estado.fase === 'procesando' ? (
              <Clock size={22} strokeWidth={1.5} style={{ color: C.dark }} />
            ) : estado.fase === 'confirmado' ? (
              <Check size={24} strokeWidth={2} style={{ color: C.dark }} />
            ) : (
              <XCircle size={24} strokeWidth={1.5} style={{ color: '#7A2E22' }} />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
          >
            {estado.fase === 'cargando' ? (
              <>
                <div className="h-10 w-72 rounded animate-pulse mb-5" style={{ backgroundColor: C.muted }} />
                <div className="h-4 w-96 max-w-full rounded animate-pulse" style={{ backgroundColor: C.muted }} />
              </>
            ) : null}

            {estado.fase === 'confirmado' || estado.fase === 'procesando' ? (
              <>
                <h1 className="text-3xl md:text-5xl tracking-tighter leading-none mb-5" style={{ color: C.dark }}>
                  Gracias por tu compra
                </h1>
                <p className="text-base leading-relaxed max-w-[55ch]" style={{ color: C.body }}>
                  {estado.fase === 'confirmado' ? (
                    <>
                      Tu pedido <strong style={{ color: C.dark }}>{estado.resumen.referencia}</strong> quedó registrado y ya
                      estamos preparándolo. Cada pieza se hace a mano en lotes pequeños, así que la cuidamos una por una.
                    </>
                  ) : (
                    <>
                      Tu pago se recibió. Estamos registrando el pedido, tarda unos segundos. Si cierras esta página no
                      pasa nada: la confirmación llega igual a tu correo.
                    </>
                  )}
                </p>
                <p className="mt-5 flex items-start gap-2.5 text-sm leading-relaxed max-w-[55ch]" style={{ color: C.body }}>
                  <Mail size={16} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                  {resumen?.email ? (
                    <>
                      Te enviamos la confirmación a <span style={{ color: C.dark }}>{resumen.email}</span>. Si no la ves,
                      revisa spam o escríbenos a {info.contacto?.email}.
                    </>
                  ) : (
                    <>Te enviamos la confirmación por correo. Si no la ves, revisa spam o escríbenos a {info.contacto?.email}.</>
                  )}
                </p>
                {resumen?.simulado ? (
                  <p className="mt-8 text-sm leading-relaxed rounded-md px-4 py-3 max-w-[55ch]" style={{ backgroundColor: C.muted, color: C.body }}>
                    Pago simulado: esta compra no cobró dinero. Se generó un pedido de demostración para mostrar el flujo
                    completo.
                  </p>
                ) : null}
              </>
            ) : null}

            {estado.fase === 'no-pagado' ? (
              <>
                <h1 className="text-3xl md:text-5xl tracking-tighter leading-none mb-5" style={{ color: C.dark }}>
                  El pago no se completó
                </h1>
                <p className="text-base leading-relaxed max-w-[55ch]" style={{ color: C.body }}>
                  Stripe no registró el cobro de esta sesión. No se hizo ningún cargo. Tu carrito sigue guardado en este
                  navegador por si quieres intentarlo otra vez.
                </p>
              </>
            ) : null}

            {estado.fase === 'error' ? (
              <>
                <h1 className="text-3xl md:text-5xl tracking-tighter leading-none mb-5" style={{ color: C.dark }}>
                  No pudimos verificar el pago
                </h1>
                <p className="text-base leading-relaxed max-w-[55ch]" style={{ color: C.body }}>
                  {estado.mensaje} Si tu banco muestra el cargo, escríbenos a {info.contacto?.email} con la hora de la
                  compra y lo resolvemos.
                </p>
              </>
            ) : null}

            <div className="flex flex-wrap gap-3 mt-10">
              {estado.fase === 'no-pagado' ? (
                <Link
                  href="/carrito"
                  className="px-7 py-3.5 rounded-md text-sm tracking-wide transition-all active:scale-[0.98]"
                  style={{ backgroundColor: C.green, color: '#FFFFFF' }}
                >
                  Volver al carrito
                </Link>
              ) : null}
              {user && pagado ? (
                <Link
                  href="/cuenta"
                  className="px-7 py-3.5 rounded-md text-sm tracking-wide transition-all active:scale-[0.98]"
                  style={{ backgroundColor: C.dark, color: '#FFFFFF' }}
                >
                  Ver mis pedidos
                </Link>
              ) : null}
              <Link
                href="/productos"
                className="px-7 py-3.5 rounded-md text-sm tracking-wide transition-all active:scale-[0.98]"
                style={
                  estado.fase === 'no-pagado' || (user && pagado)
                    ? { border: `1px solid ${C.sage}`, color: C.dark }
                    : { backgroundColor: C.green, color: '#FFFFFF' }
                }
              >
                Seguir comprando
              </Link>
            </div>
          </motion.div>
        </div>

        {resumen && resumen.items.length > 0 && pagado ? (
          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
            className="rounded-lg p-6"
            style={{ backgroundColor: C.muted }}
          >
            <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: C.green }}>
              Tu pedido
            </p>
            <ul className="space-y-2.5">
              {resumen.items.map((item, i) => (
                <li key={i} className="flex justify-between gap-4 text-sm">
                  <span style={{ color: C.dark }}>
                    {item.cantidad} × {item.nombre}
                    {item.tamano ? <span style={{ color: C.body }}> · {item.tamano}</span> : null}
                  </span>
                  <span className="tabular-nums shrink-0" style={{ color: C.dark }}>
                    {formatearPrecio(item.precioUnitario * item.cantidad)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-baseline mt-5 pt-4 border-t" style={{ borderColor: C.sage }}>
              <span style={{ color: C.dark }}>Total</span>
              <span className="text-xl tabular-nums tracking-tight" style={{ color: C.dark }}>
                {formatearPrecio(resumen.total)}
              </span>
            </div>
          </motion.aside>
        ) : null}
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
