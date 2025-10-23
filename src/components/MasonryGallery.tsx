'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';

// Tipos
type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  aspectRatio: '4:3' | '3:4' | '1:1';
  category: 'scouting' | 'momentos' | 'corte';
};

// Datos de ejemplo - Reemplaza con tus imágenes reales
const galleryImages: GalleryImage[] = [
  // Primer Scouting (imágenes de placeholder)
  { id: '1', src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800', alt: 'Scouting Locación 1', aspectRatio: '4:3', category: 'scouting' },
  { id: '2', src: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600', alt: 'Scouting Locación 2', aspectRatio: '3:4', category: 'scouting' },
  { id: '3', src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800', alt: 'Scouting Locación 3', aspectRatio: '4:3', category: 'scouting' },
  { id: '4', src: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=600', alt: 'Scouting Equipo', aspectRatio: '3:4', category: 'scouting' },
  { id: '5', src: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800', alt: 'Scouting Cámara', aspectRatio: '4:3', category: 'scouting' },
  { id: '6', src: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600', alt: 'Scouting Set', aspectRatio: '3:4', category: 'scouting' },
  { id: '7', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', alt: 'Scouting Naturaleza', aspectRatio: '1:1', category: 'scouting' },
  { id: '8', src: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600', alt: 'Scouting Urbano', aspectRatio: '3:4', category: 'scouting' },
  { id: '9', src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800', alt: 'Scouting Lago', aspectRatio: '4:3', category: 'scouting' },
  { id: '10', src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600', alt: 'Scouting Montaña', aspectRatio: '3:4', category: 'scouting' },
  
  // Momentos en la U
  { id: '11', src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600', alt: 'Campus Universitario', aspectRatio: '3:4', category: 'momentos' },
  { id: '12', src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800', alt: 'Estudiantes Trabajando', aspectRatio: '4:3', category: 'momentos' },
  { id: '13', src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600', alt: 'Biblioteca', aspectRatio: '3:4', category: 'momentos' },
  { id: '14', src: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800', alt: 'Aula de Clases', aspectRatio: '1:1', category: 'momentos' },
  { id: '15', src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800', alt: 'Grupo de Estudiantes', aspectRatio: '4:3', category: 'momentos' },
  { id: '16', src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600', alt: 'Campus Verde', aspectRatio: '3:4', category: 'momentos' },
  { id: '17', src: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800', alt: 'Estudiantes Grupo', aspectRatio: '4:3', category: 'momentos' },
  { id: '18', src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600', alt: 'Cafetería', aspectRatio: '3:4', category: 'momentos' },
  
  // Primer Corte
  { id: '19', src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800', alt: 'Edición de Video', aspectRatio: '4:3', category: 'corte' },
  { id: '20', src: 'https://images.unsplash.com/photo-1598550487031-0ef9d22b7797?w=600', alt: 'Sala de Edición', aspectRatio: '3:4', category: 'corte' },
  { id: '21', src: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800', alt: 'Timeline', aspectRatio: '4:3', category: 'corte' },
  { id: '22', src: 'https://images.unsplash.com/photo-1585282263861-f55e341878f8?w=600', alt: 'Color Grading', aspectRatio: '3:4', category: 'corte' },
  { id: '23', src: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800', alt: 'Post Producción', aspectRatio: '1:1', category: 'corte' },
  { id: '24', src: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600', alt: 'Renderizado', aspectRatio: '3:4', category: 'corte' },
  { id: '25', src: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800', alt: 'Studio Setup', aspectRatio: '4:3', category: 'corte' },
  { id: '26', src: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600', alt: 'Mixing Audio', aspectRatio: '3:4', category: 'corte' },
];

type FilterCategory = 'scouting' | 'momentos' | 'corte';

const filters: { id: FilterCategory; label: string }[] = [
  { id: 'scouting', label: 'Primer Scouting' },
  { id: 'momentos', label: 'Momentos en la U' },
  { id: 'corte', label: 'Primer Corte' },
];

export function MasonryGallery() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('scouting');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  // Filtrar imágenes según la categoría activa
  const filteredImages = galleryImages.filter(img => img.category === activeFilter);

  return (
    <section className="relative py-16 md:py-24 bg-[#0A0A0A]">
      <div className="px-4 md:px-6 max-w-[1800px] mx-auto">
        {/* Header con Filtros en la misma línea */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          {/* Fecha en esquina superior derecha */}
          <div className="order-1 md:order-2 text-xs md:text-sm text-white/50 tracking-widest text-right">
            {new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
          </div>
          
          {/* Filtros / Tabs */}
          <div className="order-2 md:order-1 flex flex-wrap gap-4 md:gap-6">
            {filters.map((filter, index) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`text-sm md:text-base font-medium tracking-wide transition-all duration-300 relative pb-1 ${
                  activeFilter === filter.id
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {filter.label}
                {activeFilter === filter.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {index < filters.length - 1 && (
                  <span className="absolute -right-3 top-1/2 -translate-y-1/2 text-white/20 hidden md:inline">|</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Galería Masonry - Usando CSS Grid para mejor control */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px]">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className={`relative group cursor-pointer overflow-hidden bg-zinc-900 ${
                  // Variar las alturas de forma más controlada
                  image.aspectRatio === '3:4' ? 'row-span-2' : 
                  image.aspectRatio === '1:1' ? 'row-span-1' : 
                  'row-span-1'
                }`}
                onClick={() => setLightboxImage(image)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                
                {/* Overlay sutil en hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-xs md:text-sm font-light tracking-wide line-clamp-2">{image.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-[101] p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-7xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={lightboxImage.src}
                  alt={lightboxImage.alt}
                  width={1600}
                  height={lightboxImage.aspectRatio === '4:3' ? 1200 : lightboxImage.aspectRatio === '1:1' ? 1600 : 2133}
                  className="w-full h-auto max-h-[90vh] object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <p className="text-white text-lg font-light">{lightboxImage.alt}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
