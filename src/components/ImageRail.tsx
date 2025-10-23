// src/components/ImageRail.tsx
'use client'

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// --- Tipos ---
type ImageRailProps = {
  title: string;
  subtitle?: string;
  images: string[];
  onImageClick: (src: string) => void;
};

type ImageCardProps = {
  src: string;
  index: number;
  onClick: (src: string) => void;
};

// --- Componente de Tarjeta de Imagen ---
function ImageCard({ src, index, onClick }: ImageCardProps) {
  // Alternamos los aspect ratios para el efecto mosaico
  const aspect = (index % 3 === 0) ? 'aspect-[4/3]' : 'aspect-[3/4]';
  const width = (index % 3 === 0) ? 'w-[320px] md:w-[400px]' : 'w-[240px] md:w-[300px]';

  return (
    <motion.div
      layoutId={`image-${src}`} // Para el 'layout transition' con el Lightbox
      className={`flex-shrink-0 relative ${width} h-auto ${aspect} rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5 cursor-pointer`}
      whileHover={{ scale: 1.03, zIndex: 10 }} // Efecto hover
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={() => onClick(src)}
    >
      <Image 
        src={src} 
        alt={`Imagen ${index + 1}`} 
        fill 
        className="object-cover" 
        sizes="(max-width: 768px) 50vw, 33vw"
        priority={index < 5} // Prioritiza la carga de las primeras imágenes
      />
    </motion.div>
  );
}

// --- Componente Principal del Riel ---
export function ImageRail({ title, subtitle, images, onImageClick }: ImageRailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [leftConstraint, setLeftConstraint] = useState(0);

  // Este useEffect calcula los límites del 'drag'
  // Se actualiza si el tamaño del riel o del contenedor cambia (ej. resize)
  useEffect(() => {
    const calculateConstraints = () => {
      if (containerRef.current && railRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const railWidth = railRef.current.scrollWidth;
        
        // El padding del contenedor (px-6 md:px-10)
        const padding = containerWidth > 768 ? 40 : 24; 
        
        // Calculamos cuánto se puede arrastrar
        const constraint = railWidth > containerWidth ? -(railWidth - containerWidth) - padding : 0;
        
        setLeftConstraint(constraint);
      }
    };

    calculateConstraints();

    // Usamos ResizeObserver para recalcular si el contenido del riel cambia
    const railElement = railRef.current;
    if (!railElement) return;

    const resizeObserver = new ResizeObserver(calculateConstraints);
    resizeObserver.observe(railElement);
    
    // Limpiamos al desmontar
    return () => resizeObserver.unobserve(railElement);
  }, [containerRef, railRef]);

  return (
    <section className="w-full">
      {/* Título de la sección */}
      <div className="px-6 md:px-10 max-w-7xl mx-auto mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        {subtitle && <p className="text-sm text-white/60">{subtitle}</p>}
      </div>
      
      {/* Contenedor (Viewport) del riel */}
      <motion.div 
        ref={containerRef} 
        className="w-full overflow-hidden cursor-grab" // Oculta el overflow
      >
        {/* Riel arrastrable */}
        <motion.div
          ref={railRef}
          className="flex gap-4 md:gap-6 px-6 md:px-10" // El padding se aplica aquí
          drag="x" // Habilita el arrastre horizontal
          dragConstraints={{
             right: 0,
             left: leftConstraint // Límite calculado
          }}
          whileTap={{ cursor: "grabbing" }} // Cambia el cursor al arrastrar
          dragTransition={{ bounceStiffness: 200, bounceDamping: 25 }} // Efecto de rebote
        >
          {images.map((src, index) => (
            <ImageCard 
              key={index} 
              src={src} 
              index={index} 
              onClick={onImageClick}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}