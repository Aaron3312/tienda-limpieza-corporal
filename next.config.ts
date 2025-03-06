// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',             // Exporta tu app como archivos estáticos
  images: {
    unoptimized: true,          // Necesario para exportación estática
  },
  basePath: '/nombre-repositorio', // Reemplaza con el nombre de tu repositorio
  assetPrefix: '/nombre-repositorio/', // Necesario para cargar recursos correctamente
  trailingSlash: true,          // Agrega / al final de las URLs
};

module.exports = nextConfig;
