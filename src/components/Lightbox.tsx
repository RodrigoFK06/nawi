// src/components/Lightbox.tsx
'use client'

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';

type LightboxProps = {
  src: string;
  onClose: () => void;
};

export function Lightbox({ src, onClose }: LightboxProps) {
  // Efecto para cerrar con la tecla "Escape"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Cierra al hacer clic en el fondo
    >
      <motion.div
        className="relative w-[90%] h-[90%] max-w-6xl"
        layoutId={`image-${src}`} // Animación compartida (opcional pero elegante)
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()} // Evita que el clic en la imagen cierre el modal
      >
        <Image 
          src={src} 
          alt="Detalle de imagen" 
          fill 
          className="object-contain"
          sizes="100vw" 
        />
      </motion.div>

      <motion.button
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2 } }}
        exit={{ opacity: 0 }}
      >
        <X className="w-8 h-8" />
      </motion.button>
    </motion.div>
  );
}