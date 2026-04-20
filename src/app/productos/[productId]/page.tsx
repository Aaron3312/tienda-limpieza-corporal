import type { Metadata } from 'next';
import ProductDetailsPage from '@/components/productos/ProductDetailsPage';
import catalogoData from '@/data/productos.json';

const BASE_URL = 'https://www.soloparaeva.com';

export async function generateStaticParams() {
  return catalogoData.productos.map(p => ({ productId: p.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ productId: string }> }
): Promise<Metadata> {
  const { productId } = await params;
  const product = catalogoData.productos.find(p => p.id === productId);

  if (!product) {
    return { title: 'Producto no encontrado' };
  }

  const catName = catalogoData.categorias.find(c => c.id === product.categoria)?.nombre ?? product.categoria;
  const title   = `${product.nombre} — ${catName}`;
  const desc    = product.descripcion.slice(0, 155);
  const img     = product.imagen.startsWith('http') ? product.imagen : `${BASE_URL}${product.imagen}`;

  return {
    title,
    description: desc,
    openGraph: {
      type:        'website',
      locale:      'es_MX',
      url:         `${BASE_URL}/productos/${productId}`,
      siteName:    'Solo Para Eva',
      title,
      description: desc,
      images: [{ url: img, width: 800, height: 800, alt: product.nombre }],
    },
    twitter: {
      card:        'summary_large_image',
      title,
      description: desc,
      images:      [img],
    },
  };
}

export default function ProductPage() {
  return <ProductDetailsPage />;
}
