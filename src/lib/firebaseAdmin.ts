import 'server-only';
import { cert, getApp, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getAuth, type Auth } from 'firebase-admin/auth';

// SDK de administrador: sólo servidor. Ignora las reglas de Firestore por
// diseño, y es la única vía por la que se escriben los pedidos.
//
// Credencial: FIREBASE_SERVICE_ACCOUNT con el JSON de la cuenta de servicio
// (en una sola línea, o en base64). En local también sirve dejar la ruta en
// GOOGLE_APPLICATION_CREDENTIALS.

function leerCredencial() {
  const bruto = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!bruto) return null;

  const texto = bruto.trim().startsWith('{')
    ? bruto
    : Buffer.from(bruto, 'base64').toString('utf8');

  const json = JSON.parse(texto);
  return {
    projectId: json.project_id,
    clientEmail: json.client_email,
    // Vercel guarda los saltos de línea escapados.
    privateKey: (json.private_key as string).replace(/\\n/g, '\n'),
  };
}

let app: App | null = null;

function obtenerApp(): App {
  if (app) return app;
  if (getApps().length) {
    app = getApp();
    return app;
  }

  const credencial = leerCredencial();
  app = credencial
    ? initializeApp({ credential: cert(credencial), projectId: credencial.projectId })
    : initializeApp(); // usa GOOGLE_APPLICATION_CREDENTIALS

  return app;
}

export function adminDb(): Firestore {
  return getFirestore(obtenerApp());
}

export function adminAuth(): Auth {
  return getAuth(obtenerApp());
}

export function hayCredencialAdmin(): boolean {
  return Boolean(process.env.FIREBASE_SERVICE_ACCOUNT || process.env.GOOGLE_APPLICATION_CREDENTIALS);
}

// ---------------------------------------------------------------------------
// Autorización en route handlers
// ---------------------------------------------------------------------------

export interface SesionVerificada {
  uid: string;
  email: string | null;
  admin: boolean;
}

/**
 * Lee el `Authorization: Bearer <idToken>` de la petición y lo verifica con
 * Firebase. Devuelve null si no hay token o no es válido; nunca lanza.
 */
export async function verificarSesion(request: Request): Promise<SesionVerificada | null> {
  const cabecera = request.headers.get('authorization') ?? '';
  const token = cabecera.startsWith('Bearer ') ? cabecera.slice(7).trim() : '';
  if (!token) return null;

  try {
    const decodificado = await adminAuth().verifyIdToken(token);
    return {
      uid: decodificado.uid,
      email: decodificado.email ?? null,
      admin: decodificado.admin === true,
    };
  } catch {
    return null;
  }
}

/** Igual que verificarSesion, pero además exige el custom claim `admin`. */
export async function verificarAdmin(request: Request): Promise<SesionVerificada | null> {
  const sesion = await verificarSesion(request);
  return sesion?.admin ? sesion : null;
}
