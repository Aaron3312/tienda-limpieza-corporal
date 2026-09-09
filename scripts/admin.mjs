#!/usr/bin/env node
/**
 * Gestiona quién es administradora del panel.
 *
 *   npm run admin -- list
 *   npm run admin -- grant correo@dominio.com
 *   npm run admin -- revoke correo@dominio.com
 *
 * El rol es un custom claim `admin: true` en Firebase Auth; lo leen
 * firestore.rules, storage.rules y los route handlers. Si la cuenta todavía no
 * existe se crea vacía: al entrar con Google con ese correo, Firebase la enlaza.
 *
 * Credencial: GOOGLE_APPLICATION_CREDENTIALS (ruta al JSON) o
 * FIREBASE_SERVICE_ACCOUNT (JSON en una línea o base64), igual que el servidor.
 */
import { readFileSync, existsSync } from 'node:fs';
import { cert, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

function cargarEnvLocal() {
  if (!existsSync('.env.local')) return;
  for (const linea of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = linea.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

function credencial() {
  const bruto = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (bruto) {
    const texto = bruto.trim().startsWith('{') ? bruto : Buffer.from(bruto, 'base64').toString('utf8');
    return JSON.parse(texto);
  }
  const ruta = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (ruta && existsSync(ruta)) return JSON.parse(readFileSync(ruta, 'utf8'));
  throw new Error('Falta GOOGLE_APPLICATION_CREDENTIALS o FIREBASE_SERVICE_ACCOUNT.');
}

async function main() {
  cargarEnvLocal();
  const [accion, correo] = process.argv.slice(2);
  if (!['list', 'grant', 'revoke'].includes(accion) || (accion !== 'list' && !correo)) {
    console.error('Uso: npm run admin -- list | grant <correo> | revoke <correo>');
    process.exit(1);
  }

  const sa = credencial();
  initializeApp({ credential: cert(sa), projectId: sa.project_id });
  const auth = getAuth();

  if (accion === 'list') {
    let token;
    const admins = [];
    do {
      const pagina = await auth.listUsers(1000, token);
      admins.push(...pagina.users.filter((u) => u.customClaims?.admin === true));
      token = pagina.pageToken;
    } while (token);
    if (admins.length === 0) console.log('No hay administradoras. Usa: npm run admin -- grant <correo>');
    for (const u of admins) console.log(`${u.email ?? '(sin correo)'}  ${u.uid}`);
    return;
  }

  let usuario;
  try {
    usuario = await auth.getUserByEmail(correo);
  } catch (e) {
    if (e.code !== 'auth/user-not-found' || accion === 'revoke') throw e;
    usuario = await auth.createUser({ email: correo, emailVerified: false });
    console.log(`Cuenta creada para ${correo}; podrá entrar con Google o restableciendo contraseña.`);
  }

  const claims = { ...(usuario.customClaims ?? {}) };
  if (accion === 'grant') claims.admin = true;
  else delete claims.admin;

  await auth.setCustomUserClaims(usuario.uid, claims);
  // El claim entra en vigor en el próximo token; cerrar sesiones activas lo acelera.
  await auth.revokeRefreshTokens(usuario.uid);
  console.log(`${accion === 'grant' ? 'Concedido' : 'Retirado'} rol admin a ${correo}. Debe volver a iniciar sesión.`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
