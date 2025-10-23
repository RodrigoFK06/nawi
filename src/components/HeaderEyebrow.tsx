// src/components/HeaderEyebrow.tsx
export function HeaderEyebrow({ kicker, title, subtitle }: { kicker?: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-3xl">
      {/*{kicker && <p className="text-xs uppercase tracking-[0.3em] text-orange-300/90">{kicker}</p>}*/}
      <h2 className="mt-3 text-3xl md:text-5xl font-black leading-[1.05]">{title}</h2>
      {subtitle && <p className="mt-3 text-base md:text-lg text-white/70">{subtitle}</p>}
    </div>
  );
}
