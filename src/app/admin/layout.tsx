'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Home,
  Package,
  Tag,
  Settings,
  Users,
  LogOut,
  Menu,
  X,
  ChevronDown,
  PanelRight,
  Palette,
  ShoppingBag
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading, logOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  // Redirigir si no hay usuario autenticado
  useEffect(() => {
    if (!loading && !user && !pathname?.includes('/admin/login')) {
      router.push('/admin/login');
    }
  }, [user, loading, router, pathname]);

  const handleLogout = async () => {
    await logOut();
    router.push('/admin/login');
  };

  // Mientras Firebase resuelve la sesión, mostrar spinner
  if (loading && !pathname?.includes('/admin/login')) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Una vez resuelto, si no hay usuario redirigir (el useEffect lo maneja)
  if (!loading && !user && !pathname?.includes('/admin/login')) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Si estamos en la página de login, solo mostrar el contenido
  if (pathname?.includes('/admin/login')) {
    return <>{children}</>;
  }

  // Menú de navegación
  const navigationItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
    { name: 'Productos', href: '/admin/productos', icon: Package },
    // { name: 'Categorías', href: '/admin/categorias', icon: Tag },
    // { name: 'Tienda', href: '/admin/tienda', icon: ShoppingBag },
    { name: 'Colores', href: '/admin/colores', icon: Palette },
    { name: 'Configuración', href: '/admin/configuracion', icon: Settings },
    ...(process.env.NODE_ENV === 'development' ? [{ name: 'Importar datos', href: '/admin/import', icon: PanelRight }] : []),
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar para móvil */}
      <div className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? 'visible' : 'invisible'}`}>
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`} 
             onClick={() => setSidebarOpen(false)}
        />
        
        <div className={`relative flex w-full max-w-xs flex-1 flex-col bg-white transition-all duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="flex-1 h-0 overflow-y-auto">
            <div className="flex flex-shrink-0 items-center px-4 py-4 bg-primary">
              <h2 className="text-xl font-semibold text-white">
                SoloPara<span className="font-bold">Eva</span> Admin
              </h2>
            </div>
            <nav className="mt-5 space-y-1 px-2">
              {navigationItems.map((item) => {
                const isActive = pathname?.includes(item.href);
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className={`mr-4 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Sidebar para desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow bg-white overflow-y-auto">
          <div className="flex flex-shrink-0 items-center px-4 py-4 bg-primary">
            <h2 className="text-xl font-semibold text-white">
              SoloPara<span className="font-bold">Eva</span> Admin
            </h2>
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigationItems.map((item) => {
                const isActive = pathname?.includes(item.href);
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      <div className="md:pl-64 flex flex-col flex-1 min-w-0">
        {/* Encabezado combinado (hamburger + título + cuenta) */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white shadow-sm px-3 py-3 md:px-6 md:py-4 gap-2">
          {/* Hamburger solo en mobile */}
          <button
            type="button"
            className="md:hidden h-9 w-9 flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 shrink-0"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Abrir sidebar</span>
            <Menu className="h-5 w-5" />
          </button>

          <h1 className="text-base sm:text-xl font-semibold text-gray-900 truncate flex-1">
            {navigationItems.find(item => pathname?.includes(item.href))?.name || 'Dashboard'}
          </h1>

          <div className="flex items-center shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1 text-xs sm:text-sm">
                  <span className="hidden sm:inline">Mi Cuenta</span>
                  <span className="sm:hidden">●</span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {user?.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="cursor-pointer w-full">
                    Ver sitio web
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Contenido principal */}
        <main className="flex-1 p-4 md:p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}