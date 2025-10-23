// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* otras opciones si las tienes */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        // port: '', // Opcional, si usa un puerto específico
        // pathname: '/image/upload/**', // Opcional, si quieres limitar a una ruta específica
      },
      // --- IMPORTANTE ---
      // Aquí deberás agregar los hostnames de donde
      // cargarás tus imágenes reales en el futuro.
      // Ejemplo si usas Cloudinary:
      // {
      //   protocol: 'https',
      //   hostname: 'res.cloudinary.com',
      // },
    ],
  },
};

export default nextConfig;