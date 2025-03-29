import CategoryPage from '@/components/productos/CategoryPage';
import catalogoData from '@/data/productos.json';

// Esta función es requerida para output: export 
// Genera todos los posibles paths para las páginas estáticas
export async function generateStaticParams() {
  // Obtén todos los IDs de categorías del catálogo
  const categoryIds = catalogoData.categorias.map(categoria => ({
    categoryId: categoria.id
  }));
  
  return categoryIds;
}

export default function CategoryPageRoute() {
  return <CategoryPage />;
}