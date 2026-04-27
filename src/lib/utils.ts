import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Normaliza rutas de imágenes locales que perdieron el segmento /productos/
// e.g. /images/ActualizedImages/x.jpg → /images/productos/ActualizedImages/x.jpg
export function getImageSrc(imagen: string | undefined | null, fallback = '/images/shared/placeholder.png'): string {
  if (!imagen) return fallback;
  if (imagen.startsWith('http')) return imagen;
  if (imagen.startsWith('/images/') && !imagen.startsWith('/images/productos/')) {
    return imagen.replace('/images/', '/images/productos/');
  }
  return imagen;
}
