import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminDb } from '@/lib/firebaseAdmin';
import { enviarCorreosDePedido } from '@/lib/correos';
import { MONEDA } from '@/lib/comercio';
import type { LineaPedido, Pedido } from '@/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Único punto donde nace un pedido. Se escribe con el Admin SDK después de que
 * Stripe confirma el cobro; el navegador no puede crear pedidos ni leerlos
 * (ver firestore.rules).
 */
export async function POST(request: Request) {
  const claveStripe = process.env.STRIPE_SECRET_KEY;
  const secretoWebhook = process.env.STRIPE_WEBHOOK_SECRET;

  if (!claveStripe || !secretoWebhook) {
    return NextResponse.json({ error: 'Stripe no está configurado.' }, { status: 500 });
  }

  const firma = request.headers.get('stripe-signature');
  if (!firma) {
    return NextResponse.json({ error: 'Falta la firma de Stripe.' }, { status: 400 });
  }

  const stripe = new Stripe(claveStripe);
  const cuerpoCrudo = await request.text();

  let evento: Stripe.Event;
  try {
    // Verificar la firma es lo que impide que cualquiera invente un pedido
    // pagado haciendo POST a esta ruta.
    evento = stripe.webhooks.constructEvent(cuerpoCrudo, firma, secretoWebhook);
  } catch (e) {
    console.error('[webhook] firma inválida:', e);
    return NextResponse.json({ error: 'Firma inválida.' }, { status: 400 });
  }

  if (evento.type !== 'checkout.session.completed') {
    return NextResponse.json({ recibido: true });
  }

  const sesion = evento.data.object as Stripe.Checkout.Session;
  if (sesion.payment_status !== 'paid') {
    return NextResponse.json({ recibido: true });
  }

  const db = adminDb();

  // Stripe reintenta los webhooks: sin esta guarda, un reintento duplicaría el
  // pedido y el correo al dueño.
  const yaExiste = await db
    .collection('pedidos')
    .where('stripeSessionId', '==', sesion.id)
    .limit(1)
    .get();
  if (!yaExiste.empty) {
    return NextResponse.json({ recibido: true, duplicado: true });
  }

  const checkoutId = sesion.metadata?.checkoutId;
  if (!checkoutId) {
    console.error('[webhook] sesión sin checkoutId:', sesion.id);
    return NextResponse.json({ error: 'Sesión sin referencia.' }, { status: 400 });
  }

  const referencia = await db.collection('checkout_sesiones').doc(checkoutId).get();
  if (!referencia.exists) {
    console.error('[webhook] checkout_sesiones no encontrado:', checkoutId);
    return NextResponse.json({ error: 'Referencia no encontrada.' }, { status: 400 });
  }

  const datos = referencia.data() as {
    items: LineaPedido[];
    subtotal: number;
    envioCosto: number;
    total: number;
  };

  // En la versión actual de la API la dirección de envío vive en
  // collected_information.shipping_details; customer_details trae la de
  // facturación. Se prefiere la de envío.
  const envioDetalles = sesion.collected_information?.shipping_details ?? null;
  const envio = envioDetalles?.address ?? sesion.customer_details?.address ?? null;

  const pedido: Omit<Pedido, 'id'> = {
    stripeSessionId: sesion.id,
    stripePaymentIntentId:
      typeof sesion.payment_intent === 'string'
        ? sesion.payment_intent
        : (sesion.payment_intent?.id ?? ''),
    estado: 'pagado',
    creadoEn: new Date().toISOString(),
    cliente: {
      nombre: envioDetalles?.name ?? sesion.customer_details?.name ?? '',
      email: sesion.customer_details?.email ?? '',
      telefono: sesion.customer_details?.phone ?? '',
    },
    envio: {
      calle: [envio?.line1, envio?.line2].filter(Boolean).join(', '),
      colonia: envio?.line2 ?? '',
      ciudad: envio?.city ?? '',
      estado: envio?.state ?? '',
      cp: envio?.postal_code ?? '',
      pais: envio?.country ?? 'MX',
    },
    // Copia congelada: el pedido no debe cambiar si mañana se edita el precio.
    items: datos.items,
    subtotal: datos.subtotal,
    envioCosto: datos.envioCosto,
    total: datos.total,
    moneda: MONEDA,
  };

  const creado = await db.collection('pedidos').add(pedido);
  await referencia.ref.update({ estado: 'pagado', pedidoId: creado.id });

  // Un fallo de correo no debe devolver error a Stripe: el cobro ya ocurrió y
  // Stripe reintentaría el webhook indefinidamente.
  try {
    await enviarCorreosDePedido({ id: creado.id, ...pedido });
  } catch (e) {
    console.error('[webhook] fallo al enviar correos del pedido', creado.id, e);
  }

  return NextResponse.json({ recibido: true, pedidoId: creado.id });
}
