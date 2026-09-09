'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Truck, Loader2 } from 'lucide-react';
import CustomImage from '@/components/CustomImage';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useSiteData } from '@/context/SiteDataContext';
import { getProductos } from '@/services/firestore';
import { ENVIO_GRATIS_DESDE, MAX_POR_LINEA, formatearPrecio } from '@/lib/comercio';
import type { Producto } from '@/types';

function Carrito() {
  const { C } = useSiteData();
  const cancelado = useSearchParams().get('cancelado') === '1';
  const { lineas, hidratado, cambiarCantidad, quitar, resolver } = useCart();
  const { user, loading: cargandoSesion, obtenerToken } = useAuth();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [pagando, setPagando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProductos()
      .then(setProductos)
      .catch(() => setError('No pudimos cargar el catálogo. Recarga la página.'))
      .finally(() => setCargando(false));
  }, []);

  const { items, subtotal, envio, total } = useMemo(
    () => resolver(productos),
    [resolver, productos],
  );

  const faltaParaEnvioGratis = Math.max(0, ENVIO_GRATIS_DESDE - subtotal);
  const hayCompra = items.some((i) => i.disponible);

  async function irAPagar() {
    setPagando(true);
    setError(null);
    try {
      // Sólo salen identificadores y cantidades: los precios los pone el servidor.
      // Con sesión, el pedido queda ligado a la cuenta y aparece en /cuenta.
      const token = await obtenerToken();
      const respuesta = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          lineas: lineas.map(({ productoId, varianteId, cantidad }) => ({
            productoId,
            varianteId,
            cantidad,
          })),
        }),
      });

      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos?.error ?? 'No se pudo iniciar el pago.');
      window.location.href = datos.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo iniciar el pago.');
      setPagando(false);
    }
  }

  const esperando = !hidratado || cargando;

  return (
    <main className="min-h-[60vh] pb-24" style={{ backgroundColor: C.bg }}>
      <header className="border-b" style={{ borderColor: C.muted }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-8">
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 text-sm mb-5 transition-opacity hover:opacity-60"
            style={{ color: C.body }}
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            Seguir comprando
          </Link>
          <h1
            className="text-3xl md:text-5xl tracking-tighter leading-none"
            style={{ color: C.dark }}
          >
            Tu carrito
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        {esperando ? (
          <ListaEsqueleto color={C.muted} />
        ) : items.length === 0 ? (
          <CarritoVacio C={C} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">
            {/* Líneas */}
            <ul className="divide-y" style={{ borderColor: C.muted }}>
              {items.map((item, i) => (
                <motion.li
                  key={`${item.productoId}-${item.varianteId}`}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.05 }}
                  className="grid grid-cols-[88px_1fr] sm:grid-cols-[112px_1fr_auto] gap-5 py-6"
                  style={{ borderColor: C.muted }}
                >
                  <div
                    className="relative aspect-square overflow-hidden rounded-md"
                    style={{ backgroundColor: C.muted }}
                  >
                    {item.imagen ? (
                      <CustomImage
                        src={item.imagen}
                        alt={item.nombre}
                        width={224}
                        height={224}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-lg leading-tight" style={{ color: C.dark }}>
                      {item.nombre}
                    </h2>
                    {item.tamano ? (
                      <p className="text-sm mt-1" style={{ color: C.body }}>
                        {item.tamano}
                      </p>
                    ) : null}

                    {item.disponible ? (
                      <p className="text-sm mt-1" style={{ color: C.body }}>
                        {formatearPrecio(item.precioUnitario)} c/u
                      </p>
                    ) : (
                      <p className="text-sm mt-1 text-red-700">
                        Este producto ya no está disponible. Quítalo para continuar.
                      </p>
                    )}

                    <div className="flex items-center gap-4 mt-4">
                      <Cantidad
                        valor={item.cantidad}
                        onCambio={(n) => cambiarCantidad(item.productoId, item.varianteId, n)}
                        C={C}
                      />
                      <button
                        type="button"
                        onClick={() => quitar(item.productoId, item.varianteId)}
                        className="inline-flex items-center gap-1.5 text-sm transition-all hover:opacity-60 active:scale-[0.98]"
                        style={{ color: C.body }}
                        aria-label={`Quitar ${item.nombre} del carrito`}
                      >
                        <Trash2 size={15} strokeWidth={1.5} />
                        Quitar
                      </button>
                    </div>
                  </div>

                  <div
                    className="col-span-2 sm:col-span-1 text-right text-lg tabular-nums"
                    style={{ color: C.dark }}
                  >
                    {formatearPrecio(item.precioUnitario * item.cantidad)}
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Resumen */}
            <aside className="lg:sticky lg:top-28 rounded-lg p-6" style={{ backgroundColor: C.muted }}>
              <h2 className="text-xl tracking-tight mb-5" style={{ color: C.dark }}>
                Resumen
              </h2>

              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt style={{ color: C.body }}>Subtotal</dt>
                  <dd className="tabular-nums" style={{ color: C.dark }}>
                    {formatearPrecio(subtotal)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt style={{ color: C.body }}>Envío</dt>
                  <dd className="tabular-nums" style={{ color: C.dark }}>
                    {envio === 0 ? 'Gratis' : formatearPrecio(envio)}
                  </dd>
                </div>
              </dl>

              {faltaParaEnvioGratis > 0 && hayCompra ? (
                <p
                  className="mt-4 flex items-start gap-2 text-sm leading-relaxed"
                  style={{ color: C.body }}
                >
                  <Truck size={16} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                  Te faltan {formatearPrecio(faltaParaEnvioGratis)} para el envío gratis.
                </p>
              ) : null}

              <div
                className="flex justify-between items-baseline mt-6 pt-5 border-t"
                style={{ borderColor: C.sage }}
              >
                <span style={{ color: C.dark }}>Total</span>
                <span className="text-2xl tabular-nums tracking-tight" style={{ color: C.dark }}>
                  {formatearPrecio(total)}
                </span>
              </div>

              {error ? (
                <p className="mt-4 text-sm text-red-700 leading-relaxed">{error}</p>
              ) : null}

              {cancelado && !error ? (
                <p className="mt-4 text-sm leading-relaxed" style={{ color: C.body }}>
                  No se hizo ningún cargo. Tu carrito sigue aquí por si quieres intentarlo de nuevo.
                </p>
              ) : null}

              <button
                type="button"
                onClick={irAPagar}
                disabled={!hayCompra || pagando}
                className="w-full mt-6 py-3.5 rounded-md text-sm tracking-wide transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                style={{ backgroundColor: C.green, color: '#FFFFFF' }}
              >
                {pagando ? (
                  <>
                    <Loader2 size={16} strokeWidth={1.5} className="animate-spin" />
                    Conectando con Stripe
                  </>
                ) : (
                  'Proceder al pago'
                )}
              </button>

              <p className="mt-3 text-xs leading-relaxed" style={{ color: C.body }}>
                Pago seguro con tarjeta. Los datos de tu tarjeta se procesan en Stripe y nunca pasan
                por este sitio.
              </p>

              {!cargandoSesion && !user ? (
                <p className="mt-4 pt-4 border-t text-xs leading-relaxed" style={{ borderColor: C.sage, color: C.body }}>
                  ¿Quieres seguir tu pedido después?{' '}
                  <Link href="/cuenta?volver=/carrito" className="underline underline-offset-2" style={{ color: C.dark }}>
                    Entra con Google
                  </Link>{' '}
                  antes de pagar y quedará en tu cuenta.
                </p>
              ) : null}
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

function Cantidad({
  valor,
  onCambio,
  C,
}: {
  valor: number;
  onCambio: (n: number) => void;
  C: { dark: string; body: string; sage: string };
}) {
  return (
    <div
      className="inline-flex items-center rounded-md border"
      style={{ borderColor: C.sage }}
    >
      <button
        type="button"
        onClick={() => onCambio(valor - 1)}
        disabled={valor <= 1}
        className="px-2.5 py-2 transition-all active:scale-[0.98] disabled:opacity-30"
        style={{ color: C.dark }}
        aria-label="Reducir cantidad"
      >
        <Minus size={14} strokeWidth={1.5} />
      </button>
      <span className="w-9 text-center text-sm tabular-nums" style={{ color: C.dark }}>
        {valor}
      </span>
      <button
        type="button"
        onClick={() => onCambio(valor + 1)}
        disabled={valor >= MAX_POR_LINEA}
        className="px-2.5 py-2 transition-all active:scale-[0.98] disabled:opacity-30"
        style={{ color: C.dark }}
        aria-label="Aumentar cantidad"
      >
        <Plus size={14} strokeWidth={1.5} />
      </button>
    </div>
  );
}

function CarritoVacio({ C }: { C: { dark: string; body: string; green: string; muted: string } }) {
  return (
    <div className="py-20 max-w-md">
      <div
        className="w-14 h-14 rounded-full grid place-items-center mb-6"
        style={{ backgroundColor: C.muted }}
      >
        <ShoppingBag size={22} strokeWidth={1.5} style={{ color: C.dark }} />
      </div>
      <h2 className="text-2xl tracking-tight mb-3" style={{ color: C.dark }}>
        Tu carrito está vacío
      </h2>
      <p className="text-base leading-relaxed mb-8" style={{ color: C.body }}>
        Todavía no has agregado nada. Nuestros jabones y cremas se hacen en lotes pequeños, a mano.
      </p>
      <Link
        href="/productos"
        className="inline-block px-7 py-3.5 rounded-md text-sm tracking-wide transition-all active:scale-[0.98]"
        style={{ backgroundColor: C.green, color: '#FFFFFF' }}
      >
        Ver productos
      </Link>
    </div>
  );
}

function ListaEsqueleto({ color }: { color: string }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">
      <div className="space-y-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="grid grid-cols-[88px_1fr] sm:grid-cols-[112px_1fr] gap-5">
            <div className="aspect-square rounded-md animate-pulse" style={{ backgroundColor: color }} />
            <div className="space-y-3 py-2">
              <div className="h-4 w-2/5 rounded animate-pulse" style={{ backgroundColor: color }} />
              <div className="h-3 w-1/4 rounded animate-pulse" style={{ backgroundColor: color }} />
              <div className="h-9 w-28 rounded animate-pulse" style={{ backgroundColor: color }} />
            </div>
          </div>
        ))}
      </div>
      <div className="h-72 rounded-lg animate-pulse" style={{ backgroundColor: color }} />
    </div>
  );
}

export default function CarritoPage() {
  return (
    <Suspense fallback={null}>
      <Carrito />
    </Suspense>
  );
}
