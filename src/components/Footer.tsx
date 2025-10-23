// src/components/Footer.tsx
export function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-10 text-white/60 text-sm">
      <div className="px-6 md:px-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Ñawi" className="w-40 h-20" />
        </div>
        <p>© {new Date().getFullYear()} ÑAWI Productora. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
