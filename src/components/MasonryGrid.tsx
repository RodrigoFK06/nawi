// src/components/MasonryGrid.tsx
'use client'

import React from 'react';
import Masonry from 'react-masonry-css';
import { MasonryImageItem } from './MasonryImageItem'; 
import { AnimatePresence, motion } from 'framer-motion';

type ImageItem = { id: string; src: string };

type MasonryGridProps = {
  items: ImageItem[];
  onImageClick: (src: string) => void;
};

// Configuración de columnas (igual)
const breakpointColumnsObj = {
  default: 4,
  1280: 4,
  1024: 3,
  768: 2,
  640: 2
};

export function MasonryGrid({ items, onImageClick }: MasonryGridProps) {

  return (
    // Quitamos dnd-kit context
    <Masonry
      breakpointCols={breakpointColumnsObj}
      // --- USA LAS CLASES CSS DEFINIDAS EN globals.css ---
      className="my-masonry-grid" 
      columnClassName="my-masonry-grid_column"
      // ---------------------------------------------------
    >
      {/* Mapeamos los items directamente */}
      <AnimatePresence initial={false}>
        {items.map((item, index) => (
          // El motion.div wrapper para AnimatePresence y layout
          // Quitamos 'break-inside-avoid' de aquí si lo pusimos antes
          <motion.div
            key={item.id} 
            layout 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Pasamos los props al item */}
            <MasonryImageItem
              item={item}
              index={index} // El índice sigue siendo útil para el aspect ratio
              onClick={onImageClick}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </Masonry>
    // Quitamos cierre de dnd-kit context
  );
}