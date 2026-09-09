'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ESTADOS_PEDIDO, SECUENCIA_ESTADOS, formatearPrecio, referenciaPedido } from '@/lib/comercio';
import { Check, ChevronRight, Copy, Loader2, Package, RefreshCw, Truck } from 'lucide-react';
import type { EstadoPedido, Pedido } from '@/types';

type Filtro = 'activos' | EstadoPedido | 'todos';

const FILTROS: { id: Filtro; etiqueta: string }[] = [
  { id: 'activos', etiqueta: 'Por atender' },
  { id: 'pagado', etiqueta: 'Pagados' },
  { id: 'preparando', etiqueta: 'En preparación' },
  { id: 'enviado', etiqueta: 'Enviados' },
  { id: 'entregado', etiqueta: 'Entregados' },
  { id: 'cancelado', etiqueta: 'Cancelados' },
  { id: 'todos', etiqueta: 'Todos' },
];

const ESTILO_ESTADO: Record<EstadoPedido, string> = {
  pagado: 'bg-amber-50 text-amber-800 ring-amber-200',
  preparando: 'bg-sky-50 text-sky-800 ring-sky-200',
  enviado: 'bg-violet-50 text-violet-800 ring-violet-200',
  entregado: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  cancelado: 'bg-zinc-100 text-zinc-600 ring-zinc-200',
};

export default function PedidosPage() {
  const { user, obtenerToken } = useAuth();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [abierto, setAbierto] = useState<string | null>(null);
  const [copiado, setCopiado] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<Filtro>('activos');

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const token = await obtenerToken();
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
  }, [obtenerToken]);

  useEffect(() => {
    if (user) cargar();
  }, [user, cargar]);

  const conteos = useMemo(() => {
    const c: Record<string, number> = { activos: 0, todos: pedidos.length };
    for (const p of pedidos) {
      c[p.estado] = (c[p.estado] ?? 0) + 1;
      if (p.estado === 'pagado' || p.estado === 'preparando') c.activos += 1;
    }
    return c;
  }, [pedidos]);

  const visibles = useMemo(() => {
    if (filtro === 'todos') return pedidos;
    if (filtro === 'activos') return pedidos.filter((p) => p.estado === 'pagado' || p.estado === 'preparando');
    return pedidos.filter((p) => p.estado === filtro);
  }, [pedidos, filtro]);

  async function guardarEstado(
    pedido: Pedido,
    cambios: { estado: EstadoPedido; envioPaqueteria?: string; envioGuia?: string },
  ): Promise<string | null> {
    const token = await obtenerToken();
    if (!token) return 'Necesitas iniciar sesión de nuevo.';
    const respuesta = await fetch(`/api/admin/pedidos/${pedido.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(cambios),
    });
    const datos = await respuesta.json();
    if (!respuesta.ok) return datos?.error ?? 'No se pudo actualizar el pedido.';
    setPedidos((prev) => prev.map((p) => (p.id === pedido.id ? datos.pedido : p)));
    return null;
  }

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
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Pedidos</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Nacen solos al confirmarse el pago. Aquí los mueves de estado y registras la guía.
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

      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4 -mx-1 px-1">
        {FILTROS.map((f) => {
          const activo = filtro === f.id;
          const n = conteos[f.id] ?? 0;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFiltro(f.id)}
              className={`shrink-0 inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border transition-all active:scale-[0.98] ${
                activo ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              {f.etiqueta}
              <span className={`text-xs tabular-nums ${activo ? 'text-zinc-300' : 'text-zinc-400'}`}>{n}</span>
            </button>
          );
        })}
      </div>

      {error ? (
        <p className="mb-6 text-sm text-red-700 bg-red-50 border border-red-100 rounded-md px-4 py-3">{error}</p>
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
      ) : visibles.length === 0 ? (
        <div className="py-16 max-w-sm">
          <div className="w-12 h-12 rounded-full bg-zinc-100 grid place-items-center mb-5">
            <Package size={20} strokeWidth={1.5} className="text-zinc-500" />
          </div>
          <h2 className="text-lg font-medium text-zinc-900 mb-2">
            {pedidos.length === 0 ? 'Todavía no hay pedidos' : 'Nada en este filtro'}
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed">
            {pedidos.length === 0
              ? 'Cuando alguien complete una compra en la tienda, aparecerá aquí con su dirección de envío.'
              : 'Prueba con otro estado o revisa "Todos".'}
          </p>
        </div>
      ) : (
        <div className="border-t border-zinc-200">
          <div className="hidden sm:grid grid-cols-[110px_1fr_150px_100px_32px] gap-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 border-b border-zinc-100">
            <span>Fecha</span>
            <span>Cliente</span>
            <span>Estado</span>
            <span className="text-right">Total</span>
            <span />
          </div>

          <ul className="divide-y divide-zinc-100">
            {visibles.map((pedido) => {
              const expandido = abierto === pedido.id;
              const piezas = pedido.items.reduce((s, i) => s + i.cantidad, 0);
              return (
                <li key={pedido.id}>
                  <button
                    type="button"
                    onClick={() => setAbierto(expandido ? null : pedido.id)}
                    className="w-full grid grid-cols-[1fr_auto] sm:grid-cols-[110px_1fr_150px_100px_32px] gap-2 sm:gap-4 py-4 text-left items-center transition-colors hover:bg-zinc-50/70"
                  >
                    <span className="text-sm text-zinc-500 tabular-nums">
                      {new Date(pedido.creadoEn).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: '2-digit' })}
                      <span className="block text-[11px] text-zinc-400 font-mono">{referenciaPedido(pedido.id)}</span>
                    </span>
                    <span className="text-sm text-zinc-900 truncate order-first sm:order-none col-span-2 sm:col-span-1">
                      {pedido.cliente.nombre || 'Sin nombre'}
                      {pedido.simulado ? (
                        <span className="ml-2 text-[10px] uppercase tracking-wider text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">Demo</span>
                      ) : null}
                      <span className="block text-xs text-zinc-400 truncate">
                        {pedido.cliente.email} · {piezas} {piezas === 1 ? 'pieza' : 'piezas'}
                      </span>
                    </span>
                    <span>
                      <PillEstado estado={pedido.estado} />
                    </span>
                    <span className="text-sm text-zinc-900 tabular-nums text-right">{formatearPrecio(pedido.total)}</span>
                    <span className="hidden sm:grid place-items-center">
                      <ChevronRight size={15} strokeWidth={1.5} className={`text-zinc-400 transition-transform ${expandido ? 'rotate-90' : ''}`} />
                    </span>
                  </button>

                  {expandido ? (
                    <DetallePedido
                      pedido={pedido}
                      copiado={copiado === pedido.id}
                      onCopiar={() => copiarDireccion(pedido)}
                      onGuardar={(cambios) => guardarEstado(pedido, cambios)}
                    />
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

function PillEstado({ estado }: { estado: EstadoPedido }) {
  return (
    <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ring-1 ring-inset ${ESTILO_ESTADO[estado] ?? ESTILO_ESTADO.pagado}`}>
      {ESTADOS_PEDIDO[estado]?.etiqueta ?? estado}
    </span>
  );
}

function DetallePedido({
  pedido,
  copiado,
  onCopiar,
  onGuardar,
}: {
  pedido: Pedido;
  copiado: boolean;
  onCopiar: () => void;
  onGuardar: (cambios: { estado: EstadoPedido; envioPaqueteria?: string; envioGuia?: string }) => Promise<string | null>;
}) {
  const [paqueteria, setPaqueteria] = useState(pedido.envioPaqueteria ?? '');
  const [guia, setGuia] = useState(pedido.envioGuia ?? '');
  const [guardando, setGuardando] = useState<EstadoPedido | 'guia' | null>(null);
  const [mensaje, setMensaje] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null);

  const indice = SECUENCIA_ESTADOS.indexOf(pedido.estado);
  const siguiente = indice >= 0 && indice < SECUENCIA_ESTADOS.length - 1 ? SECUENCIA_ESTADOS[indice + 1] : null;

  async function aplicar(cambios: { estado: EstadoPedido; envioPaqueteria?: string; envioGuia?: string }, clave: EstadoPedido | 'guia') {
    setGuardando(clave);
    setMensaje(null);
    const err = await onGuardar(cambios);
    setGuardando(null);
    if (err) setMensaje({ tipo: 'error', texto: err });
    else if (cambios.estado === 'enviado' && pedido.estado !== 'enviado') {
      setMensaje({ tipo: 'ok', texto: 'Marcado como enviado. Si Resend está configurado, la clienta recibió el aviso con la guía.' });
    } else setMensaje({ tipo: 'ok', texto: 'Guardado.' });
  }

  return (
    <div className="grid lg:grid-cols-[1fr_1fr_300px] gap-8 pb-8 pt-2">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-3">Artículos</p>
        <ul className="space-y-2">
          {pedido.items.map((item, i) => (
            <li key={i} className="flex justify-between gap-4 text-sm">
              <span className="text-zinc-700">
                {item.cantidad} × {item.nombre}
                {item.tamano ? <span className="text-zinc-400"> · {item.tamano}</span> : null}
              </span>
              <span className="text-zinc-900 tabular-nums shrink-0">{formatearPrecio(item.precioUnitario * item.cantidad)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 pt-4 border-t border-zinc-100 space-y-1.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-zinc-500">Subtotal</dt>
            <dd className="text-zinc-900 tabular-nums">{formatearPrecio(pedido.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-zinc-500">Envío</dt>
            <dd className="text-zinc-900 tabular-nums">{pedido.envioCosto === 0 ? 'Gratis' : formatearPrecio(pedido.envioCosto)}</dd>
          </div>
        </dl>
        {pedido.stripePaymentIntentId ? (
          <p className="mt-3 text-xs text-zinc-400 font-mono break-all">{pedido.stripePaymentIntentId}</p>
        ) : null}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Enviar a</p>
          <button
            type="button"
            onClick={onCopiar}
            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border border-zinc-200 text-zinc-600 transition-all hover:bg-white active:scale-[0.98]"
          >
            {copiado ? <><Check size={13} strokeWidth={2} /> Copiado</> : <><Copy size={13} strokeWidth={1.5} /> Copiar dirección</>}
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
      </div>

      <div className="border-t lg:border-t-0 lg:border-l border-zinc-100 pt-6 lg:pt-0 lg:pl-8">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-3">Seguimiento</p>

        <ol className="space-y-2 mb-5">
          {SECUENCIA_ESTADOS.map((e, i) => {
            const hecho = indice >= i && pedido.estado !== 'cancelado';
            const actual = pedido.estado === e;
            return (
              <li key={e} className="flex items-center gap-2.5 text-sm">
                <span className={`w-2 h-2 rounded-full ${hecho ? 'bg-zinc-900' : 'bg-zinc-200'}`} />
                <span className={actual ? 'text-zinc-900 font-medium' : hecho ? 'text-zinc-600' : 'text-zinc-400'}>
                  {ESTADOS_PEDIDO[e].etiqueta}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="grid gap-2 mb-4">
          <label className="text-xs text-zinc-500" htmlFor={`paq-${pedido.id}`}>Paquetería</label>
          <input
            id={`paq-${pedido.id}`}
            value={paqueteria}
            onChange={(e) => setPaqueteria(e.target.value)}
            placeholder="Estafeta, DHL, FedEx…"
            className="h-9 rounded-md border border-zinc-200 px-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
          />
          <label className="text-xs text-zinc-500 mt-1" htmlFor={`guia-${pedido.id}`}>Número de guía</label>
          <input
            id={`guia-${pedido.id}`}
            value={guia}
            onChange={(e) => setGuia(e.target.value)}
            placeholder="Opcional"
            className="h-9 rounded-md border border-zinc-200 px-3 text-sm font-mono text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
          />
        </div>

        <div className="flex flex-col gap-2">
          {siguiente && pedido.estado !== 'cancelado' ? (
            <button
              type="button"
              disabled={guardando !== null}
              onClick={() => aplicar({ estado: siguiente, envioPaqueteria: paqueteria, envioGuia: guia }, siguiente)}
              className="inline-flex items-center justify-center gap-2 h-10 rounded-md bg-zinc-900 text-white text-sm transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50"
            >
              {guardando === siguiente ? <Loader2 size={15} className="animate-spin" /> : siguiente === 'enviado' ? <Truck size={15} strokeWidth={1.5} /> : <Check size={15} strokeWidth={2} />}
              Marcar como {ESTADOS_PEDIDO[siguiente].etiqueta.toLowerCase()}
            </button>
          ) : null}

          {(paqueteria !== (pedido.envioPaqueteria ?? '') || guia !== (pedido.envioGuia ?? '')) ? (
            <button
              type="button"
              disabled={guardando !== null}
              onClick={() => aplicar({ estado: pedido.estado, envioPaqueteria: paqueteria, envioGuia: guia }, 'guia')}
              className="inline-flex items-center justify-center gap-2 h-9 rounded-md border border-zinc-200 text-zinc-700 text-sm transition-all hover:bg-zinc-50 active:scale-[0.98] disabled:opacity-50"
            >
              {guardando === 'guia' ? <Loader2 size={15} className="animate-spin" /> : null}
              Guardar guía sin cambiar estado
            </button>
          ) : null}

          {pedido.estado !== 'cancelado' && pedido.estado !== 'entregado' ? (
            <button
              type="button"
              disabled={guardando !== null}
              onClick={() => {
                if (window.confirm('¿Cancelar este pedido? El reembolso, si aplica, se hace desde Stripe.')) {
                  aplicar({ estado: 'cancelado' }, 'cancelado');
                }
              }}
              className="text-xs text-zinc-400 hover:text-red-700 transition-colors self-start mt-1"
            >
              Cancelar pedido
            </button>
          ) : null}

          {pedido.estado === 'cancelado' ? (
            <button
              type="button"
              disabled={guardando !== null}
              onClick={() => aplicar({ estado: 'pagado' }, 'pagado')}
              className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors self-start mt-1"
            >
              Reactivar como pagado
            </button>
          ) : null}
        </div>

        {mensaje ? (
          <p className={`mt-3 text-xs leading-relaxed ${mensaje.tipo === 'ok' ? 'text-emerald-700' : 'text-red-700'}`}>{mensaje.texto}</p>
        ) : null}
      </div>
    </div>
  );
}
