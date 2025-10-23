// src/components/MasonryImageItem.tsx
'use client'

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type ImageItem = { id: string; src: string };

type MasonryImageItemProps = {
  item: ImageItem;
  index: number;
  onClick: (src: string) => void;
};

export function MasonryImageItem({ item, index, onClick }: MasonryImageItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className="relative rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5 group cursor-pointer w-full h-full"
      onClick={() => onClick(item.src)}
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
    </motion.div>
  );
}