// src/components/MasonryImageItem.tsx
'use client'

import React from 'react';
import Image from 'next/image';
// Quitamos motion por ahora

type ImageItem = { id: string; src: string };

type MasonryImageItemProps = {
  item: ImageItem;
  index: number;
  onClick: (src: string) => void;
};

export function MasonryImageItem({ item, index, onClick }: MasonryImageItemProps) {
  // Determinamos el aspect ratio y ANCHO (width) basado en el índice
  // Necesitamos anchos explícitos para que Masonry calcule las columnas
  const isWide = index % 4 === 0; // Ejemplo: hacer algunos items más anchos
  const aspect = isWide ? 'aspect-[16/9]' : 'aspect-[3/4]'; // Ejemplo: Ancho vs Alto
  
  // Clases de Tailwind para el tamaño. Masonry usa el ancho para calcular columnas.
  // Ajusta estos anchos según tu diseño de columnas (4 cols en desktop -> w-1/4, etc.)
  // IMPORTANTE: Asegúrate de que estos anchos sean consistentes con columnWidth en MasonryGrid si lo usas.
  // Usaremos porcentajes para adaptabilidad.
  const widthClass = 'w-full'; // Dejamos que Masonry y el contenedor CSS Grid manejen el ancho ahora.
  
  // Añadimos la clase 'grid-item' que Masonry buscará
  return (
    <div
      // --- CLASE IMPORTANTE ---
      className={`grid-item relative rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5 group ${aspect} ${widthClass} cursor-pointer mb-4 md:mb-6`} // Añadimos margen inferior para gap vertical
      onClick={() => onClick(item.src)}
      // Quitamos break-inside-avoid por ahora
    >
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
    </div>
  );
}