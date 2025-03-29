"use client";

import React, { useState, useEffect } from 'react';
import catalogoData from '@/data/catalogo.json';

export default function VarianteForm({ varianteInicial = null, onGuardar, onCancelar }) {
  // Estado para el formulario
  const [variante, setVariante] = useState({
    descripcion: '',
    precio: '',
    unidad: ''
  });
  
  // Colores para los botones
  const colores = catalogoData.colores;
  
  // Cargar variante inicial si se está editando
  useEffect(() => {
    if (varianteInicial) {
      setVariante(varianteInicial);
    }
  }, [varianteInicial]);
  
  // Manejar cambios en los campos
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    setVariante({
      ...variante,
      [name]: type === 'number' ? parseFloat(value) : value
    });
  };
  
  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar precio como número
    const precioNumerico = parseFloat(variante.precio);
    
    if (isNaN(precioNumerico)) {
      alert('Por favor, introduce un precio válido');
      return;
    }
    
    // Pasar variante al componente padre con precio como número
    onGuardar({
      ...variante,
      precio: precioNumerico
    });
  };
  
  return (
    <div className="variante-form bg-gray-50 p-4 rounded-lg mb-4">
      <h4 className="text-md font-medium mb-3">
        {varianteInicial ? 'Editar Variante' : 'Nueva Variante'}
      </h4>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="mb-3">
            <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="descripcion">
              Descripción
            </label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              value={variante.descripcion}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ej: Lavanda y Romero"
              required
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="precio">
              Precio ($)
            </label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={variante.precio}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="unidad">
              Unidad/Tamaño
            </label>
            <input
              type="text"
              id="unidad"
              name="unidad"
              value={variante.unidad}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ej: 100g"
              required
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-3 space-x-2">
          <button
            type="button"
            onClick={onCancelar}
            className="px-3 py-1 text-xs font-medium rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-3 py-1 text-xs font-medium rounded text-white"
            style={{ backgroundColor: colores.primario }}
          >
            Guardar Variante
          </button>
        </div>
      </form>
    </div>
  );
}