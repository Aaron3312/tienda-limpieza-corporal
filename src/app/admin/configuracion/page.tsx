'use client';

import { useState, useEffect } from 'react';
import { getInformacionNegocio, actualizarInformacionNegocio } from '@/services/firestore';
import { InformacionNegocio, Valor } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Save, RefreshCw, Plus, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export default function ConfiguracionPage() {
  const [formData, setFormData] = useState<InformacionNegocio>({
    nombre: '',
    eslogan: '',
    descripcion: '',
    vision: '',
    mision: '',
    valores: [],
    contacto: {
      telefono: '',
      email: '',
      redesSociales: {
        facebook: '',
        instagram: ''
      },
      horarios: {
        lunesViernes: '',
        sabados: '',
        domingos: ''
      }
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [nuevoValor, setNuevoValor] = useState({ valor: '', cita: '' });
  
  // Cargar información actual
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true);
        const info = await getInformacionNegocio();
        
        if (info) {
          setFormData(info);
        }
      } catch (err: any) {
        console.error('Error al cargar información:', err);
        setError('Error al cargar la información. Por favor, intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchInfo();
  }, []);
  
  // Manejar cambios en los inputs simples
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Manejar campos anidados
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof InformacionNegocio],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // Manejar cambios en contacto (objeto anidado)
  const handleContactoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Manejar campos con doble anidación: contacto.redesSociales.facebook
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        contacto: {
          ...prev.contacto,
          [parent]: {
            ...prev.contacto[parent as keyof typeof prev.contacto],
            [child]: value
          }
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        contacto: {
          ...prev.contacto,
          [name]: value
        }
      }));
    }
  };
  
  // Manejar valores
  const handleValorChange = (index: number, field: keyof Valor, value: string) => {
    const updatedValores = [...formData.valores];
    updatedValores[index][field] = value;
    
    setFormData(prev => ({
      ...prev,
      valores: updatedValores
    }));
  };
  
  const handleAddValor = () => {
    if (!nuevoValor.valor.trim() || !nuevoValor.cita.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      valores: [...prev.valores, { ...nuevoValor }]
    }));
    
    setNuevoValor({ valor: '', cita: '' });
  };
  
  const handleRemoveValor = (index: number) => {
    const updatedValores = [...formData.valores];
    updatedValores.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      valores: updatedValores
    }));
  };
  
  // Guardar cambios
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      
      await actualizarInformacionNegocio(formData);
      setSuccess('Información actualizada correctamente.');
    } catch (err: any) {
      console.error('Error al guardar información:', err);
      setError('Error al guardar la información: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Información del Negocio</h2>
          <p className="text-muted-foreground">
            Actualiza la información general de la tienda.
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
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="valores">Valores</TabsTrigger>
            <TabsTrigger value="contacto">Contacto</TabsTrigger>
            <TabsTrigger value="redes">Redes Sociales</TabsTrigger>
          </TabsList>
          
          {/* Pestaña de Información General */}
          <TabsContent value="general" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Información General</CardTitle>
                <CardDescription>
                  Detalles básicos sobre tu negocio.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre de la Tienda</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Ej. Solo Para Eva"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="eslogan">Eslogan</Label>
                    <Input
                      id="eslogan"
                      name="eslogan"
                      value={formData.eslogan}
                      onChange={handleInputChange}
                      placeholder="Ej. Productos naturales para el cuidado de tu piel"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="descripcion">Descripción</Label>
                    <Textarea
                      id="descripcion"
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      placeholder="Describe tu negocio..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="vision">Visión</Label>
                    <Textarea
                      id="vision"
                      name="vision"
                      value={formData.vision}
                      onChange={handleInputChange}
                      placeholder="Visión de tu negocio..."
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mision">Misión</Label>
                    <Textarea
                      id="mision"
                      name="mision"
                      value={formData.mision}
                      onChange={handleInputChange}
                      placeholder="Misión de tu negocio..."
                      rows={2}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Pestaña de Valores */}
          <TabsContent value="valores" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Valores del Negocio</CardTitle>
                <CardDescription>
                  Define los valores que representan tu empresa.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Valor</TableHead>
                      <TableHead>Cita o Descripción</TableHead>
                      <TableHead className="w-[100px]">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.valores.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                          No hay valores agregados.
                        </TableCell>
                      </TableRow>
                    ) : (
                      formData.valores.map((valor, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input
                              value={valor.valor}
                              onChange={(e) => handleValorChange(index, 'valor', e.target.value)}
                              placeholder="Ej. Respeto"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={valor.cita}
                              onChange={(e) => handleValorChange(index, 'cita', e.target.value)}
                              placeholder="Ej. Tratar a todos con dignidad"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveValor(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="nuevo-valor">Nuevo Valor</Label>
                    <Input
                      id="nuevo-valor"
                      value={nuevoValor.valor}
                      onChange={(e) => setNuevoValor({ ...nuevoValor, valor: e.target.value })}
                      placeholder="Ej. Honestidad"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nueva-cita">Cita o Descripción</Label>
                    <Input
                      id="nueva-cita"
                      value={nuevoValor.cita}
                      onChange={(e) => setNuevoValor({ ...nuevoValor, cita: e.target.value })}
                      placeholder="Ej. Siempre decir la verdad"
                    />
                  </div>
                </div>
                
                <Button
                  type="button"
                  onClick={handleAddValor}
                  disabled={!nuevoValor.valor.trim() || !nuevoValor.cita.trim()}
                  className="mt-2"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Añadir Valor
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Pestaña de Contacto */}
          <TabsContent value="contacto" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
                <CardDescription>
                  Detalles de contacto para tus clientes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      value={formData.contacto.telefono}
                      onChange={handleContactoChange}
                      placeholder="Ej. +52 55 1234 5678"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.contacto.email}
                      onChange={handleContactoChange}
                      placeholder="Ej. contacto@soloparaeva.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2 mt-4">
                  <h3 className="text-lg font-medium">Horarios de Atención</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lunesViernes">Lunes a Viernes</Label>
                      <Input
                        id="lunesViernes"
                        name="horarios.lunesViernes"
                        value={formData.contacto.horarios.lunesViernes}
                        onChange={handleContactoChange}
                        placeholder="Ej. 9:00 AM - 6:00 PM"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sabados">Sábados</Label>
                      <Input
                        id="sabados"
                        name="horarios.sabados"
                        value={formData.contacto.horarios.sabados}
                        onChange={handleContactoChange}
                        placeholder="Ej. 10:00 AM - 2:00 PM"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="domingos">Domingos</Label>
                      <Input
                        id="domingos"
                        name="horarios.domingos"
                        value={formData.contacto.horarios.domingos}
                        onChange={handleContactoChange}
                        placeholder="Ej. Cerrado"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Pestaña de Redes Sociales */}
          <TabsContent value="redes" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Redes Sociales</CardTitle>
                <CardDescription>
                  Enlaces a tus perfiles en redes sociales.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      name="redesSociales.facebook"
                      value={formData.contacto.redesSociales.facebook}
                      onChange={handleContactoChange}
                      placeholder="Ej. https://www.facebook.com/soloparaeva"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      name="redesSociales.instagram"
                      value={formData.contacto.redesSociales.instagram}
                      onChange={handleContactoChange}
                      placeholder="Ej. https://www.instagram.com/soloparaeva"
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-gray-100 rounded-md mt-4">
                  <h3 className="text-sm font-medium mb-2">Consejos para redes sociales:</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-gray-600">
                    <li>Asegúrate de incluir la URL completa (con https://).</li>
                    <li>Verifica que los enlaces funcionen correctamente.</li>
                    <li>Mantén tus perfiles sociales actualizados con el mismo branding que tu sitio web.</li>
                    <li>Incluye enlaces a tu sitio web en tus perfiles de redes sociales.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}