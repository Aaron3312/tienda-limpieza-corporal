import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminDb, hayCredencialAdmin } from '@/lib/firebaseAdmin';
import { MAX_POR_LINEA, MONEDA, calcularEnvio } from '@/lib/comercio';
import type { LineaPedido, Producto } from '@/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface LineaEntrante {
  productoId?: unknown;
  varianteId?: unknown;
  cantidad?: unknown;
}

/**
 * Del navegador sólo se aceptan identificadores y cantidades. El precio se lee
 * de Firestore aquí dentro: si el cliente pudiera mandar importes, podría
 * comprar a un peso.
 */
export async function POST(request: Request) {
  let cuerpo: { lineas?: LineaEntrante[] };
  try {
    cuerpo = await request.json();
  } catch {
    return NextResponse.json({ error: 'Petición inválida.' }, { status: 400 });
  }

  const entrantes = Array.isArray(cuerpo.lineas) ? cuerpo.lineas : [];
  if (entrantes.length === 0) {
    return NextResponse.json({ error: 'El carrito está vacío.' }, { status: 400 });
  }
  if (entrantes.length > 50) {
    return NextResponse.json({ error: 'Demasiados productos en el carrito.' }, { status: 400 });
  }
  if (!hayCredencialAdmin()) {
    return NextResponse.json(
      { error: 'Falta configurar FIREBASE_SERVICE_ACCOUNT en el servidor.' },
      { status: 500 },
    );
  }

  const db = adminDb();
  const items: LineaPedido[] = [];

  for (const entrante of entrantes) {
    const productoId = typeof entrante.productoId === 'string' ? entrante.productoId : null;
    const varianteId = typeof entrante.varianteId === 'string' ? entrante.varianteId : null;
    const cantidad = Math.trunc(Number(entrante.cantidad));

    if (!productoId || !varianteId) {
      return NextResponse.json({ error: 'Línea de carrito inválida.' }, { status: 400 });
    }
    if (!Number.isFinite(cantidad) || cantidad < 1 || cantidad > MAX_POR_LINEA) {
      return NextResponse.json(
        { error: `La cantidad por producto debe estar entre 1 y ${MAX_POR_LINEA}.` },
        { status: 400 },
      );
    }

    const snapshot = await db.collection('productos').doc(productoId).get();
    if (!snapshot.exists) {
      return NextResponse.json(
        { error: 'Uno de los productos ya no está disponible. Actualiza tu carrito.' },
        { status: 409 },
      );
    }

    const producto = { id: snapshot.id, ...snapshot.data() } as Producto;
    const variante = producto.variantes?.find((v) => v.id === varianteId);
    if (!variante) {
      return NextResponse.json(
        { error: 'Una de las presentaciones ya no está disponible. Actualiza tu carrito.' },
        { status: 409 },
      );
    }

    const precioUnitario = Number(variante.precio);
    if (!Number.isFinite(precioUnitario) || precioUnitario <= 0) {
      return NextResponse.json(
        { error: 'Un producto tiene un precio inválido. Avísanos, por favor.' },
        { status: 409 },
      );
    }

    items.push({
      productoId,
      varianteId,
      nombre: producto.nombre,
      tamano: variante.tamano ?? '',
      precioUnitario,
      cantidad,
    });
  }

  const subtotal = items.reduce((suma, i) => suma + i.precioUnitario * i.cantidad, 0);
  const envioCosto = calcularEnvio(subtotal);

  // El carrito resuelto se guarda aparte y sólo su id viaja en los metadatos de
  // Stripe: los metadatos tienen un límite de 500 caracteres por valor.
  const referencia = await db.collection('checkout_sesiones').add({
    items,
    subtotal,
    envioCosto,
    total: subtotal + envioCosto,
    moneda: MONEDA,
    creadoEn: new Date().toISOString(),
    estado: 'iniciado',
  });

  const origen =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    new URL(request.url).origin;

  const claveStripe = process.env.STRIPE_SECRET_KEY;

  // Sin llaves de Stripe todavía: el flujo se completa en modo simulado para
  // poder enseñar la demo. Se retira en cuanto existan las llaves de prueba.
  if (!claveStripe) {
    const creado = await db.collection('pedidos').add({
      stripeSessionId: `simulado_${referencia.id}`,
      stripePaymentIntentId: '',
      estado: 'pagado',
      creadoEn: new Date().toISOString(),
      cliente: {
        nombre: 'Pedido de demostración',
        email: '',
        telefono: '',
      },
      envio: { calle: '', colonia: '', ciudad: '', estado: '', cp: '', pais: 'MX' },
      items,
      subtotal,
      envioCosto,
      total: subtotal + envioCosto,
      moneda: MONEDA,
      simulado: true,
    });
    await referencia.update({ estado: 'simulado', pedidoId: creado.id });

    return NextResponse.json({
      url: `${origen}/carrito/exito?simulado=1&pedido=${creado.id}`,
      simulado: true,
    });
  }

  const stripe = new Stripe(claveStripe);

  try {
    const sesion = await stripe.checkout.sessions.create({
      mode: 'payment',
      locale: 'es',
      // Stripe cobra en centavos.
      line_items: items.map((item) => ({
        quantity: item.cantidad,
        price_data: {
          currency: MONEDA.toLowerCase(),
          unit_amount: Math.round(item.precioUnitario * 100),
          product_data: {
            name: item.tamano ? `${item.nombre} — ${item.tamano}` : item.nombre,
          },
        },
      })),
      shipping_address_collection: { allowed_countries: ['MX'] },
      phone_number_collection: { enabled: true },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            display_name: envioCosto === 0 ? 'Envío gratis' : 'Envío nacional',
            fixed_amount: {
              amount: Math.round(envioCosto * 100),
              currency: MONEDA.toLowerCase(),
            },
          },
        },
      ],
      metadata: { checkoutId: referencia.id },
      success_url: `${origen}/carrito/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origen}/carrito?cancelado=1`,
    });

    await referencia.update({ stripeSessionId: sesion.id });

    return NextResponse.json({ url: sesion.url });
  } catch (e) {
    console.error('[checkout] Stripe falló:', e);
    return NextResponse.json(
      { error: 'No pudimos conectar con Stripe. Intenta de nuevo.' },
      { status: 502 },
    );
  }
}
