// src/components/Visuals.tsx
'use client'

export function Noise() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 mix-blend-soft-light opacity-[0.32] [background-image:url('/nawi/noise.png')] [background-size:300px]" />
  );
}

export function Glow({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`absolute blur-3xl rounded-full opacity-40 ${className}`}
      style={{
        background:
          "radial-gradient( circle at 30% 30%, rgba(255,161,22,0.9), rgba(255,88,46,0.8) 40%, rgba(255,88,46,0.0) 60%)",
      }}
    />
  );
}
