const fs = require('fs');
const path = require('path');
// --- CORRECCIÓN AQUÍ ---
const { imageSize: sizeOf } = require('image-size');

// --- Configuración ---

// 1. Define las carpetas a escanear
const foldersToScan = [
  { dir: '1ER SCOUTING', category: 'scouting' },
  { dir: 'MOMENTOS EN LA U', category: 'momentos' },
  { dir: '1ER CORTE', category: 'corte' }
];

// 2. Define la ruta de tu carpeta 'public'
const publicDir = path.join(process.cwd(), 'public');

// 3. Define dónde quieres guardar el archivo final
const outputFilePath = path.join(process.cwd(), 'src', 'galleryImages.ts'); 
// (Ajusta 'src/galleryImages.ts' si tu proyecto tiene otra estructura)

// 4. Define las extensiones de imagen permitidas (en minúsculas)
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.heic'];

// --- Definición de Tipos ---

const TSTYPES = `
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category: string;
}
`;

// --- Lógica del Script ---

/** Genera un texto 'alt' básico a partir del nombre del archivo */
function generateAltText(filename: string): string {
  return path.basename(filename, path.extname(filename))
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (l: string) => l.toUpperCase());
}

/** Función principal del script */
function generateImageList() {
  console.log('--- Iniciando escaneo de galería ---');
  const allImages: any[] = []; 

  for (const folder of foldersToScan) {
    const folderPath = path.join(publicDir, folder.dir);

    if (!fs.existsSync(folderPath)) {
      console.warn(`\n[!] Directorio no encontrado, saltando: ${folder.dir}`);
      continue;
    }

    console.log(`\n-> Procesando directorio: ${folder.dir}`);
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      const fileExtension = path.extname(file).toLowerCase();

      if (allowedExtensions.includes(fileExtension)) {
        const imagePathOnDisk = path.join(folderPath, file);
        const publicSrcPath = `/${folder.dir}/${file}`;

        try {
          const imageBuffer = fs.readFileSync(imagePathOnDisk);
          
          // Esta línea ahora funcionará porque 'sizeOf' es la función correcta
          const dimensions = sizeOf(imageBuffer); 

          if (dimensions.width && dimensions.height) {
            allImages.push({
              id: file,
              src: publicSrcPath,
              alt: generateAltText(file),
              width: dimensions.width,
              height: dimensions.height,
              category: folder.category,
            });
            process.stdout.write('.');
          }
        } catch (err) {
          if (err instanceof Error) {
            // Se imprimirá 'sizeOf is not a function' si la corrección falla
            console.error(`\n[X] Error al leer dimensiones de ${file}: ${err.message}`);
          } else {
             console.error(`\n[X] Error desconocido al procesar ${file}`);
          }
        }
      }
    }
  }

  console.log(`\n\n--- Escaneo completado: ${allImages.length} imágenes encontradas ---`);

  // --- Creación del archivo de salida ---
  
  const arrayString = JSON.stringify(allImages, null, 2);

  const fileContent = `
// ESTE ARCHIVO ES AUTOGENERADO. NO EDITAR MANUALMENTE.
// Para actualizar, ejecuta el script: npx ts-node scripts/generate-gallery.ts

export ${TSTYPES}
export const galleryImages: GalleryImage[] = ${arrayString};
`;

  fs.writeFileSync(outputFilePath, fileContent, 'utf-8');
  console.log(`\n[✓] ¡Éxito! Galería guardada en: ${outputFilePath}`);
}

// Ejecuta la función
generateImageList();