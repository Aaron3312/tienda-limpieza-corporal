import React from 'react';

export default function EmptyState({ setActiveCategory, colores }) {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm p-8">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colores.acento1 }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 5c-2.724 0-5.126 1.328-6.626 3.373C4.608 9.548 4 11.172 4 13c0 5 8 8 8 8s8-3 8-8c0-1.828-.608-3.452-1.374-4.627C17.126 6.328 14.724 5 12 5z" />
      </svg>
      <p className="text-lg mb-4" style={{ color: colores.texto }}>
        No se encontraron productos en esta categoría.
      </p>
      <button 
        onClick={() => setActiveCategory('todos')}
        className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-sm transition-colors duration-300"
        style={{ 
          backgroundColor: colores.primario,
          color: colores.textoClaro
        }}
      >
        Ver todos los productos
      </button>
    </div>
  );
}