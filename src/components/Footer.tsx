// src/components/Footer.tsx
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-10 text-white/60 text-sm">
      <div className="px-6 md:px-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Ñawi" width={160} height={80} className="object-contain" />
        </div>
        <p>© {new Date().getFullYear()} ÑAWI Productora. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
