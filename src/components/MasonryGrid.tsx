// src/components/MasonryGrid.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { MasonryImageItem } from './MasonryImageItem';
import { AnimatePresence } from 'framer-motion';

type ImageItem = { id: string; src: string };

type MasonryGridProps = {
  items: ImageItem[];
  onImageClick: (src: string) => void;
  maxItems?: number;
  autoRotateInterval?: number;
};

// Diferentes patrones de grid tipo bento box
const gridPatterns = [
  // Patrón 1: Mix equilibrado
  [
    'col-span-2 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1',
    'col-span-1 row-span-1', 'col-span-1 row-span-2', 'col-span-2 row-span-1',
    'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1',
    'col-span-1 row-span-1', 'col-span-2 row-span-1', 'col-span-1 row-span-1'
  ],
  // Patrón 2: Grandes destacados
  [
    'col-span-2 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1',
    'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-2 row-span-2',
    'col-span-1 row-span-1', 'col-span-1 row-span-2', 'col-span-1 row-span-1',
    'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1'
  ],
  // Patrón 3: Horizontal dominante
  [
    'col-span-3 row-span-1', 'col-span-1 row-span-2', 'col-span-2 row-span-1',
    'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-2 row-span-2',
    'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-2 row-span-1',
    'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1'
  ],
  // Patrón 4: Vertical destacado
  [
    'col-span-1 row-span-2', 'col-span-2 row-span-1', 'col-span-1 row-span-1',
    'col-span-1 row-span-1', 'col-span-1 row-span-2', 'col-span-1 row-span-1',
    'col-span-2 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-2',
    'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1'
  ],
  // Patrón 5: Simétrico
  [
    'col-span-1 row-span-1', 'col-span-2 row-span-2', 'col-span-1 row-span-1',
    'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1',
    'col-span-1 row-span-2', 'col-span-1 row-span-1', 'col-span-2 row-span-1',
    'col-span-1 row-span-1', 'col-span-1 row-span-1', 'col-span-1 row-span-1'
  ]
];

export function MasonryGrid({ 
  items, 
  onImageClick,
  maxItems = 12,
  autoRotateInterval = 5000
}: MasonryGridProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPattern, setCurrentPattern] = useState(0);
  
  // Calcular las imágenes visibles
  const visibleItems = items.slice(currentIndex, currentIndex + maxItems);
  
  // Si no hay suficientes imágenes, completar desde el inicio (circular)
  const displayItems = visibleItems.length < maxItems
    ? [...visibleItems, ...items.slice(0, maxItems - visibleItems.length)]
    : visibleItems;

  // Auto-rotación
  useEffect(() => {
    if (items.length <= maxItems) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const step = 4;
        const next = prev + step;
        return next >= items.length ? 0 : next;
      });
      
      // Cambiar el patrón del grid en cada rotación
      setCurrentPattern((prev) => (prev + 1) % gridPatterns.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [items.length, maxItems, autoRotateInterval]);

  const currentGridPattern = gridPatterns[currentPattern];

  return (
    // Grid de 4 columnas con 4 filas auto, permite diseños tipo bento
    <div className="grid grid-cols-4 auto-rows-[minmax(150px,1fr)] gap-4 md:gap-6">
      <AnimatePresence mode="popLayout">
        {displayItems.map((item, index) => (
          <div 
            key={`${item.id}-${currentIndex}`} 
            className={`${currentGridPattern[index] || 'col-span-1 row-span-1'}`}
          >
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