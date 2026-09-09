import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminDb, hayCredencialAdmin } from '@/lib/firebaseAdmin';
import { referenciaPedido } from '@/lib/comercio';
import type { LineaPedido, Pedido } from '@/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface Resumen {
  /** Stripe confirmó el cobro. */
  pagado: boolean;
  /** El webhook ya creó el pedido (puede tardar unos segundos tras el pago). */
  pedidoId: string | null;
  referencia: string | null;
  email: string | null;
  total: number;
  items: LineaPedido[];
  simulado: boolean;
}

/**
 * La página de éxito pregunta aquí por el resultado de la sesión de Checkout.
 * El id de sesión de Stripe es un secreto de un solo uso que sólo conoce quien
 * volvió del pago; no expone más que lo que esa persona acaba de comprar.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get('session_id');
  const pedidoSimulado = url.searchParams.get('pedido');

  if (!hayCredencialAdmin()) {
    return NextResponse.json({ error: 'Servidor sin credencial de Firebase.' }, { status: 500 });
  }
  const db = adminDb();

  // Pedido de demostración (sin llaves de Stripe): se lee directo.
  if (!sessionId && pedidoSimulado) {
    const doc = await db.collection('pedidos').doc(pedidoSimulado).get();
    const pedido = doc.exists ? ({ id: doc.id, ...doc.data() } as Pedido) : null;
    if (!pedido || !pedido.simulado) {
      return NextResponse.json({ error: 'Pedido no encontrado.' }, { status: 404 });
    }
    const resumen: Resumen = {
      pagado: true,
      pedidoId: pedido.id,
      referencia: referenciaPedido(pedido.id),
      email: pedido.cliente.email || null,
      total: pedido.total,
      items: pedido.items,
      simulado: true,
    };
    return NextResponse.json(resumen);
  }

  if (!sessionId || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) {
    return NextResponse.json({ error: 'Sesión inválida.' }, { status: 400 });
  }
  const claveStripe = process.env.STRIPE_SECRET_KEY;
  if (!claveStripe) {
    return NextResponse.json({ error: 'Stripe no está configurado.' }, { status: 500 });
  }

  let sesion: Stripe.Checkout.Session;
  try {
    sesion = await new Stripe(claveStripe).checkout.sessions.retrieve(sessionId);
  } catch {
    return NextResponse.json({ error: 'No encontramos esa sesión de pago.' }, { status: 404 });
  }

  const pagado = sesion.payment_status === 'paid';

  const existente = await db.collection('pedidos').where('stripeSessionId', '==', sesion.id).limit(1).get();
  const pedido = existente.empty ? null : ({ id: existente.docs[0].id, ...existente.docs[0].data() } as Pedido);

  let items: LineaPedido[] = pedido?.items ?? [];
  if (!pedido && sesion.metadata?.checkoutId) {
    const ref = await db.collection('checkout_sesiones').doc(sesion.metadata.checkoutId).get();
    items = (ref.data()?.items as LineaPedido[] | undefined) ?? [];
  }

  const resumen: Resumen = {
    pagado,
    pedidoId: pedido?.id ?? null,
    referencia: pedido ? referenciaPedido(pedido.id) : null,
    email: pedido?.cliente.email || sesion.customer_details?.email || null,
    total: pedido?.total ?? (sesion.amount_total ?? 0) / 100,
    items,
    simulado: false,
  };
  return NextResponse.json(resumen);
}
