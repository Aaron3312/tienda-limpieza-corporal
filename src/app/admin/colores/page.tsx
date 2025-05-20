'use client';

import { useState, useEffect } from 'react';
import { getColores, actualizarColores } from '@/services/firestore';
import { Colores } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Save, RefreshCw } from 'lucide-react';

export default function ColoresPage() {
  const [formData, setFormData] = useState<Colores>({
    primario: '#aad585',
    secundario: '#68dad6',
    acento1: '#f2bae0',
    acento2: '#cba3d7',
    textoOscuro: '#333333',
    textoClaro: '#ffffff',
    fondo: '#f8f9fa'
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Cargar colores actuales
  useEffect(() => {
    const fetchColores = async () => {
      try {
        setLoading(true);
        const colores = await getColores();
        
        if (colores) {
          setFormData(colores);
        }
      } catch (err: any) {
        console.error('Error al cargar colores:', err);
        setError('Error al cargar los colores. Por favor, intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchColores();
  }, []);
  
  // Manejar cambios en los inputs
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Guardar cambios
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      
      await actualizarColores(formData);
      setSuccess('Colores actualizados correctamente.');
    } catch (err: any) {
      console.error('Error al guardar colores:', err);
      setError('Error al guardar los colores: ' + err.message);
    } finally {
      setSaving(false);
    }
  };
  
  // Vista previa con los colores actuales
  const ColorPreview = ({ color, name }: { color: string; name: string }) => (
    <div className="flex items-center space-x-2">
      <div 
        className="w-6 h-6 rounded-full border border-gray-300" 
        style={{ backgroundColor: color }}
      ></div>
      <span className="text-sm">{name}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Configuración de Colores</h2>
          <p className="text-muted-foreground">
            Personaliza la paleta de colores de tu sitio web.
          </p>
        </div>
        
        <Button onClick={handleSubmit} disabled={saving}>
          {saving ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Guardar Cambios
            </>
          )}
        </Button>
      </div>
      
      {/* Mostrar error o éxito */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{success}</span>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Formulario de colores */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Colores Principales</CardTitle>
                <CardDescription>
                  Colores base para la identidad visual de tu marca.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primario" className="flex items-center justify-between">
                      Color Primario
                      <ColorPreview color={formData.primario} name="" />
                    </Label>
                    <div className="flex">
                      <Input
                        id="primario"
                        name="primario"
                        type="color"
                        value={formData.primario}
                        onChange={handleColorChange}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={formData.primario}
                        onChange={handleColorChange}
                        name="primario"
                        className="ml-2 flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secundario" className="flex items-center justify-between">
                      Color Secundario
                      <ColorPreview color={formData.secundario} name="" />
                    </Label>
                    <div className="flex">
                      <Input
                        id="secundario"
                        name="secundario"
                        type="color"
                        value={formData.secundario}
                        onChange={handleColorChange}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={formData.secundario}
                        onChange={handleColorChange}
                        name="secundario"
                        className="ml-2 flex-1"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Colores de Acento</CardTitle>
                <CardDescription>
                  Colores adicionales para llamadas a la acción y destacados.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="acento1" className="flex items-center justify-between">
                      Acento 1
                      <ColorPreview color={formData.acento1} name="" />
                    </Label>
                    <div className="flex">
                      <Input
                        id="acento1"
                        name="acento1"
                        type="color"
                        value={formData.acento1}
                        onChange={handleColorChange}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={formData.acento1}
                        onChange={handleColorChange}
                        name="acento1"
                        className="ml-2 flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="acento2" className="flex items-center justify-between">
                      Acento 2
                      <ColorPreview color={formData.acento2} name="" />
                    </Label>
                    <div className="flex">
                      <Input
                        id="acento2"
                        name="acento2"
                        type="color"
                        value={formData.acento2}
                        onChange={handleColorChange}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={formData.acento2}
                        onChange={handleColorChange}
                        name="acento2"
                        className="ml-2 flex-1"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Colores de Texto y Fondo</CardTitle>
                <CardDescription>
                  Colores para el texto y fondos del sitio.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="textoOscuro" className="flex items-center justify-between">
                      Texto Oscuro
                      <ColorPreview color={formData.textoOscuro} name="" />
                    </Label>
                    <div className="flex">
                      <Input
                        id="textoOscuro"
                        name="textoOscuro"
                        type="color"
                        value={formData.textoOscuro}
                        onChange={handleColorChange}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={formData.textoOscuro}
                        onChange={handleColorChange}
                        name="textoOscuro"
                        className="ml-2 flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="textoClaro" className="flex items-center justify-between">
                      Texto Claro
                      <ColorPreview color={formData.textoClaro} name="" />
                    </Label>
                    <div className="flex">
                      <Input
                        id="textoClaro"
                        name="textoClaro"
                        type="color"
                        value={formData.textoClaro}
                        onChange={handleColorChange}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={formData.textoClaro}
                        onChange={handleColorChange}
                        name="textoClaro"
                        className="ml-2 flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fondo" className="flex items-center justify-between">
                      Fondo
                      <ColorPreview color={formData.fondo} name="" />
                    </Label>
                    <div className="flex">
                      <Input
                        id="fondo"
                        name="fondo"
                        type="color"
                        value={formData.fondo}
                        onChange={handleColorChange}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={formData.fondo}
                        onChange={handleColorChange}
                        name="fondo"
                        className="ml-2 flex-1"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Vista previa */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vista Previa</CardTitle>
                <CardDescription>
                  Visualización de cómo se verán los colores en tu sitio.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="p-6 rounded-lg"
                  style={{ backgroundColor: formData.fondo }}
                >
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ color: formData.textoOscuro }}
                  >
                    Ejemplo de Título
                  </h3>
                  <p
                    className="mb-4"
                    style={{ color: formData.textoOscuro }}
                  >
                    Este es un ejemplo de párrafo para mostrar cómo se verá el texto en tu sitio.
                  </p>
                  
                  <div className="flex space-x-2 mb-4">
                    <button
                      className="px-4 py-2 rounded-md text-sm font-medium"
                      style={{ backgroundColor: formData.primario, color: formData.textoClaro }}
                    >
                      Botón Primario
                    </button>
                    <button
                      className="px-4 py-2 rounded-md text-sm font-medium"
                      style={{ backgroundColor: formData.secundario, color: formData.textoClaro }}
                    >
                      Botón Secundario
                    </button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      className="px-4 py-2 rounded-md text-sm font-medium"
                      style={{ backgroundColor: formData.acento1, color: formData.textoClaro }}
                    >
                      Acento 1
                    </button>
                    <button
                      className="px-4 py-2 rounded-md text-sm font-medium"
                      style={{ backgroundColor: formData.acento2, color: formData.textoClaro }}
                    >
                      Acento 2
                    </button>
                  </div>
                  
                  <div 
                    className="mt-4 p-4 rounded-md"
                    style={{ backgroundColor: formData.primario, opacity: 0.1 }}
                  >
                    <p
                      style={{ color: formData.textoOscuro }}
                    >
                      Sección con el color primario como fondo (con opacidad).
                    </p>
                  </div>
                  
                  <div 
                    className="mt-4 p-4 rounded-md"
                    style={{ backgroundColor: formData.secundario, opacity: 0.1 }}
                  >
                    <p
                      style={{ color: formData.textoOscuro }}
                    >
                      Sección con el color secundario como fondo (con opacidad).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Elementos de la Tienda</CardTitle>
                <CardDescription>
                  Cómo se verán los elementos en la tienda.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="p-6 rounded-lg"
                  style={{ backgroundColor: formData.fondo }}
                >
                  <div className="border rounded-lg shadow-sm overflow-hidden">
                    <div
                      className="h-24 bg-gray-200"
                      style={{ backgroundColor: formData.secundario, opacity: 0.3 }}
                    ></div>
                    <div className="p-4">
                      <h4
                        className="font-medium"
                        style={{ color: formData.textoOscuro }}
                      >
                        Producto de Ejemplo
                      </h4>
                      <p
                        className="text-sm mt-1"
                        style={{ color: formData.textoOscuro, opacity: 0.8 }}
                      >
                        Descripción corta del producto
                      </p>
                      <div className="mt-2 flex justify-between items-center">
                        <span
                          className="font-bold"
                          style={{ color: formData.textoOscuro }}
                        >
                          $120.00
                        </span>
                        <button
                          className="px-3 py-1 rounded-md text-xs font-medium"
                          style={{ backgroundColor: formData.acento1, color: formData.textoClaro }}
                        >
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button
                      className="w-full py-2 rounded-md font-medium"
                      style={{ backgroundColor: formData.primario, color: formData.textoClaro }}
                    >
                      Ver todos los productos
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}