// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurar el root de turbopack para silenciar el warning
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      // Agrega aquí otros hostnames si subes imágenes a servicios externos
      // {
      //   protocol: 'https',
      //   hostname: 'res.cloudinary.com',
      // },
    ],
  },
};

export default nextConfig;