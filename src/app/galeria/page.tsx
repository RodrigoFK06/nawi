// src/app/galeria/page.tsx
'use client'

import { Noise, Glow } from "@/components/Visuals";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MasonryGallery } from "@/components/MasonryGallery";

export default function GaleriaPage() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden selection:bg-orange-500/40 selection:text-white">
      <Noise />
      
      {/* --- Encabezado --- */}
      <header className="relative isolate pt-4 pb-16 md:pb-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/80 to-[#0A0A0A]" />
        <Glow className="w-[52rem] h-[52rem] -left-40 -top-24" />
        <Navigation />
        <div className="px-6 md:px-10 max-w-5xl mx-auto text-center mt-20 md:mt-28">
          <h1 className="text-5xl md:text-7xl leading-[0.95] font-black tracking-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">
              GALERÍA
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Explora los momentos detrás de cámara de nuestros proyectos audiovisuales.
          </p>
        </div>
      </header>

      {/* --- Galería Masonry --- */}
      <MasonryGallery />

      <Footer />
    </main>
  );
}
