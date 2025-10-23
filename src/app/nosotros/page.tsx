// src/app/nosotros/page.tsx
'use client'

import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { Noise, Glow } from "@/components/Visuals";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeaderEyebrow } from "@/components/HeaderEyebrow";

// Datos del equipo (los mismos que tenías)
const teamPeople = [
  { name: "Directora — A. Ramos", role: "Dirección / Guion", photo: "/nawi/team/a.jpg" },
  { name: "Director — R. Torres", role: "Dirección / Foto", photo: "/nawi/team/b.jpg" },
  { name: "Productor — M. Villafuerte", role: "Producción", photo: "/nawi/team/c.jpg" },
];

// Datos de herramientas (del ejemplo que diste)
const tools = [
  "Panasonic Lumix GH4",
  "Canon 5D Mark III",
  "Estabilizador Ronin S",
  "Micrófono Rode NTG4",
  "Grabadora Zoom H4N Pro",
  "Kino Flo",
  "Dolly",
  "Monitor HD Neewerd",
  "Drone DJI Phantom",
  "Studio Fotográfico",
  "Canon 60D",
];

export default function NosotrosPage() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden selection:bg-orange-500/40 selection:text-white">
      <Noise />
      
      {/* --- Encabezado --- */}
      <header className="relative isolate pt-4 pb-24 md:pb-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/80 to-[#0A0A0A]" />
        <Glow className="w-[52rem] h-[52rem] -left-40 -top-24" />
        <Navigation />
        <div className="px-6 md:px-10 max-w-5xl mx-auto text-center mt-20 md:mt-28">
          <h1 className="text-5xl md:text-7xl leading-[0.95] font-black tracking-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">
              NOSOTROS
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            12 años en el mercado; experiencia, tecnología y creatividad para contar historias que quedan.
          </p>
        </div>
      </header>

      {/* --- Quiénes Somos y Creencias --- */}
      <section className="relative py-24 md:py-32 border-t border-white/10">
        <Glow className="w-[40rem] h-[40rem] -right-32 top-10" />
        <div className="px-6 md:px-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="max-w-xl">
            <HeaderEyebrow 
              title="¿Quiénes somos?" 
              subtitle="Somos un equipo de comunicadores audiovisuales con experiencia en las diversas áreas de la comunicación. Ofrecemos videos de diferentes estilos y formatos con un concepto creativo. Brindamos la asesoría necesaria para que tu video se adecue a tus necesidades."
            />
          </div>
          <div className="max-w-xl">
            <HeaderEyebrow 
              title="¿En qué creemos?"
              subtitle="Creemos en lo visual, el sonido y el movimiento como los mecanismos más impactantes de comunicación. En los mensajes claros, directos y sencillos como clave para acercarse al Target. En la eficacia de los mensajes para generar emoción e identificación."
            />
          </div>
        </div>
      </section>

      {/* --- Herramientas --- */}
      <section id="herramientas" className="relative py-24 md:py-32 bg-white/5 border-t border-white/10">
        <div className="px-6 md:px-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <HeaderEyebrow 
              title="Herramientas de Trabajo"
              subtitle="Disponemos con las herramientas de varias marcas conocidas y prestigiosas para dar una buena calidad de servicio."
            />
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-white/70">
            {tools.map((tool, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                <Camera className="w-4 h-4 text-orange-300 flex-shrink-0" />
                <span>{tool}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* --- Nuestro Equipo (Componente original reutilizado) --- */}
      <section id="equipo-nuclear" className="relative py-24 md:py-32 border-t border-white/10">
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
                className="relative overflow-hidden rounded-3xl ring-1 ring-white/10"
              >
                <img src={p.photo} alt={p.name} className="h-80 w-full object-cover" />
                <figcaption className="p-5 bg-white/5 backdrop-blur-sm">
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-white/70 text-sm">{p.role}</div>
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
