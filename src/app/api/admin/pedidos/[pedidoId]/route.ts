import { NextResponse } from 'next/server';
import { adminDb, hayCredencialAdmin, verificarAdmin } from '@/lib/firebaseAdmin';
import { enviarCorreoEnvio } from '@/lib/correos';
import { ESTADOS_PEDIDO } from '@/lib/comercio';
import type { EstadoPedido, Pedido } from '@/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ESTADOS_VALIDOS = Object.keys(ESTADOS_PEDIDO) as EstadoPedido[];

function texto(valor: unknown, max = 80): string {
  return typeof valor === 'string' ? valor.trim().slice(0, max) : '';
}

/**
 * La administradora mueve el pedido de estado y registra la guía. Es el único
 * cambio que admite un pedido después de nacer: importes, artículos y
 * dirección quedan congelados.
 */
export async function PATCH(request: Request, contexto: { params: Promise<{ pedidoId: string }> }) {
  if (!hayCredencialAdmin()) {
    return NextResponse.json({ error: 'Falta configurar FIREBASE_SERVICE_ACCOUNT en el servidor.' }, { status: 500 });
  }
  const sesion = await verificarAdmin(request);
  if (!sesion) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  const { pedidoId } = await contexto.params;
  let cuerpo: { estado?: unknown; envioPaqueteria?: unknown; envioGuia?: unknown };
  try {
    cuerpo = await request.json();
  } catch {
    return NextResponse.json({ error: 'Petición inválida.' }, { status: 400 });
  }

  const estado = cuerpo.estado as EstadoPedido;
  if (!ESTADOS_VALIDOS.includes(estado)) {
    return NextResponse.json({ error: 'Estado no válido.' }, { status: 400 });
  }

  const ref = adminDb().collection('pedidos').doc(pedidoId);
  const actual = await ref.get();
  if (!actual.exists) {
    return NextResponse.json({ error: 'El pedido no existe.' }, { status: 404 });
  }
  const previo = { id: actual.id, ...actual.data() } as Pedido;

  const cambios: Partial<Pedido> = {
    estado,
    actualizadoEn: new Date().toISOString(),
  };
  if ('envioPaqueteria' in cuerpo) cambios.envioPaqueteria = texto(cuerpo.envioPaqueteria);
  if ('envioGuia' in cuerpo) cambios.envioGuia = texto(cuerpo.envioGuia);

  await ref.update(cambios);
  const pedido: Pedido = { ...previo, ...cambios };

  // El aviso sale sólo al entrar a `enviado`, no cada vez que se guarda la guía.
  let correoEnviado = false;
  if (estado === 'enviado' && previo.estado !== 'enviado') {
    try {
      await enviarCorreoEnvio(pedido);
      correoEnviado = Boolean(process.env.RESEND_API_KEY && pedido.cliente.email);
    } catch (e) {
      console.error('[pedidos] fallo al enviar aviso de envío', pedidoId, e);
    }
  }

  return NextResponse.json({ pedido, correoEnviado });
}
