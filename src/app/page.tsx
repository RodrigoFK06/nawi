'use client'

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Camera, Clapperboard, Palette, Wand2, AudioLines, Rocket, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

// --- Importaciones de componentes modulares ---
import { Noise, Glow } from "@/components/Visuals";
import { HeaderEyebrow } from "@/components/HeaderEyebrow";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
// ---------------------------------------------

export default function NawiLanding() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden selection:bg-orange-500/40 selection:text-white">
      <Noise />
      <Hero />
      <SelectedWorks />
      <Manifesto />
      <Capabilities />
      <Pipeline />
      {/*<ClientsAwards />*/}
      <Contact />
      <Footer />
    </main>
  );
}

// ——————————————————————————————————————————————————————————
// HERO
function Hero() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, -80]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.06]);

  return (
    <section id="inicio" className="relative isolate min-h-[96svh] grid place-items-center">
      {/* Background video / poster */}
      <motion.div style={{ y: y1, scale }} className="absolute inset-0 -z-10 overflow-hidden">
        <video
          className="h-full w-full object-cover opacity-70"
          autoPlay
          muted
          loop
          playsInline
          poster="/nawi/hero-poster.jpg"
        >
          <source src="/nawi/hero-reel.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/90" />
        <Glow className="w-[52rem] h-[52rem] -left-40 -top-24" />
        <Glow className="w-[46rem] h-[46rem] right-[-10rem] bottom-[-6rem]" />
      </motion.div>

      {/* --- NAVEGACIÓN ACTUALIZADA --- */}
      <div className="absolute top-0 left-0 right-0">
        <Navigation />
      </div>
      {/* ------------------------------- */}

      <div className="relative px-6 md:px-10 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-[1.2fr_.8fr] items-center gap-10 pt-20 md:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl leading-[0.95] font-black tracking-tight">
              
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">
                VISIÓN CREATIVA EN CADA HISTORIA
              </span>
            </h1>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.youtube.com/@%C3%91AWI-productora"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wider uppercase bg-white text-black hover:bg-zinc-200 transition"
              >
                <Clapperboard className="w-4 h-4" /> Ver canal
              </a>
              <a href="#contacto" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wider uppercase border border-white/30 hover:border-white/60">
                <Rocket className="w-4 h-4" /> Hablemos
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Reel Modal */}
      {open && <ReelModal onClose={() => setOpen(false)} />}

      
    </section>
  );
}

function ReelModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4 bg-black/80">
      <button onClick={onClose} className="absolute top-4 right-4 rounded-full bg-white/10 hover:bg-white/20 px-3 py-1.5 text-sm">
        Cerrar
      </button>
      <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden ring-1 ring-white/10 bg-black">
        {/* Reemplaza por Vimeo/YT embed si prefieres */}
        <video className="h-full w-full" controls poster="/nawi/reel-poster.jpg">
          <source src="/nawi/reel.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}



// ——————————————————————————————————————————————————————————
// SELECTED WORKS (mosaic)
function SelectedWorks() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  
  const items: WorkCard[] = [
    {
      title: "AYARANGA, tierra añorada",
      tag: "Documental",
      poster: "/nawipreview.png",
      preview: "/nawi.mp4",
    }
  ];

  return (
    <section id="trabajos" className="relative py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      <div className="px-6 md:px-10 max-w-7xl mx-auto">
        <HeaderEyebrow title="Próximo lanzamiento" subtitle="Nuestro proyecto de cine documental." />

        <div className="mt-10 grid md:grid-cols-1 gap-4 md:gap-6">
          {items.map((it, i) => (
            <WorkTile 
              key={i} 
              {...it} 
              isExpanded={expandedIndex === i}
              onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type WorkCard = {
  title: string;
  tag: string;
  poster: string;
  preview: string;
};

function WorkTile({ 
  title, 
  tag, 
  poster, 
  preview, 
  isExpanded,
  onToggle 
}: WorkCard & { 
  isExpanded?: boolean;
  onToggle?: () => void;
}) {
  const [hover, setHover] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-3xl ring-1 ring-white/10 bg-white/5 transition-all duration-700 ${
        isExpanded ? 'h-[70vh]' : 'h-[400px]'
      }`}
    >
      <div className="h-full flex">
        {/* Tarjeta del proyecto (lado izquierdo cuando está expandido) */}
        <div 
          className={`relative overflow-hidden transition-all duration-700 flex-shrink-0 ${
            isExpanded ? 'w-[280px] md:w-[350px]' : 'w-full'
          }`}
          onMouseEnter={() => !isExpanded && setHover(true)}
          onMouseLeave={() => !isExpanded && setHover(false)}
        >
          {hover && !isExpanded ? (
            <video className="absolute inset-0 h-full w-full object-cover" muted playsInline autoPlay loop poster={poster}>
              <source src={preview} type="video/mp4" />
            </video>
          ) : (
            <Image src={poster} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 350px" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/0 opacity-80" />
          
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="inline-block text-[10px] tracking-widest uppercase text-white/70 mb-1">{tag}</span>
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
          
          <button
            onClick={onToggle}
            className="absolute top-4 right-4 px-3 py-2 rounded-full text-[10px] tracking-widest uppercase bg-white/10 ring-1 ring-white/20 backdrop-blur-sm hover:bg-white/20 transition cursor-pointer"
          >
            {isExpanded ? 'CERRAR' : 'PLAY'}
          </button>
        </div>

        {/* Video expandido (lado derecho) */}
        <div 
          className={`relative flex-1 bg-black transition-all duration-700 overflow-hidden ${
            isExpanded ? 'opacity-100 w-full' : 'opacity-0 w-0'
          }`}
        >
          {isExpanded && (
            <div className="h-full w-full flex items-center justify-center p-6">
              <video 
                className="h-full w-full object-contain rounded-lg" 
                controls 
                autoPlay
                poster={poster}
              >
                <source src={preview} type="video/mp4" />
              </video>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ——————————————————————————————————————————————————————————
// MANIFESTO
function Manifesto() {
  return (
    <section id="manifiesto" className="relative py-28 md:py-36">
      <Glow className="w-[40rem] h-[40rem] -left-32 top-20" />
      <div className="px-6 md:px-10 max-w-5xl mx-auto text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-white/60">Manifiesto</p>
        <h2 className="mt-4 text-4xl md:text-6xl font-black">
          Filmamos para conservar la memoria y provocar futuro
        </h2>
        <p className="mt-6 text-lg md:text-xl text-white/80">
          Nuestro propósito es resaltar la importancia de estos espacios y relatos para fortalecer la identidad cultural y promover su cuidado. Buscamos generar conciencia y abrir diálogo sobre aquello que nos hace comunidad.
        </p>
      </div>
    </section>
  );
}

// ——————————————————————————————————————————————————————————
// CAPABILITIES
function Capabilities() {
  const caps = [
    { icon: Camera, title: "Dirección & Fotografía", desc: "Concepto visual, encuadre, luz. Look cinematográfico desde el diseño." },
    { icon: Clapperboard, title: "Producción Integral", desc: "Desarrollo, casting, locaciones, permisos, logística y rodaje." },
    { icon: Palette, title: "Arte & Color", desc: "Dirección de arte, props, vestuario, color grading con identidad." },
    { icon: Wand2, title: "Postproducción", desc: "Edición, motion graphics, VFX sutil, entrega para cinema y digital." },
    { icon: AudioLines, title: "Sonido", desc: "Diseño, foley y mezcla que sostienen la emoción." },
    { icon: Rocket, title: "Piezas de Marca", desc: "Brand films y campañas con relato; no spots, historias." },
  ];

  return (
    <section id="servicios" className="relative py-24 md:py-32">
      <div className="px-6 md:px-10 max-w-7xl mx-auto">
        <HeaderEyebrow title="Lo que hacemos" subtitle="De la semilla al estreno. Equipo modular según el proyecto." />
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {caps.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl p-6 ring-1 ring-white/10 bg-white/5 hover:bg-white/10">
              <c.icon className="w-7 h-7 text-orange-300" />
              <h3 className="mt-4 text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-white/75">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ——————————————————————————————————————————————————————————
// PIPELINE
function Pipeline() {
  const steps = [
    { n: "I", title: "Exploración", desc: "Tratamiento, referencias, scouting. Una visión compartida." },
    { n: "II", title: "Pre/Producción", desc: "Plan de rodaje quirúrgico. Equipo y logística impecables." },
    { n: "III", title: "Post", desc: "Edición con ritmo, color con carácter, sonido que respira." },
    { n: "IV", title: "Entrega", desc: "Maestras para cine/digital y piezas derivadas para campaña." },
  ];
  return (
    <section className="relative py-24">
      <div className="px-6 md:px-10 max-w-6xl mx-auto">
        <HeaderEyebrow title="Cómo trabajamos" />
        <div className="mt-10 grid md:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="rounded-3xl p-6 ring-1 ring-white/10 bg-gradient-to-b from-white/5 to-white/0">
              <div className="text-orange-300 text-sm tracking-[0.3em]">{s.n}</div>
              <h4 className="mt-2 text-lg font-semibold">{s.title}</h4>
              <p className="mt-2 text-white/70">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ——————————————————————————————————————————————————————————
{/*// CLIENTS & AWARDS
function ClientsAwards() {
  const logos = ["marca1.svg", "marca2.svg", "marca3.svg", "marca4.svg", "marca5.svg", "marca6.svg"];
  return (
    <section className="relative py-20">
      <div className="px-6 md:px-10 max-w-7xl mx-auto">
        <HeaderEyebrow title="Confían en nosotros" kicker="Clientes & Laureles" />
        <div className="mt-8 overflow-hidden">
          <div className="flex items-center gap-16 animate-[marquee_28s_linear_infinite] will-change-transform">
            {logos.concat(logos).map((l, i) => (
              <img key={i} src={`/nawi/logos/${l}`} alt="logo" className="h-10 opacity-70 hover:opacity-100 transition" />
            ))}
          </div>
        </div>
        <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      </div>
    </section>
  );
}
*/}

// ——————————————————————————————————————————————————————————
// CONTACT
function Contact() {
  return (
    <section id="contacto" className="relative py-28">
      <Glow className="w-[42rem] h-[42rem] -right-32 top-10" />
      <div className="px-6 md:px-10 max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Contacto</p>
          <h3 className="mt-3 text-3xl md:text-5xl font-black">Conversemos una idea desmedida</h3>
          <p className="mt-4 text-white/75">Cuéntanos el alcance, tiempos y referencias. Te respondemos en 24h con ruta y estimado.</p>

          <div className="mt-6 space-y-2 text-white/80">
            <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> hola@nawi.studio</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +51 999 000 111 (WhatsApp)</p>
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Lima — Trujillo, Perú</p>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="rounded-3xl p-6 ring-1 ring-white/10 bg-white/5 space-y-4">
          <input required placeholder="Nombre" className="w-full bg-black/30 rounded-xl px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-white/30" />
          <input required type="email" placeholder="Email" className="w-full bg-black/30 rounded-xl px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-white/30" />
          <input placeholder="Compañía / marca" className="w-full bg-black/30 rounded-xl px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-white/30" />
          <textarea required placeholder="Proyecto, timings, referencias" rows={4} className="w-full bg-black/30 rounded-xl px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-white/30" />
          <button className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wider uppercase bg-white text-black hover:bg-zinc-200 transition w-full">Enviar</button>
          <p className="text-xs text-white/60">Al enviar aceptas nuestra política de privacidad.</p>
        </form>
      </div>
    </section>
  );
}
