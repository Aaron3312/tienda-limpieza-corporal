'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { User } from 'firebase/auth';
import {
  esAdministrador,
  loginWithEmail,
  loginWithGoogle,
  logout,
  resetPassword,
  subscribeToAuthChanges,
} from '@/services/auth';

interface AuthContextType {
  user: User | null;
  /** true sólo cuando el token trae el custom claim `admin`. */
  esAdmin: boolean;
  /** Mientras Firebase resuelve la sesión inicial. */
  loading: boolean;
  /** Mientras corre un login / logout disparado por la interfaz. */
  ocupado: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
  resetUserPassword: (email: string) => Promise<void>;
  /** Token fresco para llamar a los route handlers protegidos. */
  obtenerToken: () => Promise<string | null>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [esAdmin, setEsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (authUser) => {
      setUser(authUser);
      // El claim se lee del token, no de Firestore: no cuesta una lectura y no
      // se puede falsificar desde el navegador.
      setEsAdmin(await esAdministrador(authUser));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const ejecutar = useCallback(async (accion: () => Promise<unknown>) => {
    setOcupado(true);
    setError(null);
    try {
      await accion();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error.');
      throw err;
    } finally {
      setOcupado(false);
    }
  }, []);

  const login = useCallback(
    (email: string, password: string) =>
      ejecutar(async () => {
        const u = await loginWithEmail(email, password);
        setUser(u);
        setEsAdmin(await esAdministrador(u, true));
      }),
    [ejecutar],
  );

  const loginGoogle = useCallback(
    () =>
      ejecutar(async () => {
        const u = await loginWithGoogle();
        setUser(u);
        setEsAdmin(await esAdministrador(u, true));
      }),
    [ejecutar],
  );

  const logOut = useCallback(
    () =>
      ejecutar(async () => {
        await logout();
        setUser(null);
        setEsAdmin(false);
      }),
    [ejecutar],
  );

  const resetUserPassword = useCallback(
    (email: string) => ejecutar(() => resetPassword(email)),
    [ejecutar],
  );

  const obtenerToken = useCallback(async () => {
    if (!user) return null;
    try {
      return await user.getIdToken();
    } catch {
      return null;
    }
  }, [user]);

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo(
    () => ({
      user,
      esAdmin,
      loading,
      ocupado,
      error,
      login,
      loginGoogle,
      logOut,
      resetUserPassword,
      obtenerToken,
      clearError,
    }),
    [user, esAdmin, loading, ocupado, error, login, loginGoogle, logOut, resetUserPassword, obtenerToken, clearError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
