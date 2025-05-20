'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { firestore } from '@/lib/firebase';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import catalogoData from '@/data/productos.json';
import paletaColores from '@/data/paleta-colores.json';

export default function ImportData() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);

  const importarDatos = async () => {
    setLoading(true);
    setStatus(null);
    
    try {
      const batch = writeBatch(firestore);
      
      // Importar categorías
      const categorias = catalogoData.categorias || [];
      const totalCategorias = categorias.length;
      
      for (let i = 0; i < totalCategorias; i++) {
        const categoria = categorias[i];
        const categoriaRef = doc(firestore, 'categorias', categoria.id);
        batch.set(categoriaRef, {
          nombre: categoria.nombre,
          descripcion: categoria.descripcion
        });
        
        setProgress({ current: i + 1, total: totalCategorias });
      }
      
      // Guardar el lote de categorías
      await batch.commit();
      setStatus({ success: true, message: 'Categorías importadas correctamente' });
      
      // Importar productos (en lotes para no exceder el límite de Firestore)
      const productos = catalogoData.productos || [];
      const totalProductos = productos.length;
      const tamanoLote = 500; // Firestore permite hasta 500 operaciones por lote
      
      for (let i = 0; i < totalProductos; i += tamanoLote) {
        const nuevoBatch = writeBatch(firestore);
        const loteActual = productos.slice(i, i + tamanoLote);
        
        for (let j = 0; j < loteActual.length; j++) {
          const producto = loteActual[j];
          const productoRef = doc(firestore, 'productos', producto.id);
          nuevoBatch.set(productoRef, {
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            categoria: producto.categoria,
            variantes: producto.variantes,
            variedades: producto.variedades || [],
            imagen: producto.imagen,
            destacado: producto.destacado
          });
          
          setProgress({ current: i + j + 1, total: totalProductos });
        }
        
        await nuevoBatch.commit();
      }
      
      setStatus({ success: true, message: 'Productos importados correctamente' });
      
      // Importar colores
      const coloresRef = doc(firestore, 'configuracion', 'colores');
      await setDoc(coloresRef, paletaColores);
      
      // Importar información del negocio
      const infoNegocioRef = doc(firestore, 'configuracion', 'informacionNegocio');
      await setDoc(infoNegocioRef, catalogoData.informacionNegocio);
      
      setStatus({ success: true, message: 'Todos los datos se han importado correctamente a Firestore' });
    } catch (error: any) {
      console.error('Error al importar datos:', error);
      setStatus({ success: false, message: `Error al importar datos: ${error.message}` });
    } finally {
      setLoading(false);
      setProgress(null);
    }
  };

  return (
    <div className="mx-auto max-w-xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Importar Datos a Firestore</CardTitle>
          <CardDescription>
            Esta herramienta importará todos los datos de los archivos JSON locales a Firestore.
            Úsala solo una vez para inicializar la base de datos.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {status && (
            <Alert className={status.success ? "bg-green-100" : "bg-red-100"}>
              <AlertDescription>{status.message}</AlertDescription>
            </Alert>
          )}
          
          {progress && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Importando {progress.current} de {progress.total}
              </p>
            </div>
          )}
        </CardContent>
        
        <CardFooter>
          <Button 
            onClick={importarDatos} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Importando...' : 'Iniciar Importación'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}