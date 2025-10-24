// Script para convertir archivos HEIC a JPG
// Instalar primero: npm install heic-convert sharp fs-extra

const fs = require('fs-extra');
const path = require('path');
const heicConvert = require('heic-convert');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '../public');
const folders = ['1ER SCOUTING', 'MOMENTOS EN LA U', '1ER CORTE'];

async function convertHeicToJpg(filePath) {
  try {
    console.log(`Convirtiendo: ${filePath}`);
    
    // Leer archivo HEIC
    const inputBuffer = await fs.readFile(filePath);
    
    // Convertir HEIC a JPEG
    const outputBuffer = await heicConvert({
      buffer: inputBuffer,
      format: 'JPEG',
      quality: 0.9
    });
    
    // Optimizar con sharp
    const optimizedBuffer = await sharp(outputBuffer)
      .jpeg({ quality: 85 })
      .toBuffer();
    
    // Guardar como JPG
    const jpgPath = filePath.replace(/\.(heic|HEIC)$/i, '.jpg');
    await fs.writeFile(jpgPath, optimizedBuffer);
    
    console.log(`✓ Convertido a: ${jpgPath}`);
    
    // Opcional: eliminar el archivo HEIC original
    // await fs.remove(filePath);
    
    return jpgPath;
  } catch (error) {
    console.error(`Error convirtiendo ${filePath}:`, error.message);
    return null;
  }
}

async function processFolder(folderName) {
  const folderPath = path.join(publicDir, folderName);
  
  if (!await fs.pathExists(folderPath)) {
    console.log(`Carpeta no encontrada: ${folderPath}`);
    return;
  }
  
  const files = await fs.readdir(folderPath);
  const heicFiles = files.filter(f => /\.(heic|HEIC)$/i.test(f));
  
  console.log(`\n📁 ${folderName}: Encontrados ${heicFiles.length} archivos HEIC`);
  
  for (const file of heicFiles) {
    const filePath = path.join(folderPath, file);
    await convertHeicToJpg(filePath);
  }
}

async function main() {
  console.log('🚀 Iniciando conversión de archivos HEIC a JPG...\n');
  
  for (const folder of folders) {
    await processFolder(folder);
  }
  
  console.log('\n✅ Conversión completada!');
  console.log('💡 Ahora ejecuta: npx ts-node scripts/generate-gallery.ts');
}

main().catch(console.error);
