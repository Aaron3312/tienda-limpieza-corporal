import { NextResponse } from 'next/server';
import { adminAuth, adminDb, hayCredencialAdmin } from '@/lib/firebaseAdmin';
import type { Pedido } from '@/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Los pedidos no se pueden leer desde el navegador (firestore.rules los cierra
 * por completo), así que el panel los pide por aquí: se valida el token de
 * Firebase del administrador y se lee con el Admin SDK.
 */
export async function GET(request: Request) {
  if (!hayCredencialAdmin()) {
    return NextResponse.json(
      { error: 'Falta configurar FIREBASE_SERVICE_ACCOUNT en el servidor.' },
      { status: 500 },
    );
  }

  const cabecera = request.headers.get('authorization') ?? '';
  const token = cabecera.startsWith('Bearer ') ? cabecera.slice(7) : null;
  if (!token) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  try {
    await adminAuth().verifyIdToken(token);
  } catch {
    return NextResponse.json({ error: 'Sesión inválida o expirada.' }, { status: 401 });
  }

  const snapshot = await adminDb()
    .collection('pedidos')
    .orderBy('creadoEn', 'desc')
    .limit(200)
    .get();

  const pedidos = snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as Pedido[];

  return NextResponse.json({ pedidos });
}
