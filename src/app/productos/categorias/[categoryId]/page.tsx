import CategoryPage from '@/components/productos/CategoryPage';
import { getCategorias } from '@/services/firestore';

export async function generateStaticParams() {
  const categorias = await getCategorias();
  return categorias.map(c => ({ categoryId: c.id }));
}

export default function CategoryPageRoute() {
  return <CategoryPage />;
}
