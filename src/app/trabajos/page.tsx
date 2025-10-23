// src/app/trabajos/page.tsx
'use client'

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion'; // Ya no se importa Reorder
import { PlayCircle, X } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Noise } from '@/components/Visuals';
import { Lightbox } from '@/components/Lightbox';
// --- Importación actualizada ---
import { MasonryGrid } from '@/components/MasonryGrid';

// --- CONFIGURACIÓN DEL HERO (sin cambios) ---
const VIDEO_POSTER_URL = "/nawipreview.png";
const VIDEO_SOURCE_URL = "/nawi.mp4";
const YOUTUBE_LINK = "https://www.youtube.com/watch?v=XXXXXXXXX"; // <-- ¡¡REEMPLAZA ESTO!!
const PROJECT_TITLE = "AYARANGA TIERRA AÑORADA";
const PROJECT_TAG = "Documental";

// --- DATOS PARA EL MOSAICO (sin cambios) ---
const allImages = {
  scouting: Array.from({ length: 16 }, (_, i) => ({ id: `scout-${i + 1}`, src: i % 3 === 0 ? `https://via.placeholder.com/800x600/222/888?text=Scout+${i + 1}` : `https://via.placeholder.com/600x800/222/888?text=Scout+${i + 1}` })),
  momentos: Array.from({ length: 12 }, (_, i) => ({ id: `mom-${i + 1}`, src: i % 2 === 0 ? `https://via.placeholder.com/800x600/333/999?text=Mom+${i + 1}` : `https://via.placeholder.com/600x800/333/999?text=Mom+${i + 1}` })),
  corte: Array.from({ length: 18 }, (_, i) => ({ id: `corte-${i + 1}`, src: i % 4 === 0 ? `https://via.placeholder.com/800x600/444/aaa?text=Corte+${i + 1}` : `https://via.placeholder.com/600x800/444/aaa?text=Corte+${i + 1}` })),
};

type ImageItem = { id: string; src: string };
type TabKey = keyof typeof allImages;

const tabs: { key: TabKey; title: string; date?: string }[] = [
  { key: 'scouting', title: 'Primer Scouting', date: '01 SET 2025' },
  { key: 'momentos', title: 'Momentos en la U' },
  { key: 'corte', title: 'Primer Corte' },
];

export default function TrabajosPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('scouting');
  // displayedImages ahora solo se usa para pasar al grid, no se modifica con DnD
  const displayedImages = allImages[activeTab];

  // Función para cambiar de pestaña (igual)
  const handleTabChange = (tabKey: TabKey) => {
    setActiveTab(tabKey);
    // No necesitamos setDisplayedImages aquí porque usamos allImages[activeTab] directamente
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden selection:bg-orange-500/40 selection:text-white">
      <Noise />
      <header className="absolute top-0 left-0 right-0 z-20 bg-black/30 backdrop-blur-sm border-b border-white/10">
        <Navigation />
      </header>

      {/* --- HERO SECTION (sin cambios) --- */}
      <main className="h-[80vh] md:h-[90vh] flex items-center justify-center relative isolate overflow-hidden">
        {/* ... (código del video y link sin cambios) ... */}
         <video
          className="absolute inset-0 w-full h-full object-cover -z-10 opacity-80"
          autoPlay muted loop playsInline poster={VIDEO_POSTER_URL}
        > <source src={VIDEO_SOURCE_URL} type="video/mp4" /> </video>
        <div className="absolute inset-0 bg-black/30 -z-10"></div>
        <Link href={YOUTUBE_LINK} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10 group cursor-pointer">
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <PlayCircle className="w-20 h-20 text-white/80 transition-transform group-hover:scale-105" />
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-black/80 to-transparent">
             <span className="inline-block text-xs tracking-widest uppercase text-white/70 mb-1">{PROJECT_TAG}</span>
             <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">{PROJECT_TITLE}</h1>
          </motion.div>
        </Link>
      </main>
      {/* --- FIN HERO SECTION --- */}

      {/* --- SECCIÓN MASONRY (SIMPLIFICADA) --- */}
      <section className="py-24 md:py-32 bg-[#0A0A0A]">
        <div className="px-6 md:px-10 max-w-7xl mx-auto">
          {/* Controles de Pestañas/Filtros (sin cambios) */}
          <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
             <div className='flex gap-4 md:gap-6 border-b border-white/10 pb-3'>
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={`text-xl md:text-2xl font-semibold transition-colors ${activeTab === tab.key ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                > {tab.title} </button>
              ))}
            </div>
            {tabs.find(t => t.key === activeTab)?.date && (
               <div className="text-sm text-white/60">{tabs.find(t => t.key === activeTab)?.date}</div>
            )}
          </div>

          {/* Componente MasonryGrid (sin setItems) */}
          <MasonryGrid
            items={displayedImages} // Pasamos las imágenes filtradas
            onImageClick={setSelectedImage}
          />

        </div>
      </section>
      {/* --- FIN SECCIÓN MASONRY --- */}

      <Footer />

      {/* Lightbox Global (sin cambios) */}
      <AnimatePresence>
        {selectedImage && (
          <Lightbox
            key={selectedImage}
            src={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}