import ProductDetailsPage from '@/components/productos/ProductDetailsPage';
import catalogoData from '@/data/productos.json';

// Esta función es requerida para output: export 
// Genera todos los posibles paths para las páginas estáticas
export async function generateStaticParams() {
  // Obtén todos los IDs de producto del catálogo
  const productIds = catalogoData.productos.map(producto => ({
    productId: producto.id
  }));
  
  return productIds;
}

export default function ProductPage() {
  return <ProductDetailsPage />;
}