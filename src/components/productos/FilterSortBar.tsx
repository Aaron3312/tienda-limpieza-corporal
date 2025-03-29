// src/components/productos/FilterSortBar.jsx
import React from 'react';

export default function FilterSortBar({ 
  categories, 
  activeCategory, 
  setActiveCategory, 
  sortOrder, 
  setSortOrder, 
  colores 
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-4 md:space-y-0">
      {/* Filtros por categoría */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm hover:shadow`}
            style={{ 
              backgroundColor: activeCategory === category.id 
                ? colores.primario 
                : colores.pastelVerde,
              color: activeCategory === category.id 
                ? colores.textoClaro 
                : colores.texto
            }}
          >
            {category.nombre}
          </button>
        ))}
      </div>
      
      {/* Ordenación */}
      <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
        <label htmlFor="sort" className="text-sm font-medium mr-2" style={{ color: colores.texto }}>
          Ordenar por:
        </label>
        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="rounded-md border-none py-1 pl-2 pr-8 text-sm focus:outline-none focus:ring-2 bg-transparent"
          style={{ color: colores.texto }}
        >
          <option value="">Relevancia</option>
          <option value="destacados">Destacados</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="name">Nombre</option>
        </select>
      </div>
    </div>
  );
}