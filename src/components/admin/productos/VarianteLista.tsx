"use client";

import React from 'react';

export default function VarianteLista({ variantes, onEditar, onEliminar }) {
  if (!variantes || variantes.length === 0) {
    return <p className="text-gray-500 text-sm italic">No hay variantes para mostrar.</p>;
  }
  
  return (
    <div className="variante-lista mb-4">
      <div className="bg-gray-50 rounded-t-lg border border-gray-200">
        <div className="grid grid-cols-12 gap-4 p-3 font-medium text-sm text-gray-700 border-b border-gray-200">
          <div className="col-span-5">Descripción</div>
          <div className="col-span-3">Precio</div>
          <div className="col-span-2">Unidad</div>
          <div className="col-span-2 text-right">Acciones</div>
        </div>
        
        {variantes.map((variante, indice) => (
          <div 
            key={indice} 
            className="grid grid-cols-12 gap-4 p-3 text-sm border-b border-gray-200 hover:bg-gray-100"
          >
            <div className="col-span-5">{variante.descripcion}</div>
            <div className="col-span-3">${parseFloat(variante.precio).toFixed(2)}</div>
            <div className="col-span-2">{variante.unidad}</div>
            <div className="col-span-2 text-right">
              <button 
                onClick={() => onEditar(indice)} 
                className="text-blue-600 hover:text-blue-800 mr-2"
                title="Editar variante"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button 
                onClick={() => onEliminar(indice)} 
                className="text-red-600 hover:text-red-800"
                title="Eliminar variante"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}