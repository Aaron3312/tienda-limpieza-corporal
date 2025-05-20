import { 
    signInWithEmailAndPassword, 
    signOut, 
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    User, 
    onAuthStateChanged
  } from 'firebase/auth';
  import { auth } from '@/lib/firebase';
  
  // Tipo para el estado de autenticación
  export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
  }
  
  // Iniciar sesión con email y contraseña
  export const loginWithEmail = async (email: string, password: string): Promise<User> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error.code);
      throw new Error(errorMessage);
    }
  };
  
  // Cerrar sesión
  export const logout = async (): Promise<void> => {
    await signOut(auth);
  };
  
  // Crear un nuevo usuario (solo para admin)
  export const createUser = async (email: string, password: string): Promise<User> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error.code);
      throw new Error(errorMessage);
    }
  };
  
  // Enviar email para restablecer contraseña
  export const resetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error.code);
      throw new Error(errorMessage);
    }
  };
  
  // Suscribirse a cambios en el estado de autenticación
  export const subscribeToAuthChanges = (callback: (user: User | null) => void): (() => void) => {
    return onAuthStateChanged(auth, callback);
  };
  
  // Obtener el usuario actual
  export const getCurrentUser = (): User | null => {
    return auth.currentUser;
  };
  
  // Función para traducir códigos de error de Firebase Auth
  const getAuthErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'El correo electrónico no es válido.';
      case 'auth/user-disabled':
        return 'Esta cuenta de usuario ha sido deshabilitada.';
      case 'auth/user-not-found':
        return 'No existe una cuenta con este correo electrónico.';
      case 'auth/wrong-password':
        return 'La contraseña es incorrecta.';
      case 'auth/email-already-in-use':
        return 'Este correo electrónico ya está en uso.';
      case 'auth/weak-password':
        return 'La contraseña es demasiado débil. Debe tener al menos 6 caracteres.';
      case 'auth/network-request-failed':
        return 'Error de conexión. Verifica tu conexión a internet.';
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Intenta más tarde.';
      case 'auth/operation-not-allowed':
        return 'Esta operación no está permitida.';
      default:
        return 'Ocurrió un error durante la autenticación.';
    }
  };