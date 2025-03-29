/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',             // Exporta tu app como archivos estáticos
  images: {
    unoptimized: true,          // Necesario para exportación estática
  },
  // Usa una variable de entorno para determinar si estamos usando un dominio personalizado
  basePath: process.env.CUSTOM_DOMAIN === 'true' ? '' : '/tienda-limpieza-corporal',
  assetPrefix: process.env.CUSTOM_DOMAIN === 'true' ? '' : '/tienda-limpieza-corporal/',
  trailingSlash: true,          // Agrega / al final de las URLs
  
  // Ignorar errores de ESLint y TypeScript durante el build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;