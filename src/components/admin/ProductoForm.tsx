'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Producto, Categoria, Variante } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { Package, Plus, Trash2, Save, ArrowLeft, Image, Upload } from 'lucide-react';
import Link from 'next/link';

// Importaciones de Firebase
import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Inicialización de Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Inicializar Firebase solo si no está ya inicializado
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const firestore = getFirestore(app);
const storage = getStorage(app);

// Funciones de servicio de Firestore (incrustadas en el componente)
const getProducto = async (id: string): Promise<Producto | null> => {
  try {
    const productoRef = doc(firestore, 'productos', id);
    const snapshot = await getDoc(productoRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    return {
      id: snapshot.id,
      ...snapshot.data()
    } as Producto;
  } catch (error) {
    console.error(`Error al obtener producto ${id}:`, error);
    return null;
  }
};

const getCategorias = async (): Promise<Categoria[]> => {
  try {
    const categoriasCollection = collection(firestore, 'categorias');
    const snapshot = await getDocs(categoriasCollection);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Categoria));
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
};

const crearProducto = async (producto: Omit<Producto, 'id'>): Promise<string | null> => {
  try {
    const productosCollection = collection(firestore, 'productos');
    const docRef = await addDoc(productosCollection, {
      ...producto,
      timestamp: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error al crear producto:", error);
    return null;
  }
};

const actualizarProducto = async (id: string, producto: Partial<Producto>): Promise<boolean> => {
  try {
    const productoRef = doc(firestore, 'productos', id);
    await updateDoc(productoRef, {
      ...producto,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error(`Error al actualizar producto ${id}:`, error);
    return false;
  }
};

interface ProductoFormProps {
  productoId?: string;
  isEditing?: boolean;
}

export default function ProductoForm({ productoId, isEditing = false }: ProductoFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Categorías
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  
  // Estado del formulario
  const [formData, setFormData] = useState<{
    nombre: string;
    descripcion: string;
    categoria: string;
    variantes: Variante[];
    variedades: string[];
    imagen: string;
    destacado: boolean;
    nuevaVariedad: string;
  }>({
    nombre: '',
    descripcion: '',
    categoria: '',
    variantes: [{ id: '', nombre: '', precio: 0, tamano: '' }],
    variedades: [],
    imagen: '',
    destacado: false,
    nuevaVariedad: '',
  });
  
  // Imagen para previsualización
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);
  
  // Cargar categorías y producto si es edición
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        
        // Cargar categorías
        const categoriasData = await getCategorias();
        setCategorias(categoriasData);
        
        // Si es edición, cargar el producto
        if (isEditing && productoId) {
          const producto = await getProducto(productoId);
          
          if (producto) {
            setFormData({
              nombre: producto.nombre,
              descripcion: producto.descripcion,
              categoria: producto.categoria,
              variantes: producto.variantes,
              variedades: producto.variedades || [],
              imagen: producto.imagen,
              destacado: producto.destacado,
              nuevaVariedad: '',
            });
            
            if (producto.imagen) {
              setImagenPreview(producto.imagen);
            }
          } else {
            setError('No se encontró el producto solicitado.');
            router.push('/admin/productos');
          }
        }
      } catch (err: any) {
        console.error('Error al cargar datos:', err);
        setError('Error al cargar datos. Por favor, intenta nuevamente.');
      } finally {
        setLoadingData(false);
      }
    };
    
    fetchData();
  }, [isEditing, productoId, router]);
  
  // Manejadores de cambios en el formulario
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  // Manejar cambios en variantes
  const handleVarianteChange = (index: number, field: keyof Variante, value: string | number) => {
    const updatedVariantes = [...formData.variantes];
    
    if (field === 'precio') {
      // Convertir a número para el precio
      updatedVariantes[index][field] = Number(value);
    } else {
      // Mantener como string para otros campos
      updatedVariantes[index][field] = value as string;
    }
    
    setFormData(prev => ({ ...prev, variantes: updatedVariantes }));
  };
  
  // Añadir nueva variante
  const handleAddVariante = () => {
    const newId = `${formData.nombre.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    
    setFormData(prev => ({
      ...prev,
      variantes: [
        ...prev.variantes,
        { id: newId, nombre: '', precio: 0, tamano: '' }
      ]
    }));
  };
  
  // Eliminar variante
  const handleRemoveVariante = (index: number) => {
    const updatedVariantes = [...formData.variantes];
    updatedVariantes.splice(index, 1);
    
    // Asegurar que siempre haya al menos una variante
    if (updatedVariantes.length === 0) {
      updatedVariantes.push({ id: '', nombre: '', precio: 0, tamano: '' });
    }
    
    setFormData(prev => ({ ...prev, variantes: updatedVariantes }));
  };
  
  // Manejar variedades
  const handleAddVariedad = () => {
    if (formData.nuevaVariedad.trim() === '') return;
    
    setFormData(prev => ({
      ...prev,
      variedades: [...prev.variedades, prev.nuevaVariedad.trim()],
      nuevaVariedad: '',
    }));
  };
  
  const handleRemoveVariedad = (index: number) => {
    const updatedVariedades = [...formData.variedades];
    updatedVariedades.splice(index, 1);
    
    setFormData(prev => ({ ...prev, variedades: updatedVariedades }));
  };
  
  // Manejar selección de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagenFile(file);
      
      // Previsualización
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagenPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Subir imagen a Firebase Storage
  const uploadImage = async (): Promise<string> => {
    if (!imagenFile) return formData.imagen;
    
    setUploadingImage(true);
    
    try {
      const storageRef = ref(storage, `productos/${Date.now()}_${imagenFile.name}`);
      await uploadBytes(storageRef, imagenFile);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (err: any) {
      console.error('Error al subir imagen:', err);
      throw new Error('Error al subir imagen: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };
  
  // Guardar producto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      // Validar datos
      if (!formData.nombre.trim()) {
        setError('El nombre del producto es obligatorio.');
        return;
      }
      
      if (!formData.categoria) {
        setError('Debes seleccionar una categoría.');
        return;
      }
      
      if (formData.variantes.length === 0) {
        setError('Debes añadir al menos una variante del producto.');
        return;
      }
      
      // Validar que cada variante tenga datos completos
      const variantesInvalidas = formData.variantes.some(
        v => !v.nombre.trim() || v.precio <= 0 || !v.tamano.trim()
      );
      
      if (variantesInvalidas) {
        setError('Todas las variantes deben tener nombre, precio y tamaño válidos.');
        return;
      }
      
      // Subir imagen si se ha seleccionado una nueva
      let imagenURL = formData.imagen;
      if (imagenFile) {
        imagenURL = await uploadImage();
      }
      
      // Asegurar que los IDs de las variantes sean correctos
      const variantes = formData.variantes.map(v => {
        // Si el ID está vacío, generar uno nuevo
        const id = v.id || `${formData.nombre.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        return { ...v, id };
      });
      
      // Preparar datos del producto
      const productoData: Omit<Producto, 'id'> = {
        nombre: formData.nombre.trim(),
        descripcion: formData.descripcion.trim(),
        categoria: formData.categoria,
        variantes,
        variedades: formData.variedades,
        imagen: imagenURL,
        destacado: formData.destacado,
      };
      
      // Crear o actualizar el producto
      if (isEditing && productoId) {
        await actualizarProducto(productoId, productoData);
        setSuccess('Producto actualizado correctamente.');
      } else {
        const newId = await crearProducto(productoData);
        if (newId) {
          setSuccess('Producto creado correctamente.');
          // Redirigir a la página de edición con query params
          router.push(`/admin/productos/editar?id=${newId}`);
        } else {
          setError('Error al crear el producto. Por favor, intenta nuevamente.');
        }
      }
    } catch (err: any) {
      console.error('Error al guardar producto:', err);
      setError('Error al guardar el producto: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cancelar y volver a la lista
  const handleCancel = () => {
    // Si hay cambios, mostrar confirmación
    setConfirmCancelOpen(true);
  };
  
  if (loadingData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <p className="text-muted-foreground">
            {isEditing 
              ? 'Actualiza la información del producto existente.' 
              : 'Crea un nuevo producto para tu tienda.'}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleCancel}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <Button onClick={handleSubmit} disabled={loading || uploadingImage}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? 'Guardando...' : 'Guardar Producto'}
          </Button>
        </div>
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
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información básica del producto */}
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
            <CardDescription>
              Detalles generales del producto.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Producto*</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej. Jabón Artesanal"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría*</Label>
                <Select
                  value={formData.categoria}
                  onValueChange={(value) => handleSelectChange('categoria', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                placeholder="Describe el producto..."
                rows={4}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="destacado"
                checked={formData.destacado}
                onCheckedChange={(checked) => handleSwitchChange('destacado', checked)}
              />
              <Label htmlFor="destacado">Mostrar como producto destacado</Label>
            </div>
          </CardContent>
        </Card>
        
        {/* Imagen del producto */}
        <Card>
          <CardHeader>
            <CardTitle>Imagen del Producto</CardTitle>
            <CardDescription>
              Sube una imagen representativa del producto.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label htmlFor="imagen">Seleccionar imagen</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="imagen"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="flex-1"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Formato recomendado: JPG o PNG. Tamaño máximo: 5MB.
                </p>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="h-32 w-32 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                  {imagenPreview ? (
                    <img
                      src={imagenPreview}
                      alt="Vista previa"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Image className="h-12 w-12 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Variantes del producto */}
        <Card>
          <CardHeader>
            <CardTitle>Variantes del Producto</CardTitle>
            <CardDescription>
              Agrega las diferentes presentaciones, tamaños o versiones del producto.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Tamaño</TableHead>
                  <TableHead>Precio ($MXN)</TableHead>
                  <TableHead className="w-[100px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.variantes.map((variante, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input
                        value={variante.nombre}
                        onChange={(e) => handleVarianteChange(index, 'nombre', e.target.value)}
                        placeholder="Ej. Jabón Artesanal 100g"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={variante.tamano}
                        onChange={(e) => handleVarianteChange(index, 'tamano', e.target.value)}
                        placeholder="Ej. 100g"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={variante.precio}
                        onChange={(e) => handleVarianteChange(index, 'precio', e.target.value)}
                        placeholder="Ej. 150.00"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveVariante(index)}
                        disabled={formData.variantes.length <= 1}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <Button type="button" variant="outline" onClick={handleAddVariante}>
              <Plus className="mr-2 h-4 w-4" />
              Añadir Variante
            </Button>
          </CardContent>
        </Card>
        
        {/* Variedades del producto */}
        <Card>
          <CardHeader>
            <CardTitle>Variedades del Producto</CardTitle>
            <CardDescription>
              Agrega las diferentes variedades o versiones disponibles (opcional).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {formData.variedades.map((variedad, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                >
                  <span className="text-sm">{variedad}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveVariedad(index)}
                    className="ml-2 text-gray-500 hover:text-red-500"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
              
              {formData.variedades.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No hay variedades agregadas.
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Input
                placeholder="Añadir variedad (ej. Color, Sabor, etc.)"
                value={formData.nuevaVariedad}
                onChange={(e) => setFormData(prev => ({ ...prev, nuevaVariedad: e.target.value }))}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddVariedad}
                disabled={!formData.nuevaVariedad.trim()}
                variant="outline"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
      
      {/* Diálogo de confirmación para cancelar */}
      <AlertDialog open={confirmCancelOpen} onOpenChange={setConfirmCancelOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Los cambios no guardados se perderán. ¿Deseas continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, continuar editando</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="destructive" onClick={() => router.push('/admin/productos')}>
                Sí, salir sin guardar
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}