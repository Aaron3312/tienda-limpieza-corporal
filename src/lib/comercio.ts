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
