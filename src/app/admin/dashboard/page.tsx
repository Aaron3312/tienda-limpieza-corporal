'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { getProductos, getCategorias } from '@/services/firestore';
import { useAuth } from '@/context/AuthContext';
import { ESTADOS_PEDIDO, formatearPrecio, referenciaPedido } from '@/lib/comercio';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Eye, Package, ShoppingBag } from 'lucide-react';
import type { Categoria, Pedido, Producto } from '@/types';

const ESTILO_ESTADO: Record<Pedido['estado'], string> = {
  pagado: 'bg-amber-50 text-amber-800 ring-amber-200',
  preparando: 'bg-sky-50 text-sky-800 ring-sky-200',
  enviado: 'bg-violet-50 text-violet-800 ring-violet-200',
  entregado: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  cancelado: 'bg-zinc-100 text-zinc-600 ring-zinc-200',
};

function inicioDeMes(d = new Date()): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export default function Dashboard() {
  const { user, obtenerToken } = useAuth();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let cancelado = false;
    (async () => {
      setLoading(true);
      try {
        const token = await obtenerToken();
        const [productosData, categoriasData, respuesta] = await Promise.all([
          getProductos(),
          getCategorias(),
          fetch('/api/admin/pedidos', { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }),
        ]);
        const datos = await respuesta.json();
        if (cancelado) return;
        setProductos(productosData);
        setCategorias(categoriasData);
        if (!respuesta.ok) throw new Error(datos?.error ?? 'No se pudieron cargar los pedidos.');
        setPedidos(datos.pedidos ?? []);
      } catch (e) {
        if (!cancelado) setError(e instanceof Error ? e.message : 'Error al cargar datos.');
      } finally {
        if (!cancelado) setLoading(false);
      }
    })();
    return () => {
      cancelado = true;
    };
  }, [user, obtenerToken]);

  const metricas = useMemo(() => {
    const lista = (pedidos ?? []).filter((p) => !p.simulado);
    const validos = lista.filter((p) => p.estado !== 'cancelado');
    const desde = inicioDeMes();
    const desdeAnterior = inicioDeMes(new Date(desde.getFullYear(), desde.getMonth() - 1, 1));

    const delMes = validos.filter((p) => new Date(p.creadoEn) >= desde);
    const delMesAnterior = validos.filter((p) => {
      const f = new Date(p.creadoEn);
      return f >= desdeAnterior && f < desde;
    });
    const suma = (ps: Pedido[]) => ps.reduce((s, p) => s + p.total, 0);

    const porAtender = lista.filter((p) => p.estado === 'pagado' || p.estado === 'preparando').length;
    const ventasMes = suma(delMes);
    const ventasMesAnterior = suma(delMesAnterior);
    const ticket = validos.length ? suma(validos) / validos.length : 0;

    const conteo = new Map<string, { nombre: string; piezas: number; importe: number }>();
    for (const p of validos) {
      for (const it of p.items) {
        const clave = it.productoId;
        const actual = conteo.get(clave) ?? { nombre: it.nombre, piezas: 0, importe: 0 };
        actual.piezas += it.cantidad;
        actual.importe += it.cantidad * it.precioUnitario;
        conteo.set(clave, actual);
      }
    }
    const masVendidos = [...conteo.entries()]
      .map(([productoId, v]) => ({ productoId, ...v }))
      .sort((a, b) => b.piezas - a.piezas)
      .slice(0, 5);

    return {
      porAtender,
      ventasMes,
      ventasMesAnterior,
      pedidosMes: delMes.length,
      ticket,
      totalPedidos: validos.length,
      masVendidos,
      recientes: lista.slice(0, 6),
    };
  }, [pedidos]);

  const variacion =
    metricas.ventasMesAnterior > 0
      ? ((metricas.ventasMes - metricas.ventasMesAnterior) / metricas.ventasMesAnterior) * 100
      : null;

  const mesActual = new Date().toLocaleDateString('es-MX', { month: 'long' });

  return (
    <div className="max-w-6xl space-y-10">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Resumen</h1>
          <p className="text-sm text-zinc-500 mt-1">Así va la tienda. Los pedidos de demostración no cuentan.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/pedidos">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Pedidos
              {metricas.porAtender > 0 ? (
                <span className="ml-2 rounded-full bg-white/20 px-1.5 text-xs tabular-nums">{metricas.porAtender}</span>
              ) : null}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/" target="_blank">
              <Eye className="mr-2 h-4 w-4" />
              Ver sitio
            </Link>
          </Button>
        </div>
      </div>

      {error ? (
        <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-md px-4 py-3">{error}</p>
      ) : null}

      <section className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-zinc-200 border-y border-zinc-200">
        {[
          {
            etiqueta: `Ventas de ${mesActual}`,
            valor: loading ? null : formatearPrecio(metricas.ventasMes),
            nota:
              variacion === null
                ? `${metricas.pedidosMes} ${metricas.pedidosMes === 1 ? 'pedido' : 'pedidos'}`
                : `${variacion >= 0 ? '+' : ''}${variacion.toFixed(0)}% vs. mes anterior`,
          },
          {
            etiqueta: 'Por atender',
            valor: loading ? null : String(metricas.porAtender),
            nota: 'pagados o en preparación',
            alerta: metricas.porAtender > 0,
          },
          {
            etiqueta: 'Ticket promedio',
            valor: loading ? null : formatearPrecio(metricas.ticket),
            nota: `${metricas.totalPedidos} ${metricas.totalPedidos === 1 ? 'pedido' : 'pedidos'} en total`,
          },
          {
            etiqueta: 'Catálogo',
            valor: loading ? null : String(productos.length),
            nota: `${categorias.length} categorías · ${productos.filter((p) => p.destacado).length} destacados`,
          },
        ].map((m) => (
          <div key={m.etiqueta} className="px-5 py-5 first:pl-0 lg:first:pl-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">{m.etiqueta}</p>
            {m.valor === null ? (
              <div className="h-8 w-28 rounded bg-zinc-100 animate-pulse mt-2" />
            ) : (
              <p className={`text-2xl font-semibold tabular-nums mt-1.5 ${m.alerta ? 'text-amber-700' : 'text-zinc-900'}`}>
                {m.valor}
              </p>
            )}
            <p className="text-xs text-zinc-500 mt-1">{m.nota}</p>
          </div>
        ))}
      </section>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10">
        <section>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-900">Últimos pedidos</h2>
            <Link href="/admin/pedidos" className="text-xs text-zinc-500 hover:text-zinc-900 inline-flex items-center gap-1">
              Ver todos <ArrowUpRight size={12} />
            </Link>
          </div>
          {loading ? (
            <div className="divide-y divide-zinc-100 border-t border-zinc-200">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="grid grid-cols-3 gap-4 py-3.5">
                  <div className="h-4 rounded bg-zinc-100 animate-pulse" />
                  <div className="h-4 rounded bg-zinc-100 animate-pulse" />
                  <div className="h-4 rounded bg-zinc-100 animate-pulse" />
                </div>
              ))}
            </div>
          ) : metricas.recientes.length === 0 ? (
            <div className="border-t border-zinc-200 py-10 max-w-sm">
              <div className="w-10 h-10 rounded-full bg-zinc-100 grid place-items-center mb-4">
                <ShoppingBag size={18} strokeWidth={1.5} className="text-zinc-500" />
              </div>
              <p className="text-sm text-zinc-900 font-medium mb-1">Todavía no hay ventas</p>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Cuando alguien pague en la tienda, el pedido aparece aquí y en la sección de pedidos.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-zinc-100 border-t border-zinc-200">
              {metricas.recientes.map((p) => (
                <li key={p.id}>
                  <Link
                    href="/admin/pedidos"
                    className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[90px_1fr_130px_90px] gap-3 sm:gap-4 py-3.5 items-center text-sm hover:bg-zinc-50/70 transition-colors"
                  >
                    <span className="hidden sm:block text-zinc-500 tabular-nums">
                      {new Date(p.creadoEn).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-zinc-900 truncate">{p.cliente.nombre || 'Sin nombre'}</span>
                      <span className="block text-xs text-zinc-400 font-mono">{referenciaPedido(p.id)}</span>
                    </span>
                    <span className={`justify-self-start inline-flex text-xs px-2 py-0.5 rounded-full ring-1 ring-inset ${ESTILO_ESTADO[p.estado] ?? ESTILO_ESTADO.pagado}`}>
                      {ESTADOS_PEDIDO[p.estado]?.etiqueta ?? p.estado}
                    </span>
                    <span className="text-zinc-900 tabular-nums text-right">{formatearPrecio(p.total)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-900">Más vendidos</h2>
            <Link href="/admin/productos" className="text-xs text-zinc-500 hover:text-zinc-900 inline-flex items-center gap-1">
              Catálogo <ArrowUpRight size={12} />
            </Link>
          </div>
          {loading ? (
            <div className="divide-y divide-zinc-100 border-t border-zinc-200">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-4 my-4 rounded bg-zinc-100 animate-pulse" />
              ))}
            </div>
          ) : metricas.masVendidos.length === 0 ? (
            <div className="border-t border-zinc-200 py-10">
              <div className="w-10 h-10 rounded-full bg-zinc-100 grid place-items-center mb-4">
                <Package size={18} strokeWidth={1.5} className="text-zinc-500" />
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">Aquí verás qué productos se venden más.</p>
            </div>
          ) : (
            <ol className="divide-y divide-zinc-100 border-t border-zinc-200">
              {metricas.masVendidos.map((v, i) => {
                const max = metricas.masVendidos[0].piezas || 1;
                return (
                  <li key={v.productoId} className="py-3">
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="text-zinc-900 truncate">
                        <span className="text-zinc-400 tabular-nums mr-2">{i + 1}</span>
                        {v.nombre}
                      </span>
                      <span className="text-zinc-500 tabular-nums shrink-0">
                        {v.piezas} pzas · {formatearPrecio(v.importe)}
                      </span>
                    </div>
                    <div className="h-1 mt-2 rounded-full bg-zinc-100 overflow-hidden">
                      <div className="h-full bg-zinc-900 rounded-full" style={{ width: `${(v.piezas / max) * 100}%` }} />
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </section>
      </div>
    </div>
  );
}
