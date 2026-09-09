'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

function IconoGoogle() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.5 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
      <path fill="#FBBC05" d="M10.4 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.8-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.8-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.7-4-13.6-9.8l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const router = useRouter();
  const { user, esAdmin, loading, ocupado, error, login, loginGoogle, logOut, resetUserPassword, clearError } =
    useAuth();

  // Con sesión de administradora ya resuelta, no hay nada que hacer aquí.
  useEffect(() => {
    if (!loading && user && esAdmin) router.replace('/admin/dashboard');
  }, [loading, user, esAdmin, router]);

  const sinPermiso = !loading && user && !esAdmin;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch {
      // El mensaje ya está en `error`.
    }
  };

  const handleGoogle = async () => {
    try {
      await loginGoogle();
    } catch {
      // El mensaje ya está en `error`.
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetUserPassword(resetEmail);
      setResetSuccess(true);
    } catch {
      // El mensaje ya está en `error`.
    }
  };

  const toggleResetForm = () => {
    clearError();
    setShowResetForm(!showResetForm);
    setResetSuccess(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Solo Para Eva - Admin</CardTitle>
            <CardDescription className="text-center">
              {showResetForm
                ? 'Ingresa tu email para restablecer tu contraseña'
                : 'Inicia sesión para acceder al panel de administración'}
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            {sinPermiso ? (
              <Alert className="bg-amber-50 text-amber-900 border-amber-200">
                <AlertDescription className="space-y-2">
                  <p>
                    La cuenta <strong>{user?.email}</strong> no tiene permisos de administración.
                  </p>
                  <p className="text-xs">
                    Pídele a quien administra el sitio que ejecute{' '}
                    <code className="font-mono">npm run admin -- grant {user?.email}</code> y vuelve a entrar.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => logOut()} disabled={ocupado}>
                    Cerrar sesión
                  </Button>
                </AlertDescription>
              </Alert>
            ) : null}

            {error ? (
              <Alert className="bg-red-100 text-red-800">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            {resetSuccess ? (
              <Alert className="bg-green-100 text-green-800">
                <AlertDescription>
                  Se ha enviado un correo para restablecer tu contraseña. Revisa tu bandeja de entrada.
                </AlertDescription>
              </Alert>
            ) : null}

            {showResetForm ? (
              <form onSubmit={handleResetPassword} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={ocupado} className="w-full">
                  {ocupado ? 'Procesando...' : 'Restablecer contraseña'}
                </Button>
              </form>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogle}
                  disabled={ocupado || Boolean(sinPermiso)}
                  className="w-full gap-2"
                >
                  <IconoGoogle />
                  Continuar con Google
                </Button>

                <div className="relative text-center text-xs text-gray-400">
                  <span className="bg-white px-2 relative z-10">o con correo y contraseña</span>
                  <span className="absolute left-0 right-0 top-1/2 border-t border-gray-200" aria-hidden="true" />
                </div>

                <form onSubmit={handleLogin} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={ocupado || Boolean(sinPermiso)} className="w-full">
                    {ocupado ? 'Iniciando sesión...' : 'Iniciar sesión'}
                  </Button>
                </form>
              </>
            )}
          </CardContent>

          <CardFooter>
            <Button variant="link" className="w-full text-sm" onClick={toggleResetForm}>
              {showResetForm ? 'Volver al inicio de sesión' : '¿Olvidaste tu contraseña?'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
