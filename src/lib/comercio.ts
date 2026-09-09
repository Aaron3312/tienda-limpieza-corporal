/** Reglas comerciales en un solo sitio: las usa el carrito y también el servidor. */

export const MONEDA = 'MXN' as const;

/** Envío nacional a tarifa plana. */
export const ENVIO_COSTO = 150;

/** A partir de este subtotal el envío no se cobra. */
export const ENVIO_GRATIS_DESDE = 800;

/**
 * Tope por línea. No hay inventario en este proyecto y no lo va a haber, así
 * que este número es lo único que separa un pedido real de uno de 500 piezas
 * que nadie puede producir.
 */
export const MAX_POR_LINEA = 10;

export function calcularEnvio(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= ENVIO_GRATIS_DESDE ? 0 : ENVIO_COSTO;
}

const formateador = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: MONEDA,
  minimumFractionDigits: 2,
});

export function formatearPrecio(monto: number): string {
  return formateador.format(monto);
}

import type { EstadoPedido } from '@/types';

export const ESTADOS_PEDIDO: Record<EstadoPedido, { etiqueta: string; descripcion: string }> = {
  pagado: { etiqueta: 'Pagado', descripcion: 'Recibimos tu pago y tu pedido entró a la cola de preparación.' },
  preparando: { etiqueta: 'En preparación', descripcion: 'Estamos preparando tus productos a mano.' },
  enviado: { etiqueta: 'Enviado', descripcion: 'Tu paquete ya va en camino.' },
  entregado: { etiqueta: 'Entregado', descripcion: 'Tu pedido fue entregado. Gracias por comprar.' },
  cancelado: { etiqueta: 'Cancelado', descripcion: 'Este pedido fue cancelado.' },
};

/** Orden en que avanza un pedido; `cancelado` queda fuera de la línea. */
export const SECUENCIA_ESTADOS: EstadoPedido[] = ['pagado', 'preparando', 'enviado', 'entregado'];

export function formatearFecha(iso: string): string {
  return new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** Referencia corta y legible del pedido, la misma que va en los correos. */
export function referenciaPedido(id: string): string {
  return id.slice(0, 8).toUpperCase();
}
