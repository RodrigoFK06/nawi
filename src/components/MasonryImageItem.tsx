// src/components/MasonryImageItem.tsx
'use client'

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Mantenemos motion

type ImageItem = { id: string; src: string };

type MasonryImageItemProps = {
  item: ImageItem;
  index: number;
  onClick: (src: string) => void;
};

export function MasonryImageItem({ item, index, onClick }: MasonryImageItemProps) {
  const aspect = index % 4 < 2 ? 'aspect-[4/3]' : 'aspect-[3/4]';

  return (
    <motion.div
      layout 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      // --- Asegúrate que break-inside-avoid está aquí ---
      className={`relative rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5 group ${aspect} cursor-pointer break-inside-avoid`} 
      // -------------------------------------------------
      whileHover={{ scale: 1.03, zIndex: 10 }} 
      onClick={() => onClick(item.src)} 
    >
      {/* ... (Componente Image y overlay) ... */}
       <Image
        src={item.src}
        alt={`Imagen ${index + 1}`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        priority={index < 8}
        draggable={false}
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
    </motion.div>
  );
}