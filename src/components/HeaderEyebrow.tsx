// src/components/HeaderEyebrow.tsx
export function HeaderEyebrow({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="max-w-3xl">
      <h2 className="mt-3 text-3xl md:text-5xl font-black leading-[1.05]">{title}</h2>
      {subtitle && <p className="mt-3 text-base md:text-lg text-white/70">{subtitle}</p>}
    </div>
  );
}
