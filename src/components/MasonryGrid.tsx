// src/components/MasonryGrid.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { MasonryImageItem } from './MasonryImageItem';
import { AnimatePresence } from 'framer-motion';

type ImageItem = { id: string; src: string };

type MasonryGridProps = {
  items: ImageItem[];
  onImageClick: (src: string) => void;
  maxItems?: number; // Número máximo de imágenes a mostrar a la vez
  autoRotateInterval?: number; // Intervalo de rotación en milisegundos
};

export function MasonryGrid({ 
  items, 
  onImageClick,
  maxItems = 12, // Por defecto mostrar 12 imágenes
  autoRotateInterval = 5000 // Rotar cada 5 segundos
}: MasonryGridProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Calcular las imágenes visibles
  const visibleItems = items.slice(currentIndex, currentIndex + maxItems);
  
  // Si no hay suficientes imágenes, completar desde el inicio (circular)
  const displayItems = visibleItems.length < maxItems
    ? [...visibleItems, ...items.slice(0, maxItems - visibleItems.length)]
    : visibleItems;

  // Auto-rotación
  useEffect(() => {
    if (items.length <= maxItems) return; // No rotar si hay pocas imágenes
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        // Avanzar de 3 en 3 o 4 en 4 (para cambiar una fila completa aproximadamente)
        const step = 4;
        const next = prev + step;
        // Volver al inicio si llegamos al final
        return next >= items.length ? 0 : next;
      });
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [items.length, maxItems, autoRotateInterval]);

  return (
    // Usamos CSS Grid con masonry (más simple y confiable)
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
      <AnimatePresence mode="popLayout">
        {displayItems.map((item, index) => (
          <div key={`${item.id}-${currentIndex}`} className="break-inside-avoid mb-4 md:mb-6">
            <MasonryImageItem
              item={item}
              index={index}
              onClick={onImageClick}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}