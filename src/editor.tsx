"use client";

import React, { useState, useEffect } from 'react';
import catalogoData from '@/data/catalogo.json'; // Importa el JSON inicial

export default function AdminEditor() {
  // Estado principal que almacena los datos del catálogo
  const [data, setData] = useState(catalogoData);
  
  // Estados para manejar la edición
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [modoEdicion, setModoEdicion] = useState(''); // 'categoria', 'producto', 'variante'
  const [itemEditado, setItemEditado] = useState(null);
  const [variantes, setVariantes] = useState([]);
  
  // Estado para mensajes al usuario
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  // Colores del tema para la interfaz
  const colores = data.colores;

  // Función para guardar cambios (en una implementación real, esto se enviaría a un servidor)
  const guardarCambios = () => {
    // Aquí se implementaría el guardado real a un archivo o base de datos
    // En este ejemplo, solo mostramos el JSON resultante
    console.log(JSON.stringify(data, null, 2));
    
    // Mostrar mensaje de éxito
    setMensaje({
      texto: "¡Cambios guardados con éxito! (En una implementación real, esto se guardaría en un archivo)",
      tipo: "exito"
    });
    
    // Limpiar el mensaje después de 3 segundos
    setTimeout(() => {
      setMensaje({ texto: '', tipo: '' });
    }, 3000);
    
    // Aquí se podría implementar la descarga del JSON como archivo
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "catalogo.json";
    link.click();
  };

  // Función para exportar como CSV (para uso en Excel)
  const exportarCSV = () => {
    // Crear cabeceras
    let csv = "ID,Nombre,Categoría,Descripción,Destacado,Variante,Precio,Unidad\n";
    
    // Agregar datos de productos
    data.productos.forEach(producto => {
      producto.variantes.forEach(variante => {
        csv += `${producto.id},${producto.nombre},${producto.categoria},${producto.descripcion.replace(/,/g, ";")},${producto.destacado},${variante.descripcion},${variante.precio},${variante.unidad}\n`;
      });
    });
    
    // Generar archivo para descargar
    const csvFile = new Blob([csv], { type: "text/csv" });
    const downloadLink = document.createElement("a");
    downloadLink.download = "catalogo-productos.csv";
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // Mostrar mensaje
    setMensaje({
      texto: "CSV exportado correctamente. Puedes editarlo en Excel y luego importarlo.",
      tipo: "exito"
    });
    
    setTimeout(() => {
      setMensaje({ texto: '', tipo: '' });
    }, 3000);
  };
  
  // Función para importar desde CSV
  const importarCSV = (event) => {
    const archivo = event.target.files[0];
    if (!archivo) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const contenido = e.target.result;
      const lineas = contenido.split('\n');
      
      // Ignorar la primera línea (cabeceras)
      const registros = lineas.slice(1);
      
      // Crear una copia profunda de los datos actuales
      const nuevosDatos = JSON.parse(JSON.stringify(data));
      
      // Mapeo para almacenar productos mientras procesamos
      const productosActualizados = {};
      
      // Procesar cada línea del CSV
      registros.forEach(linea => {
        if (!linea.trim()) return; // Ignorar líneas vacías
        
        const [id, nombre, categoria, descripcion, destacado, varianteDesc, precio, unidad] = linea.split(',');
        
        // Si el producto ya lo hemos procesado, solo agregamos la variante
        if (productosActualizados[id]) {
          productosActualizados[id].variantes.push({
            descripcion: varianteDesc,
            precio: parseFloat(precio),
            unidad
          });
        } else {
          // Crear un nuevo objeto de producto
          productosActualizados[id] = {
            id,
            nombre,
            categoria,
            descripcion,
            destacado: destacado.toLowerCase() === 'true',
            variantes: [{
              descripcion: varianteDesc,
              precio: parseFloat(precio),
              unidad
            }],
            imagen: `/images/${id}.jpg` // Asumimos una convención de nombres
          };
        }
      });
      
      // Convertir el objeto a un array para el formato JSON
      nuevosDatos.productos = Object.values(productosActualizados);
      
      // Actualizar el estado
      setData(nuevosDatos);
      
      // Mostrar mensaje
      setMensaje({
        texto: "CSV importado correctamente. Revisa los cambios antes de guardar.",
        tipo: "exito"
      });
      
      setTimeout(() => {
        setMensaje({ texto: '', tipo: '' });
      }, 3000);
    };
    
    reader.readAsText(archivo);
  };

  // Función para seleccionar una categoría
  const seleccionarCategoria = (id) => {
    setCategoriaSeleccionada(id);
    setProductoSeleccionado('');
    setModoEdicion('');
    setItemEditado(null);
  };

  // Función para seleccionar un producto
  const seleccionarProducto = (id) => {
    setProductoSeleccionado(id);
    setModoEdicion('');
    setItemEditado(null);
    
    // Carga las variantes del producto seleccionado
    const producto = data.productos.find(p => p.id === id);
    if (producto) {
      setVariantes(producto.variantes);
    }
  };

  // Función para iniciar edición de categoría
  const editarCategoria = (id) => {
    const categoria = data.categorias.find(c => c.id === id);
    if (categoria) {
      setItemEditado({...categoria});
      setModoEdicion('categoria');
    }
  };

  // Función para iniciar edición de producto
  const editarProducto = (id) => {
    const producto = data.productos.find(p => p.id === id);
    if (producto) {
      setItemEditado({...producto});
      setModoEdicion('producto');
    }
  };

  // Función para iniciar edición de variante
  const editarVariante = (index) => {
    const producto = data.productos.find(p => p.id === productoSeleccionado);
    if (producto && producto.variantes[index]) {
      setItemEditado({...producto.variantes[index], index});
      setModoEdicion('variante');
    }
  };

  // Función para guardar cambios de categoría
  const guardarCategoria = () => {
    if (!itemEditado) return;
    
    const nuevasCategorias = data.categorias.map(cat => 
      cat.id === itemEditado.id ? {...itemEditado} : cat
    );
    
    setData({
      ...data,
      categorias: nuevasCategorias
    });
    
    setModoEdicion('');
    setItemEditado(null);
    setMensaje({
      texto: "Categoría actualizada. Recuerda guardar los cambios.",
      tipo: "exito"
    });
    
    setTimeout(() => {
      setMensaje({ texto: '', tipo: '' });
    }, 3000);
  };

  // Función para guardar cambios de producto
  const guardarProducto = () => {
    if (!itemEditado) return;
    
    const nuevosProductos = data.productos.map(prod => 
      prod.id === itemEditado.id ? {...itemEditado} : prod
    );
    
    setData({
      ...data,
      productos: nuevosProductos
    });
    
    setModoEdicion('');
    setItemEditado(null);
    setMensaje({
      texto: "Producto actualizado. Recuerda guardar los cambios.",
      tipo: "exito"
    });
    
    setTimeout(() => {
      setMensaje({ texto: '', tipo: '' });
    }, 3000);
  };

  // Función para guardar cambios de variante
  const guardarVariante = () => {
    if (!itemEditado || !productoSeleccionado) return;
    
    const producto = data.productos.find(p => p.id === productoSeleccionado);
    if (!producto) return;
    
    const nuevasVariantes = [...producto.variantes];
    nuevasVariantes[itemEditado.index] = {
      descripcion: itemEditado.descripcion,
      precio: parseFloat(itemEditado.precio),
      unidad: itemEditado.unidad
    };
    
    const nuevosProductos = data.productos.map(prod => 
      prod.id === productoSeleccionado 
        ? {...prod, variantes: nuevasVariantes} 
        : prod
    );
    
    setData({
      ...data,
      productos: nuevosProductos
    });
    
    setVariantes(nuevasVariantes);
    setModoEdicion('');
    setItemEditado(null);
    setMensaje({
      texto: "Variante actualizada. Recuerda guardar los cambios.",
      tipo: "exito"
    });
    
    setTimeout(() => {
      setMensaje({ texto: '', tipo: '' });
    }, 3000);
  };

  // Función para añadir nueva categoría
  const agregarCategoria = () => {
    setItemEditado({
      id: '',
      nombre: '',
      descripcion: '',
      imagen: ''
    });
    setModoEdicion('nueva-categoria');
  };

  // Función para añadir nuevo producto
  const agregarProducto = () => {
    setItemEditado({
      id: '',
      nombre: '',
      categoria: categoriaSeleccionada || '',
      descripcion: '',
      variantes: [],
      imagen: '',
      destacado: false
    });
    setModoEdicion('nuevo-producto');
  };

  // Función para añadir nueva variante
  const agregarVariante = () => {
    setItemEditado({
      descripcion: '',
      precio: 0,
      unidad: '100 g'
    });
    setModoEdicion('nueva-variante');
  };

  // Función para guardar nueva categoría
  const guardarNuevaCategoria = () => {
    if (!itemEditado || !itemEditado.id || !itemEditado.nombre) {
      setMensaje({
        texto: "El ID y el nombre son obligatorios.",
        tipo: "error"
      });
      return;
    }
    
    // Verificar que el ID no exista
    if (data.categorias.some(c => c.id === itemEditado.id)) {
      setMensaje({
        texto: "Ya existe una categoría con ese ID.",
        tipo: "error"
      });
      return;
    }
    
    const nuevasCategorias = [...data.categorias, {...itemEditado}];
    
    setData({
      ...data,
      categorias: nuevasCategorias
    });
    
    setCategoriaSeleccionada(itemEditado.id);
    setModoEdicion('');
    setItemEditado(null);
    setMensaje({
      texto: "Nueva categoría creada. Recuerda guardar los cambios.",
      tipo: "exito"
    });
    
    setTimeout(() => {
      setMensaje({ texto: '', tipo: '' });
    }, 3000);
  };

  // Función para guardar nuevo producto
  const guardarNuevoProducto = () => {
    if (!itemEditado || !itemEditado.id || !itemEditado.nombre || !itemEditado.categoria) {
      setMensaje({
        texto: "El ID, nombre y categoría son obligatorios.",
        tipo: "error"
      });
      return;
    }
    
    // Verificar que el ID no exista
    if (data.productos.some(p => p.id === itemEditado.id)) {
      setMensaje({
        texto: "Ya existe un producto con ese ID.",
        tipo: "error"
      });
      return;
    }
    
    const nuevoProducto = {
      ...itemEditado,
      variantes: itemEditado.variantes || []
    };
    
    const nuevosProductos = [...data.productos, nuevoProducto];
    
    setData({
      ...data,
      productos: nuevosProductos
    });
    
    setProductoSeleccionado(itemEditado.id);
    setVariantes(nuevoProducto.variantes);
    setModoEdicion('');
    setItemEditado(null);
    setMensaje({
      texto: "Nuevo producto creado. Recuerda guardar los cambios.",
      tipo: "exito"
    });
    
    setTimeout(() => {
      setMensaje({ texto: '', tipo: '' });
    }, 3000);
  };

  // Función para guardar nueva variante
  const guardarNuevaVariante = () => {
    if (!itemEditado || !itemEditado.descripcion || !productoSeleccionado) {
      setMensaje({
        texto: "La descripción es obligatoria y debes seleccionar un producto.",
        tipo: "error"
      });
      return;
    }
    
    const producto = data.productos.find(p => p.id === productoSeleccionado);
    if (!producto) return;
    
    const nuevaVariante = {
      descripcion: itemEditado.descripcion,
      precio: parseFloat(itemEditado.precio) || 0,
      unidad: itemEditado.unidad || '100 g'
    };
    
    const nuevasVariantes = [...producto.variantes, nuevaVariante];
    
    const nuevosProductos = data.productos.map(prod => 
      prod.id === productoSeleccionado 
        ? {...prod, variantes: nuevasVariantes} 
        : prod
    );
    
    setData({
      ...data,
      productos: nuevosProductos
    });
    
    setVariantes(nuevasVariantes);
    setModoEdicion('');
    setItemEditado(null);
    setMensaje({
      texto: "Nueva variante agregada. Recuerda guardar los cambios.",
      tipo: "exito"
    });
    
    setTimeout(() => {
      setMensaje({ texto: '', tipo: '' });
    }, 3000);
  };

  // Función para eliminar categoría
  const eliminarCategoria = (id) => {
    if (window.confirm(`¿Estás seguro de eliminar esta categoría? También se eliminarán todos los productos asociados.`)) {
      // Eliminar productos de esta categoría
      const productosActualizados = data.productos.filter(p => p.categoria !== id);
      // Eliminar la categoría
      const categoriasActualizadas = data.categorias.filter(c => c.id !== id);
      
      setData({
        ...data,
        categorias: categoriasActualizadas,
        productos: productosActualizados
      });
      
      setCategoriaSeleccionada('');
      setProductoSeleccionado('');
      setModoEdicion('');
      setItemEditado(null);
      setMensaje({
        texto: "Categoría eliminada. Recuerda guardar los cambios.",
        tipo: "exito"
      });
      
      setTimeout(() => {
        setMensaje({ texto: '', tipo: '' });
      }, 3000);
    }
  };

  // Función para eliminar producto
  const eliminarProducto = (id) => {
    if (window.confirm(`¿Estás seguro de eliminar este producto?`)) {
      const productosActualizados = data.productos.filter(p => p.id !== id);
      
      setData({
        ...data,
        productos: productosActualizados
      });
      
      setProductoSeleccionado('');
      setModoEdicion('');
      setItemEditado(null);
      setMensaje({
        texto: "Producto eliminado. Recuerda guardar los cambios.",
        tipo: "exito"
      });
      
      setTimeout(() => {
        setMensaje({ texto: '', tipo: '' });
      }, 3000);
    }
  };

  // Función para eliminar variante
  const eliminarVariante = (index) => {
    if (window.confirm(`¿Estás seguro de eliminar esta variante?`)) {
      const producto = data.productos.find(p => p.id === productoSeleccionado);
      if (!producto) return;
      
      const nuevasVariantes = producto.variantes.filter((_, i) => i !== index);
      
      const nuevosProductos = data.productos.map(prod => 
        prod.id === productoSeleccionado 
          ? {...prod, variantes: nuevasVariantes} 
          : prod
      );
      
      setData({
        ...data,
        productos: nuevosProductos
      });
      
      setVariantes(nuevasVariantes);
      setModoEdicion('');
      setItemEditado(null);
      setMensaje({
        texto: "Variante eliminada. Recuerda guardar los cambios.",
        tipo: "exito"
      });
      
      setTimeout(() => {
        setMensaje({ texto: '', tipo: '' });
      }, 3000);
    }
  };

  // Función para manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setItemEditado({
      ...itemEditado,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Estilos para la interfaz
  const estilos = {
    primario: { backgroundColor: colores.primario, color: 'white' },
    secundario: { backgroundColor: colores.secundario, color: 'white' },
    terciario: { backgroundColor: colores.terciario, color: 'white' },
    cuaternario: { backgroundColor: colores.cuaternario, color: 'white' },
    boton: {
      primary: {
        backgroundColor: colores.primario,
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      },
      secondary: {
        backgroundColor: 'white',
        color: colores.primario,
        padding: '8px 16px',
        border: `1px solid ${colores.primario}`,
        borderRadius: '4px',
        cursor: 'pointer'
      },
      danger: {
        backgroundColor: '#dc3545',
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }
    },
    input: {
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      width: '100%',
      marginBottom: '16px'
    },
    mensaje: {
      exito: {
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: '12px',
        borderRadius: '4px',
        marginBottom: '16px'
      },
      error: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '12px',
        borderRadius: '4px',
        marginBottom: '16px'
      }
    }
  };

  return (
    <div className="admin-container p-4">
      <div className="admin-header" style={estilos.primario}>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-2">Administrador de Catálogo</h1>
          <p>Gestiona los productos y categorías de tu catálogo fácilmente</p>
        </div>
      </div>

      {/* Mensaje para el usuario */}
      {mensaje.texto && (
        <div style={estilos.mensaje[mensaje.tipo]} className="my-4">
          {mensaje.texto}
        </div>
      )}

      <div className="admin-content grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Panel de categorías */}
        <div className="categorias-panel bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Categorías</h2>
            <button 
              onClick={agregarCategoria}
              style={estilos.boton.primary}
              className="text-sm"
            >
              + Nueva
            </button>
          </div>
          
          <ul className="divide-y">
            {data.categorias.map(categoria => (
              <li 
                key={categoria.id} 
                className={`py-2 px-2 cursor-pointer ${categoriaSeleccionada === categoria.id ? 'bg-gray-100' : ''}`}
                onClick={() => seleccionarCategoria(categoria.id)}
              >
                <div className="flex justify-between items-center">
                  <span>{categoria.nombre}</span>
                  <div className="flex space-x-2">
                    <button 
                    onClick={modoEdicion === 'categoria' ? guardarCategoria : guardarNuevaCategoria}
                    style={estilos.boton.primary}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            )}
            
            {/* Formulario de producto */}
            {(modoEdicion === 'producto' || modoEdicion === 'nuevo-producto') && itemEditado && (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">ID (único, sin espacios)</label>
                  <input 
                    type="text" 
                    name="id"
                    value={itemEditado.id || ''}
                    onChange={handleInputChange}
                    style={estilos.input}
                    readOnly={modoEdicion === 'producto'} // El ID no se puede editar, solo en nuevo
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Nombre</label>
                  <input 
                    type="text" 
                    name="nombre"
                    value={itemEditado.nombre || ''}
                    onChange={handleInputChange}
                    style={estilos.input}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Categoría</label>
                  <select 
                    name="categoria"
                    value={itemEditado.categoria || ''}
                    onChange={handleInputChange}
                    style={estilos.input}
                  >
                    <option value="">Selecciona una categoría</option>
                    {data.categorias.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Descripción</label>
                  <textarea 
                    name="descripcion"
                    value={itemEditado.descripcion || ''}
                    onChange={handleInputChange}
                    style={{...estilos.input, minHeight: '80px'}}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Imagen (ruta)</label>
                  <input 
                    type="text" 
                    name="imagen"
                    value={itemEditado.imagen || ''}
                    onChange={handleInputChange}
                    style={estilos.input}
                    placeholder="/images/nombre-imagen.jpg"
                  />
                </div>
                <div className="mb-4">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      name="destacado"
                      checked={itemEditado.destacado || false}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium">Destacado</span>
                  </label>
                </div>
                
                <div className="flex justify-end space-x-2 mt-6">
                  <button 
                    onClick={() => {
                      setModoEdicion('');
                      setItemEditado(null);
                    }}
                    style={estilos.boton.secondary}
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={modoEdicion === 'producto' ? guardarProducto : guardarNuevoProducto}
                    style={estilos.boton.primary}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            )}
            
            {/* Formulario de variante */}
            {(modoEdicion === 'variante' || modoEdicion === 'nueva-variante') && itemEditado && (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Descripción</label>
                  <input 
                    type="text" 
                    name="descripcion"
                    value={itemEditado.descripcion || ''}
                    onChange={handleInputChange}
                    style={estilos.input}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Precio</label>
                  <input 
                    type="number" 
                    name="precio"
                    value={itemEditado.precio || 0}
                    onChange={handleInputChange}
                    style={estilos.input}
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Unidad</label>
                  <input 
                    type="text" 
                    name="unidad"
                    value={itemEditado.unidad || ''}
                    onChange={handleInputChange}
                    style={estilos.input}
                    placeholder="100 g, 250 ml, etc."
                  />
                </div>
                
                <div className="flex justify-end space-x-2 mt-6">
                  <button 
                    onClick={() => {
                      setModoEdicion('');
                      setItemEditado(null);
                    }}
                    style={estilos.boton.secondary}
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={modoEdicion === 'variante' ? guardarVariante : guardarNuevaVariante}
                    style={estilos.boton.primary}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Acciones globales */}
      <div className="admin-actions flex justify-between p-4 bg-gray-100 mt-6 rounded">
        <div>
          <input
            type="file"
            id="csvInput"
            accept=".csv"
            style={{ display: 'none' }}
            onChange={importarCSV}
          />
          <button 
            onClick={() => document.getElementById('csvInput').click()}
            style={estilos.boton.secondary}
            className="mr-2"
          >
            Importar CSV
          </button>
          <button 
            onClick={exportarCSV}
            style={estilos.boton.secondary}
          >
            Exportar CSV
          </button>
        </div>
        <button 
          onClick={guardarCambios}
          style={{
            ...estilos.boton.primary,
            backgroundColor: colores.terciario
          }}
        >
          Guardar todos los cambios
        </button>
      </div>
    </div>
  );
}
                      onClick={(e) => {
                        e.stopPropagation();
                        editarCategoria(categoria.id);
                      }}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        eliminarCategoria(categoria.id);
                      }}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Panel de productos */}
        <div className="productos-panel bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">
              {categoriaSeleccionada 
                ? `Productos: ${data.categorias.find(c => c.id === categoriaSeleccionada)?.nombre || ''}` 
                : 'Todos los Productos'}
            </h2>
            <button 
              onClick={agregarProducto}
              style={estilos.boton.primary}
              className="text-sm"
              disabled={!categoriaSeleccionada && data.categorias.length > 0}
            >
              + Nuevo
            </button>
          </div>
          
          <ul className="divide-y">
            {data.productos
              .filter(producto => !categoriaSeleccionada || producto.categoria === categoriaSeleccionada)
              .map(producto => (
                <li 
                  key={producto.id} 
                  className={`py-2 px-2 cursor-pointer ${productoSeleccionado === producto.id ? 'bg-gray-100' : ''}`}
                  onClick={() => seleccionarProducto(producto.id)}
                >
                  <div className="flex justify-between items-center">
                    <span>{producto.nombre}</span>
                    <div className="flex space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          editarProducto(producto.id);
                        }}
                        className="text-blue-500 hover:text-blue-700 text-sm"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          eliminarProducto(producto.id);
                        }}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
          
          {categoriaSeleccionada && 
            data.productos.filter(p => p.categoria === categoriaSeleccionada).length === 0 && (
            <p className="text-gray-500 text-sm mt-4">
              No hay productos en esta categoría. Agrega uno nuevo con el botón de arriba.
            </p>
          )}
        </div>

        {/* Panel de detalles/variantes */}
        <div className="detalles-panel bg-white p-4 rounded shadow">
          {productoSeleccionado ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">
                  Variantes: {data.productos.find(p => p.id === productoSeleccionado)?.nombre || ''}
                </h2>
                <button 
                  onClick={agregarVariante}
                  style={estilos.boton.primary}
                  className="text-sm"
                >
                  + Nueva
                </button>
              </div>
              
              <ul className="divide-y">
                {variantes.map((variante, index) => (
                  <li key={index} className="py-2 px-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{variante.descripcion}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          (${variante.precio.toFixed(2)} - {variante.unidad})
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => editarVariante(index)}
                          className="text-blue-500 hover:text-blue-700 text-sm"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => eliminarVariante(index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              {variantes.length === 0 && (
                <p className="text-gray-500 text-sm mt-4">
                  No hay variantes para este producto. Agrega una nueva con el botón de arriba.
                </p>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-center">
                Selecciona un producto para ver sus variantes
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Formulario de edición modal */}
      {modoEdicion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {modoEdicion === 'categoria' && 'Editar Categoría'}
              {modoEdicion === 'nueva-categoria' && 'Nueva Categoría'}
              {modoEdicion === 'producto' && 'Editar Producto'}
              {modoEdicion === 'nuevo-producto' && 'Nuevo Producto'}
              {modoEdicion === 'variante' && 'Editar Variante'}
              {modoEdicion === 'nueva-variante' && 'Nueva Variante'}
            </h2>
            
            {/* Formulario de categoría */}
            {(modoEdicion === 'categoria' || modoEdicion === 'nueva-categoria') && itemEditado && (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">ID (único, sin espacios)</label>
                  <input 
                    type="text" 
                    name="id"
                    value={itemEditado.id || ''}
                    onChange={handleInputChange}
                    style={estilos.input}
                    readOnly={modoEdicion === 'categoria'} // El ID no se puede editar, solo en nuevo
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Nombre</label>
                  <input 
                    type="text" 
                    name="nombre"
                    value={itemEditado.nombre || ''}
                    onChange={handleInputChange}
                    style={estilos.input}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Descripción</label>
                  <textarea 
                    name="descripcion"
                    value={itemEditado.descripcion || ''}
                    onChange={handleInputChange}
                    style={{...estilos.input, minHeight: '80px'}}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Imagen (ruta)</label>
                  <input 
                    type="text" 
                    name="imagen"
                    value={itemEditado.imagen || ''}
                    onChange={handleInputChange}
                    style={estilos.input}
                    placeholder="/images/nombre-imagen.jpg"
                  />
                </div>
                
                <div className="flex justify-end space-x-2 mt-6">
                  <button 
                    onClick={() => {
                      setModoEdicion('');
                      setItemEditado(null);
                    }}
                    style={estilos.boton.secondary}
                  >
                    Cancelar
                  </button>
                  <button