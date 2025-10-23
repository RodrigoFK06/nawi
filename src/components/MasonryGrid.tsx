// src/components/MasonryGrid.tsx
'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'; // Añadido useCallback
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import { MasonryImageItem } from './MasonryImageItem';
import { AnimatePresence, motion } from 'framer-motion';

type ImageItem = { id: string; src: string };

type MasonryGridProps = {
  items: ImageItem[];
  onImageClick: (src: string) => void;
};

// --- Función para obtener las opciones de Masonry ---
// La movemos fuera para poder reusarla en el resize
const getMasonryOptions = (containerElement: HTMLElement): Masonry.Options => {
    const gap = window.innerWidth >= 768 ? 24 : 16;
    const columns = window.innerWidth >= 1024 ? 4 : (window.innerWidth >= 768 ? 3 : 2);
    const containerWidth = containerElement.offsetWidth;
    const colWidth = Math.floor((containerWidth - (gap * (columns - 1))) / columns);

    return {
        itemSelector: '.grid-item',
        gutter: gap, // Establece el gutter directamente
        columnWidth: colWidth, // Establece el columnWidth directamente
        percentPosition: true,
        initLayout: false, // Importante: layout manual
    };
};


export function MasonryGrid({ items, onImageClick }: MasonryGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const masonryInstance = useRef<Masonry | null>(null);
  const [isMasonryInitialized, setIsMasonryInitialized] = useState(false);

  // --- Función de inicialización y layout ---
  // Usamos useCallback para evitar recrearla innecesariamente
  const initializeAndLayout = useCallback(() => {
    if (!gridRef.current || typeof window === 'undefined') return;

    // Destruye instancia anterior si existe (importante para HMR/re-renders)
    masonryInstance.current?.destroy?.();

    // Calcula opciones ANTES de inicializar
    const options = getMasonryOptions(gridRef.current);

    // Inicializa Masonry con todas las opciones
    const msnry = new Masonry(gridRef.current, options);
    masonryInstance.current = msnry;

    // Espera a que las imágenes carguen antes del layout final
    const imgLoad = imagesLoaded(gridRef.current);
    imgLoad.on('always', () => {
        console.log("Images loaded, performing layout...");
        msnry.layout?.();
        setIsMasonryInitialized(true);
        console.log("Masonry initialized and layout done.");
    });

    // Layout inicial tentativo (puede ayudar visualmente mientras cargan imágenes)
     msnry.layout?.();

  }, []); // Vacío, solo se crea una vez


  // --- useEffect para INICIALIZAR Masonry al montar ---
  useEffect(() => {
    initializeAndLayout(); // Llama a la función de inicialización

    // --- Limpieza al desmontar ---
    return () => {
      masonryInstance.current?.destroy?.();
      masonryInstance.current = null;
      setIsMasonryInitialized(false);
    };
  }, [initializeAndLayout]); // Depende de la función memoizada

  // --- useEffect para RE-LAYOUT cuando cambian los items ---
  useEffect(() => {
    // Solo si está inicializado y los items realmente cambiaron
    if (masonryInstance.current && gridRef.current && isMasonryInitialized) {
      console.log("Items changed, reloading Masonry...");

      // Damos tiempo a AnimatePresence y al DOM para actualizarse
      const timer = setTimeout(() => {
        if (masonryInstance.current && gridRef.current) {
            const imgLoadUpdate = imagesLoaded(gridRef.current);
            imgLoadUpdate.on('always', () => {
              if (masonryInstance.current) {
                  console.log("Reloading items and performing layout...");
                  masonryInstance.current.reloadItems?.();
                  masonryInstance.current.layout?.();
              }
            });
        }
      }, 350); // Delay > animación de AnimatePresence

      return () => clearTimeout(timer);
    }
    // No incluir isMasonryInitialized aquí para evitar re-layout justo después de init
  }, [items]);

  // --- useEffect para RE-LAYOUT en resize ---
   useEffect(() => {
     if (!isMasonryInitialized) return; // No hacer nada si no está inicializado

     let resizeTimeout: NodeJS.Timeout;
     const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
           console.log("Resizing, re-initializing Masonry layout...");
           // Volvemos a inicializar para recalcular todo correctamente
           initializeAndLayout();
        }, 150);
     };

     window.addEventListener('resize', handleResize);
     return () => {
        clearTimeout(resizeTimeout);
        window.removeEventListener('resize', handleResize);
     }
     // Depende de isMasonryInitialized y la función memoizada
   }, [isMasonryInitialized, initializeAndLayout]);


  return (
    // Contenedor principal
    <div ref={gridRef} className="relative mx-auto w-full opacity-0 transition-opacity duration-500" style={isMasonryInitialized ? { opacity: 1 } : {}}>
        {/* Quitamos los Sizers, ya no los necesitamos con el cálculo JS */}

      <AnimatePresence initial={false}>
        {items.map((item, index) => (
          <motion.div
             key={item.id}
             layout
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.3 }}
             // className="absolute" // Masonry aplicará esto
           >
            <MasonryImageItem
              item={item}
              index={index}
              onClick={onImageClick}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}