// src/components/BrandMark.tsx
export function BrandMark() {
  return (
    <a href="/" className="flex items-center gap-3 group">
      <div className="relative w-50 h-30">
        <img src="/logo.svg" alt="Ñawi" className="absolute inset-0 w-full h-full object-contain" />
      </div>
    </a>
  );
}
