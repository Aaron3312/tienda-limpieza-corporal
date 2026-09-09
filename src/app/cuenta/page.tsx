'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, LogOut, Package, ShieldCheck, Truck } from 'lucide-react';
import BotonGoogle from '@/components/cuenta/BotonGoogle';
import { useAuth } from '@/context/AuthContext';
import { useSiteData } from '@/context/SiteDataContext';
import { getMisPedidos } from '@/services/pedidos';
import { ESTADOS_PEDIDO, formatearFecha, formatearPrecio, referenciaPedido } from '@/lib/comercio';
import type { Pedido } from '@/types';

function Cuenta() {
  const { C } = useSiteData();
  const { user, esAdmin, loading, ocupado, error, loginGoogle, logOut, clearError } = useAuth();
  const router = useRouter();
  const parametros = useSearchParams();
  const volver = parametros.get('volver');

  const [pedidos, setPedidos] = useState<Pedido[] | null>(null);
  const [errorPedidos, setErrorPedidos] = useState<string | null>(null);
  const [abierto, setAbierto] = useState<string | null>(null);

  // Si venía de otra página (por ejemplo el carrito), se regresa al entrar.
  useEffect(() => {
    if (user && volver && volver.startsWith('/')) router.replace(volver);
  }, [user, volver, router]);

  useEffect(() => {
    if (!user) {
      setPedidos(null);
      return;
    }
    let cancelado = false;
    getMisPedidos(user.uid)
      .then((lista) => {
        if (!cancelado) setPedidos(lista);
      })
      .catch(() => {
        if (!cancelado) setErrorPedidos('No pudimos cargar tus pedidos. Recarga la página.');
      });
    return () => {
      cancelado = true;
    };
  }, [user]);

  async function entrar() {
    clearError();
    try {
      await loginGoogle();
    } catch {
      // El mensaje queda en `error`.
    }
  }

  if (loading) {
    return (
      <main className="min-h-[60vh]" style={{ backgroundColor: C.bg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28">
          <div className="h-10 w-48 rounded animate-pulse" style={{ backgroundColor: C.muted }} />
          <div className="h-4 w-72 rounded mt-4 animate-pulse" style={{ backgroundColor: C.muted }} />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-[70vh]" style={{ backgroundColor: C.bg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-24 grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-start">
          <div>
            <Link
              href={volver && volver.startsWith('/') ? volver : '/productos'}
              className="inline-flex items-center gap-2 text-sm mb-6 transition-opacity hover:opacity-60"
              style={{ color: C.body }}
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
              Volver
            </Link>
            <h1 className="text-3xl md:text-5xl tracking-tighter leading-none mb-6" style={{ color: C.dark }}>
              Tu cuenta
            </h1>
            <p className="text-base leading-relaxed max-w-[52ch] mb-10" style={{ color: C.body }}>
              Entra con tu cuenta de Google y tus compras quedan guardadas: puedes seguir cada pedido desde
              que se paga hasta que llega a tu puerta.
            </p>

            <ul className="space-y-5 max-w-md">
              {[
                { icono: Package, texto: 'Historial de pedidos con el detalle de cada compra.' },
                { icono: Truck, texto: 'Estado de envío actualizado por nosotras, pieza por pieza.' },
                { icono: ShieldCheck, texto: 'Tu correo ya va puesto al pagar. Sin contraseñas nuevas.' },
              ].map(({ icono: Icono, texto }) => (
                <li key={texto} className="flex items-start gap-3.5 text-sm leading-relaxed" style={{ color: C.body }}>
                  <span
                    className="w-9 h-9 rounded-full grid place-items-center shrink-0"
                    style={{ backgroundColor: C.muted }}
                  >
                    <Icono size={16} strokeWidth={1.5} style={{ color: C.dark }} />
                  </span>
                  <span className="pt-2">{texto}</span>
                </li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="rounded-lg p-7 sm:p-9 lg:mt-16"
            style={{ backgroundColor: C.muted }}
          >
            <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: C.green }}>
              Acceso
            </p>
            <h2 className="text-2xl tracking-tight mb-6" style={{ color: C.dark }}>
              Entra en un paso
            </h2>
            <BotonGoogle onClick={entrar} ocupado={ocupado} borde={C.sage} texto={C.dark} className="w-full" />
            {error ? <p className="mt-4 text-sm text-red-700 leading-relaxed">{error}</p> : null}
            <p className="mt-5 text-xs leading-relaxed" style={{ color: C.body }}>
              También puedes comprar sin cuenta. La confirmación te llega por correo de todas formas.
            </p>
          </motion.div>
        </div>
      </main>
    );
  }

  const nombre = user.displayName || user.email || 'Tu cuenta';

  return (
    <main className="min-h-[70vh] pb-24" style={{ backgroundColor: C.bg }}>
      <header className="border-b" style={{ borderColor: C.muted }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-8 flex flex-wrap items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            {user.photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.photoURL}
                alt=""
                width={56}
                height={56}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-full object-cover"
              />
            ) : (
              <span
                className="w-14 h-14 rounded-full grid place-items-center text-xl"
                style={{ backgroundColor: C.sage, color: C.dark }}
              >
                {nombre.charAt(0).toUpperCase()}
              </span>
            )}
            <div>
              <h1 className="text-2xl md:text-4xl tracking-tighter leading-none" style={{ color: C.dark }}>
                {nombre}
              </h1>
              <p className="text-sm mt-1.5" style={{ color: C.body }}>
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {esAdmin ? (
              <Link
                href="/admin/dashboard"
                className="text-sm px-4 py-2 rounded-md border transition-all hover:-translate-y-px"
                style={{ borderColor: C.sage, color: C.dark }}
              >
                Panel de administración
              </Link>
            ) : null}
            <button
              type="button"
              onClick={() => logOut()}
              disabled={ocupado}
              className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-md transition-all hover:opacity-70 active:scale-[0.98]"
              style={{ color: C.body }}
            >
              <LogOut size={15} strokeWidth={1.5} />
              Salir
            </button>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        <h2 className="text-xl tracking-tight mb-6" style={{ color: C.dark }}>
          Mis pedidos
        </h2>

        {errorPedidos ? (
          <p className="text-sm text-red-700 leading-relaxed">{errorPedidos}</p>
        ) : pedidos === null ? (
          <div className="divide-y" style={{ borderColor: C.muted }}>
            {[0, 1, 2].map((i) => (
              <div key={i} className="grid grid-cols-[1fr_auto] gap-4 py-5">
                <div className="space-y-2">
                  <div className="h-4 w-40 rounded animate-pulse" style={{ backgroundColor: C.muted }} />
                  <div className="h-3 w-24 rounded animate-pulse" style={{ backgroundColor: C.muted }} />
                </div>
                <div className="h-4 w-20 rounded animate-pulse" style={{ backgroundColor: C.muted }} />
              </div>
            ))}
          </div>
        ) : pedidos.length === 0 ? (
          <div className="py-12 max-w-md">
            <div className="w-14 h-14 rounded-full grid place-items-center mb-6" style={{ backgroundColor: C.muted }}>
              <Package size={22} strokeWidth={1.5} style={{ color: C.dark }} />
            </div>
            <h3 className="text-2xl tracking-tight mb-3" style={{ color: C.dark }}>
              Todavía no tienes pedidos
            </h3>
            <p className="text-base leading-relaxed mb-8" style={{ color: C.body }}>
              Cuando compres con esta cuenta, tus pedidos y su estado de envío aparecerán aquí.
            </p>
            <Link
              href="/productos"
              className="inline-block px-7 py-3.5 rounded-md text-sm tracking-wide transition-all active:scale-[0.98]"
              style={{ backgroundColor: C.green, color: '#FFFFFF' }}
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <ul className="divide-y border-t" style={{ borderColor: C.muted }}>
            {pedidos.map((pedido, i) => {
              const expandido = abierto === pedido.id;
              const estado = ESTADOS_PEDIDO[pedido.estado] ?? ESTADOS_PEDIDO.pagado;
              const piezas = pedido.items.reduce((s, it) => s + it.cantidad, 0);
              return (
                <motion.li
                  key={pedido.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.04 }}
                >
                  <button
                    type="button"
                    onClick={() => setAbierto(expandido ? null : pedido.id)}
                    className="w-full grid grid-cols-[1fr_auto] sm:grid-cols-[140px_1fr_150px_110px_24px] gap-2 sm:gap-6 py-5 text-left items-center transition-colors hover:bg-black/[0.02]"
                  >
                    <span className="text-sm tabular-nums" style={{ color: C.body }}>
                      {formatearFecha(pedido.creadoEn)}
                    </span>
                    <span className="text-sm" style={{ color: C.dark }}>
                      Pedido {referenciaPedido(pedido.id)}
                      <span className="block text-xs mt-0.5" style={{ color: C.body }}>
                        {piezas} {piezas === 1 ? 'pieza' : 'piezas'}
                      </span>
                    </span>
                    <span className="col-start-1 sm:col-auto">
                      <EstadoPill estado={pedido.estado} etiqueta={estado.etiqueta} C={C} />
                    </span>
                    <span className="text-sm tabular-nums sm:text-right" style={{ color: C.dark }}>
                      {formatearPrecio(pedido.total)}
                    </span>
                    <ChevronRight
                      size={16}
                      strokeWidth={1.5}
                      className={`hidden sm:block transition-transform ${expandido ? 'rotate-90' : ''}`}
                      style={{ color: C.body }}
                    />
                  </button>

                  {expandido ? (
                    <div className="grid md:grid-cols-[1fr_320px] gap-8 pb-8 pt-1">
                      <div>
                        <p className="text-sm leading-relaxed mb-5" style={{ color: C.body }}>
                          {estado.descripcion}
                          {pedido.estado === 'enviado' && pedido.envioGuia ? (
                            <>
                              {' '}
                              Guía {pedido.envioPaqueteria ? `${pedido.envioPaqueteria} ` : ''}
                              <span className="font-mono" style={{ color: C.dark }}>
                                {pedido.envioGuia}
                              </span>
                              .
                            </>
                          ) : null}
                        </p>
                        <ul className="space-y-2.5">
                          {pedido.items.map((item, j) => (
                            <li key={j} className="flex justify-between gap-4 text-sm">
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
                        <dl className="mt-4 pt-4 border-t space-y-1.5 text-sm" style={{ borderColor: C.muted }}>
                          <div className="flex justify-between">
                            <dt style={{ color: C.body }}>Subtotal</dt>
                            <dd className="tabular-nums" style={{ color: C.dark }}>{formatearPrecio(pedido.subtotal)}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt style={{ color: C.body }}>Envío</dt>
                            <dd className="tabular-nums" style={{ color: C.dark }}>
                              {pedido.envioCosto === 0 ? 'Gratis' : formatearPrecio(pedido.envioCosto)}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] mb-3" style={{ color: C.green }}>
                          Enviar a
                        </p>
                        <address
                          className="not-italic text-sm leading-relaxed whitespace-pre-line rounded-md p-4"
                          style={{ backgroundColor: C.muted, color: C.dark }}
                        >
                          {[
                            pedido.cliente.nombre,
                            pedido.envio.calle,
                            [pedido.envio.ciudad, pedido.envio.estado].filter(Boolean).join(', '),
                            pedido.envio.cp ? `CP ${pedido.envio.cp}` : '',
                          ]
                            .filter(Boolean)
                            .join('\n') || 'Sin dirección registrada'}
                        </address>
                      </div>
                    </div>
                  ) : null}
                </motion.li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}

function EstadoPill({
  estado,
  etiqueta,
  C,
}: {
  estado: Pedido['estado'];
  etiqueta: string;
  C: { dark: string; sage: string; muted: string; body: string; green: string };
}) {
  const estilos: Record<Pedido['estado'], { fondo: string; texto: string }> = {
    pagado: { fondo: C.muted, texto: C.dark },
    preparando: { fondo: C.muted, texto: C.dark },
    enviado: { fondo: C.sage, texto: C.dark },
    entregado: { fondo: C.green, texto: '#FFFFFF' },
    cancelado: { fondo: '#F3E4E1', texto: '#7A2E22' },
  };
  const e = estilos[estado] ?? estilos.pagado;
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
      style={{ backgroundColor: e.fondo, color: e.texto }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: e.texto, opacity: 0.7 }} />
      {etiqueta}
    </span>
  );
}

export default function CuentaPage() {
  return (
    <Suspense fallback={null}>
      <Cuenta />
    </Suspense>
  );
}
