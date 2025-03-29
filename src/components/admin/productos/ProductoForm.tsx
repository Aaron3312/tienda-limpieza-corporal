"use client";

import React, { useState, useEffect } from 'react';
import catalogoData from '@/data/catalogo.json';
import VarianteLista from './VarianteLista';
import VarianteForm from './VarianteForm';

export default function ProductoForm({ productoInicial = null, onGuardar, onCancelar }) {
  // Estado para el formulario
  const [producto, setProducto] = useState({
    id: '',
    nombre: '',
    categoria: '',
    descripcion: '',
    variantes: [],
    imagen: '',
    destacado: false
  });
  
  // Estado para mostrar/ocultar el formulario de variante
  const [mostrarFormVariante, setMostrarFormVariante] = useState(false);
  // Estado para editar una variante existente
  const [varianteEditada, setVarianteEditada] = useState(null);
  
  // Cargar datos iniciales si se está editando un producto existente
  useEffect(() => {
    if (productoInicial) {
      setProducto(productoInicial);
    } else {
      // Generar un ID único para nuevo producto
      setProducto(prev => ({
        ...prev,
        id: `producto-${new Date().getTime()}`
      }));
    }
  }, [productoInicial]);
  
  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProducto({
      ...producto,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(producto);
  };
  
  // Agregar una nueva variante
  const agregarVariante = (variante) => {
    if (varianteEditada !== null) {
      // Estamos editando una variante existente
      const nuevasVariantes = [...producto.variantes];
      nuevasVariantes[varianteEditada] = variante;
      
      setProducto({
        ...producto,
        variantes: nuevasVariantes
      });
      
      setVarianteEditada(null);
    } else {
      // Estamos añadiendo una nueva variante
      setProducto({
        ...producto,
        variantes: [...producto.variantes, variante]
      });
    }
    
    setMostrarFormVariante(false);
  };
  
  // Editar una variante existente
  const editarVariante = (indice) => {
    setVarianteEditada(indice);
    setMostrarFormVariante(true);
  };
  
  // Eliminar una variante
  const eliminarVariante = (indice) => {
    const nuevasVariantes = producto.variantes.filter((_, i) => i !== indice);
    setProducto({
      ...producto,
      variantes: nuevasVariantes
    });
  };
  
  // Obtener las categorías del catálogo
  const categorias = catalogoData.categorias || [];
  
  return (
    <div className="producto-form">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
            Nombre del Producto
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">
            Categoría
          </label>
          <select
            id="categoria"
            name="categoria"
            value={producto.categoria}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">
            URL de la Imagen
          </label>
          <input
            type="text"
            id="imagen"
            name="imagen"
            value={producto.imagen}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="/images/mi-producto.jpg"
          />
          <p className="text-sm text-gray-500 mt-1">
            Deja en blanco para usar la imagen por defecto
          </p>
        </div>
        
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="destacado"
              checked={producto.destacado}
              onChange={handleChange}
              className="mr-2 leading-tight"
            />
            <span className="text-sm font-medium text-gray-700">
              Producto Destacado
            </span>
          </label>
        </div>
        
        <div className="mb-6 border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold mb-4">Variantes del Producto</h3>
          
          {/* Lista de variantes */}
          {producto.variantes.length > 0 ? (
            <VarianteLista 
              variantes={producto.variantes} 
              onEditar={editarVariante} 
              onEliminar={eliminarVariante} 
            />
          ) : (
            <p className="text-gray-500 italic mb-4">No hay variantes definidas.</p>
          )}
          
          {/* Formulario para agregar/editar variante */}
          {mostrarFormVariante ? (
            <VarianteForm 
              varianteInicial={varianteEditada !== null ? producto.variantes[varianteEditada] : null} 
              onGuardar={agregarVariante} 
              onCancelar={() => {
                setMostrarFormVariante(false);
                setVarianteEditada(null);
              }} 
            />
          ) : (
            <button
              type="button"
              onClick={() => setMostrarFormVariante(true)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              + Añadir Variante
            </button>
          )}
        </div>
        
        <div className="flex justify-end mt-6 space-x-4">
          <button
            type="button"
            onClick={onCancelar}
            className="bg-white hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 border border-gray-300 rounded focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            style={{ backgroundColor: catalogoData.colores.primario }}
          >
            Guardar Producto
          </button>
        </div>
      </form>
    </div>
  );
}