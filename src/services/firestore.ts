import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    setDoc, 
    updateDoc, 
    deleteDoc, 
    query, 
    where,
    orderBy,
    limit,
    addDoc,
    serverTimestamp,
    DocumentReference,
    DocumentData,
    Timestamp
  } from 'firebase/firestore';
  import { firestore } from '@/lib/firebase';
  import { 
    Producto, 
    Categoria, 
    Colores, 
    InformacionNegocio 
  } from '@/types';
  
  // PRODUCTOS
  
  export const getProductos = async (): Promise<Producto[]> => {
    try {
      const productosCollection = collection(firestore, 'productos');
      const snapshot = await getDocs(productosCollection);
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          nombre: data.nombre,
          descripcion: data.descripcion,
          categoria: data.categoria,
          variantes: data.variantes,
          variedades: data.variedades || [],
          imagen: data.imagen,
          destacado: data.destacado
        } as Producto;
      });
    } catch (error) {
      console.error("Error al obtener productos:", error);
      return [];
    }
  };
  
  export const getProductosDestacados = async (): Promise<Producto[]> => {
    try {
      const productosCollection = collection(firestore, 'productos');
      const q = query(
        productosCollection,
        where('destacado', '==', true),
        limit(4)
      );
      const snapshot = await getDocs(q);
      
      if (snapshot.docs.length === 0) {
        // Si no hay destacados, obtener los primeros 4 productos
        const allProductsQ = query(productosCollection, limit(4));
        const allSnapshot = await getDocs(allProductsQ);
        return allSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Producto));
      }
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Producto));
    } catch (error) {
      console.error("Error al obtener productos destacados:", error);
      return [];
    }
  };
  
  export const getProductosPorCategoria = async (categoriaId: string): Promise<Producto[]> => {
    try {
      const productosCollection = collection(firestore, 'productos');
      const q = query(
        productosCollection,
        where('categoria', '==', categoriaId)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Producto));
    } catch (error) {
      console.error(`Error al obtener productos de categoría ${categoriaId}:`, error);
      return [];
    }
  };
  
  export const getProducto = async (id: string): Promise<Producto | null> => {
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
  
  export const crearProducto = async (producto: Omit<Producto, 'id'>): Promise<string | null> => {
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
  
  export const actualizarProducto = async (id: string, producto: Partial<Producto>): Promise<boolean> => {
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
  
  export const eliminarProducto = async (id: string): Promise<boolean> => {
    try {
      const productoRef = doc(firestore, 'productos', id);
      await deleteDoc(productoRef);
      return true;
    } catch (error) {
      console.error(`Error al eliminar producto ${id}:`, error);
      return false;
    }
  };
  
  // CATEGORÍAS
  
  export const getCategorias = async (): Promise<Categoria[]> => {
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
  
  export const getCategoria = async (id: string): Promise<Categoria | null> => {
    try {
      const categoriaRef = doc(firestore, 'categorias', id);
      const snapshot = await getDoc(categoriaRef);
      
      if (!snapshot.exists()) {
        return null;
      }
      
      return {
        id: snapshot.id,
        ...snapshot.data()
      } as Categoria;
    } catch (error) {
      console.error(`Error al obtener categoría ${id}:`, error);
      return null;
    }
  };
  
  export const crearCategoria = async (categoria: Omit<Categoria, 'id'>): Promise<string | null> => {
    try {
      const categoriasCollection = collection(firestore, 'categorias');
      const docRef = await addDoc(categoriasCollection, {
        ...categoria,
        timestamp: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error al crear categoría:", error);
      return null;
    }
  };
  
  export const actualizarCategoria = async (id: string, categoria: Partial<Categoria>): Promise<boolean> => {
    try {
      const categoriaRef = doc(firestore, 'categorias', id);
      await updateDoc(categoriaRef, {
        ...categoria,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error(`Error al actualizar categoría ${id}:`, error);
      return false;
    }
  };
  
  export const eliminarCategoria = async (id: string): Promise<boolean> => {
    try {
      const categoriaRef = doc(firestore, 'categorias', id);
      await deleteDoc(categoriaRef);
      return true;
    } catch (error) {
      console.error(`Error al eliminar categoría ${id}:`, error);
      return false;
    }
  };
  
  // COLORES
  
  export const getColores = async (): Promise<Colores | null> => {
    try {
      const coloresRef = doc(firestore, 'configuracion', 'colores');
      const snapshot = await getDoc(coloresRef);
      
      if (!snapshot.exists()) {
        return null;
      }
      
      const coloresData = snapshot.data() as Colores;
      
      // Añadir colores adicionales si no existen
      return {
        ...coloresData,
        pastelLavanda: coloresData.pastelLavanda || '#e6e6fa',
        texto: coloresData.texto || coloresData.textoOscuro,
        pastelVerde: coloresData.pastelVerde || '#d8f3dc'
      };
    } catch (error) {
      console.error("Error al obtener colores:", error);
      return null;
    }
  };
  
  export const actualizarColores = async (colores: Colores): Promise<boolean> => {
    try {
      const coloresRef = doc(firestore, 'configuracion', 'colores');
      await setDoc(coloresRef, {
        ...colores,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error("Error al actualizar colores:", error);
      return false;
    }
  };
  
  // INFORMACIÓN DE NEGOCIO
  
  export const getInformacionNegocio = async (): Promise<InformacionNegocio | null> => {
    try {
      const infoRef = doc(firestore, 'configuracion', 'informacionNegocio');
      const snapshot = await getDoc(infoRef);
      
      if (!snapshot.exists()) {
        return null;
      }
      
      return snapshot.data() as InformacionNegocio;
    } catch (error) {
      console.error("Error al obtener información del negocio:", error);
      return null;
    }
  };
  
  export const actualizarInformacionNegocio = async (info: InformacionNegocio): Promise<boolean> => {
    try {
      const infoRef = doc(firestore, 'configuracion', 'informacionNegocio');
      await setDoc(infoRef, {
        ...info,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error("Error al actualizar información del negocio:", error);
      return false;
    }
  };