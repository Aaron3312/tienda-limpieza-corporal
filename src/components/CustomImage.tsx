//components/CustomImage.tsx
import React from 'react';
import Image from 'next/image';

// Este componente se asegura de que las imágenes tengan la ruta correcta
// tanto en desarrollo local como en GitHub Pages
interface CustomImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function CustomImage({ src, alt, width, height, className }: CustomImageProps) {
  // Determinar la base path según el entorno
  const basePath = process.env.NODE_ENV === 'production' ? '/tienda-limpieza-corporal' : '';
  
  // Asegurarnos de que src comienza con / pero no con //
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  
  // Construir la ruta completa
  const fullPath = `${basePath}${normalizedSrc}`;
  
  return (
    <Image
      src={fullPath}
      alt={alt}
      width={width}
      height={height}
      className={className || ''}
      unoptimized={true} // Para evitar problemas con la optimización de imágenes en la exportación estática
    />
  );
}