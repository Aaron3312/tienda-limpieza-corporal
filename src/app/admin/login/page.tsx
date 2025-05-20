'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  
  const router = useRouter();
  const { login, resetUserPassword, error, loading, clearError } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      router.push('/admin/dashboard');
    } catch (err) {
      // El error ya se maneja en el contexto de autenticación
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await resetUserPassword(resetEmail);
      setResetSuccess(true);
    } catch (err) {
      // El error ya se maneja en el contexto de autenticación
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
            <CardTitle className="text-2xl font-bold text-center">
              Solo Para Eva - Admin
            </CardTitle>
            <CardDescription className="text-center">
              {showResetForm 
                ? 'Ingresa tu email para restablecer tu contraseña' 
                : 'Inicia sesión para acceder al panel de administración'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="grid gap-4">
            {error && (
              <Alert className="bg-red-100 text-red-800">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {resetSuccess && (
              <Alert className="bg-green-100 text-green-800">
                <AlertDescription>
                  Se ha enviado un correo para restablecer tu contraseña. Revisa tu bandeja de entrada.
                </AlertDescription>
              </Alert>
            )}
            
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
                
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Procesando...' : 'Restablecer Contraseña'}
                </Button>
              </form>
            ) : (
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Contraseña</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </form>
            )}
          </CardContent>
          
          <CardFooter>
            <Button
              variant="link"
              className="w-full text-sm"
              onClick={toggleResetForm}
            >
              {showResetForm ? 'Volver al inicio de sesión' : '¿Olvidaste tu contraseña?'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}