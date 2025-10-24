// src/app/nosotros/page.tsx
'use client'

import { motion } from "framer-motion";
import Image from "next/image";
// Importamos los nuevos íconos para 'Valores'
import { Target, Eye, Rocket, Sparkles, HeartHandshake, Award } from "lucide-react";
import { Noise, Glow } from "@/components/Visuals";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeaderEyebrow } from "@/components/HeaderEyebrow";

// Datos del equipo
const teamPeople = [
  { name: "Lucero Llanque", role: "Dirección / Asistente de cámara", photo: "/EQUIPO/lucero llanque.png" },
  { name: "Mafer Mija", role: "Producción", photo: "/EQUIPO/Maria Fernanda Mija.png" },
  { name: "Claudia Garay", role: "Publicidad", photo: "/EQUIPO/Claudia Garay.png" },
  { name: "Abigail Mendoza", role: "Dirección de Arte y jefa de Iluminación", photo: "/EQUIPO/Abigail Mendoza.png" },
  { name: "Pamela Herrera", role: "Script y Asist. de Dir. de arte", photo: "/EQUIPO/Pamela Herrera.png" },
  { name: "Rafel Cáceres", role: "Guionista, sonido y filmmaker bts", photo: "/EQUIPO/Rafaél Cáceres.png" },
  { name: "Gerardo Serna", role: "Scouting y postproducción", photo: "/EQUIPO/Gerardo Serna.png" },
  { name: "Emilio Quintanilla", role: "Asistente de edición", photo: "/EQUIPO/lucero llanque.png" },
  { name: "David Jara", role: "Cámara", photo: "/EQUIPO/David Jara.png" },
  { name: "Jusehf Martinez", role: "Iluminación", photo: "/EQUIPO/lucero llanque.png" },
  
];

// --- NUEVA SECCIÓN: Datos de Valores ---
const valores = [
  {
    icon: Sparkles,
    title: "Creatividad",
    desc: "Buscamos ángulos únicos y soluciones visuales que sorprendan y conecten."
  },
  {
    icon: HeartHandshake,
    title: "Compromiso",
    desc: "Nos apasiona cada proyecto, cuidando cada detalle desde la idea hasta la entrega final."
  },
  {
    icon: Award,
    title: "Calidad",
    desc: "Perseguimos la excelencia técnica y narrativa en cada fotograma que producimos."
  }
];

export default function NosotrosPage() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden selection:bg-orange-500/40 selection:text-white">
      <Noise />
      
      {/* --- Encabezado --- */}
      <header className="relative isolate pt-4 pb-24 md:pb-32">
        <div className="absolute inset-0 -z-10 opacity-30">
           <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        </div>
        <Glow className="w-[52rem] h-[52rem] -left-40 -top-24 opacity-30" />
        <Navigation />
        <div className="px-6 md:px-10 max-w-5xl mx-auto text-center mt-20 md:mt-28">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl leading-[0.95] font-black tracking-tight"
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">
              NOSOTROS
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-lg md:text-xl text-white/80 max-w-3xl mx-auto"
          >
            12 años en el mercado; experiencia, tecnología y creatividad para contar historias que quedan.
          </motion.p>
        </div>
      </header>

      {/* --- Quiénes Somos y Creencias --- */}
      <section className="relative py-24 md:py-32 border-t border-white/10">
        <Glow className="w-[40rem] h-[40rem] -right-32 top-10" />
        <div className="px-6 md:px-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Quiénes somos */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8 }}
          >
            <HeaderEyebrow 
              title="¿Quiénes somos?" 
            />
            <p className="mt-4 text-white/80 text-lg leading-relaxed">
              Somos un equipo de comunicadores audiovisuales con experiencia en las diversas áreas de la comunicación. Ofrecemos videos de diferentes estilos y formatos con un concepto creativo. Brindamos la asesoría necesaria para que tu video se adecue a tus necesidades.
            </p>
          </motion.div>
          
          {/* --- CÓDIGO CORREGIDO (NEGRITAS) --- */}
           <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
             <HeaderEyebrow 
              title="¿En qué creemos?"
            />
             <ul className="mt-4 space-y-3 text-white/80 text-lg">
               <li className="flex items-start gap-3">
                 <Target className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                 <span>
                   Creemos en lo <span className="font-semibold text-white">visual, el sonido y el movimiento</span> como los mecanismos más impactantes de comunicación.
                 </span>
               </li>
               <li className="flex items-start gap-3">
                 <Target className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                 <span>
                   En los <span className="font-semibold text-white">mensajes claros, directos y sencillos</span> como clave para acercarse al Target.
                 </span>
               </li>
                <li className="flex items-start gap-3">
                 <Target className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                 <span>
                   En la eficacia de los mensajes para generar <span className="font-semibold text-white">emoción e identificación</span>.
                 </span>
               </li>
             </ul>
           </motion.div>
        </div>
      </section>

      {/* --- Misión y Visión --- */}
      <section id="mision-vision" className="relative py-24 md:py-32 bg-gradient-to-b from-white/5 to-transparent border-t border-white/10">
        <Glow className="w-[45rem] h-[45rem] left-[-10rem] bottom-[-5rem] opacity-30" />
        <div className="px-6 md:px-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Misión */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8 }} 
            className="flex flex-col items-center text-center md:items-start md:text-left"
          >
             <Rocket className="w-10 h-10 text-orange-300 mb-4" />
             <h3 className="text-3xl font-bold mb-3">Misión</h3>
             <p className="text-white/80 text-lg leading-relaxed">
                Crear y producir contenido audiovisual de calidad, impulsados por nuestra creatividad y pasión por el registro visual. Nos dedicamos a plasmar ideas y emociones con un alto nivel de compromiso y profesionalismo.
             </p>
           </motion.div>
           {/* Visión */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-15%" }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="flex flex-col items-center text-center md:items-start md:text-left"
           >
             <Eye className="w-10 h-10 text-orange-300 mb-4" />
             <h3 className="text-3xl font-bold mb-3">Visión</h3>
             <p className="text-white/80 text-lg leading-relaxed">
                Ser una productora referente en la creación de narrativas audiovisuales que celebren y difundan la riqueza cultural y las historias de nuestro país, conectando con las audiencias locales y globales.
             </p>
           </motion.div>
        </div>
      </section>

      {/* --- NUEVA SECCIÓN: Nuestros Valores --- */}
      <section id="valores" className="relative py-24 md:py-32 border-t border-white/10">
        <div className="px-6 md:px-10 max-w-7xl mx-auto">
          <HeaderEyebrow title="Nuestros Valores" subtitle="Los pilares que guían cada decisión y proyecto." />
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {valores.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-3xl p-6 ring-1 ring-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                <v.icon className="w-7 h-7 text-orange-300" />
                <h3 className="mt-4 text-xl font-semibold">{v.title}</h3>
                <p className="mt-2 text-white/75">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* --- Nuestro Equipo (Tarjetas cuadradas) --- */}
      <section id="equipo-nuclear" className="relative py-24 md:py-32 border-t border-white/10">
         <Glow className="w-[40rem] h-[40rem] -right-32 top-10" />
        <div className="px-6 md:px-10 max-w-7xl mx-auto">
          <HeaderEyebrow title="Equipo nuclear" subtitle="Armamos células a medida con colaboradores de confianza." />
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {teamPeople.map((p, i) => (
              <motion.figure 
                key={i} 
                initial={{ opacity: 0, y: 16 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative overflow-hidden rounded-3xl ring-1 ring-white/10 group aspect-square"
              >
                <div className="relative w-full h-full">
                  <Image src={p.photo} alt={p.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"/>
                <figcaption className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="font-semibold text-lg">{p.name}</div>
                  <div className="text-white/80 text-sm">{p.role}</div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}