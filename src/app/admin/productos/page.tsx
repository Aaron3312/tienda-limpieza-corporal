'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProductos, getCategorias, eliminarProducto } from '@/services/firestore';
import { getImageSrc } from '@/lib/utils';
import { Producto, Categoria } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Package, Plus, Pencil, Trash2, Search, Star, ChevronDown, ChevronUp,
} from 'lucide-react';

export default function ProductosPage() {
  const [productos, setProductos]     = useState<Producto[]>([]);
  const [categorias, setCategorias]   = useState<Categoria[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [searchTerm, setSearchTerm]   = useState('');
  const [filterCat, setFilterCat]     = useState('todos');
  const [sortField, setSortField]     = useState<'nombre' | 'categoria'>('nombre');
  const [sortDir, setSortDir]         = useState<'asc' | 'desc'>('asc');
  const [deleteId, setDeleteId]       = useState<string | null>(null);
  const [deleting, setDeleting]       = useState(false);

  useEffect(() => {
    Promise.all([getProductos(), getCategorias()]).then(([p, c]) => {
      setProductos(p);
      setCategorias(c);
      setLoading(false);
    }).catch(() => {
      setError('Error al cargar datos.');
      setLoading(false);
    });
  }, []);

  const catMap: Record<string, string> = {};
  categorias.forEach(c => { catMap[c.id] = c.nombre; });

  const filtered = productos
    .filter(p => {
      const q = searchTerm.toLowerCase();
      const matchSearch = !q ||
        p.nombre.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q) ||
        (catMap[p.categoria] || '').toLowerCase().includes(q);
      const matchCat = filterCat === 'todos' || p.categoria === filterCat;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      const va = sortField === 'nombre' ? a.nombre : (catMap[a.categoria] || '');
      const vb = sortField === 'nombre' ? b.nombre : (catMap[b.categoria] || '');
      return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    });

  const toggleSort = (field: 'nombre' | 'categoria') => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const formatPrecio = (variantes: Producto['variantes']) => {
    if (!variantes?.length) return '—';
    const prices = variantes.map(v => v.precio).filter(Boolean);
    if (!prices.length) return '—';
    const min = Math.min(...prices), max = Math.max(...prices);
    return min === max ? `$${min.toFixed(0)}` : `$${min.toFixed(0)}–$${max.toFixed(0)}`;
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const ok = await eliminarProducto(deleteId);
    if (ok) setProductos(prev => prev.filter(p => p.id !== deleteId));
    else setError('No se pudo eliminar el producto.');
    setDeleteId(null);
    setDeleting(false);
  };

  const SortIcon = ({ field }: { field: 'nombre' | 'categoria' }) =>
    sortField === field
      ? sortDir === 'asc' ? <ChevronUp className="h-3 w-3 ml-1 inline" /> : <ChevronDown className="h-3 w-3 ml-1 inline" />
      : null;

  return (
    <div className="space-y-4 pb-10">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Productos</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {loading ? '…' : `${productos.length} producto${productos.length !== 1 ? 's' : ''} en total`}
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/admin/productos/nuevo">
            <Plus className="mr-1.5 h-4 w-4" />
            Nuevo producto
          </Link>
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* ── Filtros ── */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={filterCat}
          onChange={e => setFilterCat(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="todos">Todas las categorías</option>
          {categorias.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Package className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">Sin resultados</p>
          {(searchTerm || filterCat !== 'todos') && (
            <button className="text-sm underline mt-1" onClick={() => { setSearchTerm(''); setFilterCat('todos'); }}>
              Limpiar filtros
            </button>
          )}
        </div>
      ) : (
        <>
          {/* ── Desktop table ── */}
          <div className="hidden md:block rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="w-16 px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Img</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer select-none hover:text-gray-800"
                    onClick={() => toggleSort('nombre')}>
                    Nombre <SortIcon field="nombre" />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer select-none hover:text-gray-800"
                    onClick={() => toggleSort('categoria')}>
                    Categoría <SortIcon field="categoria" />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Precio</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Dest.</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y bg-white">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="h-11 w-11 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                        {p.imagen
                          ? <img src={getImageSrc(p.imagen)} alt={p.nombre} className="h-full w-full object-cover" />
                          : <Package className="h-5 w-5 text-gray-400" />}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 leading-tight">{p.nombre}</p>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{p.descripcion}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {catMap[p.categoria] || p.categoria}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 font-medium">{formatPrecio(p.variantes)}</td>
                    <td className="px-4 py-3 text-center">
                      {p.destacado && <Star className="h-4 w-4 text-amber-400 fill-amber-400 mx-auto" />}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button asChild variant="ghost" size="sm" className="h-8 px-2">
                          <Link href={`/admin/productos/editar?id=${p.id}`}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost" size="sm"
                          className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => setDeleteId(p.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Mobile cards ── */}
          <div className="md:hidden space-y-3">
            {filtered.map(p => (
              <div key={p.id} className="bg-white rounded-xl border shadow-sm p-3 flex gap-3">
                <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
                  {p.imagen
                    ? <img src={getImageSrc(p.imagen)} alt={p.nombre} className="h-full w-full object-cover" />
                    : <Package className="h-6 w-6 text-gray-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm leading-tight line-clamp-2">{p.nombre}</p>
                    {p.destacado && <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 shrink-0 mt-0.5" />}
                  </div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800 font-medium">
                      {catMap[p.categoria] || p.categoria}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">{formatPrecio(p.variantes)}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button asChild variant="outline" size="sm" className="h-7 text-xs flex-1">
                      <Link href={`/admin/productos/editar?id=${p.id}`}>
                        <Pencil className="h-3 w-3 mr-1" /> Editar
                      </Link>
                    </Button>
                    <Button
                      variant="outline" size="sm"
                      className="h-7 text-xs text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => setDeleteId(p.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-right">
            {filtered.length} de {productos.length} productos
          </p>
        </>
      )}

      {/* ── Confirm delete ── */}
      <AlertDialog open={!!deleteId} onOpenChange={open => { if (!open) setDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El producto se eliminará permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {deleting ? 'Eliminando…' : 'Eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
