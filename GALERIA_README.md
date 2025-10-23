# Galería Masonry - Instrucciones de Uso

## 📸 Estructura de la Galería

La galería usa un layout tipo **Masonry** (mosaico) con las siguientes características:

### ✨ Características Implementadas

1. **Layout Masonry Responsive**
   - 1 columna en móvil
   - 2 columnas en tablet
   - 3 columnas en laptop
   - 4 columnas en desktop grande

2. **Filtros por Categoría**
   - Primer Scouting
   - Momentos en la U
   - Primer Corte

3. **Aspect Ratios**
   - 4:3 (horizontal)
   - 3:4 (vertical)

4. **Interacciones**
   - ✅ Hover effect con overlay
   - ✅ Click para abrir lightbox (vista ampliada)
   - ✅ Animaciones suaves al cambiar filtros
   - ⏳ Drag & Drop (pendiente, por implementar más adelante)

## 🖼️ Cómo Agregar tus Imágenes

### Paso 1: Preparar las Imágenes

1. Coloca tus imágenes en la carpeta `public/gallery/`
2. Organízalas por categoría (opcional):
   - `public/gallery/scouting/`
   - `public/gallery/momentos/`
   - `public/gallery/corte/`

### Paso 2: Actualizar el Componente

Abre `src/components/MasonryGallery.tsx` y modifica el array `galleryImages`:

```typescript
const galleryImages: GalleryImage[] = [
  // Primer Scouting
  { 
    id: '1', 
    src: '/gallery/scouting/imagen1.jpg', 
    alt: 'Descripción de la imagen', 
    aspectRatio: '4:3', // o '3:4' para vertical
    category: 'scouting' 
  },
  { 
    id: '2', 
    src: '/gallery/scouting/imagen2.jpg', 
    alt: 'Otra descripción', 
    aspectRatio: '3:4',
    category: 'scouting' 
  },
  
  // Momentos en la U
  { 
    id: '3', 
    src: '/gallery/momentos/imagen1.jpg', 
    alt: 'Momento especial', 
    aspectRatio: '4:3',
    category: 'momentos' 
  },
  
  // Y así sucesivamente...
];
```

### Paso 3: Aspect Ratios

Para decidir el aspect ratio de cada imagen:
- **4:3** - Para fotos horizontales o paisaje
- **3:4** - Para fotos verticales o retrato

Puedes mezclarlos para crear un efecto visual más interesante.

## 🎨 Personalización

### Cambiar Colores del Filtro Activo

En `MasonryGallery.tsx`, línea ~67:

```typescript
className={`... ${
  activeFilter === filter.id
    ? 'bg-white text-black'  // ← Cambia estos colores
    : 'bg-white/5 text-white/70 hover:bg-white/10 ...'
}`}
```

### Ajustar Número de Columnas

En `MasonryGallery.tsx`, línea ~77:

```typescript
className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 ..."
//          ↑         ↑             ↑             ↑
//        Móvil    Tablet       Laptop        Desktop
```

### Cambiar Gap entre Imágenes

Modifica `gap-4` y `space-y-4` en la misma línea:

```typescript
className="... gap-4 space-y-4"
//                ↑       ↑
//           Horizontal Vertical
```

## 🚀 Próximas Mejoras (Opcionales)

1. **Drag & Drop** - Reordenar imágenes arrastrándolas
2. **Carga Dinámica** - Cargar imágenes desde una API/CMS
3. **Navegación en Lightbox** - Flechas para siguiente/anterior
4. **Zoom en Lightbox** - Pinch to zoom en móvil
5. **Compartir** - Botón para compartir en redes sociales

## 📱 Rutas

- Página principal de galería: `/galeria`
- Ya está agregada al menú de navegación

## 🐛 Solución de Problemas

### Las imágenes no se cargan
- Verifica que las rutas en `src` sean correctas
- Asegúrate de que las imágenes estén en `public/gallery/`

### El layout no se ve bien
- Revisa que todas las imágenes tengan un `aspectRatio` definido
- Prueba mezclando más '4:3' y '3:4' para mejor distribución

### Los filtros no funcionan
- Verifica que cada imagen tenga la propiedad `category` correcta
- Asegúrate de que coincida con los IDs en el array `filters`
