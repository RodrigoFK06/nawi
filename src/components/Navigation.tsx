// src/components/Navigation.tsx
'use client'

import Link from 'next/link';
import { BrandMark } from './BrandMark';

export function Navigation() {
  return (
    <div className="relative px-6 md:px-10 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between gap-6 pt-6 pb-6"> {/* Añadido pb-6 para consistencia */}
        <BrandMark />
        <nav className="hidden md:flex gap-8 text-sm tracking-widest uppercase text-white/80">
          {/* Cambiado href de /#trabajos a /trabajos */}
          <Link href="/trabajos" className="hover:text-white">Trabajos</Link> 
          <Link href="/#manifiesto" className="hover:text-white">Manifiesto</Link>
          <Link href="/#servicios" className="hover:text-white">Servicios</Link>
          <Link href="/nosotros" className="hover:text-white">Nosotros</Link>
          <Link href="/#contacto" className="hover:text-white">Contacto</Link>
        </nav>
      </div>
    </div>
  );
}