/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración condicional según la ruta
  async rewrites() {
    return [
      // Redirigir todas las rutas de administración a _next/data para renderizado dinámico
      {
        source: '/admin/:path*',
        destination: '/_next/data/admin/:path*'
      }
    ];
  },
  
  // Configuración base
  output: 'export',             // Exporta el resto de la app como archivos estáticos
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
  
  // Excluir /admin del build estático
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    const paths = {};
    // Copiar todas las rutas excepto /admin
    Object.keys(defaultPathMap).forEach(path => {
      if (!path.startsWith('/admin')) {
        paths[path] = defaultPathMap[path];
      }
    });
    return paths;
  }
};

module.exports = nextConfig;