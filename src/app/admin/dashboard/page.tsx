'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProductos, getCategorias } from '@/services/firestore';
import { getImageSrc } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Tag, ShoppingBag, TrendingUp, Archive, Eye } from 'lucide-react';
import { Producto, Categoria } from '@/types';

export default function Dashboard() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos al iniciar
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productosData, categoriasData] = await Promise.all([
          getProductos(),
          getCategorias()
        ]);
        
        setProductos(productosData);
        setCategorias(categoriasData);
      } catch (err: any) {
        console.error('Error al cargar datos:', err);
        setError('Error al cargar datos. Por favor, intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Contar productos destacados
  const productosDestacados = productos.filter(producto => producto.destacado).length;
  
  // Obtener productos recientes (últimos 5)
  const productosRecientes = [...productos]
    .sort((a, b) => {
      // En un entorno real, ordenaríamos por fecha de creación
      // Aquí solo usamos el orden del array como ejemplo
      return 0;
    })
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Bienvenido al panel de administración de Solo Para Eva.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button asChild>
            <Link href="/admin/productos/nuevo">
              <Package className="mr-2 h-4 w-4" />
              Nuevo Producto
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/" target="_blank">
              <Eye className="mr-2 h-4 w-4" />
              Ver sitio
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Mostrar error si existe */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {/* Estado de carga */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Tarjetas de estadísticas */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Productos
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{productos.length}</div>
                <p className="text-xs text-muted-foreground">
                  Productos activos en el catálogo
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Categorías
                </CardTitle>
                <Tag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{categorias.length}</div>
                <p className="text-xs text-muted-foreground">
                  Categorías de productos
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Productos Destacados
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{productosDestacados}</div>
                <p className="text-xs text-muted-foreground">
                  Productos mostrados en la página principal
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Productos recientes */}
          <div className="grid gap-4 grid-cols-1">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Productos Recientes</CardTitle>
                <CardDescription>
                  Últimos productos en el catálogo
                </CardDescription>
              </CardHeader>
              <CardContent>
                {productosRecientes.length > 0 ? (
                  <div className="space-y-4">
                    {productosRecientes.map((producto) => (
                      <div key={producto.id} className="flex items-center">
                        <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 overflow-hidden">
                          {producto.imagen ? (
                            <img 
                              src={getImageSrc(producto.imagen)}
                              alt={producto.nombre}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Package className="h-6 w-6 text-gray-500" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {producto.nombre}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {categorias.find(cat => cat.id === producto.categoria)?.nombre || producto.categoria}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <Link href={`/admin/productos/editar?id=${producto.id}`}>
                            <Button variant="ghost" size="sm">
                              Editar
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-4 text-muted-foreground">
                    No hay productos en el catálogo.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Enlaces rápidos */}
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
            {[
              { title: 'Productos', desc: 'Administra tu catálogo', links: [
                { href: '/admin/productos', label: 'Ver todos', icon: Package, variant: 'outline' as const },
                { href: '/admin/productos/nuevo', label: 'Nuevo', icon: Archive, variant: 'default' as const },
              ]},
              { title: 'Colores', desc: 'Personaliza la paleta', links: [
                { href: '/admin/colores', label: 'Editar colores', icon: Tag, variant: 'default' as const },
              ]},
              { title: 'Configuración', desc: 'Info. del negocio', links: [
                { href: '/admin/configuracion', label: 'Editar info', icon: Archive, variant: 'default' as const },
              ]},
            ].map(({ title, desc, links }) => (
              <Card key={title}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{title}</CardTitle>
                  <CardDescription className="text-xs">{desc}</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2 flex-wrap">
                  {links.map(({ href, label, icon: Icon, variant }) => (
                    <Button key={href} asChild variant={variant} size="sm">
                      <Link href={href}>
                        <Icon className="mr-1.5 h-3.5 w-3.5" />
                        {label}
                      </Link>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}