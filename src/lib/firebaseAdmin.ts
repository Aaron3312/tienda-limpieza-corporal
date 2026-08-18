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
