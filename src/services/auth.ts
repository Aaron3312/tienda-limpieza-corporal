import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface ErrorConCodigo {
  code?: string;
}

function codigoDe(error: unknown): string {
  return typeof error === 'object' && error !== null && 'code' in error
    ? String((error as ErrorConCodigo).code)
    : '';
}

/** Iniciar sesión con correo y contraseña (cuenta de administración clásica). */
export const loginWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const credencial = await signInWithEmailAndPassword(auth, email, password);
    return credencial.user;
  } catch (error) {
    throw new Error(getAuthErrorMessage(codigoDe(error)));
  }
};

/**
 * Iniciar sesión con Google. Sirve tanto para clientas de la tienda como para
 * administradoras: el rol no lo da el proveedor, lo da el custom claim `admin`.
 */
export const loginWithGoogle = async (): Promise<User> => {
  const proveedor = new GoogleAuthProvider();
  proveedor.setCustomParameters({ prompt: 'select_account' });
  try {
    const credencial = await signInWithPopup(auth, proveedor);
    return credencial.user;
  } catch (error) {
    throw new Error(getAuthErrorMessage(codigoDe(error)));
  }
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};

export const createUser = async (email: string, password: string): Promise<User> => {
  try {
    const credencial = await createUserWithEmailAndPassword(auth, email, password);
    return credencial.user;
  } catch (error) {
    throw new Error(getAuthErrorMessage(codigoDe(error)));
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw new Error(getAuthErrorMessage(codigoDe(error)));
  }
};

export const subscribeToAuthChanges = (callback: (user: User | null) => void): (() => void) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): User | null => auth.currentUser;

/**
 * El rol de administrador viaja como custom claim en el token de Firebase.
 * Se asigna con `npm run admin -- grant correo@dominio.com` (scripts/admin.mjs).
 */
export const esAdministrador = async (user: User | null, forzar = false): Promise<boolean> => {
  if (!user) return false;
  const resultado = await user.getIdTokenResult(forzar);
  return resultado.claims.admin === true;
};

const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'El correo electrónico no es válido.';
    case 'auth/user-disabled':
      return 'Esta cuenta ha sido deshabilitada.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Correo o contraseña incorrectos.';
    case 'auth/email-already-in-use':
      return 'Este correo electrónico ya está en uso.';
    case 'auth/weak-password':
      return 'La contraseña es demasiado débil. Debe tener al menos 6 caracteres.';
    case 'auth/network-request-failed':
      return 'Error de conexión. Verifica tu conexión a internet.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos fallidos. Intenta más tarde.';
    case 'auth/operation-not-allowed':
      return 'Este método de acceso no está habilitado en Firebase.';
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'Se cerró la ventana de Google antes de terminar.';
    case 'auth/popup-blocked':
      return 'Tu navegador bloqueó la ventana de Google. Permite ventanas emergentes e intenta de nuevo.';
    case 'auth/unauthorized-domain':
      return 'Este dominio no está autorizado en Firebase Authentication.';
    case 'auth/account-exists-with-different-credential':
      return 'Ya existe una cuenta con este correo. Entra con tu contraseña.';
    default:
      return 'Ocurrió un error durante la autenticación.';
  }
};
