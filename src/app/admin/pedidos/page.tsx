'use client';

import { useCallback, useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { formatearPrecio } from '@/lib/comercio';
import { Copy, Check, Package, RefreshCw, ChevronRight } from 'lucide-react';
import type { Pedido } from '@/types';

export default function PedidosPage() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [abierto, setAbierto] = useState<string | null>(null);
  const [copiado, setCopiado] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) throw new Error('Necesitas iniciar sesión de nuevo.');

      const respuesta = await fetch('/api/admin/pedidos', {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });
      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos?.error ?? 'No se pudieron cargar los pedidos.');
      setPedidos(datos.pedidos ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudieron cargar los pedidos.');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    if (user) cargar();
  }, [user, cargar]);

  async function copiarDireccion(pedido: Pedido) {
    // La dueña pega esto tal cual en la paquetería: un solo bloque, no seis campos.
    const bloque = [
      pedido.cliente.nombre,
      pedido.envio.calle,
      [pedido.envio.ciudad, pedido.envio.estado].filter(Boolean).join(', '),
      `CP ${pedido.envio.cp}`,
      pedido.envio.pais,
      pedido.cliente.telefono,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      await navigator.clipboard.writeText(bloque);
      setCopiado(pedido.id);
      setTimeout(() => setCopiado(null), 2000);
    } catch {
      setError('Tu navegador bloqueó el portapapeles.');
    }
  }

  return (
    <div className="max-w-6xl">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Pedidos</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Los pedidos se crean solos cuando se confirma un pago. No se pueden editar.
          </p>
        </div>
        <button
          type="button"
          onClick={cargar}
          disabled={cargando}
          className="inline-flex items-center gap-2 text-sm px-3.5 py-2 rounded-md border border-zinc-200 text-zinc-700 transition-all hover:bg-zinc-50 active:scale-[0.98] disabled:opacity-40"
        >
          <RefreshCw size={14} strokeWidth={1.5} className={cargando ? 'animate-spin' : ''} />
          Actualizar
        </button>
      </div>

      {error ? (
        <p className="mb-6 text-sm text-red-700 bg-red-50 border border-red-100 rounded-md px-4 py-3">
          {error}
        </p>
      ) : null}

      {cargando ? (
        <div className="divide-y divide-zinc-100">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="grid grid-cols-4 gap-4 py-4">
              <div className="h-4 rounded bg-zinc-100 animate-pulse" />
              <div className="h-4 rounded bg-zinc-100 animate-pulse" />
              <div className="h-4 rounded bg-zinc-100 animate-pulse" />
              <div className="h-4 rounded bg-zinc-100 animate-pulse" />
            </div>
          ))}
        </div>
      ) : pedidos.length === 0 ? (
        <div className="py-16 max-w-sm">
          <div className="w-12 h-12 rounded-full bg-zinc-100 grid place-items-center mb-5">
            <Package size={20} strokeWidth={1.5} className="text-zinc-500" />
          </div>
          <h2 className="text-lg font-medium text-zinc-900 mb-2">Todavía no hay pedidos</h2>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Cuando alguien complete una compra en la tienda, aparecerá aquí con su dirección de
            envío.
          </p>
        </div>
      ) : (
        <div className="border-t border-zinc-200">
          <div className="hidden sm:grid grid-cols-[130px_1fr_140px_110px_32px] gap-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 border-b border-zinc-100">
            <span>Fecha</span>
            <span>Cliente</span>
            <span>Artículos</span>
            <span className="text-right">Total</span>
            <span />
          </div>

          <ul className="divide-y divide-zinc-100">
            {pedidos.map((pedido) => {
              const expandido = abierto === pedido.id;
              const piezas = pedido.items.reduce((s, i) => s + i.cantidad, 0);

              return (
                <li key={pedido.id}>
                  <button
                    type="button"
                    onClick={() => setAbierto(expandido ? null : pedido.id)}
                    className="w-full grid grid-cols-1 sm:grid-cols-[130px_1fr_140px_110px_32px] gap-1 sm:gap-4 py-4 text-left transition-colors hover:bg-zinc-50/70"
                  >
                    <span className="text-sm text-zinc-500 tabular-nums">
                      {new Date(pedido.creadoEn).toLocaleDateString('es-MX', {
                        day: '2-digit',
                        month: 'short',
                        year: '2-digit',
                      })}
                    </span>
                    <span className="text-sm text-zinc-900 truncate">
                      {pedido.cliente.nombre || 'Sin nombre'}
                      {pedido.simulado ? (
                        <span className="ml-2 text-[10px] uppercase tracking-wider text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                          Demo
                        </span>
                      ) : null}
                      <span className="block text-xs text-zinc-400 truncate">
                        {pedido.cliente.email}
                      </span>
                    </span>
                    <span className="text-sm text-zinc-500">
                      {piezas} {piezas === 1 ? 'pieza' : 'piezas'}
                    </span>
                    <span className="text-sm text-zinc-900 tabular-nums sm:text-right">
                      {formatearPrecio(pedido.total)}
                    </span>
                    <span className="hidden sm:grid place-items-center">
                      <ChevronRight
                        size={15}
                        strokeWidth={1.5}
                        className={`text-zinc-400 transition-transform ${expandido ? 'rotate-90' : ''}`}
                      />
                    </span>
                  </button>

                  {expandido ? (
                    <div className="grid md:grid-cols-2 gap-8 pb-8 pt-2">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                          Artículos
                        </p>
                        <ul className="space-y-2">
                          {pedido.items.map((item, i) => (
                            <li key={i} className="flex justify-between gap-4 text-sm">
                              <span className="text-zinc-700">
                                {item.cantidad} × {item.nombre}
                                {item.tamano ? (
                                  <span className="text-zinc-400"> · {item.tamano}</span>
                                ) : null}
                              </span>
                              <span className="text-zinc-900 tabular-nums shrink-0">
                                {formatearPrecio(item.precioUnitario * item.cantidad)}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <dl className="mt-4 pt-4 border-t border-zinc-100 space-y-1.5 text-sm">
                          <div className="flex justify-between">
                            <dt className="text-zinc-500">Subtotal</dt>
                            <dd className="text-zinc-900 tabular-nums">
                              {formatearPrecio(pedido.subtotal)}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-zinc-500">Envío</dt>
                            <dd className="text-zinc-900 tabular-nums">
                              {pedido.envioCosto === 0 ? 'Gratis' : formatearPrecio(pedido.envioCosto)}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                            Enviar a
                          </p>
                          <button
                            type="button"
                            onClick={() => copiarDireccion(pedido)}
                            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border border-zinc-200 text-zinc-600 transition-all hover:bg-white active:scale-[0.98]"
                          >
                            {copiado === pedido.id ? (
                              <><Check size={13} strokeWidth={2} /> Copiado</>
                            ) : (
                              <><Copy size={13} strokeWidth={1.5} /> Copiar dirección</>
                            )}
                          </button>
                        </div>

                        <address className="not-italic text-sm text-zinc-700 leading-relaxed whitespace-pre-line bg-zinc-50 rounded-md p-4">
                          {[
                            pedido.cliente.nombre,
                            pedido.envio.calle,
                            [pedido.envio.ciudad, pedido.envio.estado].filter(Boolean).join(', '),
                            pedido.envio.cp ? `CP ${pedido.envio.cp}` : '',
                            pedido.envio.pais,
                            pedido.cliente.telefono,
                          ]
                            .filter(Boolean)
                            .join('\n') || 'Sin dirección registrada'}
                        </address>

                        {pedido.stripePaymentIntentId ? (
                          <p className="mt-3 text-xs text-zinc-400 font-mono break-all">
                            {pedido.stripePaymentIntentId}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
