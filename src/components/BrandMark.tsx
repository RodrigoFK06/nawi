// src/components/BrandMark.tsx
import Link from 'next/link';
import Image from 'next/image';

export function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="relative w-30 h-20">
        <Image src="/logo.svg" alt="Ñawi" width={200} height={120} className="object-contain" priority />
      </div>
    </Link>
  );
}
