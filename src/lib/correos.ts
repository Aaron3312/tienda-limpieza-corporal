import 'server-only';
import { Resend } from 'resend';
import { formatearPrecio, referenciaPedido } from './comercio';
import type { Pedido } from '@/types';

// Mientras el dominio no esté verificado en Resend, onboarding@resend.dev sólo
// puede enviar a la dirección con la que se creó la cuenta. Es suficiente para
// la demo; para producción hay que verificar soloparaeva.lat.
const REMITENTE = process.env.RESEND_FROM ?? 'Solo Para Eva <onboarding@resend.dev>';
const CORREO_DUENA = process.env.CORREO_NOTIFICACIONES ?? 'altardelcielogp@gmail.com';

function filasDeItems(pedido: Pedido): string {
  return pedido.items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #EDE8DF;color:#1C2B12">
            ${item.nombre}${item.tamano ? ` <span style="color:#5A5A5A">· ${item.tamano}</span>` : ''}
          </td>
          <td style="padding:10px 0;border-bottom:1px solid #EDE8DF;text-align:center;color:#5A5A5A">
            ${item.cantidad}
          </td>
          <td style="padding:10px 0;border-bottom:1px solid #EDE8DF;text-align:right;color:#1C2B12">
            ${formatearPrecio(item.precioUnitario * item.cantidad)}
          </td>
        </tr>`,
    )
    .join('');
}

function totales(pedido: Pedido): string {
  return `
    <table style="width:100%;margin-top:16px;font-size:14px">
      <tr>
        <td style="color:#5A5A5A;padding:3px 0">Subtotal</td>
        <td style="text-align:right;color:#1C2B12">${formatearPrecio(pedido.subtotal)}</td>
      </tr>
      <tr>
        <td style="color:#5A5A5A;padding:3px 0">Envío</td>
        <td style="text-align:right;color:#1C2B12">
          ${pedido.envioCosto === 0 ? 'Gratis' : formatearPrecio(pedido.envioCosto)}
        </td>
      </tr>
      <tr>
        <td style="padding-top:10px;color:#1C2B12;font-size:16px">Total</td>
        <td style="padding-top:10px;text-align:right;color:#1C2B12;font-size:16px">
          ${formatearPrecio(pedido.total)}
        </td>
      </tr>
    </table>`;
}

function direccion(pedido: Pedido): string {
  const { envio } = pedido;
  return [envio.calle, envio.ciudad, envio.estado, envio.cp, envio.pais]
    .filter(Boolean)
    .join('<br>');
}

function envoltura(contenido: string): string {
  return `
    <div style="background:#F7F4EF;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
      <div style="max-width:560px;margin:0 auto;background:#FFFFFF;border-radius:10px;padding:32px">
        ${contenido}
      </div>
    </div>`;
}

/** Avisa a la dueña y confirma al cliente. Se llama desde el webhook. */
export async function enviarCorreosDePedido(pedido: Pedido): Promise<void> {
  const clave = process.env.RESEND_API_KEY;
  if (!clave) {
    console.warn('[correos] RESEND_API_KEY no configurada; se omite el envío del pedido', pedido.id);
    return;
  }

  const resend = new Resend(clave);
  const corto = referenciaPedido(pedido.id);

  const paraDuena = envoltura(`
    <p style="margin:0 0 4px;color:#5A5A5A;font-size:13px;letter-spacing:.05em;text-transform:uppercase">
      Nuevo pedido
    </p>
    <h1 style="margin:0 0 24px;color:#1C2B12;font-size:24px;font-weight:600">Pedido ${corto}</h1>

    <table style="width:100%;border-collapse:collapse;font-size:14px">${filasDeItems(pedido)}</table>
    ${totales(pedido)}

    <h2 style="margin:28px 0 8px;color:#1C2B12;font-size:15px">Enviar a</h2>
    <p style="margin:0;color:#5A5A5A;font-size:14px;line-height:1.6">
      ${pedido.cliente.nombre}<br>${direccion(pedido)}
    </p>
    <p style="margin:12px 0 0;color:#5A5A5A;font-size:14px">
      ${pedido.cliente.email}${pedido.cliente.telefono ? ` · ${pedido.cliente.telefono}` : ''}
    </p>`);

  const paraCliente = envoltura(`
    <p style="margin:0 0 4px;color:#5A5A5A;font-size:13px;letter-spacing:.05em;text-transform:uppercase">
      Solo Para Eva
    </p>
    <h1 style="margin:0 0 16px;color:#1C2B12;font-size:24px;font-weight:600">
      Gracias por tu compra
    </h1>
    <p style="margin:0 0 24px;color:#5A5A5A;font-size:14px;line-height:1.6">
      Recibimos tu pedido <strong style="color:#1C2B12">${corto}</strong> y ya estamos preparándolo.
      Todo se hace a mano y en lotes pequeños, así que lo cuidamos pieza por pieza.
    </p>

    <table style="width:100%;border-collapse:collapse;font-size:14px">${filasDeItems(pedido)}</table>
    ${totales(pedido)}

    <h2 style="margin:28px 0 8px;color:#1C2B12;font-size:15px">Dirección de envío</h2>
    <p style="margin:0;color:#5A5A5A;font-size:14px;line-height:1.6">${direccion(pedido)}</p>`);

  await Promise.all([
    resend.emails.send({
      from: REMITENTE,
      to: CORREO_DUENA,
      subject: `Nuevo pedido ${corto} · ${formatearPrecio(pedido.total)}`,
      html: paraDuena,
    }),
    pedido.cliente.email
      ? resend.emails.send({
          from: REMITENTE,
          to: pedido.cliente.email,
          subject: `Tu pedido ${corto} en Solo Para Eva`,
          html: paraCliente,
        })
      : Promise.resolve(null),
  ]);
}
