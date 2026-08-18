import type { NextConfig } from 'next';

// Este proyecto ya NO se exporta como sitio estático: el checkout con Stripe
// necesita route handlers (creación de la sesión de pago y webhook), y esos
// sólo existen con el runtime de servidor de Vercel.
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
